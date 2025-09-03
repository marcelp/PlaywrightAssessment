export default class ShoppingCartPage {    

    constructor(page) {
        this.page = page;
    }
    
    async clickShoppingCartPage() {
        await this.page.click('[data-test="shopping-cart-link"]');        
    }

    async removeItemFromCart(itemName) {
        const itemLocator = this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: itemName });
        await itemLocator.scrollIntoViewIfNeeded();
        await itemLocator.hover();
        
        // Convert item name to kebab-case format for the data-test attribute        
        const covertItemNameToKebabCase = itemName.toLowerCase().replace(/\s+/g, '-');        
        
        // Wait for the remove button to be visible before clicking
        const removeButton = this.page.locator(`[data-test="remove-${covertItemNameToKebabCase}"]`);        
        await removeButton.click();
    }

    async clickContinueShopping() {
        await this.page.click('[data-test="continue-shopping"]');
    }

    async clickCheckout() {
        await this.page.click('[data-test="checkout"]');
    }

}
