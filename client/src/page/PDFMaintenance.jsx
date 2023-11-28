import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import packageJson from "../../package.json";
import axios from "axios";
import LoadingPage from "../component/LoadingPage";
import { formatDate, formatTime } from "../utils/dateUtils";
import downloadPDF from "../utils/pdfUtils";
import { FaDownload } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";

function PDFMaintenance() {
  const [imageList, setImageList] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const server = axios.create({
    baseURL: packageJson.domain.ipSiteInfo,
  });

  const fetchToSetData = async () => {
    try {
      const response = await server.get(`/maintenance/${id}`);
      // console.log(response.data);
      setMaintenance(response.data);
      setImageList(response.data.maintenanceInfoDetailModels);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF(`Maintenance Report ${maintenance.cid}`);
  };

  useEffect(() => {
    fetchToSetData();
  }, []);

  if (maintenance.length === 0) return <LoadingPage />;

  return (
    <>
      <div className="lg:py-8 lg:px-96 min-h-screen flex justify-center items-center lg:flex-col bg-slate-300 ">
        <div className="flex gap-7 lg:gap-2 mb-2">
          <>
            {/* <Link to={`/user/customer-file-upload`}>
              <img
                src="/component/back.png"
                alt="pdf"
                className="w-9 h-9 p-2 bg-red-600 hover:bg-red-500 rounded-md"
              />
            </Link> */}
            <RiHome2Line
              className="w-32 h-32 p-2 lg:w-10 lg:h-10 lg:p-2 bg-blue-500 lg:hover:bg-blue-400 rounded-xl lg:rounded-md text-white"
              onClick={() => navigate(`/user/maintenance-summary`)}
            />
          </>
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
                          {
                            maintenance.SiteInfoModel?.customerModel
                              ?.fullNameThai
                          }
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-3 px-3 border-r-[2px] border-black">
                        Site Name
                      </td>
                      <td className="pb-3 pl-3 ">
                        <p className="w-96 break-words">
                          {maintenance.SiteInfoModel?.siteName}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" border-y-[2px] border-r-[2px] border-black pb-3 px-3">
                        Station ID
                      </td>
                      <td className="border-y-[2px] border-black pb-3 pl-3">
                        <p className="w-96 break-words">
                          {maintenance.SiteInfoModel?.atmModel?.stationId}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" pb-3 px-3 border-r-[2px] border-black">
                        CID
                      </td>
                      <td className="pb-3 pl-3">
                        <p className="w-96 break-words">{maintenance.cid}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-r-[2px] border-y-[2px] border-black pb-3 px-3">
                        Service Time
                      </td>
                      <td className="border-y-[2px] border-black pb-3 pl-3">
                        {formatDate(maintenance.onsiteTime)}{" "}
                        <span className="text-white">.......</span> Time In :{" "}
                        {formatTime(maintenance.workingStart)}{" "}
                        <span className="text-white">.......</span> Time Out :{" "}
                        {formatTime(maintenance.workingEnd)}
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-3 px-3 border-r-[2px] border-black">
                        Service By
                      </td>
                      <td className="pb-3 pl-3">
                        <p className="w-96 break-words">
                          {maintenance.onsiteBy}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className=" border-t-[2px] border-r-[2px] border-black pb-3 px-3">
                        Address
                      </td>
                      <td className=" border-t-[2px] border-black pb-3 pl-3">
                        <p className="w-96 break-words">
                          {maintenance.SiteInfoModel?.address}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td className=" border-y-[2px] border-r-[2px] border-black pb-3 px-3">
                        ATM Type
                      </td>
                      <td className=" border-y-[2px] border-black pb-3 pl-3">
                        {
                          maintenance.SiteInfoModel?.atmModel?.atmTypeModel
                            ?.atmTypeName
                        }
                      </td>
                    </tr>
                    <tr>
                      <td className=" pb-3 px-3 border-r-[2px] border-black">
                        ATM Model
                      </td>
                      <td className="pb-3 pl-3">
                        <p className="w-96 break-words">
                          {
                            maintenance.SiteInfoModel?.atmModel?.atmBrandModel
                              ?.atmBrandName
                          }
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-t-[2px] pb-3 px-3 border-r-[2px] border-black">
                        Rack S/N
                      </td>
                      <td className="border-t-[2px] border-black pb-3 pl-3">
                        <p className="w-96 break-words">
                          {
                            maintenance.SiteInfoModel?.otherInfoModel
                              ?.rackSerialNo
                          }
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="grid gap-3 mt-3">
                  <h2 className="font-semibold text-center text-3xl pb-3">
                    Before
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[0].maintenanceInfoId}/${imageList[0].fileName}`}
                      alt="รูปหน้าร้าน"
                      className="w-52 h-60"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[1].maintenanceInfoId}/${imageList[1].fileName}`}
                      alt="หน้าตู้/จุดวางอุปกรณ์"
                      className="w-52 h-60"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[2].maintenanceInfoId}/${imageList[2].fileName}`}
                      alt="ด้านข้างตู้(ซ้าย-ขวา)"
                      className="w-52 h-60"
                    />
                  </div>
                  <h2 className="font-semibold text-center text-3xl pb-3">
                    After
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[3].maintenanceInfoId}/${imageList[3].fileName}`}
                      alt="รูปอุปกรณ์/Serial"
                      className="w-52 h-60"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[4].maintenanceInfoId}/${imageList[4].fileName}`}
                      alt="รูปอุปกรณ์/Serial"
                      className="w-52 h-60"
                    />
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[5].maintenanceInfoId}/${imageList[5].fileName}`}
                      alt="หลังตู้/จุดวางอุปกรณ์"
                      className="w-52 h-60"
                    />
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

export default PDFMaintenance;
