import { response } from "express";
import Hospital from "../models/Hospital";

export const getHospitals = async (req, res = response) => {
  try {
    const hospitals = await Hospital.find().populate("userId", "name email");
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the hospitals",
    });
  }
};

export const createHospital = async (req, res = response) => {
  const userId = req.id;
  try {
    const hospital = new Hospital(req.body);
    hospital.userId = userId;
    await hospital.save();

    res.json({
      message: "Hospital created",
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while creating the hospital",
    });
  }
};

export const getHospital = async (req, res = response) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(500).json({
        message: `Hospital with id ${id} does not exists`,
      });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while retrieving a hospital",
    });
  }
};

export const updateHospital = async (req, res = response) => {
  const { id } = req.params;
  const userId = req.id;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital does not exists.",
      });
    }

    req.body.userId = userId;
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      message: "Updated hospital",
      hospital: updatedHospital,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while updating the hospital",
    });
  }
};

export const deleteHospital = async (req, res = response) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital does not exists.",
      });
    }
    await Hospital.findByIdAndDelete(id);
    res.json({ message: "Hospital deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while deleting the hospital",
    });
  }
};
