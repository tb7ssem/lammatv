/* ============ LAMMA TV ADMIN CONSOLE ============ */
let currentView = 'dashboard';
let editingId = null;
let hasUnpublished = false;
let orderLog = loadOrdersLog();
const GH_KEY = 'lammatv_gh';          // {repo} + optional token, browser-local only
const PASS_KEY = 'lammatv_adminpass'; // password override, browser-local only

/* ---------- LOGIN ---------- */
function adminLogin(){
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  const pass = localStorage.getItem(PASS_KEY) || 'lamma2026';
  if(u==='admin' && p===pass){
    sessionStorage.setItem('lammatv_admin','1');
    if(window.store) enterApp();
    else { // store still loading — wait for it
      const wait = setInterval(()=>{ if(window.store){ clearInterval(wait); enterApp(); } }, 100);
    }
  }
  else document.getElementById('loginError').style.display='block';
}
function enterApp(){ document.getElementById('loginScreen').style.display='none'; document.getElementById('adminApp').style.display='block'; renderAdmin(); }
document.getElementById('logoutBtn').onclick = ()=>{ sessionStorage.removeItem('lammatv_admin'); location.reload(); };
document.querySelectorAll('.admin-nav-btn[data-view]').forEach(b=>{
  b.onclick = ()=>switchView(b.dataset.view);
});
document.getElementById('mobileView').onchange = e=>switchView(e.target.value);
function switchView(v){
  currentView = v;
  document.querySelectorAll('.admin-nav-btn[data-view]').forEach(x=>x.classList.toggle('active', x.dataset.view===v));
  document.getElementById('mobileView').value = v;
  renderAdmin();
}

const PUBLISH_BADGE = `<div style="background:var(--ink);color:var(--canvas);font-weight:500;font-size:13px;padding:10px 24px;border-radius:var(--r-full);display:inline-flex;gap:8px;margin-bottom:24px">● <span>Unpublished changes exist in this browser — <a href="#" onclick="openPublish();return false" style="text-decoration:underline;color:var(--success-bright)">Publish now</a> to make them live for everyone</span></div>`;

/* ---------- RENDER ---------- */
function renderAdmin(){
  const main = document.getElementById('adminMain');
  main.innerHTML = (hasUnpublished ? PUBLISH_BADGE : '') + ({
    dashboard: dashboardHTML(),
    products: productsHTML(),
    orders: ordersHTML(),
    settings: settingsHTML()
  })[currentView];
  document.getElementById('sideProdCount').textContent = store.products.length;
  document.getElementById('sideOrderCount').textContent = orderLog.length;
}

