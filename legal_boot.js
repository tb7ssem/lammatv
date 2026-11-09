/* Legal pages boot: only needs live settings + WhatsApp links (no cart drawer on legal pages). */
(async function(){
  window.store = await loadStoreData();
  document.querySelectorAll('[data-wa]').forEach(a=>{ a.href = 'https://wa.me/'+store.settings.whatsapp; });
})();
