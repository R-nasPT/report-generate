/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import packageJson from "../../package.json";
import Select from "react-select";

function ConfigPage() {
  const [operation, setOperation] = useState([]);
  const [customer, setCustomer] = useState([]);
  const creator = localStorage.getItem("id");
  const [disableFields, setDisableFields] = useState(false);

  // console.log(creator);

  const [selectedOperationId, setSelectedOperationId] = useState();
  const [selectCustomerId, setSelectCustomerId] = useState();
  const [reportName, setReportName] = useState("");
  const [reportNameEng, setReportNameEng] = useState("");
  const [getDataType, setGetDataType] = useState("");
  const [getDataStartDate, setGetDataStartDate] = useState({
    date: null,
    time: null,
  });
  const [getDataEndDate, setGetDataEndDate] = useState({
    date: null,
    time: null,
  });
  const [getDataStartTime, setGetDataStartTime] = useState("");
  const [getDataEndTime, setGetDataEndTime] = useState("");
  const [getDataMonth, setGetDataMonth] = useState("");
  const [getDataMonthDate, setGetDataMonthDate] = useState("");
  const [generateType, setGenerateType] = useState("");
  const [generateDate, setGenerateDate] = useState({ date: null, time: null });
  const [generateNextDate, setGenerateNextDate] = useState("");
  const [generateMonth, setGenerateMonth] = useState("");
  const [generateMonthDate, setGenerateMonthDate] = useState("");

  const navigate = useNavigate();

  //-----add name picture ---------
  const [pictureName, setPictureName] = useState([]);
  const [inputName, setInputName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  //-----name Eng---------
  const [pictureNameEng, setPictureNameEng] = useState([]);
  const [inputNameEng, setInputNameEng] = useState("");
  const [editIndexEng, setEditIndexEng] = useState(null);
  const [editNameEng, setEditNameEng] = useState("");

  //--thai--
  const handleInputChange = (event) => {
    setInputName(event.target.value);
    setEditName(event.target.value);
  };

  const handleAddButton = () => {
    if (inputName !== "") {
      if (editIndex !== null) {
        // Edit mode
        const updatedInputs = [...pictureName];
        updatedInputs[editIndex] = editName;
        setPictureName(updatedInputs);
        setEditIndex(null);
        setEditName("");
      } else {
        // Add mode
        setPictureName([...pictureName, inputName]);
      }
      setInputName("");
    }
  };

  const handleDelete = (index) => {
    const updatedInputs = [...pictureName];
    updatedInputs.splice(index, 1);
    setPictureName(updatedInputs);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditName(pictureName[index]);
    setInputName(pictureName[index]);
  };
  //--- Eng ---
  const handleInputChangeEng = (event) => {
    setInputNameEng(event.target.value);
    setEditNameEng(event.target.value);
  };

  const handleAddButtonEng = () => {
    if (inputNameEng !== "") {
      if (editIndexEng !== null) {
        // Edit mode
        const updatedInputs = [...pictureNameEng];
        updatedInputs[editIndexEng] = editNameEng;
        setPictureNameEng(updatedInputs);
        setEditIndexEng(null);
        setEditNameEng("");
      } else {
        // Add mode
        setPictureNameEng([...pictureNameEng, inputNameEng]);
      }
      setInputNameEng("");
    }
  };

  const handleDeleteEng = (index) => {
    const updatedInputs = [...pictureNameEng];
    updatedInputs.splice(index, 1);
    setPictureNameEng(updatedInputs);
  };

  const handleEditEng = (index) => {
    setEditIndexEng(index);
    setEditNameEng(pictureNameEng[index]);
    setInputNameEng(pictureNameEng[index]);
  };

  //------insert to database--------------
  const handleSaveConfig = async (event) => {
    event.preventDefault();
    try {
      if (
        selectedOperationId &&
        selectCustomerId &&
        reportName &&
        getDataType &&
        generateType
      ) {
        if (
          ((getDataStartDate.date &&
            getDataStartDate.time &&
            getDataEndDate.date &&
            getDataEndDate.time) ||
            (getDataStartTime && getDataEndTime) ||
            (getDataMonth && getDataMonthDate) ||
            getDataType === "4") &&
          ((generateDate.date && generateDate.time) ||
            generateNextDate ||
            (generateMonth && generateMonthDate) ||
            generateType === "4")
        ) {
          if (pictureName.length === pictureNameEng.length) {
            await axios.post(`${packageJson.domain.ipbackend}/config`, {
              operation_id: selectedOperationId,
              customer_id: selectCustomerId,
              doc_name: reportName,
              doc_name_eng: reportNameEng,
              getdata_type: getDataType,
              getdata_start_date: getDataStartDate.date
                ? `${getDataStartDate.date}  ${getDataStartDate.time}`
                : null,
              getdata_end_date: getDataEndDate.date
                ? `${getDataEndDate.date}  ${getDataEndDate.time}`
                : null,
              getdata_start_time: getDataStartTime,
              getdata_end_time: getDataEndTime,
              getdata_month: getDataMonth,
              getdata_month_date: getDataMonthDate,
              generate_type: generateType,
              generate_date: generateDate.date
                ? `${generateDate.date}  ${generateDate.time}`
                : null,
              generate_next_date: generateNextDate,
              generate_month: generateMonth,
              generate_month_date: generateMonthDate,
              create_by: creator,
              visible: true,
              fileinfo: [
                pictureName.map((name) => ({ name: name })),
                pictureNameEng.map((name_en) => ({ name_en: name_en })),
              ],
            });

            console.log("Configuration saved successfully");
            navigate("/admin/template");
          } else if (pictureName.length >= pictureNameEng.length) {
            alert("กรุณากรอกชื่อภาษาอังกฤษด้วย");
          } else {
            alert("กรุณากรอกชื่อไทยด้วย");
          }
        } else {
          alert(
            "คุณยังไมกำหนดข้อมูลที่จะออกรายงาน(GetInfo) หรือ ระยะเวลาที่จะออกรายงาน(Generate)"
          );
        }
      } else {
        alert(
          "คุณยังไม่กำหนด Operation หรือ Customer หรือ Report Name หรือ ประเภท"
        );
      }
    } catch (error) {
      console.log("Error saving configuration:", error);
    }
  };

  //---operator---
  useEffect(() => {
    const getOperator = async () => {
      try {
        const result = await axios.get(
          `${packageJson.domain.ipbackend}/config/operation`
        );
        setOperation(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOperator();
  }, []);
  //---customer---
  const getCustomer = async () => {
    try {
      const result = await axios.get(
        `${packageJson.domain.ipbackend}/config/customers`
      );
      setCustomer(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCustomer();
  }, []);

  const customerOptions = customer
    .sort((a, b) => a.initials.localeCompare(b.initials))
    .map((item) => ({
      value: item.customer_id,
      label: item.initials,
    }));

  return (
    <>
      <div className="p-20 flex flex-col gap-5">
        <div className="flex gap-11 items-center">
          <label htmlFor="operation" className=" text-xl font-semibold">
            Operation :
          </label>
          <select
            name="operation"
            className=" border-[1px] border-black rounded-lg px-3 py-1"
            onChange={(e) => setSelectedOperationId(e.target.value)}
          >
            <option value="">--Select Operation--</option>
            {operation.map((item) => (
              <option value={item.operation_id} key={item.operation_id}>
                {item.operation_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-12 items-center">
          <label htmlFor="customer" className=" text-xl font-semibold">
            Customer :
          </label>
          <Select
            className="w-40"
            options={customerOptions}
            isSearchable
            placeholder="--Select--"
            onChange={(selectedOption) => {
              // console.log(selectedOption);
              setSelectCustomerId(selectedOption.value);
            }}
          />
        </div>
        <div className="flex gap-5 items-center">
          <label htmlFor="reportName" className=" text-xl font-semibold">
            Report Name :
          </label>
          <input
            name="reportName"
            type="text"
            placeholder="enter report"
            className="border-[1px] border-black rounded-lg px-3 py-1"
            onChange={(e) => setReportName(e.target.value)}
          />
        </div>
        {/* <div className="flex gap-5 items-center">
                    <label htmlFor="reportNameEng" className=" text-xl font-semibold">Report Name English :</label>
                    <input name="reportNameEng" type="text" placeholder="english language" className="border-[1px] border-black rounded-lg px-3 py-1"
                        onChange={(e) => setReportNameEng(e.target.value)}
                    />
                </div> */}
        <div className="flex flex-col gap-4">
          <p className=" text-xl font-semibold">
            GetInfo :{" "}
            <label className="text-xs font-normal text-red-500">
              (ระบุข้อมูลที่จะออกรายงาน)
            </label>
          </p>
          <div className="flex flex-col gap-2 pl-5">
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                name="GetInfo"
                value="1"
                onChange={(e) => {
                  setGetDataType(e.target.value);
                  setDisableFields(false);
                }}
              />
              <label>One Time :</label>
              <input
                type="date"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) =>
                  setGetDataStartDate({
                    ...getDataStartDate,
                    date: e.target.value,
                  })
                }
              />
              <input
                type="time"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) =>
                  setGetDataStartDate({
                    ...getDataStartDate,
                    time: e.target.value,
                  })
                }
              />
              <label> - </label>
              <input
                type="date"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) =>
                  setGetDataEndDate({ ...getDataEndDate, date: e.target.value })
                }
              />
              <input
                type="time"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) =>
                  setGetDataEndDate({ ...getDataEndDate, time: e.target.value })
                }
              />
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                name="GetInfo"
                value="2"
                onChange={(e) => {
                  setGetDataType(e.target.value);
                  setDisableFields(false);
                }}
              />
              <label>Daily :</label>
              <input
                type="time"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) => setGetDataStartTime(e.target.value)}
              />
              <label> - </label>
              <input
                type="time"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) => setGetDataEndTime(e.target.value)}
              />
              <label>Time</label>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                name="GetInfo"
                value="3"
                onChange={(e) => {
                  setGetDataType(e.target.value);
                  setDisableFields(false);
                }}
              />
              <label>Monthly :</label>
              <select
                name="month"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) => setGetDataMonth(e.target.value)}
              >
                <option value="">--Select Month--</option>
                <option value="1">Janaury</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) => setGetDataMonthDate(e.target.value)}
              >
                <option value="">day...</option>
                {Array(31)
                  .fill()
                  .map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                name="GetInfo"
                value="4"
                onChange={(e) => {
                  setGetDataType(e.target.value);
                  setGenerateType(e.target.value);
                  setDisableFields(true);
                }}
              />
              <label>Realtime</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className=" text-xl font-semibold">
            Generate :{" "}
            <label className="text-xs font-normal text-red-500">
              (กำหนดระยะเวลาที่จะออกรายงาน)
            </label>
          </p>
          <div className="flex flex-col gap-2 pl-5">
            <div
              className={`flex gap-4 items-center ${
                disableFields ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <input
                type="radio"
                name="generate"
                value="1"
                disabled={disableFields}
                onChange={(e) => setGenerateType(e.target.value)}
              />
              <label>One Time :</label>
              <input
                type="date"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                disabled={disableFields}
                onChange={(e) =>
                  setGenerateDate({ ...generateDate, date: e.target.value })
                }
              />
              <input
                type="time"
                className="border-[1px] border-black rounded-lg px-3 py-1"
                disabled={disableFields}
                onChange={(e) =>
                  setGenerateDate({ ...generateDate, time: e.target.value })
                }
              />
            </div>
            <div
              className={`flex gap-4 items-center ${
                disableFields ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <input
                type="radio"
                name="generate"
                value="2"
                disabled={disableFields}
                onChange={(e) => setGenerateType(e.target.value)}
              />
              <label>Daily :</label>
              <label>recur every :</label>
              <select
                name="day"
                disabled={disableFields}
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) => setGenerateNextDate(e.target.value)}
              >
                <option value="">day...</option>
                {Array(7)
                  .fill()
                  .map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
              </select>
              <label>Day</label>
            </div>
            <div
              className={`flex gap-4 items-center ${
                disableFields ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <input
                type="radio"
                name="generate"
                value="3"
                disabled={disableFields}
                onChange={(e) => setGenerateType(e.target.value)}
              />
              <label>Monthly :</label>
              <select
                name="month"
                disabled={disableFields}
                className="border-[1px] border-black rounded-lg px-3 py-1"
                onChange={(e) => setGenerateMonth(e.target.value)}
              >
                <option value="">--Select Month--</option>
                <option value="1">Janaury</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select
                className="border-[1px] border-black rounded-lg px-3 py-1"
                disabled={disableFields}
                onChange={(e) => setGenerateMonthDate(e.target.value)}
              >
                <option value="">day...</option>
                {Array(31)
                  .fill()
                  .map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <label htmlFor="mail" className=" text-xl font-semibold">
            Mail :
          </label>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Subject"
              className="border-[1px] border-black rounded-lg px-3 py-1"
            />
            <textarea
              name="content"
              placeholder="Content"
              className="border-[1px] border-black rounded-lg px-3 py-1"
            ></textarea>
          </div>
        </div>
        <div className="flex gap-5">
          <label htmlFor="line" className=" text-xl font-semibold">
            Line :
          </label>
          <input
            type="text"
            placeholder="message"
            className="border-[1px] border-black rounded-lg px-3 py-1"
          />
        </div>
        <div className="flex gap-5 ">
          <label htmlFor="picture" className=" text-xl font-semibold">
            Picture :
          </label>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <label htmlFor="name">NameThai :</label>
                  <input
                    type="text"
                    placeholder="name picture"
                    className="border-[1px] border-black rounded-lg px-3 py-1"
                    value={inputName}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddButton();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddButton}
                    className=" bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                  >
                    {editIndex !== null ? "Update" : "+"}
                  </button>
                </div>
                {pictureName.map((input, index) => (
                  <div className="flex gap-5 items-center" key={index}>
                    <label htmlFor="name">Name :</label>
                    <p>{input}</p>
                    <div className="flex gap-1 text-white">
                      <button
                        className=" bg-red-600 hover:bg-red-700 w-9 rounded-lg"
                        onClick={() => handleDelete(index)}
                      >
                        -
                      </button>
                      <img
                        src="/admin/pencil-square.svg"
                        alt="edit"
                        className=" bg-sky-600 hover:bg-sky-700 px-2 py-2 rounded-lg cursor-pointer"
                        onClick={() => handleEdit(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <label htmlFor="name">NameEng :</label>
                  <input
                    type="text"
                    placeholder="English language"
                    className="border-[1px] border-black rounded-lg px-3 py-1"
                    value={inputNameEng}
                    onChange={handleInputChangeEng}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddButtonEng();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddButtonEng}
                    className=" bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                  >
                    {editIndexEng !== null ? "Update" : "+"}
                  </button>
                </div>
                {pictureNameEng.map((input, index) => (
                  <div className="flex gap-5 items-center" key={index}>
                    <label htmlFor="name">Name :</label>
                    <p>{input}</p>
                    <div className="flex gap-1 text-white">
                      <button
                        className=" bg-red-600 hover:bg-red-700 w-9 rounded-lg"
                        onClick={() => handleDeleteEng(index)}
                      >
                        -
                      </button>
                      <img
                        src="/admin/pencil-square.svg"
                        alt="edit"
                        className=" bg-sky-600 hover:bg-sky-700 px-2 py-2 rounded-lg cursor-pointer"
                        onClick={() => handleEditEng(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" text-white flex justify-between items-center ">
          <Link
            to="/admin/template"
            className=" bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl mt-7 "
          >
            Back
          </Link>
          <button
            className=" bg-sky-600 hover:bg-sky-700 px-5 py-3 rounded-xl mt-7"
            onClick={handleSaveConfig}
          >
            save
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ConfigPage;
