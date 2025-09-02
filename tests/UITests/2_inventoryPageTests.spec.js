import { test, expect } from "@playwright/test";
import LoginPage from '../../Pages/1_login.page.js';
import InventoryPage from "../../Pages/2_inventory.page.js";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithStandardUser();
});

test('verify number of items in inventory', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.verifyItemsInInventory();

  expect(await inventoryPage.getInventoryItemsCount()).toBe(6);
});

test('Get all items in Inventory store', async ({ page }) => {
    /*
        Test is expected to fail as the description is not correct. In order to get a false positive, change the description of the last element to
        'Test.allTheThings() T-Shirt (Red)',
    */

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyItemsInInventory();
    
    const items = await inventoryPage.getInventoryItems();
    expect(items).toEqual([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',            
        'Sauce Labs T-Shirt (Red)'        
    ]);
});

test('Get all item descriptions in Inventory store', async ({ page }) => {
    /*
        Test is expected to fail as the description is not correct. In order to get a false positive, change the description of the first element to
        'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
    */
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyItemsInInventory();

    const descriptions = await inventoryPage.getInventoryDescriptionForItems();
    expect(descriptions).toEqual([        
        'This is a backpack with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
        "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
        "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
        "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
        "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
        "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton."
    ]);
});

test.describe('Test sort order of all items by A-Z, Z-A, Price (Low to High), Price (High to Low)', () => {
    test('Sort items by name (A to Z)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortItemsByNameAscending();
        const sortedItems = await inventoryPage.getInventoryItems();
        expect(sortedItems).toEqual([
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)'
        ]);
    });

    test('Sort items by name (Z to A)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortItemsByNameDescending();
        const sortedItems = await inventoryPage.getInventoryItems();
        expect(sortedItems).toEqual([
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Onesie',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light',
            'Sauce Labs Backpack'
        ]);
    });

    test('Sort items by price (low to high)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortItemsByPriceAscending();
        const sortedPrices = await inventoryPage.getInventoryItemPrices();
        expect(sortedPrices).toEqual([
            '$7.99',
            '$9.99',
            '$15.99',
            '$15.99',
            '$29.99',
            '$49.99'
        ]);
    });

    test('Sort items by price (high to low)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortItemsByPriceDescending();
        const sortedPrices = await inventoryPage.getInventoryItemPrices();
        expect(sortedPrices).toEqual([
            '$49.99',
            '$29.99',
            '$15.99',
            '$15.99',
            '$9.99',
            '$7.99'
        ]);
    });
});
