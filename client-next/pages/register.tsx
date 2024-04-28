export default function Register() {
	function handleChange(e) {}

	return (
		<main className="h-screen w-screen bg-[#76ABAE]">
			<div className="h-full w-full flex justify-center align-middle">
				<form className="bg-[#EEEEEE] text-[#222831] m-auto p-10 rounded-xl shadow-lg drop-shadow-xl w-1/2 h-auto">
					<div className="text-center">
						<h1 className="text-4xl font-bold pb-3">Register Now</h1>
						<p className="text-gray-600 mb-5 text-sm">
							Let&apos;s get started. Are you ready to be part of something new?
							Then boldly move forward to join us.
						</p>
					</div>
					<div>
						<div className="grid grid-cols-12 py-2">
							<label className="text-lg pr-2 col-span-3 my-auto">Name: </label>
							<input
								className="bg-[#DDE6ED] py-2 px-3 rounded-lg text-lg outline-none border border-gray-300 focus:border-gray-500 col-span-9"
								name="name"
								placeholder="Name here"
								onChange={handleChange}
							/>
						</div>
						<div className="grid grid-cols-12 py-2">
							<label className="text-lg pr-2 col-span-3 my-auto">Email: </label>
							<input
								className="bg-[#DDE6ED] py-2 px-3 rounded-lg text-lg outline-none border border-gray-300 focus:border-gray-500 col-span-9"
								name="email"
								placeholder="Email here"
								onChange={handleChange}
							/>
						</div>
						<div className="grid grid-cols-12 py-2">
							<label className="text-lg pr-2 col-span-3 my-auto">
								Password:
							</label>
							<input
								className="bg-[#DDE6ED] py-2 px-3 rounded-lg text-lg outline-none border border-gray-300 focus:border-gray-500 col-span-9"
								type="password"
								name="password"
								placeholder="Password here"
								onChange={handleChange}
							/>
						</div>
						<div className="grid grid-cols-12 py-2">
							<label className="text-lg pr-2 col-span-3 my-auto">
								Confirm Password:
							</label>
							<input
								className="bg-[#DDE6ED] py-2 px-3 rounded-lg text-lg outline-none border border-gray-300 focus:border-gray-500 col-span-9"
								type="password"
								name="confirm"
								placeholder="Confirm password here"
								onChange={handleChange}
							/>
						</div>
						<div className="flex align-middle justify-center mt-6">
							<button
								type="submit"
								className="bg-blue-700 px-6 rounded-lg text-white py-2 text-md"
							>
								Register
							</button>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
}
