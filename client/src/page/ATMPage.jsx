import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimateHeight from "react-animate-height";
import { RiArrowDownSLine, RiDraftFill } from "react-icons/ri";
import { MdCancel, MdSave } from "react-icons/md";

function ATMPage() {
  const [boxOne, setBoxOne] = useState(false);
  const [boxTwo, setBoxTwo] = useState(false);
  const [boxThree, setBoxThree] = useState(false);

  return (
    <>
      <div className="px-32 py-5">
        <h1 className="py-3 px-5 font-bold shadow-sm shadow-black rounded-md">
          Home / Installation / New Install / TTB1285
        </h1>
        <div className="px-5">
          <div className="mt-5 flex justify-center gap-10 py-3 px-5 font-bold shadow-sm shadow-black rounded-md text-2xl">
            <h1>
              CID : <span>TTB1285</span>
            </h1>
            <h1>
              Ticket : <span>INS.1234578</span>
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 py-4">
              <button className="bg-[#949494] text-white w-40 py-2 rounded-3xl hover:bg-neutral-500 focus:bg-[#1A16D3]">
                New Install Update
              </button>
              <button className="bg-[#949494] text-white w-40 py-2 rounded-3xl hover:bg-neutral-500 focus:bg-[#1A16D3]">
                Edit Information
              </button>
              <button className="bg-[#949494] text-white w-40 py-2 rounded-3xl hover:bg-neutral-500 focus:bg-[#1A16D3]">
                Replacement
              </button>
            </div>
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
          {/* input content */}
          <div className="flex flex-col gap-5">
            {/* section-1 */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#DBDCE5] text-2xl font-bold p-2 rounded-md hover:bg-gray-300"
                onClick={() => setBoxOne(!boxOne)}
              >
                <h1>Site Information</h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxOne ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={1000} height={boxOne ? "auto" : 0}>
                <div className="grid grid-cols-2 p-3 gap-5">
                  {/* box-1 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                      Site Information
                    </h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Station ID :</p>
                        <p>Branch :</p>
                        <p>Address :</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="text"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <textarea
                          cols="23"
                          rows="3"
                          className="border-2 border-black rounded-lg p-1"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  {/* box-2 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                      Site Update
                    </h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Contact Name :</p>
                        <p>Tel :</p>
                        <p>GPS N :</p>
                        <p>GPS E :</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="tel"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="number"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="number"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                    </div>
                  </div>
                  {/* box-3 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                      Router Information
                    </h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Router Model :</p>
                        <p>Router F/W :</p>
                        <p>Router S/N :</p>
                        <p>Router IP :</p>
                        <p>SubnetMask :</p>
                        <p>Rack S/N :</p>
                        <p>Antenna Gain :</p>
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
                        <input
                          type="text"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                    </div>
                  </div>
                  {/* box-4 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                      ATM Information
                    </h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>ATM Protocol :</p>
                        <p>ATM Brand :</p>
                        <p>ATM Type :</p>
                        <p>ATM IP :</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <select className="border-2 border-black rounded-lg p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                        <select className="border-2 border-black rounded-lg p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
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
                  {/* box-5 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">SIM 1</h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Main SIM :</p>
                        <p>Call No :</p>
                        <p>APN :</p>
                        <p>Call IP :</p>
                        <p>LAC :</p>
                        <p>Cell ID :</p>
                        <p>Switch Over :</p>
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
                        <input
                          type="number"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <label className="flex p-2 gap-3 items-center">
                          <input type="checkbox" className="h-6 w-6" />
                          <span>Complete</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* box-6 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                      Test SIM 1
                    </h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Connection :</p>
                        <p>Package :</p>
                        <p>Signal Strength :</p>
                        <p>Pinging Test :</p>
                        <p>Average :</p>
                        <p>Download :</p>
                        <p>Upload :</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <select className="border-2 border-black rounded-lg p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          <span>
                            dBm(
                            <span className="text-red-500 font-bold">
                              &gt;-91dbm
                            </span>
                            )
                          </span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            max={100}
                            min={0}
                            className="border-2 border-black rounded-lg p-1"
                          />
                          % Success
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          <span>
                            ms(
                            <span className="text-red-500 font-bold">
                              &lt;400 ms
                            </span>
                            )
                          </span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          <span>
                            mbps(
                            <span className="text-red-500 font-bold">
                              &gt;512 kbps
                            </span>
                            )
                          </span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          <span>
                            mbps(
                            <span className="text-red-500 font-bold">
                              &gt;512 kbps
                            </span>
                            )
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* box-7 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">SIM 2</h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Main SIM :</p>
                        <p>Call No :</p>
                        <p>APN :</p>
                        <p>Call IP :</p>
                        <p>LAC :</p>
                        <p>Cell ID :</p>
                        <p>Switch Over :</p>
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
                        <input
                          type="number"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <label className="flex p-2 gap-3 items-center">
                          <input type="checkbox" className="h-6 w-6" />
                          <span>Complete</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* box-8 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                      Test SIM 2
                    </h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Connection :</p>
                        <p>Package :</p>
                        <p>Signal Strength :</p>
                        <p>Pinging Test :</p>
                        <p>Average :</p>
                        <p>Download :</p>
                        <p>Upload :</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <select className="border-2 border-black rounded-lg p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          <span>
                            dBm(
                            <span className="text-red-500 font-bold">
                              &gt;-91dbm
                            </span>
                            )
                          </span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            max={100}
                            min={0}
                            className="border-2 border-black rounded-lg p-1"
                          />
                          % Success
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          <span>
                            ms(
                            <span className="text-red-500 font-bold">
                              &lt;400 ms
                            </span>
                            )
                          </span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          <span>
                            mbps(
                            <span className="text-red-500 font-bold">
                              &gt;512 kbps
                            </span>
                            )
                          </span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          <span>
                            mbps(
                            <span className="text-red-500 font-bold">
                              &gt;512 kbps
                            </span>
                            )
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* box-9 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                      UPS Information
                    </h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>UPS Type :</p>
                        <p>UPS S/N :</p>
                        <p>UPS Brand :</p>
                        <p>UPS Model :</p>
                        <p>Battery Start :</p>
                        <p>Rate :</p>
                        <p>Load :</p>
                        <p>Temperature :</p>
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
                        <input
                          type="text"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          KVA
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            max={100}
                            min={0}
                            className="border-2 border-black rounded-lg p-1"
                          />
                          %
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          C
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* box-10 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                    Testing
                    </h1>
                    <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-10 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>L - N :</p>
                        <p>L - G :</p>
                        <p>N - G :</p>
                        <p>Bypass Mode :</p>
                        <p>Power Fail Test :</p>
                        <p>Command Test :</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          Volt
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          Volt
                        </div>
                        <div className="flex gap-3 items-center">
                          <input
                            type="number"
                            className="border-2 border-black rounded-lg p-1"
                          />
                          Volt
                        </div>
                        <label className="flex p-1 gap-3 items-center">
                          <input type="checkbox" className="h-6 w-6" />
                          <span>pass</span>
                        </label>
                        <label className="flex p-1 gap-3 items-center">
                          <input type="checkbox" className="h-6 w-6" />
                          <span>pass</span>
                        </label>
                        <label className="flex p-1 pt-3 gap-3 items-center">
                          <input type="checkbox" className="h-6 w-6" />
                          <span>pass</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* box-11 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">
                      Other Information
                    </h1>
                    <table className=" bg-[#E5E5E5] py-5 pl-5">
                      <thead className="border-[1px] border-zinc-500">
                        <tr>
                          <th>Name :</th>
                          <th>Type :</th>
                          <th>Brand :</th>
                          <th>Serial :</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="w-36 border-[1px] border-black rounded-lg p-1"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* box-12 */}
                  <div>
                    <h1 className="text-[#1A16D3] font-bold text-2xl">Note</h1>
                    <div className="flex gap-5 bg-[#E5E5E5] rounded-xl px-5 py-2">
                      <span className="font-bold">Note : </span>
                      <textarea
                        cols="50"
                        rows="5"
                        className="border-[1px] border-black rounded-lg p-1"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </AnimateHeight>
            </div>
            {/* section-2 */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#DBDCE5] text-2xl font-bold p-2 rounded-md hover:bg-gray-300"
                onClick={() => setBoxTwo(!boxTwo)}
              >
                <h1>Image</h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxTwo ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={1000} height={boxTwo ? "auto" : 0}>
                <div className="p-5 flex flex-col items-center">
                  <h1 className="text-3xl font-bold w-full p-5">Image</h1>
                  <div className="grid grid-cols-3 gap-5 text-center">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="file-input"
                        className="flex flex-col justify-center border-[2px] border-sky-900 text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
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
                        className="flex flex-col justify-center border-[2px] border-sky-900 text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
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
                        className="flex flex-col justify-center border-[2px] border-sky-900 text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
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
                        className="flex flex-col justify-center border-[2px] border-sky-900 text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
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
                        className="flex flex-col justify-center border-[2px] border-sky-900 text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
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
                        className="flex flex-col justify-center border-[2px] border-sky-900 text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
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
              </AnimateHeight>
            </div>
            {/* section-3 */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#DBDCE5] text-2xl font-bold p-2 rounded-md hover:bg-gray-300"
                onClick={() => setBoxThree(!boxThree)}
              >
                <h1>Engineer Action</h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxThree ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={1000} height={boxThree ? "auto" : 0}>
                <div className="p-5">
                  <h1 className="text-[#1A16D3] font-bold text-2xl">
                    Site Information
                  </h1>
                  <div className="flex gap-2 bg-[#E5E5E5] py-5 pl-5 rounded-xl">
                    <div className="flex flex-col gap-[22px] text-right font-bold">
                      <p>Office Departure :</p>
                      <p>Office Arrival :</p>
                      <p>Customer Site ETA :</p>
                      <p>Customer Site Arrival :</p>
                      <p>Customer Site Departure :</p>
                      <p>Working Start :</p>
                      <p>Working End :</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-3">
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                        />
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateHeight>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5 py-5">
          <button className="flex items-center text-red-500 gap-1 font-bold bg-red-200 px-3 w-28 h-12 rounded-xl hover:bg-red-300">
            <MdCancel className="h-6 w-7" /> Cancel
          </button>
          <button className="flex items-center text-yellow-800 gap-1 font-bold bg-yellow-200 px-3 w-28 rounded-xl hover:bg-yellow-300">
            <RiDraftFill className="h-6 w-7" />
            Draft
          </button>
          <button className="flex items-center text-green-800 gap-1 font-bold bg-green-200 px-3 w-28 rounded-xl hover:bg-green-300"><MdSave className="h-6 w-7"/>Save</button>
        </div>
      </div>
    </>
  );
}

export default ATMPage;
