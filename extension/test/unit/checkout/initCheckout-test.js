const assert = require('assert')
const executeStep = require('../../../checkout/initCheckout')
const CheckoutInProgressError = require('./../../../errors/CheckoutInProgressError')

describe('initCheckout', () => {
  const context = {
    log: {
      error: () => {}
    },
    storage: {
      user: {}
    }
  }

  it('Should init checkout without errors', async () => {
    context.storage.user.get = async () => {}
    context.storage.user.set = async (key, val) => {
      assert.ok(val.checkoutId)
    }
    try {
      // noinspection JSCheckFunctionSignatures
      const res = await executeStep(context)
      assert.ok(res.checkoutId)
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should throw error when there is checkout in progress', async () => {
    context.storage.user.get = async () => ({checkoutId: 'asasas-wewe-ererer'})
    let setIsCalled = false
    context.storage.user.set = async () => {
      setIsCalled = true
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context)
      assert.fail()
    } catch (err) {
      assert(err instanceof CheckoutInProgressError)
    } finally {
      assert(setIsCalled === false)
    }
  })
})
