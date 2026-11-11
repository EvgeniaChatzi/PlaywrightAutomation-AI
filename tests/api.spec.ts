import { test, expect } from '@playwright/test';

const BASE_API = 'https://rahulshettyacademy.com/api/ecom';

test.describe('API tests', () => {
  test('login returns a token', async ({ request }) => {
    const response = await request.post(`${BASE_API}/auth/login`, {
      data: {
        userEmail: 'anshika@gmail.com',
        userPassword: 'Iamking@000',
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.token).toBeTruthy();
  });
});
