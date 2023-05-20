const checkScroll = () => document.body.classList.toggle("scrolled", window.scrollY > 0);
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);