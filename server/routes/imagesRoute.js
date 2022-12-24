const express = require("express");
const router = express.Router();
const verify = require("./verifyTokens");
const Image = require("../models/image");
const multer = require("multer");
// const path = require("path");
const fs = require("fs");

// set storage engine
// const Storage = multer.diskStorage({
//   destination: "upload",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname + Date.now());
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // <-- Use the original file name
  },
});

// init upload
const upload = multer({ storage: storage }).single("file");

// get a list of images from the database
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.json({ message: err });
  }
});

// add a new image to database
// router.post("/images",  (req, res) => {
//   const image = new Image(req.body);
//   image.save().then((data) => {
//     res.json(data);
//   }).catch((err) => {
//     res.json({message: err});
//   });
// });
router.post("/", upload, async (req, res) => {
  console.log(req.file);
  console.log(upload);
  const image = new Image({
    name: req.body.name,
    desc: req.body.desc,
    path: "../../server/upload/" + req.file.filename,
    // image: {
    //   data: req.file.filename,
    //   contentType: req.file.mimetype,
    // },
  });

  try {
    const saveImage = await image.save();
    res.json(saveImage);
  } catch (err) {
    res.json({ message: err });
  }
});

// get a specific image from the database
router.get("/:imageId", async (req, res) => {
  try {
    const image = await Image.findById(req.params.imageId);
    res.json(image);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete a specific image from the database
router.delete("/:imageId", verify, async (req, res) => {
  try {
    const removedImage = await Image.remove({ _id: req.params.imageId });
    res.json(removedImage);
  } catch (err) {
    res.json({ message: err });
  }
});

// update a specific image from the database
router.patch("/:imageId", verify, async (req, res) => {
  try {
    const updatedImage = await Image.updateOne(
      { _id: req.params.imageId },
      { $set: { name: req.body.name, desc: req.body.desc, img: req.body.img } }
    );
    res.json(updatedImage);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
