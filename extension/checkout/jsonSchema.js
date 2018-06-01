const Joi = require('joi')

// totals schema
const totalsSchema = Joi.array().min(1).items(
  Joi.object().keys({
    id: Joi.string().required(),
    label: Joi.string().required(),
    amount: Joi.number().required()
  })
)

module.exports = {
  totalsSchema
}
