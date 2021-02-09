import { response } from "express";
import Doctor from "../models/Doctor";
import Hospital from "../models/Hospital";
import User from "../models/User";

export const getCollections = async (req, res = response) => {
  try {
    const paramSearch = req.params.paramSearch;
    const regex = paramSearch ? new RegExp(paramSearch, "i") : "";

    const [users, doctors, hospitals] = await Promise.all([
      User.find({ name: regex }),
      Doctor.find({ name: regex }),
      Hospital.find({ name: regex }),
    ]);

    res.json({
      users,
      doctors,
      hospitals,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the users",
    });
  }
};

export const getCollection = async (req, res = response) => {
  try {
    const { table, paramSearch } = req.params;
    const regex = paramSearch ? new RegExp(paramSearch, "i") : "";
    let data = [];

    switch (table) {
      case "users":
        data = await User.find({ name: regex });
        break;
      case "doctors":
        data = await Doctor.find({ name: regex })
          .populate("userId", "name image")
          .populate("hospitalId", "name image");
        break;
      case "hospitals":
        data = await Hospital.find({ name: regex }).populate(
          "user",
          "name image"
        );
        break;

      default:
        return res.status(400).json({
          message: "Table not found",
        });
    }
    res.json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the users",
    });
  }
};
