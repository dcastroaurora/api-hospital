import { response } from "express";
import Doctor from "../models/Doctor";
import Hospital from "../models/Hospital";
import User from "../models/User";
import pagination from "../helpers/pagination";

export const getCollections = async (req, res = response) => {
  try {
    // const paramSearch = req.params.paramSearch;
    // const regex = paramSearch ? new RegExp(paramSearch, "i") : "";
    const { size, page, name } = req.query;
    const condition = name
      ? { name: { $regex: new RegExp(name), $options: "i" } }
      : {};

    const { limit, offset } = pagination(size, page);
    const [users, doctors, hospitals] = await Promise.all([
      User.paginate(condition, {
        limit,
        offset,
      }),
      Doctor.paginate(condition, {
        limit,
        offset,
      }),
      Hospital.paginate(condition, {
        limit,
        offset,
      }),
      // User.find({ name: regex }),
      // Doctor.find({ name: regex }),
      // Hospital.find({ name: regex }),
    ]);

    res.json({
      users: {
        totalItems: users.totalDocs,
        data: users.docs,
        totalPages: users.totalPages,
        currentPage: users.page,
      },
      doctors: {
        totalItems: doctors.totalDocs,
        data: doctors.docs,
        totalPages: doctors.totalPages,
        currentPage: doctors.page,
      },
      hospitals: {
        totalItems: hospitals.totalDocs,
        data: hospitals.docs,
        totalPages: hospitals.totalPages,
        currentPage: hospitals.page,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while retrieving the users",
    });
  }
};

// export const getCollection = async (req, res = response) => {
//   try {
//     const { table, paramSearch } = req.params;
//     const regex = paramSearch ? new RegExp(paramSearch, "i") : "";
//     let data = [];

//     switch (table) {
//       case "users":
//         data = await User.find({ name: regex });
//         break;
//       case "doctors":
//         data = await Doctor.find({ name: regex })
//           .populate("userId", "name image")
//           .populate("hospitalId", "name image");
//         break;
//       case "hospitals":
//         data = await Hospital.find({ name: regex }).populate(
//           "user",
//           "name image"
//         );
//         break;

//       default:
//         return res.status(400).json({
//           message: "Table not found",
//         });
//     }
//     res.json({
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message || "An error occurred while retrieving the users",
//     });
//   }
// };
