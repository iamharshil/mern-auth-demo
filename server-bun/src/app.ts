import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes/index.router";
import Database from "./utils/Database";

// config
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors({ credentials: true, origin: process.env.BASE_URL }));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/hello-world", (req, res) => {
	res.send("Hello World");
});

app.use("/api/v1/", router);

app.all("*", (req, res) => {
	return res.status(404).json({ success: false, message: "Api not found.!!" });
});

// listen
app.listen(PORT, async () => {
	await Database();
	console.log(`Server is running on http://localhost:${PORT}`);
});
