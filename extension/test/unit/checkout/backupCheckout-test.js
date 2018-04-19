const assert = require('assert')
const executeStep = require('../../../checkout/backupCheckout')

describe('backupCheckout', () => {
  const checkout = {
    user: {
      id: 'sdsd-ddf-dff',
      mail: 'mail@mail.com'
    },
    items: [{
      id: 'qwerty123',
      name: 'QWERTY123',
      unitPrice: 100,
      quantity: 1
    }]
  }
  const context = {
    log: {
      error: () => {}
    },
    storage: {
      user: {}
    }
  }

  it('Should backup checkout and remove original checkout', async () => {
    const orderId = 'ererer-rtrtrt-tytyty'

    context.storage.user.get = async (key) => {
      assert.equal(key, 'checkout')
      return {...checkout} // clone of checkout
    }
    context.storage.user.set = async (key, val) => {
      assert.equal(key, 'checkout_bak')
      assert.deepEqual(val, {
        orderId,
        ...checkout
      })
    }
    context.storage.user.del = async (key) => {
      assert.equal(key, 'checkout')
    }
    try {
      // noinspection JSCheckFunctionSignatures
      await executeStep(context, {orderId})
    } catch (err) {
      assert.ifError(err)
    }
  })
})
