const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");

const closeBtn = document.querySelector("#closeBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

const filterButtons = document.querySelectorAll(".filter-btn");

let visibleImages = [];
let currentIndex = 0;

function updateVisibleImages() {
  visibleImages = [...document.querySelectorAll(".gallery-item")].filter(
    (item) => item.style.display !== "none",
  );
}

function openLightbox(index) {
  currentIndex = index;

  const image = visibleImages[currentIndex].querySelector("img");

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightbox.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");

  document.body.style.overflow = "";
}

function showNext() {
  currentIndex++;

  if (currentIndex >= visibleImages.length) {
    currentIndex = 0;
  }

  const image = visibleImages[currentIndex].querySelector("img");

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
}

function showPrevious() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = visibleImages.length - 1;
  }

  const image = visibleImages[currentIndex].querySelector("img");

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    updateVisibleImages();

    const index = visibleImages.indexOf(item);

    openLightbox(index);
  });
});

closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", showNext);

prevBtn.addEventListener("click", showPrevious);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (e.key === "Escape") {
    closeLightbox();
  }

  if (e.key === "ArrowRight") {
    showNext();
  }

  if (e.key === "ArrowLeft") {
    showPrevious();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // Active button
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      if (filter === "all" || category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    updateVisibleImages();
  });
});
