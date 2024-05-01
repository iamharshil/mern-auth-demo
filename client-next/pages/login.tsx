import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { loginValidation } from "@/helper/validation";
import { MdError } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialValue = {
	email: "",
	password: "",
};

export default function Login() {
	const router = useRouter();
	const [inputTypes, setInputTypes] = useState("password");

	return (
		<main className="h-screen w-screen register-bg">
			<div className="h-full w-full flex justify-center align-middle">
				<Formik
					initialValues={initialValue}
					validationSchema={loginValidation}
					onSubmit={async (values, { setSubmitting }) => {
						setSubmitting(true);

						await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							mode: "cors",
							credentials: "include",
							body: JSON.stringify({ ...values }),
						})
							.then((raw) => raw.json())
							.then((res) => {
								if (!res.success) return toast.error(res.message);
								toast.success("Logged in successfully.");
								return router.push("/private");
							})
							.catch(() => {
								return toast.error("Internal server error, please try again!");
							})
							.finally(() => {
								setSubmitting(false);
							});
					}}
				>
					{({ errors, handleSubmit, isSubmitting }) => (
						<Form
							onSubmit={handleSubmit}
							className="register-gm text-[#222831] m-auto p-10 rounded-xl shadow-lg drop-shadow-xl w-1/2 h-auto"
						>
							<div className="text-center">
								<h1 className="text-4xl font-bold pb-3">Login Now</h1>
								<p className="text-gray-600 mb-5 text-sm">
									Login and have fun.!!
								</p>
							</div>
							<div>
								<div className="grid grid-cols-12 py-2">
									<label className="text-lg pr-2 col-span-3 my-auto">
										Email:{" "}
									</label>
									<Field
										type="email"
										name="email"
										className={`bg-[#FFFFFF] py-2 px-3 rounded-lg text-lg outline-none border ${
											errors?.email ? "border-red-600" : "border-gray-300"
										} focus:border-gray-500 col-span-9`}
										placeholder="Email here"
									/>
									<span className="col-span-3" />
									<div className="col-span-9 float-end px-2 text-red-600">
										{errors?.email && (
											<small className="flex flex-row">
												<MdError className="my-auto me-1" />
												{errors.email}
											</small>
										)}
									</div>
								</div>
								<div className="grid grid-cols-12 py-2">
									<label className="text-lg pr-2 col-span-3 my-auto">
										Password:
									</label>
									<div
										className={`bg-[#FFFFFF] rounded-lg text-lg outline-none border ${
											errors.password ? "border-red-600" : "border-gray-300"
										} focus:border-gray-500 col-span-9 grid grid-cols-12`}
									>
										<Field
											type={inputTypes}
											name="password"
											className="bg-[#FFFFFF] rounded-lg text-lg outline-none border-none py-2 px-3 col-span-11"
											placeholder="Password here"
										/>
										<button
											type="button"
											className="col-span-1 mx-auto"
											onClick={() => {
												inputTypes === "password"
													? setInputTypes("text")
													: setInputTypes("password");
											}}
										>
											{inputTypes === "password" ? (
												<RiEyeOffFill />
											) : (
												<RiEyeFill />
											)}
										</button>
									</div>
									<span className="col-span-3" />
									<div className="col-span-9 float-end px-2 text-red-600">
										{errors?.password && (
											<small className="flex flex-row">
												<MdError className="my-auto me-1" />
												{errors.password}
											</small>
										)}
									</div>
								</div>

								<div className="flex align-middle justify-center mt-6">
									<button
										type="submit"
										className="bg-blue-700 px-6 rounded-lg text-white py-2 text-md w-28 "
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<Loader2 className="h-6 w-6 animate-spin m-auto text-2xl" />
											</>
										) : (
											"Login"
										)}
									</button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</main>
	);
}
