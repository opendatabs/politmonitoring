class FillColorCalculator {
  constructor(useSubColors) {
    this.useSubColors = useSubColors;
    this.subCategorieColors = [];
    this.MAX_CATEGORIES = 3;
  }

  calculateColor(themenbereich, thema_1) {
    let finalColor = "";
    COLORS.forEach(function (color) {
      if (color.themenbereich === themenbereich)
        finalColor = color.color;
    });

    if (this.useSubColors) {
      finalColor = this.calculateSubcolor(finalColor, thema_1);
    }

    return finalColor;
  }

  calculateSubcolor(color, thema_1) {
    let found = false;

    color = d3.rgb(color);
    let maxV = Math.max(color.r, color.g, color.b);
    let absMinV = 255 - Math.min(color.r, color.g, color.b);
    let step = 0;
    if (maxV > absMinV) {
      step = maxV / this.MAX_CATEGORIES;
    } else {
      step = -(absMinV / this.MAX_CATEGORIES);
    }
    step = Math.round(step);

    this.subCategorieColors.forEach(d => {
      if (d.name === thema_1) {
        color = d.color;
        found = true;
      }
    });
    if (!found) {
      let newColor = {
        r: (color.r + this.subCategorieColors.length * step),
        g: (color.g + this.subCategorieColors.length * step),
        b: (color.b + this.subCategorieColors.length * step),
      };
      this.subCategorieColors.push({name: thema_1, color: newColor});
      color = newColor;
    }
    return d3.rgb(color.r, color.g, color);
  }

  calculateBorder(color) {
    return d3.rgb(color).darker();
  }


}
