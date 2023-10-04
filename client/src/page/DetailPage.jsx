/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import LinePopup from "../component/LinePopop";
import MailPopup from "../component/MailPopup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../component/LoadingPage";
import packageJson from "../../package.json";
import { useAuthContext } from "../context/AuthContext";

function DetailPage() {
  const [ticketDetail, setTicketDetail] = useState([]);
  const [indexPic, setIndexPic] = useState();
  const [fileName, setFileName] = useState([]);
  const [installation, setInstallation] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { formatDate } = useAuthContext();

  const navigate = useNavigate();
  const { id } = useParams();
  const imgPath = "/component/No_Image_Available.jpg";

  //--status installation--
  useEffect(() => {
    const getStatusTicket = async () => {
      try {
        const result = await axios.get(
          `${packageJson.domain.ipbackend}/status`
        );
        setInstallation(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatusTicket();
  }, []);

  //---get all---
  useEffect(() => {
    const getDetailPage = async () => {
      try {
        const result = await axios.get(
          `${packageJson.domain.ipbackend}/ticket/${id}`
        );
        const updatedFileName = result.data.config.pictures.map(
          (data, index) => ({
            id: index,
            name: data.name,
            file: imgPath,
            state: 0,
          })
        );

        setFileName(updatedFileName);

        setTicketDetail(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDetailPage();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`${packageJson.domain.ipbackend}/ticket/${id}`, {
        ticket_bank: ticketDetail.ticket_bank,
        plug_atm: ticketDetail.plug_atm,
        plug_router: ticketDetail.plug_router,
        ups_bank: ticketDetail.ups_bank,
        point_router: ticketDetail.point_router,
        remark: ticketDetail.remark,
      });
      console.log("Ticket bank updated successfully");
      setShowPopup(true);
      setSaveSuccess(true);

      setTimeout(() => {
        setShowPopup(false);
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async (e, index) => {
    try {
      if (e.target.files[0]) {
        // console.log(e.target.files[0].name);
        // console.log("index", index);
        const formData = new FormData();
        formData.append("userProfile", e.target.files[0]);
        formData.append("ticket_generate_id", ticketDetail.ticket_generate_id);
        formData.append(
          "configuration_info_id",
          ticketDetail.config.configuration_info_id
        );
        formData.append("ticketId", ticketDetail.ticket_id);
        formData.append("customerShotName", ticketDetail.Customer.initials);
        formData.append("nameEng", ticketDetail.config.pictures[index].name_en);
        formData.append(
          "file_info_id",
          ticketDetail.config.pictures[index].file_info_id
        );
        axios.post(
          `${packageJson.domain.ipbackend}/ticket/updateimageticket`,
          formData,
          {
            headers: { "content-type": "multipart/form-data" },
          }
        );
        console.log("Image uploaded successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setPicture = (e) => {
    if (e.target.files[0]) {
      setFileName((prevNumbers) =>
        prevNumbers.map((number) => {
          if (number.id === indexPic) {
            number.file = URL.createObjectURL(e.target.files[0]);
            number.state = 1;
          }
          return number;
        })
      );
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const getToPDF = (id) => {
    navigate(`/user/pdf/${id}`);
  };

  if (ticketDetail.length === 0) return <LoadingPage />;
  else {
    return (
      <>
        <div className="p-11 bg-slate-200">
          <div className="flex justify-between">
            <Link
              to="/user/onsite"
              className=" bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl text-white"
            >
              Back
            </Link>
            <div className="flex gap-3">
              <img
                src="/user/pdf.svg"
                alt="pdf"
                className="cursor-pointer transition duration-300 hover:translate-y-[-5px]"
                onClick={() => getToPDF(ticketDetail.ticket_generate_id)}
              />
              <MailPopup />
              <LinePopup />
            </div>
          </div>
          <div className="bg-white p-10 rounded-2xl mt-5">
            <h1 className=" text-2xl font-semibold">
              {ticketDetail.config?.doc_name}
            </h1>
            <div className="flex p-5 gap-10 items-center">
              <p className=" font-semibold">
                Ticket order :{" "}
                <span className="text-[#646D89] font-normal">
                  {ticketDetail.ticket_order}
                </span>
              </p>
              <p className=" font-semibold flex gap-3 items-center relative">
                Ticket Bank : {""}
                <input
                  type="text"
                  className="border-[1px] border-black rounded-lg px-3 py-1 font-normal"
                  value={ticketDetail.ticket_bank}
                  onChange={(e) =>
                    setTicketDetail({
                      ...ticketDetail,
                      ticket_bank: e.target.value,
                    })
                  }
                ></input>
                {saveSuccess && (
                  <p className="absolute -bottom-5 text-xs left-40 text-red-600 italic">
                    --บันทึกสำเร็จ--
                  </p>
                )}
              </p>
              <p className=" font-semibold">
                Onsite Date :{" "}
                <span className="text-[#646D89] font-normal">
                  {formatDate(ticketDetail.onsite_date)}
                </span>
              </p>
            </div>
            <h1 className=" text-2xl font-semibold py-5">Information</h1>
            <div className=" grid grid-cols-2 p-5 gap-3">
              <p className=" font-semibold">
                Customer name :{" "}
                <span className="text-[#646D89] font-normal">
                  {ticketDetail.customer_name}
                </span>
              </p>
              <p className=" font-semibold">
                Site Name :{" "}
                <span className="text-[#646D89] font-normal">
                  {" "}
                  {ticketDetail.site_name}
                </span>
              </p>
              <p className=" font-semibold">
                Station ID :{" "}
                <span className="text-[#646D89] font-normal">
                  {" "}
                  {ticketDetail.stationId}
                </span>
              </p>
              <p className=" font-semibold">
                Circuit :{" "}
                <span className="text-[#646D89] font-normal">
                  {ticketDetail.circuitId}
                </span>
              </p>
              <p className=" font-semibold">
                Problem :{" "}
                <span className="text-[#646D89] font-normal">
                  {" "}
                  {ticketDetail.problem}
                </span>
              </p>
              <p className=" font-semibold">
                ATM Type :{" "}
                <span className="text-[#646D89] font-normal">
                  {ticketDetail.atm_type}
                </span>
              </p>
              <p className=" font-semibold">
                PPOT Staff :{" "}
                <span className="text-[#646D89] font-normal">
                  {ticketDetail.ppot_staff}
                </span>
              </p>
              <p className=" font-semibold">
                Position :{" "}
                <span className="text-[#646D89] font-normal">
                  {ticketDetail.position}
                </span>
              </p>
            </div>
            <h1 className=" text-2xl font-medium py-5">
              สภาพจุดติดตั้งตู้ ATM
            </h1>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label>ปลั๊ก ATM : </label>
                <select
                  name="ATM plug"
                  className="border-[1px] border-black rounded-lg px-3 py-1 text-center"
                  value={ticketDetail.plug_atm}
                  onChange={(e) =>
                    setTicketDetail({
                      ...ticketDetail,
                      plug_atm: e.target.value,
                    })
                  }
                >
                  <option value="">--Select--</option>
                  {installation.plugAtm?.map((item) => (
                    <option key={item.plug_atm_id} value={item.plug_atm_name}>
                      {item.plug_atm_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="">ปลั๊ก Router : </label>
                <select
                  name="Router plug"
                  className="border-[1px] border-black rounded-lg px-3 py-1 text-center"
                  value={ticketDetail.plug_router}
                  onChange={(e) =>
                    setTicketDetail({
                      ...ticketDetail,
                      plug_router: e.target.value,
                    })
                  }
                >
                  <option value="">--Select--</option>
                  {installation.plugRouter?.map((item) => (
                    <option
                      key={item.plug_router_id}
                      value={item.plug_router_name}
                    >
                      {item.plug_router_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>UPS Bank : </label>
                <select
                  name="UPS Bank"
                  className="border-[1px] border-black rounded-lg px-3 py-1 text-center"
                  value={ticketDetail.ups_bank}
                  onChange={(e) =>
                    setTicketDetail({
                      ...ticketDetail,
                      ups_bank: e.target.value,
                    })
                  }
                >
                  <option value="">--Select--</option>
                  {installation.upsBank?.map((item) => (
                    <option key={item.ups_id} value={item.ups_name}>
                      {item.ups_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>จุดวาง Route : </label>
                <select
                  name="route point"
                  className="border-[1px] border-black rounded-lg px-3 py-1 text-center"
                  value={ticketDetail.point_router}
                  onChange={(e) =>
                    setTicketDetail({
                      ...ticketDetail,
                      point_router: e.target.value,
                    })
                  }
                >
                  <option value="">--- Select ---</option>
                  {installation.pointRouter?.map((item) => (
                    <option
                      key={item.point_router_id}
                      value={item.point_router_name}
                    >
                      {item.point_router_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Remark : </label>
                <input
                  type="text"
                  className="border-[1px] border-black rounded-lg px-3 py-1 "
                  value={ticketDetail.remark}
                  onChange={(e) =>
                    setTicketDetail({ ...ticketDetail, remark: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end px-20 pt-5">
              <button
                className=" bg-sky-600 hover:bg-sky-700 px-5 py-3 rounded-xl text-white"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
            <hr className="border-t-2 border-black my-5" />
            <h1 className=" text-2xl font-semibold py-5">Picture</h1>
            <div className="pl-5 grid grid-cols-2">
              {ticketDetail.config.pictures.map((picture, index) => (
                <div key={index} className="flex gap-5 items-center py-5">
                  <p>{picture.name} : </p>
                  {fileName.find((e) => {
                    // console.log(e.id, index);
                    return e.id === index && e.state === 1;
                  }) ? (
                    <div>
                      <img
                        key={index}
                        src={fileName[index].file}
                        alt="Uploaded Image"
                      />
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor="file-input"
                        className="text-white text-2xl text-center bg-green-500 w-8 rounded-lg hover:bg-green-600 cursor-pointer"
                        onClick={() => {
                          setIndexPic(index);
                        }}
                      >
                        +
                      </label>
                      {ticketDetail.pictures.some((having) => {
                        return having.file_info_id === picture.file_info_id;
                      }) ? (
                        <p className="bg-green-500 p-2 border-2 border-green-300 rounded-full"></p>
                      ) : (
                        !ticketDetail.pictures.some((having) => {
                          return having.file_info_id === picture.file_info_id;
                        }) && (
                          <p className="bg-red-500 p-2 border-2 border-red-300 rounded-full"></p>
                        )
                      )}
                    </>
                  )}
                  <input
                    type="file"
                    id="file-input"
                    className="hidden"
                    onChange={(e) => {
                      handleUpload(e, indexPic);
                      setPicture(e);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {showPopup && (
          <div
            className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"
            onClick={handleClosePopup}
          >
            <div className=" bg-white rounded-3xl relative">
              <img
                className=" w-3 h-3 absolute right-4 top-3 cursor-pointer "
                onClick={handleClosePopup}
                src="/user/close-line-icon.svg"
                alt="save"
              />
              <div className="flex flex-col gap-5 items-center font-bold text-2xl p-14">
                <img src="/component/success-icon.svg" alt="message" />
                <h1 className="text-[#049D2F]">Save successful!</h1>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </>
    );
  }
}

export default DetailPage;
