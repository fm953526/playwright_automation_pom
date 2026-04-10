import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('練習專案：POM 登入功能驗證', () => {

  test('成功登入 - 應該導向成功頁面', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await loginPage.login('student', 'Password123');
    
    // 驗證：網址正確且看到登出按鈕
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.locator('text=Log out')).toBeVisible();
  });

  test('失敗登入 - 應該顯示錯誤訊息', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await loginPage.login('wrongUser', 'wrongPass');
    
    // 驗證：錯誤提示訊息出現
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('invalid');
  });
});