import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../component/LoadingPage";
import HeaderPDF from "../component/HeaderPDF";
import FooterPDF from "../component/FooterPDF";
import packageJson from "../../package.json";

function PDFFile() {
  const [ticketDetail, setTicketDetail] = useState([]);
  const [image, setImage] = useState([]);

  const { id } = useParams();
  // console.log(ticketDetail.length);
  if (ticketDetail.length === undefined) {
    // console.log(ticketDetail?.pictures[0].ticketDetail.file_name);
    // console.log(ticketDetail.pictures.map((item) => (item.ticketDetail.file_name)));
  }

  //---get all---
  useEffect(() => {
    const getDetailPage = async () => {
      try {
        const result = await axios.get(`${packageJson.domain.ipbackend}/ticket/${id}`);

        let image = [];
        let subArray = [];

        result.data.pictures.forEach((obj, index) => {
          subArray.push(obj);
          if (
            (index + 1) % 4 === 0 ||
            index === result.data.pictures.length - 1
          ) {
            image.push(subArray);
            subArray = [];
          }
        });
        setImage(image);
        setTicketDetail(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDetailPage();
  }, [id]);

  const downloadPDF = async () => {
    const element = document.getElementById("element-to-print");

    const opt = {
      margin: 1,
      filename: `ID_${ticketDetail.ticket_generate_id} ${ticketDetail.config?.doc_name} ${ticketDetail.circuitId}`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      pagebreak: { mode: "avoid-all", before: ".image-page-break" },
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

  if (ticketDetail.length === 0) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className="py-8 px-96 bg-slate-300 ">
        <div className="flex gap-3 mb-2">
          <Link to={`/user/detailpage/${id}`}>
            <img
              src="/component/back.png"
              alt="pdf"
              className="w-9 h-9 p-2 bg-red-600 hover:bg-red-500 rounded-md"
            />
          </Link>
          <Link to="/user/onsite">
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
          <HeaderPDF ticketDetail={ticketDetail} />
          <section className="h-[865px]">
            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-3 text-sm bg-slate-300 border-[3px] border-slate-600 rounded-3xl px-5 pt-5 pb-10 my-5 w-full">
                <p className="font-medium underline">Information : </p>
                <div className="grid grid-cols-2 gap-1 px-7">
                  <p className="font-medium">
                    Customer Name :{" "}
                    <span className="text-red-500 font-normal">
                      {ticketDetail.customer_name}
                    </span>
                  </p>
                  <p className="font-medium">
                    Site Name :{" "}
                    <span className="text-red-500 font-normal">
                      {ticketDetail.site_name}
                    </span>
                  </p>
                  <p className="font-medium">
                    Station ID :{" "}
                    <span className="text-red-500 font-normal">
                      {ticketDetail.stationId}
                    </span>
                  </p>
                  <p className="font-medium">
                    Circuit ID :{" "}
                    <span className="text-red-500 font-normal">
                      {ticketDetail.circuitId}
                    </span>
                  </p>
                  <p className="font-medium">
                    Problem :{" "}
                    <span className="text-red-500 font-normal">
                      {ticketDetail.problem}
                    </span>
                  </p>
                  <p className="font-medium">
                    ATM Type :{" "}
                    <span className="text-red-500 font-normal">
                      {ticketDetail.atm_type}
                    </span>
                  </p>
                  <p className="font-medium">
                    PPOT Staff :{" "}
                    <span className="text-red-500 font-normal">
                      {ticketDetail.ppot_staff}
                    </span>
                  </p>
                  <p className="font-medium">
                    Position :{" "}
                    <span className="text-red-500 font-normal">
                      {ticketDetail.position}
                    </span>
                  </p>
                </div>
              </div>
              <table className="text-sm border-[2px] border-black m-3 ">
                <thead className="text-center bg-amber-200 w-full">
                  <tr>
                    <th colSpan="2" className="pb-3">
                      สภาพจุดติดตั้งตู้ ATM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3 ">
                      ปลั๊ก ATM
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3 w-10/12">
                      <p className="w-96 break-words">
                        {ticketDetail.plug_atm}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      ปลั๊ก Router
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3 ">
                      <p className="w-96 break-words">
                        {ticketDetail.plug_router}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      UPS Bank
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">
                        {ticketDetail.ups_bank}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      จุดวาง Router
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">
                        {ticketDetail.point_router}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className=" border-[2px] border-black pb-3 px-3">
                      Remark
                    </td>
                    <td className=" border-[2px] border-black pb-3 pl-3">
                      <p className="w-96 break-words">{ticketDetail.remark}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <FooterPDF />

          {image.map((item, index) => (
            <div key={index} className={`image-page-break mb-3 pt-10`}>
              <HeaderPDF ticketDetail={ticketDetail} />
              <div className="h-[840px] grid grid-cols-2">
                {item.map((img, imgIndex) => (
                  <div key={imgIndex} className="mx-auto">
                    <img
                      src={`${packageJson.domain.ipftp}/api/v1/ticket/Ticket/${ticketDetail.Customer.initials}/${ticketDetail.ticket_id}/${img.name_en}/${img.ticketDetail.file_name}`}
                      alt="img"
                      className="h-[300px] w-[300px] rounded-md mt-10"
                    />
                    <p>{img.name}</p>
                  </div>
                ))}
              </div>
              <FooterPDF />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PDFFile;
