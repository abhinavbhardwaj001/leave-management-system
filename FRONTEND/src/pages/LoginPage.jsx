import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { loginUser } from "../services/authService";
import { getUser, setUser } from "../utils/storage";

/**
 * Login page handling user authentication and routing
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div
        className="flex flex-col items-center justify-center px-4 py-8 mx-auto min-h-screen
           bg-gray-100 dark:bg-gray-900"
      >
        <p
          className="flex items-center mb-8 text-2xl sm:text-3xl font-bold
                  text-gray-900 dark:text-white text-center"
        >
          Leave Management System
        </p>

        <div
          className="w-full max-w-md rounded-lg shadow-lg
                 bg-white dark:bg-gray-800
                 dark:border dark:border-gray-700"
        >
          <div className="p-6 sm:p-10 space-y-4 md:space-y-6">
            <h1
              className="text-xl font-bold leading-tight tracking-tight
                       text-gray-900 md:text-2xl dark:text-white"
            >
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium
                         text-gray-900 dark:text-gray-200"
                >
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900
                         rounded-lg block w-full p-2.5
                         focus:ring-blue-500 focus:border-blue-500
                         dark:bg-gray-700 dark:border-gray-600
                         dark:placeholder-gray-400 dark:text-white
                         dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium
                         text-gray-900 dark:text-gray-200"
                >
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900
                         rounded-lg block w-full p-2.5
                         focus:ring-blue-500 focus:border-blue-500
                         dark:bg-gray-700 dark:border-gray-600
                         dark:placeholder-gray-400 dark:text-white
                         dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-500 dark:text-red-400 font-medium">
                  {error}
                </p>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-medium rounded-lg text-sm
                        px-5 py-3 text-center transition-all duration-200
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95 cursor-pointer"
              }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="w-5 h-5 border-2 border-white
                                border-t-transparent rounded-full animate-spin"
                    ></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>

              {/* Demo Credentials */}
              <div
                className="mt-4 rounded-lg border p-3 text-sm
                       bg-blue-50 border-blue-200 text-gray-700
                       dark:bg-gray-700/50
                       dark:border-blue-800
                       dark:text-gray-300"
              >
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  Demo Credentials
                </p>

                <p>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Employee:
                  </span>{" "}
                  ankit / ankit123
                </p>

                <p>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Admin:
                  </span>{" "}
                  admin / admin123
                </p>

                <p
                  className="mt-2 text-center text-sm
                          text-blue-700 dark:text-blue-400"
                >
                  Initial login may take up to a minute (Render Free Tier).
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
