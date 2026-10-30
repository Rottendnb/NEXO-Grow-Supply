const storageKey = 'nexo-demo-cart';
const ageKey = 'nexo-age-confirmed';
const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

const products = {
  grinder: { name: 'Grinder 4P', price: 24.9, sprite: 'sprite-1' },
  paper: { name: 'Paper Kit', price: 4.5, sprite: 'sprite-2' },
  jar: { name: 'Archive Jar', price: 14.9, sprite: 'sprite-3' },
  vapo: { name: 'Vapo Pocket', price: 59, sprite: 'sprite-4' },
  atlas: { name: 'Atlas CBD 5g', price: 18, sprite: 'sprite-5' },
  tray: { name: 'Stone Tray', price: 21, sprite: 'sprite-6' }
};

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
let cart = {};
try { cart = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { cart = {}; }

const ageGate = $('[data-age-gate]');
if (sessionStorage.getItem(ageKey) === 'true') ageGate.hidden = true;
else document.body.classList.add('locked');

$('[data-age-accept]').addEventListener('click', () => {
  sessionStorage.setItem(ageKey, 'true');
  ageGate.hidden = true;
  document.body.classList.remove('locked');
});

$('[data-age-decline]').addEventListener('click', () => {
  ageGate.querySelector('h1').textContent = 'ACCESO NO DISPONIBLE';
  ageGate.querySelector('p:not(.kicker)').textContent = 'Este proyecto demostrativo está dirigido únicamente a personas mayores de edad.';
  $('.age-actions').hidden = true;
});

const cartPanel = $('[data-cart]');
const overlay = $('[data-overlay]');
const cartItems = $('[data-cart-items]');
const cartEmpty = $('[data-cart-empty]');
const cartFooter = $('[data-cart-footer]');
const toast = $('[data-toast]');
let toastTimer;

function saveCart() { localStorage.setItem(storageKey, JSON.stringify(cart)); }
function countCart() { return Object.values(cart).reduce((sum, qty) => sum + qty, 0); }

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1900);
}

function openCart() {
  cartPanel.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
  overlay.hidden = false;
  document.body.classList.add('locked');
  $('[data-cart-close]', cartPanel).focus();
}

function closeCart() {
  cartPanel.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
  overlay.hidden = true;
  document.body.classList.remove('locked');
}

function setQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function renderCart() {
  const entries = Object.entries(cart).filter(([id, qty]) => products[id] && qty > 0);
  const count = countCart();
  $$('[data-cart-count]').forEach(el => el.textContent = count);
  cartEmpty.hidden = entries.length > 0;
  cartItems.hidden = entries.length === 0;
  cartFooter.hidden = entries.length === 0;
  cartItems.innerHTML = entries.map(([id, qty]) => {
    const item = products[id];
    return `<article class="cart-item">
      <div class="cart-thumb sprite ${item.sprite}" aria-hidden="true"></div>
      <div><h3>${item.name}</h3><p>${euro.format(item.price)}</p><div class="qty"><button type="button" data-qty="-1" data-id="${id}" aria-label="Quitar una unidad">−</button><span>${qty}</span><button type="button" data-qty="1" data-id="${id}" aria-label="Añadir una unidad">+</button></div></div>
      <button class="remove" type="button" data-remove data-id="${id}">QUITAR</button>
    </article>`;
  }).join('');
  const total = entries.reduce((sum, [id, qty]) => sum + products[id].price * qty, 0);
  $('[data-cart-total]').textContent = euro.format(total);
}

$$('[data-add]').forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.id;
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  notify(`${button.dataset.product} / AÑADIDO`);
}));

cartItems.addEventListener('click', event => {
  const qtyButton = event.target.closest('[data-qty]');
  const removeButton = event.target.closest('[data-remove]');
  if (qtyButton) setQty(qtyButton.dataset.id, Number(qtyButton.dataset.qty));
  if (removeButton) {
    delete cart[removeButton.dataset.id];
    saveCart();
    renderCart();
  }
});

$$('[data-cart-open]').forEach(button => button.addEventListener('click', openCart));
$$('[data-cart-close]').forEach(button => button.addEventListener('click', closeCart));
overlay.addEventListener('click', closeCart);

const checkoutModal = $('[data-checkout-modal]');
$('[data-checkout]').addEventListener('click', () => { checkoutModal.hidden = false; });
$('[data-checkout-close]').addEventListener('click', () => { checkoutModal.hidden = true; });
checkoutModal.addEventListener('click', event => { if (event.target === checkoutModal) checkoutModal.hidden = true; });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeCart();
    checkoutModal.hidden = true;
  }
});

let activeFilter = 'todos';
const search = $('[data-search]');
function filterProducts() {
  const query = search.value.trim().toLocaleLowerCase('es');
  let visible = 0;
  $$('.product').forEach(card => {
    const filterMatch = activeFilter === 'todos' || card.dataset.category === activeFilter;
    const searchMatch = card.dataset.name.toLocaleLowerCase('es').includes(query);
    card.hidden = !(filterMatch && searchMatch);
    if (!card.hidden) visible += 1;
  });
  $('[data-results-count]').textContent = `${String(visible).padStart(2, '0')} / PRODUCTOS`;
  $('[data-no-results]').hidden = visible > 0;
}

$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  $$('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
  filterProducts();
}));
search.addEventListener('input', filterProducts);

$$('[data-department]').forEach(link => link.addEventListener('click', () => {
  activeFilter = link.dataset.department;
  $$('[data-filter]').forEach(item => item.classList.toggle('active', item.dataset.filter === activeFilter));
  filterProducts();
}));

const menuToggle = $('[data-menu-toggle]');
const nav = $('[data-nav]');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('a', nav).forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

$('[data-year]').textContent = new Date().getFullYear();
renderCart();
