class CenterCalculator {
  calculateCenters(nodes, category, width, height, margin, innerWidth) {
    // check if user defined centers in CENTERS variable in config
    if (typeof CENTERS[category] !== "undefined") {
      return this.fixedCenters(nodes, category, width, height)
    } else {
      return this.defaultAlgorithm(nodes, category, width, height, margin, innerWidth);
    }
  };

  fixedCenters(nodes, category, width, height) {
    const centers = CENTERS[category];
    centers.forEach((d,i) => {
      d.index = i;
      d.x = d.center * width;
      d.y = height / 2;
    });
    return centers;
  }

  defaultAlgorithm(nodes, category, width, height, margin, innerWidth) {
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
  }
}