/* ---------- DASHBOARD (WhatsApp order log) ---------- */
function dashboardHTML(){
  const orders = orderLog;
  const revenue = orders.filter(o=>o.status!=='Cancelled').reduce((s,o)=>s+(Number(o.total)||0),0);
  const today = new Date().toISOString().slice(0,10);
  const todayOrders = orders.filter(o=>(o.date||'').slice(0,10)===today).length;
  const physical = store.products.filter(p=>!p.digital);
  const lowStock = physical.filter(p=>p.stock<=10).sort((a,b)=>a.stock-b.stock);
  const iptvCount = store.products.filter(p=>p.category==='IPTV').length;

  const days = [];
  for(let i=6;i>=0;i--){
    const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    const sum = orders.filter(o=>(o.date||'').slice(0,10)===key && o.status!=='Cancelled').reduce((s,o)=>s+(Number(o.total)||0),0);
    days.push({label:d.toLocaleDateString('en',{weekday:'short'}), sum});
  }
  const max = Math.max(...days.map(d=>d.sum), 1);

  return `
  <div class="section-header"><h2 class="heading-xl">Dashboard</h2>
    <a class="btn-primary" style="background:#1eaa52" href="https://wa.me/${store.settings.whatsapp}" target="_blank" rel="noopener">✆ Business WhatsApp</a></div>
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-label">Revenue (logged)</div><div class="stat-value">${money(revenue)}</div><div class="stat-delta">${todayOrders} today</div></div>
    <div class="stat-card"><div class="stat-label">Sales Logged</div><div class="stat-value">${orders.length}</div></div>
    <div class="stat-card"><div class="stat-label">Products Live</div><div class="stat-value">${store.products.length}</div><div class="stat-delta">${iptvCount} IPTV plans</div></div>
    <div class="stat-card"><div class="stat-label">Low Stock (physical)</div><div class="stat-value">${lowStock.length}</div><div class="stat-delta" style="color:${lowStock.length?'var(--sale)':'var(--success)'}">${lowStock.length?'restock needed':'all good'}</div></div>
  </div>

  <div class="chart-card">
    <h3 style="font-weight:500;margin-bottom:8px">Revenue — Last 7 Days <span style="font-size:13px;color:var(--mute);font-weight:400">(sales you log here + storefront checkouts on this device)</span></h3>
    <div class="chart-bars">
      ${days.map(d=>`<div style="flex:1"><div class="chart-bar" style="height:${Math.max(4,d.sum/max*150)}px"><span>${d.sum>0?money(d.sum):''}</span></div><div class="chart-day">${d.label}</div></div>`).join('')}
    </div>
  </div>

  <div style="margin-top:48px">
    <div class="section-header" style="margin-bottom:12px"><h3 class="heading-lg">Low Stock — Physical Products</h3></div>
    <table class="admin-table">
      <thead><tr><th>Product</th><th>Stock</th><th></th></tr></thead>
      <tbody>${lowStock.slice(0,8).map(p=>`
        <tr><td style="font-weight:500">${p.name}</td><td><span class="low-badge">${p.stock}</span></td>
        <td style="text-align:right"><button class="btn-secondary btn-sm" onclick="openProdModal(${p.id})">Restock</button></td></tr>`).join('') || '<tr class="empty-row"><td colspan="3">All physical stock is healthy 🎉</td></tr>'}
      </tbody>
    </table>
  </div>`;
}

/* ---------- PRODUCTS ---------- */
function productsHTML(){
  return `
  <div class="section-header"><h2 class="heading-xl">Products (${store.products.length})</h2>
    <div style="display:flex;gap:8px">
      <button class="btn-secondary btn-sm" onclick="openPublish()">⇧ Publish to Live Site</button>
      <button class="btn-primary" onclick="openProdModal(null)">+ Add Product</button>
    </div></div>
  <p style="color:var(--mute);font-size:13px;margin-bottom:16px">Edits save to this browser's working copy instantly. <b>Publish</b> pushes store.json live for all visitors.</p>
  <table class="admin-table">
    <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Type</th><th>Badge</th><th style="text-align:right">Actions</th></tr></thead>
    <tbody>
      ${store.products.map(p=>`
        <tr>
          <td><div class="tbl-thumb"><svg viewBox="0 0 240 180" style="--p-body:${p.color};--p-accent:${p.accent}"><use href="#art-${p.icon}"/></svg></div></td>
          <td><div style="font-weight:500">${p.name}</div><div style="color:var(--mute);font-size:12px">${p.sub}</div></td>
          <td>${p.category}</td>
          <td><span style="font-weight:500">${p.price===0?'Free':money(p.price)}</span>${p.pricePrev?`<div class="price-strike" style="font-size:12px">${money(p.pricePrev)}</div>`:''}</td>
          <td style="font-weight:500">${p.digital?'∞':p.stock + (p.stock<=10?'<span class="low-badge"> ⚠</span>':'')}</td>
          <td>${p.digital?'<span class="row-chip">Digital</span>':'<span class="row-chip">Physical</span>'}</td>
          <td>${BADGE_LABEL[p.badge]?`<span class="row-chip ${p.badge==='sale'?'sale':''}">${BADGE_LABEL[p.badge]}</span>`:'—'}</td>
          <td><div class="tbl-actions" style="justify-content:flex-end">
            <button class="btn-secondary btn-sm" onclick="openProdModal(${p.id})">Edit</button>
            <button class="btn-danger" onclick="delProduct(${p.id})">Delete</button>
          </div></td>
        </tr>`).join('')}
    </tbody>
  </table>`;
}

