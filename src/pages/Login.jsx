import React, { useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { signInUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl py-10">
        <form onSubmit={handleLogin}>
          <div className="card-body">
            <h1 className="text-center text-3xl mb-5">Login your account!</h1>
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <br></br>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
              />
              <br></br>
              <label className="fieldset-label">Password</label>

              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
              />

              {error.login && (
                <label className="label text-sm text-red-600">
                  {error.login}
                </label>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4 w-full">Login</button>
            </fieldset>
          </div>
        </form>
        <p className="font-semibold text-lg text-center">
          Don't have a account?{" "}
          <Link className="text-red-400" to={"/auth/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
