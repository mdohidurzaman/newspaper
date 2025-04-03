import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    if (name.length < 5) {
      setError({ ...error, name: "Name must be 5 characters" });
      return;
    }
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        setError(error);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError({ errorCode, errorMessage });
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl py-10">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="card-body">
            <h1 className="text-center text-3xl mb-5">
              Register your account!
            </h1>
            <fieldset className="fieldset">
              <label className="fieldset-label">Name</label>
              <br></br>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Name"
              />
              {error.name && (
                <label className="label text-sm text-red-600">
                  {error.name}
                </label>
              )}
              <br></br>
              <label className="fieldset-label">Photo Url</label>
              <br></br>
              <input
                name="photo"
                type="text"
                className="input input-bordered w-full"
                placeholder="Photo Url"
              />
              <br></br>
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
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4 w-full">Register</button>
            </fieldset>
          </div>
        </form>
        <p className="font-semibold text-lg text-center">
          Already have a account ?
          <Link className="text-red-400" to={"/auth/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
