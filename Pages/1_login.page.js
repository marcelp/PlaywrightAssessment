import { expect } from "@playwright/test";

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

    async performLogin(username, password = LoginPage.PASSWORD) {
        await this.inputLogin.fill(username);
        await this.inputPassword.fill(password);
        await this.buttonSubmit.click();
    }

    async signInWithStandardUser() {
        await this.performLogin('standard_user');
    }

     async signInWithLockedOutUser() {
        await this.performLogin('locked_out_user');
    }

     async signInWithProblemUser() {
        await this.performLogin('problem_user');
    }
    
    async signInWithPerformanceGlitchUser() {
        await this.performLogin('performance_glitch_user');
    }

    async signInWithErrorUser() {
        await this.performLogin('error_user');
    }

    async signInWithVisualUser() {
        await this.performLogin('visual_user');
    }
}