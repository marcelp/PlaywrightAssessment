import {test, expect} from '@playwright/test'
import LoginPage from '../../Pages/login.page';

test('standard_user login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithStandardUser();

  // Assert successful login by checking for Products title
  await expect(page.locator('span[data-test="title"]')).toHaveText('Products');
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
    expect(imageSrc).toContain('sl-404.168b1cce.jpg'); // This is the jpg image filename
  }
});

test('performance_glitch_user login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  
  // Measure the time it takes to login
  const startTime = Date.now();
  await loginPage.signInWithPerformanceGlitchUser();
  
  // Wait for the products page to load to confirm that login was successful
  await expect(page.locator('span[data-test="title"]')).toHaveText('Products');
  const endTime = Date.now();  
  const loginDuration = endTime - startTime;  
 
  expect(loginDuration).toBeGreaterThan(2000); // Should take more than 2 seconds
  
  console.log(`Performance glitch user login took: ${loginDuration}ms`);
});

test('error_user login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithErrorUser();

  // Click on the Add to Chart button and ensure that button changes to remove
  await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('xpath=//*[@id="remove-sauce-labs-backpack"]')).toContainText('Remove');

  // Now click on the remove button, because this is a negative test, the button would stay the same and not remove the item from the chart nor change the button to add to chart
  await page.locator('xpath=//*[@id="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('xpath=//*[@id="remove-sauce-labs-backpack"]')).toContainText('Remove');
});

test('visual_user login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithVisualUser();

  // Assert successful login by checking for Products title
  await expect(page.locator('span[data-test="title"]')).toHaveText('Products');

  // Get the src attribute of the specific image and assert it contains the dog image
  const imageSrc = await page.locator('xpath=//*[@id="item_4_img_link"]/img').getAttribute('src');
  expect(imageSrc).toContain('sl-404.168b1cce.jpg'); // This is the dog image filename

  // Find out how to get cart position / coordinates

});
