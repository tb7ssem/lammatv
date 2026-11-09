/* ============ CHECKOUT PAGE ============ */
(async function(){
  await boot(()=>{
    const root = document.getElementById('checkoutRoot');
    const entries = cartEntries().map(({p,qty})=>({p,qty}));
    const subtotal = entries.reduce((s,{p,qty})=>s+p.price*qty,0);
    const hasPhysical = entries.some(({p})=>!p.digital);

    /* ---------- confirmation view (after order placed) ---------- */
    function showConfirm(order){
      document.title = 'Order Confirmed — LAMMA TV';
      root.innerHTML = `
        <div class="confirm-card">
          <div class="tick" style="background:#1eaa52">✓</div>
          <h2 class="heading-xl" style="margin-bottom:8px">Order is Ready to Send</h2>
          <p class="heading-lg" style="margin-bottom:16px">${order.id}</p>
          <p style="color:var(--mute);margin-bottom:8px">Ref <b>${order.id}</b> · Total <b>${order.total===0?'Free':money(order.total)}</b></p>
          <p style="color:var(--mute);margin-bottom:32px">If WhatsApp didn't open automatically (pop-ups can be blocked), tap the button below and send the pre-filled message — we'll confirm and activate your order there.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
            <a href="${whatsappOrderUrl(order, store.settings)}" target="_blank" rel="noopener" class="btn-primary" style="background:#1eaa52">Open WhatsApp</a>
            <a href="shop.html" class="btn-secondary">Keep Shopping</a>
          </div>
        </div>`;
    }

    /* ---------- empty bag view ---------- */
    if(!entries.length){
      document.title = 'Your Bag Is Empty — LAMMA TV';
      root.innerHTML = `
        <div class="confirm-card">
          <div class="tick" style="background:var(--soft-cloud);color:var(--ink)">🛒</div>
          <h2 class="heading-xl" style="margin-bottom:8px">Your Bag Is Empty</h2>
          <p style="color:var(--mute);margin-bottom:32px">Pick a plan or some gear first.</p>
          <a href="shop.html" class="btn-primary" style="margin:0 auto">Shop Products</a>
        </div>`;
      return;
    }

    /* ---------- checkout form ---------- */
    document.title = 'Checkout — LAMMA TV';
    root.innerHTML = `
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
          ${entries.map(({p,qty})=>`<div class="summary-item"><span>${qty}× ${p.name}</span><span>${p.price===0?'Free':money(p.price*qty)}</span></div>`).join('')}
          <div class="summary-item" style="color:var(--mute)"><span>Delivery</span><span>${hasPhysical?'2–4 days':'Instant (WhatsApp)'}</span></div>
          <div class="summary-total"><span>Total</span><span>${subtotal===0?'Free':money(subtotal)}</span></div>
          <button class="btn-primary" style="width:100%;margin-top:24px;background:#1eaa52" id="placeOrder" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-4px;margin-right:6px"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.4-.2-2.9.8.8-2.7-.2-.4A8 8 0 0 1 12 4z"/></svg>
            Send Order via WhatsApp
          </button>
        </aside>
      </div>`;

    document.getElementById('placeOrder').onclick = ()=>{
      const f = document.getElementById('checkoutForm');
      if(!f.reportValidity()) return;
      const customer = Object.fromEntries(new FormData(f).entries());
      const items = entries.map(({p,qty})=>({id:p.id, name:p.name, qty, price:p.price}));
      const order = {
        id: 'LT-' + Date.now().toString().slice(-6),
        date: new Date().toISOString(),
        customer, items, total: subtotal, status: 'New'
      };
      const log = loadOrdersLog();
      log.unshift(order);
      saveOrdersLog(log);
      cart = {}; saveCart(); renderCartDrawer();
      window.open(whatsappOrderUrl(order, store.settings), '_blank');
      showConfirm(order);
      window.scrollTo(0,0);
    };
  });
})();
