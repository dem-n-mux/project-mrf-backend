import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import candidateRoutes from "./routes/candidate.route.js";
import formRoutes from "./routes/form.route.js";
import settingsRoutes from "./routes/settings.route.js";
import leadsRoutes from "./routes/lead.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/form", formRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB().then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
