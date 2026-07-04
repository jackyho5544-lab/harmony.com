/* ============================================================
   i18n — Traditional Chinese (zh) / English (en)
   Usage: add data-i18n="key" to any element.
   Toggle stored in localStorage("hp_lang").
   ============================================================ */
const I18N = {
  zh:{
    // ---- global / nav ----
    "brand.name":"安樂窩置業","brand.en":"Harmony Property",
    "nav.home":"首頁","nav.profile":"公司簡介","nav.search":"樓盤搜尋","nav.tran":"成交記錄",
    "nav.trends":"屋苑走勢","nav.mortgage":"按揭計算","nav.valuation":"免費估價","nav.list":"網上放盤","nav.news":"地產新聞",
    "nav.useful":"參考資料","nav.contact":"聯絡我們","nav.admin":"管理員登入","nav.fav":"收藏",
    "search.save":"儲存搜尋",
    "val.h1":"免費物業估價","val.sub":"輸入地區、類型同面積，即時參考市場估值（根據本行盤源數據）。",
    "val.district":"地區","val.type":"物業類型","val.area":"建築面積 (呎)","val.calc":"估算市值",
    "val.est":"估算市值","val.low":"估值下限","val.high":"估值上限","val.psf":"參考呎價","val.based":"參考盤源數",
    "val.disclaim":"* 估值只根據本行同區盤源平均呎價計算，僅供參考；準確估價歡迎聯絡我們安排實地睇樓。",
    "val.cta":"免費專業估價 / 放盤","home.rev.kicker":"客戶好評","home.rev.title":"街坊點評",
    "home.rev1.t":"陳先生 · 粉嶺村屋業主","home.rev1.r":"「賣咗間村屋，張小姐好熟區內行情，開價準，兩個星期就成交，過程好安心。」",
    "home.rev2.t":"李小姐 · 上水租客","home.rev2.r":"「第一次租樓，職員好有耐性，幫我搵到啱價又近港鐵嘅單位，仲跟埋租約手續。」",
    "home.rev3.t":"黃生 · 古洞倉地投資者","home.rev3.r":"「做開倉地買賣，佢哋盤源多又識行情，幾單交易都好順利，值得信賴。」",
    "tb.hotline":"查詢熱線","tb.follow":"關注我們",
    // ---- search box ----
    "s.buy":"買樓","s.rent":"租樓","s.district":"地區","s.type":"樓盤類型","s.area":"建築面積",
    "s.price":"售價","s.rentprice":"租金","s.period":"放盤時間","s.keyword":"屋苑 / 編號",
    "s.search":"搜尋樓盤","s.reset":"重設","s.any":"不限","s.kwph":"輸入屋苑名稱或樓盤編號",
    // ---- home ----
    "home.badge":"北區地政 · 粉嶺 上水 古洞 · EST.",
    "home.meta":"村屋 / 住宅 / 倉地 / 貨倉 / 工貿 / 寫字樓 — 買賣 · 租賃",
    "home.h1":"安居樂業　由安樂窩開始","home.sub":"專營粉嶺、上水、古洞區村屋、住宅、物流倉、貨倉、倉地、工貿及寫字樓買賣租賃。扎根北區，服務街坊。",
    "home.t1":"粉嶺村屋","home.t2":"上水住宅","home.t3":"物流貨倉","home.t4":"倉地工貿","home.t5":"寫字樓",
    "home.feat.kicker":"精選樓盤","home.feat.title":"至新推介","home.feat.sub":"每日更新，靚盤即睇","home.feat.all":"查看全部樓盤 →",
    "home.tran.kicker":"市場動態","home.tran.title":"最新成交記錄","home.tran.sub":"北區屋苑真實成交","home.tran.all":"更多成交 →",
    "home.why.kicker":"點解揀我哋","home.why.title":"安樂窩置業的承諾",
    "home.why.lede":"由搵盤、議價，到按揭、律師及過戶，全程有專人跟進。我哋只做熟悉的北區，所以睇得深、做得細，令你安心置業。",
    "home.why1.t":"扎根北區","home.why1.p":"深耕粉嶺、上水、古洞多年，熟悉每一條村、每一個屋苑，為你搵到最合適的物業。",
    "home.why2.t":"盤源充足","home.why2.p":"住宅、村屋、貨倉、倉地、工貿、寫字樓一應俱全，買賣租賃盤源持續更新。",
    "home.why3.t":"誠信專業","home.why3.p":"持牌地產代理，交易透明，全程跟進按揭、律師及過戶手續，令你安心置業。",
    "home.cta.t":"想放盤或搵盤？","home.cta.p":"歡迎致電、WhatsApp 或親臨我們粉嶺聯和墟門市，專人為你服務。","home.cta.b":"立即聯絡我們",
    "stat.years":"服務年資","stat.years.n":"20+","stat.deals":"成功成交","stat.deals.n":"3,800+","stat.listings":"現有盤源","stat.listings.n":"600+","stat.area":"專營地區","stat.area.n":"北區",
    "tape.label":"成交紙帶","tape.asat":"截至","rlog.title":"查閱紀錄","rlog.clear":"清除紀錄",
    // ---- profile ----
    "profile.h1":"公司簡介","profile.crumb":"首頁 / 公司簡介",
    "profile.lead":"安樂窩置業（Harmony Property Group Limited）為香港持牌地產代理，總行位於粉嶺聯和墟，專營新界北區物業。",
    "profile.p1":"我們扎根粉嶺、上水及古洞多年，專注村屋、住宅、物流倉、貨倉、倉地、工貿大廈及寫字樓的買賣與租賃。憑藉對北區地理環境及市場的深入了解，我們為業主及買家、租客提供貼心而專業的物業配對服務。",
    "profile.p2":"隨着北部都會區發展，古洞北、粉嶺北新發展區前景亮麗。安樂窩置業緊貼區內規劃及市場走勢，協助客戶把握投資及自住機遇。",
    "profile.v.title":"我們的服務範疇",
    "profile.mission":"我們的宗旨","profile.mission.p":"以誠信為本，用心聆聽客戶需要，讓每位客戶都能在北區找到屬於自己的安樂窩。",
    // ---- search page ----
    "search.h1":"樓盤搜尋","search.crumb":"首頁 / 樓盤搜尋",
    "search.count":"共找到","search.count2":"個樓盤","search.sort":"排序","search.sort.new":"最新放盤","search.sort.pl":"售價 (低至高)","search.sort.ph":"售價 (高至低)","search.sort.al":"面積 (大至細)",
    "search.detail":"睇詳情","search.empty":"未找到符合條件的樓盤，請放寬搜尋條件。",
    // ---- transactions ----
    "tran.h1":"成交記錄","tran.crumb":"首頁 / 成交記錄","tran.sub":"以下為北區各屋苑之市場成交參考，資料僅供參考。",
    "tran.date":"成交日期","tran.estate":"屋苑 / 物業","tran.district":"地區","tran.floor":"座 / 樓層 / 室","tran.area":"實用面積","tran.price":"成交價","tran.unit":"呎價","tran.type":"類別",
    // ---- trends ----
    "trends.h1":"屋苑走勢","trends.crumb":"首頁 / 屋苑走勢","trends.sub":"選擇屋苑查看近一年平均實用呎價走勢（示範數據）。","trends.select":"選擇屋苑","trends.avg":"最新平均呎價","trends.chg":"按年變幅","trends.txn":"近月成交宗數",
    // ---- mortgage ----
    "mort.h1":"按揭計算","mort.crumb":"首頁 / 按揭計算","mort.sub":"輸入樓價、成數、利率及年期，即時計算每月供款。",
    "mort.price":"物業樓價 (HK$)","mort.ratio":"按揭成數","mort.rate":"年利率 (%)","mort.years":"還款年期 (年)","mort.calc":"計算供款","mort.monthly":"每月供款","mort.loan":"貸款金額","mort.down":"首期","mort.interest":"總利息支出","mort.total":"還款總額","mort.stress":"壓力測試 (+2%) 每月供款","mort.disclaim":"* 以上計算僅供參考，實際批核金額及利率以銀行為準。",
    // ---- list property ----
    "list.h1":"網上放盤","list.crumb":"首頁 / 網上放盤","list.sub":"填妥以下表格，我們的專業團隊會盡快與你聯絡，免費為你物業估價及配對買家/租客。",
    "list.owner":"業主資料","list.propinfo":"物業資料","list.name":"聯絡人姓名","list.phone":"聯絡電話","list.email":"電郵","list.intent":"放盤類別","list.sell":"出售","list.lease":"出租","list.ptype":"物業類型","list.district2":"地區","list.estate2":"屋苑 / 大廈 / 地段","list.areaf":"建築面積 (呎)","list.expect":"期望售價 / 租金 (HK$)","list.remark":"備註 / 物業描述","list.agree":"本人同意安樂窩置業就此放盤與本人聯絡。","list.submit":"提交放盤","list.ok":"多謝你的放盤！我們已收到你的資料，職員會盡快與你聯絡。",
    // ---- news ----
    "news.h1":"地產新聞","news.crumb":"首頁 / 地產新聞","news.sub":"精選北區及全港地產市場資訊（示範內容）。","news.more":"閱讀更多",
    // ---- useful ----
    "useful.h1":"參考資料","useful.crumb":"首頁 / 參考資料","useful.sub":"置業、按揭及物業相關的常用連結與資訊。",
    "useful.gov":"政府 / 法定機構","useful.bank":"銀行按揭","useful.tool":"實用工具","useful.calc.t":"印花稅速算","useful.calc.p":"輸入樓價，估算從價印花稅（第2標準稅率）。","useful.calc.b":"計算",
    // ---- contact ----
    "contact.h1":"聯絡我們","contact.crumb":"首頁 / 聯絡我們","contact.sub":"歡迎親臨、致電或 WhatsApp 查詢，我們樂意為你服務。",
    "contact.addr":"門市地址","contact.tel":"電話","contact.mobile":"WhatsApp / 手機","contact.email":"電郵","contact.hours":"營業時間","contact.hours.v":"星期一至日 10:00 - 19:30",
    "contact.formt":"發送訊息","contact.name":"你的姓名","contact.subject":"主題","contact.msg":"訊息內容","contact.send":"發送","contact.ok":"多謝你的查詢！我們會盡快回覆你。",
    // ---- admin ----
    "admin.h1":"管理員登入","admin.crumb":"首頁 / 管理員登入","admin.user":"帳戶名稱","admin.pass":"密碼","admin.login":"登入","admin.note":"此為管理後台入口，只限授權職員使用。","admin.fail":"帳戶或密碼不正確（示範版本）。",
    // ---- footer ----
    "foot.about":"安樂窩置業有限公司，持牌地產代理，專營新界北區村屋、住宅、貨倉、倉地、工貿及寫字樓買賣租賃。",
    "foot.quick":"快速連結","foot.services":"服務","foot.contact":"聯絡資料","foot.rights":"版權所有　不得轉載","foot.visitors":"進入人數","foot.views":"瀏覽頁數","foot.powered":"網站平台",
    // ---- property type options ----
    "opt.res":"住宅","opt.village":"村屋","opt.ware":"物流倉 / 貨倉","opt.land":"倉地","opt.ind":"工貿大廈","opt.office":"寫字樓","opt.shop":"舖位","opt.hos":"居屋 / 公屋"
  },
  en:{
    "brand.name":"Harmony Property","brand.en":"Harmony Property",
    "nav.home":"Home","nav.profile":"About Us","nav.search":"Search","nav.tran":"Transactions",
    "nav.trends":"Estate Trends","nav.mortgage":"Mortgage","nav.valuation":"Valuation","nav.list":"List Property","nav.news":"News",
    "nav.useful":"Resources","nav.contact":"Contact","nav.admin":"Admin","nav.fav":"Saved",
    "search.save":"Save search",
    "val.h1":"Free Property Valuation","val.sub":"Enter district, type and area for an instant market estimate (based on our own listing data).",
    "val.district":"District","val.type":"Property Type","val.area":"Gross Area (ft)","val.calc":"Estimate value",
    "val.est":"Estimated value","val.low":"Low","val.high":"High","val.psf":"Ref. $/ft","val.based":"Listings used",
    "val.disclaim":"* Estimate is based on the average $/ft of our own listings in the same district — for reference only. For an accurate valuation, contact us for a site visit.",
    "val.cta":"Free valuation / List with us","home.rev.kicker":"Reviews","home.rev.title":"What Neighbours Say",
    "home.rev1.t":"Mr. Chan · Fanling village-house seller","home.rev1.r":"“Sold my village house — Ms. Cheung knew the local market, priced it right, and closed in two weeks. Very reassuring.”",
    "home.rev2.t":"Ms. Lee · Sheung Shui tenant","home.rev2.r":"“First time renting — the team was patient, found me a well-priced flat near the MTR, and handled the tenancy paperwork.”",
    "home.rev3.t":"Mr. Wong · Kwu Tung storage-land investor","home.rev3.r":"“I trade storage land often — they have the listings and know the market. Several smooth deals. Trustworthy.”",
    "tb.hotline":"Hotline","tb.follow":"Follow us",
    "s.buy":"Buy","s.rent":"Rent","s.district":"District","s.type":"Property Type","s.area":"Saleable Area",
    "s.price":"Price","s.rentprice":"Rent","s.period":"Listed within","s.keyword":"Estate / Ref",
    "s.search":"Search","s.reset":"Reset","s.any":"Any","s.kwph":"Estate name or listing ref.",
    "home.badge":"N.T. NORTH LAND · FANLING SHEUNG SHUI KWU TUNG · EST.",
    "home.meta":"Village houses / Residential / Storage land / Warehouses / Industrial / Offices — Sale · Lease",
    "home.h1":"Find Your Harmony Home","home.sub":"Specialists in village houses, residential, logistics warehouses, storage land, industrial and office properties across Fanling, Sheung Shui & Kwu Tung.",
    "home.t1":"Village Houses","home.t2":"Residential","home.t3":"Warehouses","home.t4":"Storage Land","home.t5":"Offices",
    "home.feat.kicker":"Featured","home.feat.title":"Latest Listings","home.feat.sub":"Updated daily","home.feat.all":"View all listings →",
    "home.tran.kicker":"Market","home.tran.title":"Recent Transactions","home.tran.sub":"Real deals in North District","home.tran.all":"More transactions →",
    "home.why.kicker":"Why us","home.why.title":"Our Promise",
    "home.why.lede":"From finding the right property and negotiating, to mortgage, legal and completion — we guide you the whole way. We only work the North District we know inside out.",
    "home.why1.t":"Rooted in North District","home.why1.p":"Years of experience across Fanling, Sheung Shui and Kwu Tung — we know every village and every estate.",
    "home.why2.t":"Rich Listings","home.why2.p":"Residential, village houses, warehouses, storage land, industrial and offices — for sale and lease, updated constantly.",
    "home.why3.t":"Trusted & Professional","home.why3.p":"Licensed estate agency with transparent dealing and full support on mortgage, legal and conveyancing.",
    "home.cta.t":"Buying or selling?","home.cta.p":"Call, WhatsApp or visit our shop in Luen Wo Hui, Fanling — our team is ready to help.","home.cta.b":"Contact us now",
    "stat.years":"Years of Service","stat.years.n":"20+","stat.deals":"Completed Deals","stat.deals.n":"3,800+","stat.listings":"Active Listings","stat.listings.n":"600+","stat.area":"Focus Area","stat.area.n":"North Dist.",
    "tape.label":"GAZETTE TAPE","tape.asat":"AS AT","rlog.title":"INSPECTION LOG","rlog.clear":"CLEAR",
    "profile.h1":"About Us","profile.crumb":"Home / About Us",
    "profile.lead":"Harmony Property Group Limited is a licensed Hong Kong estate agency headquartered in Luen Wo Hui, Fanling, specialising in New Territories North properties.",
    "profile.p1":"Rooted in Fanling, Sheung Shui and Kwu Tung for years, we focus on village houses, residential units, logistics warehouses, storage land, industrial buildings and offices — both sales and leasing. Our deep local knowledge lets us match owners, buyers and tenants with care and professionalism.",
    "profile.p2":"With the Northern Metropolis development, the Kwu Tung North and Fanling North new towns hold great promise. Harmony Property keeps close to the planning and market trends to help clients seize investment and end-user opportunities.",
    "profile.v.title":"Our Services",
    "profile.mission":"Our Mission","profile.mission.p":"Built on integrity — we listen, so every client can find their own harmony home in the North District.",
    "search.h1":"Property Search","search.crumb":"Home / Search",
    "search.count":"Found","search.count2":"listings","search.sort":"Sort","search.sort.new":"Newest","search.sort.pl":"Price (low→high)","search.sort.ph":"Price (high→low)","search.sort.al":"Area (large→small)",
    "search.detail":"Details","search.empty":"No listings match your criteria. Please broaden your search.",
    "tran.h1":"Transaction Records","tran.crumb":"Home / Transactions","tran.sub":"Market transaction references for North District estates. For reference only.",
    "tran.date":"Date","tran.estate":"Estate / Property","tran.district":"District","tran.floor":"Blk / Floor / Flat","tran.area":"Saleable","tran.price":"Price","tran.unit":"$/ft","tran.type":"Type",
    "trends.h1":"Estate Trends","trends.crumb":"Home / Estate Trends","trends.sub":"Select an estate to view the past-year average saleable $/ft trend (demo data).","trends.select":"Select estate","trends.avg":"Latest avg $/ft","trends.chg":"YoY change","trends.txn":"Recent deals",
    "mort.h1":"Mortgage Calculator","mort.crumb":"Home / Mortgage","mort.sub":"Enter price, ratio, rate and term to instantly get the monthly payment.",
    "mort.price":"Property Price (HK$)","mort.ratio":"Loan-to-value","mort.rate":"Annual Rate (%)","mort.years":"Term (years)","mort.calc":"Calculate","mort.monthly":"Monthly Payment","mort.loan":"Loan Amount","mort.down":"Down Payment","mort.interest":"Total Interest","mort.total":"Total Repayment","mort.stress":"Stress Test (+2%) monthly","mort.disclaim":"* For reference only. Actual approval and rate are subject to the bank.",
    "list.h1":"List Your Property","list.crumb":"Home / List Property","list.sub":"Fill in the form and our team will contact you shortly for a free valuation and buyer/tenant matching.",
    "list.owner":"Owner Details","list.propinfo":"Property Details","list.name":"Contact Name","list.phone":"Phone","list.email":"Email","list.intent":"Listing Type","list.sell":"For Sale","list.lease":"For Lease","list.ptype":"Property Type","list.district2":"District","list.estate2":"Estate / Building / Lot","list.areaf":"Gross Area (ft)","list.expect":"Expected Price / Rent (HK$)","list.remark":"Remarks / Description","list.agree":"I agree Harmony Property may contact me about this listing.","list.submit":"Submit","list.ok":"Thank you! We have received your listing and will contact you soon.",
    "news.h1":"Property News","news.crumb":"Home / News","news.sub":"Selected North District and Hong Kong market news (demo content).","news.more":"Read more",
    "useful.h1":"Resources","useful.crumb":"Home / Resources","useful.sub":"Handy links and info on buying, mortgage and property matters.",
    "useful.gov":"Government / Statutory","useful.bank":"Bank Mortgages","useful.tool":"Handy Tools","useful.calc.t":"Quick Stamp Duty","useful.calc.p":"Enter a price to estimate ad valorem stamp duty (Scale 2).","useful.calc.b":"Calculate",
    "contact.h1":"Contact Us","contact.crumb":"Home / Contact","contact.sub":"Visit, call or WhatsApp us — we are happy to help.",
    "contact.addr":"Shop Address","contact.tel":"Phone","contact.mobile":"WhatsApp / Mobile","contact.email":"Email","contact.hours":"Opening Hours","contact.hours.v":"Mon-Sun 10:00 - 19:30",
    "contact.formt":"Send a Message","contact.name":"Your Name","contact.subject":"Subject","contact.msg":"Message","contact.send":"Send","contact.ok":"Thank you for your enquiry! We will get back to you soon.",
    "admin.h1":"Admin Login","admin.crumb":"Home / Admin","admin.user":"Username","admin.pass":"Password","admin.login":"Login","admin.note":"Back-office entrance for authorised staff only.","admin.fail":"Incorrect username or password (demo).",
    "foot.about":"Harmony Property Group Limited — licensed estate agency specialising in North District village houses, residential, warehouses, storage land, industrial and office properties.",
    "foot.quick":"Quick Links","foot.services":"Services","foot.contact":"Contact","foot.rights":"All Rights Reserved","foot.visitors":"Visitors","foot.views":"Page Views","foot.powered":"Platform",
    "opt.res":"Residential","opt.village":"Village House","opt.ware":"Warehouse","opt.land":"Storage Land","opt.ind":"Industrial","opt.office":"Office","opt.shop":"Shop","opt.hos":"HOS / Public"
  }
};

function getLang(){ return localStorage.getItem("hp_lang") || "zh"; }
function setLang(l){ localStorage.setItem("hp_lang", l); applyI18n(); }
function t(key){ const l=getLang(); return (I18N[l] && I18N[l][key]) || (I18N.zh[key]) || key; }

function applyI18n(){
  const l=getLang();
  document.documentElement.lang = (l==="zh") ? "zh-Hant" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k=el.getAttribute("data-i18n");
    const v=t(k);
    if(el.hasAttribute("data-i18n-attr")){ el.setAttribute(el.getAttribute("data-i18n-attr"), v); }
    else{ el.textContent = v; }
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  document.querySelectorAll(".lang-toggle button").forEach(b=>{
    b.classList.toggle("active", b.dataset.lang===l);
  });
  // let pages re-render dynamic content
  document.dispatchEvent(new CustomEvent("langchange",{detail:{lang:l}}));
}
