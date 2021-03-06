import { response } from "express";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User";
import generateJWT from "../helpers/jwt";
import config from "../config";
import menu from "../helpers/menu";

const client = new OAuth2Client(config.google_id);

export const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      message: "Login successful",
      token,
      menu: menu(user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "There was an error when logging in",
    });
  }
};

export const google = async (req, res = response) => {
  const tokenGoogle = req.body.token;

  try {
    const { name, email, picture } = await verify(tokenGoogle);
    const user = await User.findOne({ email });
    let newUser;

    if (!user) {
      newUser = new User({
        name,
        email,
        password: "###",
        image: picture,
        google: true,
      });
    } else {
      newUser = user;
      newUser.google = true;
    }

    await newUser.save();

    const token = await generateJWT(newUser.id);

    res.json({
      message: "Login Google Successfull",
      token,
      menu: menu(newUser.role),
    });
  } catch (error) {
    res.status(401).json({
      message: "An error occurred while authenticating to Google",
    });
  }
};

export const renewToken = async (req, res = response) => {
  const id = req.id;
  try {
    const user = await User.findById(id);
    const token = await generateJWT(id);
    res.json({
      token,
      user,
      message: "New token was generated successfully",
      menu: menu(user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while renewing the token",
    });
  }
};

const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.google_id, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return payload;
};
