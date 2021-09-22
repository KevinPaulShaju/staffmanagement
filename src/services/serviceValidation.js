const Joi = require("joi");

const serviceValidation = (data) => {
  const schema = Joi.object({
    serviceName: Joi.string().required(),
    serviceCode: Joi.number().required().unsafe(),
    weekdayEarly: Joi.number().unsafe(),
    weekdayEarlyCode: Joi.number().unsafe().when("weekdayEarly", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    weekdayNormal: Joi.number().unsafe(),
    weekdayNormalCode: Joi.number().unsafe().when("weekdayNormal", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    weekdayLate: Joi.number().unsafe(),
    weekdayLateCode: Joi.number().unsafe().when("weekdayLate", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    weekendEarly: Joi.number().unsafe(),
    weekendEarlyCode: Joi.number().unsafe().when("weekendEarly", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    weekendNormal: Joi.number().unsafe(),
    weekendNormalCode: Joi.number().unsafe().when("weekendNormal", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    weekendLate: Joi.number().unsafe(),
    weekendLateCode: Joi.number().unsafe().when("weekendLate", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    publicHolidayEarly: Joi.number().unsafe(),
    publicHolidayEarlyCode: Joi.number().unsafe().when("publicHolidayEarly", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    publicHolidayNormal: Joi.number().unsafe(),
    publicHolidayNormalCode: Joi.number().unsafe().when("publicHolidayNormal", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    publicHolidayLate: Joi.number().unsafe(),
    publicHolidayLateCode: Joi.number().unsafe().when("publicHolidayLate", {
      is: Joi.exist(),
      then: Joi.number().required().unsafe(),
    }),
    sleepover: Joi.number().unsafe(),
    tax: Joi.number().unsafe(),
  });

  return schema.validate(data);
};

module.exports = { serviceValidation };
