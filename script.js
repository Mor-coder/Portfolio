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