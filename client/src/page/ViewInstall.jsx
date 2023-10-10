/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import {
  BsFillFileEarmarkPdfFill,
  BsXCircleFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import AnimateHeight from "react-animate-height";
import axios from "axios";
import packageJson from "../../package.json";
import LoadingPage from "../component/LoadingPage";
import { useAuthContext } from "../context/AuthContext";

function ViewInstall() {
  const [boxOne, setBoxOne] = useState(false);
  const [boxTwo, setBoxTwo] = useState(false);
  const [boxThree, setBoxThree] = useState(false);
  const [boxFour, setBoxFour] = useState(false);

  const [status, setStatus] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [idList, setIdList] = useState([]);

  const { formatDate, formatDateTime } = useAuthContext();

  console.log(idList);
  console.log(dataList);

  const { id } = useParams();

  const getStatus = async () => {
    try {
      const response = await axios.get(
        `${packageJson.domain.ipSiteInfo}/siteinfo/history/${id}`
      );
      // console.log(response.data);
      getSiteinfoReportByCIDAndTicket(response.data.siteinfo.siteInfoId);

      setIdList(response.data.siteinfo);
      setDataList(response.data.rawData);
      setImageList(response.data.fileInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const getSiteinfoReportByCIDAndTicket = async (data) => {
    try {
      const response = await axios.get(
        `${packageJson.domain.ipSiteInfo}/siteinfo/checkstaus/${data}`
      );
      console.log(response.data);
      setStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  if (dataList.length === 0) return <LoadingPage />;

  return (
    <>
      <div className="lg:px-32 lg:py-5">
        <h1 className="py-3 px-5 font-bold shadow-sm shadow-black rounded-md">
          <Link
            to="/user/homepage"
            className="hover:underline hover:text-blue-700"
          >
            Home
          </Link>{" "}
          /{" "}
          <Link
            to="/user/install-history"
            className="hover:underline hover:text-blue-700"
          >
            Installation / New Install History
          </Link>{" "}
          <span className="text-[#E5D283]">/ {dataList?.cid}</span>
        </h1>
        <div className="px-5">
          <div className="bg-[#213555] text-white mt-5 flex justify-center gap-10 py-3 px-5 font-bold shadow-sm shadow-black rounded-md lg:text-2xl">
            <h1>
              CID : <span>{dataList?.cid}</span>
            </h1>
            <h1>
              Ticket : <span>{dataList?.ticketId}</span>
            </h1>
          </div>
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-3 py-1">
              <Link
                to={`/user/pdfcus/${idList?.siteInfoId}`}
                className="flex gap-2 items-center w-24 px-2 py-2 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-100"
              >
                <BsFillFileEarmarkPdfFill className="w-5 h-5" />
                <p>Cus.</p>
              </Link>
              {status.customerModel?.cusGroupType === 1 ? (
                <Link
                  to={`http://10.0.0.4/siteinfo/act.aspx?CID=${dataList.cid}`}
                  className="flex gap-2 items-center w-24 px-2 py-2 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-100"
                >
                  <BsFillFileEarmarkPdfFill className="w-5 h-5" />
                  <p>UAT.</p>
                </Link>
              ) : (
                <Link
                  to={`/user/pdflte/${idList?.siteInfoId}`}
                  className="flex gap-2 items-center w-24 px-2 py-2 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-100"
                >
                  <BsFillFileEarmarkPdfFill className="w-5 h-5" />
                  <p>UAT.</p>
                </Link>
              )}
            </div>
            <button
              className="bg-sky-200 text-blue-700 font-bold w-24 h-9 rounded-xl hover:bg-sky-300"
              onClick={() => {
                if (
                  boxOne === true ||
                  boxTwo === true ||
                  boxThree === true ||
                  boxFour === true
                ) {
                  setBoxOne(false);
                  setBoxTwo(false);
                  setBoxThree(false);
                  setBoxFour(false);
                } else {
                  setBoxOne(true);
                  setBoxTwo(true);
                  setBoxThree(true);
                  setBoxFour(true);
                }
              }}
            >
              Select All
            </button>
          </div>
          {/* input content */}
          <div className="flex flex-col gap-5">
            {/* section-1 */}
            <div className="bg-[#F0F0F0] p-3 rounded-md">
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
                      Site Information
                    </h1>
                    <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Station ID :</p>
                        <p>Branch : (SiteName)</p>
                        <p>Install by :</p>
                        <p>Install Date :</p>
                        <p>Address :</p>
                      </div>
                      <div className="grid gap-7">
                        <p>{dataList.siteInfo?.stationID}</p>
                        <p>{dataList.siteInfo?.branch}</p>
                        <p>{dataList.siteInfo?.installBy}</p>
                        <p>{formatDate(dataList.siteInfo?.installDate)}</p>
                        <p>{dataList.siteInfo?.address}</p>
                      </div>
                    </div>
                  </div>
                  {/* box-2 */}
                  <div>
                    <h1 className="text-[#213555] font-bold lg:text-2xl">
                      Site Update
                    </h1>
                    <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p className="h-6">Contact Name :</p>
                        <p className="h-6">Tel :</p>
                        <p className="h-6">GPS N :</p>
                        <p className="h-6">GPS E :</p>
                      </div>
                      <div className="flex flex-col gap-5">
                        <p className="h-6">{dataList.siteUpdate.contactName}</p>
                        <p className="h-6">{dataList.siteUpdate.tel}</p>
                        <p className="h-6">{dataList.siteUpdate.gpsN}</p>
                        <p className="h-6">{dataList.siteUpdate.gpsE}</p>
                      </div>
                    </div>
                  </div>
                  {/* box-3 */}
                  <div>
                    <h1 className="text-[#213555] font-bold lg:text-2xl">
                      Router Information
                    </h1>
                    <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>Router Model :</p>
                        <p>Router F/W :</p>
                        <p>Router S/N :</p>
                        <p>Router IP :</p>
                        <p>SubnetMask :</p>
                        <p>Rack S/N :</p>
                        <p>Antenna Gain :</p>
                      </div>
                      <div className="flex flex-col gap-6 lg:gap-5">
                        <p className="h-6">
                          {dataList.routerModel?.productTypeName}
                        </p>
                        <p className="h-6">{dataList.routerInfo.routerFW}</p>
                        <p className="h-6">{dataList.routerInfo.routerSN}</p>
                        <p className="h-6">{dataList.routerInfo.routerIp}</p>
                        <p className="h-6">{dataList.routerInfo.subnetMask}</p>
                        <p className="h-6">{dataList.routerInfo.rackSN}</p>
                        <p className="h-6">{dataList.routerInfo.antenaGain}</p>
                      </div>
                    </div>
                  </div>
                  {/* box-4 */}
                  <div>
                    <h1 className="text-[#213555] font-bold lg:text-2xl">
                      ATM Information
                    </h1>
                    <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                      <div className="flex flex-col gap-5 text-right font-bold">
                        <p>ATM Brand :</p>
                        <p>ATM Type :</p>
                        <p>ATM IP :</p>
                      </div>
                      <div className="flex flex-col gap-10 lg:gap-5">
                        <p className="h-6">{dataList.atmbrand?.atmBrandName}</p>
                        <p className="h-6">{dataList.atmtype?.atmTypeName}</p>
                        <p className="h-6">{dataList.atmInfo?.atmIp}</p>
                      </div>
                    </div>
                  </div>
                  {status.customerModel?.cusGroupType === 1 && (
                    <>
                      {/* box-5 */}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 1
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
                          <div className="grid gap-4 lg:gap-6">
                            <p className="h-6">
                              {dataList.providerSimFirst.providerName}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.callSimFirst}
                            </p>
                            <p className="h-6">
                              {dataList.apnSimFirst.aisApnName}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.ipSimFirst}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.lacSimFirst}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.cellIdSimFirst}
                            </p>
                            <label className="flex p-2 gap-3 items-center">
                              <span>
                                {dataList.simFirst.switchOverSimFirst ===
                                "true" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <BsXCircleFill className="w-5 h-5 text-red-500" />
                                )}
                              </span>
                              <span>Complete</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* box-6 */}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Test SIM 1
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="flex flex-col gap-7 lg:gap-5 text-right font-bold">
                            <p>Connection :</p>
                            <p>Package :</p>
                            <p>Signal Strength :</p>
                            <p>Pinging Test :</p>
                            <p>Average :</p>
                            <p>Download :</p>
                            <p>Upload :</p>
                          </div>
                          <div className="flex flex-col gap-5 lg:gap-5">
                            <p className="h-6">
                              {dataList.testSimFirst.connection}
                            </p>
                            <p className="h-6">
                              {dataList.packageSimFirst.packageName}
                            </p>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimFirst.signalStrength}
                              </span>
                              <span>
                                dBm(
                                <span className="text-red-500 font-bold">
                                  &gt;-91dbm
                                </span>
                                )
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 items-center">
                              <span>{dataList.testSimFirst.pingingTest}</span>%
                              Success
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimFirst.average}</span>
                              <span>
                                ms(
                                <span className="text-red-500 font-bold">
                                  &lt;400 ms
                                </span>
                                )
                              </span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimFirst.download}</span>
                              <span>
                                mbps(
                                <span className="text-red-500 font-bold">
                                  &gt;512 kbps
                                </span>
                                )
                              </span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimFirst.Upload}</span>
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
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 2
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
                          <div className="grid gap-5 lg:gap-6">
                            <p className="h-6">
                              {dataList.providerSimSecond.providerName}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.callSimSecond}
                            </p>
                            <p className="h-6">
                              {dataList.apnSimSecond.dtacApnName}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.ipSimSecond}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.lacSimSecond}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.cellIdSimSecond}
                            </p>
                            <label className="flex p-2 gap-3 items-center">
                              <span>
                                {dataList.simSecond.switchOverSimSecond ===
                                "true" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <BsXCircleFill className="w-5 h-5 text-red-500" />
                                )}
                              </span>
                              <span>Complete</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* box-8 */}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Test SIM 2
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="flex flex-col gap-5 text-right font-bold">
                            <p>Connection :</p>
                            <p>Package :</p>
                            <p>Signal Strength :</p>
                            <p>Pinging Test :</p>
                            <p>Average :</p>
                            <p>Download :</p>
                            <p>Upload :</p>
                          </div>
                          <div className="flex flex-col gap-5">
                            <p className="h-6">
                              {dataList.testSimSecond.connection}
                            </p>
                            <p className="h-6">
                              {dataList.packageSimSecond.packageName}
                            </p>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimSecond.signalStrength}
                              </span>
                              <span>
                                dBm(
                                <span className="text-red-500 font-bold">
                                  &gt;-91dbm
                                </span>
                                )
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 items-center">
                              <span>{dataList.testSimSecond.pingingTest}</span>%
                              Success
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimSecond.average}</span>
                              <span>
                                ms(
                                <span className="text-red-500 font-bold">
                                  &lt;400 ms
                                </span>
                                )
                              </span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimSecond.download}</span>
                              <span>
                                mbps(
                                <span className="text-red-500 font-bold">
                                  &gt;512 kbps
                                </span>
                                )
                              </span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimSecond.Upload}</span>
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
                    </>
                  )}
                  {status.customerModel?.cusGroupType === 2 && (
                    <>
                      {/*------ LTE Box-1 --------*/}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 1
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
                          <div className="grid gap-5">
                            <p className="h-6">
                              {dataList.providerSimFirst.providerName}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.callSimFirst}
                            </p>
                            <p className="h-6">
                              {dataList.apnSimFirst.aisApnName}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.ipSimFirst}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.lacSimFirst}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.cellIdSimFirst}
                            </p>
                            <p className="h-6">
                              {dataList.simFirst.connection}
                            </p>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.simFirst.signalStrength}</span>
                              <span>
                                mbps(
                                <span className="text-red-500 font-bold">
                                  &gt;-91dbm
                                </span>
                                )
                              </span>
                            </div>
                            <p className="h-6">
                              {dataList.packageSimFirst.packageName}
                            </p>
                            <label className="flex p-1 gap-3 items-center">
                              <span>
                                {dataList.simFirst.switchOverSimFirst ===
                                "true" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <BsXCircleFill className="w-5 h-5 text-red-500" />
                                )}
                              </span>
                              <span>Complete</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {/*------ LTE Box-2 --------*/}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 2
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
                          <div className="grid gap-5">
                            <p className="h-6">
                              {dataList.providerSimSecond.providerName}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.callSimSecond}
                            </p>
                            <p className="h-6">
                              {dataList.apnSimSecond.dtacApnName}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.ipSimSecond}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.cellIdSimSecond}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.lacSimSecond}
                            </p>
                            <p className="h-6">
                              {dataList.simSecond.connection}
                            </p>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.simSecond.signalStrength}</span>
                              <span>
                                mbps(
                                <span className="text-red-500 font-bold">
                                  &gt;-91dbm
                                </span>
                                )
                              </span>
                            </div>
                            <p className="h-6">
                              {dataList.packageSimSecond.packageName}
                            </p>
                            <label className="flex p-1 gap-3 items-center">
                              <span>
                                {dataList.simSecond.switchOverSimSecond ===
                                "true" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <BsXCircleFill className="w-5 h-5 text-red-500" />
                                )}
                              </span>
                              <span>Complete</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {/*------ LTE Box-3 --------*/}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Test SIM 1 Download
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Test 1 :</p>
                            <p>Test 2 :</p>
                            <p>Test 3 :</p>
                            <p>Test 4 :</p>
                            <p>Test 5 :</p>
                            <p>Download Average :</p>
                            <p>Pinging Test :</p>
                            <p>Average :</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirst.test[0]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirst.test[0]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirst.test[1]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirst.test[1]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirst.test[2]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirst.test[2]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirst.test[3]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirst.test[3]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirst.test[4]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirst.test[4]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimFirst.downloadAverage}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimFirst.pingingTest}</span>
                              <span>% Success</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimFirst.average}</span>
                              <span>
                                mbps(
                                <span className="text-red-500 font-bold">
                                  &lt;400 ms
                                </span>
                                )
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*------ LTE Box-4 --------*/}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Test SIM 1 Upload
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Test 1 :</p>
                            <p>Test 2 :</p>
                            <p>Test 3 :</p>
                            <p>Test 4 :</p>
                            <p>Test 5 :</p>
                            <p>Download Average :</p>
                            <p>Pinging Test :</p>
                            <p>Average :</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirstUpload.test[0]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirstUpload.test[0]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirstUpload.test[1]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirstUpload.test[1]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirstUpload.test[2]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirstUpload.test[2]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirstUpload.test[3]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirstUpload.test[3]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimFirstUpload.test[4]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimFirstUpload.test[4]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimFirstUpload.downloadAverage}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimFirstUpload.pingingTest}
                              </span>
                              <span>% Success</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimFirstUpload.average}</span>
                              <span>
                                mbps(
                                <span className="text-red-500 font-bold">
                                  &lt;400 ms
                                </span>
                                )
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*------ LTE Box-5 --------*/}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Test SIM 2 Download
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Test 1 :</p>
                            <p>Test 2 :</p>
                            <p>Test 3 :</p>
                            <p>Test 4 :</p>
                            <p>Test 5 :</p>
                            <p>Download Average :</p>
                            <p>Pinging Test :</p>
                            <p>Average :</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecond.test[0]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecond.test[0]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecond.test[1]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecond.test[1]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecond.test[2]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecond.test[2]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecond.test[3]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecond.test[3]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecond.test[4]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecond.test[4]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimSecond.downloadAverage}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimSecond.pingingTest}</span>
                              <span>% Success</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>{dataList.testSimSecond.average}</span>
                              <span>
                                mbps(
                                <span className="text-red-500 font-bold">
                                  &lt;400 ms
                                </span>
                                )
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*------ LTE Box-6 --------*/}
                      <div>
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Test SIM 2 Upload
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Test 1 :</p>
                            <p>Test 2 :</p>
                            <p>Test 3 :</p>
                            <p>Test 4 :</p>
                            <p>Test 5 :</p>
                            <p>Download Average :</p>
                            <p>Pinging Test :</p>
                            <p>Average :</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecondUpload.test[0]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecondUpload.test[0]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecondUpload.test[1]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecondUpload.test[1]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecondUpload.test[2]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecondUpload.test[2]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecondUpload.test[3]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecondUpload.test[3]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>File size</span>
                              <span>
                                {dataList.testSimSecondUpload.test[4]?.fileSize}
                              </span>
                              <span>Mb</span>
                              <span>
                                {dataList.testSimSecondUpload.test[4]?.speed}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimSecondUpload.downloadAverage}
                              </span>
                              <span>mbps</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimSecondUpload.pingingTest}
                              </span>
                              <span>% Success</span>
                            </div>
                            <div className="flex flex-wrap lg:gap-3 items-center">
                              <span>
                                {dataList.testSimSecondUpload.average}
                              </span>
                              <span>
                                mbps(
                                <span className="text-red-500 font-bold">
                                  &lt;400 ms
                                </span>
                                )
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* box-9 */}
                  <div>
                    <h1 className="text-[#213555] font-bold lg:text-2xl">
                      UPS Information
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
                      <div className="grid gap-5">
                        <p className="h-6">{dataList.upsType?.upsName}</p>
                        <p className="h-6">{dataList.upsInfo?.upsSN}</p>
                        <p className="h-6">{dataList.upsInfo?.upsBrand}</p>
                        <p className="h-6">{dataList.upsInfo?.upsModel}</p>
                        <p className="h-6">
                          {formatDate(dataList.upsInfo.batteryStart)}
                        </p>
                        <div className="flex flex-wrap lg:gap-3 items-center">
                          <span>{dataList.upsInfo.rate}</span>
                          KVA
                        </div>
                        <div className="flex gap-3 items-center">
                          <span>{dataList.upsInfo.load}</span>%
                        </div>
                        <div className="flex flex-wrap lg:gap-3 items-center">
                          <span>{dataList.upsInfo.temperature}</span>C
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* box-10 */}
                  <div>
                    <h1 className="text-[#213555] font-bold lg:text-2xl">
                      Test UPS
                    </h1>
                    <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-10 rounded-xl">
                      <div className="grid gap-9 lg:gap-4 text-right font-bold">
                        <p>L - N :</p>
                        <p>L - G :</p>
                        <p>N - G :</p>
                        <p>Bypass Mode :</p>
                        <p>Power Fail Test :</p>
                        <p>Command Test :</p>
                      </div>
                      <div className="grid gap-7 lg:gap-5">
                        <div className="flex flex-wrap lg:gap-3 items-center">
                          <span>{dataList.testUps.ln}</span>
                          Volt
                        </div>

                        <div className="flex flex-wrap lg:gap-3 items-center">
                          <span>{dataList.testUps.lg}</span>
                          Volt
                        </div>

                        <div className="flex flex-wrap lg:gap-3 items-center">
                          <span>{dataList.testUps.ng}</span>
                          Volt
                        </div>

                        <label className="flex p-1 gap-3 items-center">
                          <span>
                            {dataList.testUps.bypassMode === "true" ? (
                              <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                            ) : (
                              <BsXCircleFill className="w-5 h-5 text-red-500" />
                            )}
                          </span>
                          <span>pass</span>
                        </label>
                        <label className="flex p-1 gap-3 items-center">
                          <span>
                            {dataList.testUps.powerFailTest === "true" ? (
                              <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                            ) : (
                              <BsXCircleFill className="w-5 h-5 text-red-500" />
                            )}
                          </span>
                          <span>pass</span>
                        </label>
                        <label className="flex p-1 pt-3 gap-3 items-center">
                          <span>
                            {dataList.testUps.commandTest === "true" ? (
                              <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                            ) : (
                              <BsXCircleFill className="w-5 h-5 text-red-500" />
                            )}
                          </span>
                          <span>pass</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* box-11 */}
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
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[0]?.equipmentName}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[0]?.equipmentType}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[0]?.equipmentBrand}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[0]?.serial}
                            </td>
                          </tr>
                          <tr>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[1]?.equipmentName}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[1]?.equipmentType}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[1]?.equipmentBrand}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[1]?.serial}
                            </td>
                          </tr>
                          <tr>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[2]?.equipmentName}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[2]?.equipmentType}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[2]?.equipmentBrand}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[2]?.serial}
                            </td>
                          </tr>
                          <tr>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[3]?.equipmentName}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[3]?.equipmentType}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[3]?.equipmentBrand}
                            </td>
                            <td className="h-5 w-36 text-center">
                              {dataList.otherName[3]?.serial}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* box-12 */}
                  <div>
                    <h1 className="text-[#213555] font-bold lg:text-2xl">
                      Note
                    </h1>
                    <div className="flex gap-5 bg-[#E5D283] rounded-xl px-5 py-2">
                      <span className="font-bold">Note : </span>
                      <span>{dataList.note}</span>
                    </div>
                  </div>
                </div>
                {status.customerModel?.cusGroupType === 2 && (
                  <>
                    <div className="lg:flex">
                      {/* outsideBox-1 */}
                      <div className="lg:w-1/2">
                        <div className="flex lg:gap-3 mt-4">
                          <h1 className="text-[#213555] font-bold lg:text-2xl">
                            Test Other SIM 1
                          </h1>
                          <label className="flex p-1 gap-3 items-center">
                            <span>
                              {dataList.testSimFirstOther.simtype === "1" ? (
                                <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                              ) : (
                                <input
                                  type="radio"
                                  className="h-5 w-5"
                                  disabled
                                ></input>
                              )}
                            </span>
                            <span>Active</span>
                          </label>
                          <label className="flex p-1 gap-3 items-center">
                            <span>
                              {dataList.testSimFirstOther.simtype === "0" ? (
                                <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                              ) : (
                                <input
                                  type="radio"
                                  className="h-5 w-5"
                                  disabled
                                ></input>
                              )}
                            </span>
                            <span>Back Up</span>
                          </label>
                        </div>
                        <div className="grid gap-2 bg-[#E5D283] rounded-s-xl px-7 py-4">
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <div className="flex items-center gap-3">
                              <span>1)</span>
                              <span className="w-36">
                                {dataList.testSimSecondOther.data?.[0]?.name}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimFirstOther.data?.[0]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimFirstOther.data?.[0]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <div className="flex items-center gap-3">
                              <span>2)</span>
                              <span className="w-36">
                                {dataList.testSimSecondOther.data?.[1]?.name}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimFirstOther.data?.[1]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimFirstOther.data?.[1]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <div className="flex items-center gap-3">
                              <span>3)</span>
                              <span className="w-36">
                                {dataList.testSimSecondOther.data?.[2].name}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimFirstOther.data?.[2]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimFirstOther.data?.[2]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <div className="flex items-center gap-3">
                              <span>4)</span>
                              <span className="w-36">
                                {dataList.testSimSecondOther.data?.[3].name}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimFirstOther.data?.[3]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimFirstOther.data?.[3]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <div className="flex items-center gap-3">
                              <span>5)</span>
                              <span className="w-36">
                                {dataList.testSimSecondOther.data?.[4].name}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimFirstOther.data?.[4]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimFirstOther.data?.[4]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <div className="flex items-center gap-3">
                              <span>6)</span>
                              <span className="w-36">
                                {dataList.testSimSecondOther.data?.[5].name}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimFirstOther.data?.[5]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimFirstOther.data?.[5]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <div className="flex items-center gap-3">
                              <span>7)</span>
                              <span className="w-36">
                                {dataList.testSimSecondOther.data?.[6].name}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimFirstOther.data?.[6]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimFirstOther.data?.[6]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <div className="flex items-center gap-3">
                              <span>8)</span>
                              <span className="w-36">
                                {dataList.testSimSecondOther.data?.[7].name}
                              </span>
                            </div>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimFirstOther.data?.[7]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimFirstOther.data?.[7]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                        </div>
                      </div>
                      {/* outsideBox-2 */}
                      <div className="lg:w-1/2">
                        <div className="flex lg:gap-3 mt-4">
                          <h1 className="text-[#213555] font-bold lg:text-2xl">
                            Test Other SIM 2
                          </h1>
                          <label className="flex p-1 gap-3 items-center">
                            <span>
                              {dataList.testSimSecondOther.simtype === "1" ? (
                                <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                              ) : (
                                <input
                                  type="radio"
                                  className="h-5 w-5"
                                  disabled
                                ></input>
                              )}
                            </span>
                            <span>Active</span>
                          </label>
                          <label className="flex p-1 gap-3 items-center">
                            <span>
                              {dataList.testSimSecondOther.simtype === "0" ? (
                                <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                              ) : (
                                <input
                                  type="radio"
                                  className="h-5 w-5"
                                  disabled
                                ></input>
                              )}
                            </span>
                            <span>Back Up</span>
                          </label>
                        </div>
                        <div className="grid gap-2 bg-[#E5D283] rounded-e-xl px-7 py-4">
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <span>1)</span>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimSecondOther.data?.[0]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimSecondOther.data?.[0]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <span>2)</span>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimSecondOther.data?.[1]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimSecondOther.data?.[1]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <span>3)</span>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimSecondOther.data?.[2]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimSecondOther.data?.[2]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <span>4)</span>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimSecondOther.data?.[3]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimSecondOther.data?.[3]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <span>5)</span>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimSecondOther.data?.[4]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimSecondOther.data?.[4]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <span>6)</span>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimSecondOther.data?.[5]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimSecondOther.data?.[5]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <span>7)</span>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimSecondOther.data?.[6]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimSecondOther.data?.[6]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                          <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                            <span>8)</span>
                            <div className="flex gap-3">
                              <span>
                                {dataList.testSimSecondOther.data?.[7]?.pass ===
                                "1" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Pass</span>
                              <span>
                                {dataList.testSimSecondOther.data?.[7]?.pass ===
                                "0" ? (
                                  <BsFillCheckCircleFill className="w-5 h-5 text-green-500" />
                                ) : (
                                  <input
                                    type="radio"
                                    className="h-5 w-5"
                                    disabled
                                  ></input>
                                )}
                              </span>
                              <span>Fail</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </AnimateHeight>
            </div>

            {/* section-2 */}
            {/*-------- picture 1 ------ */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
                onClick={() => setBoxTwo(!boxTwo)}
              >
                <h1>Image</h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxTwo ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={1000} height={boxTwo ? "auto" : 0}>
                <div className="p-5 flex flex-col items-center text-[#213555]">
                  <h1 className="text-3xl font-bold w-full p-5">Image</h1>
                  <div className="lg:grid lg:grid-cols-3 grid gap-5 text-center">
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[0]?.cid}/${imageList[0]?.tikcetId}/${imageList[0]?.fileName}`}
                      alt="รูปหน้าร้าน"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[1]?.cid}/${imageList[1]?.tikcetId}/${imageList[1]?.fileName}`}
                      alt="หน้าตู้/จุดวางอุปกรณ์"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[2]?.cid}/${imageList[2]?.tikcetId}/${imageList[2]?.fileName}`}
                      alt="ด้านข้างตู้(ซ้าย-ขวา)"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[3]?.cid}/${imageList[3]?.tikcetId}/${imageList[3]?.fileName}`}
                      alt="รูปอุปกรณ์/Serial"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[4]?.cid}/${imageList[4]?.tikcetId}/${imageList[4]?.fileName}`}
                      alt="รูปอุปกรณ์/Serial"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[5]?.cid}/${imageList[5]?.tikcetId}/${imageList[5]?.fileName}`}
                      alt="หลังตู้/จุดวางอุปกรณ์"
                      className="w-[300px] h-[300px]"
                    />
                  </div>
                </div>
              </AnimateHeight>
            </div>
            {/*-------- picture 2 ------ */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
                onClick={() => setBoxThree(!boxThree)}
              >
                <h1>Serial Image</h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxThree ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={1000} height={boxThree ? "auto" : 0}>
                <div className="p-5 flex flex-col items-center text-[#213555]">
                  <h1 className="text-3xl font-bold w-full p-5">Image</h1>
                  <div className="lg:grid lg:grid-cols-3 grid gap-5 text-center">
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[6]?.cid}/${imageList[6]?.tikcetId}/${imageList[6]?.fileName}`}
                      alt="Serial Number SIM 1"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[7]?.cid}/${imageList[7]?.tikcetId}/${imageList[7]?.fileName}`}
                      alt="Serial Number SIM 2"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[8]?.cid}/${imageList[8]?.tikcetId}/${imageList[8]?.fileName}`}
                      alt="Serial Number Router"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[9]?.cid}/${imageList[9]?.tikcetId}/${imageList[9]?.fileName}`}
                      alt="Serial Number Rack"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[10]?.cid}/${imageList[10]?.tikcetId}/${imageList[10]?.fileName}`}
                      alt="Serial Number UPS"
                      className="w-[300px] h-[300px]"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[11]?.cid}/${imageList[11]?.tikcetId}/${imageList[11]?.fileName}`}
                      alt="Serial Number Other"
                      className="w-[300px] h-[300px]"
                    />
                  </div>
                </div>
              </AnimateHeight>
            </div>

            {/* section-3 */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
                onClick={() => setBoxFour(!boxFour)}
              >
                <h1>Engineer Action</h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxFour ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={1000} height={boxFour ? "auto" : 0}>
                <div className="p-5">
                  <h1 className="text-[#213555] font-bold text-2xl">
                    Working Time
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                    <div className="grid gap-[22px] text-right font-bold">
                      <p>Office Departure :</p>
                      <p>Office Arrival :</p>
                      <p>Customer Site Arrival :</p>
                      <p>Customer Site Departure :</p>
                      <p>Customer Site ETA :</p>
                      <p>Working Start :</p>
                      <p>Working End :</p>
                    </div>
                    <div className="grid gap-3 lg:gap-6">
                      <p className="h-6">
                        {formatDateTime(dataList.workingTime.officeDeparture)}
                      </p>
                      <p className="h-6">
                        {formatDateTime(dataList.workingTime.officeArrival)}
                      </p>
                      <p className="h-6">
                        {formatDateTime(
                          dataList.workingTime.customerSiteArrival
                        )}
                      </p>
                      <p className="h-6">
                        {formatDateTime(
                          dataList.workingTime.customerSiteDeparture
                        )}
                      </p>
                      <p className="h-6">
                        {formatDateTime(dataList.workingTime.customerSiteETA)}
                      </p>
                      <p className="h-6">
                        {formatDateTime(dataList.workingTime.workingStart)}
                      </p>
                      <p className="h-6">
                        {formatDateTime(dataList.workingTime.workingEnd)}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateHeight>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewInstall;
