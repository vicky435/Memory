const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const thumbs = document.getElementById("thumbs");
const counter = document.getElementById("counter");
const gallery = document.getElementById("gallery");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");

let currentIndex = 0;
let images = [];
let thumbsBuilt = false;

/* CACHE IMAGES */
function updateImages() {
  images = [...gallery.querySelectorAll(".card img")];
}

/* INITIAL CACHE */
updateImages();

/* OPEN LIGHTBOX */
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";

  if (!thumbsBuilt) {
    buildThumbs();
    thumbsBuilt = true;
  }

  updateLightbox();
}

/* CLOSE */
function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}

/* UPDATE IMAGE */
function updateLightbox() {
  lightboxImg.src = images[currentIndex].src;
  counter.textContent = `${currentIndex + 1} / ${images.length}`;
  highlightThumb();
}

/* BUILD THUMBS ONCE */
function buildThumbs() {
  const fragment = document.createDocumentFragment();
  images.forEach((img, i) => {
    const t = document.createElement("img");
    t.src = img.src;
    t.loading = "lazy";
    t.onclick = () => openLightbox(i);
    fragment.appendChild(t);
  });
  thumbs.appendChild(fragment);
}

/* ACTIVE THUMB */
function highlightThumb() {
  [...thumbs.children].forEach((t, i) => {
    t.classList.toggle("active", i === currentIndex);
  });
}

/* NAV */
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
};

closeBtn.onclick = closeLightbox;

/* KEYBOARD */
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display !== "flex") return;
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "Escape") closeLightbox();
});

/* CLICK HANDLER */
gallery.addEventListener("click", (e) => {
  if (!e.target.matches(".card img")) return;
  openLightbox(images.indexOf(e.target));
});

function addImage() {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <img src="images/${count}.webp"
         loading="lazy"
         decoding="async"
         fetchpriority="low">
    <div class="overlay">Memory ${count}</div>
  `;
  gallery.appendChild(div);

  images.push(div.querySelector("img")); // 🔥 update cache
  count++;
}
