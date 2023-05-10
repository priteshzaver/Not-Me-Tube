import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export const Register = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [imageLocation, setImageLocation] = useState(null);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const registerClick = (event) => {
		event.preventDefault();
		if (password && password !== confirmPassword) {
			alert("Passwords don't match. Do better.");
		} else {
			const userProfile = {
				firstName,
				lastName,
				displayName,
				imageLocation,
				email,
			};
			register(userProfile, password).then(() => navigate("/login"));
		}
	};

	return (
		<div className="flex">
			<div className="border-primary Border m-auto w-full max-w-md rounded-lg border bg-white px-16 py-10 shadow-2xl">
				<h1 className="mb-4 mt-4 text-center text-6xl font-medium">Register</h1>
				<form onSubmit={registerClick} className="grid grid-cols-1 gap-y-2">
					<fieldset>
						<label htmlFor="firstName" className="pl-3">
							First Name
						</label>
						<input
							id="firstName"
							type="text"
							onChange={(event) => setFirstName(event.target.value)}
							className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="lastName" className="pl-3">
							Last Name
						</label>
						<input
							id="lastName"
							type="text"
							onChange={(event) => setLastName(event.target.value)}
							className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="displayName" className="pl-3">
							Display Name
						</label>
						<input
							id="displayName"
							type="text"
							onChange={(event) => setDisplayName(event.target.value)}
							className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="email" className="pl-3">
							Email
						</label>
						<input
							id="email"
							type="text"
							onChange={(event) => setEmail(event.target.value)}
							className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="imageLocation" className="pl-3">
							Profile Image URL
						</label>
						<input
							id="imageLocation"
							type="text"
							onChange={(event) => setImageLocation(event.target.value)}
							className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="password" className="pl-3">
							Password
						</label>
						<input
							id="password"
							type="password"
							onChange={(event) => setPassword(event.target.value)}
							className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="confirmPassword" className="pl-3">
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							type="password"
							onChange={(event) => setConfirmPassword(event.target.value)}
							className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
						/>
					</fieldset>
					<div className="mt-6 flex items-center justify-center">
						<button type="submit" className="btn-primary">
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
