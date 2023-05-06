import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { UserVideos } from "./components/user/UserVideos";
import { Register } from "./components/auth/Register";
import { SearchBar } from "./components/search/SearchBar";
import { UserPlaylists } from "./components/userPlaylists/UserPlaylists";
import { YouTubePopularVideos } from "./components/explorePopularVideos/YouTubePopularVideos";
import { ExplorePlaylists } from "./components/userPlaylists/ExplorePlaylists";

export const ApplicationViews = ({ isLoggedIn }) => {
	return (
		<main className="absolute left-44 z-0 w-[calc(100vw-11rem)]">
			<Routes>
				<Route path="/">
					<Route
						index
						element={isLoggedIn ? <UserVideos /> : <Navigate to="/login" />}
					/>
					<Route
						path="searchbar"
						element={isLoggedIn ? <SearchBar /> : <Navigate to="/login" />}
					/>
					<Route
						path="userPlaylists/:id"
						element={isLoggedIn ? <UserPlaylists /> : <Navigate to="/login" />}
					/>
					<Route
						path="popularYoutubeVideos"
						element={
							isLoggedIn ? <YouTubePopularVideos /> : <Navigate to="/login" />
						}
					/>
					<Route
						path="explorePlaylists"
						element={
							isLoggedIn ? <ExplorePlaylists /> : <Navigate to="/login" />
						}
					/>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Route>
			</Routes>
		</main>
	);
};
