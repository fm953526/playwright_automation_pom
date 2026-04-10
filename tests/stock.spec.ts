import { test, expect } from '@playwright/test';

test('抓取大盤與台積電數據', async ({ page }) => {
  // 設定 User-Agent 避免被擋
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });

  // 1. 抓取加權指數 (^TWII)
  console.log('>>> 正在查詢大盤指數...');
  // 使用 commit 較少的 domcontentloaded，不要等廣告載入
  await page.goto('https://tw.stock.yahoo.com/quote/%5ETWII', { waitUntil: 'domcontentloaded' });
  
  // 直接鎖定價格元素
  const taiexPrice = page.locator('span[class*="Fz(32px)"]').first();
  // 等待元素出現，最多等 15 秒
  await taiexPrice.waitFor({ state: 'visible', timeout: 15000 });
  const taiexVal = await taiexPrice.innerText();
  console.log(`📈 大盤指數: ${taiexVal}`);

  // 2. 抓取台積電 (2330)
  console.log('>>> 正在查詢台積電股價...');
  await page.goto('https://tw.stock.yahoo.com/quote/2330', { waitUntil: 'domcontentloaded' });
  
  const tsmcPrice = page.locator('span[class*="Fz(32px)"]').first();
  await tsmcPrice.waitFor({ state: 'visible', timeout: 15000 });
  const tsmcVal = await tsmcPrice.innerText();

  console.log('\n===================================');
  console.log(`✅ 數據抓取成功！`);
  console.log(`📈 加權指數：${taiexVal}`);
  console.log(`💎 台積電價格：${tsmcVal}`);
  console.log('===================================\n');
});