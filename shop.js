/* ============ SHOP / CATALOG PAGE ============ */
(async function(){
  await boot(async ()=>{});

  const params = new URLSearchParams(location.search);
  let cat = (params.get('cat')||'all').toLowerCase();
  let badge = params.get('badge')||'all';
  let q = params.get('q')||'';
  let sort = params.get('sort')||'featured';

  function buildURL(overrides={}){
    const p = new URLSearchParams();
    const merged = {cat:cat==='all'?'':cat, badge:badge==='all'?'':badge, q, sort:sort==='featured'?'':sort, ...overrides};
    merged.cat = overrides.cat!==undefined? overrides.cat : (merged.cat||'');
    merged.badge = overrides.badge!==undefined? overrides.badge : (merged.badge||'');
    merged.q = overrides.q!==undefined? overrides.q : merged.q;
    merged.sort = overrides.sort!==undefined? overrides.sort : (merged.sort||'');
    if(merged.cat) p.set('cat', merged.cat);
    if(merged.badge) p.set('badge', merged.badge);
    if(merged.q) p.set('q', merged.q);
    if(merged.sort) p.set('sort', merged.sort);
    const qs = p.toString();
    return 'shop.html' + (qs?'?'+qs:'');
  }

  function render(){
    let list = store.products.slice();
    if(cat!=='all') list = list.filter(p=>p.category.toLowerCase()===cat);
    if(badge!=='all') list = list.filter(p=>p.badge===badge);
    if(q) list = list.filter(p=>(p.name+' '+p.sub+' '+p.category).toLowerCase().includes(q.toLowerCase()));
    if(sort==='price-asc') list.sort((a,b)=>a.price-b.price);
    if(sort==='price-desc') list.sort((a,b)=>b.price-a.price);
    if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));

    const counts = {};
    store.products.forEach(p=>{ counts[p.category]=(counts[p.category]||0)+1; });
    const currentCat = cat==='all' ? 'All Products' : (CATEGORIES.find(c=>c.toLowerCase()===cat)||cat);

    document.getElementById('crumb').textContent = currentCat;
    document.getElementById('catTitle').innerHTML = `${currentCat} <small style="color:var(--mute);font-size:14px;font-family:var(--font-ui);letter-spacing:0;text-transform:none">(${list.length})</small>`;
    document.title = currentCat + ' — LAMMA TV';

    document.getElementById('sidebar').innerHTML = `
      <h4>Category</h4>
      <a href="${buildURL({cat:''})}" class="${cat==='all'?'active':''}">All Products <span>(${store.products.length})</span></a>
      ${CATEGORIES.map(c=>`<a href="${buildURL({cat:c.toLowerCase()})}" class="${cat===c.toLowerCase()?'active':''}">${c} <span>(${counts[c]||0})</span></a>`).join('')}
      <h4>Deals</h4>
      <a href="${buildURL({badge:''})}" class="${badge==='all'?'active':''}">Everything</a>
      <a href="${buildURL({badge:'sale'})}" class="${badge==='sale'?'active':''}">On Sale</a>
      <a href="${buildURL({badge:'member'})}" class="${badge==='member'?'active':''}">Most Popular</a>`;

    document.getElementById('chips').innerHTML = ['all','sale','member','just-in'].map(b=>
      `<button class="filter-chip ${badge===b?'active':''}" data-badge="${b}" onclick="location.href='${buildURL({badge:b})}'">${b==='all'?'All':b==='member'?'Most Popular':b==='sale'?'Sale':'Just In'}</button>`).join('');

    document.getElementById('sortSelect').value = sort;
    const grid = document.getElementById('grid');
    if(list.length){
      grid.innerHTML = list.map(cardHTML).join('');
      document.getElementById('emptyState').style.display='none';
      bindQuickAdd();
    } else {
      grid.innerHTML=''; document.getElementById('emptyState').style.display='block';
    }
  }

  document.getElementById('sortSelect').onchange = ()=>{ location.href = buildURL({sort:document.getElementById('sortSelect').value}); };
  render();
})();
