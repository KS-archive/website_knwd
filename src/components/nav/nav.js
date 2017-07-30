const initialize = (nav) => {

   // Ustawienie szerokości diva z podkreśleniem menu.
   nav.$underlineContainer.css('width', nav.underlineContainerWidth);

   changeActive(nav, nav.activeIndex);

   nav.$elements.each((i, el) => {
      $(el).click(() => { changeActive(nav, i) });
   });
}

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
   activeIndex: 0,
   underlineContainerWidth: $('.nav__list').width(),
}

initialize(nav);
