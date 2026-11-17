# 安樂窩置業 Harmony Property(28harmony.com)

- 這是什麼:香港北區(粉嶺/上水/古洞)地產代理的靜態網站 + 內部工具
- 技術形態:純靜態 HTML/CSS/JS,無 build 無框架,file:// 直接可跑,零外部資源
- 慣例:設計 token 在 `assets/css/style.css` 的 `:root`(森林綠 #2e5f4e、金 #c2913a、mono 排數據);中英 i18n 用 `data-i18n` + `hp_lang` localStorage;風格叫「Land Gazette」
- 驗證方式:jsdom smoke test(先前在 scratchpad,pattern 見 memory);UI 改動要真開瀏覽器看兩種寬度
- 紅線 1:`agent/` 是內部盤源系統(CRM),部署對外網站時**必須排除**
- 紅線 2:業主個資(姓名/電話)永不 commit 進 git、永不發到外部服務;demo 用內建示範資料
- 進行中:見 auto-memory `harmony-site-project.md`(B方案 scrape 續跑中)
