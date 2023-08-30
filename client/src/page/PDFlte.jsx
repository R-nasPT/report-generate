import React from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

function PDFlte() {
  const downloadPDF = async () => {
    const element = document.getElementById("element-to-print");
    const opt = {
      margin: 1,
      filename: ``,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
    };

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return (
    <>
      <div>
        <div className="py-8 px-96 bg-slate-300 ">
          <div className="flex gap-3 mb-2">
            <Link /*to={`/user/detailpage/${id}`}*/>
              <img
                src="/component/back.png"
                alt="pdf"
                className="w-9 h-9 p-2 bg-red-600 hover:bg-red-500 rounded-md"
              />
            </Link>
            <Link to="/user/mock">
              <img
                src="/user/home 2.png"
                alt="home"
                className="w-9 h-9 p-2 bg-blue-500 hover:bg-blue-400 rounded-md"
              />
            </Link>
            <img
              src="/component/download.png"
              alt="pdf"
              onClick={downloadPDF}
              className="w-9 h-9 p-2 bg-red-400 hover:bg-red-500 rounded-md"
            />
          </div>
          <div
            id="element-to-print"
            className="py-6 px-8 bg-white font-thai-sarabun"
          >
            <section className="h-[1060px] text-[8.1px]">
              <div className="flex justify-between">
                <div className="flex">
                  <img src="/user/logo.PNG" alt="logo" width={60} />
                  <div className="flex items-end">
                    <img src="/user/namelogo.PNG" alt="name" width={170} />
                  </div>
                </div>
                <div className="text-right text-[9px]">
                  <p>
                    1011 Supalai Grand Tower, 16th Floor, Rama 3 Road.,
                    Chongnonsi, Yannawa, Bangkok 10120
                  </p>
                  <p>Tel. +66(0) 2056-2099 Fax. +66(0) 2056-2088</p>
                </div>
              </div>
              <h1 className="bg-slate-400 border-[1px] border-black text-center pb-3 my-1 font-semibold text-lg">
                LTE MPLS-Acceptance Testing Report
              </h1>
              {/* Site Information */}
              <p className="font-extrabold pb-1">Site Information</p>
              {/* 1 */}
              <div className="flex border-[1px] border-black">
                <div className="flex">
                  <div className="flex gap-1 px-4 border-r-[1px] border-black">
                    <div className="flex items-center">
                      <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                    </div>
                    <p>New Installation</p>
                  </div>
                  <div className="flex gap-1 px-4 border-r-[1px] border-black">
                    <div className="flex items-center">
                      <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                    </div>
                    <p>Replacement</p>
                  </div>
                  <div className="flex gap-1 px-4 border-r-[1px] border-black">
                    <div className="flex items-center">
                      <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                    </div>
                    <p>Renovate</p>
                  </div>
                </div>
                <div className="py-1">.</div>
              </div>
              {/* 2 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black">
                  Customer : …………………………………………………………………………………………
                </p>
                <p className="px-2 border-r-[1px] border-black">
                  CID : ……………………………………
                </p>
                <p className="pl-2"> Station ID : ………………………………………………</p>
                <div className="py-1">.</div>
              </div>
              {/* 3 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black">
                  Branch : …………………………………………………………………………………………………
                </p>
                <p className="px-2 border-r-[1px] border-black">
                  Contact Name : …………………………………
                </p>
                <p className="pl-2">TEL. : ………………………………………</p>
                <div className="py-1">.</div>
              </div>
              {/* 4 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <p className="px-2">
                  {" "}
                  Address :
                  ……………………………………………………………………………………………………………………………………………………………………………………………………………
                </p>
                <div className="py-1">.</div>
              </div>
              {/* Router */}
              <p className="font-extrabold pb-1">Router</p>
              {/* 5 */}
              <div className="flex border-[1px] border-black">
                <p className="px-3 border-r-[1px] border-black">Router Model</p>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>WEx2Ei3</p>
                </div>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>WEx2Ei3G1</p>
                </div>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>……………………………………………………</p>
                </div>
                <p className="px-2">Router S/N : ……………………………………………………</p>
                <div className="py-1">.</div>
              </div>
              {/* 6 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black">
                  Router IP : ………………………………
                </p>
                <p className="px-2 border-r-[1px] border-black">
                  Subnet Mask : ……………………………
                </p>
                <p className="px-2 border-r-[1px] border-black">
                  Router F/W : …………………………………
                </p>
                <p className="pl-2">Rack S/N : ……………………………………………</p>
                <div className="py-1">.</div>
              </div>
              {/* 7 */}
              <div className="flex border-[1px] border-black">
                <p className="px-3 border-r-[1px] border-black">
                  Antenna Gain :
                </p>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>3 dBi.</p>
                </div>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>6 dBi.</p>
                </div>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>9 dBi.</p>
                </div>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>…dBi.</p>
                </div>
                <p className="px-2"> GPS N : ……………………………………….E : ……………………………………………</p>
                <div className="py-1">.</div>
              </div>
              {/* SIM & Cell Site */}
              <p className="font-extrabold pb-1">SIM & Cell Site</p>
              {/* 8 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black">
                  SIM#1 Calling : ………………………
                </p>
                <p className="px-2 border-r-[1px] border-black">
                  APN : …………………………………
                </p>
                <p className="px-2 border-r-[1px] border-black">LAC : ………………</p>
                <p className="px-2 border-r-[1px] border-black">
                  Cell ID : ……………………
                </p>
                <p className="pl-2">Connection Type : ……………………………………</p>
                <div className="py-1">.</div>
              </div>
              {/* 9 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-3 border-r-[1px] border-black">
                  SIM#1 IP : ………………………….
                </p>
                <div className="flex gap-1 px-4 ">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>AIS</p>
                </div>
                <div className="flex gap-1 px-4 ">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>DTAC</p>
                </div>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>……………</p>
                </div>

                <p className="px-2 border-r-[1px] border-black">
                  Signal Strength ………………dBm ({">"}-91 dBm){" "}
                </p>
                <p className="px-2">Packet SIM : …………………….</p>
                <div className="py-1">.</div>
              </div>
              {/* 10 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black">
                  SIM#2 Calling : ………………………
                </p>
                <p className="px-2 border-r-[1px] border-black">
                  APN : …………………………………
                </p>
                <p className="px-2 border-r-[1px] border-black">LAC : ………………</p>
                <p className="px-2 border-r-[1px] border-black">
                  Cell ID : ……………………
                </p>
                <p className="pl-2">Connection Type : ……………………………………</p>
                <div className="py-1">.</div>
              </div>
              {/* 11 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <p className="px-3 border-r-[1px] border-black">
                  SIM#2 IP : ………………………….
                </p>
                <div className="flex gap-1 px-4 ">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>AIS</p>
                </div>
                <div className="flex gap-1 px-4 ">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>DTAC</p>
                </div>
                <div className="flex gap-1 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm"></div>
                  </div>
                  <p>……………</p>
                </div>
                <p className="px-2 border-r-[1px] border-black">
                  Signal Strength ………………dBm ({">"}-91 dBm){" "}
                </p>
                <p className="px-2">Packet SIM : …………………….</p>
                <div className="py-1">.</div>
              </div>
              {/* Bandwidth Test */}
              <p className="font-extrabold pb-1">Bandwidth Test</p>
              {/* 12 */}
              <div className="flex border-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black">
                  SIM#1 Max Bandwidth (Download) : ……………………. Mbps (&gt;512 kbps)
                </p>
                <p className="px-3 ">
                  SIM#2 Max Bandwidth (Download) : ……………………… Mbps ({">"}512 kbps)
                </p>
                <div className="py-1">.</div>
              </div>
              {/* 13 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black">
                  SIM#1 Max Bandwidth (Upload) : ………………………… Mbps (&gt;512 kbps)
                </p>
                <p className="px-3 ">
                  SIM#2 Max Bandwidth (Upload) : ………………………… Mbps ({">"}512 kbps)
                </p>
                <div className="py-1">.</div>
              </div>
              {/* Throughput Test */}
              <p className="font-extrabold pb-1">Throughput Test</p>
              {/* 14 */}
              <div className="flex border-[1px] border-black">
                <div className=" border-r-[1px] border-black">
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    SIM#1 Download :
                  </p>
                  <div className="flex flex-col items-center">
                    <p>1 …………………………… Mbps</p>
                    <p>2 …………………………… Mbps</p>
                    <p>3 …………………………… Mbps</p>
                    <p>4 …………………………… Mbps</p>
                    <p>5 …………………………… Mbps</p>
                  </div>
                  <p className="pl-9 font-extrabold">
                    Download Average …………………………… Mbps
                  </p>
                  <p className="px-2 font-extrabold">
                    {" "}
                    SIM#1 Ping Test (256 bytes) …………%success Average……………ms ({"<"}
                    400 ms)
                  </p>
                </div>
                <div>
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    SIM#2 Download :
                  </p>
                  <div className="flex flex-col items-center">
                    <p>1 ………………………… Mbps</p>
                    <p>2 ………………………… Mbps</p>
                    <p>3 ………………………… Mbps</p>
                    <p>4 ………………………… Mbps</p>
                    <p>5 ………………………… Mbps</p>
                  </div>
                  <p className="pl-9 font-extrabold">
                    Download Average ………………………… Mbps
                  </p>
                  <p className="px-2 font-extrabold pb-2">
                    {" "}
                    SIM#1 Ping Test (256 bytes) ……………%success Average…………ms (
                    {"<"}400 ms)
                  </p>
                </div>
              </div>
              {/* 15 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <div className=" border-r-[1px] border-black">
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    SIM#1 Upload :
                  </p>
                  <div className="flex flex-col items-center">
                    <p>1 …………………………… Mbps</p>
                    <p>2 …………………………… Mbps</p>
                    <p>3 …………………………… Mbps</p>
                    <p>4 …………………………… Mbps</p>
                    <p>5 …………………………… Mbps</p>
                  </div>
                  <p className="pl-9 font-extrabold">
                    Upload Average …………………………… Mbps
                  </p>
                  <p className="px-2 font-extrabold">
                    {" "}
                    SIM#1 Ping Test (1410 bytes) ……………%success Average…………ms ({"<"}
                    400 ms)
                  </p>
                </div>
                <div>
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    SIM#2 Upload :
                  </p>
                  <div className="flex flex-col items-center">
                    <p>1 …………………………… Mbps</p>
                    <p>2 …………………………… Mbps</p>
                    <p>3 …………………………… Mbps</p>
                    <p>4 …………………………… Mbps</p>
                    <p>5 …………………………… Mbps</p>
                  </div>
                  <p className="pl-9 font-extrabold">
                    Upload Average …………………………… Mbps
                  </p>
                  <p className="px-2 font-extrabold pb-2">
                    {" "}
                    SIM#1 Ping Test (1410 bytes) …………%success Average…………ms ({"<"}
                    400 ms)
                  </p>
                </div>
              </div>
              {/* Application Test */}
              <p className="font-extrabold pb-1">Application Test</p>
              {/* 16 */}
              <div className="flex w-[722px] border-[1px] border-black">
                {/* 16.1 */}
                <div className=" border-r-[1px] border-black w-48">
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    Application
                  </p>
                  <div className="px-4 pb-2">
                    <p>1) ………………………………………………</p>
                    <p>2) ………………………………………………</p>
                    <p>3) ………………………………………………</p>
                    <p>4) ………………………………………………</p>
                    <p>5) ………………………………………………</p>
                    <p>6) ………………………………………………</p>
                    <p>7) ………………………………………………</p>
                    <p>8) ………………………………………………</p>
                  </div>
                </div>
                {/* 16.2 */}
                <div className=" border-r-[1px] border-black">
                  <div className="flex gap-1 px-4 font-extrabold bg-slate-300 pb-1">
                    <p>SIM#1</p>
                    <div className="flex items-center">
                      <div className="border-[1px] border-black p-1 rounded-sm"></div>
                    </div>
                    <p>Active</p>
                    <div className="flex items-center">
                      <div className="border-[1px] border-black p-1 rounded-sm"></div>
                    </div>
                    <p>Back Up</p>
                    <p>Page Load Time(s)</p>
                  </div>
                  <div className="grid grid-cols-3 px-4 border-r-[1px]">
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                  </div>
                </div>
                {/* 16.3 */}
                <div className="w-[280px]">
                  <div className="flex gap-1 px-4 font-extrabold bg-slate-300 pb-1">
                    <p>SIM#2</p>
                    <div className="flex items-center">
                      <div className="border-[1px] border-black p-1 rounded-sm"></div>
                    </div>
                    <p>Active</p>
                    <div className="flex items-center">
                      <div className="border-[1px] border-black p-1 rounded-sm"></div>
                    </div>
                    <p>Back Up</p>
                    <p>Page Load Time(s)</p>
                  </div>
                  <div className="grid grid-cols-3 px-5">
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Pass</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <div className="border-[1px] border-black p-1 rounded-sm"></div>
                      </div>
                      <p>Fail</p>
                    </div>
                    <p>..............................</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-7 border-x-[1px] border-black pb-2">
                <p className="font-semibold">Office Departure :</p>
                <p>Date : _____/_____/_____ Time _____:_____</p>
                <p className="font-semibold">Office Arrival :</p>
                <p> Date : _____/_____/_____ Time _____:_____</p>
              </div>
              <div className="flex border-[1px] border-black">
                <div className="border-r-[1px] border-black">
                  <p className="px-4 font-extrabold bg-slate-300 pb-1">
                    Customer Site
                  </p>
                  <div className="grid grid-cols-2 px-3 pb-2">
                    <p>ETA : </p>
                    <p>Date : _____/_____/_____ Time _____:_____</p>
                    <p>Arrival : </p>
                    <p>Date : _____/_____/_____ Time _____:_____</p>
                    <p>Departure : </p>
                    <p>Date : _____/_____/_____ Time _____:_____</p>
                  </div>
                </div>
                <div>
                  <p className="px-4 font-extrabold bg-slate-300 pb-1">
                    Working
                  </p>
                  <div className="grid grid-cols-2 px-4">
                    <p>Start : </p>
                    <p>Date : _____/_____/_____ Time _____:_____</p>
                    <p>End : </p>
                    <p>Date : _____/_____/_____ Time _____:_____</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-5 gap-3">
                <div className="flex justify-around">
                  <div className="font-semibold text-right">
                    <p>PP Ontime Engineer / :</p>
                    <p>Serviced By</p>
                  </div>
                  <div className="text-center">
                    <p>………………………………………….</p>
                    <p>(…………………………)</p>
                    <p>_____/_____/_____</p>
                  </div>
                  <div className="font-semibold text-right">
                    <p>Customer / :</p>
                    <p>Approved By</p>
                  </div>
                  <div className="text-center">
                    <p>………………………………………….</p>
                    <p>(…………………………)</p>
                    <p>_____/_____/_____</p>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div className="pl-11 font-semibold text-right">
                    <p>Engineer / :</p>
                    <p>Manager</p>
                  </div>
                  <div className="text-center">
                    <p>………………………………………….</p>
                    <p>(…………………………)</p>
                    <p>_____/_____/_____</p>
                  </div>
                  <div className="font-semibold text-right">
                    <p>Engineering / :</p>
                    <p>Director</p>
                  </div>
                  <div className="text-center">
                    <p>………………………………………….</p>
                    <p>(…………………………)</p>
                    <p>_____/_____/_____</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default PDFlte;
