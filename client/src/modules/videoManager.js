const videoDatabaseUrl = "/api/video";
const videoYoutubeUrl =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=";

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

export const search = (criterion) => {
  return fetch(
    `${videoYoutubeUrl}${criterion}&maxResults=48&order=relevance&key=${apiKey}&type=video`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
};

// export const search = (criterion, pageToken) => {
//   if (!pageToken) {
//     return fetch(
//       `${videoYoutubeUrl}${criterion}&maxResults=60&order=relevance&key=${apiKey}&type=video`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     ).then((res) => res.json());
//   } else {
//     return fetch(
//       `${videoYoutubeUrl}${criterion}&maxResults=60&order=relevance&key=${apiKey}&type=video&pagetoken=${pageToken}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     ).then((res) => res.json());
//   }
// };
