import { expect, Page } from "@playwright/test";

export default class LoginPage {
    static BASE_URL = 'https://www.saucedemo.com';
    static PASSWORD = 'secret_sauce';

    #page;
    constructor(page) {
        this.#page = page;
    }

    get inputLogin() {return this.#page.locator('input[id="user-name"]');}
    get inputPassword() {return this.#page.locator('input[id="password"]');}
    get buttonSubmit() {return this.#page.locator('input[id="login-button"]');}

    async goToLogin() {
        await this.#page.goto(LoginPage.BASE_URL);        
        expect(await this.#page.title()).toBe('Swag Labs');
    }

    async setPassword(password) {
        await this.inputPassword.fill(password);
    }

    async performLogin(username, password) {
        await this.inputLogin.fill(username);
        await this.inputPassword.fill(password);
        await this.buttonSubmit.click();
    }

    async signInWithStandardUser() {
        await this.performLogin('standard_user', LoginPage.PASSWORD);
    }

     async signInWithLockedOutUser() {
        await this.performLogin('locked_out_user', LoginPage.PASSWORD);
    }   

}
