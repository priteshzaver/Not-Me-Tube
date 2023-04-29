import { useState } from "react";
import { search } from "../modules/videoManager";
import { VideoList } from "./VideoList";
export const SearchBar = () => {
  const [criterion, setCriterion] = useState("");
  const [videos, setVideos] = useState([]);

  const searchSubmit = (event) => {
    event.preventDefault();
    search(criterion).then((data) => setVideos(data.items));
  };

  return (
    <>
      <div>
        <form onSubmit={searchSubmit}>
          <fieldset>
            <input
              type="text"
              placeholder="searchterms"
              onChange={(event) => {
                setCriterion(event.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <button type="submit">Search</button>
          </fieldset>
        </form>
      </div>
      <div>
        <VideoList videos={videos} />
      </div>
    </>
  );
};
