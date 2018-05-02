const assert = require('assert')
const InternalError = require('./../../../common/Error/InternalError')
const CheckoutInProgressError = require('./../../../common/Error/CheckoutInProgressError')
const executeStep = require('../../../checkout/checkConcurrency')
const createContext = require('../../mock/createContext')

describe('checkConcurrency', () => {
  const userStorageName = 'user'
  const checkoutLock = {
    id: 1,
    timestamp: 0
  }
  const concurrentCheckoutLock = {
    id: 5,
    timestamp: 1000
  }
  const input = {
    checkoutLock
  }

  it('Should throw an InternalError on storage issues', async () => {
    try {
      await executeStep(createContext(userStorageName, () => { throw new Error() }), input)
      assert.fail()
    } catch (err) {
      assert(err instanceof InternalError)
    }
  })

  it('Should read the lock from the user storage', async () => {
    let writeStorageName
    await executeStep(createContext(userStorageName, () => (writeStorageName = userStorageName) && checkoutLock), input)
    assert.equal(writeStorageName, userStorageName)
  })

  it('Should read the lock from the correct data storage key', async () => {
    let readKey
    await executeStep(createContext(userStorageName, (key) => (readKey = key) && checkoutLock, () => {}), input)
    assert.equal(readKey, 'checkoutLock')
  })

  it('Should throw an InternalError when there was no lock placed before', async () => {
    try {
      await executeStep(createContext(userStorageName), input)
      assert.fail()
    } catch (err) {
      assert(err instanceof InternalError)
    }
  })

  it('Should throw a CheckoutInProgressError when the current run in competing against another one', async () => {
    try {
      await executeStep(createContext(userStorageName, () => concurrentCheckoutLock), input)
      assert.fail()
    } catch (err) {
      assert(err instanceof CheckoutInProgressError)
    }
  })

  it('Should not fail if the current execution is not concurring with another one', async () => {
    try {
      await executeStep(createContext(userStorageName, () => checkoutLock), input)
    } catch (err) {
      assert.ifError(err)
    }
  })
})
