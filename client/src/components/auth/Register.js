import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export const Register = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [displayName, setDisplayName] = useState();
	const [email, setEmail] = useState();
	const [imageLocation, setImageLocation] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	const registerClick = (e) => {
		e.preventDefault();
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
			register(userProfile, password).then(() => navigate("/"));
		}
	};

	return (
		<form onSubmit={registerClick}>
			<fieldset>
				<label htmlFor="firstName">First Name</label>
				<input id="firstName" type="text" onChange={(e) => setFirstName(e.target.value)} />
			</fieldset>
			<fieldset>
				<label htmlFor="lastName">Last Name</label>
				<input id="lastName" type="text" onChange={(e) => setLastName(e.target.value)} />
			</fieldset>
			<fieldset>
				<label htmlFor="displayName">Display Name</label>
				<input id="displayName" type="text" onChange={(e) => setDisplayName(e.target.value)} />
			</fieldset>
			<fieldset>
				<label for="email">Email</label>
				<input id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
			</fieldset>
			<fieldset>
				<label htmlFor="imageLocation">Profile Image URL</label>
				<input id="imageLocation" type="text" onChange={(e) => setImageLocation(e.target.value)} />
			</fieldset>
			<fieldset>
				<label for="password">Password</label>
				<input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
			</fieldset>
			<fieldset>
				<label for="confirmPassword">Confirm Password</label>
				<input id="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
			</fieldset>
			<fieldset>
				<button>Register</button>
			</fieldset>
		</form>
	);
};
