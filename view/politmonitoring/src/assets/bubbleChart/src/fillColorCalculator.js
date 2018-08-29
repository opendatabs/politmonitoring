class FillColorCalculator {
  constructor(useSubColors) {
    this.useSubColors = useSubColors;
    this.subCategoryColors = {};
  }

  // calculates a color based on different inputs. darker is used for border => returns same color but a little bit darker
  // can be used for main categories or subcategories => useSubColors as object property
  calculateColor(themenbereich, thema_1, darker) {
    let finalColor = "";
    COLORS.forEach(function (color) {
      if (color.themenbereich === themenbereich)
        finalColor = color.color;
    });

    if (this.useSubColors) {
      finalColor = this.calculateSubcolor(finalColor, themenbereich, thema_1);
    }

    // make it darker if required
    if (darker)
      finalColor = d3.rgb(finalColor).darker();

    return finalColor;
  }

  calculateSubcolor(color, themenbereich, thema_1) {

    // count number of "thema_1" in every "themenbereich". it's possible to have multipe "themenbereiche" because filter
    // filters "themenbereich" and "thema_2"
    if (this.subCategoryColors.hasOwnProperty(themenbereich)) {
      if (this.subCategoryColors[themenbereich].indexOf(thema_1) === -1) {
        this.subCategoryColors[themenbereich].push(thema_1);
      }
    } else {
      this.subCategoryColors[themenbereich] = [thema_1];
    }

    // calculate lightness based on position of "thema_1" in array of "themenbereich". smallest lightness is 0.1,
    // then increasing 0.1 for each position in array
    let lightness = 0.3 + this.subCategoryColors[themenbereich].indexOf(thema_1) * 0.1;

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
