import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuthContext } from "../context/AuthContext";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
