export const Pagination = ({
	videosPerPage,
	totalVideos,
	paginate,
	currentPage,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="flex justify-start">
			<ul className="flex">
				{pageNumbers.map((number) => (
					<li key={number} className="page-item">
						<button
							onClick={() => paginate(number)}
							className={`m-2 rounded-md px-3 py-2 font-medium text-gray-700
				  ${
						number === currentPage
							? "bg-blue-600 text-white"
							: "bg-white hover:bg-blue-600 hover:text-white"
					}`}
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};
