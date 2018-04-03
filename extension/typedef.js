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
 * @property {boolean} hasCoupons
 * @property {boolean} allowMultipleCoupons
 * @property {string} currency
 * @property {string} legalText
 * @property {string} legalInfo
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
 * @property {function} log.trace
 * @property {function} log.debug
 * @property {function} log.info
 * @property {function} log.warn
 * @property {function} log.error
 * @property {function} log.fatal
 */

/**
 * @typedef {Object} ExtCheckout
 * @property {string} checkoutId
 * @property {ExtCheckoutUser} user
 * @property {ExtCheckoutItem[]} items
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

