import { SearchBar } from "../search/SearchBar";
import { MdOndemandVideo } from "react-icons/md";

export const Header = ({ isLoggedIn, setVideos }) => {
	return (
		<header className="fixed top-0 z-10 h-16 w-screen shrink-0 border-b-2 border-emerald-300 bg-gradient-to-tr from-emerald-100 to-teal-200">
			<nav className="flex items-center justify-between px-4 py-3">
				<>
					<div className="flex text-3xl font-bold lg:flex-1">
						<MdOndemandVideo className="mr-2 mt-1" />
						<a href="/">
							<span>Not Me Tube</span>
						</a>
					</div>
					{isLoggedIn && (
						<div className="hidden lg:block lg:w-2/3">
							<SearchBar setVideos={setVideos} />
						</div>
					)}
				</>
			</nav>
		</header>
	);
};
