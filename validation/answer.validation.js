import Joi from "joi";

//Channal Validation are Here
const answer = {
  body: Joi.object().keys({
    ansStatement: Joi.string().required(),
    questionId: Joi.string().required(),
    viewState: Joi.string().required(),
  }),
};
const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default {
  answer,
  id,
};
