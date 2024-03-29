'use strict';

/*
 * Creates tooltip with provided id that
 * floats on top of visualization.
 * Most styling is expected to come from CSS
 * so check out bubble_chart.css for more details.
 */
function floatingTooltip(tooltipId, width) {
  // Local variable to hold tooltip div for
  // manipulation in other functions.
  var tt = d3.select('body').append('div').attr('class', 'custom_tooltip').attr('id', tooltipId);

  // Set a width if it is provided.
  if (width) {
    tt.style('width', width);
  }

  // Initially it is hidden.
  hideTooltip();

  /*
   * Display tooltip with provided content.
   *
   * content is expected to be HTML string.
   *
   * event is d3.event for positioning.
   */
  function showTooltip(content, event, fixed) {
    tt.style('display', 'block').html(content);
    tt.classed('fixed_tooltip', fixed);

    updatePosition(event);
  }

  /*
   * Hide the tooltip div.
   */
  function hideTooltip() {
    tt.style('display', 'none');
  }

  /*
   * Figure out where to place the tooltip
   * based on d3 mouse event.
   */
  function updatePosition(event) {
    var xOffset = 10;
    var yOffset = 10;

    var ttw = parseInt(tt.style('width'), 10);
    var tth = parseInt(tt.style('height'), 10);

    var wscrY = window.scrollY;
    var wscrX = window.scrollX;

    var curX = document.all ? event.clientX + wscrX : event.pageX;
    var curY = document.all ? event.clientY + wscrY : event.pageY;
    var ttleft = curX - wscrX + xOffset * 2 + ttw > window.innerWidth ? curX - ttw - xOffset : curX + xOffset;

    if (ttleft < wscrX + xOffset) {
      ttleft = wscrX + xOffset;
    }

    var tttop = curY - wscrY + yOffset * 2 + tth > window.innerHeight ? curY - tth - yOffset : curY + yOffset;

    if (tttop < wscrY + yOffset) {
      tttop = curY + yOffset;
    }

    tt.style({ top: tttop + 'px', left: ttleft + 'px' });
  }

  return {
    showTooltip: showTooltip,
    hideTooltip: hideTooltip,
    updatePosition: updatePosition
  };
}