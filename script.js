/*
const container = document.querySelector('.leaves-container');
const numberOfLeaves = 12;

for (let i = 0; i < numberOfLeaves; i++) {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');

  const size = 20 + Math.random() * 25;
  const duration = 12 + Math.random() * 25;
  const delay = Math.random() * 5;

  leaf.style.width = `${size}px`;
  leaf.style.height = `${size}px`;

  // Random vertical position across screen
  leaf.style.top = `${Math.random() * 80 + 10}vh`;

  // Animation settings
  leaf.style.animationDuration = `${duration}s`;
  leaf.style.animationDelay = `${delay}s`;
  leaf.style.transform = `rotate(${Math.random() * 360}deg)`;

  container.appendChild(leaf);
}
*/

// --------------------- //
// FULLSCREEN OVERLAY    //
// --------------------- //

const overlay = document.getElementById("img-lightbox-overlay");
const overlayImg = document.getElementById("img-lightbox-content");
const closeBtn = document.getElementById("img-lightbox-close");

let zoom = 1;
let isDragging = false;
let startX, startY, imgX = 0, imgY = 0;

// Close overlay
closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  zoom = 1;
  imgX = imgY = 0;
  overlayImg.style.transform = "translate(0px,0px) scale(1)";
});

// Zoom controls
document.getElementById("zoom-in").onclick = () => changeZoom(0.2);
document.getElementById("zoom-out").onclick = () => changeZoom(-0.2);
document.getElementById("zoom-reset").onclick = () => resetZoom();

function changeZoom(amount) {
  zoom = Math.min(Math.max(zoom + amount, 0.5), 5);
  updateTransform();
}

function resetZoom() {
  zoom = 1;
  imgX = imgY = 0;
  updateTransform();
}

function updateTransform() {
  overlayImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(${zoom})`;
}

// Dragging the zoomed image
overlayImg.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX - imgX;
  startY = e.clientY - imgY;
  overlayImg.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  overlayImg.style.cursor = "grab";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  imgX = e.clientX - startX;
  imgY = e.clientY - startY;
  updateTransform();
});

// --------------------------- //
// CUSTOM <lightbox-img> TAG   //
// --------------------------- //

class LightboxImage extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute("src");
    const alt = this.getAttribute("alt") || "";

    this.innerHTML = `
      <img src="${src}" alt="${alt}" class="img-fluid" style="cursor: zoom-in;">
    `;

    this.querySelector("img").addEventListener("click", () => {
      overlay.style.display = "flex";
      overlayImg.src = src;
      overlayImg.alt = alt;
      resetZoom();
    });
  }
}

customElements.define("lightbox-img", LightboxImage);
