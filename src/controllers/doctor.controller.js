import { response } from "express";
import fs from "fs";
import pagination from "../helpers/pagination";
import Doctor from "../models/Doctor";

export const getDoctors = async (req, res = response) => {
  try {
    const { size, page, name } = req.query;
    const condition = name
      ? { name: { $regex: new RegExp(name), $options: "i" } }
      : {};

    const { limit, offset } = pagination(size, page);
    const doctors = await Doctor.paginate(condition, { limit, offset });

    res.json({
      totalItems: doctors.totalDocs,
      data: doctors.docs,
      totalPages: doctors.totalPages,
      currentPage: doctors.page,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the doctors",
    });
  }
};

export const createDoctor = async (req, res = response) => {
  const userId = req.id;
  try {
    const doctor = new Doctor(req.body);
    doctor.userId = userId;
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
    res.json({
      message: "Doctor retrieved",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while retrieving a doctor",
    });
  }
};

export const updateDoctor = async (req, res = response) => {
  const { id } = req.params;
  const userId = req.id;

  try {
    const doctorExists = await Doctor.findById(id);

    if (!doctorExists) {
      return res.status(400).json({
        message: "Doctor does not exists.",
      });
    }

    req.body.userId = userId;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      message: "Updated doctor",
      doctor,
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
    await Doctor.findByIdAndDelete(id).then(() => {
      const oldFile = `./uploads/doctor/${doctor.image}`;
      if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile);
    });
    res.json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while deleting the doctor",
    });
  }
};
