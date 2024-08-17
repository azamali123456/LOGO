import express from "express";
const router = express.Router();
import servicesModel from "../model/services.js";
import authenticate from "../middelware/auth.js";
import validate from "../middelware/validate.js";
import schema from "../validation/services.validation.js";
import path from 'path';
import mongoose from 'mongoose'
import fs from 'fs';

// Create Services
router.post("/create", authenticate, async (req, res) => {
  try {

    if (req.body.imageUrl) {
      const { imageUrl } = req.body;
      const base64Data = imageUrl.replace(/^data:image\/png;base64,/, "");
      const filename = Date.now() + '.png';
      const imagePath = path.join("__dirname", '..',"images", filename).replace(/\\/g, '/');
      const serverUrl = "http://localhost:3000"; // Update this with your server URL
      const imageUrl1 = `${serverUrl}/${imagePath}`;
      req.body.imageUrl = imageUrl1;
      fs.writeFile(imagePath, base64Data, 'base64', function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to save image' });
        } 
      });
    }
    const services = await servicesModel.create(req.body);
    res.send({message:'successfully registered!',data:services});
  } catch (error) {
    res.status(500).send(error);
  }
});
//Get Services List
router.get("/list", authenticate, async (req, res) => {
  try {
    const services = await servicesModel.find();
    res.send({message:'Services list!',data:services});

  } catch (error) {
    res.status(500).send(error);
  }
});
//Update Services
router.patch(
  "/update/:id",
  authenticate,
  async (req, res) => {
    try {

      if (req.body.imageUrl) {
        const { imageUrl } = req.body;
        const base64Data = imageUrl.replace(/^data:image\/png;base64,/, "");
        const filename = Date.now() + '.png';
        const imagePath = path.join("__dirname", '..',"images", filename).replace(/\\/g, '/');
        const serverUrl = "http://localhost:3000"; // Update this with your server URL
        const imageUrl1 = `${serverUrl}/${imagePath}`;
        req.body.imageUrl = imageUrl1;
        fs.writeFile(imagePath, base64Data, 'base64', function (err) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to save image' });
          } 
        });
      }
      const services = await servicesModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      const updatedData =  await servicesModel.findOne({_id:mongoose.Types.ObjectId(req.params.id)});
      res.send({message:'Updated successfully!',data:updatedData});

    } catch (error) {
      res.status(500).send(error);
    }
  }
);
//Delete Services
router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const services = await servicesModel.findByIdAndDelete(req.params.id);
    res.send({message:'successfully deleted!',data:services});
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
