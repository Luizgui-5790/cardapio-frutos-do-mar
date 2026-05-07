const Cart = {
  items: [],

  init() {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch {
        this.items = [];
      }
    }
    this.render();
  },

  save() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  },

  add(dishId) {
    const existing = this.items.find(item => item.id === dishId);
    if (existing) {
      existing.quantity += 1;
    } else {
      const dish = DISHES.find(d => d.id === dishId);
      if (!dish) return;
      this.items.push({
        id: dishId,
        name: dish.name,
        price: dish.price,
        quantity: 1,
        image: this.getImageUrl(dish.name),
      });
    }
    this.save();
    this.render();
  },

  getImageUrl(dishName) {
    const seed = dishName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return `https://picsum.photos/seed/${seed}/400/300`;
  },

  updateQuantity(dishId, delta) {
    const item = this.items.find(i => i.id === dishId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => i.id !== dishId);
    }
    this.save();
    this.render();
  },

  clear() {
    if (this.items.length === 0) return;
    this.items = [];
    this.save();
    this.render();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getWhatsAppMessage() {
    const categoryMap = {};
    this.items.forEach(item => {
      const dish = DISHES.find(d => d.id === item.id);
      const cat = dish ? dish.category : 'outros';
      if (!categoryMap[cat]) categoryMap[cat] = [];
      categoryMap[cat].push(item);
    });

    const lines = ['🐟 *FRUTOS DO MAR — Pedido*'];
    lines.push('┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈');

    CATEGORIES.forEach(cat => {
      const items = categoryMap[cat.id];
      if (!items) return;
      lines.push('', `${cat.icon} *${cat.label.toUpperCase()}*`);
      items.forEach(item => {
        const subtotal = (item.price * item.quantity).toFixed(2);
        lines.push(`   ${item.quantity}x ${item.name} — R$ ${subtotal}`);
      });
    });

    lines.push('', '┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈');
    lines.push(`💰 *Total: R$ ${this.getTotal().toFixed(2)}*`);
    lines.push('┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈');
    lines.push('', '📍 *Retirada no local*');
    lines.push('🕐 *Seg-Dom: 11h às 23h*');
    lines.push('', 'Obrigado pelo pedido! 🐟❤️');
    return lines.join('\n');
  },

  sendWhatsApp() {
    if (this.items.length === 0) return;
    const phone = '5511999999999';
    const message = encodeURIComponent(this.getWhatsAppMessage());
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  },

  showCart() {
    document.getElementById('cart').classList.add('open');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  hideCart() {
    document.getElementById('cart').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
  },

  render() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartBadge = document.getElementById('cartBadge');
    const btnWhatsApp = document.getElementById('btnWhatsApp');

    cartBadge.textContent = this.getCount();

    if (this.items.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty">Seu carrinho está vazio</div>';
      cartTotal.textContent = 'R$ 0,00';
      btnWhatsApp.disabled = true;
      return;
    }

    btnWhatsApp.disabled = false;

    let html = '';
    this.items.forEach(item => {
      html += `
        <div class="cart-item">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="Cart.updateQuantity(${item.id}, -1)">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="Cart.updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
      `;
    });

    cartItems.innerHTML = html;
    cartTotal.textContent = `R$ ${this.getTotal().toFixed(2)}`;
  },
};
