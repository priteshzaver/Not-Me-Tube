import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { UserVideos } from "./components/user/UserVideos";
import { Register } from "./components/auth/Register";
import { SearchBar } from "./components/search/SearchBar";

export const ApplicationViews = ({ isLoggedIn, role, currentUser }) => {
	return (
		<main className="scrollbar-hide h-[calc(91vh-72px)]">
			<Routes>
				<Route path="/">
					<Route
						index
						element={
							isLoggedIn ? (
								<UserVideos currentUser={currentUser} />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route
						path="searchbar"
						element={isLoggedIn ? <SearchBar /> : <Navigate to="/login" />}
					/>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="*" element={<p>Whoops, nothing here...</p>} />
				</Route>
			</Routes>
		</main>
	);
};
