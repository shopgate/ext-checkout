const Joi = require('joi')
const ValidationError = require('./../errors/ValidationError')
const {schemaItems} = require('./checkoutSchema')

/**
 * @typedef {Object} ValidateItemsInput
 * @property {ExtCheckoutItem[]} items
 */

/**
 * @param {SDKContext} context
 * @param {ValidateItemsInput} input
 */
module.exports = async (context, input) => {
  const itemsValidationResult = Joi.validate(input.items, schemaItems)
  if (itemsValidationResult.error) {
    throw new ValidationError(itemsValidationResult.error.details[0].message)
  }
}
