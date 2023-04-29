import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { Pagination } from "./Pagination";

export const VideoList = ({ videos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(12);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center">
      <div>VideoList</div>
      <article className="grid grid-cols-3 gap-3">
        {currentVideos.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
        <div>
          {videos.length > 12 ? (
            <Pagination
              videosPerPage={videosPerPage}
              totalVideos={videos.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          ) : (
            ""
          )}
        </div>
      </article>
    </div>
  );
};
