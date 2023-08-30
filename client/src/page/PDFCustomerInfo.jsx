import React from "react";
import { Link } from "react-router-dom";
import html2pdf from "html2pdf.js";

function PDFCustomerInfo() {
  const downloadPDF = async () => {
    const element = document.getElementById("element-to-print");
    const opt = {
      margin: 1,
      filename: ``,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
    };

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return (
    <div>
      <div className="py-8 px-96 bg-slate-300 ">
        <div className="flex gap-3 mb-2">
          <Link /*to={`/user/detailpage/${id}`}*/>
            <img
              src="/component/back.png"
              alt="pdf"
              className="w-9 h-9 p-2 bg-red-600 hover:bg-red-500 rounded-md"
            />
          </Link>
          <Link to="/user/mock">
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
          className="py-6 px-8 bg-white font-thai-sarabun"
        >
          <section className="h-[1040px]">
            <div className="flex flex-col items-center">
              <table className="text-sm border-[2px] border-black m-3 w-[670px]">
                <thead className="text-center w-full">
                  <tr>
                    <th colSpan="2" className="pb-3">
                      Customer Information
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3 w-32">
                      Customer
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Site Name
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3 ">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Station ID
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      CID
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Install Date
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Install By
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Address
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Contact Person
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Tel.
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Environment
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      ATM Type
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      ATM Model
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Remark
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words"></p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-semibold">Picture</h2>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="border-[1px] border-black w-52 h-60"></div>
                <div className="border-[1px] border-black w-52 h-60"></div>
                <div className="border-[1px] border-black w-52 h-60"></div>
                <div className="border-[1px] border-black w-52 h-60"></div>
                <div className="border-[1px] border-black w-52 h-60"></div>
                <div className="border-[1px] border-black w-52 h-60"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PDFCustomerInfo;
