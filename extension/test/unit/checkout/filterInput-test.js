const assert = require('assert')
const executeStep = require('../../../checkout/filterInput')

describe('filterInput', () => {
  it('Should pack input', async () => {
    const input = {
      properties: ['age', 'name', 'rating'],
      hydratedObject: {
        street: 'sweet street 3',
        name: 'John Doe',
        age: 33,
        id: 111,
        rating: '5 Stars'
      }
    }
    const expected = {
      filteredObject: {
        age: 33,
        name: 'John Doe',
        rating: '5 Stars'
      }
    }

    // noinspection JSCheckFunctionSignatures
    const output = await executeStep({}, input)
    assert.deepEqual(output, expected)
  })
})
