import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "../component/LoadingPage";
import packageJson from "../../package.json";

const DataView = () => {
  const [configDetail, setConfigDetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getConfigInfo = async () => {
      try {
        const result = await axios.get(
          `${packageJson.domain.ipbackend}/config/${id}`
        );
        setConfigDetail(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConfigInfo();
  }, [id]);

  if (configDetail.length === 0) return <LoadingPage />;

  const formatDate = (dateString) => {
    const createDate = new Date(dateString);
    const formattedDate = `${createDate.getDate()}/
    ${createDate.getMonth() + 1}/
    ${createDate.getFullYear()}, 
    ${("0" + createDate.getHours()).slice(-2)}:
    ${("0" + createDate.getMinutes()).slice(-2)}`;
    return formattedDate;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-2 bg-slate-200 py-10 px-60">
        <div className="flex pl-3">
          <Link
            to="/admin/template"
            className=" bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
          >
            Back
          </Link>
        </div>
        <div className="bg-white rounded-xl py-10 px-20 flex flex-col gap-5">
          <div>
            <h1 className="font-bold text-2xl pb-2">Operation</h1>
            <p className="flex pl-5 text-lg text-gray-500 font-medium">
              {configDetail.op.operation_name}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-2xl pb-2">Customer</h1>
            <p className="flex pl-5 text-lg text-gray-500 font-medium">
              {configDetail?.Customer?.full_name_thai}
            </p>
          </div>
          <div>
            <h1 className="font-bold text-2xl pb-2">Report Name</h1>
            <p className="flex pl-5 text-lg text-gray-500 font-medium">
              {configDetail.doc_name}
            </p>
          </div>
          <div className="flex gap-20">
            <div>
              <h1 className="font-bold text-2xl pb-3">GetInfo</h1>
              <div className="flex flex-col pl-5 gap-1 font-medium">
                <div>
                  <p>
                    ontime :{" "}
                    <span className="font-normal text-gray-600">
                      {configDetail.getdata_start_date
                        ? formatDate(configDetail.getdata_start_date)
                        : null}{" "}
                      -{" "}
                      {configDetail.getdata_end_date
                        ? formatDate(configDetail.getdata_end_date)
                        : null}
                    </span>
                  </p>
                </div>
                <p>
                  Daily :{" "}
                  <span className="font-normal text-gray-600">
                    {configDetail.getdata_start_time} -{" "}
                    {configDetail.getdata_end_time}
                  </span>
                </p>
                <p>
                  Monthly :{" "}
                  <span className="font-normal text-gray-600">
                    {configDetail.getdata_month
                      ? `Month ${configDetail.getdata_month} Day ${configDetail.getdata_month_date}`
                      : null}
                  </span>
                </p>
                <p>
                  RealTime :{" "}
                  <span className="font-normal text-gray-600">
                    {configDetail.getdata_type === 4 ? "YES" : "NO"}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-2xl pb-3">Generate</h1>
              <div className="flex flex-col pl-5 gap-1 font-medium">
                <p>
                  ontime :{" "}
                  <span className="font-normal text-gray-600">
                    {configDetail.generate_date
                      ? formatDate(configDetail.generate_date)
                      : null}
                  </span>
                </p>
                <p>
                  Daily :{" "}
                  <span className="font-normal text-gray-600">
                    {configDetail.generate_next_date}
                  </span>
                </p>
                <p>
                  Monthly :{" "}
                  <span className="font-normal text-gray-600">
                    {configDetail.generate_month
                      ? `Month ${configDetail.generate_month} Day ${configDetail.generate_month_date}`
                      : null}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-2xl pb-3">Mail</h1>
            <p className="flex pl-5">.......(next time)</p>
          </div>
          <div>
            <h1 className="font-bold text-2xl pb-3">Line</h1>
            <p className="flex pl-5">.......(next time)</p>
          </div>
          <div>
            <h1 className="font-bold text-2xl pb-3">Picture</h1>
            <div className="grid grid-cols-2 gap-2 pl-5 font-medium">
              {configDetail?.pictures.map((item) => (
                <div key={item.file_info_id}>
                  <p>
                    name :{" "}
                    <span className="font-normal text-gray-500">
                      {item?.name}
                    </span>
                  </p>
                  <p>
                    nameEng :{" "}
                    <span className="font-normal text-gray-500">
                      {item?.name_en}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DataView;
