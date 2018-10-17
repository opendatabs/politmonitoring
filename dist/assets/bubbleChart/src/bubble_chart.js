/* This file has to be transpiled to < ES6 to properly function in older Browsers.
 * Run "npm run babel" in the ~/view/politmonitoring folder to transpile with Babel
 * 
 */
const $ = jQuery;

/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */

const BubbleChart = {
  myBubbleChart: null,
  svg: null,
  fillColorCalculator: null,
  themenbereich_1Filter: null,
  // defines size of bubbles
  AMOUNT_INSTRUMENTS: {
    Initiative: 8,
    Anzug: 2,
    Motion: 4,
    Petition: 1
  },

  bubbleChart: function () {
    // Constants for sizing
    const wrapper = document.getElementById('vis');
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;
    const margin = {left: 140, right: 160};
    const innerWidth = width - margin.left - margin.right;

    // tooltip for mouseover functionality
    const tooltip = floatingTooltip('gates_tooltip', 240);
    let tooltipFixed = false;

    // Locations to move bubbles towards, depending
    // on which view mode is selected.
    const center = {x: width / 2, y: height / 2};

    // Used when setting up force and
    // moving around nodes
    const damper = 0.102;

    const svg = BubbleChart.svg
      .attr('width', width)
      .attr('height', height);
    let bubbles = null;
    let nodes = [];

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
    const force = d3.layout.force()
      .size([innerWidth, height])
      .charge(charge)
      .gravity(0);

    // Sizes bubbles based on their area instead of raw radius
    const radiusScale = d3.scale.pow()
      .exponent(0.5)
      .range([1, 10]);

    let infotext = {
      motion: 'Die Motion ist das parlamentarische Instrument mit dem stärksten verpflichtenden Charakter. Mit ihr kann jedes Ratsmitglied oder eine ständige Kommission vom Regierungsrat verbindlich fordern, dem Grossen Rat ein neues Gesetz, eine Verfassungs- oder Gesetzesänderung oder eine Massnahme zu unterbreiten. Nur die an den Regierungsrat überwiesenen Motionen werden in der Visualisierung abgebildet.',
      petition: 'Die Petition ist ein Grundrecht, das allen Menschen unabhängig von Nationalität oder Alter zur Verfügung steht. Auch Ausländerinnen und Ausländer, Bewohnerinnen und Bewohner anderer Kantone sowie Kinder haben das Recht, schriftlich Bitten, Anregungen oder Beschwerden an jede Behörde zu richten. Petitionen werden von der Petitionskommission bearbeitet und benötigen keine Mindestzahl an Unterschriften. Nur die durch den Grossen Rat an den Regierungsrat überwiesenen Petitionen werden in der Visualisierung erfasst.',
      anzug: 'Der Anzug ist das am häufigsten gewählte parlamentarische Instrument und entspricht dem Postulat beim Bund bzw. den meisten Kantonen. Per Anzug kann jedes Ratsmitglied oder eine ständige Kommission dem Regierungsrat oder dem Grossen Rat Anregungen zur Änderung der Verfassung, zu Gesetzen oder Beschlüssen oder zu Massnahmen der Verwaltung vorlegen. Nur die an den Regierungsrat überwiesenen Anzüge werden in der Visualisierung erfasst.',
      initiative: '3\'000 Stimmberechtigte können innert 18 Monaten eine Initiative einreichen, um eine Verfassungs- oder eine Gesetzesänderung einzubringen. Sofern der Grosse Rat die Volksinitiative als rechtlich zulässig erachtet, muss er sie behandeln. Er kann die Initiative unterstützen, zur Ablehnung empfehlen oder einen Gegenvorschlag beschliessen und ausarbeiten lassen. Auch der Regierungsrat kann beim Grossen Rat einen Gegenvorschlag beantragen. In der Visualisierung werden alle zustande gekommenen Initiativen erfasst. Im Anschluss an eine Abstimmung gelten sie als erledigt.'
    };

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

      const myNodes = rawData.map(function (d) {
        return {
          geschaefts_nr: d["Geschäfts-nr"],
          radius: radiusScale(BubbleChart.AMOUNT_INSTRUMENTS[d.Instrument]),
          instrument: d.Instrument,
          urheber: d["UrheberIn"],
          titel: d.Titel,
          status: d.Status,
          letzte_uebersweisung: d.Jahr,
          themenbereich_1: d["Themenbereich 1"],
          themenbereich_thema_2: d["Themenbereich 2"],
          thema_1: d["Thema 1"],
          thema_2: d["Thema 2"],
          schwerpunktthema: d["Schwerpunktthema (bei Bedarf)"],
          konsorten: d.Konsorten,
          link: d.Link,
          parteien: d.Partei,
          jahr: d.Jahr,
          date: moment(new Date(d.Jahr)),
          x: Math.random() * 900,
          y: Math.random() * 800
        };
      });

      // sort them to prevent occlusion of smaller nodes.
      myNodes.sort(function (a, b) {
        return b.radius - a.radius;
      });

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
    const chart = function chart(selector, rawData) {
      radiusScale.domain([0, BubbleChart.AMOUNT_INSTRUMENTS.Initiative]);

      nodes = createNodes(rawData);
      // Set the force's nodes to our newly created nodes array.
      force.nodes(nodes);

      // Bind nodes data to what will become DOM elements to represent them.
      bubbles = svg.selectAll('.bubble')
        .data(nodes, function (d) {
          return d.geschaefts_nr;
        });

      // Create new circle elements each with class `bubble`.
      // There will be one circle.bubble for each object in the nodes array.
      // Initially, their radius (r attribute) will be 0.
      bubbles.enter().append('circle')
        .classed('bubble', true)
        .attr('r', 0)
        .attr('fill', function (d) {
          return BubbleChart.fillColorCalculator.calculateColor(d.themenbereich_1, d.thema_1);
        })
        .attr('stroke', function (d) {
          return BubbleChart.fillColorCalculator.calculateColor(d.themenbereich_1, d.thema_1, true);
        })
        .attr('stroke-width', 2)
        .on('mouseover', function(d) {
          if (!tooltipFixed) {
            showDetail(this, d, false)
          }
        })
        .on('click', function(d) {showDetail(this, d, true) })
        .on('mouseout', function(d) {
          if (!tooltipFixed) {
            hideDetail(this, d)
          }
        });

      // Fancy transition to make bubbles appear, ending with the
      // correct radius
      bubbles.transition()
        .duration(2000)
        .attr('r', function (d) {
          return d.radius;
        })
        .attr('fill', function (d) {
          return BubbleChart.fillColorCalculator.calculateColor(d.themenbereich_1, d.thema_1);
        })
        .attr('stroke', function (d) {
          return BubbleChart.fillColorCalculator.calculateColor(d.themenbereich_1, d.thema_1, true);
        });

      bubbles.exit().remove();

      chart.toggleDisplay($('#toolbar').find('.active').attr('id'));

    };

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
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) {
            return d.y;
          });
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
    function splitBubbles(category) {
      let centers;

      if (category === 'all') {
        centers = [{
          title: "Alle",
          size: 10000,
          x: width / 2,
          y: height / 2
        }];
      } else {
        const centerCalculator = new CenterCalculator(category, width, height, margin, innerWidth, BubbleChart.themenbereich_1Filter);
        centers = centerCalculator.calculateCenters(nodes);
      }

      showTitles(centers);

      const centerMarkers = svg.selectAll('.centerMarkers')
        .data(centers)
        .attr('cx', function (d) {
          return d.x;
        })
        .attr('cy', function (d) {
          return d.y;
        });

      centerMarkers
        .enter()
        .append('circle')
        .attr('class', 'centerMarkers')
        .attr('r', 5)
        .attr('cx', function (d) {
          return d.x;
        })
        .attr('cy', function (d) {
          return d.y;
        });

      centerMarkers.exit().remove();

      force.on('tick', function (e) {
        bubbles
          .each(moveToCategories(e.alpha, centers, category))
          .each(collide(.11))
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) {
            return d.y;
          });
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
        let x = null;
        let y = null;
        centers.forEach(function (c) {
          if (c.title === d[category] || category === 'all') {
            x = c.x;
            y = c.y;
            // special rule for splitting by thema_1. it's possible, that themenbereich_1 is not the same as themenbereich_1Filter
            // (in this case, themenbereich_1 thema 2 would be the same). Then place the bubble by thema_2
          } else if (BubbleChart.themenbereich_1Filter !== 'all' && d.themenbereich_1 !== BubbleChart.themenbereich_1Filter &&
          c.title === d.thema_2) {
            x = c.x;
            y = c.y;
          }
        });

        const target = {x: x, y: y};
        d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
        d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;
      };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      const maxRadius = 15, padding = 4;
      const quadtree = d3.geom.quadtree(nodes);
      return function (d) {
        const r = d.radius + maxRadius + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function (quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            let x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y);
            const r = d.radius + quad.point.radius + padding;
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

    /*
     * Hides Year title displays.
     */
    function hideCategories() {
      svg.selectAll('.categoryLabels').remove();
    }

    let infoTooltip = d3.select("body").append("div")
      .attr("class", "infoTooltip")
      .style("opacity", 0);

    /*
     * Shows Year title displays.
     */
    function showTitles(centers) {
      const categoryLabels = svg.selectAll('.categoryLabels')
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
        .text(function (d) {
          return d.title;
          })

        .on("mouseover", (d) => onMouseOver(d, this, infoTooltip))
        .on("mouseout", (d) => onMouseOut(infoTooltip));


      onMouseOver = (d, scope, infoTooltip) => {
        let info = null;

        
        if (d.title === 'Petition')
        info = infotext.petition;
        if (d.title === 'Anzug')
        info = infotext.anzug;
        if (d.title === 'Motion')
        info = infotext.motion;
        if (d.title === 'Initiative')
        info = infotext.initiative;
        
        if (info !== null) {
          infoTooltip.transition()
            .duration(2000)
            .style("opacity", 1);
        }

        infoTooltip.html(info)
          .style("left", (d.x - 80) + "px")
          .style("top", (d.y + - 20) + "px");
      };

      onMouseOut = (infoTooltip) => {
        infoTooltip.transition().duration(500).style("opacity", 0);
      };

      categoryLabels.enter()
        .append('text')
        .attr('class', 'categoryLabels')
        .attr('x', function (d) {
          return d.x;
        })
        .attr('y', function (d) {
          if (d.secondRow) {
            return height - 45;
          } else {
            return 40;
          }
        })
        .attr('text-anchor', 'middle')
        .text(function (d) {
          return d.title;
        });

      categoryLabels.exit().remove();

      const labelColorLines = svg.selectAll('.labelColorLine')
        .data(centers);

      labelColorLines.enter()
        .append('line')
        .attr('class', 'labelColorLine')
        .attr('x1', d => {
          return d.x - 12 + "px";
        })
        .attr('x2', d => {
          return d.x + 12 + "px";
        })
        .attr('y1', d => {
          if (d.secondRow) {
            return height - 35;
          } else {
            return 50;
          }
        })
        .attr('y2', d => {
          if (d.secondRow) {
            return height - 35;
          } else {
            return 50;
          }
        })
        .attr('stroke', d => {
          if (BubbleChart.themenbereich_1Filter === 'all') {
            return BubbleChart.fillColorCalculator.calculateColor(d.title, null);
          } else {
            return BubbleChart.fillColorCalculator.calculateColor(BubbleChart.themenbereich_1Filter, d.title);
          }
        })
        .attr('stroke-width', 2);

      labelColorLines
        .attr('x1', d => {
          return d.x - 12 + "px";
        })
        .attr('x2', d => {
          return d.x + 12 + "px";
        })
        .attr('y1', d => {
          if (d.secondRow) {
            return height - 35;
          } else {
            return 50;
          }
        })
        .attr('y2', d => {
          if (d.secondRow) {
            return height - 35;
          } else {
            return 50;
          }
        })
        .attr('stroke', d => {
          if (BubbleChart.themenbereich_1Filter === 'all') {
            return BubbleChart.fillColorCalculator.calculateColor(d.title, null);
          } else {
            return BubbleChart.fillColorCalculator.calculateColor(BubbleChart.themenbereich_1Filter, d.title);
          }
        });

      labelColorLines.exit().remove();

      // Bug fix to remove remaining labelColorLines
      if (BubbleChart.category !== 'themenbereich_1' && BubbleChart.category !== 'thema_1') {
        d3.selectAll(".labelColorLine").remove();
      }

      // this function moves some lables up/down if there is not enough space to show all title on same line
      function checkIfMoveNecessary(labels, i) {
        const margin = 15;
        const leftI = parseInt(categoryLabels[0][i].getAttribute("x")) - categoryLabels[0][i].getBBox().width / 2;
        // PREVIOUS LABEL
        const rightIMinus1 = parseInt(categoryLabels[0][i - 1].getAttribute("x")) + categoryLabels[0][i - 1].getBBox().width / 2;
        const leftIMinus1 = parseInt(categoryLabels[0][i - 1].getAttribute("x")) - categoryLabels[0][i - 1].getBBox().width / 2;
        // if x of this element is smaller than x of previous element, this is the first element of the second row
        if (leftI < leftIMinus1) {
          return false;
        }

        return leftI < rightIMinus1 + margin;
      }

      // fix category labels
      let move = false;
      for (let i = 1; i < categoryLabels[0].length - 1; i ++) {
          move = move || checkIfMoveNecessary(categoryLabels[0], i);
      }
      if (move) {
        for (let i = 1; i < categoryLabels[0].length; i += 2) {
          // move labels and colorLines
          d3.select(categoryLabels[0][i]).attr("y", parseInt(categoryLabels[0][i].getAttribute("y")) + 30);
          d3.select(labelColorLines[0][i]).attr("y1", parseInt(labelColorLines[0][i].getAttribute("y1")) + 30);
          d3.select(labelColorLines[0][i]).attr("y2", parseInt(labelColorLines[0][i].getAttribute("y2")) + 30);
        }
      }

    }


    /*
     * Function called on mouseover to display the
     * details of a bubble in the tooltip.
     */
    function showDetail(self, d, fixed) {
      // change outline to indicate hover state.
      d3.select(self).attr('stroke', 'black');

      let content = '<span class="name">Geschäftsnummer: </span><span class="value"><a target="_blank" href="' + d.link + '">' +
        d.geschaefts_nr +
        '</a> ('+d.jahr +')</span><br/>' +
        '<span class="name">Titel: </span><span class="value">' +
        d.titel +
        '</span><br/>' +
        '<span class="name">Partei: </span><span class="value">' +
        d.parteien +
        '</span><br/>' +
        '<span class="name">Status: </span><span class="value">' +
        d.status +
        '</span><br/>' +
        '<span class="name">Themenbereich: </span><span class="value">' +
        d.themenbereich_1 +
        '</span><br/>' +
        '<span class="name">Thema 1: </span><span class="value">' +
        d.thema_1 +
        '</span><br/>';
      if (d.thema_2.length !== 0) {

        content += '<span class="name">Thema 2: </span><span class="value">' +
        d.thema_2 + '</span>';
      }

      tooltip.showTooltip(content, d3.event, fixed);
      tooltipFixed = fixed;

      $('.custom_tooltip').on('mouseleave', function () {
        tooltipFixed = false;
        hideDetail(self, d);
      })
    }

    /*
     * Hides tooltip
     */
    function hideDetail(self, d) {
      // reset outline
      d3.select(self)
        .attr('stroke', BubbleChart.fillColorCalculator.calculateColor(d.themenbereich_1, d.thema_1, true));
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
      // store category
        BubbleChart.category = category;
        splitBubbles(category);
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
  display: function (data) {
    BubbleChart.myBubbleChart('#vis', data);
  },

  /*
   * Sets up the layout buttons to allow for toggling between view modes.
   */
  setupButtons: function () {
    d3.select('#toolbar')
      .selectAll('.btn')
      .on('click', function () {
        // Remove active class from all buttons
        d3.selectAll('.btn').classed('active', false);
        // Find the button just clicked
        const button = d3.select(this);

        // Set it as the active button
        button.classed('active', true);

        // Get the id of the button
        const buttonId = button.attr('id');

        // Toggle the bubble chart based on
        // the currently clicked button.
        BubbleChart.myBubbleChart.toggleDisplay(buttonId);
      });
  },

  /*
   * Helper function to convert a number into a string
   * and add commas to it to improve presentation.
   */
  addCommas: function (nStr) {
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    return x1 + x2;
  },

  // Create a SVG element inside the provided selector
initialize: function (data, themenbereich_1Filter) {
    BubbleChart.themenbereich_1Filter = themenbereich_1Filter;
    // remove old svg element
    BubbleChart.svg = d3.select('#vis').select('svg').remove();
  // with desired size.
    BubbleChart.svg = d3.select('#vis')
      .append('svg');
    BubbleChart.update(data);
  },

  update: function (data) {
    BubbleChart.fillColorCalculator = new FillColorCalculator($('#toolbar').find('#thema_1').length === 1);
    BubbleChart.myBubbleChart = BubbleChart.bubbleChart();
    // Show the data
    BubbleChart.display(data);

    // setup the buttons.
    BubbleChart.setupButtons();
  },


};
