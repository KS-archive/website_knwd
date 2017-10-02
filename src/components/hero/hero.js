const scroll = new SmoothScroll();
const joinButton = document.querySelector('.hero__button.green');
const contact = document.querySelector('#kontakt');
const aboutButton = document.querySelector('.hero__button.white');
const about = document.querySelector('#kim_jesteśmy');

joinButton.addEventListener('click', () => { location.href = 'https://goo.gl/forms/shDFNjqOSskfYn2O2'; })
aboutButton.addEventListener('click', () => { scroll.animateScroll(about, null, { offset: 200 }); })
