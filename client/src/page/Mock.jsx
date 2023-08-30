import React from "react";
import { Link } from "react-router-dom";

function Mock() {
  return (
    <>
      <div className="flex justify-center items-center gap-3 h-screen">
        <Link to="/user/pdfcus">
          <button className="bg-cyan-500 text-white p-4 rounded-lg text-lg">
            Click Me
          </button>
        </Link>
        <Link to="/user/detailmock">
          <button className="bg-cyan-500 text-white p-4 rounded-lg text-lg">
            You Click
          </button>
        </Link>
      </div>
    </>
  );
}

export default Mock;
