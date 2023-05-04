import { logout } from "../../modules/authManager";

export const SideBar = ({ isLoggedIn, currentUser }) => {
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
						<span className="mr-5 text-lg">Explore Playlists</span>
					</div>
					<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm hover:bg-gray-200">
						<span className="mr-5 text-lg">Explore Videos</span>
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
