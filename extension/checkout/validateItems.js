const Joi = require('joi')
const ValidationError = require('./../errors/ValidationError')

/**
 * @typedef {Object} ValidateItemsInput
 * @property {ExtCheckoutItem[]} items
 */

/**
 * @param {SDKContext} context
 * @param {ValidateItemsInput} input
 */
module.exports = async (context, input) => {
  const schemaSingleItem = {
    id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().valid(['product', 'coupon']).required(),
    unitPrice: Joi.number().integer(), // -100 | 0 | 100
    quantity: Joi.number().positive().integer().min(1) // 1 | 2 | ...
  }

  const schemaArrayOfItems = Joi.array().items(schemaSingleItem)

  const result = Joi.validate(input.items, schemaArrayOfItems)
  if (result.error) {
    throw new ValidationError(result.error.details[0].message)
  }
}
