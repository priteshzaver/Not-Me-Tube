import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { UserVideos } from "./components/user/UserVideos";
import { Register } from "./components/auth/Register";
import { UserPlaylists } from "./components/userPlaylists/UserPlaylists";
import { YouTubePopularVideos } from "./components/explorePopularVideos/YouTubePopularVideos";
import { ExplorePlaylists } from "./components/userPlaylists/ExplorePlaylists";
import { VideoList } from "./components/search/VideoList";

export const ApplicationViews = ({ isLoggedIn, videos }) => {
	return (
		<main className="absolute left-56 z-0 grid w-[calc(100vw-16rem)] justify-items-center">
			<Routes>
				<Route path="/">
					<Route
						index
						element={isLoggedIn ? <UserVideos /> : <Navigate to="/login" />}
					/>
					<Route
						path="searchResults"
						element={
							isLoggedIn ? (
								<VideoList videos={videos} />
							) : (
								<Navigate to="/login" />
							)
						}
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
					<Route path="*" element={<p>Whoops, nothing here...</p>} />
				</Route>
			</Routes>
		</main>
	);
};
