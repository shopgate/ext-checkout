const assert = require('assert')
const executeStep = require('../../../checkout/packInput')

describe('packInput', () => {
  it('Should pack input', async () => {
    const input = {
      id: 111,
      name: 'John Doe'
    }
    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, {data: input})
  })
})
