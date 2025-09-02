import { test, expect } from "@playwright/test";
import LoginPage from "../../Pages/1_login.page";
import InventoryPage from "../../Pages/2_inventory.page";
import ShoppingCartPage from "../../Pages/3_ShoppingCart.page";
import InventoryTestData from "../../Pages/data/InventoryTestData.js";


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLogin();
    await loginPage.signInWithStandardUser();

    const inventoryPage = new InventoryPage(page);
    const testItems = InventoryTestData.getTestCartItems();    
    await inventoryPage.clickOnAddToCartButton(testItems.backpack);
    await inventoryPage.clickOnAddToCartButton(testItems.jacket);
    await inventoryPage.clickOnAddToCartButton(testItems.bikeLight);

});


test('Verify cart loads when clicking on cart icon', async ({ page }) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickShoppingCartPage();

    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
});
