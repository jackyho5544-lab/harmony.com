/* ============================================================
   Page logic — dispatched by <body data-page="...">
   ============================================================ */

const fmt = n => "$" + Number(n).toLocaleString();
const pad2 = n => (n<10?"0":"") + n;
const lz = s => s.zh && getLang()==="en" ? s.en : s.zh;           // lang-aware name
const districtName = v => { const d=DISTRICTS.find(x=>x.v===v); return d?(getLang()==="en"?d.en:d.zh):v; };
const ptypeName = v => { const p=PTYPES.find(x=>x.v===v); return p?t(p.k):v; };

/* ============================================================ */
/*  Extra front-end services (favourites / saved search /       */
/*  print / viewing booking / valuation / toast)                */
/* ============================================================ */
function toast(msg){
  let t=document.getElementById("hpToast");
  if(!t){ t=document.createElement("div"); t.id="hpToast"; t.className="hp-toast"; document.body.appendChild(t); }
  t.textContent=msg; t.classList.add("show");
  clearTimeout(window._toastT); window._toastT=setTimeout(()=>t.classList.remove("show"),2200);
}
/* ---- favourites ---- */
function favGet(){ try{return JSON.parse(localStorage.getItem("hp_fav")||"[]");}catch(e){return [];} }
function favHas(ref){ return favGet().indexOf(ref)>=0; }
function favCount(){ return favGet().length; }
function favToggle(ref,ev){ if(ev){ev.stopPropagation();ev.preventDefault();}
  const f=favGet(); const i=f.indexOf(ref); const on=i<0;
  if(on) f.push(ref); else f.splice(i,1);
  localStorage.setItem("hp_fav",JSON.stringify(f));
  document.querySelectorAll('[data-fav="'+ref+'"]').forEach(b=>b.classList.toggle("on",on));
  updateFavCount();
  toast(on?(getLang()==="en"?"Saved to favourites":"已加入收藏"):(getLang()==="en"?"Removed":"已移除收藏"));
  if(document.body.dataset.page==="search" && new URLSearchParams(location.search).get("fav")) runSearch(collectParams());
  return on;
}
function updateFavCount(){ const n=favCount();
  document.querySelectorAll(".fav-count").forEach(e=>{ e.textContent=n; e.classList.toggle("hidden",n===0); });
}
/* ---- saved searches ---- */
function savedGet(){ try{return JSON.parse(localStorage.getItem("hp_saved")||"[]");}catch(e){return [];} }
function searchLabel(p){
  const en=getLang()==="en"; const bits=[];
  bits.push(p.get("deal")==="rent"?t("s.rent"):t("s.buy"));
  if(p.get("district")) bits.push(districtName(p.get("district")));
  if(p.get("type")) bits.push(ptypeName(p.get("type")));
  if(p.get("keyword")) bits.push('"'+p.get("keyword")+'"');
  return bits.join(" · ")||(en?"All listings":"全部樓盤");
}
function countMatches(p){ const before=window._lastResults; runSearchSilent(p); const n=(window._silentCount||0); return n; }
function saveCurrentSearch(){
  const p=collectParams(); const qs=p.toString();
  let s=savedGet();
  if(s.some(x=>x.qs===qs)){ toast(getLang()==="en"?"Already saved":"已儲存過此搜尋"); return; }
  s.unshift({qs,label:searchLabel(p),count:(window._lastResults||[]).length});
  s=s.slice(0,8); localStorage.setItem("hp_saved",JSON.stringify(s));
  renderSaved(); toast(getLang()==="en"?"Search saved":"搜尋已儲存");
}
function removeSaved(qs){ localStorage.setItem("hp_saved",JSON.stringify(savedGet().filter(x=>x.qs!==qs))); renderSaved(); }
function runSaved(qs){ location.href="search.html?"+qs; }
function renderSaved(){
  const box=document.getElementById("savedBox"); if(!box) return;
  const s=savedGet(); const en=getLang()==="en";
  if(!s.length){ box.innerHTML=""; return; }
  box.innerHTML=`<span class="saved-lbl">${en?"Saved searches":"已儲存搜尋"}：</span>`+
    s.map(x=>{ const now=countMatches(new URLSearchParams(x.qs)); const delta=now-(x.count||0);
      const badge=delta>0?`<i class="saved-new">+${delta} ${en?"new":"新"}</i>`:"";
      return `<button class="saved-chip" onclick="runSaved('${x.qs}')">${x.label}${badge}
        <span class="saved-x" onclick="event.stopPropagation();removeSaved('${x.qs}')">✕</span></button>`;
    }).join("");
}
/* ---- print a clean listing sheet ---- */
function printListing(ref){
  const l=LISTINGS.find(x=>x.ref===ref); if(!l) return;
  const D=l.det||{}; const en=getLang()==="en";
  const cover=(l.photos&&l.photos[0])||l.photo||svgThumb(l);
  const row=(a,b)=>b?`<tr><th>${a}</th><td>${b}</td></tr>`:"";
  const w=window.open("","_blank"); if(!w) return;
  w.document.write(`<!doctype html><html lang="${en?'en':'zh-Hant'}"><head><meta charset="utf-8">
    <title>${lz(l)} · ${l.ref}</title><style>
    body{font-family:"Noto Sans TC","Microsoft JhengHei",Arial,sans-serif;color:#14201a;margin:28px;line-height:1.6}
    .h{display:flex;justify-content:space-between;border-bottom:3px solid #0f6b4f;padding-bottom:10px;margin-bottom:16px}
    .h b{color:#08402f;font-size:22px} .h span{color:#5c6a61;font-size:13px}
    img{width:100%;max-height:340px;object-fit:cover;border-radius:8px;margin-bottom:14px}
    h1{color:#08402f;font-size:22px;margin:0 0 4px} .loc{color:#5c6a61;margin:0 0 12px}
    .price{color:#08402f;font-size:26px;font-weight:800}
    table{border-collapse:collapse;width:100%;margin:14px 0;font-size:14px}
    th,td{border:1px solid #e2eae4;padding:8px 12px;text-align:left} th{background:#e8f2ec;width:34%;color:#08402f}
    .rem{white-space:pre-line;background:#f3f6f2;padding:12px;border-radius:8px;font-size:14px}
    .ft{margin-top:16px;font-size:12px;color:#5c6a61;border-top:1px solid #e2eae4;padding-top:10px}
    </style></head><body>
    <div class="h"><b>安樂窩置業 Harmony Property</b><span>2149 1818 · 6028 3039 · info@28harmony.com</span></div>
    <img src="${cover}">
    <h1>${lz(l)}</h1><p class="loc">${districtName(l.district)} · ${ptypeName(l.type)} · ${en?"Ref ":"編號 "}${l.ref}</p>
    <div class="price">${l.deal==="rent"?fmt(l.price)+(en?" /mo":" /月"):fmt(l.price)}</div>
    <table>
      ${row(en?"Gross area":"建築面積",l.area?l.area.toLocaleString()+(en?" ft":" 呎"):"")}
      ${row(en?"Saleable":"實用面積",l.saleable)}
      ${row(en?"Floor":"樓層",l.floor)}
      ${row(en?"Street":"街道",D.street)}
      ${row(en?"Land lease":"地契年期",D.lease)}
      ${row(en?"Built":"入伙年份",D.year)}
      ${row(en?"View":"座向景觀",D.view)}
      ${row(en?"Layout":"間格",D.layout)}
      ${row(en?"Renovation":"裝修",D.deco)}
      ${row(en?"Updated":"更新日期",D.updated)}
    </table>
    ${D.remarks?`<div class="rem">${D.remarks}</div>`:""}
    <div class="ft">${D.agent?(en?"Contact: ":"聯絡人：")+D.agent+"　":""}${D.licence?(en?"EAA Licence: ":"牌照號碼：")+D.licence:""}<br>
    ${en?"Harmony Property Group Limited · G/F, 45 Wo Tai Street, Luen Wo Hui, Fanling":"安樂窩置業 · 粉嶺聯和墟和泰街45號地下"}</div>
    </body></html>`);
  w.document.close(); w.focus(); setTimeout(()=>{try{w.print();}catch(e){}},350);
}
/* ---- valuation estimate from current listing data ---- */
function estimateValue(district,type,area){
  const good=l=>l.deal==="sale"&&l.area>0&&l.price>0;
  let pool=LISTINGS.filter(l=>good(l)&&(!district||l.district===district)&&(!type||l.type===type));
  if(pool.length<3) pool=LISTINGS.filter(l=>good(l)&&(!district||l.district===district));
  if(pool.length<3) pool=LISTINGS.filter(good);
  const avg=pool.reduce((s,l)=>s+l.price/l.area,0)/pool.length;
  const v=avg*area;
  return {avg:Math.round(avg),mid:Math.round(v),low:Math.round(v*0.92),high:Math.round(v*1.08),n:pool.length};
}

