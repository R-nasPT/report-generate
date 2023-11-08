import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import packageJson from "../../package.json";
import axios from "axios";
import LoadingPage from "../component/LoadingPage";
import { GiAutoRepair } from "react-icons/gi";
import { formatDate } from "../utils/dateUtils";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
  const [siteinfo, setSiteinfo] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [empty, setEmpty] = useState(0);
  const [draft, setDraft] = useState(0);
  const [complete, setComplete] = useState(0);

  const navigate = useNavigate();

  // console.log(siteinfo);

  const data = {
    labels: ["Not Yet Processed", "Draft", "Completed"],
    datasets: [
      {
        label: "quantity",
        data: [empty, draft, complete],
        backgroundColor: ["#FF6384", "#FFCD56", "#22C55E"],
      },
    ],
  };

  const handlePieChartClick = (event, elements) => {
    // console.log(data);
    // console.log(elements);
    if (elements.length > 0) {
      const label = data.labels[elements[0].index];
      if (label === "Not Yet Processed") {
        const filterNull = siteinfo.filter(
          (item) => item.isDraft === null && item.isComplete === null
        );
        setFilterData(filterNull);
      } else if (label === "Draft") {
        const filteredDraft = siteinfo.filter(
          (item) => item.isDraft === true && item.isComplete === null
        );
        setFilterData(filteredDraft);
      } else if (label === "Completed") {
        const filteredComplete = siteinfo.filter(
          (item) => item.isComplete === true
        );
        setFilterData(filteredComplete);
      }
    }
  };

  const fetchData = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/siteinfo/`
    );

    response.data.forEach((item) => {
      // console.log(item.isDraft);
      if (item.isDraft === true && item.isComplete === null) {
        setDraft((prevDraft) => prevDraft + 1);
      } else if (item.isComplete === true) {
        setComplete((prevComplete) => prevComplete + 1);
      } else {
        setEmpty((prevEmpty) => prevEmpty + 1);
      }
    });

    setSiteinfo(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (siteinfo.length === 0) return <LoadingPage />;

  return (
    <>
      <div>
        <h1 className="ml-10 mt-5 font-bold text-xl lg:text-3xl text-blue-800 font-serif flex gap-3">
          Installation <GiAutoRepair className="w-7 h-7 lg:w-10 lg:h-10" />
        </h1>
        <div className="flex flex-col lg:flex-row px-5 lg:px-14 py-3 gap-4">
          <div className="lg:w-1/2 flex justify-center lg:max-h-[700px] p-3 lg:p-10 shadow-2xl border-[1px] border-zinc-200 rounded-xl">
            <Pie
              datasetIdKey="id"
              data={data}
              options={{
                onClick: handlePieChartClick,
              }}
            />
          </div>
          <div className="p-2 lg:p-7 shadow-2xl border-[1px] border-zinc-200 rounded-xl lg:max-h-[700px] lg:w-1/2">
            <h1 className="text-red-500 font-extrabold text-3xl font-mono">
              Information
            </h1>
            <br />
            {filterData.length === 0 ? (
              <div className="border-[1px] border-zinc-200"></div>
            ) : (
              <div className="px-7 overflow-auto max-h-[500px] lg:max-h-[550px] ">
                <table>
                  <thead className=" sticky top-0">
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
                    {filterData.map((data, index) => (
                      <tr
                        className="hover:bg-neutral-200 cursor-pointer"
                        key={data.siteInfoId}
                        onClick={() =>
                          navigate(`/user/atmpage/${data.siteInfoId}`)
                        }
                      >
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          {index + 1}
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          <div className="flex justify-center">
                            <div
                              className={`w-6 h-6 border-2  rounded-full ${
                                data?.isComplete === true
                                  ? "bg-green-500 border-green-300"
                                  : data?.isDraft === true
                                  ? "bg-yellow-300 border-yellow-100"
                                  : "bg-red-500 border-red-300"
                              }`}
                            ></div>
                          </div>
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          {data.cid}
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          {data.TicketInfoModel?.tkdt_ID}
                          {data.TicketInfoLTEModel?.tkdt_ID}
                          {data.TicketInfoKTBModel?.tkdt_ID}
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          New Installation
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          {formatDate(data.TicketInfoModel?.tkdt_NTATime)}
                          {formatDate(data.TicketInfoLTEModel?.tkdt_NTATime)}
                          {formatDate(data.TicketInfoKTBModel?.tkdt_NTATime)}
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          {formatDate(data.routerInfoModel.installationDate)}
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
                          {data.provinceModel?.provinceName}
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          {data.districtModel?.districtName}
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          {data.subDistrict}
                        </td>
                        <td className="p-1 lg:p-2 border-2 border-r-neutral-300 border-y-white text-center">
                          {data.contractName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
