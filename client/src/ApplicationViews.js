import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { VideoList } from "./components/VideoList";
import { SearchBar } from "./components/SearchBar";
import { SecureRoute } from "./SecureRoute"

export const ApplicationViews = ({ isLoggedIn }) => {
  return (
    <main>
      <Routes>
        <Route path="/">
        <Route
          path="SearchBar"
          element={<SecureRoute element={ <SearchBar/>} /> }
        />
        <Route path="login" element={<Login />} />

        </Route>
      </Routes>
    </main>
  );
};

// <Route path="videos">
//   <Route
//     index
//     element={isLoggedIn ? <VideoList /> : <Navigate to="login" />}
//   />
// </Route>
// {isLoggedIn ? <SearchBar /> : <Navigate to="login" />}
