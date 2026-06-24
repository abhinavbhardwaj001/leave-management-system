import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { loginUser } from "../services/authService";
import { getUser, setUser } from "../utils/storage";

const user = getUser();

/**
 * Login page handling user authentication and routing
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    // Prevent default form submission
    e.preventDefault();

    try {

      // Authenticate user against the backend
      const data = await loginUser(username, password);

      // Save session data
      setUser(data);

      // Route based on access level
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"  style={{background: "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)"}}>
        <p className="flex items-center mb-10 text-3xl font-bold text-gray-900 dark:text-white">
          Leave Management System
        </p>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"  style={{background: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)"}}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-12">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>

                {/* Username input */}
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter username"
                  required=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>

                {/* Password input */}
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              {/* Show error message if login fails */}
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
