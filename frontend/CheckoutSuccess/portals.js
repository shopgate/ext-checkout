const CHECKOUT = 'checkout';
const SUCCESS = 'success';
const BEFORE = 'before';
const AFTER = 'after';
const CONTINUE = 'continue';

export const CHECKOUT_SUCCESS_BEFORE = `${CHECKOUT}.${SUCCESS}.${BEFORE}`;
export const CHECKOUT_SUCCESS = `${CHECKOUT}.${SUCCESS}`;
export const CHECKOUT_SUCCESS_AFTER = `${CHECKOUT}.${SUCCESS}.${AFTER}`;

export const CHECKOUT_SUCCESS_CONTINUE = `${CHECKOUT}.${SUCCESS}.${CONTINUE}`;
