const assert = require('assert')
const executeStep = require('../../../checkout/packInput')

describe('packInput', () => {
  it('Should pack input into an object with the given objects as properties of the output', async () => {
    const input = {
      street: 'sweet street 3',
      name: 'John Doe',
      age: 33,
      id: 111,
      rating: '5 Stars'
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, {data: input})
  })
})
