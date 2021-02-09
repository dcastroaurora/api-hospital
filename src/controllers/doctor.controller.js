import { response } from "express";
import Doctor from "../models/Doctor";

export const getDoctors = async (req, res = response) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email")
      .populate("hospitalId", "name");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the doctors",
    });
  }
};

export const createDoctor = async (req, res = response) => {
  try {
    const doctor = new Doctor(req.body);
    doctor.userId = req.id;
    await doctor.save();

    res.json({
      message: "Doctor created",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while creating the doctor",
    });
  }
};

export const getDoctor = async (req, res = response) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(500).json({
        message: `Doctor with id ${id} does not exists`,
      });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while retrieving a doctor",
    });
  }
};

export const updateDoctor = async (req, res = response) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(400).json({
        message: "Doctor does not exists.",
      });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      message: "Updated doctor",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while updating the doctor",
    });
  }
};

export const deleteDoctor = async (req, res = response) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(400).json({
        message: "Doctor does not exists.",
      });
    }
    await Doctor.findByIdAndDelete(id);
    res.json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while deleting the doctor",
    });
  }
};
