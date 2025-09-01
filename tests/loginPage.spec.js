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

test('problem_user login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithProblemUser(); 
  
  // Verify that all product images contain dogs (problem_user issue)
  const productImages = page.locator('.inventory_item_img img');
  const imageCount = await productImages.count();
  
  // Check that we have product images
  expect(imageCount).toBeGreaterThan(0);
  
  // Verify each image src contains the dog image
  for (let i = 0; i < imageCount; i++) {
    const imageSrc = await productImages.nth(i).getAttribute('src');
    expect(imageSrc).toContain('sl-404.168b1cce.jpg'); // This is the dog image filename
  }
});