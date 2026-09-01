const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let visibleItems = [];
let currentIndex = 0;


function updateVisibleItems() {
  visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
}


filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });

    updateVisibleItems();
  });
});


updateVisibleItems();


galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    currentIndex = visibleItems.indexOf(item);
    if (currentIndex !== -1) {
      showLightboxItem(currentIndex);
      lightbox.classList.add('active');
    }
  });
});

function showLightboxItem(index) {
  const targetItem = visibleItems[index];
  const img = targetItem.querySelector('img');
  const title = targetItem.querySelector('.overlay h3').textContent;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = title;
}


function showNext() {
  if (visibleItems.length === 0) return;
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showLightboxItem(currentIndex);
}

function showPrev() {
  if (visibleItems.length === 0) return;
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showLightboxItem(currentIndex);
}

function closeLightbox() {
  lightbox.classList.remove('active');
}


nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});


document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});