import { logout } from "./modules/authManager";

export const SideBar = ({ isLoggedIn }) => {
	return (
		<>
			{isLoggedIn && (
				<div className="relative float-left h-full w-[240px] translate-x-[-240px] overflow-y-auto py-4 transition-all md:relative md:block md:translate-x-0">
					<div className="flex flex-col px-5">
						<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm  hover:bg-gray-200">
							<a href="/">
								<span className="mr-5 text-lg">My Videos</span>
							</a>
						</div>
						<div className="mb-[1px] flex h-10 cursor-pointer items-center rounded-lg px-3 text-sm hover:bg-gray-200">
							<span className="mr-5 text-lg">My Playlists</span>
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
					</div>
				</div>
			)}
		</>
	);
};
