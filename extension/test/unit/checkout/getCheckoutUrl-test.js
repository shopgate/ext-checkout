const assert = require('assert')
const executeStep = require('../../../checkout/getCheckoutUrl')

describe('getCheckoutUrl', () => {
  it('Should not fail', async () => {
    try {
      await executeStep()
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should return the correct checkout url', async () => {
    let result
    try {
      result = await executeStep()
    } catch (err) {
      // already tested in another unit test case
    }
    assert.deepEqual(result, {url: '/checkout'})
  })
})
