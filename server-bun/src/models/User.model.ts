import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
);

UserSchema.pre(
	"save",
	function (this: { isModified: any; password: string; token: string }, next) {
		if (!this.isModified("password") && !this.isModified("token"))
			return next();
		if (this.isModified("password")) {
			this.password = bcrypt.hashSync(this.password, 10);
			next();
		} else {
			this.token = bcrypt.hashSync(this.token, 10);
			next();
		}
	},
);

UserSchema.methods.comparePassword = function (plaintext: string) {
	return bcrypt.compareSync(plaintext, this.password);
};

UserSchema.methods.compareToken = function (plaintext: string) {
	return bcrypt.compareSync(plaintext, this.token);
};

export default models.User || model("User", UserSchema);
