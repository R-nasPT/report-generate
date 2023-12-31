import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import packageJson from "../../package.json";
import LoadingPage from "../component/LoadingPage";
import { useAuthContext } from "../context/AuthContext";
import { formatDate } from "../utils/dateUtils";
import downloadPDF from "../utils/pdfUtils";
import { FaDownload } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { TbArrowBackUp } from "react-icons/tb";

function PDFCustomerInfo() {
  const [status, setStatus] = useState([]);
  const [siteinfo, setSiteinfo] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [imageList, setImageList] = useState([]);

  const { isAdmin } = useAuthContext();
  const navigate = useNavigate();

  // console.log(imageList);
  // console.log(siteinfo.routerInfoModel?.installationDate);

  const { id } = useParams();

  const handleDownloadPDF = () => {
    downloadPDF(`Customer Report ${siteinfo.cid}`);
  };

  const getStatus = async () => {
    try {
      const response = await axios.get(
        `${packageJson.domain.ipSiteInfo}/siteinfo/checkstaus/${id}`
      );
      setStatus(response.data);

      getSiteinfoReportByCIDAndTicket(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSiteinfoReportByCIDAndTicket = async (info) => {
    try {
      let data = {
        ticketId: info.TicketInfoModel
          ? info.TicketInfoModel.tkdt_ID
          : info.TicketInfoLTEModel
          ? info.TicketInfoLTEModel.tkdt_ID
          : info.TicketInfoKTBModel
          ? info.TicketInfoKTBModel.tkdt_ID
          : "",
        cid: info?.cid,
      };
      // console.log(data);
      const response = await axios.post(
        `${packageJson.domain.ipSiteInfo}/siteinfo/report/`,
        data
      );
      // console.log(response.data);
      setCustomerInfo(response.data.rawData);
      setImageList(response.data.fileInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${packageJson.domain.ipSiteInfo}/siteinfo/${id}`
      );
      setSiteinfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStatus();
    fetchData();
  }, []);

  return (
    <div>
      <div className="lg:py-8 lg:px-96 min-h-screen flex justify-center items-center lg:flex-col bg-slate-300">
        <div className="grid lg:flex gap-7 lg:gap-2 mb-2">
          {isAdmin && (
            <>
              <TbArrowBackUp
                className="w-32 h-32 p-2 lg:w-10 lg:h-10 lg:p-2 bg-blue-500 lg:hover:bg-blue-400 rounded-xl lg:rounded-md text-white"
                onClick={() => navigate(`/user/atmpage/${id}`)}
              />
              <RiHome2Line
                className="w-32 h-32 p-2 lg:w-10 lg:h-10 lg:p-2 bg-blue-500 lg:hover:bg-blue-400 rounded-xl lg:rounded-md text-white"
                onClick={() => navigate(`/user/install`)}
              />
            </>
          )}
          <FaDownload
            onClick={handleDownloadPDF}
            className="w-32 h-32 p-3 lg:w-10 lg:h-10 lg:p-2 bg-red-400 lg:hover:bg-red-500 rounded-xl lg:rounded-md text-red-100 transition-transform transform active:scale-[0.8]"
          />
        </div>
        <div className="hidden lg:block">
          <div
            id="element-to-print"
            className="py-6 px-8 bg-white leading-[16px] font-thai-sarabunNew"
          >
            <section className="h-[1040px]">
              <div className="flex flex-col items-center">
                <table className="text-[18px] border-[2px] border-black w-[670px]">
                  <thead className="text-center w-full">
                    <tr>
                      <th colSpan="2" className="pb-3 text-2xl">
                        Customer Information
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className=" border-y-[2px] border-r-[2px] border-black pb-3 px-3 w-32">
                        Customer
                      </td>
                      <td className=" border-y-[2px] border-black pb-3 pl-3">
                        <p className="w-96 break-words">
                          {siteinfo?.customerModel?.fullNameThai}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-3 px-3 border-r-[2px] border-black">
                        Site Name
                      </td>
                      <td className="pb-3 pl-3 ">
                        <p className="w-96 break-words">{siteinfo?.siteName}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" border-y-[2px] border-r-[2px] border-black pb-3 px-3">
                        Station ID
                      </td>
                      <td className="border-y-[2px] border-black pb-3 pl-3">
                        <p className="w-96 break-words">
                          {siteinfo?.atmModel?.stationId}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" pb-3 px-3 border-r-[2px] border-black">
                        CID
                      </td>
                      <td className="pb-3 pl-3">
                        <p className="w-96 break-words">{siteinfo?.cid}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-r-[2px] border-y-[2px] border-black pb-3 px-3">
                        Install Date
                      </td>
                      <td className="border-y-[2px] border-black pb-3 pl-3">
                        {siteinfo?.upsInfoModel?.batteryStartDate !==
                          undefined &&
                          siteinfo?.upsInfoModel?.batteryStartDate !== null &&
                          siteinfo?.upsInfoModel?.batteryStartDate !== "-" &&
                          siteinfo?.upsInfoModel?.batteryStartDate !== "" && (
                            <span>LINK :</span>
                          )}
                        <span>
                          {formatDate(
                            siteinfo?.routerInfoModel?.installationDate
                          )}{" "}
                        </span>
                        {siteinfo?.upsInfoModel?.batteryStartDate !==
                          undefined &&
                          siteinfo?.upsInfoModel?.batteryStartDate !== null &&
                          siteinfo?.upsInfoModel?.batteryStartDate !== "-" &&
                          siteinfo?.upsInfoModel?.batteryStartDate !== "" && (
                            <span className="h-full pb-3 pl-3">
                              - UPS -{" "}
                              {formatDate(
                                siteinfo?.upsInfoModel?.batteryStartDate
                              )}
                            </span>
                          )}
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-3 px-3 border-r-[2px] border-black">
                        Install By
                      </td>
                      <td className="pb-3 pl-3">
                        <p className="w-96 break-words">
                          {siteinfo?.routerInfoModel?.ppEngineer}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" border-y-[2px] border-r-[2px] border-black pb-3 px-3">
                        Address
                      </td>
                      <td className=" border-y-[2px] border-black pb-3 pl-3">
                        <p className="w-96 break-words">{siteinfo?.address}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-3 px-3 border-r-[2px] border-black">
                        Contact Person
                      </td>
                      <td className="pb-3 pl-3">
                        <p className="w-96 break-words">
                          {siteinfo?.contractName}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" border-y-[2px] border-r-[2px] border-black pb-3 px-3">
                        Tel.
                      </td>
                      <td className=" border-y-[2px] border-black pb-3 pl-3">
                        <p className="w-96 break-words">{siteinfo?.tel}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-3 px-3 border-r-[2px] border-black">
                        Environment
                      </td>
                      <td className="pb-3 pl-3">
                        <p className="w-96 break-words"></p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" border-y-[2px] border-r-[2px] border-black pb-3 px-3">
                        ATM Type
                      </td>
                      <td className=" border-y-[2px] border-black pb-3 pl-3">
                        {siteinfo?.atmModel?.atmTypeModel?.atmTypeName}
                      </td>
                    </tr>
                    <tr>
                      <td className=" pb-3 px-3 border-r-[2px] border-black">
                        ATM Model
                      </td>
                      <td className="pb-3 pl-3">
                        <p className="w-96 break-words">
                          {siteinfo?.atmModel?.atmBrandModel?.atmBrandName}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" border-t-[2px] border-r-[2px] border-black pb-3 px-3">
                        Remark
                      </td>
                      <td className=" border-t-[2px] border-black pb-3 pl-3">
                        <p className="w-96 break-words">{customerInfo.note}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h2 className="font-semibold text-3xl pb-3">Picture</h2>
                <div
                  className={`${
                    siteinfo?.shortName === "KTB"
                      ? "grid grid-cols-2"
                      : "grid grid-cols-3"
                  } gap-3 mt-3`}
                >
                  <img
                    src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[0]?.cid}/${imageList[0]?.tikcetId}/${imageList[0]?.fileName}`}
                    alt="รูปหน้าร้าน"
                    className={`${
                      siteinfo?.shortName === "KTB"
                        ? "w-[350px] h-[350px]"
                        : "w-52 h-60"
                    }`}
                  />
                  <img
                    src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[1]?.cid}/${imageList[1]?.tikcetId}/${imageList[1]?.fileName}`}
                    alt="หน้าตู้/จุดวางอุปกรณ์"
                    className={`${
                      siteinfo?.shortName === "KTB"
                        ? "w-[350px] h-[350px]"
                        : "w-52 h-60"
                    }`}
                  />
                  {siteinfo?.shortName !== "KTB" && (
                    <>
                      <img
                        src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[2]?.cid}/${imageList[2]?.tikcetId}/${imageList[2]?.fileName}`}
                        alt="ด้านข้างตู้(ซ้าย-ขวา)"
                        className="w-52 h-60"
                      />
                      <img
                        src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[3]?.cid}/${imageList[3]?.tikcetId}/${imageList[3]?.fileName}`}
                        alt="รูปอุปกรณ์/Serial"
                        className="w-52 h-60"
                      />
                      <img
                        src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[4]?.cid}/${imageList[4]?.tikcetId}/${imageList[4]?.fileName}`}
                        alt="รูปอุปกรณ์/Serial"
                        className="w-52 h-60"
                      />
                      <img
                        src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[5]?.cid}/${imageList[5]?.tikcetId}/${imageList[5]?.fileName}`}
                        alt="หลังตู้/จุดวางอุปกรณ์"
                        className="w-52 h-60"
                      />
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PDFCustomerInfo;
