import express from "express";
import morgan from "morgan";
import cors from "cors";
import UserRoutes from "./routes/users.routes";
import AuthRoutes from "./routes/auth.routes";

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);

export default app;
