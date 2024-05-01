import { Router } from "express";
import UserModel from "../models/User.model";
import { loginValidation, registerValidation } from "../../helper/validation";
import { decryptToken, generateToken } from "../../helper/auth";

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

authRouter.get("/verify", async (req, res) => {
	try {
		const cookie = req.cookies["access-token"];
		if (!cookie) return res.status(401).json({ success: false });
		const dec_token = await decryptToken(cookie);
		if (!dec_token) return res.status(401).json({ success: false });
		return res.status(200).json({ success: true });
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
authRouter.post("/login", async (req, res) => {
	try {
		const body = req.body;

		try {
			await loginValidation.validate(body);
		} catch (error: any) {
			return res.status(400).json({ success: false, message: error?.message });
		}
		const user = await UserModel.findOne({ email: body.email });
		if (!user?._id)
			return res
				.status(400)
				.json({ success: false, message: "Please enter valid credentials!" });

		// use comparePassword method from User model
		if (!user.comparePassword(body.password))
			return res
				.status(400)
				.json({ success: false, message: "Please enter valid credentials!" });

		// gen token
		const token = await generateToken(user._id);
		const refreshToken = await generateToken(user._id, "30d");
		if (!token || !refreshToken)
			return res
				.status(500)
				.json({ success: false, message: "Internal server error!" });

		// set cookie
		res.cookie("access-token", token, {
			maxAge: 60 * 60 * 60,
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});
		res.cookie("refresh-token", refreshToken, {
			maxAge: 60 * 60 * 60 * 24 * 30,
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});
		return res.status(200).json({ success: true });
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
