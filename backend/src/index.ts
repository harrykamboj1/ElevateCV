import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth/authRoutes";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
