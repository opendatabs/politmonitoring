"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CenterCalculator = function () {
  function CenterCalculator() {
    _classCallCheck(this, CenterCalculator);
  }

  _createClass(CenterCalculator, [{
    key: "calculateCenters",
    value: function calculateCenters(nodes, category, width, height, margin, innerWidth) {
      // check if user defined centers in CENTERS variable in config
      if (typeof CENTERS[category] !== "undefined") {
        return this.fixedCenters(nodes, category, width, height);
      } else {
        var centers = this.calculateNumberOfCirclesInCluster(nodes, category);
        centers = this.sort(centers, category);
        centers = this.calculateCoordinates(centers, category, width, height, margin, innerWidth);
        return centers;
      }
    }
  }, {
    key: "fixedCenters",


    // if centers are fixed in config, this function calculates coordinates
    value: function fixedCenters(nodes, category, width, height) {
      var centers = CENTERS[category];
      centers.forEach(function (d, i) {
        d.index = i;
        d.x = d.center * width;
        d.y = height / 2;
      });
      return centers;
    }
  }, {
    key: "calculateNumberOfCirclesInCluster",
    value: function calculateNumberOfCirclesInCluster(nodes, category) {
      // get unique values of category and calculate size of expected area
      var centers = [];
      nodes.forEach(function (d, i) {
        var found = false;
        centers.forEach(function (c) {
          if (c.title === d[category]) {
            c.size++;
            found = true;
          }
        });
        if (!found) {
          centers.push({ title: d[category], size: 1 });
        }
      });
      return centers;
    }

    // sort ascending or descending, based on given category and cluster size

  }, {
    key: "sort",
    value: function sort(centers, category) {

      if (category === 'jahr') {
        centers.sort(function (a, b) {
          return a.title - b.title;
        });
      } else {
        centers.sort(function (a, b) {
          var deltaSize = b.size - a.size;
          // order by size
          if (deltaSize !== 0) {
            return deltaSize;
            // if size is equal, order by title
          } else {
            return a.title.localeCompare(b.title);
          }
        });
      }
      return centers;
    }

    // calculates coordinates for centers based on sort order

  }, {
    key: "calculateCoordinates",
    value: function calculateCoordinates(centers, category, width, height, margin, innerWidth) {
      if (centers.length === 1) {
        centers[0].x = width / 2;
        centers[0].y = height / 2;
        // distance between center 1 and center 2 was too large. So we need a special case cases with only two centers
      } else if (centers.length === 2) {
        centers[0].x = width / 4;
        centers[0].y = height / 2;
        centers[1].x = width / 4 * 3;
        centers[1].y = height / 2;
      } else {
        centers.forEach(function (d, i) {
          var x = void 0,
            y = void 0;
          centers[i].secondRow = false;
          // we want to add a second row if we have more than 6 groups
          if (centers.length > 6) {
            // first row
            if (i < Math.ceil(centers.length / 2)) {
              y = height / 3;
              x = margin.left + i / Math.ceil(centers.length / 2 - 1) * innerWidth;
              // second row
            } else {
              centers[i].secondRow = true;
              y = height * 2 / 3;
              x = margin.left + (i - Math.ceil(centers.length / 2)) / Math.ceil((centers.length - 1) / 2) * innerWidth;
            }
          } else {
            x = margin.left + i * innerWidth / (centers.length - 1);
            y = height / 2;
          }
          centers[i].x = x;
          centers[i].y = y;
          centers[i].index = i;
        });
      }
      return centers;
    }

    // calculates space used by circles if they are ordered in bubbles
    /*  calculateClusterSize(nodes, category) {
        // get unique values of category and calculate size of expected area
        let centers = [];
        nodes.forEach(function (d, i) {
          let found = false;
          centers.forEach(function (c) {
            if (c.title === d[category]) {
              c.size += d.radius * d.radius;
              found = true;
            }
          });
          if (!found) {
            centers.push({title: d[category], size: d.radius * d.radius});
          }
        });
        return centers;
      }*/

    /*  defaultAlgorithm(nodes, category, width, height, margin, innerWidth) {
        // get unique values of category and calculate size of expected area
        let centers = [];
        nodes.forEach(function (d, i) {
          let found = false;
          centers.forEach(function (c) {
            if (c.title === d[category]) {
              c.size += d.radius * d.radius;
              found = true;
            }
          });
          if (!found) {
            centers.push({title: d[category], size: d.radius * d.radius});
          }
        });
        if (centers.length === 1) {
          centers[0].x = width / 2;
          centers[0].y = height / 2;
          return centers;
        }

    // TODO handle: arr has to be greater than 0. Test case if length === 1
        function sortBySize(arr) {
          const ordered = [];
          const head = arr.filter(function (current, i) {
            return i % 2 === 0;
          });
          const tail = arr.filter(function (current, i) {
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
            const middle = arr[Math.floor(arr.length / 2)];
            const temp = arr.filter(function (current, i) {
              return i !== Math.floor(arr.length / 2);
            });
            arr = sortBySize(temp);
            arr.splice(Math.ceil(arr.length / 2), 0, middle);
            return arr;
          } else {
            return sortBySize(arr);
          }
        }

        if (category === 'jahr') {
          centers.sort(function (a, b) {
            return a.title - b.title;
          });
        } else {
          centers.sort(function (a, b) {
            return b.size - a.size;
          });
          centers = checkSize(centers);
        }

        centers.forEach(function (d, i) {
          let x, y;
          centers[i].secondRow = false;
          // we want to add a second row if we have more than 6 groups
          if (centers.length > 6) {
            // first row
            if (i < Math.ceil(centers.length / 2)) {
              y = height / 3;
              x = margin.left + i / Math.ceil((centers.length) / 2-1) * innerWidth;
              // second row
            } else {
              centers[i].secondRow = true;
              y = height * 2 / 3;
              x = margin.left + (i - Math.ceil((centers.length) / 2)) / Math.ceil((centers.length-1) / 2) * innerWidth;
            }
          } else {
            x = margin.left + i * innerWidth / (centers.length-1);
            y = height / 2;
          }
          centers[i].x = x;
          centers[i].y = y;
          centers[i].index = i;
        });

        return centers;
      }*/

  }]);

  return CenterCalculator;
}();
