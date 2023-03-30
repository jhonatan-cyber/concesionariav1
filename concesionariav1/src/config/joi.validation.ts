import * as Joi from 'joi';

export const JoinValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
});