const tocLinks = [...document.querySelectorAll('.toc a')];
const sections = tocLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const progressValue = document.querySelector('#progressValue');
const progressBar = document.querySelector('#progressBar');

function updateReadingState() {
  const y = window.scrollY + 120;
  let current = sections[0];
  sections.forEach(section => { if (section.offsetTop <= y) current = section; });
  tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}` || (current.id === 'decision' && link.getAttribute('href') === '#overview')));
  const doc = document.documentElement;
  const ratio = Math.min(100, Math.max(0, (window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight)) * 100));
  progressValue.textContent = `${Math.round(ratio)}%`;
  progressBar.style.width = `${ratio}%`;
}

window.addEventListener('scroll', updateReadingState, { passive: true });
window.addEventListener('resize', updateReadingState);
updateReadingState();

document.querySelector('#printDoc').addEventListener('click', () => window.print());
document.querySelector('#backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const imageModal = document.querySelector('#imageModal');
const modalImage = document.querySelector('#modalImage');
document.querySelectorAll('figure img, .record-columns img, .student-hero img').forEach(image => {
  image.tabIndex = 0;
  image.addEventListener('click', () => {
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    imageModal.classList.add('open');
    imageModal.setAttribute('aria-hidden', 'false');
  });
  image.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') image.click(); });
});
function closeImage() {
  imageModal.classList.remove('open');
  imageModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
}
document.querySelector('#closeImage').addEventListener('click', closeImage);
imageModal.addEventListener('click', event => { if (event.target === imageModal) closeImage(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeImage(); });
