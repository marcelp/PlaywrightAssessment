import { test, expect } from "@playwright/test";
import LoginPage from '../../Pages/1_login.page.js';
import InventoryPage from "../../Pages/2_inventory.page.js";

test('verify items in inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goToLogin();
  await loginPage.signInWithStandardUser();

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.verifyItemsInInventory();

  

});
