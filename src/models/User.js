import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "USER_ROLE",
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.method("toJSON", function () {
  const { _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

schema.plugin(paginate);

export default model("User", schema);
