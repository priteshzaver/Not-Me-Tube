import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { VideoList } from "./components/VideoList";
import { SearchBar } from "./components/SearchBar";

export const ApplicationViews = ({ isLoggedIn }) => {
  return (
    <main>
      <Routes>
        <Route exact path="/">
          <Route index element={<SearchBar />} />
          <Route path="login" element={<Login />} />
          <Route path="videos">
            <Route
              index
              element={isLoggedIn ? <VideoList /> : <Navigate to="login" />}
            />
          </Route>
        </Route>
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Routes>
    </main>
  );
};

// {isLoggedIn ? <SearchBar /> : <Navigate to="login" />}
