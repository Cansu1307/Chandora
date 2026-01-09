// ===== LIKE SYSTEM + BADGE =====

const likeBadge = document.getElementById("likeBadge");
const productCards = document.querySelectorAll(".product-card");

let likedIds = new Set();

// Badge UI updaten
function updateBadge() {
  const count = likedIds.size;
  likeBadge.textContent = String(count);
  likeBadge.style.display = count > 0 ? "inline-block" : "none";
}

// Toggle Like
function toggleLike(card) {
  const id = card.dataset.productId;
  const btn = card.querySelector(".product-like");

  if (!id || !btn) return;

  const isLiked = likedIds.has(id);

  if (isLiked) {
    likedIds.delete(id);
    card.classList.remove("is-liked");
    btn.setAttribute("aria-pressed", "false");
  } else {
    likedIds.add(id);
    card.classList.add("is-liked");
    btn.setAttribute("aria-pressed", "true");
  }

  updateBadge();
}

// Event Listener pro Produkt
productCards.forEach(card => {
  const likeBtn = card.querySelector(".product-like");
  if (!likeBtn) return;

  likeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleLike(card);
  });
});

// ===== SCROLL REVEAL (3 BOXEN) =====

const revealGroups = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Items nacheinander "einfaden"
      const items = entry.target.querySelectorAll(".reveal-item");
      items.forEach((el, index) => {
        setTimeout(() => el.classList.add("is-visible"), index * 140);
      });

      // Nur einmal auslösen
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.25 }
);

revealGroups.forEach(group => observer.observe(group));

// Init
updateBadge();
