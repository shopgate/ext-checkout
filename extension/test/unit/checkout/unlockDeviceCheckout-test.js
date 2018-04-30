const assert = require('assert')
const InternalError = require('./../../../common/Error/InternalError')
const executeStep = require('../../../checkout/unlockDeviceCheckout')
const createContext = require('../../mock/createContext')

describe('unlockDeviceCheckout', () => {
  const userStorageName = 'user'

  it('Should delete the lock from storage', async () => {
    let deleteWasCalled
    await executeStep(createContext(userStorageName, () => {}, () => {}, () => { deleteWasCalled = true }))
    assert.ok(deleteWasCalled)
  })

  it('Should throw an internal error on storage errors', async () => {
    try {
      await executeStep(createContext(userStorageName, () => {}, () => {}, () => { throw new Error() }))
      assert.fail()
    } catch (err) {
      assert(err instanceof InternalError)
    }
  })

  it('Should delete the lock from the user storage', async () => {
    let deleteStorageName
    await executeStep(createContext(userStorageName, () => {}, () => {}, () => (deleteStorageName = userStorageName)))
    assert.equal(deleteStorageName, userStorageName)
  })

  it('Should delete the lock from the correct data storage key', async () => {
    let deleteKey
    await executeStep(createContext(userStorageName, () => {}, () => {}, (key) => { deleteKey = key }))
    assert.equal(deleteKey, 'checkoutLock')
  })
})
