import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import {
  RiArrowDownSLine,
  RiDraftFill,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import { MdSave } from "react-icons/md";
import { BsBackspaceFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import packageJson from "../../package.json";

function Replacement() {
  const [boxOne, setBoxOne] = useState(false);
  const [boxTwo, setBoxTwo] = useState(false);
  const [boxThree, setBoxThree] = useState(false);

  const [member, setMember] = useState([]);
  const [equipment, setEquipment] = useState([]);
  // console.log(member);

  const fetchMember = async () => {
    const response = await axios.get(`${packageJson.domain.ipbackend}/member`);
    setMember(response.data);
  };

  useEffect(() => {
    fetchMember();
  }, []);

  console.log(equipment);

  return (
    <>
      <div className="lg:px-32 lg:py-5">
        <div className="bg-[#213555] text-white mt-5 flex justify-center gap-10 py-3 px-5 font-bold shadow-sm shadow-black rounded-md lg:text-2xl">
          <h1>CID : {/*<span>{status.cid}</span>*/}</h1>
          <h1>
            Ticket :{" "}
            {/*<span>{status?.TicketInfoModel?.tkdt_ID}</span>
              <span>{status?.TicketInfoLTEModel?.tkdt_ID}</span>
              <span>{status?.TicketInfoKTBModel?.tkdt_ID}</span>*/}
          </h1>
        </div>
        <div className="flex justify-end items-center p-3">
          <button
            className="bg-sky-200 text-blue-700 font-bold w-24 h-9 rounded-xl hover:bg-sky-300"
            onClick={() => {
              if (boxOne === true || boxTwo === true || boxThree === true) {
                setBoxOne(false);
                setBoxTwo(false);
                setBoxThree(false);
              } else {
                setBoxOne(true);
                setBoxTwo(true);
                setBoxThree(true);
              }
            }}
          >
            Select All
          </button>
        </div>
        <form>
          {/* section 1 */}
          <div className="bg-[#EDEDED] p-3 rounded-md">
            <div
              className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
              onClick={() => setBoxOne(!boxOne)}
            >
              <h1>Site Information</h1>
              <RiArrowDownSLine
                className={`h-10 w-10 ${boxOne ? "rotate-180" : ""}`}
              />
            </div>
            <AnimateHeight duration={600} height={boxOne ? "auto" : 0}>
              <div className="grid">
                <select className="h-12 mt-3 rounded-lg p-2 border-[1px] border-black">
                  <option value="">วัตถุประสงค์/สาเหตุ</option>
                </select>
                <select
                  className="h-12 mt-3 rounded-lg p-2 border-[1px] border-black"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (
                      selectedValue !== "" &&
                      !equipment.includes(selectedValue)
                    ) {
                      setEquipment([...equipment, selectedValue]);
                    }
                  }}
                >
                  <option value="">อุปกรณ์ที่จะเปลี่ยน</option>
                  <option value="1111">1111</option>
                  <option value="2222">2222</option>
                  <option value="3333">3333</option>
                  <option value="4444">4444</option>
                  <option value="5555">5555</option>
                </select>
              </div>
              <div className="p-3">
                {equipment.includes("1111") && (
                  <>
                    {/* -- Router -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* box-1 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Router (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                          <div className="flex flex-col gap-5 text-right font-bold">
                            <p>Router Model :</p>
                            <p>Router S/N :</p>
                            <p>Router IP :</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                      {/* box-2 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Router (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                          <div className="flex flex-col gap-5 text-right font-bold">
                            <p>Router Model :</p>
                            <p>Router S/N :</p>
                            <p>Router IP :</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <select className="border-2 border-black rounded-lg p-1">
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                            />
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 w-full flex justify-center items-center p-1 rounded-xl mt-2 text-white lg:w-[50px] lg:h-40 hover:bg-red-600"
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "1111"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
                {equipment.includes("2222") && (
                  <>
                    {/* -- SIM 1 -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* box-3 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 1 (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Main SIM :</p>
                            <p>Call No :</p>
                            <p>APN :</p>
                            <p>Call IP :</p>
                          </div>
                          <div className="grid gap-4 lg:gap-2">
                            <select
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop"
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop"
                            />
                            <select
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop"
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop"
                            />
                          </div>
                        </div>
                      </div>
                      {/* ฺBox-4 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 1 (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Main SIM :</p>
                            <p>Call No :</p>
                            <p>APN :</p>
                            <p>Call IP :</p>
                          </div>
                          <div className="grid gap-2">
                            <select className="border-2 border-black rounded-lg p-1">
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="number"
                              className="border-2 border-black rounded-lg p-1"
                            />
                            <select className="border-2 border-black rounded-lg p-1">
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 w-full flex justify-center items-center p-1 rounded-xl mt-2 text-white lg:w-[50px] lg:h-40 hover:bg-red-600"
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "2222"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
                {equipment.includes("3333") && (
                  <>
                    {/* -- SIM 2 -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* box-5 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 2 (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Main SIM :</p>
                            <p>Call No :</p>
                            <p>APN :</p>
                            <p>Call IP :</p>
                          </div>
                          <div className="grid gap-4 lg:gap-2">
                            <select
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                            <select
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                      {/* ฺBox-6 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 2 (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Main SIM :</p>
                            <p>Call No :</p>
                            <p>APN :</p>
                            <p>Call IP :</p>
                          </div>
                          <div className="grid gap-2">
                            <select className="border-2 border-black rounded-lg p-1">
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="number"
                              className="border-2 border-black rounded-lg p-1"
                            />
                            <select className="border-2 border-black rounded-lg p-1">
                              <option value="" className="text-center">
                                -- select --
                              </option>
                            </select>
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 w-full flex justify-center items-center p-1 rounded-xl mt-2 text-white lg:w-[50px] lg:h-40 hover:bg-red-600"
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "3333"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
                {equipment.includes("4444") && (
                  <>
                    {/* -- UPS -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* Box-7 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          UPS (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>UPS S/N :</p>
                            <p>UPS Brand :</p>
                            <p>UPS Model :</p>
                          </div>
                          <div className="grid gap-2">
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Box-8 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          UPS (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>UPS S/N :</p>
                            <p>UPS Brand :</p>
                            <p>UPS Model :</p>
                          </div>
                          <div className="grid gap-2">
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                            />
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                            />
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 w-full flex justify-center items-center p-1 rounded-xl mt-2 text-white lg:w-[50px] lg:h-40 hover:bg-red-600"
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "4444"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
                {equipment.includes("5555") && (
                  <>
                    {/* -- Firmware -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* Box-9 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Firmware (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Router F/W :</p>
                          </div>
                          <div className="grid gap-2">
                            <input
                              type="text"
                              disabled
                              className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Box-10 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Firmware (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Router F/W :</p>
                          </div>
                          <div className="grid gap-2">
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 w-full flex justify-center items-center p-1 rounded-xl mt-2 text-white lg:w-[50px] lg:py-7 hover:bg-red-600"
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "5555"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </AnimateHeight>
          </div>
          <>
            {/* section-2 */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
                onClick={() => setBoxTwo(!boxTwo)}
              >
                <h1>
                  Image{" "}
                  <span className="text-yellow-400">
                    (Open Ticket Before Upload Image Files)
                  </span>
                </h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxTwo ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={1000} height={boxTwo ? "auto" : 0}>
                <div className="p-5 flex flex-col items-center text-[#213555]">
                  <h1 className="text-3xl font-bold w-full p-5">Image</h1>
                  <div className="lg:grid lg:grid-cols-3 gap-5 text-center">
                    <div className="flex flex-col gap-3">
                      {/* {imageList[0]?.fileName !== "" &&
                            imageList[0]?.fileName !== undefined ? (
                              <div className="relative">
                                <img
                                  src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[0]?.cid}/${imageList[0]?.tikcetId}/${imageList[0]?.fileName}`}
                                  alt="รูปหน้าร้าน"
                                  className="w-[300px] h-[300px]"
                                />
                                <TiDelete
                                  className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNamePicture(0)}
                                />
                              </div>
                            ) : ( */}
                      <>
                        <label
                          htmlFor="file-input0"
                          className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                        >
                          <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                            <span className="text-8xl ">+</span>
                            <p>Upload Photo</p>
                          </div>
                        </label>
                        <input
                          type="file"
                          id="file-input0"
                          className="hidden"
                          // onChange={(e) =>
                          //   handleUpload(e, 0, "storefront")
                          // }
                        />
                      </>
                      {/* )} */}
                      <p>รูปหน้าร้าน</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      {/* {imageList[1]?.fileName !== "" &&
                            imageList[1]?.fileName !== undefined ? (
                              <div className="relative">
                                <img
                                  src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[1]?.cid}/${imageList[1]?.tikcetId}/${imageList[1]?.fileName}`}
                                  alt="หน้าตู้/จุดวางอุปกรณ์"
                                  className="w-[300px] h-[300px]"
                                />
                                <TiDelete
                                  className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNamePicture(1)}
                                />
                              </div>
                            ) : ( */}
                      <>
                        <label
                          htmlFor="file-input1"
                          className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                        >
                          <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                            <span className="text-8xl ">+</span>
                            <p>Upload Photo</p>
                          </div>
                        </label>
                        <input
                          type="file"
                          id="file-input1"
                          className="hidden"
                          // onChange={(e) =>
                          //   handleUpload(e, 1, "cabinetFront")
                          // }
                        />
                      </>
                      {/* )} */}
                      <p>หน้าตู้/จุดวางอุปกรณ์</p>
                    </div>
                    {/* {status.customerModel?.shortName !== "KTB" && ( */}
                    <>
                      <div className="flex flex-col gap-3">
                        {/* {imageList[2]?.fileName !== "" &&
                                imageList[2]?.fileName !== undefined ? (
                                  <div className="relative">
                                    <img
                                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[2]?.cid}/${imageList[2]?.tikcetId}/${imageList[2]?.fileName}`}
                                      alt="หน้าร้านด้านขวา"
                                      className="w-[300px] h-[300px]"
                                    />
                                    <TiDelete
                                      className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                      onClick={() => handleDeleteNamePicture(2)}
                                    />
                                  </div>
                                ) : ( */}
                        <>
                          <label
                            htmlFor="file-input2"
                            className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                          >
                            <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                              <span className="text-8xl ">+</span>
                              <p>Upload Photo</p>
                            </div>
                          </label>
                          <input
                            type="file"
                            id="file-input2"
                            className="hidden"
                            // onChange={(e) =>
                            //   handleUpload(e, 2, "cabinetRight")
                            // }
                          />
                        </>
                        {/* )} */}
                        <p>หน้าร้านด้านขวา</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {/* {imageList[3]?.fileName !== "" &&
                                imageList[3]?.fileName !== undefined ? (
                                  <div className="relative">
                                    <img
                                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[3]?.cid}/${imageList[3]?.tikcetId}/${imageList[3]?.fileName}`}
                                      alt="หน้าร้านด้านซ้าย"
                                      className="w-[300px] h-[300px]"
                                    />
                                    <TiDelete
                                      className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                      onClick={() => handleDeleteNamePicture(3)}
                                    />
                                  </div>
                                ) : ( */}
                        <>
                          <label
                            htmlFor="file-input3"
                            className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                          >
                            <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                              <span className="text-8xl ">+</span>
                              <p>Upload Photo</p>
                            </div>
                          </label>
                          <input
                            type="file"
                            id="file-input3"
                            className="hidden"
                            // onChange={(e) =>
                            //   handleUpload(e, 3, "cabinetLeft")
                            // }
                          />
                        </>
                        {/* )} */}
                        <p>หน้าร้านด้านซ้าย</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {/* {imageList[4]?.fileName !== "" &&
                                imageList[4]?.fileName !== undefined ? (
                                  <div className="relative">
                                    <img
                                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[4]?.cid}/${imageList[4]?.tikcetId}/${imageList[4]?.fileName}`}
                                      alt="จุดวางอุปกรณ์/จุดติดตั้ง"
                                      className="w-[300px] h-[300px]"
                                    />
                                    <TiDelete
                                      className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                      onClick={() => handleDeleteNamePicture(4)}
                                    />
                                  </div>
                                ) : ( */}
                        <>
                          <label
                            htmlFor="file-input4"
                            className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                          >
                            <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                              <span className="text-8xl">+</span>
                              <p>Upload Photo</p>
                            </div>
                          </label>
                          <input
                            type="file"
                            id="file-input4"
                            className="hidden"
                            // onChange={(e) =>
                            //   handleUpload(e, 4, "InstallPoint")
                            // }
                          />
                        </>
                        {/* )} */}
                        <p>จุดวางอุปกรณ์/จุดติดตั้ง</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {/* {imageList[5]?.fileName !== "" &&
                                imageList[5]?.fileName !== undefined ? (
                                  <div className="relative">
                                    <img
                                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[5]?.cid}/${imageList[5]?.tikcetId}/${imageList[5]?.fileName}`}
                                      alt="จุดวางอุปกรณ์/จุดติดตั้ง"
                                      className="w-[300px] h-[300px]"
                                    />
                                    <TiDelete
                                      className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                      onClick={() => handleDeleteNamePicture(5)}
                                    />
                                  </div>
                                ) : ( */}
                        <>
                          <label
                            htmlFor="file-input5"
                            className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                          >
                            <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                              <span className="text-8xl ">+</span>
                              <p>Upload Photo</p>
                            </div>
                          </label>
                          <input
                            type="file"
                            id="file-input5"
                            className="hidden"
                            // onChange={(e) =>
                            //   handleUpload(e, 5, "behindCabinet")
                            // }
                          />
                        </>
                        {/* )} */}
                        <p>จุดวางอุปกรณ์/จุดติดตั้ง</p>
                      </div>
                    </>
                    {/* )} */}
                  </div>
                </div>
              </AnimateHeight>
            </div>
          </>
          {/* section-3 */}
          <div className="bg-[#EDEDED] p-3 rounded-md">
            <div
              className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
              onClick={() => setBoxThree(!boxThree)}
            >
              <h1>Engineer Action</h1>
              <RiArrowDownSLine
                className={`h-10 w-10 ${boxThree ? "rotate-180" : ""}`}
              />
            </div>
            <AnimateHeight duration={1000} height={boxThree ? "auto" : 0}>
              <div className="p-5">
                <h1 className="text-[#213555] font-bold text-2xl">
                  Working Time
                </h1>
                <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                  <div className="grid gap-[22px] text-right font-bold">
                    <p>Customer Site ETA :</p>
                    <p>Working Start :</p>
                    <p>Working End :</p>
                  </div>
                  <div className="grid gap-3 lg:gap-2">
                    <input
                      type="datetime-local"
                      className="border-[1px] border-black rounded-lg p-1"
                      // disabled={status.isComplete && isAdmin !== "Admin"}
                      // {...register("customerSiteETA")}
                    />

                    <input
                      type="datetime-local"
                      className="border-[1px] border-black rounded-lg p-1"
                      // disabled={status.isComplete && isAdmin !== "Admin"}
                      // {...register("workingStart")}
                    />

                    <input
                      type="datetime-local"
                      className="border-[1px] border-black rounded-lg p-1"
                      // disabled={status.isComplete && isAdmin !== "Admin"}
                      // {...register("workingEnd")}
                    />
                  </div>
                </div>
              </div>
            </AnimateHeight>
          </div>
          <div className="flex justify-between py-5">
            <div className="flex gap-3">
              <Link
                to="/public/onsite-update/1"
                className="bg-gray-300 text-gray-600 flex items-center gap-2 rounded-xl px-3 py-3 font-bold hover:bg-gray-400"
              >
                <BsBackspaceFill />
                Back
              </Link>
              <button
                className="flex items-center gap-1 font-bold px-3 w-28 rounded-xl bg-yellow-200 hover:bg-yellow-300 text-yellow-800"
                type="submit"
                // disabled={status.isComplete && isAdmin !== "Admin"}
                // onClick={() => setUpdate(1)}
              >
                <RiDraftFill className="h-6 w-7" />
                {/* {status.isComplete && isAdmin === "Admin" ? "Update" : "Draft"} */}
              </button>
            </div>
            {/* {isAdmin === "Admin" && ( */}
            <button
              className="flex items-center gap-1 font-bold px-3 w-28 rounded-xl bg-green-200 hover:bg-green-300 text-green-800"
              type="submit"
              // disabled={status.isComplete && isAdmin !== "Admin"}
              // onClick={() => setUpdate(2)}
            >
              <MdSave className="h-6 w-7" />
              Save
            </button>
            {/* )} */}
          </div>
        </form>
      </div>
    </>
  );
}

export default Replacement;
