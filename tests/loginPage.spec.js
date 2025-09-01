import {test, expect} from '@playwright/test'
import LoginPage from '../Pages/login.page';

test('standard_user login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithStandardUser();

  // Assert successful login by checking for Products title
  await expect(page.locator('span[data-test="title"]')).toBeVisible();  
}); 

test('locked_out_user login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithLockedOutUser();

  //Assert error message is displayed for locked out user
  await expect(page.locator('h3[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});