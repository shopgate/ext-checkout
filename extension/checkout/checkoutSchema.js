const Joi = require('joi')

const schemaSingleItem = {
  id: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string().valid(['product', 'coupon']).required(),
  unitPrice: Joi.number().integer(), // -100 | 0 | 100
  quantity: Joi.number().positive().integer().min(1) // 1 | 2 | ...
}
const schemaItems = Joi.array().min(1).items(schemaSingleItem)

module.exports = {
  schemaItems
}
