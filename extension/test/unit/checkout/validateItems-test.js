const assert = require('assert')
const validateItems = require('../../../checkout/validateItems')
const ValidationError = require('../../../errors/ValidationError')

describe('validateItems', () => {
  const validProduct = {id: 'SG1', name: 'Cool product', type: 'product', unitPrice: 100, quantity: 1}
  const validCoupon = {id: 'SG1', name: 'Cool product', type: 'product', unitPrice: 100, quantity: 1}

  const inValidItem = {id: 'SG1', name: 'Cool product', type: 'not product', unitPrice: 100, quantity: 0}

  it('Should validate items without errors', async () => {
    let stepError
    try {
      // noinspection JSCheckFunctionSignatures
      await validateItems({}, {items: [validProduct, validCoupon]})
    } catch (err) {
      stepError = err
    }
    assert.ifError(stepError)
  })

  it('Should throw error when validation fails', async () => {
    try {
      // noinspection JSCheckFunctionSignatures
      await validateItems({}, {items: [inValidItem]})
      assert.fail()
    } catch (err) {
      assert.equal(err.code, (new ValidationError()).code)
    }
  })
})
