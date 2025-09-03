export default class CheckoutPage {
    
    constructor(page) {
        this.page = page;
    }

    async clickContinue() {
        await this.page.click('[data-test="continue"]');
    }

    async clickCancel() {
        await this.page.click('[data-test="cancel"]');
    }

    async fillFirstName(name) {
        await this.page.fill('[data-test="firstName"]', name);
    }

    async fillLastName(name) {
        await this.page.fill('[data-test="lastName"]', name);
    }

    async fillPostalCode(code) {
        await this.page.fill('[data-test="postalCode"]', code);
    }

    async clickFinish() {
        await this.page.click('[data-test="finish"]');
    }
}
