

/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */

var BubbleChart = {
    myBubbleChart: null,
    svg: null,

    bubbleChart: function() {
        // Constants for sizing
        var wrapper = document.getElementById('vis');
        var width = wrapper.clientWidth;
        var height = wrapper.clientHeight;
        var margin = {left: 140, right: 20};
        var innerWidth = width - margin.left - margin.right;

        // tooltip for mouseover functionality
        var tooltip = floatingTooltip('gates_tooltip', 240);

        // Locations to move bubbles towards, depending
        // on which view mode is selected.
        var center = { x: width / 2, y: height / 2 };

        // Used when setting up force and
        // moving around nodes
        var damper = 0.102;

        // These will be set in create_nodes and create_vis
        var svg = BubbleChart.svg
          .attr('width', width)
          .attr('height', height);
        var bubbles = null;
        var nodes = [];

        // Charge function that is called for each node.
        // Charge is proportional to the diameter of the
        // circle (which is stored in the radius attribute
        // of the circle's associated data.
        // This is done to allow for accurate collision
        // detection with nodes of different sizes.
        // Charge is negative because we want nodes to repel.
        // Dividing by 8 scales down the charge to be
        // appropriate for the visualization dimensions.
        function charge(d) {
            return 0;
        }

        // Here we create a force layout and
        // configure it to use the charge function
        // from above. This also sets some contants
        // to specify how the force layout should behave.
        // More configuration is done below.
        var force = d3.layout.force()
            .size([innerWidth, height])
            .charge(charge)
            .gravity(0)

        // Sizes bubbles based on their area instead of raw radius
        var radiusScale = d3.scale.pow()
            .exponent(0.5)
            .range([2, 9]);

        /*
         * This data manipulation function takes the raw data
         * and converts it into an array of node objects.
         * Each node will store data and visualization values to visualize
         * a bubble.
         *
         * rawData is expected to be an array of data objects, read in from
         * one of d3's loading functions like d3.csv.
         *
         * This function returns the new node array, with a node in that
         * array for each element in the rawData input.
         */
        function createNodes(rawData) {

            var myNodes = rawData.map(function (d) {
                return {
                    geschaefts_nr: d["Geschäfts-nr."],
                    radius: radiusScale(convertSize(d.Instrument)),
                    instrument: d.Instrument,
                    size_instrument: convertSize(d.Instrument),
                    urheber: d["UrheberIn"],
                    titel: d.Titel,
                    status: d.Status,
                    letzte_uebersweisung: d.Jahr,
                    themenbereich: d.Themenbereich,
                    thema_1: d["Thema 1 (gleiche Nr. wie Themenbereich)"],
                    thema_2: d["Thema 2 (andere Nr.)"],
                    schwerpunktthema: d["Schwerpunktthema (bei Bedarf)"],
                    konsorten: d.Konsorten,
                    link: d.Link,
                    parteien: d.Parteien,
                    jahr: d.Jahr,
                    date: moment(new Date(d.Jahr)),
                    x: Math.random() * 900,
                    y: Math.random() * 800
                };
            });

            // sort them to prevent occlusion of smaller nodes.
            myNodes.sort(function (a, b) { return b.radius - a.radius; });

            return myNodes;
        }

        /*
         * Main entry point to the bubble chart. This function is returned
         * by the parent closure. It prepares the rawData for visualization
         * and adds an svg element to the provided selector and starts the
         * visualization creation process.
         *
         * selector is expected to be a DOM element or CSS selector that
         * points to the parent element of the bubble chart. Inside this
         * element, the code will add the SVG continer for the visualization.
         *
         * rawData is expected to be an array of data objects as provided by
         * a d3 loading function like d3.csv.
         */
        var chart = function chart(selector, rawData) {
            // Use the max total_amount in the data as the max in the scale's domain
            // note we have to ensure the total_amount is a number by converting it
            // with `+`.
            var maxAmount = d3.max(rawData, function (d) { return convertSize(d.Instrument); });
            radiusScale.domain([0, maxAmount]);

            nodes = createNodes(rawData);
            // Set the force's nodes to our newly created nodes array.
            force.nodes(nodes);

            // Bind nodes data to what will become DOM elements to represent them.
            bubbles = svg.selectAll('.bubble')
                .data(nodes, function (d) { return d.geschaefts_nr; });

            // Create new circle elements each with class `bubble`.
            // There will be one circle.bubble for each object in the nodes array.
            // Initially, their radius (r attribute) will be 0.
            bubbles.enter().append('circle')
                .classed('bubble', true)
                .attr('r', 0)
                .attr('fill', function (d) { return fillColor(d.themenbereich); })
                .attr('stroke', function (d) { return d3.rgb(fillColor(d.themenbereich)).darker(); })
                .attr('stroke-width', 2)
                .on('mouseover', showDetail)
                .on('mouseout', hideDetail);

            // Fancy transition to make bubbles appear, ending with the
            // correct radius
            bubbles.transition()
                .duration(2000)
                .attr('r', function (d) { return d.radius; })
                .attr('fill', function (d) { return fillColor(d.themenbereich); })
                .attr('stroke', function (d) { return d3.rgb(fillColor(d.themenbereich)).darker(); });

            bubbles.exit().remove();

            chart.toggleDisplay($('#toolbar').find('.active').attr('id'));

        };

        // Use map() to convert raw data into node data.
        // convert size based on importance of instrument
        function convertSize(instrument) {
            switch (instrument) {
                case 'Initiative':
                    return 8;
                case 'Motion':
                    return 4;
                case 'Anzug':
                    return 2;
                case 'Petition':
                    return 1;
                default:
                    console.error("Instrument not valid");
                    return 0;
            }
        }

        // user color variable defined in colors.js to set color for specific theme
        function fillColor(themenbereich) {
            var finalColor = "";
            COLORS.forEach(function (color) {
                if (color.themenbereich === themenbereich)
                    finalColor = color.color;
            });
            return finalColor;
        }

        /*
         * Sets visualization in "single group mode".
         * The year labels are hidden and the force layout
         * tick function is set to move all nodes to the
         * center of the visualization.
         */
        function groupBubbles() {
            hideCategories();

            force.on('tick', function (e) {
                bubbles.each(moveToCenter(e.alpha))
                    .attr('cx', function (d) { return d.x; })
                    .attr('cy', function (d) { return d.y; });
            });

            force.start();
        }

        /*
         * Helper function for "single group mode".
         * Returns a function that takes the data for a
         * single node and adjusts the position values
         * of that node to move it toward the center of
         * the visualization.
         *
         * Positioning is adjusted by the force layout's
         * alpha parameter which gets smaller and smaller as
         * the force layout runs. This makes the impact of
         * this moving get reduced as each node gets closer to
         * its destination, and so allows other forces like the
         * node's charge force to also impact final location.
         */
        function moveToCenter(alpha) {
            return function (d) {
                d.x = d.x + (center.x - d.x) * damper * alpha;
                d.y = d.y + (center.y - d.y) * damper * alpha;
            };
        }

        /*
         * Sets visualization in "split by year mode".
         * The year labels are shown and the force layout
         * tick function is set to move nodes to the
         * yearCenter of their data's year.
         */

        // todo: remove counter
        var counter;
        function splitBubbles(category) {

            if (category === 'all') {
              centers = [{
                title: "Alle",
                size: 10000,
                x: width / 2,
                y: height / 2
              }];
            } else {
              var centers = calculateCenters(nodes, category);
            }

            showTitles(centers);

            var centerMarkers = svg.selectAll('.centerMarkers')
                .data(centers)
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; });

            centerMarkers
                .enter()
                .append('circle')
                .attr('class', 'centerMarkers')
                .attr('r', 5)
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; });

            centerMarkers.exit().remove();

            force.on('tick', function (e) {
                bubbles
                    .each(moveToCategories(e.alpha, centers, category))
                    .each(collide(.11))
                    .attr('cx', function (d) {
                        return d.x;
                    })
                    .attr('cy', function (d) { return d.y; });
            });

            force.start();
        }

        /*
         * Helper function for "split by year mode".
         * Returns a function that takes the data for a
         * single node and adjusts the position values
         * of that node to move it the year center for that
         * node.
         *
         * Positioning is adjusted by the force layout's
         * alpha parameter which gets smaller and smaller as
         * the force layout runs. This makes the impact of
         * this moving get reduced as each node gets closer to
         * its destination, and so allows other forces like the
         * node's charge force to also impact final location.
         */
        function moveToCategories(alpha, centers, category) {
            return function (d) {
                var x = null;
                var y = null;
                centers.forEach(function (c) {
                    if (c.title === d[category] || category === 'all') {
                        x = c.x;
                        y = c.y;
                    }
                });

                var target = {x: x, y: y};
                d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
                d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;
                // just to debug. we have to remove this
                if (counter < 200)
                    d3.select('#vis').select('svg').append('circle').attr('class', 'centerMarker').attr('r', 5).attr('cx', x).attr('cy', y);
                counter++;
            };
        }

        // Resolves collisions between d and all other circles.
        function collide(alpha) {
            var maxRadius = 15, padding = 4;
            var quadtree = d3.geom.quadtree(nodes);
            return function (d) {
                var r = d.radius + maxRadius + padding,
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;
                quadtree.visit(function(quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== d)) {
                        var x = d.x - quad.point.x,
                            y = d.y - quad.point.y,
                            l = Math.sqrt(x * x + y * y),
                            r = d.radius + quad.point.radius + padding;
                        if (l < r) {
                            l = (l - r) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }
                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
            };
        }

        function calculateCenters(nodes, category) {
            // get unique values of category and calculate size of expected area
            var centers = [];
            nodes.forEach(function (d, i) {
                var found = false;
                centers.forEach(function(c) {
                    if (c.title === d[category]) {
                        c.size += d.radius * d.radius;
                        found = true;
                    }
                });
                if (!found) {
                    centers.push({title: d[category], size: d.radius * d.radius});
                }
            });
// TODO handle: arr has to be greater than 0. Test case if length === 1
            function sortBySize(arr) {
                var ordered = [];
                var head = arr.filter(function (current, i) {
                    return i % 2 === 0;
                });
                var tail = arr.filter(function (current, i) {
                    return i % 2 === 1;
                });

                head.map(function (current, i, array) {
                    ordered.push(current);
                    ordered.push(tail[array.length - 1 - i]);
                });
                return ordered;
            }

            function checkSize(arr) {
                if (arr.length % 2 === 1) {
                    var middle = arr[Math.floor(arr.length/2)];
                    var temp = arr.filter(function (current, i) {
                        return i !== Math.floor(arr.length/2);
                    });
                    arr = sortBySize(temp);
                    arr.splice(Math.ceil(arr.length / 2), 0, middle);
                    return arr;
                } else {
                    return sortBySize(arr);
                }
            }

            centers.sort(function (a, b) {
                return b.size - a.size;
            });
            centers = checkSize(centers);

            centers.forEach(function (d, i) {
                var x, y;
                centers[i].secondRow = false;
                // we want to add a second row if we have more than 6 groups
                if (centers.length > 6) {
                    // first row
                    if (i < Math.ceil(centers.length/2))  {
                        y = height / 3;
                        x = margin.left + i / Math.ceil(centers.length/2) * innerWidth;
                    // second row
                    } else {
                        centers[i].secondRow = true;
                        y = height * 2 / 3;
                        x = margin.left + (i-Math.ceil(centers.length/2)) / Math.ceil(centers.length/2) * innerWidth;
                    }
                } else {
                    x = margin.left + i * innerWidth / centers.length ;
                    y = height / 2;
                }
                centers[i].x = x;
                centers[i].y = y;
                centers[i].index = i;
            });

            return centers;

        }
        /*
         * Hides Year title displays.
         */
        function hideCategories() {
            svg.selectAll('.categoryLabels').remove();
        }

        /*
         * Shows Year title displays.
         */
        function showTitles(centers) {
            var categoryLabels = svg.selectAll('.categoryLabels')
                .data(centers);

            categoryLabels
                .attr('x', function (d) {
                    return d.x;
                })
                .attr('y', function (d) {
                    if (d.secondRow) {
                        return height - 40;
                    } else {
                        return 40;
                    }
                })
                .text(function (d) { return d.title; });

            categoryLabels.enter()
                .append('text')
                .attr('class', 'categoryLabels')
                .attr('x', function (d) {
                    return d.x;
                })
                .attr('y', function (d) {
                    if (d.secondRow) {
                        return height - 40;
                    } else {
                        return 40;
                    }
                })
                .attr('text-anchor', 'middle')
                .text(function (d) { return d.title; });

            categoryLabels.exit().remove();



            function checkIfMoveNecessary(labels, i) {
                var margin = 15;
                var leftI = parseInt(categoryLabels[0][i].getAttribute("x")) - categoryLabels[0][i].getBBox().width / 2;
                var rightIMinus1 = parseInt(categoryLabels[0][i-1].getAttribute("x")) + categoryLabels[0][i-1].getBBox().width / 2;
                var rightI = parseInt(categoryLabels[0][i].getAttribute("x")) + categoryLabels[0][i].getBBox().width / 2;
                var leftIplus1;
                if (typeof categoryLabels[0][i+1] !== 'undefined')
                    leftIplus1 = parseInt(categoryLabels[0][i+1].getAttribute("x")) - categoryLabels[0][i+1].getBBox().width / 2;
                else {
                    // number should be high enough
                    leftIplus1 = 10000;
                }
                return leftI < rightIMinus1 + margin || rightI > leftIplus1 - margin;
/*                parseInt(categoryLabels[0][i].getAttribute("x")) - categoryLabels[0][i].clientWidth / 2 < parseInt(categoryLabels[0][i-1].getAttribute("x")) ||
                (categoryLabels[i+1] && parseInt(categoryLabels[0][i].getAttribute("x")) + categoryLabels[0][i].clientWidth / 2 > parseInt(categoryLabels[0][i+1].getAttribute("x")))*/
            }

            // fix category labels
            // TODO: fix this
            for (var i = 1; i < categoryLabels[0].length; i += 2) {
                if (checkIfMoveNecessary(categoryLabels[0], i))
                d3.select(categoryLabels[0][i]).attr("y", parseInt(categoryLabels[0][i].getAttribute("y")) + 30);
            }
        }


        /*
         * Function called on mouseover to display the
         * details of a bubble in the tooltip.
         */
        function showDetail(d) {
            // change outline to indicate hover state.
            d3.select(this).attr('stroke', 'black');

            var content = '<span class="name">Geschäftsnummer: </span><span class="value"><a href="'+d.link+'">' +
                d.geschaefts_nr +
                '</a></span><br/>' +
                '<span class="name">Titel: </span><span class="value">' +
                d.titel +
                '</span><br/>' +
                '<span class="name">Instrument: </span><span class="value">' +
                d.instrument +
                '</span><br/>' +
                '<span class="name">Partei: </span><span class="value">' +
                d.parteien +
                '</span><br/>' +
                '<span class="name">Status: </span><span class="value">' +
                d.status +
                '</span><br/>' +
                '<span class="name">Thema: </span><span class="value">' +
                d.themenbereich +
                '</span><br/>' +
                '<span class="name">Unterthema 1: </span><span class="value">' +
                d.thema_1 +
                '</span><br/>' +
                '<span class="name">Unterthema 2: </span><span class="value">' +
                d.thema_2 +
                '</span>';
            tooltip.showTooltip(content, d3.event);
        }

        /*
         * Hides tooltip
         */
        function hideDetail(d) {
            // reset outline
            d3.select(this)
                .attr('stroke', d3.rgb(fillColor(d.themenbereich)).darker());

            tooltip.hideTooltip();
        }

        /*
         * Externally accessible function (this is attached to the
         * returned chart function). Allows the visualization to toggle
         * between "single group" and "split by year" modes.
         *
         * displayName is expected to be a string and either 'year' or 'all'.
         */
        chart.toggleDisplay = function (category) {
            if (category === 'alleeee') {
                groupBubbles();
            } else {
                splitBubbles(category);
            }
        };


        // return the chart function from closure.
        return chart;
    },

    /*
     * Below is the initialization code as well as some helper functions
     * to create a new bubble chart instance, load the data, and display it.
     */

    /*
     * Function called once data is loaded from CSV.
     * Calls bubble chart function to display inside #vis div.
     */
    display: function(data) {
        BubbleChart.myBubbleChart('#vis', data);
    },

    /*
     * Sets up the layout buttons to allow for toggling between view modes.
     */
    setupButtons: function() {
        d3.select('#toolbar')
            .selectAll('.btn')
            .on('click', function () {
                // Remove active class from all buttons
                d3.selectAll('.btn').classed('active', false);
                // Find the button just clicked
                var button = d3.select(this);

                // Set it as the active button
                button.classed('active', true);

                // Get the id of the button
                var buttonId = button.attr('id');

                // Toggle the bubble chart based on
                // the currently clicked button.
                BubbleChart.myBubbleChart.toggleDisplay(buttonId);
            });
    },

    /*
     * Helper function to convert a number into a string
     * and add commas to it to improve presentation.
     */
    addCommas: function(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return x1 + x2;
    },

    initialize: function(data) {
      // Create a SVG element inside the provided selector
      // with desired size.
      BubbleChart.svg = d3.select('#vis')
        .append('svg');
      BubbleChart.update(data);
    },

    update: function (data) {
      BubbleChart.myBubbleChart = BubbleChart.bubbleChart();
      // Show the data
      BubbleChart.display(data);

      // setup the buttons.
      BubbleChart.setupButtons();
    }

};