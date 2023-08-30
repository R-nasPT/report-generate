import React, { useState } from "react";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import MailPopup from "../component/MailPopup";
import LinePopup from "../component/LinePopop";

function DetailMock() {
  const [indexPic, setIndexPic] = useState();
  const [fileName, setFileName] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const setPicture = (e) => {
    if (e.target.files[0]) {
      setFileName((prevNumbers) =>
        prevNumbers.map((number) => {
          if (number.id === indexPic) {
            number.file = URL.createObjectURL(e.target.files[0]);
            number.state = 1;
          }
          return number;
        })
      );
    }
  };

  return (
    <>
      <div className="p-14 bg-slate-200">
        <div className="flex justify-between">
          <Link
            to="/user/mock"
            className=" bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl text-white"
          >
            Back
          </Link>
          <div className="flex gap-3">
            <Link to="/user/pdfcus">
              <img
                src="/user/pdf.svg"
                alt="pdf"
                className="cursor-pointer transition duration-300 hover:translate-y-[-5px]"
                // onClick={() => getToPDF(ticketDetail.ticket_generate_id)}
              />
            </Link>
            <MailPopup />
            <LinePopup />
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center items-center rounded-3xl mt-5 pt-10">
          <h1 className="text-3xl font-bold pb-7">Customer Information</h1>
          <div className="grid grid-cols-2 gap-5 w-[1000px]">
            <p>
              Customer : <span>1111111111111111111111111111111111111111</span>
            </p>
            <p>
              Site Name : <span>1111111111111111111111111111111111111111</span>
            </p>
            <p>
              Station ID : <span>1111111111111111111111111111111111111111</span>
            </p>
            <p>
              CID : <span>1111111111111111111111111111111111111111</span>
            </p>
            <p>
              Install Date :{" "}
              <input
                type="text"
                className="border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              />
            </p>
            <p>
              Install By :{" "}
              <input
                type="text"
                className="ml-11 border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              />
            </p>
            <p className="flex gap-5">
              Address :{" "}
              <textarea
                cols="40"
                rows="3"
                className="ml-2 border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              ></textarea>
            </p>
            <p>
              Contact Person :{" "}
              <input
                type="text"
                className="border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              />
            </p>
            <p>
              Tel. :{" "}
              <input
                type="text"
                className="ml-14 border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              />
            </p>
            <p>
              Environment :{" "}
              <input
                type="text"
                className="ml-5 border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              />
            </p>
            <p>
              ATM Type :{" "}
              <input
                type="text"
                className="ml-2 border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              />
            </p>
            <p>
              ATM Model :{" "}
              <input
                type="text"
                className="ml-7 border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              />
            </p>
            <p>
              Remark :{" "}
              <input
                type="text"
                className="ml-6 border-[1px] border-black rounded-lg px-3 py-1 font-normal"
              />
            </p>
          </div>
          <div className="w-full flex justify-end px-20 pt-5">
            <button
              className=" bg-sky-600 hover:bg-sky-700 px-5 py-3 rounded-xl text-white"
              // onClick={handleSave}
            >
              Save
            </button>
          </div>
          <hr className="border-t-2 border-black mt-5 w-full" />
          {/* picture */}
          <div className="w-full flex flex-col justify-center items-center my-10">
            <h1 className="text-3xl font-bold mt-10 pb-7">Picture</h1>
            <div className="grid grid-cols-3 gap-5 w-[750px] text-center">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="file-input"
                  className="border-[2px] border-sky-900 text-center font-semibold py-20 text-sky-700"
                >
                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                    <span className="text-8xl ">+</span>
                    <p>Upload Photo</p>
                  </div>
                </label>
                <input type="file" id="file-input" className="hidden" />
                <p>name picture</p>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="file-input"
                  className="border-[2px] border-sky-900 text-center font-semibold py-20 text-sky-700"
                >
                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                    <span className="text-8xl ">+</span>
                    <p>Upload Photo</p>
                  </div>
                </label>
                <input type="file" id="file-input" className="hidden" />
                <p>name picture</p>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="file-input"
                  className="border-[2px] border-sky-900 text-center font-semibold py-20 text-sky-700"
                >
                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                    <span className="text-8xl ">+</span>
                    <p>Upload Photo</p>
                  </div>
                </label>
                <input type="file" id="file-input" className="hidden" />
                <p>name picture</p>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="file-input"
                  className="border-[2px] border-sky-900 text-center font-semibold py-20 text-sky-700"
                >
                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                    <span className="text-8xl ">+</span>
                    <p>Upload Photo</p>
                  </div>
                </label>
                <input type="file" id="file-input" className="hidden" />
                <p>name picture</p>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="file-input"
                  className="border-[2px] border-sky-900 text-center font-semibold py-20 text-sky-700"
                >
                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                    <span className="text-8xl ">+</span>
                    <p>Upload Photo</p>
                  </div>
                </label>
                <input type="file" id="file-input" className="hidden" />
                <p>name picture</p>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="file-input"
                  className="border-[2px] border-sky-900 text-center font-semibold py-20 text-sky-700"
                >
                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                    <span className="text-8xl ">+</span>
                    <p>Upload Photo</p>
                  </div>
                </label>
                <input type="file" id="file-input" className="hidden" />
                <p>name picture</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
          <div
            className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"
            onClick={handleClosePopup}
          >
            <div className=" bg-white rounded-3xl relative">
              <img
                className=" w-3 h-3 absolute right-4 top-3 cursor-pointer "
                onClick={handleClosePopup}
                src="/user/close-line-icon.svg"
                alt="save"
              />
              <div className="flex flex-col gap-5 items-center font-bold text-2xl p-14">
                <img src="/component/success-icon.svg" alt="message" />
                <h1 className="text-[#049D2F]">Save successful!</h1>
              </div>
            </div>
          </div>
        )}
      <Footer />
    </>
  );
}

export default DetailMock;
