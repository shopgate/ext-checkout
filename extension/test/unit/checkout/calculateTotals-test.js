const assert = require('assert')
const executeStep = require('../../../checkout/calculateTotals')

describe('calculateTotals', () => {
  /** @type {ExtCheckoutItem[]} */
  const items = [
    {id: 'SG1', name: 'Cool product', type: 'product', unitPrice: 500, quantity: 2},
    {id: '10ff', name: 'Coupon 10OFF', type: 'coupon', unitPrice: -100, quantity: 1}
  ]
  /** @type {ExtCheckoutShippingMethod} */
  const shippingMethod = {id: 'usps-123', name: 'USPS', amount: 100, taxAmount: 10}
  /** @type {ExtCheckoutPaymentMethod} */
  const paymentMethod = {id: 'paypal-123', name: 'PayPal', amount: 100, taxAmount: 10}

  it('Should calculate totals for items, shipping and payment', async () => {
    const expectedTotals = {
      taxAmount: 20,
      total: 1100
    }
    let stepError, totals
    try {
      // noinspection JSCheckFunctionSignatures
      totals = await executeStep({}, {
        items,
        shippingMethod,
        paymentMethod
      })
    } catch (err) {
      stepError = err
    }

    assert.ifError(stepError)
    assert.deepEqual(totals, expectedTotals)
  })
})
