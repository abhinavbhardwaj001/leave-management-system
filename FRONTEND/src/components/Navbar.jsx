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
      className="shadow-md px-4 md:px-6 flex justify-between items-center fixed top-0 left-0 w-full h-16 md:h-22 z-50"
      style={{
        background:
          "radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
      }}
    >
      {/* Clickable brand area */}
      <span
        title="Home"
        onClick={handleHome}
        className="flex items-center cursor-pointer shrink-0"
      >
        <HomeIcon fontSize="large" />
        <h1 className="text-base sm:text-xl md:text-3xl font-bold ml-2 md:ml-6 text-olive-800 truncate flex-1 min-w-0">
          Leave Management System
        </h1>
      </span>

      {/* User info and logout block */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2 md:gap-3">
          <Avatar sx={{ 
              bgcolor: deepPurple[500], 
              width: { xs: 32, md: 40 }, 
              height: { xs: 32, md: 40 } 
            }}>
            {(props.name || "User").charAt(0).toUpperCase()}
          </Avatar>
          <span className="hidden sm:block font-bold md:text-lg">{props.name || "User"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-red-600 cursor-pointer flex items-center gap-1 md:gap-2 transition-transform active:scale-95"
        >
          <LogoutIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
