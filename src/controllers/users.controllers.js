import { response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import generateJWT from "../helpers/jwt";

export const getUsers = async (req, res = response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving users",
    });
  }
};

export const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = await generateJWT(user.id);

    res.json({
      message: "User created",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving users",
    });
  }
};

export const getUser = async (req, res = response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(500).json({
        message: `User with id ${id} does not exists`,
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving user",
    });
  }
};

export const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(400).json({
        message: "User does not exists.",
      });
    }

    if (userExists.email == email) {
      delete req.body.email;
    } else {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(400).json({
          message: "Email already exists.",
        });
      }
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
      message: "User Updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving user",
    });
  }
};

export const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(400).json({
        message: "User does not exists.",
      });
    }
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving User",
    });
  }
};
