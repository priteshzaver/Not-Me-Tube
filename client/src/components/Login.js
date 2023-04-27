import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../modules/authManager";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (event) => {
    event.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginSubmit}>
        <fieldset>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="Email Address"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Password"
          />
        </fieldset>
        <fieldset>
          <button type="submit">Sign in</button>
        </fieldset>
      </form>
    </div>
  );
};
