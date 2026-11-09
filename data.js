/* ============ LAMMA TV — DATA LAYER ============ */
/* Master data lives in store.json (published to the site). The admin panel
   edits a working copy and publishes it back via the GitHub API or a manual
   file replace. Orders are collected through WhatsApp, not this site. */

const DATA_KEY = 'lammatv_data';
const ORDERS_LOG_KEY = 'lammatv_orderlog';

const SETTINGS_DEFAULTS = {
  storeName: 'LAMMA TV',
  whatsapp: '21658877141',          // digits only, no '+'
  currency: 'DT',
  updated: 0
};

function defaultStore(){
  return {
    settings: { ...SETTINGS_DEFAULTS },
    products: [
      /* ---------- IPTV PLANS ---------- */
      {id:1,  name:'Free Trial — 24 Hours',       sub:'Test LAMMA TV before you buy',    category:'IPTV',        icon:'tv',          price:0,   pricePrev:null, stock:999, badge:'none',      digital:true,  color:'#2b4a63', accent:'#7ec9ff', desc:'Full access to the complete channel lineup, VOD and EPG for 24 hours. One device. Activation right after you message us on WhatsApp.'},
      {id:2,  name:'IPTV — 1 Month · 1 Device',   sub:'All channels + VOD',              category:'IPTV',        icon:'tv',          price:10,  pricePrev:null, stock:999, badge:'none',      digital:true,  color:'#171717', accent:'#f5f5f5', desc:'Full channel lineup (sports, movies, kids, international), VOD library and catch-up. Instant activation on WhatsApp, M3U / Xtream codes.'},
      {id:3,  name:'IPTV — 1 Month · 2 Devices',  sub:'Share the sub, full lineup',      category:'IPTV',        icon:'tv',          price:15,  pricePrev:null, stock:999, badge:'none',      digital:true,  color:'#171717', accent:'#beaffd', desc:'Two concurrent streams. Perfect for the living room + a phone or tablet.'},
      {id:4,  name:'IPTV — 3 Months · 1 Device',  sub:'Save vs monthly',                 category:'IPTV',        icon:'tv',          price:25,  pricePrev:30,   stock:999, badge:'sale',      digital:true,  color:'#171717', accent:'#c3f0ff', desc:'Quarter plan with the full lineup, stable during big match nights.'},
      {id:5,  name:'IPTV — 6 Months · 1 Device',  sub:'Half-year, zero hassle',          category:'IPTV',        icon:'tv',          price:45,  pricePrev:55,   stock:999, badge:'none',      digital:true,  color:'#171717', accent:'#ffb0dd', desc:'Six full months. Includes VOD, catch-up and all future channel updates.'},
      {id:6,  name:'IPTV — 12 Months · 1 Device', sub:'Best value — full year',          category:'IPTV',        icon:'tv',          price:80,  pricePrev:100,  stock:999, badge:'member',    digital:true,  color:'#d30005', accent:'#ffffff', desc:'The plan most customers pick. A full year of every channel, all VOD, priority support and free extensions on outages.'},
      {id:7,  name:'IPTV — 12 Months · 2 Devices · 4K', sub:'4K streams, two screens',    category:'IPTV',        icon:'tv',          price:140, pricePrev:160,  stock:999, badge:'none',      digital:true,  color:'#2b4a63', accent:'#f5f5f5', desc:'Premium tier: 4K where available, FHD everywhere else, two simultaneous streams for the whole year.'},
      {id:8,  name:'Lamma Box Bundle — IPTV 12 Months + Android Box',  sub:'Plug-and-play kit, ready in 10 min', category:'IPTV', icon:'box',   price:250, pricePrev:280,  stock:12,  badge:'none',      digital:false, color:'#171717', accent:'#d30005', desc:'Android TV box (4K, Wi-Fi + Ethernet) shipped configured with the LAMMA TV app and a 12-month subscription. Zero setup — plug in and watch.'},

      /* ---------- ELECTRONICS ---------- */
      {id:9,  name:'EchoWave Studio Headphones',  sub:'Over-ear, Active Noise Cancelling', category:'Audio',      icon:'headphones', price:299,  pricePrev:null, stock:32, badge:'just-in', digital:false, color:'#171717', accent:'#3f6a8a', desc:'40mm graphene drivers, 38h battery, hybrid ANC and multipoint pairing for two devices.'},
      {id:10, name:'EchoWave Buds Pro',           sub:'True wireless earbuds, ANC',        category:'Audio',      icon:'earbuds',    price:149,  pricePrev:189,  stock:64, badge:'sale',    digital:false, color:'#d30005', accent:'#111111', desc:'9h per charge (36h with case), transparency mode, IPX5 sweat resistance.'},
      {id:11, name:'PulseBoom Mini Speaker',      sub:'Portable, waterproof',              category:'Audio',      icon:'speaker',    price:79,   pricePrev:null, stock:12, badge:'none',    digital:false, color:'#0a7281', accent:'#c3f0ff', desc:'IP67 waterproof, 20h battery, stereo pairing with a second PulseBoom.'},
      {id:12, name:'Vertex 14 Ultrabook',         sub:'14" OLED, Core Ultra 7, 32GB/1TB',  category:'Computers',  icon:'laptop',     price:1199, pricePrev:null, stock:18, badge:'member',  digital:false, color:'#2b4a63', accent:'#7ec9ff', desc:'3K 120Hz OLED, 18h battery, 1.2kg magnesium chassis cooled by a vapor chamber.'},
      {id:13, name:'Nex ONE 5G',                  sub:'6.7" AMOLED, 256GB',                category:'Phones',     icon:'phone',      price:899,  pricePrev:null, stock:41, badge:'just-in', digital:false, color:'#171717', accent:'#d30005', desc:'120Hz LTPO display, 5x periscope lens, 90W wired + 30W wireless charging.'},
      {id:14, name:'Lumen Pocket Cam II',         sub:'Vlogging, 1" sensor',               category:'Cameras',    icon:'camera',     price:399,  pricePrev:null, stock:15, badge:'none',    digital:false, color:'#39393b', accent:'#ffb0dd', desc:'1-inch stacked sensor, flip-out screen, three-capsule mic, 20fps burst.'},
      {id:15, name:'Chronos Watch 5',             sub:'GPS smartwatch, 14-day battery',    category:'Wearables',  icon:'watch',      price:259,  pricePrev:null, stock:53, badge:'none',    digital:false, color:'#171717', accent:'#0a7281', desc:'Dual-band GPS, ECG blood oxygen, 100m water resistance, always-on AMOLED.'},
      {id:16, name:'Vista 34" Curved Monitor',    sub:'WQHD 165Hz curved',                 category:'Displays',   icon:'monitor',    price:549,  pricePrev:649,  stock:11, badge:'sale',    digital:false, color:'#2b2b2b', accent:'#d30005', desc:'34" 1440p 165Hz curved panel, 1ms, HDR400, USB-C 90W single-cable dock.'},
      {id:17, name:'UltraView 55" Smart TV',      sub:'Mini-LED 4K 120Hz',                 category:'Displays',   icon:'tv',         price:799,  pricePrev:null, stock:6,  badge:'member',  digital:false, color:'#2b4a63', accent:'#7ec9ff', desc:'Mini-LED 4K 120Hz 512-zone panel, dual HDMI 2.1, all-in-one smart hub.'},
      {id:18, name:'Phantom Drone Mini',          sub:'249g fly-more combo, 4K/60',        category:'Drones',     icon:'drone',      price:599,  pricePrev:699,  stock:14, badge:'sale',    digital:false, color:'#2b4a63', accent:'#e5e5e5', desc:'249g takeoff weight, 34min flight time, 3-axis gimbal, obstacle sensing.'},
    ],
    orders: []
  };
}

