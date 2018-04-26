"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FillColorCalculator = function () {
  function FillColorCalculator(useSubColors) {
    _classCallCheck(this, FillColorCalculator);

    this.useSubColors = useSubColors;
    this.subCategorieColors = [];
    this.MAX_CATEGORIES = 3;
  }

  _createClass(FillColorCalculator, [{
    key: "calculateColor",
    value: function calculateColor(themenbereich, thema_1, darker) {
      var finalColor = "";
      COLORS.forEach(function (color) {
        if (color.themenbereich === themenbereich) finalColor = color.color;
      });

      if (this.useSubColors) {
        finalColor = this.calculateSubcolor(finalColor, thema_1);
      }

      if (darker) finalColor = d3.rgb(finalColor).darker();

      return finalColor;
    }
  }, {
    key: "calculateSubcolor",
    value: function calculateSubcolor(color, thema_1) {
      var found = false;

      color = d3.rgb(color);
      var maxV = Math.max(color.r, color.g, color.b);
      var absMinV = 255 - Math.min(color.r, color.g, color.b);
      var step = 0;
      if (maxV > absMinV) {
        step = maxV / this.MAX_CATEGORIES;
      } else {
        step = -(absMinV / this.MAX_CATEGORIES);
      }
      step = Math.round(step);

      this.subCategorieColors.forEach(function (d) {
        if (d.name === thema_1) {
          color = d.color;
          found = true;
        }
      });
      if (!found) {
        var newColor = {
          r: color.r + this.subCategorieColors.length * step,
          g: color.g + this.subCategorieColors.length * step,
          b: color.b + this.subCategorieColors.length * step
        };
        this.subCategorieColors.push({ name: thema_1, color: newColor });
        color = newColor;
      }
      return d3.rgb(color.r, color.g, color);
    }
  }]);

  return FillColorCalculator;
}();
