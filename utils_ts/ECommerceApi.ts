import { request, type APIRequestContext } from "@playwright/test";

const API_URL = "https://rahulshettyacademy.com/api/ecom";

/**
 * Small API helper used by the BDD steps to set up test data quickly
 * (e.g. create an order without clicking through the whole UI checkout).
 */
export class ECommerceApi {
  private constructor(
    private apiContext: APIRequestContext,
    readonly token: string,
  ) {}

  static async login(email: string, password: string) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(`${API_URL}/auth/login`, {
      data: { userEmail: email, userPassword: password },
    });
    if (!response.ok()) {
      throw new Error(`API login failed with status ${response.status()}`);
    }
    const { token } = await response.json();
    return new ECommerceApi(apiContext, token);
  }

  async getProductId(productName: string): Promise<string> {
    const response = await this.apiContext.post(`${API_URL}/product/get-all-products`, {
      headers: { Authorization: this.token },
      data: {},
    });
    const body = await response.json();
    const product = body.data.find((p: any) => p.productName === productName);
    if (!product) {
      throw new Error(`Product "${productName}" not found via API`);
    }
    return product._id;
  }

  async createOrder(productName: string, country = "India"): Promise<string> {
    const productOrderedId = await this.getProductId(productName);
    const response = await this.apiContext.post(`${API_URL}/order/create-order`, {
      headers: { Authorization: this.token },
      data: { orders: [{ country, productOrderedId }] },
    });
    if (!response.ok()) {
      throw new Error(`Create order failed with status ${response.status()}`);
    }
    const body = await response.json();
    return body.orders[0];
  }

  async dispose() {
    await this.apiContext.dispose();
  }
}
