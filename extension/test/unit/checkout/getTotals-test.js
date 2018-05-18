const assert = require('assert')
const executeStep = require('../../../checkout/getTotals')

describe('getTotals', () => {
  /** @type {ExtCheckoutItem[]} */
  const items = [
    {id: 'SG1', name: 'Cool product', type: 'product', unitPrice: 500, quantity: 2},
    {id: '10ff', name: 'Coupon 10OFF', type: 'coupon', unitPrice: -100, quantity: 1}
  ]
  /** @type {ExtCheckoutShippingMethod} */
  const shippingMethod = {id: 'usps-123', name: 'USPS', amount: 90, taxAmount: 9}
  /** @type {ExtCheckoutPaymentMethod} */
  const paymentMethod = {id: 'paypal-123', name: 'PayPal', amount: 100, taxAmount: 10}

  it('Should calculate totals for items, shipping and payment', async () => {
    const expectedTotals = {
      currency: 'EUR',
      taxAmount: 19,
      total: 1109,
      totals: [
        {id: 'subtotal', amount: 900, label: 'Subtotal'},
        {id: 'coupon', amount: -100, label: 'Coupon'},
        {id: 'shipping', amount: 90, label: 'Shipping'},
        {id: 'payment', amount: 100, label: 'Payment'},
        {id: 'tax', amount: 19, label: 'Tax'},
        {id: 'total', amount: 1109, label: 'Total'}
      ]
    }
    let stepError, totals
    try {
      // noinspection JSCheckFunctionSignatures
      totals = await executeStep({config: {currency: 'EUR'}}, {
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

  it('Should calculate totals for items and shipping without payment', async () => {
    const expectedTotals = {
      currency: 'EUR',
      taxAmount: 9,
      total: 999,
      totals: [
        {id: 'subtotal', amount: 900, label: 'Subtotal'},
        {id: 'coupon', amount: -100, label: 'Coupon'},
        {id: 'shipping', amount: 90, label: 'Shipping'},
        {id: 'tax', amount: 9, label: 'Tax'},
        {id: 'total', amount: 999, label: 'Total'}
      ]
    }
    let stepError, totals
    try {
      // noinspection JSCheckFunctionSignatures
      totals = await executeStep({config: {currency: 'EUR'}}, { items, shippingMethod })
    } catch (err) {
      stepError = err
    }

    assert.ifError(stepError)
    assert.deepEqual(totals, expectedTotals)
  })

  it('Should calculate totals for items and payment without shipping', async () => {
    const expectedTotals = {
      currency: 'EUR',
      taxAmount: 10,
      total: 1010,
      totals: [
        {id: 'subtotal', amount: 900, label: 'Subtotal'},
        {id: 'coupon', amount: -100, label: 'Coupon'},
        {id: 'payment', amount: 100, label: 'Payment'},
        {id: 'tax', amount: 10, label: 'Tax'},
        {id: 'total', amount: 1010, label: 'Total'}
      ]
    }
    let stepError, totals
    try {
      // noinspection JSCheckFunctionSignatures
      totals = await executeStep({config: {currency: 'EUR'}}, { items, paymentMethod })
    } catch (err) {
      stepError = err
    }

    assert.ifError(stepError)
    assert.deepEqual(totals, expectedTotals)
  })
})
