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
    <nav>
      <ul className="m-2 flex justify-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={
                number == currentPage
                  ? "m-2 cursor-pointer rounded-md border border-gray-400 bg-blue-600 px-10 py-5 font-mono text-white"
                  : "m-2 cursor-pointer rounded-md border border-gray-400 bg-white px-10 py-5 font-mono transition-colors hover:bg-blue-600 hover:text-white"
              }
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
