import * as Yup from "yup";

export const registerValidation = Yup.object({
	name: Yup.string().min(3).required("Please enter name"),
	email: Yup.string()
		.email("Please enter valid email")
		.required("Please enter email"),
	password: Yup.string().min(8).required("Please enter password"),
	confirm: Yup.string()
		.oneOf([Yup.ref("password")], "Password not matched")
		.required("Please enter confirm password"),
});
