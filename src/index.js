import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import candidateRoutes from "./routes/candidate.route.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/candidates', candidateRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDB().then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
