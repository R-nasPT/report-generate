import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ onSidebarToggle }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowPopup(false);
  };

  const toFirstPage = () => {
    console.log(window.location.pathname.split("/"));
    if (window.location.pathname.split("/")[1] === "admin") {
      navigate("/admin/template");
    } else {
      navigate("/user/homepage");
    }
  };

  return (
    <>
      <div className="fixed bg-white h-screen w-60 text-white">
        <div className="h-[80px] bg-[#0D0DA4] flex justify-between pl-8 pr-3 py-3">
          <img src="/component/logo-pp-ontime.svg" alt="logo" />
          <button
            className="text-2xl px-3 py-2 rounded-lg hover:bg-blue-800"
            onClick={onSidebarToggle}
          >
            ☰
          </button>
        </div>
        <div className=" py-10 text-center text-blue-800 font-medium h-full">
          <div className="h-4/5">
            <div
              className="flex px-10 items-center gap-3 py-5 hover:bg-slate-200 cursor-pointer"
              onClick={toFirstPage}
            >
              <img src="/component/home.svg" alt="home" className="h-5" />
              <h1>Home</h1>
            </div>
            <div className="flex px-10 items-center gap-3 py-5 hover:bg-slate-200">
              <img
                src="/component/more-square.svg"
                alt="home"
                className="h-5"
              />
              <h1>Demo</h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 py-4">
            <img src="/component/logout.svg" alt="logout" className="h-5 " />
            <h1
              className="hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </h1>
          </div>
        </div>
      </div>
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
