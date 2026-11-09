/* ============ SHARED SVG SPRITE (product art) ============ */
/* Injected into #sprite on every page that needs product visuals. */
document.getElementById('sprite').innerHTML = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="art-tv" viewBox="0 0 240 180">
    <rect x="22" y="34" width="196" height="110" rx="6" fill="var(--p-body)"/>
    <rect x="28" y="40" width="184" height="94" rx="3" fill="var(--p-accent)" opacity=".8"/>
    <rect x="32" y="44" width="176" height="86" rx="2" fill="var(--p-body)" opacity=".95"/>
    <rect x="64" y="86" width="28" height="22" rx="4" fill="var(--p-accent)"/>
    <rect x="100" y="70" width="40" height="38" rx="4" fill="var(--p-accent)" opacity=".7"/>
    <rect x="148" y="94" width="24" height="14" rx="4" fill="var(--p-accent)" opacity=".5"/>
    <rect x="88" y="152" width="18" height="10" fill="var(--p-body)"/>
    <rect x="134" y="152" width="18" height="10" fill="var(--p-body)"/>
  </symbol>
  <symbol id="art-box" viewBox="0 0 240 180">
    <rect x="36" y="96" width="168" height="46" rx="12" fill="var(--p-body)"/>
    <circle cx="178" cy="119" r="6" fill="var(--p-accent)"/>
    <rect x="150" y="115" width="4" height="8" rx="2" fill="var(--p-accent)" opacity=".8"/>
    <rect x="158" y="115" width="4" height="8" rx="2" fill="var(--p-accent)" opacity=".5"/>
    <rect x="166" y="115" width="4" height="8" rx="2" fill="var(--p-accent)" opacity=".3"/>
    <rect x="52" y="112" width="60" height="4" rx="2" fill="var(--p-accent)" opacity=".6"/>
    <rect x="52" y="120" width="44" height="4" rx="2" fill="var(--p-accent)" opacity=".4"/>
    <rect x="96" y="30" width="64" height="60" rx="8" fill="var(--p-body)"/>
    <rect x="104" y="38" width="48" height="44" rx="4" fill="var(--p-accent)" opacity=".85"/>
    <rect x="108" y="42" width="40" height="36" rx="3" fill="var(--p-body)" opacity=".9"/>
    <line x1="128" y1="142" x2="128" y2="152" stroke="var(--p-body)" stroke-width="6"/>
    <line x1="96" y1="150" x2="160" y2="150" stroke="var(--p-body)" stroke-width="6" stroke-linecap="round"/>
  </symbol>
  <symbol id="art-headphones" viewBox="0 0 240 180">
    <path d="M44 96 A76 76 0 0 1 196 96" fill="none" stroke="var(--p-body)" stroke-width="14" stroke-linecap="round"/>
    <rect x="28" y="90" width="40" height="62" rx="16" fill="var(--p-body)"/>
    <rect x="172" y="90" width="40" height="62" rx="16" fill="var(--p-body)"/>
    <rect x="38" y="100" width="20" height="42" rx="8" fill="var(--p-accent)"/>
    <rect x="182" y="100" width="20" height="42" rx="8" fill="var(--p-accent)"/>
  </symbol>
  <symbol id="art-earbuds" viewBox="0 0 240 180">
    <circle cx="92" cy="70" r="24" fill="var(--p-body)"/>
    <circle cx="148" cy="70" r="24" fill="var(--p-body)"/>
    <path d="M84 90 q-8 34 6 44 q14 6 20-36" fill="var(--p-body)"/>
    <path d="M156 90 q8 34 -6 44 q-14 6 -20-36" fill="var(--p-body)"/>
    <circle cx="92" cy="70" r="9" fill="var(--p-accent)"/>
    <circle cx="148" cy="70" r="9" fill="var(--p-accent)"/>
    <rect x="70" y="120" width="100" height="36" rx="18" fill="var(--p-accent)" opacity=".92"/>
    <line x1="96" y1="138" x2="144" y2="138" stroke="var(--p-body)" stroke-width="4" stroke-linecap="round"/>
  </symbol>
  <symbol id="art-speaker" viewBox="0 0 240 180">
    <rect x="66" y="26" width="108" height="128" rx="24" fill="var(--p-body)"/>
    <circle cx="120" cy="70" r="22" fill="var(--p-accent)"/>
    <circle cx="120" cy="70" r="9" fill="var(--p-body)"/>
    <g fill="var(--p-accent)" opacity=".9">
      <circle cx="120" cy="118" r="6"/><circle cx="104" cy="130" r="6"/><circle cx="136" cy="130" r="6"/>
      <circle cx="120" cy="142" r="6"/><circle cx="92" cy="118" r="6"/><circle cx="148" cy="118" r="6"/>
    </g>
  </symbol>
  <symbol id="art-laptop" viewBox="0 0 240 180">
    <rect x="52" y="28" width="136" height="92" rx="8" fill="var(--p-body)"/>
    <rect x="62" y="38" width="116" height="72" rx="4" fill="var(--p-accent)" opacity=".85"/>
    <rect x="66" y="42" width="108" height="64" rx="3" fill="var(--p-body)" opacity=".94"/>
    <path d="M34 124 L206 124 L216 142 Q218 148 210 148 L30 148 Q22 148 24 142 Z" fill="var(--p-body)"/>
    <rect x="104" y="128" width="32" height="8" rx="4" fill="var(--p-accent)"/>
  </symbol>
  <symbol id="art-desktop" viewBox="0 0 240 180">
    <rect x="92" y="18" width="56" height="144" rx="10" fill="var(--p-body)"/>
    <circle cx="120" cy="42" r="10" fill="var(--p-accent)"/>
    <rect x="104" y="66" width="32" height="5" rx="2.5" fill="var(--p-accent)" opacity=".8"/>
    <rect x="104" y="78" width="32" height="5" rx="2.5" fill="var(--p-accent)" opacity=".8"/>
    <rect x="112" y="104" width="16" height="44" rx="4" fill="var(--p-accent)" opacity=".35"/>
  </symbol>
  <symbol id="art-phone" viewBox="0 0 240 180">
    <rect x="94" y="18" width="52" height="144" rx="14" fill="var(--p-body)"/>
    <rect x="101" y="26" width="38" height="128" rx="9" fill="var(--p-accent)" opacity=".22"/>
    <circle cx="120" cy="34" r="4" fill="var(--p-accent)"/>
    <rect x="108" y="52" width="24" height="24" rx="7" fill="var(--p-accent)"/>
    <rect x="108" y="82" width="24" height="24" rx="7" fill="var(--p-accent)" opacity=".6"/>
  </symbol>
  <symbol id="art-camera" viewBox="0 0 240 180">
    <rect x="44" y="58" width="152" height="86" rx="12" fill="var(--p-body)"/>
    <rect x="88" y="44" width="48" height="18" rx="8" fill="var(--p-body)"/>
    <circle cx="120" cy="101" r="30" fill="#f0f0f0"/>
    <circle cx="120" cy="101" r="22" fill="var(--p-accent)"/>
    <circle cx="120" cy="101" r="10" fill="var(--p-body)"/>
    <circle cx="170" cy="74" r="5" fill="var(--p-accent)"/>
    <rect x="56" y="70" width="18" height="8" rx="4" fill="var(--p-accent)"/>
  </symbol>
  <symbol id="art-watch" viewBox="0 0 240 180">
    <rect x="108" y="18" width="24" height="42" rx="8" fill="var(--p-body)"/>
    <rect x="108" y="120" width="24" height="42" rx="8" fill="var(--p-body)"/>
    <rect x="86" y="52" width="68" height="76" rx="20" fill="var(--p-body)"/>
    <rect x="96" y="62" width="48" height="56" rx="14" fill="var(--p-accent)" opacity=".9"/>
    <circle cx="120" cy="90" r="14" fill="var(--p-body)"/>
    <rect x="154" y="76" width="8" height="18" rx="4" fill="var(--p-accent)"/>
    <line x1="108" y1="70" x2="108" y2="110" stroke="var(--p-body)" stroke-width="4" stroke-linecap="round"/>
    <line x1="100" y1="90" x2="140" y2="90" stroke="var(--p-body)" stroke-width="4" stroke-linecap="round"/>
  </symbol>
  <symbol id="art-monitor" viewBox="0 0 240 180">
    <rect x="36" y="26" width="168" height="104" rx="10" fill="var(--p-body)"/>
    <rect x="46" y="36" width="148" height="84" rx="5" fill="var(--p-accent)" opacity=".85"/>
    <rect x="50" y="40" width="140" height="76" rx="4" fill="var(--p-body)" opacity=".94"/>
    <rect x="110" y="130" width="20" height="18" fill="var(--p-body)"/>
    <rect x="84" y="148" width="72" height="8" rx="4" fill="var(--p-body)"/>
  </symbol>
  <symbol id="art-keyboard" viewBox="0 0 240 180">
    <rect x="26" y="62" width="188" height="62" rx="12" fill="var(--p-body)"/>
    <g fill="var(--p-accent)" opacity=".9">
      <rect x="36" y="70" width="26" height="14" rx="4"/><rect x="68" y="70" width="26" height="14" rx="4"/><rect x="100" y="70" width="26" height="14" rx="4"/><rect x="132" y="70" width="26" height="14" rx="4"/><rect x="164" y="70" width="26" height="14" rx="4"/><rect x="196" y="70" width="8" height="14" rx="4"/>
      <rect x="36" y="90" width="26" height="14" rx="4"/><rect x="68" y="90" width="26" height="14" rx="4"/><rect x="100" y="90" width="26" height="14" rx="4"/><rect x="132" y="90" width="26" height="14" rx="4"/><rect x="164" y="90" width="26" height="14" rx="4"/><rect x="196" y="90" width="8" height="14" rx="4"/>
    </g>
    <rect x="84" y="110" width="72" height="12" rx="6" fill="var(--p-accent)"/>
    <rect x="60" y="110" width="20" height="12" rx="6" fill="var(--p-accent)" opacity=".7"/>
    <rect x="160" y="110" width="20" height="12" rx="6" fill="var(--p-accent)" opacity=".7"/>
  </symbol>
  <symbol id="art-mouse" viewBox="0 0 240 180">
    <path d="M120 22 C160 22 178 54 178 92 C178 128 156 152 120 152 C84 152 62 128 62 92 C62 54 80 22 120 22 Z" fill="var(--p-body)"/>
    <line x1="120" y1="26" x2="120" y2="152" stroke="var(--p-body)" stroke-width="4"/>
    <rect x="100" y="22" width="20" height="16" rx="3" fill="var(--p-accent)" opacity=".9"/>
    <rect x="130" y="118" width="30" height="10" rx="5" fill="var(--p-accent)"/>
    <circle cx="98" cy="132" r="4" fill="var(--p-accent)"/>
  </symbol>
  <symbol id="art-drone" viewBox="0 0 240 180">
    <ellipse cx="60" cy="52" rx="30" ry="7" fill="var(--p-accent)" opacity=".9"/>
    <ellipse cx="180" cy="52" rx="30" ry="7" fill="var(--p-accent)" opacity=".9"/>
    <ellipse cx="60" cy="130" rx="30" ry="7" fill="var(--p-accent)" opacity=".9"/>
    <ellipse cx="180" cy="130" rx="30" ry="7" fill="var(--p-accent)" opacity=".9"/>
    <line x1="72" y1="62" x2="102" y2="82" stroke="var(--p-body)" stroke-width="8" stroke-linecap="round"/>
    <line x1="168" y1="62" x2="138" y2="82" stroke="var(--p-body)" stroke-width="8" stroke-linecap="round"/>
    <line x1="72" y1="120" x2="102" y2="100" stroke="var(--p-body)" stroke-width="8" stroke-linecap="round"/>
    <line x1="168" y1="120" x2="138" y2="100" stroke="var(--p-body)" stroke-width="8" stroke-linecap="round"/>
    <rect x="98" y="76" width="44" height="30" rx="10" fill="var(--p-body)"/>
    <circle cx="120" cy="91" r="7" fill="var(--p-accent)"/>
  </symbol>
</svg>`;
