# Not Me Tube - README

Not Me Tube is my final capstone project for the full-time web developer bootcamp (C#/.NET) cohort at Nashville Software School. The application consists of a front-end written in React JS and a back-end written in C#. It allows users to search for and watch videos using YouTube's API, create playlists, and explore other users' playlists.

## Technologies Used

Not Me Tube is built using the following technologies:

- React JS: A popular JavaScript library for building user interfaces.

- C#/.NET: A framework for building scalable and secure web applications.

- YouTube API: Provides functionality for searching, viewing, and uploading videos on YouTube.

- Firebase: A mobile and web application development platform that provides various services like authentication, real-time databases, and hosting.

- Tailwind CSS: A utility-first CSS framework that allows for rapid UI development.

- OAuth: A standard protocol for allowing third-party applications to access user data on a website, without giving them the user's password.

- Headless UI: A set of completely unstyled, fully accessible UI components for React.

- React Icons: A library of customizable icons for React applications.

## Installation

To install Not Me Tube, please follow the below steps:

1. Clone the repository.
2. Run the `NotMeTube_CreateDb.SQL` file in the SQL folder.
3. Create a Firebase application and select the Email/Password sign-in method. Add as many users as you wish to start off with and take note of the Project ID and the Web API Key.
4. Enter the Project ID into the `appsettings.json` file.
5. Create a `.env` file in the `client` folder and enter the Web API Key in the following format: `REACT_APP_API_KEY=WEBAPIKEY`.
6. Create a new project on `console.cloud.google.com` for YouTube API access. Add the YouTube Data API v3 (or higher) API to your project.
7. On the credentials screen, add the API to this screen so that an API Key is generated. Make note of this API key.
8. Complete the OAuth consent screen. Once completed, make sure this is added to the OAuth 2.0 Client IDs section of the credentials tab. Make note of the Client ID.
9. Add the API key and the client ID into the `.env` folder in the following format: `REACT_APP_YOUTUBE_API_KEY=YouTubeAPIKey` and `YOUTUBE_CLIENT_ID=CLIENTID`.
10. Install Firebase 8.7.1, Tailwind CSS, Tailwind Scrollbar, Headless UI, and React Icons.

To install Firebase 8.7.1, run the following command in the terminal:
```
npm install firebase@8.7.1
```

To install Tailwind CSS, Tailwind Scrollbar, Headless UI, and React Icons, run the following command in the terminal:
```
npm install tailwindcss@latest @tailwindcss/scrollbar@latest @headlessui/react@latest @heroicons/react@latest
```

## Usage

Users of Not Me Tube can search for videos using YouTube's API. They can create playlists, explore other users' playlists, and explore YouTube's most popular videos. Users can save videos to their accounts and to their playlists. They can also watch any video.

When the user clicks on a video that is saved to a user's account (whether their own account or a video saved to another user's account), the video details page will appear. The user can watch a larger format of the video on the details page, comment on the video, and view/save videos that are related to the video that they are viewing on the details page.