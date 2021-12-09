document.addEventListener("DOMContentLoaded", function (event) {
  // Lazyload, dotdotdot and owlCarousel curently run externallly to webpack bundle

  $("img.lazyload").lazyload({
    effect: "fadeIn",
  });

  var cardHolder = "";
  clearTimeout(cardHolder);
  cardHolder = setTimeout(function () {
    $(".j-truncate").dotdotdot({
      watch: true,
    });
  }, 750);

  $("#owl-gallery-image").owlCarousel({
    items: 1,
    thumbs: true,
    thumbsPrerendered: true,
    URLhashListener: true,
    startPosition: "URLHash",
    pagination: true,
    dots: false,
    nav: true,
    navText: ["", ""],
  });

  $("#carousel22").owlCarousel({
    items: 1,
    dots: false,
    nav: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
  });

  setTimeout(function () {
    $(".article_content figure img").each(function () {
      var width = $(this).width() + "px";
      var captionObj = $(this).closest("figure").find("figcaption");
      if (captionObj) {
        captionObj.css({ width: width, display: "block" });
      }
    });
  }, 400);

  $(window).resize(function () {
    $(".article_content figure img").each(function () {
      var width = $(this).width() + "px";
      var captionObj = $(this).closest("figure").find("figcaption");
      if (captionObj) {
        captionObj.css({ width: width, display: "block" });
      }
    });
  });
});
