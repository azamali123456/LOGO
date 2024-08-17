import Joi from "joi";

//Channal Validation are Here
const question = {
  body: Joi.object().keys({
    statement: Joi.string().required(),
    tags: Joi.array().items(Joi.string().required()).min(2).required(),
    viewState: Joi.string().required(),
  }),
};
const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default {
  question,
  id,
};
