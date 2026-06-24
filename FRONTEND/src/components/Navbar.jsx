import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";
import { deepPurple } from "@mui/material/colors";
import { clearUser, getUser } from "../utils/storage";

/**
 * Top navigation bar with routing and user actions
 * @param {Object} props - Component props
 */
const Navbar = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear session and boot to login
    clearUser();
    navigate("/");
  };

  const handleHome = () => {
    const user = getUser();

    // Route based on access level
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <nav
      className="shadow-md px-6 py-6 flex justify-between items-center fixed top-0 left-0 w-full h-22 z-50"
      style={{
        background:
          "radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
      }}
    >
      {/* Clickable brand area */}
      <span
        title="Home"
        onClick={handleHome}
        className="flex items-center ml-10 cursor-pointer"
      >
        <HomeIcon fontSize="large" />
        <h1 className="text-3xl flex justify-between items-center font-bold ml-10 text-olive-800">
          Leave Management System
        </h1>
      </span>

      {/* User info and logout block */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 mr-10">
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {(props.name || "User").charAt(0).toUpperCase()}
          </Avatar>
          <span className="font-bold text-lg">{props.name || "User"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 cursor-pointer"
        >
          <LogoutIcon /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
