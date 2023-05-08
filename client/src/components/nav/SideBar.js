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
		return location.pathname === path ? "bg-emerald-200" : "";
	};

	return (
		<>
			{isLoggedIn && (
				<aside className="fixed h-full w-56 border-r-2 border-green-300 bg-white bg-gradient-to-b from-emerald-100 to-cyan-200">
					<div
						className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l ${isActive(
							"/"
						)}`}
					>
						<AiFillPlaySquare className="mr-2" />
						<a href="/">
							<span className="text-xl">My Videos</span>
						</a>
					</div>
					<div
						className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l  ${isActive(
							`/userPlaylists/${currentUser?.id}`
						)}`}
					>
						<FaListUl className="mr-2" />
						<a href={`/userPlaylists/${currentUser?.id}`}>
							<span className="text-xl">My Playlists</span>
						</a>
					</div>
					<div
						className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l  ${isActive(
							"/explorePlaylists"
						)}`}
					>
						<RiMovie2Line className="mr-2" />
						<a href="/explorePlaylists">
							<span className="text-xl">Explore Playlists</span>
						</a>
					</div>
					<div
						className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l  ${isActive(
							"/popularYoutubeVideos"
						)}`}
					>
						<AiFillStar className="mr-2" />
						<a href="/popularYoutubeVideos">
							<span className="text-xl">Popular Videos</span>
						</a>
					</div>
					<div className=" duration-800 border-b-2  border-green-300 opacity-100 transition hover:bg-pink-200">
						<button onClick={logout} className="flex h-16 items-center px-4 text-black">
							<FiLogOut className="mr-2" />
							<span className="text-xl">Logout</span>
						</button>
					</div>
				</aside>
			)}
		</>
	);
};
