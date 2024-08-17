import express, { application } from 'express';
const router = express.Router();
import subServicesModel from '../model/subServices.js';
import authenticate from '../middelware/auth.js';
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
//Register Sub-services
router.post('/create', authenticate, async (req, res) => {
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
    const subServices = await subServicesModel.create(req.body);
    res.send({message:'rehistered successfully!',data:subServices});

  } catch (error) {
    res.status(500).send(error);
  }
});
//Get subServices by Id
router.get('/:id', authenticate,  async (req, res) => {
  try {
    const subServices = await subServicesModel.find({servicesId : req.params.id});
    res.send({message:'Sub-Services list!',data:subServices});

  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/update/:id', authenticate,  async (req, res) => {
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
    const subServices = await subServicesModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    const updatedData =  await subServicesModel.findOne({_id:mongoose.Types.ObjectId(req.params.id)});
    res.send({message:'Updated successfully!',data:updatedData});
  } catch (error) {
    res.status(500).send(error);
  }
});
router.patch('/delete/:id', authenticate,  async (req, res) => {
  try {
    const subServices = await subServicesModel.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id));
    res.send({message:'Deleted successfully!',data:subServices});
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
