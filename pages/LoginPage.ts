import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // 1. 定義這頁有哪些零件 (Type Definition)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // 2. 鎖定零件的定位點 (Locators)
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
  }

  // 3. 把常用的動作包裝成一個「功能」 (Method)
  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}