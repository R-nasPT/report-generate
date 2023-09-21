import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import { RiArrowDownSLine } from "react-icons/ri";

function Replacement({ boxOne, setBoxOne }) {
  return (
    <>
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
          <div className="lg:grid lg:grid-cols-2 p-3 gap-5">
            {/* box-1 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                Router (Old)
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
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
                  <input
                    type="text"
                    disabled
                    className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
            {/* box-2 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                Router (Replace to)
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
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
            {/* box-3 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                SIM 1 (Old)
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                <div className="grid gap-5 text-right font-bold">
                  <p>Main SIM :</p>
                  <p>Call No :</p>
                  <p>APN :</p>
                  <p>Call IP :</p>
                  <p>LAC :</p>
                  <p>Cell ID :</p>
                  <p>Switch Over :</p>
                </div>
                <div className="grid gap-4 lg:gap-2">
                  <select disabled className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop">
                    <option value="" className="text-center">
                      -- select --
                    </option>
                  </select>
                  <input
                    type="text"
                    disabled
                    className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop"
                  />
                  <select disabled className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop">
                    <option value="" className="text-center">
                      -- select --
                    </option>
                  </select>
                  <input
                    type="text"
                    disabled
                    className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop"
                  />
                  <input
                    type="text"
                    disabled
                    className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop"
                  />
                  <input
                    type="number"
                    disabled
                    className="border-2 border-black rounded-lg p-1 opacity-50 cursor-no-drop"
                  />
                  <label className="flex p-2 gap-3 items-center">
                    <input type="checkbox" disabled className="h-6 w-6 cursor-no-drop" />
                    <span>Complete</span>
                  </label>
                </div>
              </div>
            </div>
            {/* ฺBox-4 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                SIM 1 (Replace to)
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                <div className="grid gap-5 text-right font-bold">
                  <p>Main SIM :</p>
                  <p>Call No :</p>
                  <p>APN :</p>
                  <p>Call IP :</p>
                  <p>LAC :</p>
                  <p>Cell ID :</p>
                  <p>Connection :</p>
                  <p>Signal Strength :</p>
                  <p>Package :</p>
                  <p>Switch Over :</p>
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
                  <input
                    type="text"
                    className="border-2 border-black rounded-lg p-1"
                  />
                  <input
                    type="number"
                    className="border-2 border-black rounded-lg p-1"
                  />
                  <input
                    type="text"
                    className="border-2 border-black rounded-lg p-1"
                  />
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="number"
                      className="border-2 border-black rounded-lg p-1"
                    />
                    <span>
                      mbps(
                      <span className="text-red-500 font-bold">&gt;-91dbm</span>
                      )
                    </span>
                  </div>
                  <select className="border-2 border-black rounded-lg p-1">
                    <option value="" className="text-center">
                      -- select --
                    </option>
                  </select>
                  <label className="flex p-1 gap-3 items-center">
                    <input type="checkbox" className="h-6 w-6" />
                    <span>Complete</span>
                  </label>
                </div>
              </div>
            </div>
            {/* box-5 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                SIM 2 (Old)
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                <div className="grid gap-5 text-right font-bold">
                  <p>Main SIM :</p>
                  <p>Call No :</p>
                  <p>APN :</p>
                  <p>Call IP :</p>
                  <p>LAC :</p>
                  <p>Cell ID :</p>
                  <p>Switch Over :</p>
                </div>
                <div className="grid gap-4 lg:gap-2">
                  <select disabled className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed">
                    <option value="" className="text-center">
                      -- select --
                    </option>
                  </select>
                  <input
                    type="text"
                    disabled
                    className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                  />
                  <select disabled className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed">
                    <option value="" className="text-center">
                      -- select --
                    </option>
                  </select>
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
                    type="number"
                    disabled
                    className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                  />
                  <label className="flex p-2 gap-3 items-center">
                    <input type="checkbox" disabled className="h-6 w-6 cursor-not-allowed" />
                    <span>Complete</span>
                  </label>
                </div>
              </div>
            </div>
            {/* ฺBox-6 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                SIM 2 (Replace to)
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                <div className="grid gap-5 text-right font-bold">
                  <p>Main SIM :</p>
                  <p>Call No :</p>
                  <p>APN :</p>
                  <p>Call IP :</p>
                  <p>LAC :</p>
                  <p>Cell ID :</p>
                  <p>Connection :</p>
                  <p>Signal Strength :</p>
                  <p>Package :</p>
                  <p>Switch Over :</p>
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
                  <input
                    type="text"
                    className="border-2 border-black rounded-lg p-1"
                  />
                  <input
                    type="number"
                    className="border-2 border-black rounded-lg p-1"
                  />
                  <input
                    type="text"
                    className="border-2 border-black rounded-lg p-1"
                  />
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="number"
                      className="border-2 border-black rounded-lg p-1"
                    />
                    <span>
                      mbps(
                      <span className="text-red-500 font-bold">&gt;-91dbm</span>
                      )
                    </span>
                  </div>
                  <select className="border-2 border-black rounded-lg p-1">
                    <option value="" className="text-center">
                      -- select --
                    </option>
                  </select>
                  <label className="flex p-1 gap-3 items-center">
                    <input type="checkbox" className="h-6 w-6" />
                    <span>Complete</span>
                  </label>
                </div>
              </div>
            </div>
            {/* Box-7 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                UPS (Old)
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                <div className="grid gap-5 text-right font-bold">
                  <p>UPS Type :</p>
                  <p>UPS S/N :</p>
                  <p>UPS Brand :</p>
                  <p>UPS Model :</p>
                  <p>Battery Start :</p>
                  <p>Rate :</p>
                  <p>Load :</p>
                  <p>Temperature :</p>
                </div>
                <div className="grid gap-2">
                  <select disabled className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed">
                    <option value="" className="text-center">
                      -- select --
                    </option>
                  </select>
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
                  <input
                    type="date"
                    disabled
                    className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                  />
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="number"
                      disabled
                      className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                    />
                    KVA
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="number"
                      disabled
                      max={100}
                      min={0}
                      className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                    />
                    %
                  </div>
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="number"
                      disabled
                      className="border-2 border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                    />
                    C
                  </div>
                </div>
              </div>
            </div>
            {/* Box-8 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                UPS (Replace to)
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                <div className="grid gap-5 text-right font-bold">
                  <p>UPS Type :</p>
                  <p>UPS S/N :</p>
                  <p>UPS Brand :</p>
                  <p>UPS Model :</p>
                  <p>Battery Start :</p>
                  <p>Rate :</p>
                  <p>Load :</p>
                  <p>Temperature :</p>
                </div>
                <div className="grid gap-2">
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
                  <div className="flex flex-wrap lg:gap-3 items-center">
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
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="number"
                      className="border-2 border-black rounded-lg p-1"
                    />
                    C
                  </div>
                </div>
              </div>
            </div>
            {/* box-9 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                Other Information
              </h1>
              <div className="overflow-auto">
                <table className=" bg-[#E5D283] py-5 pl-5">
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
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled
                          className="w-36 border-[1px] border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled
                          className="w-36 border-[1px] border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled
                          className="w-36 border-[1px] border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select disabled className="border-2 border-black rounded-lg w-36 p-1 opacity-50 cursor-not-allowed">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          disabled
                          className="w-36 border-[1px] border-black rounded-lg p-1 opacity-50 cursor-not-allowed"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* box-10 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                Other (Replace to)
              </h1>
              <div className="overflow-auto">
                <table className=" bg-[#E5D283] py-5 pl-5">
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
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
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
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
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
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
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
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
                      </td>
                      <td>
                        <select className="border-2 border-black rounded-lg w-36 p-1">
                          <option value="" className="text-center">
                            -- select --
                          </option>
                        </select>
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
            </div>
          </div>
        </AnimateHeight>
      </div>
    </>
  );
}

export default Replacement;
