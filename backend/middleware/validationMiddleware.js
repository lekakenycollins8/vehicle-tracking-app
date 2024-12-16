const Joi = require('joi');

// Validation schemas
const schemas = {
    registration: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        name: Joi.string().min(2).required(),
        company: Joi.string().optional()
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    vehicle: Joi.object({
        name: Joi.string().required(),
        uniqueId: Joi.string().required(),
        category: Joi.string().optional(),
        attributes: Joi.object().optional()
    })
};

// Validation middleware factory
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path[0],
                message: detail.message
            }));
            
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors
            });
        }
        next();
    };
};

// Export validation middlewares
module.exports = {
    validateRegistration: validate(schemas.registration),
    validateLogin: validate(schemas.login),
    validateVehicle: validate(schemas.vehicle)
};
