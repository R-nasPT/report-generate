import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import packageJson from "../../package.json";
import LoadingPage from "../component/LoadingPage";
import { ImCheckmark } from "react-icons/im";
import { useAuthContext } from "../context/AuthContext";
import { formatDateTime } from "../utils/dateUtils";
import downloadPDF from "../utils/pdfUtils";

function PDFlteHistory() {
  const [idList, setIdList] = useState([]);
  const [dataList, setDataList] = useState([]);

  // console.log(dataList);

  const { isAdmin } = useAuthContext();

  // console.log(dataList.testSimSecondOther?.data);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${packageJson.domain.ipSiteInfo}/siteinfo/history/${id}`
      );
      // console.log(response.data);
      setIdList(response.data.siteinfo);
      setDataList(response.data.rawData);
    } catch (error) {
      console.error(error);
    }
  };

  const { id } = useParams();

  const handleDownloadPDF = () => {
    downloadPDF(`LTE Report ${dataList?.cid}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (dataList.length === 0) return <LoadingPage />;

  return (
    // <></>
    <>
      <div>
        <div className="py-8 px-96 bg-slate-300 ">
          <div className="flex gap-3 mb-2">
            <Link to={`/public/view-install/${id}`}>
              <img
                src="/component/back.png"
                alt="pdf"
                className="w-9 h-9 p-2 bg-red-600 hover:bg-red-500 rounded-md"
              />
            </Link>
            {isAdmin && (
              <Link to="/user/homepage">
                <img
                  src="/user/home 2.png"
                  alt="home"
                  className="w-9 h-9 p-2 bg-blue-500 hover:bg-blue-400 rounded-md"
                />
              </Link>
            )}
            <img
              src="/component/download.png"
              alt="pdf"
              onClick={handleDownloadPDF}
              className="w-9 h-9 p-2 bg-red-400 hover:bg-red-500 rounded-md"
            />
          </div>
          <div
            id="element-to-print"
            className="py-6 px-8 bg-white leading-[9px]"
          >
            <section className="h-[1060px] text-[13px] font-thai-sarabunNew">
              <div className="flex justify-between">
                <img src="/user/Logo-pp4.jpg" alt="logo" width={250} />
                <div className="text-right text-[13px]">
                  <p>
                    1011 Supalai Grand Tower, 16th Floor, Rama 3 Road.,
                    Chongnonsi, Yannawa, Bangkok 10120
                  </p>
                  <p>Tel. +66(0) 2056-2099 Fax. +66(0) 2056-2088</p>
                </div>
              </div>
              <h1 className="bg-slate-200 border-[1px] border-black text-center pb-3 my-1 font-semibold text-lg">
                LTE MPLS-Acceptance Testing Report
              </h1>
              {/* Site Information */}
              <p className="font-extrabold pb-3">Site Information</p>
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
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 2 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/2">
                  Customer : {idList?.customerModel?.fullNameThai}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  CID : {idList?.cid}
                </p>
                <p className="pl-2 w-1/4">
                  {" "}
                  Station ID : {dataList.siteInfo?.stationID}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 3 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/3">
                  Branch : {dataList.siteInfo?.branch}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/3">
                  Contact Name : {dataList.siteUpdate.contactName}
                </p>
                <p className="pl-2">TEL. : {dataList.siteUpdate.tel}</p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 4 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <p className="px-2"> Address : {dataList.siteInfo?.address}</p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* Router */}
              <p className="font-extrabold pb-3">Router</p>
              {/* 5 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black">Router Model</p>
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
                  <p>{dataList.routerModel?.productTypeName}</p>
                </div>
                <p className="px-2">
                  Router S/N : {dataList.routerInfo.routerSN}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 6 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Router IP : {dataList.routerInfo.routerIp}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Subnet Mask : {dataList.routerInfo.subnetMask}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Router F/W : {dataList.routerInfo.routerFW}
                </p>
                <p className="pl-2">Rack S/N : {dataList.routerInfo.rackSN}</p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 7 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black">
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
                  <p>{dataList.routerInfo.antenaGain} dBi.</p>
                </div>
                <p className="px-2">
                  {" "}
                  GPS N : {dataList.siteUpdate.gpsN} ,
                  <span className="text-white">
                    ..................................
                  </span>{" "}
                  E : {dataList.siteUpdate.gpsE}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* SIM & Cell Site */}
              <p className="font-extrabold pb-3">SIM & Cell Site</p>
              {/* 8 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#1 Calling : {dataList.simFirst?.callSimFirst}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/6">
                  APN : {dataList.apnSimFirst?.aisApnName}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  LAC : {dataList.simFirst?.lacSimFirst}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  Cell ID : {dataList.simFirst?.cellIdSimFirst}
                </p>
                <p className="pl-2 w-1/5">
                  Connection Type : {dataList.simFirst?.connection}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 9 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#1 IP : {dataList.simFirst?.ipSimFirst}.
                </p>
                <div className="flex w-1/6 border-r-[1px] border-black">
                  <div className="flex gap-2 px-2 ">
                    <p>Provider :</p>
                    <p>{dataList.providerSimFirst?.providerName}</p>
                  </div>
                </div>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Signal Strength.....{dataList.simFirst?.signalStrength}
                  .....dBm ({">"}
                  -91 dBm){" "}
                </p>
                <p className="px-2">
                  Packet SIM : {dataList.packageSimFirst?.packageName}.
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 10 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#2 Calling : {dataList.simSecond?.callSimSecond}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/6">
                  APN : {dataList.apnSimSecond?.dtacApnName}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  LAC : {dataList.simSecond?.lacSimSecond}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  Cell ID : {dataList.simSecond?.cellIdSimSecond}
                </p>
                <p className="pl-2 w-1/5">
                  Connection Type : {dataList.simSecond?.connection}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 11 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#2 IP : {dataList.simSecond?.ipSimSecond}.
                </p>
                <div className="flex w-1/6 border-r-[1px] border-black">
                  <div className="flex gap-2 px-2">
                    <p>Provider :</p>
                    <p>{dataList.providerSimSecond?.providerName}</p>
                  </div>
                </div>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Signal Strength.....{dataList.simSecond?.signalStrength}
                  .....dBm ({">"}-91 dBm){" "}
                </p>
                <p className="px-2">
                  Packet SIM : {dataList.packageSimSecond?.packageName}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* Latency test & Bandwidth Test */}
              <p className="font-extrabold pb-3">
                Latency test & Bandwidth Test
              </p>
              {/* 12 */}
              <div className="flex border-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  SIM#1 Ping Test (256 bytes) .....
                  {dataList.testSimFirst?.pingingTest}.....% success
                  Average.....
                  {dataList.testSimFirst?.average}.....ms ({"<"}
                  400 ms)
                </p>
                <p className="px-3 ">
                  SIM#2 Ping Test (256 bytes) .....
                  {dataList.testSimSecond?.pingingTest}.....% success Average
                  .....
                  {dataList.testSimSecond?.average}.....ms ({"<"}400 ms)
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 13 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  SIM#1 Ping Test (1410 bytes) .....
                  {dataList.testSimFirstUpload?.pingingTest}.....% success
                  Average.....
                  {dataList.testSimFirstUpload?.average}.....ms ({"<"}
                  400 ms)
                </p>
                <p className="px-3 ">
                  SIM#2 Ping Test (1410 bytes) .....
                  {dataList.testSimSecondUpload?.pingingTest}.....% success
                  Average.....
                  {dataList.testSimSecondUpload?.average}.....ms ({"<"}
                  400 ms)
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 14 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  SIM#1 Max Bandwidth (Download) : .....
                  {dataList.testSimFirst?.downloadAverage}
                  .....Mbps (&gt;512 kbps)
                </p>
                <p className="px-3 ">
                  SIM#2 Max Bandwidth (Download) : .....
                  {dataList.testSimSecond?.downloadAverage}
                  .....Mbps ({">"}512 kbps)
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 15 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  SIM#1 Max Bandwidth (Upload) : .....
                  {dataList.testSimFirstUpload.downloadAverage}.....Mbps
                  (&gt;512 kbps)
                </p>
                <p className="px-3 ">
                  SIM#2 Max Bandwidth (Upload) : .....
                  {dataList.testSimSecondUpload.downloadAverage}.....Mbps ({">"}
                  512 kbps)
                </p>
                <div className="pb-3 text-white">.</div>
              </div>

              {/* Throughput Test */}
              <p className="font-extrabold pb-3">Throughput Test</p>
              {/* 16.1 */}
              <div className="flex border-[1px] border-black">
                <div className="flex border-r-[1px] border-black w-1/2">
                  <div className=" border-r-[1px] pb-3 border-black w-1/2">
                    <p className="font-extrabold pl-2 pb-3 bg-slate-200">
                      SIM#1 Download :
                    </p>
                    <div className="flex flex-col gap-1 mb-1 items-center">
                      <p>
                        1).File size.....
                        {dataList.testSimFirst.test[0]?.fileSize}.....Mb .....
                        {dataList.testSimFirst.test[0]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        2).File size.....
                        {dataList.testSimFirst.test[1]?.fileSize}.....Mb .....
                        {dataList.testSimFirst.test[1]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        3).File size.....
                        {dataList.testSimFirst.test[2]?.fileSize}.....Mb .....
                        {dataList.testSimFirst.test[2]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        4).File size.....
                        {dataList.testSimFirst.test[3]?.fileSize}.....Mb .....
                        {dataList.testSimFirst.test[3]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        5).File size.....
                        {dataList.testSimFirst.test[4]?.fileSize}.....Mb .....
                        {dataList.testSimFirst.test[4]?.speed}
                        .....Mbps
                      </p>
                    </div>
                    <p className="pl-9 font-extrabold">
                      Download Average .....
                      {dataList.testSimFirst.downloadAverage}
                      .....Mbps
                    </p>
                  </div>
                  <div className="pb-1 w-1/2">
                    <p className="font-extrabold pl-2 pb-3 bg-slate-200">
                      SIM#1 Upload :
                    </p>
                    <div className="flex flex-col gap-1 mb-1 items-center">
                      <p>
                        1).File size.....
                        {dataList.testSimFirstUpload.test[0]?.fileSize}.....Mb
                        .....{dataList.testSimFirstUpload.test[0]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        2).File size.....
                        {dataList.testSimFirstUpload.test[1]?.fileSize}.....Mb
                        .....{dataList.testSimFirstUpload.test[1]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        3).File size.....
                        {dataList.testSimFirstUpload.test[2]?.fileSize}.....Mb
                        .....{dataList.testSimFirstUpload.test[2]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        4).File size.....
                        {dataList.testSimFirstUpload.test[3]?.fileSize}.....Mb
                        .....{dataList.testSimFirstUpload.test[3]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        5).File size.....
                        {dataList.testSimFirstUpload.test[4]?.fileSize}.....Mb
                        .....{dataList.testSimFirstUpload.test[4]?.speed}
                        .....Mbps
                      </p>
                    </div>
                    <p className="pl-9 font-extrabold">
                      Upload Average .....
                      {dataList.testSimFirstUpload.downloadAverage}
                      .....Mbps
                    </p>
                  </div>
                </div>
                {/* 16.2 */}
                <div className="flex w-1/2">
                  <div className=" border-r-[1px] pb-3 border-black w-1/2 ">
                    <p className="font-extrabold pl-2 pb-3 bg-slate-200">
                      SIM#2 Download :
                    </p>
                    <div className="flex flex-col gap-1 mb-1 items-center">
                      <p>
                        1).File size.....
                        {dataList.testSimSecond.test[0]?.fileSize}.....Mb .....
                        {dataList.testSimSecond.test[0]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        2).File size.....
                        {dataList.testSimSecond.test[1]?.fileSize}.....Mb .....
                        {dataList.testSimSecond.test[1]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        3).File size.....
                        {dataList.testSimSecond.test[2]?.fileSize}.....Mb .....
                        {dataList.testSimSecond.test[2]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        4).File size.....
                        {dataList.testSimSecond.test[3]?.fileSize}.....Mb .....
                        {dataList.testSimSecond.test[3]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        5).File size.....
                        {dataList.testSimSecond.test[4]?.fileSize}.....Mb .....
                        {dataList.testSimSecond.test[4]?.speed}
                        .....Mbps
                      </p>
                    </div>
                    <p className="pl-9 font-extrabold">
                      Download Average .....
                      {dataList.testSimSecond.downloadAverage}
                      .....Mbps
                    </p>
                  </div>
                  <div className="w-1/2 pb-1">
                    <p className="font-extrabold pl-2 pb-3 bg-slate-200">
                      SIM#2 Upload :
                    </p>
                    <div className="flex flex-col gap-1 mb-1 items-center">
                      <p>
                        1).File size.....
                        {dataList.testSimSecondUpload.test[0]?.fileSiz}.....Mb
                        .....{dataList.testSimSecondUpload.test[0]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        2).File size.....
                        {dataList.testSimSecondUpload.test[1]?.fileSiz}.....Mb
                        .....{dataList.testSimSecondUpload.test[1]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        3).File size.....
                        {dataList.testSimSecondUpload.test[2]?.fileSiz}.....Mb
                        .....{dataList.testSimSecondUpload.test[2]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        4).File size.....
                        {dataList.testSimSecondUpload.test[3]?.fileSiz}.....Mb
                        .....{dataList.testSimSecondUpload.test[3]?.speed}
                        .....Mbps
                      </p>
                      <p>
                        5).File size.....
                        {dataList.testSimSecondUpload.test[4]?.fileSiz}.....Mb
                        .....{dataList.testSimSecondUpload.test[4]?.speed}
                        .....Mbps
                      </p>
                    </div>
                    <p className="pl-9 font-extrabold">
                      Upload Average .....
                      {dataList.testSimSecondUpload.downloadAverage}
                      .....Mbps
                    </p>
                  </div>
                </div>
              </div>
              {/* Application Test */}
              <p className="font-extrabold pb-3">Application Test</p>
              {/* 17 */}
              <div className="flex border-[1px] border-black">
                {/* 17.1 */}
                <div className="w-1/3 border-r-[1px] border-black pb-2">
                  <p className="font-extrabold pl-2 pb-2 bg-slate-200">
                    Application
                  </p>
                  <div className="px-4 grid gap-[7px]">
                    {dataList.testSimSecondOther.data.map((item, index) => (
                      <p key={index}>
                        {index + 1}) {item?.name}
                      </p>
                    ))}
                  </div>
                </div>

                {/* 17.2 */}
                <div className="w-1/5 border-r-[1px] border-black pb-1">
                  <div className="flex gap-[2px] px-4 font-extrabold bg-slate-200 pb-1">
                    <p>SIM#1</p>
                    <div className="flex items-end pt-2">
                      <div className="border-[1px] border-black p-1 rounded-sm relative">
                        {dataList.testSimFirstOther?.simtype === "1" ? (
                          <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p>Active</p>
                    <div className="flex items-center pt-2">
                      <div className="border-[1px] border-black p-1 rounded-sm relative">
                        {dataList.testSimFirstOther?.simtype === "0" ? (
                          <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p>Back Up</p>
                  </div>
                  {dataList.testSimFirstOther.data.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 px-4 border-r-[1px]"
                    >
                      <div className="flex gap-2">
                        <div className="flex items-center pt-2">
                          <div className="border-[1px] border-black p-1 rounded-sm relative">
                            {item?.pass === "1" ? (
                              <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p>Pass</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center pt-2">
                          <div className="border-[1px] border-black p-1 rounded-sm relative">
                            {item?.pass === "0" ? (
                              <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p>Fail</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* 17.3 */}
                <div className="w-1/5 border-r-[1px] border-black">
                  <div className="flex gap-[2px] px-4 font-extrabold bg-slate-200 pb-1">
                    <p>SIM#2</p>
                    <div className="flex items-center pt-2">
                      <div className="border-[1px] border-black p-1 rounded-sm">
                        {dataList.testSimSecondOther?.simtype === "1" ? (
                          <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p>Active</p>
                    <div className="flex items-center pt-2">
                      <div className="border-[1px] border-black p-1 rounded-sm relative">
                        {dataList.testSimSecondOther?.simtype === "0" ? (
                          <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p>Back Up</p>
                  </div>
                  {dataList.testSimSecondOther.data.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 px-5">
                      <div className="flex gap-2">
                        <div className="flex items-center pt-2">
                          <div className="border-[1px] border-black p-1 rounded-sm relative">
                            {item?.pass === "1" ? (
                              <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p>Pass</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center pt-2">
                          <div className="border-[1px] border-black p-1 rounded-sm relative">
                            {item?.pass === "0" ? (
                              <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <p>Fail</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* 17.4 */}
                <div className="w-1/4">
                  <div className="px-2">
                    <div className="flex gap-4 pb-2">
                      <p className="font-semibold">Office Departure :</p>
                      <p>
                        {formatDateTime(dataList.workingTime.officeDeparture)}
                      </p>
                    </div>
                    <div className="flex gap-7 pb-2">
                      <p className="font-semibold">Office Arrival :</p>
                      <p>
                        {formatDateTime(dataList.workingTime.officeArrival)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="px-4 font-extrabold pb-2">Customer Site</p>
                      <div className="grid grid-cols-2 px-3 pb-3">
                        <p>ETA : </p>
                        <p>
                          {formatDateTime(dataList.workingTime.customerSiteETA)}
                        </p>
                        <p>Arrival : </p>
                        <p>
                          {formatDateTime(
                            dataList.workingTime.customerSiteArrival
                          )}
                        </p>
                        <p>Departure : </p>
                        <p>
                          {formatDateTime(
                            dataList.workingTime.customerSiteDeparture
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="px-4 font-extrabold pb-2">Working</p>
                      <div className="grid grid-cols-2 px-4">
                        <p>Start : </p>
                        <p>
                          {formatDateTime(dataList.workingTime.workingStart)}
                        </p>
                        <p>End : </p>
                        <p>{formatDateTime(dataList.workingTime.workingEnd)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ------ */}
              <div className="flex flex-col pt-3 gap-7 ">
                <div className="flex justify-around">
                  <div className="text-right">
                    <p>PP Ontime Engineer / :</p>
                    <p>Serviced By</p>
                  </div>
                  <div className="grid gap-2 text-[17px] text-center">
                    <p>………………………………………….</p>
                    <p>
                      (<span className="text-white">……………………………………………</span>)
                    </p>
                    <p>_____/_____/_____</p>
                  </div>
                  <div className="text-right">
                    <p>Customer / :</p>
                    <p>Approved By</p>
                  </div>
                  <div className="grid gap-2 text-[17px] text-center">
                    <p>………………………………………….</p>
                    <p>
                      (<span className="text-white">……………………………………………</span>)
                    </p>
                    <p>_____/_____/_____</p>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div className="pl-11 text-right">
                    <p>Engineer / :</p>
                    <p>Manager</p>
                  </div>
                  <div className="grid gap-2 text-[17px] text-center">
                    <p>………………………………………….</p>
                    <p>
                      (<span className="text-white">……………………………………………</span>)
                    </p>
                    <p>_____/_____/_____</p>
                  </div>
                  <div className="text-right">
                    <p>Engineering / :</p>
                    <p>Director</p>
                  </div>
                  <div className="grid gap-2 text-[17px] text-center">
                    <p>………………………………………….</p>
                    <p>
                      (<span className="text-white">……………………………………………</span>)
                    </p>
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

export default PDFlteHistory;
