document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  renderTabs();
  renderDishes('entradas');
  setupEventListeners();
  updateHeaderOnScroll();
});

let currentCategory = 'entradas';

function formatPrice(value) {
  return `R$ ${value.toFixed(2)}`;
}

function getImageUrl(dishName) {
  const seed = dishName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return `https://picsum.photos/seed/${seed}/400/300`;
}

function renderTabs() {
  const tabsContainer = document.getElementById('tabs');
  tabsContainer.innerHTML = CATEGORIES.map(cat => `
    <button class="tab-btn ${cat.id === currentCategory ? 'active' : ''}"
            data-category="${cat.id}">
      ${cat.icon} ${cat.label}
    </button>
  `).join('');
}

function renderDishes(category) {
  currentCategory = category;
  const grid = document.getElementById('dishGrid');
  const filtered = DISHES.filter(d => d.category === category);

  grid.innerHTML = filtered.map((dish, index) => `
    <div class="dish-card" style="animation-delay: ${index * 0.06}s">
      <div class="dish-card-image">
        <img src="${getImageUrl(dish.name)}" alt="${dish.name}" loading="lazy">
        <span class="dish-card-category">${CATEGORIES.find(c => c.id === dish.category)?.label || ''}</span>
      </div>
      <div class="dish-card-body">
        <h3>${dish.name}</h3>
        <p class="dish-card-ingredients">${dish.ingredients.join(', ')}</p>
        <div class="dish-card-footer">
          <span class="dish-card-price">${formatPrice(dish.price)}</span>
          <button class="btn-add" data-dish-id="${dish.id}" onclick="handleAddToCart(${dish.id}, this)">
            <span class="btn-add-plus">+</span>
            <span class="btn-add-check">✓</span>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

function handleAddToCart(dishId, btn) {
  Cart.add(dishId);

  btn.classList.add('added');
  setTimeout(() => btn.classList.remove('added'), 600);

  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bounce');
  void badge.offsetWidth;
  badge.classList.add('bounce');

  const dish = DISHES.find(d => d.id === dishId);
  showToast(dish ? dish.name : 'Prato');
}

function showToast(text, custom = false) {
  const container = document.getElementById('toastContainer');

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = custom
    ? `<span class="toast-item-icon">✓</span><span class="toast-item-text">${text}</span>`
    : `<span class="toast-item-icon">✓</span><span class="toast-item-text"><strong>${text}</strong> adicionado ao carrinho</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2200);
}

function updateHeaderOnScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

function setupEventListeners() {
  document.getElementById('cartToggle').addEventListener('click', () => Cart.showCart());
  document.getElementById('cartClose').addEventListener('click', () => Cart.hideCart());
  document.getElementById('cartOverlay').addEventListener('click', () => Cart.hideCart());

  document.getElementById('btnWhatsApp').addEventListener('click', () => {
    if (Cart.items.length > 0) Cart.sendWhatsApp();
  });

  document.getElementById('btnClearCart').addEventListener('click', () => {
    if (Cart.items.length === 0) return;
    Cart.clear();
    showToast('Carrinho limpo!', true);
  });

  document.getElementById('tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const category = btn.dataset.category;
    if (category && category !== currentCategory) {
      renderDishes(category);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Cart.hideCart();
  });
}
