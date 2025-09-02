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

    // Method to get inventory items count for test assertions
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
}
