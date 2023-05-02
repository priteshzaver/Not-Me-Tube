import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { UserVideos } from "./components/UserVideos";
import { Register } from "./components/auth/Register";

export const ApplicationViews = ({ isLoggedIn, role }) => {
	return (
		<main>
			<Routes>
				<Route path="/">
					<Route
						index
						element={isLoggedIn ? <UserVideos /> : <Navigate to="/login" />}
					/>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="*" element={<p>Whoops, nothing here...</p>} />
				</Route>
			</Routes>
		</main>
	);
};
