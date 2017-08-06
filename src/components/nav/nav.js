// Sprawdza, na której sekcji strony użytkownik znajduje się obecnie.
const checkActive = (nav) => {

   let fromTop = $(window).scrollTop() + nav.$navContainer.height() + 120;

   let cur = nav.$navAnchors.map(function(){
      if ($(this).offset().top < fromTop) return $(this);
   });

   cur = cur[cur.length-1];
   let navClass = '.A_' + cur.getAttribute('id');
   let index = nav.$navAnchors.index(cur);

   if (nav.lastActive !== navClass) {
      nav.lastActive = navClass;
      if (!nav.dontChangeActive) {
         changeActive(nav, index);
      }
   }
}

// Płynne przewijanie strony.
const smoothScroll = (e, id) => {

   nav.dontChangeActive = true;
   window.setTimeout(() => { nav.dontChangeActive = false; }, 1000);
   if (typeof id === 'string') {
      let target = $(`#${id.split(' ')[0]}`);
      nav.$forMobileToggle.removeClass('mobile');
      nav.$burger.removeClass('open');
      nav.smoothScrollObj.animateScroll( (target.offset().top - nav.$navContainer.height() - 60) );
   }
};

// Inicjalizuje mechanikę nawigacji.
const initialize = (nav) => {

   changeActive(nav, nav.activeIndex);

   nav.$elements.each((i, el) => {
      $(el).click(() => { changeActive(nav, i) });
   });

   nav.$burger.click(function() {
      $(this).toggleClass('open');
      nav.$forMobileToggle.toggleClass('mobile');
   });

   // Aktywacja pól przy kliknięciu.
	nav.$elements.click(function(e) {
		$('.nav__item.active').removeClass('active');
		$(this).addClass('active');
      smoothScroll(e, $(this).attr('class').split('A_')[1]);
	});

   $(window).scroll(function() {
      checkActive(nav);
   });
}

// Zmienia aktywny element menu na podstawie przekazanego indesku.
const changeActive = (nav, index) => {
   nav.activeIndex = index;
   const activeElement = $(nav.$elements[index]);
   $('.nav__list-element.active').removeClass('active');
   activeElement.addClass('active');
   const width = activeElement.width()/1.618;
   const left = activeElement.offset().left - nav.$underlineContainer.offset().left + (activeElement.width() - activeElement.width()/1.618)/2;
   nav.$underline.css({ width, left });
}

const nav = {
   $navContainer: $('.nav__container'),
   $elements: $('.nav__list-element'),
   $underlineContainer: $('.nav__underline-container'),
   $underline: $('.nav__underline'),
   $burger: $('.nav__burger'),
   $forMobileToggle: $('nav, .nav__container, .nav__logo, .nav__menu, .nav__list, .nav__list-element'),
   $navAnchors: $('#home, #kim_jesteśmy, #projekty, #partnerzy, #członkowie, #kontakt'),
   activeIndex: 0,
   underlineContainerWidth: $('.nav__list').width(),
   lastActive: '',
   dontChangeActive: false,
   smoothScrollObj: new SmoothScroll(),
}

initialize(nav);
