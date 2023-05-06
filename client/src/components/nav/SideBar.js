import { useContext } from "react";
import { logout } from "../../modules/authManager";
import UserContext from "../../UserContext";

export const SideBar = ({ isLoggedIn }) => {
	const { currentUser } = useContext(UserContext);
	return (
		<>
			{isLoggedIn && (
				<aside className="fixed w-44 border-2 border-black bg-white">
					<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm  hover:bg-gray-200">
						<a href="/">
							<span className="mr-5 text-lg">My Videos</span>
						</a>
					</div>
					<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm hover:bg-gray-200">
						<a href={`userPlaylists/${currentUser?.id}`}>
							<span className="mr-5 text-lg">My Playlists</span>
						</a>
					</div>
					<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm hover:bg-gray-200">
						<a href="/searchBar">
							<span className="mr-5 text-lg">Searchbar</span>
						</a>
					</div>
					<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm hover:bg-gray-200">
						<a href="/explorePlaylists">
							<span className="mr-5 text-lg">Explore Playlists</span>
						</a>
					</div>
					<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm hover:bg-gray-200">
						<a href="/popularYoutubeVideos">
							<span className="mr-5 text-lg">Most Popular Videos</span>
						</a>
					</div>
					<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm hover:bg-gray-200">
						<button onClick={logout}>
							<span className="mr-5 text-lg">Logout</span>
						</button>
					</div>
				</aside>
			)}
		</>
	);
};
