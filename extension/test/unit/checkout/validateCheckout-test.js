const assert = require('assert')
const executeStep = require('../../../checkout/validateCheckout')
const ValidationError = require('../../../errors/ValidationError')

describe('validateItems', () => {
  const validProduct = {id: 'SG1', name: 'Cool product', type: 'product', unitPrice: 100, quantity: 1}
  const validCoupon = {id: 'SG1', name: 'Cool product', type: 'product', unitPrice: 100, quantity: 1}

  const inValidItem = {id: 'SG1', name: 'Cool product', type: 'not product', unitPrice: 100, quantity: 0}

  it('Should validate items without errors', async () => {
    let stepError
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep({}, {items: [validProduct, validCoupon]})
    } catch (err) {
      stepError = err
    } finally {
      assert.ifError(stepError)
    }
  })

  it('Should throw error when validation fails', async () => {
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep({}, {items: [inValidItem]})
      assert.fail()
    } catch (err) {
      assert(err instanceof ValidationError)
    }
  })

  it('Should throw error when items are empty', async () => {
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep({}, {items: []})
      assert.fail()
    } catch (err) {
      assert(err instanceof ValidationError)
    }
  })
})
