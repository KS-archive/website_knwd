// Inicjalizuje mechanikę nawigacji.
const initialize = (nav) => {

   changeActive(nav, nav.activeIndex);

   nav.$elements.each((i, el) => {
      $(el).click(() => { changeActive(nav, i) });
   });

   nav.$burger.click(function() {
      $(this).toggleClass('open');
      $('nav, .nav__container, .nav__logo, .nav__menu, .nav__list, .nav__list-element').toggleClass('mobile');
   });
}

// Zmienia aktywny element menu na podstawie przekazanego indesku.
const changeActive = (nav, index) => {
   nav.activeIndex = index;
   let activeElement = $(nav.$elements[index]);
   $('.nav__list-element.active').removeClass('active');
   activeElement.addClass('active');
   nav.$underline.animate({
      width: (activeElement.width()/1.618),
      left: (activeElement.offset().left - nav.$underlineContainer.offset().left + (activeElement.width() - activeElement.width()/1.618)/2),
   });
}

const nav = {
   $elements: $('.nav__list-element'),
   $underlineContainer: $('.nav__underline-container'),
   $underline: $('.nav__underline'),
   $burger: $('.nav__burger'),
   activeIndex: 0,
   underlineContainerWidth: $('.nav__list').width(),
}

initialize(nav);
