import React from "react";
import "../Dashboard/DashboardStyles.css";
import LogoLight from "./LogoLight";
import { FaUserCheck, FaUserMinus, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

const AdminSidebar = () => {
  const welcome = "Welcome to Admin's Dashboard";
  return (
    <div>
      <div className="fmSidebar">
        <LogoLight />
        <div className="accName">
          <div className="greeting">
            <p>{welcome}</p>
          </div>
        </div>
        <div className="accmenu">
          <div className="accmenuItem">
            <NavLink
              to="/Admin-Dashboard"
              className={({ isActive }) =>
                isActive ? "activeNavlink" : "inactiveNavlink"
              }
            >
              <FaUserCheck className="menuIcon" />
              <div className="linkDesc">Add Users</div>
            </NavLink>
          </div>

          <div className="accmenuItem">
            <NavLink
              to="/All-Users"
              className={({ isActive }) =>
                isActive ? "activeNavlink" : "inactiveNavlink"
              }
            >
              <FaUsers className="menuIcon" />
              <div className="linkDesc">All Users</div>
            </NavLink>
          </div>

          <div className="accmenuItem">
            <NavLink
              to="/Remove-User"
              className={({ isActive }) =>
                isActive ? "activeNavlink" : "inactiveNavlink"
              }
            >
              <FaUserMinus className="menuIcon" />
              <div className="linkDesc">Remove Users</div>
            </NavLink>
          </div>

          <div className="accmenuItem">
            <NavLink
              to="/Admin-Login"
              className={({ isActive }) =>
                isActive ? "activeNavlink" : "inactiveNavlink"
              }
            >
              <IoLogOut className="menuIcon" />
              <div className="linkDesc">Logout</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
