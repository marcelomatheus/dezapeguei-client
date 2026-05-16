import { test, expect } from '@playwright/test';
import {
  createApiContext,
  getDefaultCategoryId,
  registerUser,
} from './helpers/api-test-utils';

test.describe('E2E Offer Flow', () => {
  test('browse -> create -> edit -> mark sold', async () => {
    const api = await createApiContext();

    const seller = await registerUser(api, 'Offer Seller');
    const categoryId = await getDefaultCategoryId(api);

    const createResponse = await api.post('/offers', {
      data: {
        title: `E2E Offer ${Date.now()}`,
        description: 'Offer created in automated E2E flow for marketplace.',
        price: 199.9,
        sellerId: seller.id,
        categoryId,
        condition: 'NEW',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const createdOffer = await createResponse.json();

    const browseResponse = await api.get('/offers', {
      params: {
        search: 'E2E Offer',
      },
    });
    expect(browseResponse.ok()).toBeTruthy();
    const offers = await browseResponse.json();
    expect(Array.isArray(offers)).toBeTruthy();
    expect(offers.some((offer: { id: string }) => offer.id === createdOffer.id)).toBeTruthy();

    const editResponse = await api.patch(`/offers/${createdOffer.id}`, {
      data: {
        title: `${createdOffer.title} Updated`,
        price: 179.9,
      },
    });
    expect(editResponse.ok()).toBeTruthy();
    const editedOffer = await editResponse.json();
    expect(editedOffer.title).toContain('Updated');

    const markSoldResponse = await api.patch(`/offers/${createdOffer.id}/status`, {
      data: {
        status: 'SOLD',
      },
    });
    expect(markSoldResponse.ok()).toBeTruthy();
    const soldOffer = await markSoldResponse.json();
    expect(soldOffer.status).toBe('SOLD');

    await api.dispose();
  });
});
