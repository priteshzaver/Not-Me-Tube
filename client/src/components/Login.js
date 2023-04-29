import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../modules/authManager";
import { MdOndemandVideo } from "react-icons/md";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (event) => {
    event.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="border-primary Border m-auto w-full max-w-md rounded-lg border bg-white px-16 py-10 shadow-2xl">
        <h1 className="mb-4 mt-4 text-center text-6xl font-medium">Login</h1>
        <div className="mb-3 grid">
          <MdOndemandVideo className="place-self-center" size={70} />
        </div>
        <form onSubmit={loginSubmit} className="grid grid-cols-1 gap-y-2">
          <fieldset>
            <label htmlFor="email" className="pl-3">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="Email Address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password" className="pl-3">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="text-primary mb-4 w-full rounded-3xl border p-2 text-sm outline-none transition duration-150 ease-in-out"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Password"
            />
          </fieldset>
          <div className="mt-6 flex items-center justify-center">
            <button type="submit" className="btn-primary">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
