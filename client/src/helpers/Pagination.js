import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const Pagination = ({ videosPerPage, totalVideos, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="flex flex-col items-center justify-start">
			<div className="flex items-center justify-center">
				{currentPage < pageNumbers.length && (
					<button onClick={() => paginate(currentPage + 1)} className="m-2 h-10 w-10 rounded-md border-2 border-green-300 bg-emerald-100 px-3 py-1 font-bold text-black hover:bg-emerald-200">
						<FiArrowRight />
					</button>
				)}
			</div>
			<ul className="flex flex-col">
				{pageNumbers.map((number) => (
					<li key={number} className="page-item">
						<button
							onClick={() => paginate(number)}
							className={`m-2 h-10 w-10 rounded-md border-2 border-green-300 px-3 py-2 font-medium text-black
				${number === currentPage ? "bg-cyan-200" : "bg-emerald-100 hover:bg-emerald-200"}`}
						>
							{number}
						</button>
					</li>
				))}
			</ul>
			<div className="flex items-center justify-center">
				{currentPage > 1 && (
					<button onClick={() => paginate(currentPage - 1)} className="m-2 h-10 w-10 rounded-md border-2 border-green-300 bg-emerald-100 px-3 py-1 font-bold text-black hover:bg-emerald-200">
						<FiArrowLeft />
					</button>
				)}
			</div>
		</nav>
	);
};
