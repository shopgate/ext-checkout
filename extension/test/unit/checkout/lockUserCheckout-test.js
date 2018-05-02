const assert = require('assert')
const InternalError = require('../../../common/Error/InternalError')
const CheckoutInProgressError = require('../../../common/Error/CheckoutInProgressError')
const executeStep = require('../../../checkout/lockUserCheckout')
const createContext = require('../../mock/createContext')

describe('lockUserCheckout', () => {
  const storageName = 'user'
  /** @type {LockUserCheckoutInput} */
  const input = { lockDuration: 20 }

  it('Should throw an internal error on storage errors', async () => {
    const contextGetFail = createContext(storageName, () => {}, () => { throw new Error() })
    const contextSetFail = createContext(storageName, () => { throw new Error() })

    let getError
    try {
      await executeStep(contextGetFail, input)
      assert.fail()
    } catch (err) {
      getError = err
    }

    let setError
    try {
      await executeStep(contextSetFail, input)
      assert.fail()
    } catch (err) {
      setError = err
    }

    assert(getError instanceof InternalError && setError instanceof InternalError)
  })

  it('Should not fail other than on storage error', async () => {
    try {
      await executeStep(createContext(storageName), input)
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should use the correct data storage key', async () => {
    const expectedDataStorageKey = 'checkoutLock'
    let loadKey = null
    let saveKey = null
    const context = createContext(
      storageName,
      (key) => { loadKey = key },
      (key) => { saveKey = key }
    )
    await executeStep(context, input)

    // test both in this test for simplicity
    assert.equal(loadKey, expectedDataStorageKey)
    assert.equal(saveKey, expectedDataStorageKey)
  })

  it('Should throw an error if a lock is still valid', async () => {
    // simulate timestamp that is less than a second old
    // -> round off milliseconds, to put it slightly into the past
    const lockTime = (new Date()).getTime() + input.lockDuration * 1000

    const context = createContext(storageName, () => ({ id: 1, time: lockTime }))

    try {
      await executeStep(context, input)
      assert.fail()
    } catch (err) {
      assert(err instanceof CheckoutInProgressError)
    }
  })

  it('Should continue when a saved lock is expired', async () => {
    // simulate timestamp that is 30 seconds old
    const lockTime = (new Date()).getTime() - input.lockDuration * 1000

    const context = createContext(storageName, () => ({ id: 1, time: lockTime }))

    try {
      await executeStep(context, input)
    } catch (err) {
      assert.ifError(err)
    }
  })

  it('Should save the lock into the user storage', async () => {
    const userStorageName = 'user'
    let writeStorageName = null
    const context = createContext(
      userStorageName,
      () => {},
      () => { writeStorageName = userStorageName }
    )

    await executeStep(context, input)
    assert.equal(writeStorageName, userStorageName)
  })

  it('Should save a lock id and time', async () => {
    /** @type {ExtCheckoutLock} */
    let writtenData
    const context = createContext(
      storageName,
      () => {},
      (key, data) => { writtenData = data }
    )

    await executeStep(context, input)
    assert(writtenData && writtenData.id && writtenData.time)
  })

  it('Should return the saved lock wrapped under checkoutLock property', async () => {
    /** @type {ExtCheckoutLock} */
    let savedLock = {}
    const context = createContext(
      storageName,
      () => {},
      (key, data) => { savedLock = data }
    )

    /** @type {LockUserCheckoutOutput} */
    const returnedLock = await executeStep(context, input)
    assert.deepEqual(returnedLock, { checkoutLock: savedLock })
  })
})
