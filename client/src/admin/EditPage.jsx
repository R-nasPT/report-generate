import React from "react";
import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingPage from "../component/LoadingPage";
import packageJson from "../../package.json";

function EditPage() {
  const { id } = useParams();
  const [operation, setOperation] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [config, setConfig] = useState([]);
  const [getDataStartDate, setGetDataStartDate] = useState({
    date: null,
    time: null,
  });
  const [getDataEndDate, setGetDataEndDate] = useState({
    date: null,
    time: null,
  });
  const [generateDate, setGenerateDate] = useState({ date: null, time: null });
  console.log(config);

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

  //---get config---
  useEffect(() => {
    const getConfigInfo = async () => {
      try {
        const result = await axios.get(`${packageJson.domain.ipbackend}/config/${id}`);
        if (
          result.data.getdata_start_date !== null &&
          result.data.getdata_end_date !== null &&
          result.data.generate_date !== null
        ) {
          let tempGetDataStartDate = result.data.getdata_start_date?.split("T");
          let tempGetDataEndDate = result.data.getdata_end_date?.split("T");
          let tempGenerateDate = result.data.generate_date?.split("T");
          setGetDataStartDate({
            date: tempGetDataStartDate[0],
            time: tempGetDataStartDate[1].replace("Z", ""),
          });
          setGetDataEndDate({
            date: tempGetDataEndDate[0],
            time: tempGetDataEndDate[1].replace("Z", ""),
          });
          setGenerateDate({
            date: tempGenerateDate[0],
            time: tempGenerateDate[1].replace("Z", ""),
          });
          setConfig(result.data);
        } else {
          setGetDataStartDate({ date: null, time: null });
          setGetDataEndDate({ date: null, time: null });
          setGenerateDate({ date: null, time: null });
          setConfig(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConfigInfo();
  }, [id]);

  //--update--
  const handleSave = async () => {
    try {
      await axios.put(`${packageJson.domain.ipbackend}/config/${id}`, {
        operation_id: config.operation_id,
        customer_id: config.customer_id,
        doc_name: config.doc_name,
        doc_name_eng: config.doc_name_eng,
        getdata_type: config.getdata_type,
        getdata_start_date: config.getdata_start_date,
        getdata_end_date: config.getdata_end_date,
        getdata_start_time: config.getdata_start_time,
        getdata_end_time: config.getdata_end_time,
        getdata_month: config.getdata_month,
        getdata_month_date: config.getdata_month_date,
        generate_type: config.generate_type,
        generate_date: config.generate_date,
        generate_next_date: config.generate_next_date,
        generate_month: config.generate_month,
        generate_month_date: config.generate_month_date,
      });
      console.log("config updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //---operator---
  const getOperator = async () => {
    try {
      const result = await axios.get(`${packageJson.domain.ipbackend}/config/operation`);
      setOperation(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //---customer---
  const getCustomer = async () => {
    try {
      const result = await axios.get(`${packageJson.domain.ipbackend}/config/customers`);
      setCustomer(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOperator();
    getCustomer();
  }, []);

  if (config.length === 0) return <LoadingPage />;
  else
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
              value={config.operation_id}
              onChange={(e) =>
                setConfig({ ...config, operation_id: e.target.value })
              }
            >
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
            <select
              name="customer"
              className="border-[1px] border-black rounded-lg px-3 py-1 text-center"
              value={config.customer_id}
              onChange={(e) =>
                setConfig({ ...config, customer_id: e.target.value })
              }
            >
              {customer
                .sort((a, b) => a.initials.localeCompare(b.initials))
                .map((item) => (
                  <option value={item.customer_id} key={item.customer_id}>
                    {item.initials}
                  </option>
                ))}
            </select>
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
              value={config.doc_name}
              onChange={(e) =>
                setConfig({ ...config, doc_name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className=" text-xl font-semibold">GetInfo :</p>
            <div className="flex flex-col gap-2 pl-5">
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="GetInfo"
                  value="1"
                  checked={config.getdata_type === 1 ? true : false}
                  onChange={(e) =>
                    setConfig({ ...config, getdata_type: e.target.value })
                  }
                />
                <label>One Time :</label>
                <input
                  type="date"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={getDataStartDate.date}
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
                  value={getDataStartDate.time}
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
                  value={getDataEndDate.date}
                  onChange={(e) =>
                    setGetDataEndDate({
                      ...getDataEndDate,
                      date: e.target.value,
                    })
                  }
                />
                <input
                  type="time"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={getDataEndDate.time}
                  onChange={(e) =>
                    setGetDataEndDate({
                      ...getDataEndDate,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="GetInfo"
                  value="2"
                  checked={config.getdata_type === 2 ? true : false}
                  onChange={(e) =>
                    setConfig({ ...config, getdata_type: e.target.value })
                  }
                />
                <label>Daily :</label>
                <input
                  type="time"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={config.getdata_start_time}
                  onChange={(e) =>
                    setConfig({ ...config, getdata_start_time: e.target.value })
                  }
                />
                <label> - </label>
                <input
                  type="time"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={config.getdata_end_time}
                  onChange={(e) =>
                    setConfig({ ...config, getdata_end_time: e.target.value })
                  }
                />
                <label>Time</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="GetInfo"
                  value="3"
                  checked={config.getdata_type === 3 ? true : false}
                  onChange={(e) =>
                    setConfig({ ...config, getdata_type: e.target.value })
                  }
                />
                <label>Monthly :</label>
                <select
                  name="month"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={config.getdata_month}
                  onChange={(e) =>
                    setConfig({ ...config, getdata_month: e.target.value })
                  }
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
                  value={config.getdata_month_date}
                  onChange={(e) =>
                    setConfig({ ...config, getdata_month_date: e.target.value })
                  }
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
          <div className="flex flex-col gap-4">
            <p className=" text-xl font-semibold">generate :</p>
            <div className="flex flex-col gap-2 pl-5">
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="generate"
                  value="1"
                  // onChange={(e) => setGenerateType(e.target.value)}
                />
                <label>One Time :</label>
                <input
                  type="date"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={generateDate.date}
                  onChange={(e) =>
                    setGenerateDate({ ...generateDate, date: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={generateDate.time}
                  onChange={(e) =>
                    setGenerateDate({ ...generateDate, time: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="generate"
                  value="2"
                  // onChange={(e) => setGenerateType(e.target.value)}
                />
                <label>Daily :</label>
                <label>recur every :</label>
                <select
                  name="day"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={config.generate_next_date}
                  onChange={(e) =>
                    setConfig({ ...config, generate_next_date: e.target.value })
                  }
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
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="generate"
                  value="3"
                  // onChange={(e) => setGenerateType(e.target.value)}
                />
                <label>Monthly :</label>
                <select
                  name="month"
                  className="border-[1px] border-black rounded-lg px-3 py-1"
                  value={config.generate_month}
                  onChange={(e) =>
                    setConfig({ ...config, generate_month: e.target.value })
                  }
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
                  value={config.generate_month_date}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      generate_month_date: e.target.value,
                    })
                  }
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
              <div className="flex gap-5 items-center">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <label htmlFor="name">Name :</label>
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
              to="/template"
              className=" bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl mt-7 "
            >
              Back
            </Link>
            <button
              className=" bg-sky-600 hover:bg-sky-700 px-5 py-3 rounded-xl mt-7"
              onClick={handleSave}
            >
              save
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default EditPage;
