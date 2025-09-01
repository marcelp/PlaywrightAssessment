import {test, expect} from '@playwright/test'
import LoginPage from '../Pages/login.page';

test('standard_user login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithStandardUser();

  // Assert successful login by checking for Products title
  await expect(page.locator('span[data-test="title"]')).toBeVisible();  
}); 