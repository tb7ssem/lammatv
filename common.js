/* ============ LAMMA TV — SHARED UI (used by every page) ============ */

let store = null;

/* ---------- product card (real link, quick-add button) ---------- */
function productURL(p){ return 'product.html?id=' + p.id; }

function cardHTML(p){
  const sale = p.pricePrev ? `<span class="price-strike">${money(p.pricePrev)}</span><span class="pct-off">${Math.round((1 - p.price/p.pricePrev)*100)}% off</span>` : '';
  const badge = p.badge !== 'none' && BADGE_LABEL[p.badge] ? `<span class="badge-promo">${BADGE_LABEL[p.badge]}</span>` : '';
  const priceRow = p.price === 0
    ? `<span class="price-free">Free Trial</span>`
    : p.pricePrev
      ? `<span class="price-sale">${money(p.price)}</span>${sale}`
      : `<span>${money(p.price)}</span>`;
  const art = `<svg viewBox="0 0 240 180" style="--p-body:${p.color};--p-accent:${p.accent}"><use href="#art-${p.icon}"/></svg>`;
  const stock = p.digital ? '' : (
    p.stock <= 0 ? `<span class="out-of-stock">Out of stock</span>`
    : p.stock <= 10 ? `<span class="stock-low">Only ${p.stock} left</span>` : '');
  return `<a class="product-card" href="${productURL(p)}">
    <div class="product-card-image">${badge}${art}
      <button class="card-add" type="button" aria-label="Add to Bag" title="Add to Bag" data-add="${p.id}">+</button>
    </div>
    <div class="card-meta">
      <h3 class="product-name">${p.name}</h3>
      <p class="product-sub">${p.sub}</p>
      <div class="price-row">${priceRow}</div>
      ${stock}
    </div>
  </a>`;
}

/* Bind every quick-add button on the page (call after rendering cards). */
function bindQuickAdd(){
  document.querySelectorAll('.card-add').forEach(btn=>{
    btn.onclick = e=>{
      e.preventDefault(); e.stopPropagation();
      const p = store.products.find(x=>x.id == btn.dataset.add);
      if(p && (!p.digital ? p.stock > 0 : true)){ addToCart(p.id, 1); openDrawer(); }
      else if(p){ toast('Out of stock'); }
    };
  });
}

/* ---------- NAV ---------- */
function renderNav(){
  const s = store.settings;
  const nav = `
    <a href="index.html" class="logo"><b>${s.storeName}</b></a>
    <div class="nav-links">
      <a href="shop.html?cat=iptv">IPTV</a>
      <a href="shop.html">New &amp; Featured</a>
      <a href="shop.html?cat=phones">Phones</a>
      <a href="shop.html?cat=computers">Computers</a>
      <a href="shop.html?badge=sale">Sale</a>
    </div>
    <form class="nav-right" id="navSearchForm">
      <label class="search-pill">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
        <input type="search" placeholder="Search" id="navSearch" value="${new URLSearchParams(location.search).get('q')||''}">
      </label>
      <a class="icon-btn" href="https://wa.me/${s.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" title="Chat on WhatsApp">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.4-.2-2.9.8.8-2.7-.2-.4A8 8 0 0 1 12 4z"/></svg>
      </a>
      <button class="icon-btn" type="button" aria-label="Bag" id="cartBtn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
        <span class="bag-count" id="bagCount" hidden>0</span>
      </button>
    </form>`;
  const el = document.getElementById('navContainer');
  if(el) el.innerHTML = nav;
  const f = document.getElementById('navSearchForm');
  f.onsubmit = e=>{ e.preventDefault(); const q = document.getElementById('navSearch').value.trim(); location.href = 'shop.html' + (q?('?q='+encodeURIComponent(q)):''); };
  document.getElementById('cartBtn').onclick = openDrawer;
}

