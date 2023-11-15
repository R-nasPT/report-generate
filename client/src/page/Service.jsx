/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FiFilter } from "react-icons/fi";
import packageJson from "../../package.json";
import LoadingPage from "../component/LoadingPage";
import { formatDate } from "../utils/dateUtils";
import * as XLSX from "xlsx";

function Service() {
  const [siteinfo, setSiteinfo] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [ticketList, setTicketList] = useState("");
  const [cidList, setCidList] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [boxFilter, setBoxFilter] = useState(false);

  const creator = localStorage.getItem("id");

  const navigate = useNavigate();

  // const urlParams = new URLSearchParams(window.location.search);
  // const key = urlParams.get("key");
  // console.log(key);

  // console.log(siteinfo);

  const fetchData = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfoBeta}/siteInforeplace/siteinfoReplaceHistoryALLByCidAndTicket`
    );
    // console.log(response.data);
    setSiteinfo(response.data.lastData);
  };

  const fetchCustomer = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/customer/`
    );
    setCustomer(response.data);
  };

  const togglePopup = () => {
    setBoxFilter(!boxFilter);
  };

  const ticketOptions = siteinfo
    .sort((a, b) => a.ticketId.localeCompare(b.ticketId))
    .map((item) => ({
      value: item.ticketId,
      label: item.ticketId,
    }));

  const cidOptions = siteinfo
    .sort((a, b) => a.cid.localeCompare(b.cid))
    .map((item) => {
      // console.log(item.cid);
      return {
        value: item.cid,
        label: item.cid,
      };
    });

  const handleSearch = () => {
    const filters = siteinfo.filter((item) => {
      // console.log(item.cid);
      return item.cid.includes(cidList) && item.ticketId.includes(ticketList);
    });
    setFilterData(filters);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const exportToExcel = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const worksheet = XLSX.utils.json_to_sheet(filterData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `Replace_data, ${currentDate}.xlsx`);
  };

  useEffect(() => {
    fetchData();
    fetchCustomer();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [siteinfo]);

  if (siteinfo.length === 0) return <LoadingPage />;

  return (
    <>
      <div className="px-2 lg:px-32 py-5">
        <h1 className="py-3 px-5 font-bold shadow-sm shadow-black rounded-md">
          Home / Service{" "}
          <span className="text-[#1A16D3]">/ Replace </span>
        </h1>
        <div className="flex justify-end py-4 px-5 lg:hidden">
          <div
            onClick={togglePopup}
            className="flex items-center gap-2 bg-violet-600 text-violet-200 p-2 rounded-lg"
          >
            <FiFilter />
            Filter
          </div>
        </div>
        <div className="hidden lg:flex flex-wrap gap-3 my-3 lg:justify-between rounded-md p-3 bg-stone-300">
          <div className="flex gap-4 flex-wrap">
            <Select
              isSearchable
              placeholder="--Ticket--"
              options={ticketOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setTicketList(selectedOption.label);
              }}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "black",
                  borderRadius: "12px",
                  width: "160px",
                }),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Select
              isSearchable
              placeholder="--CID--"
              options={cidOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setCidList(selectedOption.label);
              }}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "black",
                  borderRadius: "12px",
                  width: "160px",
                }),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              className="bg-blue-500 text-blue-100 w-20 rounded-2xl hover:bg-blue-600"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="bg-neutral-500 text-neutral-100 w-20 rounded-2xl hover:bg-neutral-600"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          <button
            className="bg-green-600 text-green-200 w-20 rounded-2xl hover:bg-green-700"
            onClick={exportToExcel}
          >
            Export
          </button>
        </div>
        <div className=" overflow-auto max-h-[500px] lg:max-h-[600px]">
          <table className="">
            <thead className="border-[1px] border-black sticky top-0">
              <tr className="bg-gray-200">
                <th className="p-1 lg:p-2">No.</th>
                <th className="p-1 lg:p-2">Status</th>
                <th className="p-1 lg:p-2">Ticket</th>
                <th className="p-1 lg:p-2">CID</th>
                <th className="p-1 lg:p-2">Sitename</th>
                <th className="p-1 lg:p-2">อุปกรณ์ที่เปลี่ยน</th>
                <th className="p-1 lg:p-2">Model IN</th>
                <th className="p-1 lg:p-2">Serial IN</th>
                <th className="p-1 lg:p-2">Service Center</th>
                <th className="p-1 lg:p-2">เปลียนโดย</th>
                <th className="p-1 lg:p-2">วันที่เปลี่ยน</th>
                <th className="p-1 lg:p-2">ตรวจโดย</th>
                <th className="p-1 lg:p-2">วันที่ตรวจสอบ</th>
                <th className="p-1 lg:p-2">ShowProblemFirst</th>
                <th className="p-1 lg:p-2">ShowProblemClose</th>
                <th className="p-1 lg:p-2">วัตถุประสงค์</th>
              </tr>
            </thead>
            <tbody className="border-[1px] border-black">
              {filterData.map((data, index) => {
                // console.log(data.TicketInfoModel);
                return (
                  <tr
                    className="hover:bg-neutral-200 cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/public/replace/${data.siteinfo?.siteInfoId}/${data.ticketId}/${creator}`
                      )
                    }
                    key={index}
                  >
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {index + 1}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      <div className="flex justify-center">
                        <div className="w-6 h-6 border-2  rounded-full bg-green-500 border-green-300"></div>
                      </div>
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.ticketId}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.cid}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.siteinfo?.siteName}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {
                        data.siteinfoReportServiceTypeModel
                          ?.siteinfoReportReplaceTypeName
                      }
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.modelNewName?.productTypeName}
                      {data.modelNewName?.providerName}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.serialNumberNew}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {/* {data.locationDetails} */}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.changeBy}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {formatDate(data.changeTime)}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.userInfoModel?.userName}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {formatDate(data.createTime)}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {/* {data.subDistrict} */}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {/* {data.contractName} */}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {
                        data.siteinfoReportServiceObjectiveModel
                          ?.siteinfoReportReplaceObjectiveName
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {boxFilter && (
        <div className=" fixed top-0 left-0 w-screen h-screen flex justify-center px-5 items-center bg-black bg-opacity-50">
          <div className=" bg-white rounded-3xl p-8 relative flex flex-col gap-2">
            <img
              className=" w-3 h-3 absolute right-4 top-3 cursor-pointer "
              onClick={togglePopup}
              src="/user/close-line-icon.svg"
              alt="save"
            />
            <Select
              isSearchable
              placeholder="--Ticket--"
              options={ticketOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setTicketList(selectedOption.label);
              }}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: "black",
                  borderRadius: "12px",
                }),
              }}
            />
            <Select
              isSearchable
              placeholder="--CID--"
              options={cidOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setCidList(selectedOption.label);
              }}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "black",
                  borderRadius: "12px",
                }),
              }}
            />
            <div className="flex gap-1">
              <button
                className="bg-blue-500 text-blue-100 w-20 rounded-lg hover:bg-blue-600"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="bg-neutral-500 text-neutral-100 w-20 rounded-lg hover:bg-neutral-600"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className="bg-green-600 text-green-200 w-20 py-1 rounded-lg hover:bg-green-700"
                onClick={exportToExcel}
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Service;