function openProdModal(id){
  editingId = id;
  const f = document.getElementById('prodForm');
  document.getElementById('prodModalTitle').textContent = id? 'Edit Product' : 'Add Product';
  f.reset();
  f.digital.value = 'false'; f.badge.value='none';
  if(id){
    const p = store.products.find(x=>x.id===id);
    f.name.value=p.name; f.sub.value=p.sub; f.category.value=p.category; f.icon.value=p.icon;
    f.price.value=p.price; f.pricePrev.value=p.pricePrev||''; f.stock.value=p.stock;
    f.digital.value=p.digital?'true':'false';
    f.badge.value=p.badge; f.desc.value=p.desc||''; f.color.value=p.color; f.accent.value=p.accent;
  } else { f.color.value='#2b4a63'; f.accent.value='#7ec9ff'; }
  f.stock.disabled = f.digital.value === 'true';
  updatePreview();
  document.getElementById('prodModal').classList.add('open');
  f.name.focus();
}
function closeProdModal(){ document.getElementById('prodModal').classList.remove('open'); }
function updatePreview(){
  const f = document.getElementById('prodForm');
  document.getElementById('prodPreview').innerHTML =
    `<svg viewBox="0 0 240 180" style="--p-body:${f.color.value};--p-accent:${f.accent.value}" width="180"><use href="#art-${f.icon.value}"/></svg>`;
}
document.getElementById('prodForm').addEventListener('input', updatePreview);
document.getElementById('prodForm').addEventListener('change', e=>{
  const f = document.getElementById('prodForm');
  f.stock.disabled = f.digital.value === 'true';
  if(!editingId && e.target.tagName==='SELECT'){ f.color.value='#2b4a63'; f.accent.value='#7ec9ff'; }
  updatePreview();
});
document.getElementById('prodForm').addEventListener('submit', e=>{
  e.preventDefault();
  const f = e.target;
  const p = {
    id: editingId || -1,
    name: f.name.value.trim(), sub: f.sub.value.trim(),
    category: f.category.value, icon: f.icon.value,
    price: Number(f.price.value),
    pricePrev: f.pricePrev.value? Number(f.pricePrev.value) : null,
    stock: f.digital.value==='true' ? 999 : Number(f.stock.value),
    digital: f.digital.value==='true',
    badge: f.badge.value, desc: f.desc.value.trim(),
    color: f.color.value, accent: f.accent.value
  };
  upsertProduct(p);
  closeProdModal();
  hasUnpublished = true;
  toast('Saved to working copy — Publish to go live');
  renderAdmin();
});
function upsertProduct(p){
  if(p.id && p.id > 0){
    const i = store.products.findIndex(x=>x.id===p.id);
    if(i>=0) store.products[i] = p; else store.products.push(p);
  } else {
    p.id = Math.max(0, ...store.products.map(x=>x.id)) + 1;
    store.products.unshift(p);
  }
  saveStore(store);
}
function delProduct(id){
  const p = store.products.find(x=>x.id===id);
  if(!confirm(`Delete “${p.name}” from your working copy?`)) return;
  store.products = store.products.filter(x=>x.id!==id);
  saveStore(store);
  hasUnpublished = true;
  toast('Deleted'); renderAdmin();
}

