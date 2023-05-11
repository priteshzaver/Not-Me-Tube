import { useContext, useState } from "react";
import { logout } from "../../modules/authManager";
import UserContext from "../../UserContext";
import { AiFillPlaySquare, AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { FaChevronDown, FaListUl, FaPencilAlt } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { CreatePlaylistModal } from "../userPlaylists/CreatePlaylistModal";
import { Menu } from "@headlessui/react";

export const SideBar = ({ isLoggedIn }) => {
	const { currentUser } = useContext(UserContext);
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	const isActive = (path) => {
		return location.pathname === path ? "bg-emerald-200" : "";
	};

	return (
		<>
			{isLoggedIn ? (
				<aside className="fixed h-full w-56 border-r-2 border-green-300 bg-white bg-gradient-to-b from-emerald-100 to-cyan-200">
					<ul>
						<li>
							<a
								href="/"
								className={`duration-800 flex h-16 w-full items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l ${isActive(
									"/"
								)}`}
							>
								<AiFillPlaySquare className="mr-2" />
								<span className="text-xl">My Videos</span>
							</a>
						</li>
						<li>
							<a
								href={`/userPlaylists/${currentUser?.id}`}
								className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l  ${isActive(
									`/userPlaylists/${currentUser?.id}`
								)}`}
							>
								<FaListUl className="mr-2" />
								<span className="text-xl">My Playlists</span>
							</a>
						</li>
						<li>
							<a
								className="duration-800 flex h-16 cursor-pointer items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l"
								onClick={() => setIsOpen(true)}
							>
								<AiOutlinePlus className="mr-2" />
								<span className="text-xl">Create Playlist</span>
							</a>
							<CreatePlaylistModal isOpen={isOpen} setIsOpen={setIsOpen} />
						</li>

						<li>
							<a
								href="/explorePlaylists"
								className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l  ${isActive(
									"/explorePlaylists"
								)}`}
							>
								<RiMovie2Line className="mr-2" />
								<span className="text-xl">Explore Playlists</span>
							</a>
						</li>
						<li>
							<a
								href="/popularYoutubeVideos"
								className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l  ${isActive(
									"/popularYoutubeVideos"
								)}`}
							>
								<AiFillStar className="mr-2" />
								<span className="text-xl">Popular Videos</span>
							</a>
						</li>
						<li>
							<a onClick={logout} className="duration-800 flex h-16 cursor-pointer items-center border-b-2 border-green-300 px-4 text-black opacity-100 transition hover:bg-pink-200">
								<FiLogOut className="mr-2" />
								<span className="text-xl">Logout</span>
							</a>
						</li>
					</ul>
				</aside>
			) : (
				<aside className="fixed h-full w-56 border-r-2 border-green-300 bg-white bg-gradient-to-b from-emerald-100 to-cyan-200">
					<div
						className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l ${isActive(
							"/login"
						)}`}
					>
						<FiLogIn className="mr-2" />
						<a href="/login">
							<span className="text-xl">Login</span>
						</a>
					</div>
					<div
						className={`duration-800 flex h-16 items-center border-b-2 border-green-300 from-cyan-200 to-cyan-300 px-4 text-black opacity-100 transition hover:bg-gradient-to-l  ${isActive(
							"/register"
						)}`}
					>
						<FaPencilAlt className="mr-2" />
						<a href="/register">
							<span className="text-xl">Register</span>
						</a>
					</div>
				</aside>
			)}
		</>
	);
};
