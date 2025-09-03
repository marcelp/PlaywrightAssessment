import { test, expect } from "@playwright/test";
import LoginPage from "../../Pages/1_login.page.js";
import InventoryPage from "../../Pages/2_inventory.page.js";
import ShoppingCartPage from "../../Pages/3_ShoppingCart.page.js";
import InventoryTestData from "../../Pages/data/InventoryTestData.js";
import CheckoutPage from "../../Pages/4_shoppingCartCheckout.page.js";

test.beforeEach(async ({ page }) => {
    //Login to the application
    const loginPage = new LoginPage(page);
    await loginPage.goToLogin();
    await loginPage.signInWithStandardUser();

    //Add items to the cart
    const inventoryPage = new InventoryPage(page);
    const testItems = InventoryTestData.getTestCartItems();    
    await inventoryPage.clickOnAddToCartButton(testItems.backpack);
    await inventoryPage.clickOnAddToCartButton(testItems.jacket);
    await inventoryPage.clickOnAddToCartButton(testItems.bikeLight);

    //Click on the shopping cart icon
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.clickShoppingCartPage();

    //Click on the checkout button
    await shoppingCartPage.clickCheckout();
});

test('Complete order', async ({ page }) => {
    const shoppingCartCheckoutPage = new CheckoutPage(page);

    await shoppingCartCheckoutPage.fillFirstName('John');
    await shoppingCartCheckoutPage.fillLastName('Doe');
    await shoppingCartCheckoutPage.fillPostalCode('12345');
    await shoppingCartCheckoutPage.clickContinue();

    // Assert on the checkout overview
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await shoppingCartCheckoutPage.clickFinish();

    // Assert on the order confirmation
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
});

test('Ensure that you are redirected back to the checkout page when clicking on the cancel button', async ({ page }) => {
    const shoppingCartCheckoutPage = new CheckoutPage(page);
    await shoppingCartCheckoutPage.clickCancel();

    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
});

test('Checkout Overview for items in cart', async ({ page }) => {
    const shoppingCartCheckoutPage = new CheckoutPage(page);

    await shoppingCartCheckoutPage.fillFirstName('John');
    await shoppingCartCheckoutPage.fillLastName('Doe');
    await shoppingCartCheckoutPage.fillPostalCode('12345');
    await shoppingCartCheckoutPage.clickContinue();

    // Assert on the checkout overview
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
});

test('Click on cancel on the Checkout Overview page, ensure that you are taken back to the Inventory Page', async ({ page }) => {
    const shoppingCartCheckoutPage = new CheckoutPage(page);

    await shoppingCartCheckoutPage.fillFirstName('John');
    await shoppingCartCheckoutPage.fillLastName('Doe');
    await shoppingCartCheckoutPage.fillPostalCode('12345');
    await shoppingCartCheckoutPage.clickContinue();
    await shoppingCartCheckoutPage.clickCancel();

    // Assert on the inventory page
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test.describe('Checkout validation message tests', () => {

    test('Validation on firstName field', async ({ page }) => {
        const shoppingCartCheckoutPage = new CheckoutPage(page);
        await shoppingCartCheckoutPage.clickContinue();

        // Assert on the error message
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
    });

    test('Validation on LastName field', async ({ page }) => {
        const shoppingCartCheckoutPage = new CheckoutPage(page);
        

        await shoppingCartCheckoutPage.fillFirstName('John');
        await shoppingCartCheckoutPage.clickContinue();

        // Assert on the error message
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
    });

    test('Validation on Postal Code field', async ({ page }) => {
        const shoppingCartCheckoutPage = new CheckoutPage(page);

        await shoppingCartCheckoutPage.fillFirstName('John');
        await shoppingCartCheckoutPage.fillLastName('Doe');
        await shoppingCartCheckoutPage.clickContinue();

        // Assert on the error message
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
    });
});