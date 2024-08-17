import express from "express";
const router = express.Router();
import fachionModel from "../model/fachion.js";
import authenticate from "../middelware/auth.js";
import validate from "../middelware/validate.js";
import schema from "../validation/answer.validation.js";

//Create fachion
router.post("/craete", authenticate,  async (req, res) => {
  try {
    req.body.user_id = req.user.id;
    const user = await fachionModel.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get All
router.get("/", authenticate, async (req, res) => {
  try {
    const users = await fachionModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get Specific user answer
router.get("/:id", authenticate,async (req, res) => {
  try {
    const data = await fachionModel.find({ _id: req.params.id });
    const resp = data.map(({ statement, tags }) => ({
      statement,
      tags,
    }));
    res.send({ status: "Success", staCode: 200, data: resp });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update question
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const user = await fachionModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Delete question
router.delete(
  "/:id",
  authenticate,
  validate(schema.params),
  async (req, res) => {
    try {
      const user = await fachionModel.findByIdAndDelete(req.params.id);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
