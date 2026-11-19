/*
  * Inspired from - https://dribbble.com/shots/13926352-E-Book-Page-Swipe-Animaiton
  * Do check Saptarshi Prakash's bio for more awesome designs
*/

const $pages = $('.pages'),
      $cover = $('.cover'),
      $book = $(".book"),
      $hint = $(".hint"),
      timeline = new TimelineLite({ paused: true, reversed: true }),
      transitionSpeed = 1;

timeline.to(".bend", 0, { width: "0" }, 0)
        .to(".book", 0, { width: "100%", height: "100%"}, 0)
        .to(".cover", transitionSpeed, { className: "+=active", ease: Ease.easeIn, onComplete: () => {
          $pages.removeClass("hide");
          $cover.addClass("hide");
        } }, 0)
        .to(".content-inner", transitionSpeed, { opacity: 1 }, transitionSpeed);

$cover.on("click", function(){  
  $hint.text("* 使用鼠标在页角上进行翻页");
  timeline.play();
  $(".content").addClass("active");
  $pages.turn({
    duration: 1500,
    width: 250,
    height: 420,
    display: 'single',
    turnCorners: "bl,br",
    elevation: 300
  });
});