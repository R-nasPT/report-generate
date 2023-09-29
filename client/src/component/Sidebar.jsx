import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { GiAutoRepair } from "react-icons/gi";
import { TfiWrite } from "react-icons/tfi";
import { RiCustomerService2Fill, RiFileMarkLine } from "react-icons/ri";
import { MdMiscellaneousServices, MdManageHistory } from "react-icons/md";
import { TbFileSettings } from "react-icons/tb";
import { FaSitemap } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import AnimateHeight from "react-animate-height";

function Sidebar({ onSidebarToggle }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [subInstall, setSubInstall] = useState(false);
  const [subCusService, setSubCusService] = useState(false);
  const [subMa, setSubMa] = useState(false);
  const { logout, isAdmin } = useAuthContext();

  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleConfirmLogout = () => {
    logout();
  };

  const handleCancelLogout = () => {
    setShowPopup(false);
  };

  // const toFirstPage = () => {
  //   console.log(window.location.pathname.split("/"));
  //   if (window.location.pathname.split("/")[1] === "admin") {
  //     navigate("/admin/template");
  //   } else {
  //     navigate("/user/homepage");
  //   }
  // };

  return (
    <>
      <aside className="fixed bg-white h-screen w-60 text-white">
        <div className="h-[80px] bg-[#0D0DA4] flex justify-between pl-8 pr-3 py-3">
          <img src="/component/logo-pp-ontime.svg" alt="logo" />
          <button
            className="text-2xl px-3 py-2 rounded-lg hover:bg-blue-800"
            onClick={onSidebarToggle}
          >
            <RxCross2 className=" w-8" />
          </button>
        </div>
        <div className=" py-10 text-center text-blue-800 font-medium h-full">
          <div className="h-4/5">
            <div
              className="flex pl-7 items-center gap-3 py-5 hover:bg-slate-200 cursor-pointer"
              onClick={() => navigate("/user/homepage")}
            >
              <img src="/component/home.svg" alt="home" className="h-5" />
              <h1>Home</h1>
            </div>
            <div
              className="flex pl-7 items-center gap-3 py-5 hover:bg-slate-200 cursor-pointer"
              onClick={() => setSubInstall(!subInstall)}
            >
              <GiAutoRepair className="h-10 w-6" />
              <h1>Installation</h1>
              <h1 className={`ml-10 ${subInstall ? "rotate-180" : ""}`}>▼</h1>
            </div>
            <AnimateHeight duration={300} height={subInstall ? "auto" : 0}>
              <Link
                to="/user/install"
                className="flex pl-14 items-center gap-3 py-5 hover:bg-slate-200"
              >
                <TfiWrite />
                <h1>New Install</h1>
              </Link>
              <Link
                to="/user/install-history"
                className="flex pl-14 items-center gap-2 py-5 hover:bg-slate-200"
              >
                <MdManageHistory className="w-5 h-5"/>
                <h1>New Install History</h1>
              </Link>
            </AnimateHeight>
            <div
              className="flex pl-7 items-center py-5 hover:bg-slate-200 cursor-pointer"
              onClick={() => setSubCusService(!subCusService)}
            >
              <MdMiscellaneousServices className="w-5 h-10 mr-3" />
              <h1>Customer Service</h1>
              <h1 className={`ml-3 ${subCusService ? "rotate-180" : ""}`}>▼</h1>
            </div>

            <AnimateHeight duration={300} height={subCusService ? "auto" : 0}>
              <Link
                to="/user/service"
                className="flex pl-14 items-center gap-3 py-5 hover:bg-slate-200"
              >
                <RiCustomerService2Fill />
                <h1>Service</h1>
              </Link>
              <div
                className="flex pl-14 items-center gap-3 py-5 hover:bg-slate-200"
                onClick={() => setSubMa(!subMa)}
              >
                <RiFileMarkLine />
                <h1>MA</h1>
                <h1 className={`ml-10 ${subMa ? "rotate-180" : ""}`}>▼</h1>
              </div>
              <AnimateHeight duration={300} height={subMa ? "auto" : 0}>
                {isAdmin === "Admin" && (
                  <Link
                    to="/admin/template"
                    className="flex pl-20 items-center gap-3 py-5 hover:bg-slate-200"
                  >
                    <TbFileSettings className="h-6 w-6" />
                    <h1>Setting</h1>
                  </Link>
                )}
                <Link
                  to="/user/onsite"
                  className="flex pl-20 items-center gap-3 py-5 hover:bg-slate-200"
                >
                  <FaSitemap className="h-5 w-5" />
                  <h1>Onsite Report</h1>
                </Link>
              </AnimateHeight>
            </AnimateHeight>
          </div>
          <div className="flex justify-center items-center gap-3 mt-5 py-4">
            <img src="/component/logout.svg" alt="logout" className="h-5 " />
            <h1
              className="hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </h1>
          </div>
        </div>
      </aside>
      {/* Popup */}
      {showPopup && (
        <div className="w-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="flex flex-col items-center gap-5 bg-white p-8 rounded-3xl text-red-600 text-lg">
            <img
              src="/component/exclamation-mark.png"
              alt="exclamation"
              className="h-20"
            />
            <p>Are you sure you want to logout?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleConfirmLogout}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
