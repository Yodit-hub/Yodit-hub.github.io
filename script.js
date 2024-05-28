$(document).ready(function() {
  $('#demo').ripples({
    resolution: 300,
    dropRadius: 20,
    perturbance: 0.01
  });

  setInterval(function() {
    var $el = $('#demo');
    var x = Math.random() * $el.outerWidth();
    var y = Math.random() * $el.outerHeight();
    var dropRadius = 20;
    var strength = 0.04 + Math.random() * 0.04;

    $el.ripples('drop', x, y, dropRadius, strength);
  }, 400);
});