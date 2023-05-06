import { useContext } from "react";
import { logout } from "../../modules/authManager";
import UserContext from "../../UserContext";
import { AiFillPlaySquare, AiFillStar } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export const SideBar = ({ isLoggedIn }) => {
	const { currentUser } = useContext(UserContext);
	const location = useLocation();

	const isActive = (path) => {
		return location.pathname === path ? "bg-gray-200" : "";
	};

	return (
		<>
			{isLoggedIn && (
				<aside className="fixed w-56 bg-white">
					<div
						className={`flex h-16 items-center px-4 text-gray-600 ${isActive(
							"/"
						)}`}
					>
						<AiFillPlaySquare className="mr-2" />
						<a href="/">
							<span className="text-xl">My Videos</span>
						</a>
					</div>
					<div
						className={`flex h-16 items-center px-4 text-gray-600 ${isActive(
							`/userPlaylists/${currentUser?.id}`
						)}`}
					>
						<FaListUl className="mr-2" />
						<a href={`/userPlaylists/${currentUser?.id}`}>
							<span className="text-xl">My Playlists</span>
						</a>
					</div>
					<div
						className={`flex h-16 items-center px-4 text-gray-600 ${isActive(
							"/explorePlaylists"
						)}`}
					>
						<RiMovie2Line className="mr-2" />
						<a href="/explorePlaylists">
							<span className="text-xl">Explore Playlists</span>
						</a>
					</div>
					<div
						className={`flex h-16 items-center px-4 text-gray-600 ${isActive(
							"/popularYoutubeVideos"
						)}`}
					>
						<AiFillStar className="mr-2" />
						<a href="/popularYoutubeVideos">
							<span className="text-xl">Popular Videos</span>
						</a>
					</div>
					<button
						onClick={logout}
						className="flex h-16 items-center px-4 text-gray-600"
					>
						<FiLogOut className="mr-2" />
						<span className="text-xl">Logout</span>
					</button>
				</aside>
			)}
		</>
	);
};
