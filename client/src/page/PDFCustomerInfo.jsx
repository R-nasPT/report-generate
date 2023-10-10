import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import axios from "axios";
import packageJson from "../../package.json";
import LoadingPage from "../component/LoadingPage";
import { useAuthContext } from "../context/AuthContext";

function PDFCustomerInfo() {
  const [status, setStatus] = useState([]);
  const [siteinfo, setSiteinfo] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [imageList, setImageList] = useState([]);

  const { formatDate } = useAuthContext();

  // console.log(siteinfo.shortName);
  // console.log(customerInfo);

  const { id } = useParams();

  const downloadPDF = async () => {
    const element = document.getElementById("element-to-print");
    const currentDate = new Date().toISOString().split("T")[0];
    const opt = {
      margin: 1,
      filename: `ATM Report ${siteinfo.cid} ${currentDate}`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
    };

    // Convert the images to base64 data URLs before generating the PDF
    const imageElements = element.querySelectorAll("img");
    const promises = [];
    for (const imgElement of imageElements) {
      const imageUrl = imgElement.src;
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        imgElement.src = dataUrl;
      } catch (error) {
        console.error("Error converting image:", error);
      }
    }

    // Wait for all image conversions to finish before generating the PDF
    try {
      await Promise.all(promises);
    } catch (error) {
      console.error("Error converting images:", error);
    }

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
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

  if (
    customerInfo === undefined ||
    imageList === undefined ||
    siteinfo === undefined
  ) {
    return <LoadingPage />;
  }

  return (
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
          className="py-6 px-8 bg-white leading-[16px] font-thai-sarabunNew"
        >
          <section className="h-[1040px]">
            <div className="flex flex-col items-center">
              <table className="text-[16px] border-[2px] border-black m-3 w-[670px]">
                <thead className="text-center w-full">
                  <tr>
                    <th colSpan="2" className="pb-3">
                      Customer Information
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" border-y-[2px] border-black pb-3 px-3 w-32">
                      Customer
                    </td>
                    <td className=" border-l-[2px] border-t-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">
                        {siteinfo.customerModel?.fullNameThai}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-3 px-3">Site Name</td>
                    <td className=" border-y-[2px] border-l-[2px] border-black pb-3 pl-3 ">
                      <p className="w-96 break-words">{siteinfo.siteName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-y-[2px] border-black pb-3 px-3">
                      Station ID
                    </td>
                    <td className=" border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">
                        {siteinfo.atmModel?.stationId}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" pb-3 px-3">CID</td>
                    <td className="border-y-[2px] border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">{siteinfo.cid}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-y-[2px] border-black pb-3 px-3">
                      Install Date
                    </td>
                    <td className="flex border-l-[2px] border-black pl-3">
                      <p className="w-1/2 break-words">
                        {formatDate(siteinfo.routerInfoModel?.installationDate)}{" "}
                      </p>
                      <span className="border-l-[2px] border-black h-full pb-3 pl-3">
                        Battery Start:{" "}
                        {formatDate(siteinfo.upsInfoModel?.batteryStartDate) !==
                        "aN/aN/NaN"
                          ? formatDate(siteinfo.upsInfoModel?.batteryStartDate)
                          : ""}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-3 px-3">Install By</td>
                    <td className="border-y-[2px] border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">
                        {siteinfo.routerInfoModel?.ppEngineer}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-y-[2px] border-black pb-3 px-3">
                      Address
                    </td>
                    <td className=" border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">{siteinfo.address}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-3 px-3">Contact Person</td>
                    <td className="border-y-[2px] border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">
                        {siteinfo.contractName}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-y-[2px] border-black pb-3 px-3">
                      Tel.
                    </td>
                    <td className=" border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">{siteinfo.tel}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-3 px-3">Environment</td>
                    <td className="border-y-[2px] border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-y-[2px] border-black pb-3 px-3">
                      ATM Type
                    </td>
                    <td className=" border-l-[2px] border-black pb-3 pl-3">
                      {siteinfo.atmModel?.atmTypeModel?.atmTypeName}
                    </td>
                  </tr>
                  <tr>
                    <td className=" pb-3 px-3">ATM Model</td>
                    <td className="border-y-[2px] border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">
                        {siteinfo.atmModel?.atmBrandModel?.atmBrandName}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-t-[2px] border-black pb-3 px-3">
                      Remark
                    </td>
                    <td className=" border-l-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">{customerInfo.note}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-semibold text-3xl">Picture</h2>
              <div
                className={`${
                  siteinfo.shortName === "NTC"
                    ? "grid grid-cols-2"
                    : "grid grid-cols-3"
                } gap-3 mt-3`}
              >
                <img
                  src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[0]?.cid}/${imageList[0]?.tikcetId}/${imageList[0]?.fileName}`}
                  alt="รูปหน้าร้าน"
                  className={`${
                    siteinfo.shortName === "NTC"
                      ? "w-[350px] h-[350px]"
                      : "w-52 h-60"
                  }`}
                />
                <img
                  src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[1]?.cid}/${imageList[1]?.tikcetId}/${imageList[1]?.fileName}`}
                  alt="หน้าตู้/จุดวางอุปกรณ์"
                  className={`${
                    siteinfo.shortName === "NTC"
                      ? "w-[350px] h-[350px]"
                      : "w-52 h-60"
                  }`}
                />
                {siteinfo.shortName !== "NTC" && (
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
  );
}

export default PDFCustomerInfo;
