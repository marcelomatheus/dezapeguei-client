import { test, expect } from '@playwright/test';
import {
  createApiContext,
  getDefaultCategoryId,
  registerUser,
} from './helpers/api-test-utils';

test.describe('E2E Sale Flow', () => {
  test('negotiate -> confirm sale -> verify notifications', async () => {
    const api = await createApiContext();

    const seller = await registerUser(api, 'Sale Seller');
    const buyer = await registerUser(api, 'Sale Buyer');
    const categoryId = await getDefaultCategoryId(api);

    const offerResponse = await api.post('/offers', {
      data: {
        title: `Sale Offer ${Date.now()}`,
        description: 'Offer for sale flow test.',
        price: 350.0,
        sellerId: seller.id,
        categoryId,
        condition: 'USED',
      },
    });
    expect(offerResponse.ok()).toBeTruthy();
    const offer = await offerResponse.json();

    const negotiateAmount = 330.0;
    const createSaleResponse = await api.post('/sales', {
      data: {
        offerId: offer.id,
        buyerId: buyer.id,
        amount: negotiateAmount,
        status: 'PENDING',
      },
    });
    expect(createSaleResponse.ok()).toBeTruthy();
    const sale = await createSaleResponse.json();
    expect(sale.status).toBe('PENDING');

    const confirmSaleResponse = await api.patch(`/sales/${sale.id}`, {
      data: {
        status: 'COMPLETED',
      },
    });
    expect(confirmSaleResponse.ok()).toBeTruthy();
    const completedSale = await confirmSaleResponse.json();
    expect(completedSale.status).toBe('COMPLETED');

    const notificationsResponse = await api.get('/notifications', {
      params: {
        userId: buyer.id,
      },
    });
    expect(notificationsResponse.ok()).toBeTruthy();
    const notifications = await notificationsResponse.json();

    expect(Array.isArray(notifications)).toBeTruthy();
    expect(
      notifications.some(
        (notification: { redirect?: string }) =>
          notification.redirect === `/sales/${sale.id}`,
      ),
    ).toBeTruthy();

    await api.dispose();
  });
});
