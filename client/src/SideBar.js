export const SideBar = () => {
	return (
		<div classname="h-full w-17 bg-white overflow-y-hidden">
			<div className="mb-14 mt-14 flex w-full flex-col">
				<a className="active nav-link">
					<span className="ml-4" to="/">
						My Videos
					</span>
				</a>
				<a className="active nav-link">
					<span>My Playlists</span>
				</a>
				<a className="active nav-link">
					<span>Explore Playlists</span>
				</a>
				<a className="active nav-link">
					<span>Explore Videos</span>
				</a>
			</div>
		</div>
	);
};
