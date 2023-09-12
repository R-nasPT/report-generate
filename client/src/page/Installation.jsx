/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadingPage from "../component/LoadingPage";
import { FiFilter } from "react-icons/fi";
import packageJson from "../../package.json";

function Installation() {
  const [siteinfo, setSiteinfo] = useState([]);
  const [customer, setCustomer] = useState([]);

  const [customerList, setCustomerList] = useState("");
  const [group, setGroup] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [boxFilter, setBoxFilter] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/siteinfo/`
    );
    setSiteinfo(response.data);
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

  const customerOptions = customer
    .sort((a, b) => a.shortName.localeCompare(b.shortName))
    .map((item) => ({
      value: item.customerId,
      label: item.shortName,
    }));

  const handleSearch = () => {
    const filters = siteinfo.filter((item) => {
      // console.log(item.customerModel);
      return item.customerModel.shortName.includes(customerList); //&&
      // item.customerModel.cusGroupType === group
    });
    if (group === "") {
      setFilterData(filters);
    } else {
      const filterGroup = filters.filter(
        (item) => item.customerModel.cusGroupType === group
      );
      setFilterData(filterGroup);
    }
  };

  useEffect(() => {
    if (group === "") {
      setFilterData(siteinfo);
    } else {
      const filters = siteinfo.filter(
        (item) => item.customerModel.cusGroupType === group
      );
      const filterDetail = filters.filter((item) => {
        return item.customerModel.shortName.includes(customerList);
      });
      setFilterData(filterDetail);
    }
  }, [siteinfo, group]);

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
    fetchCustomer();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [siteinfo]);

  if (siteinfo.length === 0) return <LoadingPage />;
  // console.log(customerOptions);

  return (
    <>
      <div className="px-2 lg:px-32 py-5">
        <h1 className="py-3 px-5 font-bold shadow-sm shadow-black rounded-md">
          Home / Installation{" "}
          <span className="text-[#1A16D3]">/ New Install </span>
        </h1>
        <div className="flex justify-end pt-4 px-5 lg:hidden">
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
              placeholder="--Customer--"
              options={customerOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setCustomerList(selectedOption.label);
              }}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: "black",
                  borderRadius: "12px",
                  width: "160px",
                }),
              }}
            />
            <input
              type="date"
              className="border-[1px] border-black rounded-xl px-3"
            />
            <input
              type="date"
              className="border-[1px] border-black rounded-xl px-3"
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
          <button className="bg-green-600 text-green-200 w-20 rounded-2xl hover:bg-green-700">
            Export
          </button>
        </div>
        <div className="flex font-bold">
          <button
            className={`border-2 w-20 h-10 text-center bg-stone-300 rounded-t-xl ${
              group === "" ? "bg-white" : "border-black"
            }`}
            onClick={() => setGroup("")}
          >
            ทั้งหมด
          </button>
          <button
            className={`border-2 w-20 h-10 text-center bg-stone-300 rounded-t-xl ${
              group === 1 ? "bg-white" : "border-black"
            }`}
            onClick={() => setGroup(1)}
          >
            ATM
          </button>
          <button
            className={`border-2 w-20 h-10 text-center bg-stone-300 rounded-t-xl ${
              group === 2 ? "bg-white" : "border-black"
            }`}
            onClick={() => setGroup(2)}
          >
            LTE
          </button>
        </div>
        <div className=" overflow-auto max-h-[500px] lg:max-h-[600px]">
          <table className="lg:w-[1290px]">
            <thead className="border-[1px] border-black sticky top-0">
              <tr className="bg-gray-200">
                <th className="p-1 lg:p-2">No.</th>
                <th className="p-1 lg:p-2">Status</th>
                <th className="p-1 lg:p-2">CID</th>
                <th className="p-1 lg:p-2">Ticket</th>
                <th className="p-1 lg:p-2">Problem</th>
                <th className="p-1 lg:p-2">Plan</th>
                <th className="p-1 lg:p-2">Install Date</th>
                <th className="p-1 lg:p-2">Sitename</th>
                <th className="p-1 lg:p-2">LocationDetail</th>
                <th className="p-1 lg:p-2">Address</th>
                <th className="p-1 lg:p-2">Province</th>
                <th className="p-1 lg:p-2">District</th>
                <th className="p-1 lg:p-2">Subdistrict</th>
                <th className="p-1 lg:p-2">Contact</th>
              </tr>
            </thead>
            <tbody className="border-[1px] border-black">
              {filterData.map((data, index) => {
                // console.log(data.TicketInfoModel);
                return (
                  <tr
                    className="hover:bg-neutral-200 cursor-pointer"
                    onClick={() => navigate(`/user/atmpage/${data.siteInfoId}`)}
                    key={data.siteInfoId}
                  >
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {index + 1}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.status}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.cid}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.TicketInfoModel?.tkdt_ID}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      Lorem ipsum dolor sit amet.
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      25/4/2038
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.routerInfoModel.installationDate}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.siteName}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.locationDetails}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.address}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.province}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.district}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.subDistrict}
                    </td>
                    <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                      {data.contractName}
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
              placeholder="--Customer--"
              options={customerOptions}
              onChange={(selectedOption) => {
                // console.log(selectedOption);
                setCustomerList(selectedOption.label);
              }}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: "black",
                  borderRadius: "12px",
                }),
              }}
            />
            <p>start :</p>
            <input
              type="date"
              className="border-[1px] border-black rounded-xl h-9 px-3"
            />
            <p>End :</p>
            <input
              type="date"
              className="border-[1px] border-black rounded-xl h-9 px-3"
            />
            <div className="flex gap-1">
              <button
                className="bg-blue-500 text-blue-100 w-20 rounded-lg hover:bg-blue-600"
                onClick={handleSearch}
              >
                Search
              </button>
              <button className="bg-neutral-500 text-neutral-100 w-20 rounded-lg hover:bg-neutral-600">
                Reset
              </button>
              <button className="bg-green-600 text-green-200 w-20 py-1 rounded-lg hover:bg-green-700">
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Installation;
