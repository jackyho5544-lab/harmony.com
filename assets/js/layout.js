/* ============================================================
   Shared header + footer, language toggle, mobile menu,
   visitor counter, floating call/WhatsApp buttons.
   Works from file:// (no fetch needed).
   ============================================================ */

const NAV_ITEMS = [
  ["index.html",       "nav.home"],
  ["profile.html",     "nav.profile"],
  ["search.html",      "nav.search"],
  ["transactions.html","nav.tran"],
  ["trends.html",      "nav.trends"],
  ["mortgage.html",    "nav.mortgage"],
  ["valuation.html",   "nav.valuation"],
  ["list-property.html","nav.list"],
  ["news.html",        "nav.news"],
  ["resources.html",   "nav.useful"],
  ["contact.html",     "nav.contact"]
];

// Clean vector rebuild of the real 安樂窩 logo (house silhouette with an "H")
const LOGO_SVG = `<svg viewBox="0 0 48 48" width="30" height="30" fill="none" aria-hidden="true">
  <path d="M24 6 L42 20 V41 H6 V20 Z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M18 24 V35 M30 24 V35 M18 29.5 H30" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// Signature: a roofline that echoes village-house rooftops (their specialty)
const ROOF_SVG = `<svg viewBox="0 0 1200 15" preserveAspectRatio="none" aria-hidden="true"><path fill="currentColor" d="M0 15 L0 9 L60 1 L120 9 L180 1 L240 9 L300 1 L360 9 L420 1 L480 9 L540 1 L600 9 L660 1 L720 9 L780 1 L840 9 L900 1 L960 9 L1020 1 L1080 9 L1140 1 L1200 9 L1200 15 Z"/></svg>`;

function currentPage(){
  const p = location.pathname.split("/").pop();
  return p && p.length ? p : "index.html";
}

function buildHeader(){
  const cur = currentPage();
  const links = NAV_ITEMS.map(([href,key])=>{
    const active = (href===cur) ? " active" : "";
    return `<a href="${href}" class="${active.trim()}" data-i18n="${key}"></a>`;
  }).join("");
  return `
  <div class="topbar">
    <div class="wrap">
      <div class="tb-contact">
        <span data-i18n="tb.hotline"></span>：
        <a href="tel:+85221491818">2149 1818</a>
        <a href="https://wa.me/85260283039" target="_blank" rel="noopener">WhatsApp 6028 3039</a>
      </div>
      <div class="tb-right">
        <a href="search.html?fav=1" class="tb-fav">♥ <span data-i18n="nav.fav"></span> <span class="fav-count hidden">0</span></a>
        <a href="${COMPANY.fb}" target="_blank" rel="noopener" data-i18n="tb.follow"></a>
        <div class="lang-toggle">
          <button data-lang="zh" onclick="setLang('zh')">中</button>
          <button data-lang="en" onclick="setLang('en')">EN</button>
        </div>
      </div>
    </div>
  </div>
  <div class="wrap header-main">
    <a class="brand" href="index.html" aria-label="Home">
      <span class="logo">${LOGO_SVG}</span>
      <span class="bt"><b data-i18n="brand.name"></b><span>Harmony Property</span></span>
    </a>
    <nav class="nav" id="mainNav">
      ${links}
      <a href="admin-login.html" class="admin${cur==='admin-login.html'?' active':''}" data-i18n="nav.admin"></a>
    </nav>
    <button class="burger" aria-label="Menu" onclick="document.getElementById('mainNav').classList.toggle('open')">&#9776;</button>
  </div>`;
}

function buildFooter(){
  const quick = NAV_ITEMS.slice(0,5).map(([h,k])=>`<a href="${h}" data-i18n="${k}"></a>`).join("");
  const serv  = NAV_ITEMS.slice(5).map(([h,k])=>`<a href="${h}" data-i18n="${k}"></a>`).join("");
  return `
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <div class="logo">${LOGO_SVG}</div>
        <b style="color:#fff;font-size:18px" data-i18n="brand.name"></b>
        <p data-i18n="foot.about"></p>
        <div class="social">
          <a href="${COMPANY.fb}" target="_blank" rel="noopener" aria-label="Facebook">f</a>
          <a href="https://wa.me/85260283039" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
          <a href="mailto:${COMPANY.email}" aria-label="Email">✉</a>
        </div>
      </div>
      <div>
        <h4 data-i18n="foot.quick"></h4>
        ${quick}
      </div>
      <div>
        <h4 data-i18n="foot.services"></h4>
        ${serv}
      </div>
      <div>
        <h4 data-i18n="foot.contact"></h4>
        <ul class="foot-contact">
          <li>📍 <span data-i18n="COMPANY.addr"></span></li>
          <li>📞 <a href="tel:+85221491818">2149 1818</a></li>
          <li>💬 <a href="https://wa.me/85260283039">6028 3039</a></li>
          <li>✉ <a href="mailto:${COMPANY.email}">${COMPANY.email}</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <div>© <span id="year"></span> Harmony Property Group Limited. <span data-i18n="foot.rights"></span>.</div>
      <div class="counter">
        <span><span data-i18n="foot.visitors"></span>：<b id="cVisitors">0</b></span>
        <span><span data-i18n="foot.views"></span>：<b id="cViews">0</b></span>
        <span><span data-i18n="foot.powered"></span>：Harmony Web</span>
      </div>
    </div>
  </div>`;
}

function buildFab(){
  return `
  <div class="fab">
    <a class="wa" href="https://wa.me/85260283039" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
    <a class="call" href="tel:+85221491818" aria-label="Call">📞</a>
  </div>`;
}

/* visitor counter — seeded with original site figures, persisted locally */
function runCounter(){
  const BASE_V = 346585, BASE_P = 656618;
  let v = parseInt(localStorage.getItem("hp_visitors")||"0",10);
  let p = parseInt(localStorage.getItem("hp_views")||"0",10);
  if(!v){ v = BASE_V; }
  if(!p){ p = BASE_P; }
  // count a visit once per browser session
  if(!sessionStorage.getItem("hp_visited")){ v += 1; sessionStorage.setItem("hp_visited","1"); }
  p += 1;
  localStorage.setItem("hp_visitors", v);
  localStorage.setItem("hp_views", p);
  const ev=document.getElementById("cVisitors"), ep=document.getElementById("cViews");
  if(ev) ev.textContent = v.toLocaleString();
  if(ep) ep.textContent = p.toLocaleString();
}

/* address needs lang-aware fill (not a plain data-i18n key) */
function fillCompany(){
  document.querySelectorAll('[data-i18n="COMPANY.addr"]').forEach(el=>{
    el.textContent = (getLang()==="zh") ? COMPANY.addrZh : COMPANY.addrEn;
  });
}

/* scroll-reveal (MOTION dial 4) — degrades to fully visible without IO */
function initReveal(){
  const els=document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window)){ els.forEach(e=>e.classList.add("in")); return; }
  const io=new IntersectionObserver((ents)=>{
    ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{threshold:.12, rootMargin:"0px 0px -8% 0px"});
  els.forEach(e=>io.observe(e));
}

document.addEventListener("DOMContentLoaded", ()=>{
  const h=document.getElementById("site-header");
  const f=document.getElementById("site-footer");
  if(h) h.innerHTML = buildHeader();
  if(f){ f.innerHTML = buildFooter(); f.insertAdjacentHTML("beforebegin", `<div class="roofline">${ROOF_SVG}</div>`); }
  document.querySelectorAll(".roofline:empty").forEach(r=>r.innerHTML=ROOF_SVG);
  document.body.insertAdjacentHTML("beforeend", buildFab());
  const y=document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();
  applyI18n();
  fillCompany();
  runCounter();
  initReveal();
  if(typeof updateFavCount==="function") updateFavCount();
  // close mobile menu on link click
  document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{
    document.getElementById("mainNav").classList.remove("open");
  }));
});
document.addEventListener("langchange", fillCompany);
