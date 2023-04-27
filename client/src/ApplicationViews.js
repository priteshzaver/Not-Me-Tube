import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";

export const ApplicationViews = () => {
  return (
    <main>
      <Routes>
        <Route>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </main>
  );
};
