import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import axios from "axios";
import packageJson from "../../package.json";
import LoadingPage from "../component/LoadingPage";
import { ImCheckmark } from "react-icons/im";
import { useAuthContext } from "../context/AuthContext";

function PDFlte() {
  const [lteReport, setLteReport] = useState();
  const { formatDateTime, timeMinusSeven } = useAuthContext();

  // console.log(lteReport);
  const { id } = useParams();
  const downloadPDF = async () => {
    const element = document.getElementById("element-to-print");
    const currentDate = new Date().toISOString().split("T")[0];
    const opt = {
      margin: 1,
      filename: `LTE Report ${lteReport?.cid} ${currentDate}`,
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
      // console.log(response.data);
      setLteReport(response.data);
    };
    fetchDataLte();
  }, []);

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
            <Link to="/user/install">
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
                  Customer : {lteReport?.customerModel?.fullNameThai}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  CID : {lteReport?.cid}
                </p>
                <p className="pl-2 w-1/4">
                  {" "}
                  Station ID : {lteReport?.atmModel?.stationId}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 3 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/3">
                  Branch : {lteReport?.siteName}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/3">
                  Contact Name : {lteReport?.contractName}
                </p>
                <p className="pl-2">TEL. : {lteReport?.tel}</p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 4 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <p className="px-2"> Address : {lteReport?.address}</p>
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
                  <p>
                    {
                      lteReport?.routerInfoModel?.productTypeModel
                        ?.productTypeName
                    }
                  </p>
                </div>
                <p className="px-2">
                  Router S/N : {lteReport?.routerInfoModel?.serialNo}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 6 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Router IP : {lteReport?.routerInfoModel?.network}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Subnet Mask : {lteReport?.routerInfoModel?.mask}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Router F/W : {lteReport?.routerInfoModel?.firmwareVersion}
                </p>
                <p className="pl-2">
                  Rack S/N : {lteReport?.otherInfoModel?.rackSerialNo}
                </p>
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
                  <p>{lteReport?.otherInfoModel?.antennaGain} dBi.</p>
                </div>
                <p className="px-2">
                  {" "}
                  GPS N : {lteReport?.GPSNo} ,
                  <span className="text-white">
                    ..................................
                  </span>{" "}
                  E : {lteReport?.GPSE}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* SIM & Cell Site */}
              <p className="font-extrabold pb-3">SIM & Cell Site</p>
              {/* 8 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#1 Calling : {lteReport?.aisInfoModel?.aisCalling}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/6">
                  APN : {lteReport?.aisInfoModel?.aisApnModel?.aisApnName}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  LAC : {lteReport?.aisInfoModel?.aisLac}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  Cell ID : {lteReport?.aisInfoModel?.aisCallId}
                </p>
                <p className="pl-2 w-1/5">
                  Connection Type :{" "}
                  {lteReport?.aisInfoModel?.aisConnectionServiceType}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 9 */}
              <div className="flex border-x-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#1 IP : {lteReport?.aisInfoModel?.aisIp}.
                </p>
                <div className="flex w-1/6 border-r-[1px] border-black">
                  <div className="flex gap-2 px-2 ">
                    <p>Provider :</p>
                    <p>
                      {lteReport?.aisInfoModel?.providerModel?.providerName}
                    </p>
                  </div>
                </div>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Signal Strength.....{lteReport?.aisInfoModel?.aisSignal}
                  .....dBm ({">"}
                  -91 dBm){" "}
                </p>
                <p className="px-2">
                  Packet SIM :{" "}
                  {lteReport?.aisInfoModel?.packageModel?.packageName}.
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 10 */}
              <div className="flex border-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#2 Calling : {lteReport?.dtacInfoModel?.dtacCalling}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/6">
                  APN : {lteReport?.dtacInfoModel?.dtacApnModel?.dtacApnName}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  LAC : {lteReport?.dtacInfoModel?.dtacLac}
                </p>
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  Cell ID : {lteReport?.dtacInfoModel?.dtacCallId}
                </p>
                <p className="pl-2 w-1/5">
                  Connection Type :{" "}
                  {lteReport?.dtacInfoModel?.dtacConnectionServiceType}
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 11 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black">
                <p className="px-2 border-r-[1px] border-black w-1/5">
                  SIM#2 IP : {lteReport?.dtacInfoModel?.dtacIp}.
                </p>
                <div className="flex w-1/6 border-r-[1px] border-black">
                  <div className="flex gap-2 px-2">
                    <p>Provider :</p>
                    <p>
                      {lteReport?.dtacInfoModel?.providerModel?.providerName}
                    </p>
                  </div>
                </div>
                <p className="px-2 border-r-[1px] border-black w-1/4">
                  Signal Strength.....{lteReport?.dtacInfoModel?.dtacSignal}
                  .....dBm ({">"}-91 dBm){" "}
                </p>
                <p className="px-2">
                  Packet SIM :{" "}
                  {lteReport?.dtacInfoModel?.packageModel?.packageName}
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
                  {lteReport?.testAisInfoDownloadModel?.pingingTest}.....%
                  success Average.....
                  {lteReport?.testAisInfoDownloadModel?.average}.....ms ({"<"}
                  400 ms)
                </p>
                <p className="px-3 ">
                  SIM#2 Ping Test (256 bytes) .....
                  {lteReport?.testDtacInfoDownloadModel?.pingingTest}.....%
                  success Average .....
                  {lteReport?.testDtacInfoDownloadModel?.average}.....ms ({"<"}
                  400 ms)
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 13 */}
              <div className="flex border-x-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  {" "}
                  SIM#1 Ping Test (1410 bytes) .....
                  {lteReport?.testAisInfoUploadModel?.pingingTest}.....% success
                  Average.....
                  {lteReport?.testAisInfoUploadModel?.average}.....ms ({"<"}
                  400 ms)
                </p>
                <p className="px-3 ">
                  SIM#2 Ping Test (1410 bytes) .....
                  {lteReport?.testDtacInfoUploadModel?.pingingTest}.....%
                  success Average.....
                  {lteReport?.testDtacInfoUploadModel?.average}.....ms ({"<"}
                  400 ms)
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 14 */}
              <div className="flex border-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  SIM#1 Max Bandwidth (Download) : .....
                  {lteReport?.testAisInfoDownloadModel?.downloadAverage}
                  .....Mbps (&gt;512 kbps)
                </p>
                <p className="px-3 ">
                  SIM#2 Max Bandwidth (Download) : .....
                  {lteReport?.testDtacInfoDownloadModel?.downloadAverage}
                  .....Mbps ({">"}512 kbps)
                </p>
                <div className="pb-3 text-white">.</div>
              </div>
              {/* 15 */}
              <div className="flex border-x-[1px] border-b-[1px] border-black font-extrabold">
                <p className="px-3 border-r-[1px] border-black w-1/2">
                  SIM#1 Max Bandwidth (Upload) : .....
                  {lteReport?.testAisInfoUploadModel?.downloadAverage}.....Mbps
                  (&gt;512 kbps)
                </p>
                <p className="px-3 ">
                  SIM#2 Max Bandwidth (Upload) : .....
                  {lteReport?.testDtacInfoUploadModel?.downloadAverage}.....Mbps
                  ({">"}512 kbps)
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
                        {lteReport?.testAisInfoDownloadModel?.fileSize1}.....Mb
                        .....
                        {lteReport?.testAisInfoDownloadModel?.speed1}
                        .....Mbps
                      </p>
                      <p>
                        2).File size.....
                        {lteReport?.testAisInfoDownloadModel?.fileSize2}.....Mb
                        .....
                        {lteReport?.testAisInfoDownloadModel?.speed2}
                        .....Mbps
                      </p>
                      <p>
                        3).File size.....
                        {lteReport?.testAisInfoDownloadModel?.fileSize3}.....Mb
                        .....
                        {lteReport?.testAisInfoDownloadModel?.speed3}
                        .....Mbps
                      </p>
                      <p>
                        4).File size.....
                        {lteReport?.testAisInfoDownloadModel?.fileSize4}.....Mb
                        .....
                        {lteReport?.testAisInfoDownloadModel?.speed4}
                        .....Mbps
                      </p>
                      <p>
                        5).File size.....
                        {lteReport?.testAisInfoDownloadModel?.fileSize5}.....Mb
                        .....
                        {lteReport?.testAisInfoDownloadModel?.speed5}
                        .....Mbps
                      </p>
                    </div>
                    <p className="pl-9 font-extrabold">
                      Download Average .....
                      {lteReport?.testAisInfoDownloadModel?.downloadAverage}
                      .....Mbps
                    </p>
                  </div>
                  <div className="w-1/2 pb-1 ">
                    <p className="font-extrabold pl-2 pb-3 bg-slate-200">
                      SIM#1 Upload :
                    </p>
                    <div className="flex flex-col gap-1 mb-1 items-center">
                      <p>
                        1).File size.....
                        {lteReport?.testAisInfoUploadModel?.fileSize1}.....Mb
                        .....
                        {lteReport?.testAisInfoUploadModel?.speed1}.....Mbps
                      </p>
                      <p>
                        2).File size.....
                        {lteReport?.testAisInfoUploadModel?.fileSize2}.....Mb
                        .....
                        {lteReport?.testAisInfoUploadModel?.speed2}.....Mbps
                      </p>
                      <p>
                        3).File size.....
                        {lteReport?.testAisInfoUploadModel?.fileSize3}.....Mb
                        .....
                        {lteReport?.testAisInfoUploadModel?.speed3}.....Mbps
                      </p>
                      <p>
                        4).File size.....
                        {lteReport?.testAisInfoUploadModel?.fileSize4}.....Mb
                        .....
                        {lteReport?.testAisInfoUploadModel?.speed4}.....Mbps
                      </p>
                      <p>
                        5).File size.....
                        {lteReport?.testAisInfoUploadModel?.fileSize5}.....Mb
                        .....
                        {lteReport?.testAisInfoUploadModel?.speed5}.....Mbps
                      </p>
                    </div>
                    <p className="pl-9 font-extrabold">
                      Upload Average .....
                      {lteReport?.testAisInfoUploadModel?.downloadAverage}
                      .....Mbps
                    </p>
                  </div>
                </div>
                {/* 16.2 */}
                <div className="flex w-1/2">
                  <div className="border-r-[1px] pb-3 border-black w-1/2">
                    <p className="font-extrabold pl-2 pb-3 bg-slate-200">
                      SIM#2 Download :
                    </p>
                    <div className="flex flex-col gap-1 mb-1 items-center">
                      <p>
                        1).File size.....
                        {lteReport?.testDtacInfoDownloadModel?.fileSize1}.....Mb
                        .....
                        {lteReport?.testDtacInfoDownloadModel?.speed1}
                        .....Mbps
                      </p>
                      <p>
                        2).File size.....
                        {lteReport?.testDtacInfoDownloadModel?.fileSize2}.....Mb
                        .....
                        {lteReport?.testDtacInfoDownloadModel?.speed2}
                        .....Mbps
                      </p>
                      <p>
                        3).File size.....
                        {lteReport?.testDtacInfoDownloadModel?.fileSize3}.....Mb
                        .....
                        {lteReport?.testDtacInfoDownloadModel?.speed3}
                        .....Mbps
                      </p>
                      <p>
                        4).File size.....
                        {lteReport?.testDtacInfoDownloadModel?.fileSize4}.....Mb
                        .....
                        {lteReport?.testDtacInfoDownloadModel?.speed4}
                        .....Mbps
                      </p>
                      <p>
                        5).File size.....
                        {lteReport?.testDtacInfoDownloadModel?.fileSize5}.....Mb
                        .....
                        {lteReport?.testDtacInfoDownloadModel?.speed5}
                        .....Mbps
                      </p>
                    </div>
                    <p className="pl-9 font-extrabold">
                      Download Average .....
                      {lteReport?.testDtacInfoDownloadModel?.downloadAverage}
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
                        {lteReport?.testDtacInfoUploadModel?.fileSize1}.....Mb
                        .....{lteReport?.testDtacInfoUploadModel?.speed1}
                        .....Mbps
                      </p>
                      <p>
                        2).File size.....
                        {lteReport?.testDtacInfoUploadModel?.fileSize2}.....Mb
                        .....{lteReport?.testDtacInfoUploadModel?.speed2}
                        .....Mbps
                      </p>
                      <p>
                        3).File size.....
                        {lteReport?.testDtacInfoUploadModel?.fileSize3}.....Mb
                        .....{lteReport?.testDtacInfoUploadModel?.speed3}
                        .....Mbps
                      </p>
                      <p>
                        4).File size.....
                        {lteReport?.testDtacInfoUploadModel?.fileSize4}.....Mb
                        .....{lteReport?.testDtacInfoUploadModel?.speed4}
                        .....Mbps
                      </p>
                      <p>
                        5).File size.....
                        {lteReport?.testDtacInfoUploadModel?.fileSize5}.....Mb
                        .....{lteReport?.testDtacInfoUploadModel?.speed5}
                        .....Mbps
                      </p>
                    </div>
                    <p className="pl-9 font-extrabold">
                      Upload Average .....
                      {lteReport?.testDtacInfoUploadModel?.downloadAverage}
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
                    {lteReport?.testAisInfoOtherModels.map((item, index) => (
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
                        {lteReport.testAisInfoOtherModels?.[0].simtype === 1 ? (
                          <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p>Active</p>
                    <div className="flex items-center pt-2">
                      <div className="border-[1px] border-black p-1 rounded-sm relative">
                        {lteReport.testAisInfoOtherModels?.[0].simtype === 0 ? (
                          <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p>Back Up</p>
                  </div>
                  {lteReport?.testAisInfoOtherModels.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 px-4 border-r-[1px]"
                    >
                      <div className="flex gap-2">
                        <div className="flex items-center pt-2">
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
                        <div className="flex items-center pt-2">
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
                    </div>
                  ))}
                </div>
                {/* 17.3 */}
                <div className="w-1/5 border-r-[1px] border-black">
                  <div className="flex gap-[2px] px-4 font-extrabold bg-slate-200 pb-1">
                    <p>SIM#2</p>
                    <div className="flex items-center pt-2">
                      <div className="border-[1px] border-black p-1 rounded-sm relative">
                        {lteReport.testDtacInfoOtherModels?.[0].simtype ===
                        1 ? (
                          <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p>Active</p>
                    <div className="flex items-center pt-2">
                      <div className="border-[1px] border-black p-1 rounded-sm relative">
                        {lteReport.testDtacInfoOtherModels?.[0].simtype ===
                        0 ? (
                          <ImCheckmark className="absolute -top-[2px] left-0 w-3 h-3" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <p>Back Up</p>
                  </div>
                  {lteReport?.testDtacInfoOtherModels.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 px-5">
                      <div className="flex gap-2">
                        <div className="flex items-center pt-2">
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
                        <div className="flex items-center pt-2">
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
                    </div>
                  ))}
                </div>
                {/* 17.4 */}
                <div className="w-1/4">
                  <div className="px-2">
                    <div className="flex gap-4 pb-2">
                      <p className="font-semibold">Office Departure :</p>
                      <p>
                        {formatDateTime(
                          timeMinusSeven(
                            lteReport?.siteinfoReportWorkingTimeModel
                              ?.officeDeparture
                          )
                        )}
                      </p>
                    </div>
                    <div className="flex gap-7 pb-2">
                      <p className="font-semibold">Office Arrival :</p>
                      <p>
                        {formatDateTime(
                          timeMinusSeven(
                            lteReport?.siteinfoReportWorkingTimeModel
                              ?.officeArrival
                          )
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="px-4 font-extrabold pb-2">Customer Site</p>
                      <div className="grid grid-cols-2 px-3 pb-3">
                        <p>ETA : </p>
                        <p>
                          {formatDateTime(
                            timeMinusSeven(
                              lteReport?.siteinfoReportWorkingTimeModel
                                ?.customerSiteETA
                            )
                          )}
                        </p>
                        <p>Arrival : </p>
                        <p>
                          {formatDateTime(
                            timeMinusSeven(
                              lteReport?.siteinfoReportWorkingTimeModel
                                ?.customerSiteArrival
                            )
                          )}
                        </p>
                        <p>Departure : </p>
                        <p>
                          {formatDateTime(
                            timeMinusSeven(
                              lteReport?.siteinfoReportWorkingTimeModel
                                ?.customerSiteDeparture
                            )
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="px-4 font-extrabold pb-2">Working</p>
                      <div className="grid grid-cols-2 px-4">
                        <p>Start : </p>
                        <p>
                          {formatDateTime(
                            timeMinusSeven(
                              lteReport?.siteinfoReportWorkingTimeModel
                                ?.workingStart
                            )
                          )}
                        </p>
                        <p>End : </p>
                        <p>
                          {formatDateTime(
                            timeMinusSeven(
                              lteReport?.siteinfoReportWorkingTimeModel
                                ?.workingEnd
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------- */}
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

export default PDFlte;
