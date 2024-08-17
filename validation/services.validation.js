import Joi from "joi";
//All Validation are Here
const create = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    discription: Joi.string().required(),
    imageUrl: Joi.string().required(),
    firmType: Joi.string().required(),
    // subServices: Joi.array().items(Joi.object().required()).required(),
  }),
};
const update = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    discription: Joi.string().required(),
    imageUrl: Joi.string().required(),
    firmType: Joi.string().required(),
    // subServices: Joi.array().items(Joi.object().required()).required(),
  }),
};

export default {
  create,
  update,
};
