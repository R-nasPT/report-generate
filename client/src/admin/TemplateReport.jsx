import { useEffect, useState } from "react";
import DeletePopup from "../component/DeletePopup";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import packageJson from "../../package.json";

function TemplateReport() {
  const [configTemplate, setConfigTemplate] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getconfigInfo = async () => {
      try {
        const result = await axios.get(`${packageJson.domain.ipbackend}/config/template`);
        setConfigTemplate(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getconfigInfo();
  }, []);

  const viewConfig = (id) => {
    navigate(`/admin/view/${id}`);
  };

  // const editConfig = (id) => {
  //   navigate(`/admin/config/${id}`);
  // };

  const deleteConfig = async (id) => {
    try {
      await axios.patch(`${packageJson.domain.ipbackend}/config/${id}`);
      const updatedConfigTemplate = configTemplate.filter(
        (item) => item.configuration_info_id !== id
      );
      setConfigTemplate(updatedConfigTemplate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`flex flex-col items-center mb-10 ${
          configTemplate.length < 6 ? "h-screen" : ""
        }`}
      >
        <div className="flex justify-between items-center w-[1200px] p-5">
          <h1 className=" text-2xl font-bold text-[#0D0DA4]">
            Create Template Report
          </h1>
          <Link
            to="/admin/config"
            className=" bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            NEW
          </Link>
        </div>
        {configTemplate.length === 0 ? (
          <div className=" h-full flex items-center">
            <h1 className="font-medium text-2xl text-red-600">
              No data was generated.
            </h1>
          </div>
        ) : (
          <table className="w-[1290px] border-collapse mx-auto">
            <thead>
              <tr className="h-[60px] bg-[#58A2E7] text-center text-white">
                <td className="w-[calc(100%/8)]">ID</td>
                <td className="w-[calc(100%/8)]">Operation</td>
                <td className="w-[calc(100%/8)]">Report Name</td>
                <td className="w-[calc(100%/8)]">Customer</td>
                <td className="w-[calc(100%/8)]">Mail</td>
                <td className="w-[calc(100%/8)]">Line</td>
                <td className="w-[calc(100%/8)]">.....</td>
                <td className="w-[calc(100%/8)]"></td>
              </tr>
            </thead>
            <tbody>
              {configTemplate.map((item, index) => (
                <tr
                  key={index}
                  className=" h-[106px] border-[1px] border-[#D6D9E4] text-center"
                >
                  <td>{item.configuration_info_id}</td>
                  <td>{item.op.operation_name}</td>
                  <td>{item.doc_name}</td>
                  <td>{item.Customer?.initials}</td>
                  <td>....</td>
                  <td></td>
                  <td></td>
                  <td className="flex gap-3 items-center h-[106px]">
                    {/* <img
                    src="admin/pencil-square.svg"
                    alt="edit"
                    className="bg-sky-600 hover:bg-sky-700 cursor-pointer p-3 rounded-lg"
                    onClick={() => editConfig(item.configuration_info_id)}
                  /> */}
                    <img
                      src="/admin/view.svg"
                      alt="edit"
                      className="bg-gray-400 hover:bg-gray-500 cursor-pointer p-[10px] rounded-lg shadow-md"
                      onClick={() => viewConfig(item.configuration_info_id)}
                    />
                    <DeletePopup
                      onDelete={() => deleteConfig(item.configuration_info_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
}

export default TemplateReport;
