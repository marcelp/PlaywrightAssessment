import { expect, Page } from "@playwright/test";

export default class InventoryPage {
    #page;

    constructor(page) {
        this.#page = page;
    }

    async verifyItemsInInventory() {
        await expect(this.#page.locator('span[data-test="title"]')).toHaveText('Products');
        
        // Get all inventory items
        const inventoryItems = this.#page.locator('.inventory_item');
        
        // Loop through each item to verify they are displayed
        const itemCount = await inventoryItems.count();
        for (let i = 0; i < itemCount; i++) {
            const item = inventoryItems.nth(i);
            await expect(item).toBeVisible();
        }
    }
    
    async getInventoryItemsCount() {
        const inventoryItems = this.#page.locator('.inventory_item');
        return await inventoryItems.count();
    }

    async getInventoryItems() {
        const inventoryItemNames = this.#page.locator('[data-test="inventory-item-name"]');
        return await inventoryItemNames.allTextContents();
    }

    async getInventoryDescriptionForItems() {
        const inventoryItemDescriptions = this.#page.locator('.inventory_item_desc');
        return await inventoryItemDescriptions.allTextContents();
    }

    async getInventoryItemPrices() {
        const inventoryItemPrices = this.#page.locator('[data-test="inventory-item-price"]');
        return await inventoryItemPrices.allTextContents();
    }  

    async sortItemsByNameAscending() {
        await this.#page.locator('.product_sort_container').selectOption('az');
    }

    async sortItemsByNameDescending() {
        await this.#page.locator('.product_sort_container').selectOption('za');
    }

    async sortItemsByPriceAscending() {
        await this.#page.locator('.product_sort_container').selectOption('lohi');
        // Wait for the sorting to complete
        await this.#page.waitForTimeout(500);
    }

    async sortItemsByPriceDescending() {
        await this.#page.locator('.product_sort_container').selectOption('hilo');
        // Wait for the sorting to complete
        await this.#page.waitForTimeout(500);
    }

    async clickOnAddToCartButton(itemName) {
        const item = this.#page.locator(`.inventory_item:has-text("${itemName}")`);
        await item.locator('button').click();
    }  

    async getCartBadgeCount() {
        const cartBadge = this.#page.locator('.shopping_cart_badge');
        return await cartBadge.textContent();
    }

    async isCartBadgeVisible() {
        const cartBadge = this.#page.locator('.shopping_cart_badge');
        return await cartBadge.isVisible();
    }
}
