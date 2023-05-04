import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { UserVideos } from "./components/user/UserVideos";
import { Register } from "./components/auth/Register";
import { SearchBar } from "./components/search/SearchBar";
import { UserPlaylists } from "./components/userPlaylists/UserPlaylists";

export const ApplicationViews = ({ isLoggedIn, role, currentUser }) => {
	return (
		<main className="absolute left-44 z-0 w-[calc(100vw-11rem)]">
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
					<Route
						path="userPlaylists/:id"
						element={
							isLoggedIn ? (
								<UserPlaylists currentUser={currentUser} />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="*" element={<p>Whoops, nothing here...</p>} />
				</Route>
			</Routes>
		</main>
	);
};
