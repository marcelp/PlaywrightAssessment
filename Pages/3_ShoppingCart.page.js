import { expect, Page } from "@playwright/test";

export default class ShoppingCartPage {
    #page;

    constructor(page) {
        this.#page = page;
    }
    
    async clickShoppingCartPage() {
        await this.#page.click('[data-test="shopping-cart-link"]');        
    }

}
