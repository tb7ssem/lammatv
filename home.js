/* ============ HOME PAGE ============ */
(async function(){
  // need cart bindings only; boot(fn) does it
  await boot(()=>{});

  const catIcons = {IPTV:'tv',Audio:'headphones',Computers:'laptop',Phones:'phone',Cameras:'camera',Wearables:'watch',Displays:'monitor',Drones:'drone'};
  const catClasses = ['cat-1','cat-2','cat-3','cat-4','cat-1','cat-2','cat-3','cat-4'];
  const catAccents = ['#7ec9ff','#ffb0dd','#d8c48a','#c3f0ff','#beaffd','#d8c48a','#7ec9ff','#ffb0dd'];

  // IPTV plans row
  document.getElementById('plansGrid').innerHTML =
    store.products.filter(p=>p.category==='IPTV').slice(0,6).map(cardHTML).join('');

  // category strip (real links)
  document.getElementById('catStrip').innerHTML = CATEGORIES.map((c,i)=>`
    <a class="category-tile ${catClasses[i]}" href="shop.html?cat=${c.toLowerCase()}">
      <svg viewBox="0 0 240 180" style="--p-body:#f5f5f5;--p-accent:${catAccents[i]}"><use href="#art-${catIcons[c]}"/></svg>
      <button class="btn-outline-on-image">${c}</button>
    </a>`).join('');

  // hot row
  const hot = store.products.filter(p=>p.badge==='just-in' || p.badge==='sale').slice(0,6);
  document.getElementById('hotGrid').innerHTML = hot.map(cardHTML).join('');

  bindQuickAdd();

  // FAQ accordions
  document.querySelectorAll('.disclosure').forEach(d=>{
    d.querySelector('.disclosure-head').onclick = ()=>d.classList.toggle('open');
  });
})();
