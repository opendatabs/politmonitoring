class CenterCalculator {
  constructor(category, width, height, margin, innerWidth, themenbereich_1Filter) {
    this.category = category;
    this.width = width;
    this.height = height;
    this.margin = margin;
    this.innerWidth = innerWidth;
    this.themenbereich_1Filter = themenbereich_1Filter;
  }
  calculateCenters(nodes) {
    // check if user defined centers in CENTERS variable in config
    if (typeof CENTERS[this.category] !== "undefined") {
      return this.fixedCenters(nodes)
    } else {
      let centers = this.calculateNumberOfCirclesInCluster(nodes);
      centers = this.sort(centers);
      centers = this.calculateCoordinates(centers);
      return centers;
    }
  };

  // if centers are fixed in config, this function calculates coordinates
  fixedCenters(nodes) {
    const centers = CENTERS[this.category];
    centers.forEach((d,i) => {
      d.index = i;
      d.x = d.center * this.width;
      d.y = this.height / 2;
    });
    return centers;
  }

  calculateNumberOfCirclesInCluster(nodes) {
    // get unique values of category and calculate size of expected area
    let centers = [];
    const self = this;
    nodes.forEach(function (d, i) {
      /*
      * If bubbles are split by thema_1 we only want to see those centers and labels for thema_1 with correct Themenbereich 1.
      * Becaus the filter consideres thema_1 AND thema_2, we also receive nodes with a different Themenbereich 1. (In the case
      * (of "Themenbereich 2", this is same as categoryFilter)
      */
      let found = false;
      let category;
      // if grouped by thema_1, allow the creation of new centers from matching thema_2
      if (self.category === 'thema_1') {
        (self.themenbereich_1Filter !== 'all' && self.themenbereich_1Filter !== d.themenbereich_1
          && self.themenbereich_1Filter === d.themenbereich_thema_2)
          ? category = 'thema_2'
          : category = self.category;
        centers.forEach(function (c) {
          if (c.title === d[category]) {
            c.size++;
            found = true;
          }
        });
        if (!found) {
          centers.push({title: d[category], size: 1});
        }
      } 
      // if grouped by something different than thema_1 let the center always be self.category
      else {
        category = self.category;
        centers.forEach(function (c) {
          if (c.title === d[category]) {
            c.size++;
            found = true;
          }
        });
        if (!found) {
          centers.push({ title: d[category], size: 1 });
        }
      }
    });
    return centers;
  }

  // sort ascending or descending, based on given category and cluster size
  sort(centers) {
    if (this.category === 'jahr') {
      centers.sort((a,b) => a.title - b.title);
      // Sort descending on category "jahr"
      return centers.reverse();
    } else {
      centers.sort((a, b) => {
        let deltaSize = b.size - a.size;
        // order by size
        if (deltaSize !== 0) {
          return deltaSize;
          // if size is equal, order by title
        } else {
          return a.title.localeCompare(b.title);
        }
      });
      return centers;
    }
  }

  // calculates coordinates for centers based on sort order
  calculateCoordinates(centers) {
    const self = this;
    if (centers.length === 1) {
      centers[0].x = self.width / 2;
      centers[0].y = self.height / 2;
      // distance between center 1 and center 2 was too large. So we need a special case cases with only two centers
    } else if (centers.length === 2) {
      centers[0].x = self.width / 4;
      centers[0].y = self.height / 2;
      centers[1].x = self.width / 4 * 3;
      centers[1].y = self.height / 2;
    }else {
      centers.forEach(function (d, i) {
        let x, y;
        centers[i].secondRow = false;
        // we want to add a second row if we have more than 6 groups
        if (centers.length > 6) {
          // first row
          if (i < Math.ceil(centers.length / 2)) {
            y = self.height / 3;
            x = self.margin.left + i / Math.ceil((centers.length) / 2-1) * self.innerWidth;
            // second row
          } else {
            centers[i].secondRow = true;
            y = self.height * 2 / 3;
            x = self.margin.left + (i - Math.ceil((centers.length) / 2)) / Math.ceil((centers.length-1) / 2) * self.innerWidth;
          }
        } else {
          x = self.margin.left + i * self.innerWidth / (centers.length-1);
          y = self.height / 2;
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
}
