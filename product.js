/* ============ PRODUCT DETAIL PAGE ============ */
(async function(){
  let product = null;
  let qty = 1;

  await boot(()=>{
    const id = parseInt(new URLSearchParams(location.search).get('id'), 10);
    product = store.products.find(p=>p.id===id);

    if(!product){
      document.getElementById('pdp').innerHTML = `
        <div class="cart-empty" style="grid-column:1/-1">
          <h2 class="heading-xl">Product Not Found</h2>
          <p style="color:var(--mute);margin:8px 0 24px">It may have been removed or renamed.</p>
          <a href="shop.html" class="btn-primary" style="margin:0 auto">Back to Shop</a>
        </div>`;
      document.getElementById('crumbName').textContent = 'Not found';
      document.title = 'Product Not Found — LAMMA TV';
      return;
    }

    const p = product;
    qty = 1;

    document.getElementById('crumbCat').href = 'shop.html?cat=' + p.category.toLowerCase();
    document.getElementById('crumbCat').textContent = p.category;
    document.getElementById('crumbName').textContent = p.name;
    document.title = p.name + ' — LAMMA TV';

    const art = `<svg viewBox="0 0 240 180" style="--p-body:${p.color};--p-accent:${p.accent}"><use href="#art-${p.icon}"/></svg>`;
    const badge = p.badge !== 'none' && BADGE_LABEL[p.badge]
      ? `<span class="badge-promo" style="position:static;display:inline-block;margin-bottom:8px">${BADGE_LABEL[p.badge]}</span>` : '';
    const priceBlock = p.price === 0
      ? `<span class="price-free" style="font-size:26px;font-weight:500">Free</span>`
      : p.pricePrev
        ? `<span class="price-sale">${money(p.price)}</span><span class="price-strike">${money(p.pricePrev)}</span><span class="pct-off">${Math.round((1-p.price/p.pricePrev)*100)}% off</span>`
        : `<span>${money(p.price)}</span>`;
    const stockNote = p.digital
      ? `<span class="stock-ok">Instant activation after payment</span>`
      : p.stock<=0 ? `<span class="out-of-stock">Out of stock</span>`
      : p.stock<=10 ? `<span class="stock-low">Only ${p.stock} left — selling fast</span>` : '';

    const actions = p.price === 0
      ? `<a class="btn-primary" style="background:#1eaa52" data-wa-trial href="https://wa.me/${store.settings.whatsapp}?text=${encodeURIComponent('Hi! I want the 24h free trial of LAMMA TV.')}" target="_blank" rel="noopener">Claim Free Trial on WhatsApp</a>`
      : `<div class="qty-row">
           <div class="qty-stepper">
             <button id="qtyMinus" type="button" aria-label="Decrease">−</button><span id="qtyVal">1</span><button id="qtyPlus" type="button" aria-label="Increase">+</button>
           </div>
         </div>
         <div class="modal-actions" style="flex-wrap:wrap">
           <button class="btn-primary" id="pdpAdd" type="button" ${!p.digital && p.stock<=0?'disabled':''}>${!p.digital && p.stock<=0?'Out of Stock':'Add to Bag'}</button>
           <button class="btn-secondary" id="pdpOrder" type="button" ${!p.digital && p.stock<=0?'disabled':''}>Order Now</button>
         </div>`;

    document.getElementById('pdp').innerHTML = `
      <div class="pdp-stage">${art}</div>
      <div>
        ${badge}
        <h1 style="font-size:32px;font-weight:500;line-height:1.2">${p.name}</h1>
        <p class="product-sub" style="font-size:16px">${p.sub}</p>
        <div class="price-row pdp-price">${priceBlock}</div>
        <p style="margin-bottom:16px">${stockNote}</p>
        ${actions}
        <div class="disclosure open"><button class="disclosure-head" type="button">Product Details <span class="chev">→</span></button>
          <div class="disclosure-body"><p>${p.desc||'Product details coming soon.'}</p></div></div>
        <div class="disclosure"><button class="disclosure-head" type="button">${p.digital?'Activation &amp; Support':'Shipping &amp; Returns'} <span class="chev">→</span></button>
          <div class="disclosure-body"><p>${p.digital?'Delivered on WhatsApp within minutes of payment after we confirm it. Free setup help for any device, anytime.':'Ships in 2–4 working days across Tunisia. Free returns for 60 days — contact us on WhatsApp for anything.'}</p></div></div>
        <div class="disclosure"><button class="disclosure-head" type="button">Questions? <span class="chev">→</span></button>
          <div class="disclosure-body"><p>Message us on <a class="link-md" data-wa href="https://wa.me/${store.settings.whatsapp}" target="_blank" rel="noopener">WhatsApp</a> — we answer fast.</p></div></div>
      </div>`;

    // bind PDP controls
    const minus = document.getElementById('qtyMinus');
    const plus  = document.getElementById('qtyPlus');
    if(plus){
      plus.onclick = ()=>{ qty = Math.min(qty+1, 99); document.getElementById('qtyVal').textContent = qty; };
      minus.onclick = ()=>{ if(qty>1){ qty--; document.getElementById('qtyVal').textContent = qty; } };
    }
    const add = document.getElementById('pdpAdd');
    if(add) add.onclick = ()=>{ addToCart(p.id, qty); toast('Added to Bag'); openDrawer(); };
    const orderNow = document.getElementById('pdpOrder');
    if(orderNow) orderNow.onclick = ()=>{ addToCart(p.id, qty); closeDrawer(); location.href = 'checkout.html'; };

    // accordions
    document.querySelectorAll('#pdp .disclosure').forEach(d=>{
      d.querySelector('.disclosure-head').onclick = ()=>d.classList.toggle('open');
    });

    // related products
    const related = store.products.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
    if(related.length){
      document.getElementById('relatedSection').style.display='block';
      document.getElementById('relatedGrid').innerHTML = related.map(cardHTML).join('');
      bindQuickAdd();
    }
  });
})();
