const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navLinks.classList.toggle('is-open', !isOpen);
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navLinks.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navLinks.classList.remove('is-open');
      menuButton.focus();
    }
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const portfolioImages = document.querySelectorAll('.portfolio-media img');
portfolioImages.forEach((image) => {
  const media = image.closest('.portfolio-media');
  const showImage = () => media.classList.add('has-image');
  const showPlaceholder = () => media.classList.add('is-placeholder');

  image.addEventListener('load', showImage, { once: true });
  image.addEventListener('error', showPlaceholder, { once: true });

  if (image.complete) {
    if (image.naturalWidth > 0) showImage();
    else showPlaceholder();
  }
});
const profileImage = document.querySelector('.about-photo img');
if (profileImage) {
  const photo = profileImage.closest('.about-photo');
  const showProfile = () => photo.classList.add('has-image');
  profileImage.addEventListener('load', showProfile, { once: true });
  profileImage.addEventListener('error', () => photo.classList.add('image-missing'), { once: true });
  if (profileImage.complete && profileImage.naturalWidth > 0) showProfile();
  else if (profileImage.complete) photo.classList.add('image-missing');
}
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  button.addEventListener('click', () => {
    const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
    faqItems.forEach((otherItem) => {
      const otherButton = otherItem.querySelector('.faq-question');
      const otherAnswer = otherItem.querySelector('.faq-answer');
      const isOpen = otherItem === item && shouldOpen;
      otherButton.setAttribute('aria-expanded', String(isOpen));
      otherAnswer.setAttribute('aria-hidden', String(!isOpen));
      otherAnswer.inert = !isOpen;
      otherItem.classList.toggle('is-open', isOpen);
    });
  });
});
