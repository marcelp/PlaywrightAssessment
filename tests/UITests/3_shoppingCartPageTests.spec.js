import { test, expect } from "@playwright/test";
import LoginPage from "../../Pages/1_login.page.js";
import InventoryPage from "../../Pages/2_inventory.page.js";
import ShoppingCartPage from "../../Pages/3_ShoppingCart.page.js";
import InventoryTestData from "../../Pages/data/InventoryTestData.js";


async function addItemsToCart(page) {
    const inventoryPage = new InventoryPage(page);
    const testItems = InventoryTestData.getTestCartItems();    
    await inventoryPage.clickOnAddToCartButton(testItems.backpack);
    await inventoryPage.clickOnAddToCartButton(testItems.jacket);
    await inventoryPage.clickOnAddToCartButton(testItems.bikeLight);
}

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToLogin();
    await loginPage.signInWithStandardUser();
});


test('Verify cart loads when clicking on cart icon and the items are listed in the shopping cart', async ({ page }) => {
    // Call function to add items to cart
    await addItemsToCart(page);

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickShoppingCartPage();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    // Setup the expected items that have been added to the cart from the function
    const expectedCartItems = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light', 
        'Sauce Labs Fleece Jacket'        
    ];

    // Loop through the elements and verify item exists in the cart
    for (const itemName of expectedCartItems) {
        await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: itemName }))
            .toBeVisible();
        console.log(`✓ Verified "${itemName}" is in the cart`);
    }
});

test('Verify removing items from the cart updates the cart correctly', async ({ page }) => {
    // Add items to the cart first
    await addItemsToCart(page);

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickShoppingCartPage();

    // Remove an item from the cart
    await shoppingCartPage.removeItemFromCart('Sauce Labs Backpack');

    // Verify the cart is updated correctly
    const expectedCartItems = [
        'Sauce Labs Bike Light',
        'Sauce Labs Fleece Jacket'
    ];

    for (const itemName of expectedCartItems) {
        await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: itemName }))
            .toBeVisible();
        console.log(`✓ Verified "${itemName}" is in the cart`);
    }
});

test('Verify removing all items from the cart leaves the cart empty', async ({ page }) => {
    // Add items to the cart first
    await addItemsToCart(page);

    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickShoppingCartPage();

    // Remove an item from the cart
    await shoppingCartPage.removeItemFromCart('Sauce Labs Backpack');
    await shoppingCartPage.removeItemFromCart('Sauce Labs Bike Light');
    await shoppingCartPage.removeItemFromCart('Sauce Labs Fleece Jacket');

    // Verify the cart is updated correctly
    const expectedCartItems = [                    
    ];

    for (const itemName of expectedCartItems) {
        await expect(page.locator('[data-test="inventory-item-name"]').filter({ hasText: itemName }))
            .toBeVisible();
        console.log(`✓ Verified "${itemName}" is in the cart`);
    }
});

test('On login, click on the shopping cart icon and then click on Continue shopping button', async ({ page }) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickShoppingCartPage();

    // Click on the "Continue Shopping" button
    await shoppingCartPage.clickContinueShopping();

    // Verify that the user is taken back to the inventory page
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Verify that the user is goes to the checkout page when clicking on the checkout button', async ({ page }) => {
    // Add items to the cart first
    await addItemsToCart(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickShoppingCartPage();

    // Click on the "Checkout" button
    await shoppingCartPage.clickCheckout();

    // Verify that the user is taken to the checkout page
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
});