/* ---------- LOAD: published store.json vs this browser's working copy ---------- */
async function loadStoreData(){
  let remote = null;
  try{
    const res = await fetch('store.json', {cache:'no-store'});
    if(res.ok) remote = await res.json();
  }catch(e){ /* offline / file:// — fall through */ }
  let local = null;
  try{ local = JSON.parse(localStorage.getItem(DATA_KEY) || 'null'); }catch(e){}

  const remoteUpdated = (remote && remote.settings && remote.settings.updated) || 0;
  const localUpdated  = (local  && local.settings && local.settings.updated)  || 0;

  let base;
  if(localUpdated > remoteUpdated) base = local; else base = remote;

  // Merge missing defaults so older store.json files keep working
  base = base || defaultStore();
  base.settings = { ...SETTINGS_DEFAULTS, ...(base.settings||{}) };
  if(!base.products || !base.products.length) base.products = defaultStore().products;

  try{ localStorage.setItem(DATA_KEY, JSON.stringify(base)); }catch(e){}
  return base;
}

function saveStore(s){
  s.settings.updated = Date.now();
  try{ localStorage.setItem(DATA_KEY, JSON.stringify(s)); }catch(e){}
  window.store = s;
}

/* Orders: local log only (real purchase record = WhatsApp). */
function loadOrdersLog(){
  try{ return JSON.parse(localStorage.getItem(ORDERS_LOG_KEY) || '[]'); }catch(e){ return []; }
}
function saveOrdersLog(log){ try{ localStorage.setItem(ORDERS_LOG_KEY, JSON.stringify(log)); }catch(e){} }

/* ---------- HELPERS ---------- */
function money(n){
  if(n === 0) return 'Free';
  const s = window.store?.settings?.currency || 'DT';
  return n.toLocaleString('en-US',{minimumFractionDigits:0, maximumFractionDigits:2}) + ' ' + s;
}
const BADGE_LABEL = { 'just-in':'Just In', 'sale':'Sale', 'member':'Most Popular', 'none':null };

/* Build the WhatsApp order message and return a wa.me link. */
function whatsappOrderUrl(order, settings){
  const lines = [
    `🛒 New order — *${settings.storeName}*`,
    `Ref: ${order.id}`,
    ``,
    ...order.items.map(it=>`• ${it.qty}× ${it.name}${it.qty>1?` — ${it.qty}× ${moneyIn(settings,it.price)}`:''} — ${moneyIn(settings, it.price*it.qty)}`),
    ``,
    `*Total: ${moneyIn(settings, order.total)}*`,
    ``,
    `Name: ${order.customer.first} ${order.customer.last}`,
    `Phone: ${order.customer.phone}`
  ];
  if(order.customer.email) lines.push(`Email: ${order.customer.email}`);
  if(order.customer.address) lines.push(`Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.country}`);
  if(order.customer.note) lines.push(`Note: ${order.customer.note}`);
  lines.push('', `Confirmed on ${new Date(order.date).toLocaleString('en-GB')}`);
  return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}
function moneyIn(settings, n){
  if(n === 0) return 'Free';
  return n.toLocaleString('en-US',{maximumFractionDigits:2}) + ' ' + settings.currency;
}
const CATEGORIES = ['IPTV','Audio','Computers','Phones','Cameras','Wearables','Displays','Drones'];
const ORDER_STATUSES = ['New','Processing','Shipped','Delivered','Cancelled'];
