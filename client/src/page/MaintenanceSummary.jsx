import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FiFilter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import packageJson from "../../package.json";
import { formatDate, formatDateTime } from "../utils/dateUtils";
import LoadingPage from "../component/LoadingPage";
import exportToExcel from "../utils/excelUtils";

function MaintenanceSummary() {
  const [boxFilter, setBoxFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState([]);
  const [dataZone, setDataZone] = useState([]);

  const [cidList, setCidList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const navigate = useNavigate();

  // console.log(zoneList,  dataInfo?.[0]?.SiteInfoModel?.zoneModel?.zoneID);
  // console.log(dataInfo[0]);
  // console.log(dataInfo[0]?.SiteInfoModel);

  const server = axios.create({
    baseURL: packageJson.domain.ipSiteInfo,
  });

  const fetchData = async () => {
    const response = await server.get(`/maintenance/`);
    setDataInfo(response.data);
    setFilterData(response.data);
  };

  const fetchDataZone = async () => {
    const response = await server.get(`/maintenance/zone`);
    setDataZone(response.data);
  };

  const togglePopup = () => {
    setBoxFilter(!boxFilter);
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleSearch = () => {
    const filters = dataInfo.filter((item) => {
      return (
        item.cid === cidList ||
        item.SiteInfoModel?.zoneModel?.zoneID === zoneList
      );
    });
    setFilterData(filters);
  };

  const handleExportToExcel = () => {
    const dataForExel = filterData.map((item, index) => ({
      No: index + 1,
      Cid: item.cid,
      SiteName: item.SiteInfoModel?.siteName,
      CreateBy: item.userInfoModel.userName,
      OnsiteBy: item.onsiteBy,
      OnsiteDate: formatDate(item.onsiteTime),
      StartTime: formatDateTime(item.workingStart),
      EndTime: formatDateTime(item.workingEnd),
      Status: item.status,
    }));
    exportToExcel(dataForExel, "maintenance_data");
  };

  const cidOptions = dataInfo
    .sort((a, b) => a.cid.localeCompare(b.cid))
    .map((item) => {
      // console.log(item);
      return {
        value: item.cid,
        label: item.cid,
      };
    });

  const ZoneOptions = dataZone.map((item) => {
    // console.log(item);
    return {
      value: item.zoneID,
      label: item.zoneName,
    };
  });

  useEffect(() => {
    fetchData();
    fetchDataZone();
  }, []);

  if (dataInfo.length === 0) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="px-2 lg:px-32 py-5">
        <h1 className="py-3 px-5 font-bold shadow-sm shadow-black rounded-md">
          Home / <span className="text-[#1A16D3]">Maintenance</span>
        </h1>
        <div className="flex justify-end py-3 px-5 gap-1 lg:hidden">
          <div
            onClick={togglePopup}
            className="flex items-center gap-2 bg-violet-600 text-violet-200 p-2 rounded-lg"
          >
            <FiFilter />
            Filter
          </div>
          <button
            onClick={handleExportToExcel}
            className="text-center bg-blue-700 text-blue-300 w-20 py-2 rounded-lg hover:bg-blue-800"
          >
            Export
          </button>
          <Link
            to="/user/customer-file-upload"
            className="text-center bg-green-600 text-green-200 w-20 py-2 rounded-lg hover:bg-green-700"
            onClick={() => localStorage.removeItem("maintenance")}
          >
            New
          </Link>
        </div>
        <div className="hidden lg:flex flex-wrap gap-3 my-3 lg:justify-between rounded-md p-3 bg-stone-300">
          <div className="flex gap-4 flex-wrap">
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
            <Select
              isSearchable
              placeholder="--Zone--"
              options={ZoneOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setZoneList(selectedOption.value);
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
          <div className="flex gap-4">
            <button
              onClick={handleExportToExcel}
              className="text-center bg-blue-700 text-blue-300 w-20 py-2 rounded-2xl hover:bg-blue-800"
            >
              Export
            </button>
            <Link
              to="/user/customer-file-upload"
              className="text-center py-2 bg-green-600 text-green-200 w-20 rounded-2xl hover:bg-green-700"
              onClick={() => localStorage.removeItem("maintenance")}
            >
              New
            </Link>
          </div>
        </div>
        <div className=" overflow-auto max-h-[500px] lg:max-h-[600px]">
          <table className="w-full">
            <thead className="border-[1px] border-black sticky top-0">
              <tr className="bg-gray-200">
                <th className="p-1 lg:p-2">No.</th>
                <th className="p-1 lg:p-2">CID</th>
                <th className="p-1 lg:p-2">Site Name</th>
                <th className="p-1 lg:p-2">Onsite By</th>
                <th className="p-1 lg:p-2">Onsite Date</th>
                <th className="p-1 lg:p-2">District</th>
                <th className="p-1 lg:p-2">Province</th>
                <th className="p-1 lg:p-2">Service Center</th>
                <th className="p-1 lg:p-2">Result</th>
                <th className="p-1 lg:p-2">Create By</th>
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
                        `/user/pdf-maintenance/${data.maintenanceInfoId}`
                      )
                    }
                    key={data.maintenanceInfoId}
                  >
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {index + 1}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.cid}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.SiteInfoModel?.siteName}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.onsiteBy}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {formatDate(data.onsiteTime)}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.SiteInfoModel?.districtModel?.districtName}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.SiteInfoModel?.provinceModel?.provinceName}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.SiteInfoModel?.zoneModel?.zoneName}
                    </td>
                    <td className="p-1 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.status}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.userInfoModel?.userName}
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
              placeholder="--CID--"
              options={cidOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setCidList(selectedOption.label);
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
              placeholder="--Zone--"
              options={ZoneOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setZoneList(selectedOption.value);
              }}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderColor: "black",
                  borderRadius: "12px",
                  width: "160px",
                }),
              }}
            />
            <div className="flex gap-1">
              <button
                className="bg-blue-500 text-blue-100 p-2.5 w-20 rounded-lg hover:bg-blue-600"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MaintenanceSummary;
