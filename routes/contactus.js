import express from "express";
const router = express.Router();
import contactModel from "../model/contactus.js";
import authenticate from "../middelware/auth.js";
import validate from "../middelware/validate.js";


//Create Contact Form
router.post( "/create",authenticate,async (req, res) => {
    try {
      const question = await contactModel.create(req.body);
      res.send(question);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//Get contact-us list with user
router.get("/list", authenticate, async (req, res) => {
  try {
    const data = await contactModel.aggregate([
      {
        $lookup: {
          from: "User",
          localField: "_id",
          foreignField: "userId",
          as: "user",
        },
      },
    ]);
    // const newArray = [];
    // data.map((obj) => {
    //   if (obj.user_id === req.user.id) {
    //     return newArray.push(obj);
    //   } else {
    //   }
    // });

    res.send({ message: "User Contacted With You!",  data: data });
  } catch (error) {
    res.status(500).send(error);
  }
});



export default router;
