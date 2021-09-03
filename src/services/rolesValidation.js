const Joi = require("joi");

const rolesValidation = (data) => {
  const schema = Joi.object({
    adminModule: Joi.boolean().required(),
    hrModule: Joi.boolean().required(),
    financeModule: Joi.boolean().required(),
    ndisModule: Joi.boolean().required(),
    nagModule: Joi.boolean().required(),
  });

  return schema.validate(data);
};

module.exports = { rolesValidation };
