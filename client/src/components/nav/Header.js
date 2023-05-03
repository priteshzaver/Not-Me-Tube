export const Header = ({ isLoggedIn, role }) => {
	return (
		<header className="sticky top-0 z-10 flex h-14 flex-row items-center justify-between px-4 md:px-5">
			<nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
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
