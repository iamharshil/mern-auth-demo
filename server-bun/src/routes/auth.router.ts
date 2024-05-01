import { Router } from "express";
import UserModel from "../models/User.model";
import { registerValidation } from "../../helper/validation";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
	try {
		const body = req.body;

		try {
			await registerValidation.validate(body);
		} catch (error: any) {
			return res.status(400).json({ success: false, message: error?.message });
		}

		// check if data is valid and handle if not

		// pretending if data is valid
		const emailExists = await UserModel.findOne({ email: body.email });
		if (emailExists?._id)
			return res
				.status(400)
				.json({ success: false, message: "Email already registered!" });
		const newUser = await UserModel.create({
			name: body.name.trim(),
			email: body.email.trim(),
			password: body.password.trim(),
		});
		if (newUser?._id) return res.status(201).json({ success: true });
		return res.status(400).json({
			success: false,
			message: "Something went wrong, please try again!",
		});
	} catch (error) {
		console.log(">>> ~ file: app.ts:27 ~ app.post ~ error:", error);
		return res
			.status(500)
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
