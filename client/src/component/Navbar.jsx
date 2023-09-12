import Sidebar from "./Sidebar";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (location.pathname === "/") {
    return (
      <div className="bg-[#0D0DA4] flex items-center gap-10 text-white pl-10 h-[80px]">
        <img src="/component/logo-pp-ontime.svg" alt="logo" />
        <h1 className=" text-base font-medium ">PP ONTIME CO., LTD.</h1>
      </div>
    );
  }

  return (
    <>
      {showSidebar && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-30 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed h-screen w-60 text-white transform transition-transform z-20 ${
          showSidebar ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        <Sidebar onSidebarToggle={toggleSidebar} />
      </div>
      {/*-------nav----------*/}
      <div className="bg-[#0D0DA4] flex items-center gap-10 text-white pl-10 h-[80px]">
        <button
          className="text-2xl px-3 py-2 rounded-lg hover:bg-blue-800"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <img src="/component/logo-pp-ontime.svg" alt="logo" className="hidden lg:block"/>
        <h1 className=" text-base font-medium ">PP ONTIME CO., LTD.</h1>
      </div>
    </>
  );
}

export default Navbar;
