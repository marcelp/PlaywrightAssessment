import { test, expect } from "@playwright/test";
import LoginPage from '../../Pages/1_login.page.js';
import InventoryPage from "../../Pages/2_inventory.page.js";
import InventoryTestData from "../../Pages/data/InventoryTestData.js";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithStandardUser();
});

test('verify number of items in inventory', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.verifyItemsInInventory();

  expect(await inventoryPage.getInventoryItemsCount()).toBe(InventoryTestData.getExpectedInventoryCount());
});

test('Get all items in Inventory store', async ({ page }) => {
    /*
        Test is expected to fail as the description is not correct. In order to get a false positive, change the description of the last element to
        'Test.allTheThings() T-Shirt (Red)',
    */

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyItemsInInventory();
    
    const items = await inventoryPage.getInventoryItems();
    expect(items).toEqual(InventoryTestData.getExpectedItemNames());
});

test('Get all item descriptions in Inventory store', async ({ page }) => {
    /*
        Test is expected to fail as the description is not correct. In order to get a false positive, change the description of the first element to
        'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
    */
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyItemsInInventory();

    const descriptions = await inventoryPage.getInventoryDescriptionForItems();
    expect(descriptions).toEqual(InventoryTestData.getExpectedItemDescriptions());
});

test.describe('Test sort order of all items by A-Z, Z-A, Price (Low to High), Price (High to Low)', () => {
    test('Sort items by name (A to Z)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortItemsByNameAscending();
        const sortedItems = await inventoryPage.getInventoryItems();
        expect(sortedItems).toEqual(InventoryTestData.getExpectedItemNamesAscending());
    });

    test('Sort items by name (Z to A)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortItemsByNameDescending();
        const sortedItems = await inventoryPage.getInventoryItems();
        expect(sortedItems).toEqual(InventoryTestData.getExpectedItemNamesDescending());
    });

    test('Sort items by price (low to high)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortItemsByPriceAscending();
        const sortedPrices = await inventoryPage.getInventoryItemPrices();
        expect(sortedPrices).toEqual(InventoryTestData.getExpectedPricesLowToHigh());
    });

    test('Sort items by price (high to low)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortItemsByPriceDescending();
        const sortedPrices = await inventoryPage.getInventoryItemPrices();
        expect(sortedPrices).toEqual(InventoryTestData.getExpectedPricesHighToLow());
    });
});

test('Click on Add to Cart Button and ensure CartBadge number is incremented', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const testItems = InventoryTestData.getTestCartItems();
    
    await inventoryPage.clickOnAddToCartButton(testItems.backpack);
    await inventoryPage.clickOnAddToCartButton(testItems.jacket);

    expect(await inventoryPage.getCartBadgeCount()).toBe('2');

    await inventoryPage.clickOnAddToCartButton(testItems.onesie);
   
    // Verify that the cart badge is visible and shows "3"
    expect(await inventoryPage.isCartBadgeVisible()).toBe(true);
    expect(await inventoryPage.getCartBadgeCount()).toBe('3');
});

test('Click on Remove from Cart Button and ensure CartBadge number is decremented', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const testItems = InventoryTestData.getTestCartItems();
    
    await inventoryPage.clickOnAddToCartButton(testItems.backpack);
    await inventoryPage.clickOnAddToCartButton(testItems.jacket);
    await inventoryPage.clickOnAddToCartButton(testItems.onesie);

    // Verify that the cart badge is visible and shows "3"
    expect(await inventoryPage.isCartBadgeVisible()).toBe(true);
    expect(await inventoryPage.getCartBadgeCount()).toBe('3');

    // Remove an item from the cart
    await inventoryPage.clickOnRemoveButton(testItems.backpack);

    // Verify that the cart badge is updated    
    expect(await inventoryPage.getCartBadgeCount()).toBe('2');
});
