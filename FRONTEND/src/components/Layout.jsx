import React from "react";
import Navbar from "./Navbar";
import { getUser } from "../utils/storage";

/** * wrapper for pages to share ui */
const Layout = (props) => {
  const user = getUser();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* always render navbar if user exists */}
      {user && <Navbar name={user.fullName} />}

      {/* render the specific page content here */}
      <main>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;