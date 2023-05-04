export const Header = ({ isLoggedIn, role }) => {
	return (
		<header className="fixed top-0 z-10 h-14 w-screen shrink-0 border-2 border-black bg-white">
			<nav className="flex items-center justify-between px-4 py-3">
				{isLoggedIn && (
					<>
						<div className="flex text-3xl lg:flex-1">
							<a href="/">
								<span>Not Me Tube</span>
							</a>
						</div>
					</>
				)}
			</nav>
		</header>
	);
};
