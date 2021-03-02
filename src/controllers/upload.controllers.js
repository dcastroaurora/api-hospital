import { response } from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import capitalize from "../helpers/capitalize-word";

export const uploadFile = async (req, res = response) => {
  try {
    const { collection, id } = req.params;

    validateCollections(collection, res);

    validateFileExists(req.files, res);

    const file = req.files.image;
    const aFile = file.name.split(".");
    const extension = aFile.pop();

    validateExtension(extension, res);

    //generate name file
    const fileName = `${uuidv4()}.${extension}`;

    //path to save file
    const path = `./uploads/${collection}/${fileName}`;

    //move file
    console.log(path);
    file.mv(path, async (error) => {
      if (error) {
        return res.status(500).json({
          message: "An error occurred while moving the file",
        });
      }

      //update database
      if (await updateImageField(collection, id, fileName)) {
        res.json({
          message: "uploaded successfully",
          fileName,
        });
      } else {
        res.status(404).json({
          message: "No data found with that id",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while uploading the file",
    });
  }
};

export const getFile = (req, res = response) => {
  try {
    const { collection, id } = req.params;
    const pathFile = path.join(__dirname, `../../uploads/${collection}/${id}`);

    if (fs.existsSync(pathFile)) {
      res.sendFile(pathFile);
    } else {
      const pathFile = path.join(__dirname, `../../uploads/no-image.png`);
      res.sendFile(pathFile);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the file",
    });
  }
};

const validateCollections = (collection, res) => {
  const validCollections = ["user", "doctor", "hospital"];
  if (!validCollections.includes(collection)) {
    return res.status(400).json({ message: "Collection not allowed" });
  }
};

const validateFileExists = (files, res) => {
  if (!files || Object.keys(files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded" });
  }
};

const validateExtension = (extension, res) => {
  const validExtensions = ["png", "jpg", "jpeg", "gif"];

  if (!validExtensions.includes(extension)) {
    return res.status(400).json({ message: "Extension not allowed" });
  }
};

const updateImageField = async (collection, id, fileName) => {
  const dbCollection = mongoose.model(capitalize(collection));
  const data = await dbCollection.findById(id);

  if (!data) return false;

  const oldFile = `./uploads/${collection}/${data.image}`;

  if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);

  data.image = fileName;

  await data.save();

  return true;
};
