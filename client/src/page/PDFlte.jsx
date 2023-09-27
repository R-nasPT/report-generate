import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import axios from "axios";
import packageJson from "../../package.json";
import LoadingPage from "../component/LoadingPage";
import { ImCheckmark } from "react-icons/im";

function PDFlte() {
  const [lteReport, setLteReport] = useState();

  console.log(lteReport);
  const { id } = useParams();
  const downloadPDF = async () => {
    const element = document.getElementById("element-to-print");
    const currentDate = new Date().toISOString().split('T')[0];
    const opt = {
      margin: 1,
      filename: `LTE Report ${currentDate}`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
    };

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  useEffect(() => {
    const fetchDataLte = async () => {
      const response = await axios.get(
        `${packageJson.domain.ipSiteInfo}/siteinfo/getreport/${id}`
      );
      console.log(response.data);
      setLteReport(response.data);
    };
    fetchDataLte();
  }, []);

  const formatDate = (dateString) => {
    if (dateString !== null) {
      const createDate = new Date(dateString);
      const formattedDate = `Date : ${("0" + createDate.getDate()).slice(
        -2
      )} / ${("0" + (createDate.getMonth() + 1)).slice(
        -2
      )} / ${createDate.getFullYear()} Time ${(
        "0" + createDate.getHours()
      ).slice(-2)}:${("0" + createDate.getMinutes()).slice(-2)}`;
      return formattedDate;
    }
  };

  if (lteReport === undefined) return <LoadingPage />;

  return (
    <>
      <div>
        <div className="py-8 px-96 bg-slate-300 ">
          <div className="flex gap-3 mb-2">
            <Link to={`/user/atmpage/${id}`}>
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
                      <div className="border-[1.7px] border-black p-1 rounded-sm relative">
                        <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                      </div>
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
                <p className="px-2 border-r-[1px] border-black w-1/3">
                  Customer : {lteReport.customerModel?.fullNameThai}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/3">
                  CID : {lteReport.cid}
                </p>
                <p className="pl-2">
                  {" "}
                  Station ID : {lteReport.atmModel?.stationId}
                </p>
                <div className="py-1">.</div>
              </div>
              {/* 3 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/3">
                  Branch : {lteReport.siteName}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/3">
                  Contact Name : {lteReport.contractName}
                </p>
                <p className="pl-2">TEL. : {lteReport.tel}</p>
                <div className="py-1">.</div>
              </div>
              {/* 4 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <p className="px-2"> Address : {lteReport.address}</p>
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
                <div className="flex gap-2 px-4 border-r-[1px] border-black w-1/5">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm relative">
                      <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                    </div>
                  </div>
                  <p>
                    {
                      lteReport.routerInfoModel?.productTypeModel
                        ?.productTypeName
                    }
                  </p>
                </div>
                <p className="px-2">
                  Router S/N : {lteReport.routerInfoModel?.serialNo}
                </p>
                <div className="py-1">.</div>
              </div>
              {/* 6 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Router IP : {lteReport.routerInfoModel?.network}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Subnet Mask : {lteReport.routerInfoModel?.mask}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Router F/W : {lteReport.routerInfoModel?.firmwareVersion}
                </p>
                <p className="pl-2">
                  Rack S/N : {lteReport.otherInfoModel?.rackSerialNo}
                </p>
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
                <div className="flex gap-1 px-4 border-r-[1px] border-black w-1/6">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm relative">
                      <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                    </div>
                  </div>
                  <p>{lteReport.otherInfoModel?.antennaGain} dBi.</p>
                </div>
                <p className="px-2">
                  {" "}
                  GPS N : {lteReport.GPSNo} ,E : {lteReport.GPSE}
                </p>
                <div className="py-1">.</div>
              </div>
              {/* SIM & Cell Site */}
              <p className="font-extrabold pb-1">SIM & Cell Site</p>
              {/* 8 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#1 Calling : {lteReport.aisInfoModel?.aisCalling}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  APN : {lteReport.aisInfoModel?.aisApnModel?.aisApnName}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  LAC : {lteReport.aisInfoModel?.aisLac}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  Cell ID : {lteReport.aisInfoModel?.aisCallId}
                </p>
                <p className="pl-2 w-1/5">
                  Connection Type :{" "}
                  {lteReport.aisInfoModel?.aisConnectionServiceType}
                </p>
                <div className="py-1">.</div>
              </div>
              {/* 9 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-3 border-r-[1px] border-black w-1/5">
                  SIM#1 IP : {lteReport.aisInfoModel?.aisIp}.
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
                <div className="flex gap-2 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm relative">
                      <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                    </div>
                  </div>
                  <p>{lteReport.aisInfoModel?.providerModel?.providerName}</p>
                </div>

                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Signal Strength {lteReport.aisInfoModel?.aisSignal} dBm ({">"}
                  -91 dBm){" "}
                </p>
                <p className="px-2">
                  Packet SIM :{" "}
                  {lteReport.aisInfoModel?.packageModel?.packageName}.
                </p>
                <div className="py-1">.</div>
              </div>
              {/* 10 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#2 Calling : {lteReport.dtacInfoModel?.dtacCalling}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  APN : {lteReport.dtacInfoModel?.dtacApnModel?.dtacApnName}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  LAC : {lteReport.dtacInfoModel?.dtacLac}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  Cell ID : {lteReport.dtacInfoModel?.dtacCallId}
                </p>
                <p className="pl-2 w-1/5">
                  Connection Type :{" "}
                  {lteReport.dtacInfoModel?.dtacConnectionServiceType}
                </p>
                <div className="py-1">.</div>
              </div>
              {/* 11 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <p className="px-3 border-r-[1px] border-black w-1/5">
                  SIM#2 IP : {lteReport.dtacInfoModel?.dtacIp}.
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
                <div className="flex gap-2 px-4 border-r-[1px] border-black">
                  <div className="flex items-center">
                    <div className="border-[1.7px] border-black p-1 rounded-sm relative">
                      <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                    </div>
                  </div>
                  <p>{lteReport.dtacInfoModel?.providerModel?.providerName}</p>
                </div>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Signal Strength {lteReport.dtacInfoModel?.dtacSignal} dBm (
                  {">"}-91 dBm){" "}
                </p>
                <p className="px-2">
                  Packet SIM :{" "}
                  {lteReport.dtacInfoModel?.packageModel?.packageName}
                </p>
                <div className="py-1">.</div>
              </div>
              {/* Bandwidth Test */}
              <p className="font-extrabold pb-1">Bandwidth Test</p>
              {/* 12 */}
              <div className="flex border-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  SIM#1 Max Bandwidth (Download) :{" "}
                  {lteReport.testAisInfoDownloadModel?.downloadAverage} Mbps
                  (&gt;512 kbps)
                </p>
                <p className="px-3 ">
                  SIM#2 Max Bandwidth (Download) :{" "}
                  {lteReport.testDtacInfoDownloadModel?.downloadAverage} Mbps (
                  {">"}512 kbps)
                </p>
                <div className="py-1">.</div>
              </div>
              {/* 13 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  SIM#1 Max Bandwidth (Upload) :{" "}
                  {lteReport.testAisInfoUploadModel?.downloadAverage} Mbps
                  (&gt;512 kbps)
                </p>
                <p className="px-3 ">
                  SIM#2 Max Bandwidth (Upload) :{" "}
                  {lteReport.testDtacInfoUploadModel?.downloadAverage} Mbps (
                  {">"}512 kbps)
                </p>
                <div className="py-1">.</div>
              </div>
              {/* Throughput Test */}
              <p className="font-extrabold pb-1">Throughput Test</p>
              {/* 14 */}
              <div className="flex border-[1px] border-black">
                <div className=" border-r-[1px] border-black w-1/2">
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    SIM#1 Download :
                  </p>
                  <div className="flex flex-col items-center">
                    <p>
                      1). {lteReport.testAisInfoDownloadModel?.fileSize1} Mbps
                    </p>
                    <p>
                      2). {lteReport.testAisInfoDownloadModel?.fileSize2} Mbps
                    </p>
                    <p>
                      3). {lteReport.testAisInfoDownloadModel?.fileSize3} Mbps
                    </p>
                    <p>
                      4). {lteReport.testAisInfoDownloadModel?.fileSize4} Mbps
                    </p>
                    <p>
                      5). {lteReport.testAisInfoDownloadModel?.fileSize5} Mbps
                    </p>
                  </div>
                  <p className="pl-9 font-extrabold">
                    Download Average{" "}
                    {lteReport.testAisInfoDownloadModel?.downloadAverage} Mbps
                  </p>
                  <p className="px-2 font-extrabold">
                    {" "}
                    SIM#1 Ping Test (256 bytes){" "}
                    {lteReport.testAisInfoDownloadModel?.pingingTest} % success
                    Average {lteReport.testAisInfoDownloadModel?.average} ms (
                    {"<"}
                    400 ms)
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    SIM#2 Download :
                  </p>
                  <div className="flex flex-col items-center">
                    <p>
                      1). {lteReport.testDtacInfoDownloadModel?.fileSize1} Mbps
                    </p>
                    <p>
                      2). {lteReport.testDtacInfoDownloadModel?.fileSize2} Mbps
                    </p>
                    <p>
                      3). {lteReport.testDtacInfoDownloadModel?.fileSize3} Mbps
                    </p>
                    <p>
                      4). {lteReport.testDtacInfoDownloadModel?.fileSize4} Mbps
                    </p>
                    <p>
                      5). {lteReport.testDtacInfoDownloadModel?.fileSize5} Mbps
                    </p>
                  </div>
                  <p className="pl-9 font-extrabold">
                    Download Average{" "}
                    {lteReport.testDtacInfoDownloadModel?.downloadAverage} Mbps
                  </p>
                  <p className="px-2 font-extrabold pb-2">
                    {" "}
                    SIM#1 Ping Test (256 bytes){" "}
                    {lteReport.testDtacInfoDownloadModel?.pingingTest} % success
                    Average {lteReport.testAisInfoDownloadModel?.average} ms (
                    {"<"}400 ms)
                  </p>
                </div>
              </div>
              {/* 15 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <div className=" border-r-[1px] border-black w-1/2">
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    SIM#1 Upload :
                  </p>
                  <div className="flex flex-col items-center">
                    <p>
                      1). {lteReport.testAisInfoUploadModel?.fileSize1} Mbps
                    </p>
                    <p>
                      2). {lteReport.testAisInfoUploadModel?.fileSize2} Mbps
                    </p>
                    <p>
                      3). {lteReport.testAisInfoUploadModel?.fileSize3} Mbps
                    </p>
                    <p>
                      4). {lteReport.testAisInfoUploadModel?.fileSize4} Mbps
                    </p>
                    <p>
                      5). {lteReport.testAisInfoUploadModel?.fileSize5} Mbps
                    </p>
                  </div>
                  <p className="pl-9 font-extrabold">
                    Upload Average{" "}
                    {lteReport.testAisInfoUploadModel?.downloadAverage} Mbps
                  </p>
                  <p className="px-2 font-extrabold">
                    {" "}
                    SIM#1 Ping Test (1410 bytes){" "}
                    {lteReport.testAisInfoUploadModel?.pingingTest} % success
                    Average {lteReport.testAisInfoUploadModel?.average} ms (
                    {"<"}
                    400 ms)
                  </p>
                </div>
                <div className="w-1/2">
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    SIM#2 Upload :
                  </p>
                  <div className="flex flex-col items-center">
                    <p>
                      1). {lteReport.testDtacInfoUploadModel?.fileSize1} Mbps
                    </p>
                    <p>
                      2). {lteReport.testDtacInfoUploadModel?.fileSize2} Mbps
                    </p>
                    <p>
                      3). {lteReport.testDtacInfoUploadModel?.fileSize3} Mbps
                    </p>
                    <p>
                      4). {lteReport.testDtacInfoUploadModel?.fileSize4} Mbps
                    </p>
                    <p>
                      5). {lteReport.testDtacInfoUploadModel?.fileSize5} Mbps
                    </p>
                  </div>
                  <p className="pl-9 font-extrabold">
                    Upload Average{" "}
                    {lteReport.testDtacInfoUploadModel?.downloadAverage} Mbps
                  </p>
                  <p className="px-2 font-extrabold pb-2">
                    {" "}
                    SIM#1 Ping Test (1410 bytes){" "}
                    {lteReport.testDtacInfoUploadModel?.pingingTest} % success
                    Average {lteReport.testDtacInfoUploadModel?.average} ms (
                    {"<"}
                    400 ms)
                  </p>
                </div>
              </div>
              {/* Application Test */}
              <p className="font-extrabold pb-1">Application Test</p>
              {/* 16 */}
              <div className="flex w-[722px] border-[1px] border-black">
                {/* 16.1 */}
                <div className=" border-r-[1px] border-black w-48 pb-2">
                  <p className="font-extrabold pl-2 pb-1 bg-slate-300">
                    Application
                  </p>
                  {lteReport.testAisInfoOtherModels.map((item, index) => (
                    <div key={index} className="px-4">
                      <p>
                        {index + 1}) {item?.name}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 16.2 */}
                <div className=" border-r-[1px] border-black">
                  <div className="flex gap-1 px-4 font-extrabold bg-slate-300 pb-1">
                    <p>SIM#1</p>
                    <div className="flex items-center">
                      <div className="border-[1px] border-black p-1 rounded-sm relative">
                        <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                      </div>
                    </div>
                    <p>Active</p>
                    <div className="flex items-center">
                      <div className="border-[1px] border-black p-1 rounded-sm"></div>
                    </div>
                    <p>Back Up</p>
                    <p>Page Load Time(s)</p>
                  </div>
                  {lteReport.testAisInfoOtherModels.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 px-4 border-r-[1px]"
                    >
                      <div className="flex gap-2">
                        <div className="flex items-center">
                          <div className="border-[1px] border-black p-1 rounded-sm relative">
                            {item?.pass === true ? (
                              <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p>Pass</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center">
                          <div className="border-[1px] border-black p-1 rounded-sm relative">
                            {item?.pass === false ? (
                              <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p>Fail</p>
                      </div>
                      <p>..............................</p>
                    </div>
                  ))}
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
                      <div className="border-[1px] border-black p-1 rounded-sm relative">
                        <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                      </div>
                    </div>
                    <p>Back Up</p>
                    <p>Page Load Time(s)</p>
                  </div>
                  {lteReport.testDtacInfoOtherModels.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 px-5">
                      <div className="flex gap-2">
                        <div className="flex items-center">
                          <div className="border-[1px] border-black p-1 rounded-sm relative">
                            {item?.pass === true ? (
                              <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p>Pass</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center">
                          <div className="border-[1px] border-black p-1 rounded-sm relative">
                            {item?.pass === false ? (
                              <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p>Fail</p>
                      </div>
                      <p>..............................</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex border-x-[1px] border-black px-2">
                <div className="flex gap-7 pb-2 w-1/2">
                  <p className="font-semibold">Office Departure :</p>
                  <p>
                    {formatDate(
                      lteReport.siteinfoReportWorkingTimeModel?.officeDeparture
                    )}
                  </p>
                </div>
                <div className="flex gap-7 pb-2">
                  <p className="font-semibold">Office Arrival :</p>
                  <p>
                    {formatDate(
                      lteReport.siteinfoReportWorkingTimeModel?.officeArrival
                    )}
                  </p>
                </div>
              </div>
              <div className="flex border-[1px] border-black">
                <div className="border-r-[1px] border-black w-1/2">
                  <p className="px-4 font-extrabold bg-slate-300 pb-1">
                    Customer Site
                  </p>
                  <div className="grid grid-cols-2 px-3 pb-2">
                    <p>ETA : </p>
                    <p>
                      {formatDate(
                        lteReport.siteinfoReportWorkingTimeModel
                          ?.customerSiteETA
                      )}
                    </p>
                    <p>Arrival : </p>
                    <p>
                      {formatDate(
                        lteReport.siteinfoReportWorkingTimeModel
                          ?.customerSiteArrival
                      )}
                    </p>
                    <p>Departure : </p>
                    <p>
                      {formatDate(
                        lteReport.siteinfoReportWorkingTimeModel
                          ?.customerSiteDeparture
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="px-4 font-extrabold bg-slate-300 pb-1">
                    Working
                  </p>
                  <div className="grid grid-cols-2 px-4">
                    <p>Start : </p>
                    <p>
                      {formatDate(
                        lteReport.siteinfoReportWorkingTimeModel?.workingStart
                      )}
                    </p>
                    <p>End : </p>
                    <p>
                      {formatDate(
                        lteReport.siteinfoReportWorkingTimeModel?.workingEnd
                      )}
                    </p>
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
