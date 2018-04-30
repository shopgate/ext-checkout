const assert = require('assert')
const UnauthorizedError = require('./../../../common/Error/UnauthorizedError')
const executeStep = require('../../../checkout/checkLoginStatus')
const createContext = require('../../mock/createContext')

describe('checkLoginStatus', () => {
  it('Should throw an UnauthorizedError if the user is not logged in', async () => {
    try {
      await executeStep(createContext())
      assert.fail()
    } catch (err) {
      assert(err instanceof UnauthorizedError)
    }
  })

  it('Should not fail if the user is logged in', async () => {
    try {
      await executeStep(createContext('user', () => {}, () => {}, () => {}, 1))
    } catch (err) {
      assert.ifError(err)
    }
  })
})
