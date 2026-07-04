# 安樂窩置業 Harmony Property — 網站重製版

重做 [28harmony.com](https://www.28harmony.com/) 的網站，複製原站（property.hk 平台）全部功能，改為一套**獨立、免後台即可運行**的現代化 responsive 網站。純 HTML / CSS / JavaScript，毋須任何框架或安裝，直接開 `index.html` 或上載到任何虛擬主機即可。

## 頁面（對應原站功能）

| 檔案 | 功能 |
|---|---|
| `index.html` | 首頁：Hero、快速搜尋（買/租）、精選樓盤、最新成交、公司優勢、CTA |
| `profile.html` | 公司簡介 |
| `search.html` | 樓盤搜尋（地區 / 類型 / 面積 / 售價 / 租金 / 關鍵字 + 排序 + 詳情彈窗） |
| `transactions.html` | 成交記錄（可按地區篩選） |
| `trends.html` | 屋苑走勢（互動折線圖 + 平均呎價 / 按年變幅 / 成交宗數） |
| `mortgage.html` | 按揭計算（每月供款、利息、壓力測試 +2%） |
| `list-property.html` | 網上放盤表單（出售 / 出租） |
| `news.html` | 地產新聞（列表 + 內容彈窗） |
| `resources.html` | 參考資料（政府 / 銀行連結 + 印花稅速算） |
| `contact.html` | 聯絡我們（聯絡資料 + 表單 + Google Map） |
| `admin-login.html` | 管理員登入（前端入口） |

## 已內建功能
- **中 / EN 雙語切換**（右上角，記憶於瀏覽器）
- **響應式設計**（手機 / 平板 / 桌面）
- **訪客計數器**（沿用原站數字起始，本機累加）
- **WhatsApp / 致電浮動按鈕**、SEO meta、favicon

## 公司資料（單一來源：`assets/js/data.js` 的 `COMPANY`）
- 地址：新界粉嶺聯和墟和泰街45號地下
- 電話：2149 1818　WhatsApp：6028 3039
- Email：info@28harmony.com
- Facebook：harmony28home

## 檔案結構
```
安樂窩/
├─ *.html                 各頁面
└─ assets/
   ├─ css/style.css       全站樣式
   ├─ js/data.js          ★ 樓盤 / 成交 / 屋苑 / 新聞 / 公司資料（示範）
   ├─ js/i18n.js          中英對照字典
   ├─ js/layout.js        共用頁首頁尾、語言、計數器
   ├─ js/main.js          各頁邏輯（搜尋、按揭、圖表、表單…）
   └─ img/hero.svg        首頁背景
```

## 接駁真實資料 / 下一步（需要後台）
目前**樓盤、成交、屋苑走勢、新聞為示範資料**，集中在 `assets/js/data.js`，可直接改成貴公司真實資料。若要達到原站「職員後台上盤」的完整運作，需再加：
1. 後端 + 資料庫（樓盤、成交、放盤查詢、聯絡表單收信）
2. `admin-login.html` 接真實登入與樓盤管理後台
3. 表單提交（放盤 / 聯絡）改為送 email 或寫入資料庫（現為前端示範）

> 現時所有表單、搜尋、計算、雙語、彈窗、圖表在純前端已完全可用；接後台後即成完整營運網站。
