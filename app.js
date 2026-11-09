/* ============ LAMMA TV STOREFRONT ============ */
/* Hash router views: home, catalog, product, checkout, confirm */

const $ = s => document.querySelector(s);
let cart = JSON.parse(localStorage.getItem('lammatv_cart') || '{}');
let pdpState = null;

/* ---------- RENDER: product card ---------- */
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
  return `<article class="product-card" data-id="${p.id}">
    <div class="product-card-image">${badge}${art}</div>
    <div class="card-meta">
      <h3 class="product-name">${p.name}</h3>
      <p class="product-sub">${p.sub}</p>
      <div class="price-row">${priceRow}</div>
      ${stock}
    </div>
  </article>`;
}

/* ---------- VIEW: HOME ---------- */
function viewHome(){
  const iptv = store.products.filter(p=>p.category==='IPTV').slice(0,6);
  const hot = store.products.filter(p=>p.badge==='just-in' || p.badge==='sale').slice(0,6);
  const cats = CATEGORIES;
  const catClasses = ['cat-1','cat-2','cat-3','cat-4','cat-1','cat-2','cat-3','cat-4'];
  const catIcons = {IPTV:'tv',Audio:'headphones',Computers:'laptop',Phones:'phone',Cameras:'camera',Wearables:'watch',Displays:'monitor',Drones:'drone'};
  const s = store.settings;
  return `
  <div class="hero">
    <div class="hero-scene"></div>
    <svg class="hero-art" viewBox="0 0 240 180" style="--p-body:#f5f5f5;--p-accent:#3f6a8a"><use href="#art-tv"/></svg>
    <div class="container hero-content">
      <p class="eyebrow">IPTV + Electronics · Instant activation</p>
      <h1 class="campaign-display">Every Game <span class="outline">Every</span> Screen One Sub</h1>
    </div>
    <div class="container hero-cta">
      <a href="#/catalog/cat/iptv" class="btn-outline-on-image">See IPTV Plans</a>
    </div>
  </div>

  <section>
    <div class="container">
      <div class="section-header"><h2 class="heading-xl">LAMMA TV Plans</h2>
        <a class="link-md" href="https://wa.me/${s.whatsapp}" target="_blank" rel="noopener">Ask us anything on WhatsApp →</a></div>
      <div class="product-grid">${iptv.map(cardHTML).join('')}</div>
    </div>
  </section>

  <section style="padding-top:0" class="bg-cloud">
    <div class="container">
      <div class="section-header"><h2 class="heading-xl">Shop by Category</h2></div>
      <div class="category-strip">
        ${cats.map((c,i)=>`
          <div class="category-tile ${catClasses[i]}" onclick="location.hash='#/catalog/cat/${c.toLowerCase()}'">
            <svg viewBox="0 0 240 180" style="--p-body:#f5f5f5;--p-accent:${['#7ec9ff','#ffb0dd','#d8c48a','#c3f0ff','#beaffd','#d8c48a','#7ec9ff','#ffb0dd'][i]}"><use href="#art-${catIcons[c]}"/></svg>
            <button class="btn-outline-on-image">${c}</button>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-header"><h2 class="heading-xl">Hot Right Now</h2>
        <a href="#/catalog" class="link-md">Shop everything →</a></div>
      <div class="product-grid">${hot.map(cardHTML).join('')}</div>
    </div>
  </section>

  <section style="padding-top:0" class="bg-cloud">
    <div class="container">
      <div class="section-header"><h2 class="heading-xl">Why LAMMA TV</h2></div>
      <div class="member-grid">
        <div class="member-card"><h3>Try it free<br>for 24 hours</h3><a class="btn-outline-on-image" href="#/product/1">Start Trial</a></div>
        <div class="member-card"><h3>Instant WhatsApp<br>activation</h3><a class="btn-outline-on-image" href="https://wa.me/${s.whatsapp}" target="_blank" rel="noopener">Chat Now</a></div>
        <div class="member-card"><h3>4K during<br>the big match</h3><a class="btn-outline-on-image" href="#/catalog/cat/iptv">See Plans</a></div>
      </div>
    </div>
  </section>

  <section style="padding-top:0">
    <div class="container">
      <div class="disclosure open"><button class="disclosure-head">How does activation work? <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="disclosure-body"><p>Pick a plan, place the order — it opens WhatsApp with your order ready to send. We confirm payment and deliver your codes within minutes. No emails, no waiting.</p></div></div>
      <div class="disclosure"><button class="disclosure-head">What do I need to watch? <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="disclosure-body"><p>Any device: Smart TV, Android/iOS phone, PC, MAG box or Fire Stick. We send M3U / Xtream login and a setup guide for your device.</p></div></div>
      <div class="disclosure"><button class="disclosure-head">Do you sell hardware too? <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="disclosure-body"><p>Yes — TVs, boxes, audio and more. Physical products ship in 2–4 working days. Bundles like the Lamma Box come pre-configured.</p></div></div>
    </div>
  </section>

  ${footerHTML()}`;
}

/* ---------- VIEW: CATALOG ---------- */
let catalogState = { cat:'all', q:'', sort:'featured', badge:'all' };

function viewCatalog(){
  const {cat,q,sort,badge} = catalogState;
  let list = store.products.slice();
  if(cat !== 'all') list = list.filter(p=>p.category.toLowerCase()===cat);
  if(badge !== 'all') list = list.filter(p=>p.badge===badge);
  if(q) list = list.filter(p=>(p.name+' '+p.sub+' '+p.category).toLowerCase().includes(q.toLowerCase()));
  if(sort==='price-asc') list.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc') list.sort((a,b)=>b.price-a.price);
  if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));

  const counts = {};
  store.products.forEach(p=>{ counts[p.category]=(counts[p.category]||0)+1; });
  const s = store.settings;

  return `
  <div class="container">
    <div class="breadcrumb"><a href="#/">Home</a> / <span style="color:var(--ink)">${cat==='all'?'All Products':cat}</span></div>
    <div class="section-header" style="margin-bottom:8px"><h2 class="heading-xl">${cat==='all'?'All Products':cat} <small style="color:var(--mute);font-size:14px;font-family:var(--font-ui);letter-spacing:0;text-transform:none">(${list.length})</small></h2></div>
  </div>
  <div class="container catalog-layout">
    <aside class="filter-sidebar">
      <h4>Category</h4>
      <a href="#" data-cat="all" class="${cat==='all'?'active':''}">All Products <span>(${store.products.length})</span></a>
      ${CATEGORIES.map(c=>`<a href="#" data-cat="${c.toLowerCase()}" class="${cat===c.toLowerCase()?'active':''}">${c} <span>(${counts[c]||0})</span></a>`).join('')}
      <h4>Deals</h4>
      <a href="#" data-badge="all" class="${badge==='all'?'active':''}">Everything</a>
      <a href="#" data-badge="sale" class="${badge==='sale'?'active':''}">On Sale</a>
      <a href="#" data-badge="member" class="${badge==='member'?'active':''}">Most Popular</a>
    </aside>
    <div>
      <div class="sort-row">
        <div class="chip-row" style="margin:0">
          <button class="filter-chip ${badge==='all'?'active':''}" data-badge="all">All</button>
          <button class="filter-chip ${badge==='sale'?'active':''}" data-badge="sale">Sale</button>
          <button class="filter-chip ${badge==='member'?'active':''}" data-badge="member">Most Popular</button>
          <button class="filter-chip ${badge==='just-in'?'active':''}" data-badge="just-in">Just In</button>
        </div>
        <select id="sortSelect">
          <option value="featured" ${sort==='featured'?'selected':''}>Sort By: Featured</option>
          <option value="price-asc" ${sort==='price-asc'?'selected':''}>Price: Low to High</option>
          <option value="price-desc" ${sort==='price-desc'?'selected':''}>Price: High to Low</option>
          <option value="name" ${sort==='name'?'selected':''}>Name: A-Z</option>
        </select>
      </div>
      ${list.length ? `<div class="product-grid">${list.map(cardHTML).join('')}</div>`
        : `<div class="cart-empty">No products match those filters.</div>`}
      <div style="margin-top:32px" class="cart-empty">
        Can't find what you want? <a class="link-md" style="font-size:14px" href="https://wa.me/${s.whatsapp}" target="_blank" rel="noopener">Ask us on WhatsApp</a> — we can source almost any electronics.
      </div>
    </div>
  </div>
  ${footerHTML()}`;
}

/* ---------- VIEW: PRODUCT ---------- */
function viewProduct(id){
  const p = store.products.find(x=>x.id===id);
  if(!p){ return viewCatalog(); }
  pdpState = pdpState && pdpState.productId===id ? pdpState : {productId:id, qty:1};
  const related = store.products.filter(x=>x.category===p.category && x.id!==p.id).slice(0,3);
  const art = `<svg viewBox="0 0 240 180" style="--p-body:${p.color};--p-accent:${p.accent}"><use href="#art-${p.icon}"/></svg>`;
  const stockNote = p.digital
    ? `<span class="stock-ok">Instant activation after payment</span>`
    : p.stock>0 && p.stock<=10 ? `<span class="stock-low">Only ${p.stock} left — selling fast</span>` : '';
  const priceBlock = p.price === 0
    ? `<span class="price-free" style="font-size:24px">Free</span>`
    : p.pricePrev
      ? `<span class="price-sale">${money(p.price)}</span><span class="price-strike">${money(p.pricePrev)}</span><span class="pct-off">${Math.round((1-p.price/p.pricePrev)*100)}% off</span>`
      : `<span>${money(p.price)}</span>`;
  return `
  <div class="container">
    <div class="breadcrumb"><a href="#/">Home</a> / <a href="#/catalog/cat/${p.category.toLowerCase()}">${p.category}</a> / <span style="color:var(--ink)">${p.name}</span></div>
    <div class="pdp-layout" style="margin-bottom:48px">
      <div class="pdp-stage">${art}</div>
      <div>
        ${p.badge!=='none' && BADGE_LABEL[p.badge]?`<span class="badge-promo" style="position:static;display:inline-block;margin-bottom:8px">${BADGE_LABEL[p.badge]}</span>`:''}
        <h1 style="font-size:32px;font-weight:500;line-height:1.2">${p.name}</h1>
        <p class="product-sub" style="font-size:16px">${p.sub}</p>
        <div class="price-row pdp-price">${priceBlock}</div>
        <p style="margin-bottom:16px">${stockNote}</p>
        ${p.price>0?`
        <div class="qty-row">
          <div class="qty-stepper">
            <button id="qtyMinus">−</button><span id="qtyVal">${pdpState.qty}</span><button id="qtyPlus">+</button>
          </div>
        </div>`:''}
        <div class="modal-actions" style="margin-bottom:24px">
          ${p.price===0
            ? `<a class="btn-primary" href="https://wa.me/${store.settings.whatsapp}?text=${encodeURIComponent('Hi! I want the 24h free trial of LAMMA TV.')}" target="_blank" rel="noopener">Claim Free Trial on WhatsApp</a>`
            : `<button class="btn-primary" id="pdpAdd" ${!p.digital && p.stock<=0?'disabled':''}>${!p.digital && p.stock<=0?'Out of Stock':'Add to Bag'}</button>`}
        </div>
        <div class="disclosure open"><button class="disclosure-head">Product Details <span class="chev">→</span></button><div class="disclosure-body"><p>${p.desc||'Product details coming soon.'}</p></div></div>
        <div class="disclosure"><button class="disclosure-head">${p.digital?'Activation &amp; Support':'Shipping &amp; Returns'} <span class="chev">→</span></button><div class="disclosure-body"><p>${p.digital?'Codes delivered on WhatsApp within minutes of payment. Free setup help for any device, anytime.':'Ships in 2–4 working days. Free returns for 60 days — contact us on WhatsApp for anything.'}</p></div></div>
      </div>
    </div>
    ${related.length?`<section style="padding:0 0 48px"><div class="section-header"><h2 class="heading-xl">You Might Also Like</h2></div><div class="product-grid">${related.map(cardHTML).join('')}</div></section>`:''}
  </div>
  ${footerHTML()}`;
}

/* ---------- VIEW: CHECKOUT ---------- */
function viewCheckout(){
  const entries = Object.entries(cart);
  if(!entries.length) return viewCartEmptyPrompt();
  const items = entries.map(([id,qty])=>({p:store.products.find(x=>x.id==id),qty})).filter(x=>x.p);
  const subtotal = items.reduce((s,{p,qty})=>s+p.price*qty,0);
  const hasPhysical = items.some(({p})=>!p.digital);
  return `
  <section style="padding-top:24px">
    <div class="container">
      <div class="section-header"><h2 class="heading-xl">Checkout</h2>
        <p style="color:var(--mute);font-size:14px">Your order opens in WhatsApp — we confirm and activate immediately.</p></div>
      <div class="checkout-layout">
        <form id="checkoutForm" autocomplete="on">
          <h3 class="heading-lg" style="margin-bottom:16px">Your Details</h3>
          <div class="form-grid">
            <div class="field"><label>First name</label><input required name="first" placeholder="Houssem"></div>
            <div class="field"><label>Last name</label><input required name="last" placeholder="Ben Ali"></div>
            <div class="field"><label>Phone (WhatsApp)</label><input required type="tel" name="phone" placeholder="+216 __ ___ ___"></div>
            <div class="field"><label>Email <span style="color:var(--mute);font-weight:400">(optional)</span></label><input type="email" name="email" placeholder="you@example.com"></div>
          </div>
          ${hasPhysical?`
          <h3 class="heading-lg" style="margin:24px 0 16px">Delivery Address <span style="font-size:14px;color:var(--mute);font-weight:400">(hardware in your bag)</span></h3>
          <div class="form-grid">
            <div class="field" style="grid-column:1/-1"><label>Address</label><input required name="address" placeholder="Street and number"></div>
            <div class="field"><label>City</label><input required name="city" placeholder="Tunis"></div>
            <div class="field"><label>Country</label><select name="country"><option>Tunisia</option><option>Algeria</option><option>Libya</option><option>Morocco</option><option>France</option><option>Italy</option><option>Germany</option></select></div>
          </div>`:''}
          <div class="field" style="margin-top:8px"><label>Note for us <span style="color:var(--mute);font-weight:400">(optional)</span></label><input name="note" placeholder="e.g. want 4K on match days"></div>
          <div class="field" style="margin-top:8px">
            <label>Payment method</label>
            <select name="payment"><option>Confirm on WhatsApp</option><option>D17 / e-dinar</option><option>Bank transfer</option></select>
          </div>
          <p style="color:var(--mute);font-size:13px;margin:8px 0 24px">No online payment is taken here. We agree on payment and activate together on WhatsApp.</p>
        </form>
        <aside class="summary-card">
          <h3>Order Summary</h3>
          ${items.map(({p,qty})=>`<div class="summary-item"><span>${qty}× ${p.name}</span><span>${p.price===0?'Free':money(p.price*qty)}</span></div>`).join('')}
          <div class="summary-item" style="color:var(--mute)"><span>Delivery</span><span>${hasPhysical?'2–4 days':'Instant (WhatsApp)'}</span></div>
          <div class="summary-total"><span>Total</span><span>${subtotal===0?'Free':money(subtotal)}</span></div>
          <button class="btn-primary" style="width:100%;margin-top:24px;background:#1eaa52" id="placeOrder">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.4-.2-2.9.8.8-2.7-.2-.4A8 8 0 0 1 12 4z"/></svg>
            Send Order via WhatsApp
          </button>
        </aside>
      </div>
    </div>
  </section>
  ${footerHTML()}`;
}

function viewCartEmptyPrompt(){
  return `
  <div class="confirm-card">
    <div class="tick" style="background:var(--soft-cloud);color:var(--ink)">🛒</div>
    <h2 class="heading-xl" style="margin-bottom:8px">Your Bag Is Empty</h2>
    <p style="color:var(--mute);margin-bottom:32px">Pick a plan or some gear first.</p>
    <a href="#/catalog" class="btn-primary" style="margin:0 auto">Shop Products</a>
  </div>${footerHTML()}`;
}

/* ---------- VIEW: CONFIRM ---------- */
function viewConfirm(order){
  const waUrl = whatsappOrderUrl(order, store.settings);
  return `
  <div class="confirm-card">
    <div class="tick" style="background:#1eaa52">✓</div>
    <h2 class="heading-xl" style="margin-bottom:8px">Order is Ready</h2>
    <p class="heading-lg" style="margin-bottom:16px">${order.id}</p>
    <p style="color:var(--mute);margin-bottom:8px">Ref <b>${order.id}</b> · Total <b>${order.total===0?'Free':money(order.total)}</b></p>
    <p style="color:var(--mute);margin-bottom:32px">If WhatsApp didn't open automatically, tap below and send the pre-filled message.</p>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
      <a href="${waUrl}" target="_blank" rel="noopener" class="btn-primary" style="background:#1eaa52">Open WhatsApp</a>
      <a href="#/catalog" class="btn-secondary">Keep Shopping</a>
    </div>
  </div>${footerHTML()}`;
}

function footerHTML(){
  const s = store.settings;
  return `<footer><div class="container">
    <div class="footer-cols">
      <div><h4>IPTV</h4><a href="#/catalog/cat/iptv">All Plans</a><a href="#/product/1">Free Trial</a><a href="#/product/6">12 Months Plan</a><a href="#/product/8">Lamma Box Bundle</a></div>
      <div><h4>Shop</h4>${CATEGORIES.slice(1,5).map(c=>`<a href="#/catalog/cat/${c.toLowerCase()}">${c}</a>`).join('')}</div>
      <div><h4>Help</h4><a href="https://wa.me/${s.whatsapp}" target="_blank" rel="noopener">WhatsApp Support</a><a href="#/">Activation Guide</a><a href="#/">Refund Policy</a></div>
      <div><h4>Admin</h4><a href="admin.html">Admin Console</a></div>
    </div>
    <div class="fine-print">
      <span>© 2026 ${s.storeName}. Design system: VoltAgent/awesome-design-md (Nike spec). Demo build — payments handled on WhatsApp.</span>
      <span>WhatsApp: +${s.whatsapp} · Terms of Use · Privacy Policy</span>
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
  const b = $('#bagCount'); if(b){ b.hidden = n===0; b.textContent = n; }
  const h = $('#cartHeadCount'); if(h) h.textContent = n?`(${n})`:'';
}
function addToCart(id, qty=1){
  cart[id] = (cart[id]||0) + qty;
  saveCart(); toast('Added to Bag');
}
function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('show'), 2200);
}

