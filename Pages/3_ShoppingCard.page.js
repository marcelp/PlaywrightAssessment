import { expect, Page } from "@playwright/test";

export default class ShoppingCartPage {
    #page;

    constructor(page) {
        this.#page = page;
    }   
}
