import { expect, Page } from "@playwright/test";

export default class InventoryPage {
    #page;

    constructor(page) {
        this.#page = page;
    }

    async verifyItemsInInventory() {
        await expect(this.#page.locator('span[data-test="title"]')).toHaveText('Products');
    }
}
