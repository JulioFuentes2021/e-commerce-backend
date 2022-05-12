const Joi = require('joi');

const username = Joi.string()
const gmail = Joi.string()
const password = Joi.string().alphanum().min(3).max(15);

export const createUser = Joi.object({
    username: username.required(),
    gmail: gmail.required(),
    password: password.required(),
});

// const loginAndSignInValidator = Joi.object({
//     username: username.required(),
//     password: password.required(),
// })