/* ---------- ORDERS (WhatsApp sales log) ---------- */
function ordersHTML(){
  return `
  <div class="section-header"><h2 class="heading-xl">Orders (${orderLog.length})</h2>
    <button class="btn-primary" style="background:#1eaa52" onclick="document.getElementById('orderModal').classList.add('open')">+ Log WhatsApp Sale</button></div>
  <p style="color:var(--mute);font-size:13px;margin-bottom:16px">Real sales records live in WhatsApp Business. Log your sales here for stats. Storefront checkouts on this device land here automatically.</p>
  <table class="admin-table">
    <thead><tr><th>Ref</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr></thead>
    <tbody>
      ${orderLog.map(o=>`
        <tr>
          <td style="font-weight:500">${o.id}</td>
          <td style="color:var(--mute);font-size:13px">${new Date(o.date).toLocaleDateString('en',{month:'short',day:'numeric'})} ${new Date(o.date).toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'})}</td>
          <td>${o.customer?.name ? o.customer.name : ((o.customer?.first||'')+' '+(o.customer?.last||''))}</td>
          <td style="font-size:13px">${o.items.map(i=>`${i.qty}× ${i.name||i}`).join('<br>')}</td>
          <td style="font-weight:500">${money(o.total)}</td>
          <td><select class="status-select" onchange="changeStatus('${o.id}',this.value)">
              ${ORDER_STATUSES.map(s=>`<option ${o.status===s?'selected':''}>${s}</option>`).join('')}
            </select></td>
          <td><div class="tbl-actions" style="justify-content:flex-end">
            <button class="btn-secondary btn-sm" onclick="openWaChat('${o.id}')">Report Issue</button>
            <button class="btn-danger" onclick="delOrder('${o.id}')">Delete</button>
          </div></td>
        </tr>`).join('') || '<tr class="empty-row"><td colspan="7">No logged orders yet.</td></tr>'}
    </tbody>
  </table>`;
}
function logOrder(){
  const f = document.getElementById('orderForm');
  if(!f.reportValidity()) return;
  const data = Object.fromEntries(new FormData(f).entries());
  orderLog.unshift({
    id: 'WA-' + Date.now().toString().slice(-6),
    date: new Date().toISOString(),
    customer: { name: data.name },
    items: data.items.split(',').map(s=>({qty:1, name:s.trim()})),
    total: Number(data.total),
    status: data.status
  });
  saveOrdersLog(orderLog);
  document.getElementById('orderModal').classList.remove('open');
  f.reset();
  toast('Sale logged'); renderAdmin();
}
function changeStatus(id, status){
  const o = orderLog.find(x=>x.id===id);
  if(o){ o.status = status; saveOrdersLog(orderLog); toast(`Order ${id} → ${status}`); }
}
function delOrder(id){
  if(!confirm('Remove this entry from the log?')) return;
  orderLog = orderLog.filter(x=>x.id!==id);
  saveOrdersLog(orderLog); toast('Removed'); renderAdmin();
}
function openWaChat(id){
  const o = orderLog.find(x=>x.id===id);
  const name = o.customer?.name || (o.customer?.first||'') + ' ' + (o.customer?.last||'');
  window.open(`https://wa.me/${store.settings.whatsapp}?text=${encodeURIComponent(name + ' — ' + id)}`, '_blank');
}

/* ---------- SETTINGS ---------- */
function settingsHTML(){
  const s = store.settings;
  const gh = JSON.parse(localStorage.getItem(GH_KEY) || '{}');
  return `
  <div class="section-header"><h2 class="heading-xl">Settings</h2></div>
  <div style="max-width:560px">
    <h3 class="heading-lg" style="margin-bottom:16px">Store</h3>
    <div class="field"><label>Store name</label><input id="setName" value="${s.storeName}" placeholder="LAMMA TV"></div>
    <div class="field"><label>WhatsApp number (digits only with country code)</label><input id="setWa" value="${s.whatsapp}" placeholder="21600000000"></div>
    <div class="field"><label>Currency suffix</label><input id="setCur" value="${s.currency}" placeholder="DT"></div>
    <button class="btn-primary" onclick="saveSettings()">Save Settings (working copy)</button>

    <h3 class="heading-lg" style="margin:32px 0 16px">Publishing</h3>
    <p style="color:var(--mute);font-size:14px;margin-bottom:16px">Connected repo: <b>${gh.repo || 'not saved'}</b>. The token (if saved) stays in this browser only. Publish pushes store.json — the change goes live for everyone in about a minute.</p>
    <button class="btn-secondary" onclick="openPublish()">Configure / Publish</button>

    <h3 class="heading-lg" style="margin:32px 0 16px">Security</h3>
    <div class="field"><label>Admin password (browser-local, never published)</label><input id="setPass" type="password" placeholder="leave empty to keep current"></div>
    <button class="btn-primary" onclick="savePassword()">Change Password</button>
    <p style="color:var(--mute);font-size:12px;margin-top:8px">A static site has no server-side lock — this gate is convenience. Your GitHub token is the real key; keep it scoped to this repo only.</p>
  </div>`;
}
function saveSettings(){
  store.settings.storeName = document.getElementById('setName').value.trim() || store.settings.storeName;
  store.settings.whatsapp = document.getElementById('setWa').value.replace(/\D/g,'') || store.settings.whatsapp;
  store.settings.currency = document.getElementById('setCur').value.trim() || store.settings.currency;
  saveStore(store);
  hasUnpublished = true;
  toast('Settings saved (working copy)'); renderAdmin();
}
function savePassword(){
  const v = document.getElementById('setPass').value;
  if(v && v.length >= 4){ localStorage.setItem(PASS_KEY, v); toast('Password changed'); }
  else if(v) toast('Password too short (min 4)');
  else toast('Kept current password');
}

/* ---------- PUBLISH ---------- */
function openPublish(){
  const gh = JSON.parse(localStorage.getItem(GH_KEY) || '{}');
  document.getElementById('ghRepo').value = gh.repo || '';
  document.getElementById('ghToken').value = '';
  document.getElementById('publishStatus').textContent = '';
  document.getElementById('publishModal').classList.add('open');
}
async function publishGitHub(){
  const repo = document.getElementById('ghRepo').value.trim();
  const token = document.getElementById('ghToken').value.trim();
  const st = document.getElementById('publishStatus');
  if(!repo){ st.textContent = '⚠️ Enter the repo as owner/name.'; return; }
  if(!token){ st.textContent = '⚠️ Enter a token, or use Download + manual upload.'; return; }
  localStorage.setItem(GH_KEY, JSON.stringify({repo}));
  st.textContent = 'Publishing…';
  try{
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(store, null, 2))));
    let sha;
    const g = await fetch(`https://api.github.com/repos/${repo}/contents/store.json`, {
      headers: {Authorization:`Bearer ${token}`, Accept:'application/vnd.github+json'}
    });
    if(g.ok) sha = (await g.json()).sha;
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/store.json`, {
      method:'PUT',
      headers: {Authorization:`Bearer ${token}`, Accept:'application/vnd.github+json'},
      body: JSON.stringify({
        message:`${store.settings.storeName}: publish updates from admin console`,
        content, sha, branch:'main'
      })
    });
    if(res.ok){
      st.innerHTML = '✅ Published! Live for all visitors in ~1–2 minutes.';
      toast('Published to GitHub');
      hasUnpublished = false;
      renderAdmin();
    } else {
      const err = await res.json().catch(()=>({}));
      st.textContent = '❌ ' + (err.message || res.status + ' ' + res.statusText);
    }
  }catch(e){
    st.textContent = '❌ Network error: ' + e.message;
  }
}
function downloadStoreJson(){
  const blob = new Blob([JSON.stringify(store, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'store.json';
  a.click();
  toast('store.json downloaded');
}

/* ---------- INIT ---------- */
document.getElementById('prodCat').innerHTML = CATEGORIES.map(c=>`<option>${c}</option>`).join('');
(async function initAdmin(){
  window.store = await loadStoreData();
  renderAdmin();
  if(sessionStorage.getItem('lammatv_admin')==='1') enterApp();
})();
