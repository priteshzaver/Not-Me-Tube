import { createContext, useState } from "react";

export const Context = createContext();

export const AppContext = (props) => {
	const [searchResult, setSearchResult] = useState([]);
	const [mobileMenu, setMobileMenu] = useState(false);

	return (
		<Context.Provider
			value={{
				searchResult,
				setSearchResult,
				mobileMenu,
				setMobileMenu,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
