class FillColorCalculator {
  constructor(useSubColors) {
    this.useSubColors = useSubColors;
    this.subCategoryColors = {};
  }

  // calculates a color based on different inputs. darker is used for border => returns same color but a little bit darker
  // can be used for main categories or subcategories => useSubColors as object property
  calculateColor(themenbereich_1, thema_1, darker) {
    let finalColor = "";
    COLORS.forEach(function (color) {
      if (color.themenbereich_1 === themenbereich_1)
        finalColor = color.color;
    });

    if (this.useSubColors) {
      finalColor = this.calculateSubcolor(finalColor, themenbereich_1, thema_1);
    }

    // make it darker if required
    if (darker)
      finalColor = d3.rgb(finalColor).darker();

    return finalColor;
  }

  calculateSubcolor(color, themenbereich_1, thema_1) {

    // count number of "thema_1" in every "themenbereich_1". it's possible to have multipe "themenbereich_1" because filter
    // filters "themenbereich_1" and "thema_2"
    if (this.subCategoryColors.hasOwnProperty(themenbereich_1)) {
      if (this.subCategoryColors[themenbereich_1].indexOf(thema_1) === -1) {
        this.subCategoryColors[themenbereich_1].push(thema_1);
      }
    } else {
      this.subCategoryColors[themenbereich_1] = [thema_1];
    }

    // calculate lightness based on position of "thema_1" in array of "themenbereich_1". smallest lightness is 0.1,
    // then increasing 0.1 for each position in array
    let lightness = 0.3 + this.subCategoryColors[themenbereich_1].indexOf(thema_1) * 0.1;

    color = d3.hsl(color);
    let newColor = d3.hsl(
      color.h,
      color.s,
      lightness
    );
    // converte back to rgb
    return d3.rgb(newColor);
  }

}
