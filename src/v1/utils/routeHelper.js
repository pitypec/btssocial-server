import Joi from 'joi';

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmpassword: Joi.any().valid(Joi.ref('password')).required()
});

export const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json(result.error);
    }

    if (!req.value) {
      req.value = {};
    }
    req.value['body'] = result.value;
    next();
  };
};

export const idSchema = Joi.object().keys({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
});

export const validateParam = (schema, name) => {
  return (req, res, next) => {
    const result = schema.validate({ param: req['params'][name] }, shema);
    if (result.error) {
      return res.status(400).json(result.error);
    } else {
      if (!req.value) {
        req.value = {};
      }
      if (!req.value['params']) req.value['params'] = {};
      req.value['params'][name] = value;
      next();
    }
  };
};