function renderCartDrawer(){
  $('#cartItems').innerHTML = (()=>{
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
  $('#cartSubtotal').textContent = cartSubtotal()===0?'Free':money(cartSubtotal());
}
function cartQty(id,d){
  cart[id] = (cart[id]||0)+d;
  if(cart[id]<=0) delete cart[id];
  saveCart(); renderCartDrawer();
}
function cartRemove(id){ delete cart[id]; saveCart(); renderCartDrawer(); }

/* ---------- ROUTER ---------- */
let lastOrder = null;

function route(){
  const hash = location.hash || '#/';
  const [_, view, arg] = hash.replace('#/','').split('/');
  let html = '';
  if(!view){ html = viewHome(); }
  else if(view==='catalog'){ catalogState.cat = arg || 'all'; html = viewCatalog(); }
  else if(view==='product'){ html = viewProduct(parseInt(arg)); }
  else if(view==='checkout'){ html = viewCheckout(); }
  else if(view==='confirm' && lastOrder){ html = viewConfirm(lastOrder); }
  else { html = viewHome(); }
  $('#app').innerHTML = html;
  bindPage();
  window.scrollTo(0,0);
}

function bindPage(){
  document.querySelectorAll('.product-card').forEach(el=>{
    el.onclick = ()=>{ location.hash = `#/product/${el.dataset.id}`; };
  });
  document.querySelectorAll('[data-cat]').forEach(a=>{
    a.onclick = e=>{ e.preventDefault(); catalogState.cat = a.dataset.cat; catalogState.badge='all'; route(); };
  });
  document.querySelectorAll('[data-badge].filter-chip, .filter-sidebar [data-badge]').forEach(a=>{
    a.onclick = e=>{ e.preventDefault(); catalogState.badge = a.dataset.badge; route(); };
  });
  const sort = $('#sortSelect');
  if(sort) sort.onchange = ()=>{ catalogState.sort = sort.value; route(); };

  const qtyPlus=$('#qtyPlus'), qtyMinus=$('#qtyMinus');
  if(qtyPlus){
    qtyPlus.onclick = ()=>{ pdpState.qty=Math.min(pdpState.qty+1,99); $('#qtyVal').textContent=pdpState.qty; };
    qtyMinus.onclick = ()=>{ if(pdpState.qty>1){pdpState.qty--; $('#qtyVal').textContent=pdpState.qty;} };
    const add=$('#pdpAdd');
    if(add) add.onclick = ()=>{ addToCart(pdpState.productId, pdpState.qty); openDrawer(); };
    document.querySelectorAll('.disclosure').forEach(d=>{ d.querySelector('.disclosure-head').onclick=()=>d.classList.toggle('open'); });
  }

  const place = $('#placeOrder');
  if(place){
    place.onclick = ()=>{
      const f = $('#checkoutForm');
      if(!f.reportValidity()) return;
      const customer = Object.fromEntries(new FormData(f).entries());
      const items = cartEntries().map(({p,qty})=>({id:p.id,name:p.name,qty,price:p.price}));
      const order = {
        id: 'LT-' + Date.now().toString().slice(-6),
        date: new Date().toISOString(),
        customer, items, total: cartSubtotal(), status: 'New'
      };
      const log = loadOrdersLog(); log.unshift(order); saveOrdersLog(log);
      lastOrder = order;
      cart = {}; saveCart(); renderCartDrawer();
      window.open(whatsappOrderUrl(order, store.settings), '_blank');
      location.hash = '#/confirm';
    };
  }
}

/* drawer + nav events (persistent elements appear after boot injects the nav) */
function openDrawer(){ $('#cartDrawer').classList.add('open'); $('#drawerBackdrop').classList.add('open'); renderCartDrawer(); }
function closeDrawer(){ $('#cartDrawer').classList.remove('open'); $('#drawerBackdrop').classList.remove('open'); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeDrawer(); });

/* ---------- BOOT ---------- */
(async function init(){
  window.store = await loadStoreData();
  document.getElementById('navContainer').innerHTML = `
    <a href="#/" class="logo"><b>${store.settings.storeName}</b></a>
    <div class="nav-links">
      <a href="#/catalog/cat/iptv">IPTV</a>
      <a href="#/catalog">New &amp; Featured</a>
      <a href="#/catalog/cat/phones">Phones</a>
      <a href="#/catalog/cat/computers">Computers</a>
    </div>
    <form class="nav-right" id="searchForm">
      <label class="search-pill">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg>
        <input type="search" placeholder="Search" id="navSearch">
      </label>
      <button type="button" class="icon-btn" aria-label="Bag" id="cartBtn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
        <span class="bag-count" id="bagCount" hidden>0</span>
      </button>
    </form>`;
  // persistent UI bindings
  $('#cartBtn').onclick = openDrawer;
  $('#cartClose').onclick = closeDrawer;
  $('#drawerBackdrop').onclick = closeDrawer;
  $('#checkoutBtn').onclick = ()=>{ closeDrawer(); location.hash='#/checkout'; };
  $('#navSearch').addEventListener('input', ()=>{ catalogState.q = $('#navSearch').value; if(location.hash.includes('catalog')){ route(); } });
  $('#searchForm').onsubmit = e=>{ e.preventDefault(); catalogState.q = $('#navSearch').value; location.hash='#/catalog'; route(); };
  // live settings touch-points
  document.querySelectorAll('.wa-float, .utility-links a.admin-flag').forEach(a=>{ a.href = 'https://wa.me/'+store.settings.whatsapp; });
  document.querySelector('.utility-bar .container .logo').textContent = store.settings.storeName;
  document.title = store.settings.storeName + ' — IPTV Subscriptions & Electronics';
  syncBagUI();
  route();
})();
window.addEventListener('hashchange', route);