/* ---- inline SVG thumbnail so the site is fully self-contained ---- */
function svgThumb(l){
  const palette = {
    res:["#0f6b4f","#2e9c78"], village:["#a97f27","#d4b45f"], ware:["#37516b","#5c7fa3"],
    land:["#6b6136","#a99a56"], ind:["#5b4a6b","#8a72a3"], office:["#2c6b8f","#4f9bc0"],
    shop:["#8f4a2c","#c07a52"], hos:["#0f6b4f","#2e9c78"]
  }[l.type] || ["#0f6b4f","#2e9c78"];
  const icon = {res:"🏢",village:"🏡",ware:"🏭",land:"🗺️",ind:"🏗️",office:"🏙️",shop:"🏬",hos:"🏢"}[l.type]||"🏢";
  const name = lz(l);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${palette[0]}'/><stop offset='1' stop-color='${palette[1]}'/>
    </linearGradient></defs>
    <rect width='400' height='300' fill='url(#g)'/>
    <text x='200' y='150' font-size='84' text-anchor='middle' dominant-baseline='central'>${icon}</text>
    <text x='200' y='245' font-size='22' fill='#ffffff' font-family='sans-serif' font-weight='700' text-anchor='middle' opacity='.92'>${name}</text>
    <text x='200' y='275' font-size='15' fill='#ffffff' font-family='sans-serif' text-anchor='middle' opacity='.7'>${l.ref}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function priceLabel(l){
  if(l.deal==="rent") return `<span class="price rentprice">${fmt(l.price)}<small>/${getLang()==="en"?"mo":"月"}</small></span>`;
  return `<span class="price">${fmt(l.price)}</span>`;
}

function cardHTML(l){
  const en=getLang()==="en";
  const dealBadge = l.deal==="rent"
    ? `<span class="badge rent">${t("s.rent")}</span>`
    : `<span class="badge">${t("s.buy")}</span>`;
  const hot = l.hot ? `<span class="badge hot">${en?"HOT":"筍盤"}</span>` : "";
  const nPhotos = (l.photos&&l.photos.length)||0;
  const photoBadge = nPhotos>1 ? `<span class="ph-count">▤ ${nPhotos}</span>` : "";
  const lease = (l.det&&l.det.lease) ? `<span>${en?"Lease":"地契"} <b>${l.det.lease}</b></span>` : "";
  return `<article class="card" data-ref="${l.ref}" role="button" tabindex="0" aria-label="${lz(l)}">
    <div class="thumb">
      <img src="${l.photo||svgThumb(l)}" alt="${lz(l)}" loading="lazy" onerror="this.onerror=null;this.src='${svgThumb(l)}'">
      <div class="badges">${dealBadge}${hot}</div>
      <button class="fav-btn${favHas(l.ref)?' on':''}" data-fav="${l.ref}" onclick='favToggle("${l.ref}",event)' aria-label="favourite" title="${en?"Save":"收藏"}">♥</button>
      ${photoBadge}
    </div>
    <div class="filing">
      <span class="fref">№ ${l.ref}</span>
      <span class="fmeta">${ptypeName(l.type)} · ${districtName(l.district)}</span>
    </div>
    <div class="body">
      <h3 class="estate">${lz(l)}</h3>
      <div class="specs">
        <span>${en?"Gross":"建築"} <b>${l.area?l.area.toLocaleString():"—"}</b>${en?"ft":"呎"}</span>
        <span>${l.floor}</span>
        ${lease}
      </div>
      <div class="card-foot">
        ${priceLabel(l)}
        <button class="cta-arrow" type="button">${t("search.detail")} →</button>
      </div>
    </div>
  </article>`;
}

/* ---- listing detail modal ---- */
function ensureModal(){
  if(document.getElementById("hpModal")) return;
  const m=document.createElement("div");
  m.id="hpModal";
  m.style.cssText="position:fixed;inset:0;background:rgba(15,30,25,.6);display:none;z-index:200;padding:20px;overflow:auto";
  m.innerHTML=`<div style="max-width:760px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.3)">
    <div id="hpModalBody"></div></div>`;
  m.addEventListener("click",e=>{ if(e.target===m) closeModal(); });
  document.body.appendChild(m);
}
function closeModal(){ const m=document.getElementById("hpModal"); if(m) m.style.display="none"; }
function hpSetPhoto(i){
  const ps=window._hpPhotos||[]; if(!ps.length) return;
  i=(i%ps.length+ps.length)%ps.length; window._hpIdx=i;
  const main=document.getElementById("hpMainImg");
  if(main){ main.src=ps[i]; main.onerror=function(){ this.onerror=null; this.src=window._hpFb; }; }
  const c=document.getElementById("hpCount"); if(c) c.textContent=i+1;
  document.querySelectorAll(".hp-thumb").forEach((t,j)=>t.classList.toggle("on",j===i));
}
function hpStep(d){ hpSetPhoto((window._hpIdx||0)+d); }
/* full-size version lives in the parallel /lg/ folder */
function hpLargeOf(p){ return (p||"").replace(/(\/listings\/[^/]+\/)(\d+\.(?:jpg|jpeg|png))$/i,"$1lg/$2"); }
/* ---- full-screen lightbox (in-page, with prev/next) ---- */
function ensureLightbox(){
  if(document.getElementById("hpLb")) return;
  const lb=document.createElement("div");
  lb.id="hpLb"; lb.className="hp-lb";
  lb.innerHTML=`
    <button class="hp-lb-close" onclick="hpLbClose()" aria-label="close">✕</button>
    <button class="hp-lb-nav prev" onclick="hpLbStep(-1)" aria-label="prev">‹</button>
    <img id="hpLbImg" class="hp-lb-img" alt="">
    <button class="hp-lb-nav next" onclick="hpLbStep(1)" aria-label="next">›</button>
    <div class="hp-lb-count"><span id="hpLbCount">1</span>/<span id="hpLbTotal">1</span></div>`;
  lb.addEventListener("click",e=>{ if(e.target===lb) hpLbClose(); });
  document.body.appendChild(lb);
}
function hpLbShow(){                       // render current shared index at full size
  const ps=window._hpPhotos||[]; const i=window._hpIdx||0; if(!ps.length) return;
  const img=document.getElementById("hpLbImg");
  if(img){ const mid=ps[i]; img.src=hpLargeOf(mid); img.onerror=function(){ this.onerror=null; this.src=mid; }; } // fall back to mid photo if /lg/ missing
  const c=document.getElementById("hpLbCount"); if(c) c.textContent=i+1;
}
function hpLbStep(d){ hpSetPhoto((window._hpIdx||0)+d); hpLbShow(); }   // keeps modal + lightbox in sync
function hpLbClose(){ const lb=document.getElementById("hpLb"); if(lb) lb.classList.remove("open"); }
function hpOpenLarge(){
  const ps=window._hpPhotos||[]; if(!ps.length) return;
  ensureLightbox();
  const total=document.getElementById("hpLbTotal"); if(total) total.textContent=ps.length;
  document.querySelectorAll("#hpLb .hp-lb-nav, #hpLb .hp-lb-count").forEach(el=>el.style.display=ps.length>1?"":"none");
  hpLbShow();
  document.getElementById("hpLb").classList.add("open");
}
/* lightbox keyboard (capture phase so it beats the modal handler when open) */
document.addEventListener("keydown",e=>{
  const lb=document.getElementById("hpLb");
  if(!lb||!lb.classList.contains("open")) return;
  if(e.key==="Escape"){ hpLbClose(); e.stopPropagation(); }
  else if(e.key==="ArrowLeft"){ hpLbStep(-1); e.preventDefault(); e.stopPropagation(); }
  else if(e.key==="ArrowRight"){ hpLbStep(1); e.preventDefault(); e.stopPropagation(); }
},true);
/* whole listing card opens the property detail (mouse + keyboard) */
document.addEventListener("click", e=>{
  if(e.target.closest && e.target.closest(".fav-btn")) return;   // heart is its own action
  const c = e.target.closest && e.target.closest(".card[data-ref]");
  if(c) openListing(c.dataset.ref);
});
/* inspection-log chips open their listing (own handler — chips aren't .card) */
document.addEventListener("click", e=>{
  const chip = e.target.closest && e.target.closest(".rlog-chip[data-ref]");
  if(chip) openListing(chip.dataset.ref);
});
document.addEventListener("keydown", e=>{
  if(e.key!=="Enter" && e.key!==" ") return;
  const a=document.activeElement;
  if(a && a.classList && a.classList.contains("card") && a.dataset.ref){ e.preventDefault(); openListing(a.dataset.ref); }
});
document.addEventListener("keydown",e=>{
  const m=document.getElementById("hpModal");
  if(!m||m.style.display!=="block") return;
  if(e.key==="Escape") closeModal();
  else if(e.key==="ArrowLeft") hpStep(-1);
  else if(e.key==="ArrowRight") hpStep(1);
});
function openListing(ref){
  const l=LISTINGS.find(x=>x.ref===ref); if(!l) return;
  recentPush(ref);
  ensureModal();
  const en=getLang()==="en";
  const desc = en ? l.descEn : l.descZh;
  const fb = svgThumb(l);
  const photos = (l.photos && l.photos.length) ? l.photos : [l.photo||fb];
  window._hpPhotos = photos; window._hpIdx = 0; window._hpFb = fb;
  const nav = photos.length>1 ? `
      <button class="hp-nav prev" onclick="hpStep(-1)" aria-label="prev">‹</button>
      <button class="hp-nav next" onclick="hpStep(1)" aria-label="next">›</button>
      <span class="hp-count"><span id="hpCount">1</span>/${photos.length}</span>` : "";
  const thumbs = photos.length>1 ? `<div class="hp-thumbs">${
      photos.map((p,i)=>`<img src="${p}" alt="" class="hp-thumb${i===0?' on':''}" onclick="hpSetPhoto(${i})" onerror="this.style.display='none'">`).join("")
    }</div>` : "";
  const body=document.getElementById("hpModalBody");
  body.innerHTML=`
    <div class="hp-gallery">
      <img id="hpMainImg" src="${photos[0]}" alt="${lz(l)}" onerror="this.onerror=null;this.src='${fb}'">
      <button onclick="closeModal()" class="hp-close">✕</button>
      <button class="hp-zoom" onclick="hpOpenLarge()" title="${en?'View full-size':'睇原圖'}">⤢ ${en?'Full size':'原圖'}</button>
      ${nav}
    </div>
    ${thumbs}
    <div style="padding:22px 24px 24px">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:flex-start">
        <div><div class="mono" style="color:var(--gold-d);font-size:13px;font-weight:700;margin-bottom:5px;letter-spacing:.02em">№ ${l.ref}</div>
        <h2 style="margin:0 0 4px;color:var(--green-d);letter-spacing:-.02em">${lz(l)}</h2>
        <p class="mono" style="margin:0;color:#657069;font-size:13px">${districtName(l.district)} · ${ptypeName(l.type)}</p></div>
        <div style="text-align:right">${priceLabel(l)}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0;text-align:center">
        <div style="background:#e7f3ee;border-radius:10px;padding:12px"><b style="font-size:18px;color:#0a4d38">${l.area?l.area.toLocaleString():"—"}</b><br><small style="color:#657069">${en?"Gross (ft)":"建築(呎)"}</small></div>
        <div style="background:#e7f3ee;border-radius:10px;padding:12px"><b style="font-size:18px;color:#0a4d38">${l.saleable||"—"}</b><br><small style="color:#657069">${en?"Saleable (ft)":"實用(呎)"}</small></div>
        <div style="background:#e7f3ee;border-radius:10px;padding:12px"><b style="font-size:18px;color:#0a4d38">${l.floor}</b><br><small style="color:#657069">${en?"Floor":"樓層"}</small></div>
      </div>
      ${(()=>{const D=l.det||{};const sr=(lb,v)=>v?`<div class="hp-spec"><span>${lb}</span><b>${v}</b></div>`:"";
        const rows=[sr(en?"Street":"街道",D.street),sr(en?"Land lease":"地契年期",D.lease),
          sr(en?"Built":"入伙年份",D.year),sr(en?"Unit":"單位",D.unit),
          sr(en?"View":"座向景觀",D.view),sr(en?"Layout":"間格",D.layout),
          sr(en?"Renovation":"裝修",D.deco),sr(en?"Updated":"更新日期",D.updated)].join("");
        return rows?`<div class="hp-specs">${rows}</div>`:"";})()}
      ${(l.det&&l.det.remarks)?`<div class="hp-subhead">${en?"AGENT NOTES":"物業備註"}</div><div class="hp-remarks">${l.det.remarks}</div>`:`<p style="color:#3a463f">${desc}</p>`}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">
        <a class="btn btn-primary" href="tel:+85221491818">📞 ${en?"Call":"致電"} 2149 1818</a>
        <a class="btn btn-gold" href="https://wa.me/85260283039?text=${encodeURIComponent((en?'Enquiry ref ':'查詢樓盤編號 ')+l.ref)}" target="_blank" rel="noopener">💬 WhatsApp</a>
        <button class="btn btn-ghost" onclick="toggleBooking()">📅 ${en?"Book viewing":"預約睇樓"}</button>
        <button class="btn btn-ghost" onclick="printListing('${l.ref}')">🖨 ${en?"Print":"列印"}</button>
        <button class="btn btn-ghost fav-btn2${favHas(l.ref)?' on':''}" data-fav="${l.ref}" onclick="favToggle('${l.ref}')">♥ ${en?"Save":"收藏"}</button>
      </div>
      <form id="hpBook" class="hp-book hidden" onsubmit="return submitBooking(event,'${l.ref}')">
        <div class="hp-subhead">${en?"BOOK A VIEWING":"預約睇樓"}（${en?"Ref":"編號"} ${l.ref}）</div>
        <div class="hp-book-grid">
          <input name="name" required placeholder="${en?"Your name":"你的姓名"}">
          <input name="phone" required placeholder="${en?"Phone":"聯絡電話"}">
          <input name="when" placeholder="${en?"Preferred date / time":"期望睇樓日期 / 時間"}">
        </div>
        <button class="btn btn-primary" type="submit" style="margin-top:10px">${en?"Send request":"提交預約"}</button>
        <div class="alert ok hidden" id="hpBookOk" style="margin-top:10px">${en?"Thank you! We'll confirm your viewing shortly.":"多謝預約！我們會盡快與你確認睇樓時間。"}</div>
      </form>
      ${(l.det&&(l.det.agent||l.det.licence))?`<div class="hp-licence">${l.det.agent?`${en?"Contact":"聯絡人"}：${l.det.agent}　`:""}${l.det.licence?`${en?"EAA Licence":"牌照號碼"}：${l.det.licence}`:""}</div>`:""}
    </div>`;
  document.getElementById("hpModal").style.display="block";
}
function toggleBooking(){ const f=document.getElementById("hpBook"); if(f){ f.classList.toggle("hidden"); if(!f.classList.contains("hidden")) f.scrollIntoView&&f.scrollIntoView({behavior:"smooth",block:"nearest"}); } }
function submitBooking(e,ref){ e.preventDefault();
  const ok=document.getElementById("hpBookOk"); if(ok) ok.classList.remove("hidden");
  e.target.querySelectorAll("input").forEach(i=>i.value="");
  return false;
}

/* ============================================================ */
/*  Shared: build district & type <option>s                     */
/* ============================================================ */
function fillDistrictOptions(sel, withAny=true){
  if(!sel) return;
  const prev=sel.value;
  let html = withAny ? `<option value="">${t("s.any")}</option>` : "";
  html += DISTRICTS.map(d=>`<option value="${d.v}">${getLang()==="en"?d.en:d.zh}</option>`).join("");
  sel.innerHTML=html;
  sel.value=prev;                       // keep selection across relabel/rebuild
}
function fillTypeOptions(sel, withAny=true){
  if(!sel) return;
  const prev=sel.value;
  let html = withAny ? `<option value="">${t("s.any")}</option>` : "";
  html += PTYPES.map(p=>`<option value="${p.v}">${t(p.k)}</option>`).join("");
  sel.innerHTML=html;
  sel.value=prev;
}

/* ============================================================ */
/*  SEARCH BOX (home + search page share the same controls)     */
/* ============================================================ */
let searchDeal = "sale";
function initSearchBox(redirect){
  const box=document.getElementById("searchBox");
  if(!box) return;
  const rerender=()=>{
    fillDistrictOptions(box.querySelector("[name=district]"));
    fillTypeOptions(box.querySelector("[name=type]"));
    // price options (preserve current selections across relabel)
    const priceSel=box.querySelector("[name=price]");
    const rentSel =box.querySelector("[name=rent]");
    const areaSel =box.querySelector("[name=area]");
    const pv=priceSel?priceSel.value:"", rv=rentSel?rentSel.value:"", av=areaSel?areaSel.value:"";
    if(priceSel) priceSel.innerHTML =
      `<option value="">${t("s.any")}</option>`+
      [[0,3000000,"< $3M"],[3000000,5000000,"$3M-5M"],[5000000,8000000,"$5M-8M"],[8000000,15000000,"$8M-15M"],[15000000,99999999999,"> $15M"]]
      .map(([a,b,lbl])=>`<option value="${a}-${b}">${lbl}</option>`).join("");
    if(rentSel) rentSel.innerHTML =
      `<option value="">${t("s.any")}</option>`+
      [[0,15000,"< $15K"],[15000,25000,"$15K-25K"],[25000,50000,"$25K-50K"],[50000,99999999,"> $50K"]]
      .map(([a,b,lbl])=>`<option value="${a}-${b}">${lbl}</option>`).join("");
    if(areaSel) areaSel.innerHTML =
      `<option value="">${t("s.any")}</option>`+
      [[0,500,"< 500"],[500,1000,"500-1,000"],[1000,3000,"1,000-3,000"],[3000,99999999,"> 3,000"]]
      .map(([a,b,lbl])=>`<option value="${a}-${b}">${lbl} ${getLang()==="en"?"ft":"呎"}</option>`).join("");
    if(priceSel) priceSel.value=pv; if(rentSel) rentSel.value=rv; if(areaSel) areaSel.value=av;
    // toggle price vs rent field
    box.querySelector(".field-price").classList.toggle("hidden", searchDeal==="rent");
    box.querySelector(".field-rent").classList.toggle("hidden", searchDeal!=="rent");
    box.querySelectorAll(".search-tabs button").forEach(b=>b.classList.toggle("active", b.dataset.deal===searchDeal));
  };
  box.querySelectorAll(".search-tabs button").forEach(b=>b.addEventListener("click",()=>{ searchDeal=b.dataset.deal; rerender(); }));
  rerender();
  document.addEventListener("langchange", rerender);

  box.querySelector("form").addEventListener("submit", e=>{
    e.preventDefault();
    const fd=new FormData(e.target);
    const params=new URLSearchParams();
    params.set("deal", searchDeal);
    ["district","type","keyword"].forEach(k=>{ if(fd.get(k)) params.set(k, fd.get(k)); });
    if(searchDeal==="rent"){ if(fd.get("rent")) params.set("rent", fd.get("rent")); }
    else { if(fd.get("price")) params.set("price", fd.get("price")); }
    if(fd.get("area")) params.set("area", fd.get("area"));
    if(redirect){ location.href = "search.html?"+params.toString(); }
    else { runSearch(params); }
  });
  box.querySelector("form").addEventListener("reset", ()=>{ setTimeout(()=>{ if(!redirect) runSearch(new URLSearchParams({deal:searchDeal})); },0); });
}

/* ============================================================ */
/*  DYNAMIC HOME ELEMENTS (Land Gazette)                         */
/* ============================================================ */
/* ---- A. Gazette tape: scrolling ledger of real transactions ---- */
function tapeItemHTML(tr,dupe){
  const en=getLang()==="en";
  const psf=Math.round(tr.price/tr.area);
  return `<a class="tape-item" href="transactions.html"${dupe?' tabindex="-1"':''}>`+
    `<span class="sep">§</span><span class="d">${tr.date.slice(5)}</span>`+
    `<b>${lz(tr)}</b><span class="a">${tr.area.toLocaleString()}${en?"ft":"呎"}</span>`+
    `<span class="p">${fmt(tr.price)}</span><span class="u">@$${psf.toLocaleString()}</span></a>`;
}
function renderTicker(){
  const rail=document.getElementById("tapeRail"); if(!rail) return;
  const items=TRANSACTIONS.slice(0,10);
  const run=dupe=>`<div class="tape-run"${dupe?' aria-hidden="true"':''}>`+
    items.map(tr=>tapeItemHTML(tr,dupe)).join("")+`</div>`;
  rail.innerHTML=run(false)+run(true);
  const asat=document.getElementById("tapeAsat");
  if(asat && TRANSACTIONS.length) asat.textContent=t("tape.asat")+" "+TRANSACTIONS[0].date;
}
function renderClock(){
  const el=document.getElementById("tapeClock"); if(!el) return;
  const now=new Date();                                   // convert to HKT (UTC+8) regardless of viewer TZ
  const hk=new Date(now.getTime()+(now.getTimezoneOffset()+480)*60000);
  el.textContent="HKT "+pad2(hk.getHours())+":"+pad2(hk.getMinutes());
}
function initTicker(){
  renderTicker(); renderClock();
  if("IntersectionObserver" in window){                   // sole timer — gated so headless (no IO) never hangs
    clearInterval(window._tapeClockT);
    window._tapeClockT=setInterval(renderClock,30000);
  }
  document.addEventListener("langchange", renderTicker);
}

/* ---- C. Stat meter: figures count up when the band scrolls in ---- */
function initStatMeter(){
  const row=document.querySelector(".stat-row"); if(!row) return;
  if(!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let done=false;
  const io=new IntersectionObserver(ents=>ents.forEach(e=>{
    if(e.isIntersecting && !done){ done=true; io.disconnect(); runStatMeter(row); }
  }),{threshold:.35});
  io.observe(row);
}
function runStatMeter(row){
  window._statRAF=window._statRAF||[];
  [...row.querySelectorAll(".stat .n")].forEach((el,i)=>{
    const m=el.textContent.trim().match(/^([^0-9]*)([\d,]+)(.*)$/);
    if(!m) return;                                        // no digits (北區 / North Dist.) — never animates
    const prefix=m[1], target=parseInt(m[2].replace(/,/g,""),10), suffix=m[3];
    const dur=1100, start=performance.now()+i*90;
    const step=now=>{
      let tt=(now-start)/dur;
      if(tt<0){ window._statRAF[i]=requestAnimationFrame(step); return; }
      if(tt>1) tt=1;
      const e=1-Math.pow(1-tt,4);
      el.textContent=prefix+Math.round(target*e).toLocaleString("en-US")+(tt>=1?suffix:"");
      if(tt<1){ window._statRAF[i]=requestAnimationFrame(step); }
      else { const s=el.closest(".stat"); if(s) s.classList.add("done"); }
    };
    window._statRAF[i]=requestAnimationFrame(step);
  });
}
function cancelStatMeter(){
  if(window._statRAF){ window._statRAF.forEach(id=>id&&cancelAnimationFrame(id)); }
  window._statRAF=[];
}

/* ---- D. Inspection log: recently-viewed listings (localStorage) ---- */
function recentGet(){ try{return JSON.parse(localStorage.getItem("hp_recent")||"[]");}catch(e){return [];} }
function recentPush(ref){
  let r=recentGet().filter(x=>x.ref!==ref);
  r.unshift({ref,ts:Date.now()}); r=r.slice(0,6);
  localStorage.setItem("hp_recent",JSON.stringify(r));
  window._recentNew=ref; renderRecent();
}
function recentClear(){ localStorage.removeItem("hp_recent"); renderRecent(); }
function recentTimeLabel(ts){ const d=new Date(ts);
  return pad2(d.getMonth()+1)+"-"+pad2(d.getDate())+" "+pad2(d.getHours())+":"+pad2(d.getMinutes()); }
function renderRecent(){
  const sec=document.getElementById("recentLog"), row=document.getElementById("rlogRow");
  if(!sec||!row) return;
  const en=getLang()==="en";
  const items=recentGet().filter(x=>LISTINGS.some(l=>l.ref===x.ref));  // drop refs no longer in stock
  if(!items.length){ sec.classList.add("hidden"); row.innerHTML=""; return; }
  sec.classList.remove("hidden");
  row.innerHTML=items.map(x=>{
    const l=LISTINGS.find(y=>y.ref===x.ref);
    const isNew=window._recentNew===x.ref;
    const priceTxt=l.deal==="rent"?fmt(l.price)+(en?"/mo":"/月"):fmt(l.price);
    const areaTxt=l.area?l.area.toLocaleString()+(en?"ft":"呎"):"—";
    return `<button type="button" class="rlog-chip${isNew?' new':''}" data-ref="${l.ref}">`+
      `<span class="r">№${l.ref}</span><b>${lz(l)}</b>`+
      `<span class="m">${areaTxt} · ${priceTxt}</span>`+
      `<span class="t">${recentTimeLabel(x.ts)}</span></button>`;
  }).join("");
  window._recentNew=null;
}

/* ---- hero money shot: a real featured photo, drawn in by the gold rule ---- */
function renderHeroCap(){
  const hl=window._heroListing; if(!hl) return;
  const img=document.getElementById("heroImg"); if(img) img.alt=lz(hl);
  const cap=document.getElementById("heroCap");
  if(cap) cap.innerHTML=`<b>№ ${hl.ref}</b> · ${lz(hl)}`;
}
function initHeroPlate(){
  const img=document.getElementById("heroImg"); if(!img) return;
  const hl = LISTINGS.find(l=>l.deal==="sale"&&l.hot&&l.photos&&l.photos.length)   // hot sale w/ photos
          || LISTINGS.find(l=>l.photos&&l.photos.length) || LISTINGS[0];
  if(!hl) return;
  window._heroListing=hl;
  const plate=document.querySelector(".hero-plate");
  const p0=(hl.photos&&hl.photos[0])||hl.photo||svgThumb(hl);
  img.src=hpLargeOf(p0);                                          // 1200px /lg/ variant, crisp
  img.onerror=function(){ this.onerror=function(){ this.onerror=null; this.src=svgThumb(hl); }; this.src=p0; };
  renderHeroCap();
  const pl=document.getElementById("heroPlate");
  if(pl) pl.onclick=e=>{ e.preventDefault(); openListing(hl.ref); };
  const reveal=()=>{ if(plate) plate.classList.add("in"); };     // triggers the clip-wipe + gold rule
  if(img.decode) img.decode().catch(()=>{}).then(reveal); else reveal();
}

/* ============================================================ */
/*  HOME PAGE                                                    */
/* ============================================================ */
function initHome(){
  initSearchBox(true);
  const render=()=>{
    const feat=LISTINGS.filter(l=>l.deal==="sale").slice(0,6);
    document.getElementById("featGrid").innerHTML = feat.map(cardHTML).join("");
    const tb=document.getElementById("tranBody");
    tb.innerHTML = TRANSACTIONS.slice(0,5).map(tr=>`
      <tr><td>${tr.date}</td><td>${lz(tr)}</td><td>${districtName(tr.district)}</td>
      <td class="num">${tr.area.toLocaleString()}</td><td class="num">${fmt(tr.price)}</td>
      <td class="num">$${Math.round(tr.price/tr.area).toLocaleString()}</td></tr>`).join("");
  };
  render();
  initHeroPlate();
  initTicker();
  initStatMeter();
  renderRecent();
  document.getElementById("rlogClear")?.addEventListener("click", recentClear);
  document.addEventListener("langchange", render);
  document.addEventListener("langchange", renderHeroCap);
  document.addEventListener("langchange", renderRecent);
  document.addEventListener("langchange", cancelStatMeter);   // don't let a running count-up fight the reset text
}

/* ============================================================ */
/*  SEARCH RESULTS PAGE                                          */
/* ============================================================ */
function parseRange(s){ if(!s) return null; const [a,b]=s.split("-").map(Number); return [a,b]; }
function filterListings(params){
  const deal = params.get("deal") || "sale";
  const dist = params.get("district") || "";
  const type = params.get("type") || "";
  const kw   = (params.get("keyword")||"").trim().toLowerCase();
  const fav  = params.get("fav");
  const pr   = parseRange(params.get("price"));
  const rt   = parseRange(params.get("rent"));
  const ar   = parseRange(params.get("area"));
  let res = LISTINGS.filter(l=>l.deal===deal);
  if(fav){ const F=favGet(); res=res.filter(l=>F.indexOf(l.ref)>=0); }
  if(dist) res=res.filter(l=>l.district===dist);
  if(type) res=res.filter(l=>l.type===type);
  if(kw)   res=res.filter(l=>(l.zh+l.en+l.ref).toLowerCase().includes(kw));
  if(ar)   res=res.filter(l=>l.area>=ar[0] && l.area<ar[1]);
  if(deal==="sale" && pr) res=res.filter(l=>l.price>=pr[0] && l.price<pr[1]);
  if(deal==="rent" && rt) res=res.filter(l=>l.price>=rt[0] && l.price<rt[1]);
  return res;
}
function runSearchSilent(params){ window._silentCount = filterListings(params).length; }
function runSearch(params){
  let res = filterListings(params);
  const sort=document.getElementById("sortSel")?.value || "new";
  if(sort==="pl") res.sort((a,b)=>a.price-b.price);
  else if(sort==="ph") res.sort((a,b)=>b.price-a.price);
  else if(sort==="al") res.sort((a,b)=>b.area-a.area);

  window._lastResults = res;
  const grid=document.getElementById("resGrid");
  const cnt=document.getElementById("resCount");
  const en=getLang()==="en";
  const favNote = params.get("fav") ? ` · ${en?"Favourites":"收藏"} ♥` : "";
  if(cnt) cnt.innerHTML = `${t("search.count")} <b>${res.length}</b> ${t("search.count2")}${favNote}`;
  grid.innerHTML = res.length ? res.map(cardHTML).join("")
    : `<div class="empty" style="grid-column:1/-1">${params.get("fav")?(en?"No favourites yet — tap ♡ on any listing.":"未有收藏 — 喺任何樓盤撳 ♡ 加入。"):t("search.empty")}</div>`;
  updateFavCount();
}
function initSearchPage(){
  // pre-fill search box from URL
  const params=new URLSearchParams(location.search);
  searchDeal = params.get("deal")||"sale";
  initSearchBox(false);
  const box=document.getElementById("searchBox");
  const setV=(n,v)=>{ const el=box.querySelector(`[name=${n}]`); if(el&&v) el.value=v; };
  setV("district",params.get("district")); setV("type",params.get("type"));
  setV("keyword",params.get("keyword")); setV("area",params.get("area"));
  setV("price",params.get("price")); setV("rent",params.get("rent"));
  document.getElementById("sortSel")?.addEventListener("change",()=>runSearch(collectParams()));
  runSearch(params);
  renderSaved();
  document.addEventListener("langchange", ()=>{ runSearch(collectParams()); renderSaved(); });
}
function collectParams(){
  const box=document.getElementById("searchBox");
  const fd=new FormData(box.querySelector("form"));
  const p=new URLSearchParams(); p.set("deal",searchDeal);
  ["district","type","keyword","area"].forEach(k=>{ if(fd.get(k)) p.set(k,fd.get(k)); });
  if(searchDeal==="rent"){ if(fd.get("rent"))p.set("rent",fd.get("rent")); } else { if(fd.get("price"))p.set("price",fd.get("price")); }
  if(new URLSearchParams(location.search).get("fav")) p.set("fav","1");
  return p;
}

/* ============================================================ */
/*  TRANSACTIONS PAGE                                            */
/* ============================================================ */
function initTransactions(){
  const sel=document.getElementById("tranDistrict");
  fillDistrictOptions(sel);
  const render=()=>{
    fillDistrictOptions(sel); // relabel on lang change (keep value)
    const d=sel.value;
    let rows=TRANSACTIONS.filter(tr=>!d||tr.district===d);
    document.getElementById("tranBody").innerHTML = rows.map(tr=>`
      <tr><td>${tr.date}</td><td>${lz(tr)}</td><td>${districtName(tr.district)}</td>
      <td>${tr.floor}</td><td class="num">${tr.area.toLocaleString()}</td>
      <td class="num">${fmt(tr.price)}</td><td class="num">$${Math.round(tr.price/tr.area).toLocaleString()}</td>
      <td>${ptypeName(tr.type)}</td></tr>`).join("");
  };
  sel.addEventListener("change",render);
  render();
  document.addEventListener("langchange", render);
}

/* ============================================================ */
/*  TRENDS PAGE (canvas line chart)                             */
/* ============================================================ */
function drawChart(canvas, series){
  const ctx=canvas.getContext("2d");
  const W=canvas.width=canvas.clientWidth*2, H=canvas.height=360*2;
  ctx.scale(1,1);
  ctx.clearRect(0,0,W,H);
  const pad={l:120,r:40,t:40,b:70};
  const min=Math.min(...series)*0.98, max=Math.max(...series)*1.02;
  const x=i=>pad.l+(W-pad.l-pad.r)*(i/(series.length-1));
  const y=v=>pad.t+(H-pad.t-pad.b)*(1-(v-min)/(max-min));
  // grid + y labels
  ctx.strokeStyle="#e2e7e4"; ctx.lineWidth=2; ctx.font="24px sans-serif"; ctx.fillStyle="#657069";
  for(let g=0;g<=4;g++){ const val=min+(max-min)*g/4; const yy=y(val);
    ctx.beginPath(); ctx.moveTo(pad.l,yy); ctx.lineTo(W-pad.r,yy); ctx.stroke();
    ctx.textAlign="right"; ctx.fillText("$"+Math.round(val).toLocaleString(), pad.l-14, yy+8); }
  // x labels
  const months=["7","8","9","10","11","12","1","2","3","4","5","6"];
  ctx.textAlign="center";
  months.forEach((m,i)=>{ if(i%1===0) ctx.fillText(m+(getLang()==="en"?"":"月"), x(i), H-30); });
  // area fill
  const grad=ctx.createLinearGradient(0,pad.t,0,H-pad.b);
  grad.addColorStop(0,"rgba(15,107,79,.28)"); grad.addColorStop(1,"rgba(15,107,79,0)");
  ctx.beginPath(); ctx.moveTo(x(0),y(series[0]));
  series.forEach((v,i)=>ctx.lineTo(x(i),y(v)));
  ctx.lineTo(x(series.length-1),H-pad.b); ctx.lineTo(x(0),H-pad.b); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
  // line
  ctx.beginPath(); ctx.moveTo(x(0),y(series[0]));
  series.forEach((v,i)=>ctx.lineTo(x(i),y(v)));
  ctx.strokeStyle="#0f6b4f"; ctx.lineWidth=6; ctx.lineJoin="round"; ctx.stroke();
  // points
  series.forEach((v,i)=>{ ctx.beginPath(); ctx.arc(x(i),y(v),8,0,7); ctx.fillStyle="#c79a3b"; ctx.fill();
    ctx.strokeStyle="#fff"; ctx.lineWidth=4; ctx.stroke(); });
}
function initTrends(){
  const sel=document.getElementById("estateSel");
  const render=()=>{
    sel.innerHTML = ESTATES.map((e,i)=>`<option value="${i}">${getLang()==="en"?e.en:e.zh}</option>`).join("");
  };
  const show=()=>{
    const e=ESTATES[sel.value||0];
    const s=e.series, latest=s[s.length-1], first=s[0];
    const chg=((latest-first)/first*100);
    drawChart(document.getElementById("trendChart"), s);
    document.getElementById("mAvg").textContent="$"+latest.toLocaleString();
    const chgEl=document.getElementById("mChg");
    chgEl.textContent=(chg>=0?"+":"")+chg.toFixed(1)+"%";
    chgEl.className = chg>=0?"n up":"n down";
    document.getElementById("mTxn").textContent = [8,12,6,9,7][sel.value%5];
  };
  render(); const keep=sel.value; sel.value=keep||0; show();
  sel.addEventListener("change",show);
  document.addEventListener("langchange", ()=>{ const v=sel.value; render(); sel.value=v; show(); });
  window.addEventListener("resize", show);
}

/* ============================================================ */
/*  MORTGAGE CALCULATOR                                          */
/* ============================================================ */
function initMortgage(){
  const f=document.getElementById("mortForm");
  const val=n=>+f.querySelector('[name="'+n+'"]').value;
  const calc=()=>{
    const price=val("price")||0, ratio=val("ratio")/100, rate=val("rate")/100, years=val("years")||1;
    const loan=price*ratio, down=price-loan, n=years*12, i=rate/12;
    const m = i>0 ? loan*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1) : loan/n;
    const total=m*n, interest=total-loan;
    const i2=(rate+0.02)/12; const m2=i2>0?loan*i2*Math.pow(1+i2,n)/(Math.pow(1+i2,n)-1):loan/n;
    const set=(id,v)=>document.getElementById(id).textContent=v;
    set("rMonthly","$"+Math.round(m).toLocaleString());
    set("rLoan","$"+Math.round(loan).toLocaleString());
    set("rDown","$"+Math.round(down).toLocaleString());
    set("rInterest","$"+Math.round(interest).toLocaleString());
    set("rTotal","$"+Math.round(total).toLocaleString());
    set("rStress","$"+Math.round(m2).toLocaleString());
  };
  f.addEventListener("submit",e=>{e.preventDefault();calc();});
  f.addEventListener("input",calc);
  calc();
}

/* ============================================================ */
/*  VALUATION (estimate from listing data)                      */
/* ============================================================ */
function initValuation(){
  const f=document.getElementById("valForm");
  const dSel=f.querySelector('[name="district"]'), tSel=f.querySelector('[name="type"]');
  const relabel=()=>{ fillDistrictOptions(dSel,false); fillTypeOptions(tSel,false); };
  relabel();
  const calc=()=>{
    const area=+f.querySelector('[name="area"]').value||0;
    if(area<=0) return;
    const r=estimateValue(dSel.value,tSel.value,area);
    const set=(id,v)=>document.getElementById(id).textContent=v;
    set("vMid","$"+r.mid.toLocaleString());
    set("vLow","$"+r.low.toLocaleString());
    set("vHigh","$"+r.high.toLocaleString());
    set("vAvg","$"+r.avg.toLocaleString());
    set("vN",r.n);
  };
  f.addEventListener("submit",e=>{e.preventDefault();calc();});
  f.addEventListener("input",calc);
  document.addEventListener("langchange",()=>{ const dv=dSel.value,tv=tSel.value; relabel(); dSel.value=dv; tSel.value=tv; });
  calc();
}

/* ============================================================ */
/*  LIST PROPERTY + CONTACT + ADMIN forms                       */
/* ============================================================ */
function initListProperty(){
  fillDistrictOptions(document.querySelector("#listForm [name=district]"), false);
  fillTypeOptions(document.querySelector("#listForm [name=ptype]"), false);
  document.addEventListener("langchange",()=>{
    const d=document.querySelector("#listForm [name=district]"), p=document.querySelector("#listForm [name=ptype]");
    const dv=d.value,pv=p.value;
    fillDistrictOptions(d,false); fillTypeOptions(p,false); d.value=dv; p.value=pv;
  });
  document.getElementById("listForm").addEventListener("submit",e=>{
    e.preventDefault();
    const f=e.target, en=getLang()==="en";
    const val=n=>{const el=f.querySelector("[name="+n+"]");return el?el.value.trim():"";};
    const dv=val("district"), pv=val("ptype");
    const dz=(DISTRICTS.find(x=>x.v===dv)||{}).zh||dv||"—";
    const pk=(PTYPES.find(x=>x.v===pv)||{}).k;
    const pz=(typeof I18N!=="undefined"&&pk&&I18N.zh[pk])||ptypeName(pv)||"—";
    const dealZh=val("intent")==="lease"?"出租":"出售";
    // 固定中文標籤 = 前台表單與 CRM「貼上放盤」之間的解析合約，勿改標籤
    const msg=[
      "【安樂窩‧網上放盤】",
      "放盤類別: "+dealZh,
      "物業類型: "+pz,
      "地區: "+dz,
      "屋苑: "+(val("estate")||"—"),
      "面積: "+(val("area")||"—"),
      "期望價: "+(val("expect")||"—"),
      "業主: "+val("name"),
      "電話: "+val("phone"),
      "電郵: "+(val("email")||"—"),
      "備註: "+(val("remark")||"—"),
      "（來自 28harmony.com 放盤表單）"
    ].join("\n");
    const enc=encodeURIComponent(msg);
    const wa="https://wa.me/85260283039?text="+enc;
    const email=(typeof COMPANY!=="undefined"&&COMPANY.email)||"info@28harmony.com";
    const mail="mailto:"+email+"?subject="+encodeURIComponent((en?"Property listing - ":"網上放盤 - ")+(val("estate")||dz))+"&body="+enc;
    const acts=document.getElementById("listOkActions");
    if(acts) acts.innerHTML=
      '<a class="btn btn-primary" href="'+wa+'" target="_blank" rel="noopener">💬 '+(en?"Send via WhatsApp":"用 WhatsApp 傳出")+'</a>'+
      '<a class="btn btn-ghost" href="'+mail+'">✉ '+(en?"Send via Email":"用電郵傳出")+'</a>';
    const ok=document.getElementById("listOk");
    ok.classList.remove("hidden");
    if(ok.scrollIntoView) ok.scrollIntoView({behavior:"smooth",block:"center"});
    toast(en?"Listing ready — choose a channel to send":"放盤已準備好，請揀方式傳出");
  });
}
function initContact(){
  document.getElementById("contactForm").addEventListener("submit",e=>{
    e.preventDefault();
    document.getElementById("contactOk").classList.remove("hidden");
    e.target.reset();
  });
}
function initAdmin(){
  document.getElementById("adminForm").addEventListener("submit",e=>{
    e.preventDefault();
    document.getElementById("adminFail").classList.remove("hidden");
  });
}

/* ============================================================ */
/*  NEWS PAGE                                                    */
/* ============================================================ */
function initNews(){
  const render=()=>{
    const en=getLang()==="en";
    document.getElementById("newsList").innerHTML = NEWS.map((n,i)=>{
      const d=new Date(n.date); const mm=(en?["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"])[d.getMonth()];
      return `<article class="news-item" onclick="openNews(${i})" style="cursor:pointer">
        <div class="date"><div class="d">${d.getDate()}</div><div class="m">${mm}</div></div>
        <div><span class="tag">${en?n.tagEn:n.tag}</span>
        <h3>${en?n.en:n.zh}</h3>
        <p>${(en?n.bodyEn:n.bodyZh).slice(0,60)}…</p></div></article>`;
    }).join("");
  };
  render();
  document.addEventListener("langchange", render);
}
function openNews(i){
  const n=NEWS[i]; const en=getLang()==="en"; ensureModal();
  document.getElementById("hpModalBody").innerHTML=`
    <div style="padding:30px">
      <button onclick="closeModal()" style="float:right;width:38px;height:38px;border-radius:50%;border:0;background:#e7f3ee;color:#0a4d38;font-size:18px">✕</button>
      <span class="tag" style="background:#c79a3b;color:#2a1e04;padding:3px 10px;border-radius:14px;font-size:12px;font-weight:800">${en?n.tagEn:n.tag}</span>
      <p style="color:#657069;font-size:13px;margin:10px 0 4px">${n.date}</p>
      <h2 style="color:#0a4d38">${en?n.en:n.zh}</h2>
      <p style="color:#3a463f;line-height:1.9">${en?n.bodyEn:n.bodyZh}</p>
    </div>`;
  document.getElementById("hpModal").style.display="block";
}

/* ============================================================ */
/*  RESOURCES — stamp duty quick calc                           */
/* ============================================================ */
function stampDuty(p){
  // Ad valorem Scale 2 (simplified brackets)
  if(p<=3000000) return Math.max(100, p*0.01<=100?100: (p<=3000000?100:0)) ;
  if(p<=3528240) return 100 + (p-3000000)*0.10;
  if(p<=4500000) return p*0.015;
  if(p<=4935480) return 67500 + (p-4500000)*0.10;
  if(p<=6000000) return p*0.0225;
  if(p<=6642860) return 135000 + (p-6000000)*0.10;
  if(p<=9000000) return p*0.03;
  if(p<=10080000) return 270000 + (p-9000000)*0.10;
  if(p<=20000000) return p*0.0375;
  if(p<=21739130) return 750000 + (p-20000000)*0.10;
  return p*0.0425;
}
function initResources(){
  document.getElementById("dutyForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const p=+e.target.querySelector('[name="price"]').value||0;
    const d=stampDuty(p);
    document.getElementById("dutyResult").innerHTML =
      `${getLang()==="en"?"Estimated stamp duty":"估算印花稅"}：<b style="color:#0a4d38;font-size:22px">$${Math.round(d).toLocaleString()}</b>`;
    document.getElementById("dutyResult").classList.remove("hidden");
  });
}

/* ============================================================ */
/*  DISPATCH                                                     */
/* ============================================================ */
document.addEventListener("DOMContentLoaded", ()=>{
  const page=document.body.dataset.page;
  ({
    home:initHome, search:initSearchPage, transactions:initTransactions, trends:initTrends,
    mortgage:initMortgage, valuation:initValuation, list:initListProperty, contact:initContact, admin:initAdmin,
    news:initNews, resources:initResources
  }[page]||function(){})();
});
