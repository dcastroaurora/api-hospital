import express from "express";
import morgan from "morgan";
import cors from "cors";
import UserRoutes from "./routes/user.routes";
import AuthRoutes from "./routes/auth.routes";
import HospitalRoutes from "./routes/hospital.routes";
import DoctorRoutes from "./routes/doctor.routes";
import SearchRoutes from "./routes/search.routes";
import UploadRoutes from "./routes/upload.routes";

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

app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/hospital", HospitalRoutes);
app.use("/api/doctor", DoctorRoutes);
app.use("/api/search", SearchRoutes);
app.use("/api/upload", UploadRoutes);

export default app;
