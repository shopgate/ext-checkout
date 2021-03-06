/**
 * @typedef {Object} SDKContext
 * @property {ExtensionConfig} config
 * @property {SDKContextMeta} meta
 * @property {SDKContextStorage} storage
 * @property {SDKContextLog} log
 * @property {function} tracedRequest
 */

/**
 * @typedef {Object} ExtensionConfig
 * @property {string} currency
 */

/**
 * @typedef {Object} SDKContextMeta
 * @property {string} deviceId
 * @property {string} appId
 * @property {string} userId
 * @property {string} appLanguage
 */

/**
 * @typedef {Object} SDKContextStorage
 * @property {SDKContextEntityStorage} extension
 * @property {SDKContextEntityStorage} device
 * @property {SDKContextEntityStorage} user
 */

/**
 * @typedef {Object} SDKContextEntityStorage
 * @property {function} get - (string key, function cb)
 * @property {function} set - (string key, mixed value, function cb)
 * @property {function} del - (string key, function cb)
 */

/**
 * @typedef {Object} SDKContextLog
 * @property {function} trace
 * @property {function} debug
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 * @property {function} fatal
 */

/**
 * @typedef {Object} ExtCheckout
 * @property {?ExtCheckoutUser} user
 * @property {?ExtCheckoutItem[]} items
 * @property {?ExtCheckoutAddress} shippingAddress
 * @property {?ExtCheckoutAddress} billingAddress
 * @property {?ExtCheckoutShippingMethod} shippingMethod
 * @property {?ExtCheckoutPaymentMethod} paymentMethod
 * @property {?ExtCheckoutTransaction[]} transactions
 * @property {?Object} customFields
 * @property {string} checkoutId
 * @property {?string} orderId
 * @property {?string} currency
 * @property {?number} taxAmount
 * @property {?number} total
 */

/**
 * @typedef {Object} ExtCheckoutLock
 * @property {string} id
 * @property {number} time in milliseconds  till when lock is valid
 */

/**
 * @typedef {Object} ExtCheckoutUser
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} mail
 */

/**
 * @typedef {Object} ExtCheckoutItem
 * @property {string} id
 * @property {string} name
 * @property {string} type
 * @property {number} unitPrice
 * @property {number} quantity
 */

/**
 * @typedef {Object} ExtCheckoutAddress
 */

/**
 * @typedef {Object} ExtCheckoutShippingMethod
 * @property {string} id
 * @property {string} name
 * @property {number} amount
 * @property {number} taxAmount
 */

/**
 * @typedef {Object} ExtCheckoutPaymentMethod
 * @property {string} id
 * @property {string} name
 * @property {number} amount
 * @property {number} taxAmount
 */

/**
 * @typedef {Object} ExtCheckoutTransaction
 */
