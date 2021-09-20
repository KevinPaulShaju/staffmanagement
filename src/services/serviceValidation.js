const Joi = require("joi");

const serviceValidation = (data) => {
  const schema = Joi.object({
    serviceName: Joi.string().required(),
    serviceCode: Joi.number().required().unsafe(),
    weekdayEarly: Joi.number().required().unsafe(),
    weekdayEarlyCode: Joi.number().required().unsafe(),
    weekdayNormal: Joi.number().required().unsafe(),
    weekdayNormalCode: Joi.number().required().unsafe(),
    weekdayLate: Joi.number().required().unsafe(),
    weekdayLateCode: Joi.number().required().unsafe(),
    weekendEarly: Joi.number().required().unsafe(),
    weekendEarlyCode: Joi.number().required().unsafe(),
    weekendNormal: Joi.number().required().unsafe(),
    weekendNormalCode: Joi.number().required().unsafe(),
    weekendLate: Joi.number().required().unsafe(),
    weekendLateCode: Joi.number().required().unsafe(),
    publicHolidayEarly: Joi.number().required().unsafe(),
    publicHolidayEarlyCode: Joi.number().required().unsafe(),
    publicHolidayNormal: Joi.number().required().unsafe(),
    publicHolidayNormalCode: Joi.number().required().unsafe(),
    publicHolidayLate: Joi.number().required().unsafe(),
    publicHolidayLateCode: Joi.number().required().unsafe(),
    sleepover: Joi.number().required().unsafe(),
    tax: Joi.number().required().unsafe(),
  });

  return schema.validate(data);
};

module.exports = { serviceValidation };
