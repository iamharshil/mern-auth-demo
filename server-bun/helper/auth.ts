import crypto from "node:crypto";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function generateToken(user: { _id: string }, expire = "30m") {
	try {
		const enc: string = process.env.ENCRYPTION_METHOD || "aes-256-cbc";
		const key: string = process.env.SECRET_KEY || "secret key";
		const iv: string = process.env.SECRET_IV || "secret iv";
		const sec: string = process.env.JWT_SECRET || "jwt secret";

		const cipher = crypto.createCipheriv(enc, key, iv);

		const enc_token = Buffer.from(
			cipher.update(user._id.toString(), "utf-8", "hex") + cipher.final("hex"),
		).toString("base64");

		return jwt.sign({ token: enc_token }, sec, {
			expiresIn: expire,
		});
	} catch (error) {
		console.log(">>> ~ file: auth.ts:24 ~ error:", error);
		return null;
	}
}

export async function decryptToken(token: string) {
	try {
		const enc: string = process.env.ENCRYPTION_METHOD || "aes-256-cbc";
		const key: string = process.env.SECRET_KEY || "secret key";
		const iv: string = process.env.SECRET_IV || "secret iv";
		const sec: string = process.env.JWT_SECRET || "jwt secret";

		const decipher = crypto.createDecipheriv(enc, key, iv);

		const dec_token = jwt.verify(token, sec) as JwtPayload;

		return Buffer.from(
			decipher.update(dec_token?.token, "base64", "hex") +
				decipher.final("hex"),
			"hex",
		).toString("utf-8");
	} catch (error) {
		console.log(">>> ~ file: auth.ts:43 ~ decryptToken ~ error:", error);
		if (error instanceof jwt.TokenExpiredError) return true;
		return false;
	}
}