/* ---------- FOOTER ---------- */
function renderFooter(){
  const s = store.settings;
  const el = document.getElementById('siteFooter');
  if(!el) return;
  el.innerHTML = `<footer><div class="container">
    <div class="footer-cols">
      <div><h4>IPTV</h4><a href="shop.html?cat=iptv">All Plans</a><a href="product.html?id=1">Free Trial</a><a href="product.html?id=6">12 Months Plan</a><a href="product.html?id=8">Lamma Box Bundle</a></div>
      <div><h4>Shop</h4>${CATEGORIES.slice(1,5).map(c=>`<a href="shop.html?cat=${c.toLowerCase()}">${c}</a>`).join('')}</div>
      <div><h4>Help</h4><a href="https://wa.me/${s.whatsapp}" target="_blank" rel="noopener">WhatsApp Support</a><a href="index.html#faq">Activation Guide</a><a href="refund.html">Refund Policy</a></div>
      <div><h4>Admin</h4><a href="admin.html">Admin Console</a></div>
    </div>
    <div class="fine-print">
      <span>© 2026 ${s.storeName}. Design system: VoltAgent/awesome-design-md (Nike spec). Demo build — payments handled on WhatsApp.</span>
      <span>WhatsApp: +${s.whatsapp} · <a href="terms.html" style="color:inherit">Terms of Use</a> · <a href="privacy.html" style="color:inherit">Privacy Policy</a> · <a href="refund.html" style="color:inherit">Refund Policy</a></span>
    </div>
  </div></footer>`;
}

/* ---------- CART ---------- */
function cartEntries(){
  return Object.entries(cart).map(([id,qty])=>({p:store.products.find(x=>x.id==id),qty})).filter(x=>x.p);
}
function cartSubtotal(){ return cartEntries().reduce((s,{p,qty})=>s+p.price*qty,0); }
function cartCount(){ return cartEntries().reduce((s,{p,qty})=>s+qty,0); }
function saveCart(){ localStorage.setItem('lammatv_cart', JSON.stringify(cart)); syncBagUI(); }
function syncBagUI(){
  const n = cartCount();
  const b = document.getElementById('bagCount'); if(b){ b.hidden = n===0; b.textContent = n; }
  const h = document.getElementById('cartHeadCount'); if(h) h.textContent = n?`(${n})`:'';
}
function addToCart(id, qty=1){
  cart[id] = (cart[id]||0) + qty;
  saveCart();
}
function toast(msg){
  const t = document.getElementById('toast'); if(!t){ alert(msg); return; }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('show'), 2200);
}
function renderCartDrawer(){
  const el = document.getElementById('cartItems'); if(!el) return;
  el.innerHTML = (()=>{
    const e = cartEntries();
    if(!e.length) return `<div class="cart-empty">Your bag is empty.</div>`;
    return e.map(({p,qty})=>`
      <div class="cart-item">
        <div class="cart-thumb"><svg viewBox="0 0 240 180" style="--p-body:${p.color};--p-accent:${p.accent}"><use href="#art-${p.icon}"/></svg></div>
        <div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-sub">${p.sub}</div>
          <div class="qty-stepper" style="margin-top:8px">
            <button onclick="cartQty(${p.id},-1)">−</button><span>${qty}</span><button onclick="cartQty(${p.id},1)">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="cart-item-price">${p.price===0?'Free':money(p.price*qty)}</div>
          <button class="cart-remove" onclick="cartRemove(${p.id})">Remove</button>
        </div>
      </div>`).join('');
  })();
  const sub = document.getElementById('cartSubtotal');
  if(sub) sub.textContent = cartSubtotal()===0?'Free':money(cartSubtotal());
}
function cartQty(id,d){
  cart[id] = (cart[id]||0)+d;
  if(cart[id]<=0) delete cart[id];
  saveCart(); renderCartDrawer();
}
function cartRemove(id){ delete cart[id]; saveCart(); renderCartDrawer(); }

function openDrawer(){
  const d = document.getElementById('cartDrawer'); if(!d) return;
  d.classList.add('open');
  document.getElementById('drawerBackdrop')?.classList.add('open');
  renderCartDrawer();
}
function closeDrawer(){
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('drawerBackdrop')?.classList.remove('open');
}

/* ---------- BOOT ---------- */
let cart = JSON.parse(localStorage.getItem('lammatv_cart') || '{}');

async function boot(pageInit){
  window.store = store = await loadStoreData();

  // live settings touch-points on this page
  document.querySelectorAll('.wa-float, [data-wa]').forEach(a=>{ a.href = 'https://wa.me/'+store.settings.whatsapp; });
  document.title = store.settings.storeName + ' — IPTV Subscriptions & Electronics';

  renderNav();
  renderFooter();

  // persistent UI
  document.getElementById('cartClose')?.addEventListener('click', closeDrawer);
  document.getElementById('drawerBackdrop')?.addEventListener('click', closeDrawer);
  const ck = document.getElementById('checkoutBtn');
  if(ck) ck.onclick = ()=>{ closeDrawer(); if(cartEntries().length) location.href='checkout.html'; else toast('Your bag is empty'); };
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeDrawer(); });

  await pageInit();
  syncBagUI();
}
