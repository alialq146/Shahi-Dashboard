// =============================================================
//  مزوّد البيانات التجريبية (Mock Provider)
//  ينفّذ عقد DataProvider اعتماداً على بيانات seed.ts.
//  يعمل دون أي اتصال خارجي — مناسب للتطوير والعرض.
// =============================================================

import type { DataProvider } from "@/lib/data/provider";
import { computeProduct } from "@/lib/data/derive";
import * as seed from "@/lib/data/mock/seed";

export const mockProvider: DataProvider = {
  name: "mock",

  async getProducts() {
    return seed.productsBase.map(computeProduct);
  },
  async getRecipes() {
    return seed.recipes;
  },
  async getInventory() {
    return seed.inventory;
  },
  async getInvoices() {
    return seed.invoices;
  },
  async getSalesSeries() {
    return seed.salesDaily;
  },
  async getPurchases() {
    return seed.purchases;
  },
  async getExpenses() {
    return seed.expenses;
  },
  async getWaste() {
    return seed.waste;
  },
  async getStaff() {
    return seed.staff;
  },
  async getShopInfo() {
    return seed.shopInfo;
  },
  async getUsers() {
    return seed.users;
  },
};
