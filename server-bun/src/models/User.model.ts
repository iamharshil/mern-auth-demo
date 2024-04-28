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
	},
	{ timestamps: true },
);

UserSchema.pre(
	"save",
	function (this: { isModified: any; password: string }, next) {
		if (!this.isModified("password")) return next();
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	},
);

UserSchema.methods.comparePassword = function (plaintext: string) {
	return bcrypt.compareSync(plaintext, this.password);
};

export default models.User || model("User", UserSchema);
