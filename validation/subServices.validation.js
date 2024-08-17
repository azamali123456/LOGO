import Joi from 'joi';

//Channal Validation are Here
const channal = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    channalName: Joi.string().required(),
    email: Joi.string().required(),
    description: Joi.string().required(),
    channalTages: Joi.string().required(),
    professionName: Joi.string().required(),
    professionExperience: Joi.string().required(),
    reasonForChannal: Joi.string().required(),
    lastDegree: Joi.string().required(),
    anyCertificate: Joi.string().required(),
    address: Joi.string().required(),
    user_id: Joi.string().required(),
  }),
};
const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default {
  channal,
  id,
};
