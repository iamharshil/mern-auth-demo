import { Router } from "express";
import UserModel from "../models/User.model";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
	try {
		const body = req.body;
		console.log(">>> ~ file: auth.router.ts:9 ~ authRouter.post ~ body:", body);
	} catch (error) {
		console.log(">>> ~ file: app.ts:27 ~ app.post ~ error:", error);
		return res
			.status(400)
			.json({ success: false, message: "Internal server error!" });
	}
});

authRouter.post("/login", async (req, res) => {
	try {
		const body = req.body;
		console.log(
			">>> ~ file: auth.router.ts:21 ~ authRouter.post ~ body:",
			body,
		);
	} catch (error) {
		console.log(
			">>> ~ file: auth.router.ts:20 ~ authRouter.post ~ error:",
			error,
		);
		return res
			.status(500)
			.json({ success: false, message: "Internal server error!" });
	}
});

export default authRouter;
