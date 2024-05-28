$(document).ready(function() {
  // 画面の幅に基づいて解像度を設定
  var screenWidth = $(window).width();
  var resolution = screenWidth > 768 ? 512 : 256; // PCでは512, モバイルでは256

  $('#demo').ripples({
    resolution: resolution,
    dropRadius: 20, // 波紋の半径
    perturbance: 0.04, // 波紋の乱れ度
  });

  // 自動的に波紋を追加
  setInterval(function() {
    var $el = $('#demo');
    var x = Math.random() * $el.outerWidth();
    var y = Math.random() * $el.outerHeight();
    var dropRadius = 20; // 波紋の半径
    var strength = 0.04 + Math.random() * 0.04; // 波紋の強さ

    $el.ripples('drop', x, y, dropRadius, strength);
  }, 400);
});
