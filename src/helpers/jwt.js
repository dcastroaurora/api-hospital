import jwt from "jsonwebtoken";
import config from "../config";

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      config.jwt_secret,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Error generating token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
export default generateJWT;
