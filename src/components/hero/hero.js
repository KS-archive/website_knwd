const scroll = new SmoothScroll();
const joinButton = document.querySelector('.hero__button.green');
const contact = document.querySelector('#kontakt');
const aboutButton = document.querySelector('.hero__button.white');
const about = document.querySelector('#kim_jesteśmy');

joinButton.addEventListener('click', () => { scroll.animateScroll(contact, null, { offset: 200 }); })
aboutButton.addEventListener('click', () => { scroll.animateScroll(about, null, { offset: 200 }); })
