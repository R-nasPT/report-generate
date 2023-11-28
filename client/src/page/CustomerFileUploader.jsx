import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { Link } from "react-router-dom";
import { RiArrowDownSLine, RiDraftFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { MdCancel, MdSave } from "react-icons/md";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import packageJson from "../../package.json";
import axios from "axios";
import Select from "react-select";
import LoadingPage from "../component/LoadingPage";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

function CustomerFileUploader() {
  const [cid, setCid] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [boxOne, setBoxOne] = useState(false);
  const [boxTwo, setBoxTwo] = useState(true);

  const [update, setUpdate] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const userId = localStorage.getItem("id");
  const localData = localStorage.getItem("maintenance");

  // console.log(watch("success"));

  const server = axios.create({
    baseURL: packageJson.domain.ipSiteInfo,
  });
  const fetchData = async (data) => {
    try {
      const response = await server.post(`/maintenance/siteinfo`, {
        shortName: data,
      });
      setCid(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchToSetData = async () => {
    try {
      const response = await server.get(`/maintenance/${localData}`);
      console.log(response.data);
      setMaintenance(response.data);
      setImageList(response.data.maintenanceInfoDetailModels);
      //setFilterData(response.data.SiteInfoModel);
      setValue("cid", response.data.cid);
      setValue("ticketId", response.data.ticketId);
      setValue("onsiteBy", response.data.onsiteBy);
      setValue("onsiteTime", response.data.onsiteTime.slice(0, 10));
      setValue(
        "workingStart",
        response.data.workingStart.replace("T", " ").slice(0, -1)
      );
      setValue(
        "workingEnd",
        response.data.workingEnd.replace("T", " ").slice(0, -1)
      );
      setValue("success", response.data.status);

      setUpdate(1);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomer = async () => {
    const response = await server.get(`/customer/`);
    setCustomer(response.data);
  };

  const handleFormSubmit = async (data) => {
    try {
      console.log(data);
      if (update === 1) {
        let tempData;
        tempData = {
          cid: data.cid,
          ticketId: data.ticketId,
          onsiteBy: data.onsiteBy,
          onsiteTime: data.onsiteTime,
          workingStart: data.workingStart,
          workingEnd: data.workingEnd,
          success: data.success,
          userId: userId,
        };
        const result = await server.post(`/maintenance/`, tempData);
        // console.log("result.data", result.data);
        localStorage.setItem("maintenance", result.data.maintenanceInfoId);
        Swal.fire({
          icon: "success",
          title: "Your work has been Save",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e, queue, name) => {
    try {
      console.log(queue);
      if (e.target.files[0]) {
        let type = e.target.files[0].name.split(".");
        const formData = new FormData();
        formData.append("userProfile", e.target.files[0]);
        formData.append("cid", maintenance.cid);
        formData.append("maintenanceInfoId", maintenance.maintenanceInfoId);
        formData.append("name", name);
        formData.append("queue", queue);
        console.log(formData);
        await server.post(`/ftpmaintenance/addimage`, formData, {
          headers: { "content-type": "multipart/form-data" },
        });

        setImageList((prevImage) =>
          prevImage.map((item) =>
            item.queue === queue
              ? { ...item, fileName: `${name}.${type[1]}` }
              : item
          )
        );
        console.log("Image uploaded successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNamePicture = async (queue) => {
    // console.log(queue);
    try {
      let data = {
        cid: maintenance.cid,
        maintenanceInfoId: maintenance.maintenanceInfoId,
        name: "",
        queue: queue,
      };
      // console.log(data);
      await server.post(`/ftpmaintenance/delectimage`, data);
      setImageList((prevImage) =>
        prevImage.map((item) =>
          item.queue === queue ? { ...item, fileName: "" } : item
        )
      );
      console.log("Delete Image successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const customerOptions = customer
    .sort((a, b) => a.shortName.localeCompare(b.shortName))
    .map((item) => {
      // console.log(item);
      return {
        value: item.shortName,
        label: item.shortName,
      };
    });

  const cidOptions = cid
    .sort((a, b) => a.cid.localeCompare(b.cid))
    .map((item) => {
      // console.log(item.cid);
      return {
        value: item.cid,
        label: item.cid,
      };
    });

  const handleFilter = (list) => {
    const filters = cid.filter((item) => {
      // console.log("item", item);
      return item.cid.includes(list);
    });
    setFilterData(filters);
  };

  useEffect(() => {
    fetchCustomer();
    if (localData) {
      fetchToSetData();
    }
  }, []);

  if (customer.length === 0) return <LoadingPage />;

  return (
    <>
      <div className="lg:px-32 lg:py-5">
        <h1 className="py-3 px-5 font-bold shadow-sm shadow-black rounded-md">
          <Link
            to="/user/homepage"
            className="hover:underline hover:text-blue-700"
          >
            Home
          </Link>{" "}
          /{" "}
          <Link
            to="/user/maintenance-summary"
            className="hover:underline hover:text-blue-700"
          >
            Maintenance
          </Link>{" "}
          <span className="text-[#E5D283]">/ {/*status.cid*/}</span>
        </h1>
        <div className="flex justify-between items-center p-3">
          <div className="flex gap-3 py-1">
            {localData && (
              <Link
                to={`/user/pdf-maintenance/${maintenance.maintenanceInfoId}`}
                className="flex gap-2 items-center w-24 px-2 py-2 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-100"
              >
                <BsFillFileEarmarkPdfFill className="w-5 h-5" />
                <p>Cus.</p>
              </Link>
            )}
          </div>
          <button
            className="bg-sky-200 text-blue-700 font-bold w-24 h-9 rounded-xl hover:bg-sky-300"
            onClick={() => {
              if (boxOne === true || boxTwo === true) {
                setBoxOne(false);
                setBoxTwo(false);
              } else {
                setBoxOne(true);
                setBoxTwo(true);
              }
            }}
          >
            Select All
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-5">
            {/* section 1 */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
                onClick={() => setBoxOne(!boxOne)}
              >
                <h1>Site Information</h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxOne ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={600} height={boxOne ? "auto" : 0}>
                <div className="p-3">
                  <div className="lg:flex gap-5 lg:items-center">
                    {/* box-1 */}
                    <div className="lg:w-3/4">
                      <h1 className="text-[#213555] font-bold lg:text-2xl">
                        Installation
                      </h1>
                      <div className="lg:flex gap-2 bg-[#E5D283] py-5 px-5 rounded-xl">
                        <div className="grid gap-2 lg:w-3/4">
                          <div className="flex gap-2 items-center justify-between">
                            {!localData && <p>Customer :</p>}
                            {!localData && (
                              <>
                                <Select
                                  isSearchable
                                  placeholder="--Customer--"
                                  options={customerOptions}
                                  onChange={(selectedOption) => {
                                    // console.log(selectedOption);
                                    fetchData(selectedOption.label);
                                  }}
                                  styles={{
                                    control: (baseStyles) => ({
                                      ...baseStyles,
                                      borderColor: "black",
                                      borderRadius: "12px",
                                      width: "190px",
                                    }),
                                  }}
                                />
                              </>
                            )}
                          </div>
                          <div className="flex gap-2 items-center justify-between">
                            <p>CID :</p>
                            {!localData && (
                              <>
                                <Controller
                                  name="cid"
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <>
                                      <Select
                                        {...field}
                                        isSearchable
                                        placeholder="--CID--"
                                        options={cidOptions}
                                        value={cidOptions.find(
                                          (option) =>
                                            option.value === field.value
                                        )}
                                        onChange={(selectedOption) => {
                                          // console.log(selectedOption);
                                          field.onChange(selectedOption.label);
                                          handleFilter(selectedOption.label);
                                        }}
                                        styles={{
                                          control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderColor: "black",
                                            borderRadius: "12px",
                                            width: "190px",
                                          }),
                                        }}
                                      />
                                    </>
                                  )}
                                />
                              </>
                            )}
                            {localData && <p>{maintenance.cid}</p>}
                          </div>
                          {errors.cid && (
                            <p className="text-red-500 text-right">
                              กรุณากรอกข้อมูล
                            </p>
                          )}
                          <div className="flex gap-2 items-center justify-between">
                            <p>Ticket ID :</p>
                            <input
                              type="text"
                              className="border-[1px] border-black rounded-lg p-1"
                              {...register("ticketId", { required: true })}
                            />
                          </div>
                          <div className="flex gap-2 items-center justify-between">
                            <p>Onsite by :</p>
                            <input
                              type="text"
                              className="border-[1px] border-black rounded-lg p-1"
                              {...register("onsiteBy", { required: true })}
                            />
                          </div>
                          {errors.onsiteBy && (
                            <p className="text-red-500 text-right">
                              กรุณากรอกข้อมูล
                            </p>
                          )}
                          <div className="flex gap-2 items-center justify-between">
                            <p>Onsite Success :</p>
                            <select
                              className="border-[1px] border-black rounded-lg p-1"
                              {...register("success", { required: true })}
                            >
                              <option
                                disabled
                                selected
                                value=""
                                className="text-center"
                              >
                                --select--
                              </option>
                              <option value="สำเร็จ">สำเร็จ</option>
                              <option value="ไม่สำเร็จ เพราะ เข้า Site ไม่ได้">
                                ไม่สำเร็จ เพราะ เข้า Site ไม่ได้
                              </option>
                              <option value="ไม่สำเร็จ เพราะ ไม่มี Rack">
                                ไม่สำเร็จ เพราะ ไม่มี Rack
                              </option>
                              <option value="ไม่สำเร็จ เพราะ Lock ไม่ได้">
                                ไม่สำเร็จ เพราะ Lock ไม่ได้
                              </option>
                            </select>
                          </div>
                          {errors.success && (
                            <p className="text-red-500 text-right">
                              กรุณากรอกข้อมูล
                            </p>
                          )}
                        </div>
                        {filterData.map((data) => (
                          <div className="flex flex-col gap-5 bg-[#ffffff] border-2 border-[#a5a4a0] p-3 rounded-xl mt-3 lg:mt-0">
                            <p>StationId : {data.atmModel?.stationId}</p>
                            <p>SiteName : {data.siteName}</p>
                            <p>Address : {data.address}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* box-2 */}
                    <div className="lg:w-1/2">
                      <h1 className="text-[#213555] font-bold lg:text-2xl">
                        Woking Time
                      </h1>
                      <div className="grid gap-2 bg-[#E5D283] p-5 rounded-xl">
                        <div className="flex gap-2 items-center">
                          <p>Onsite Time :</p>
                          <input
                            type="date"
                            className="border-[1px] border-black rounded-lg p-1"
                            {...register("onsiteTime", { required: true })}
                          />
                        </div>
                        {errors.onsiteTime && (
                          <p className="text-red-500">กรุณากรอกข้อมูล</p>
                        )}
                        <div className="flex gap-2 items-center">
                          <p>Working Start :</p>
                          <input
                            type="datetime-local"
                            className="border-[1px] border-black rounded-lg p-1"
                            {...register("workingStart", { required: true })}
                          />
                        </div>
                        {errors.workingStart && (
                          <p className="text-red-500">กรุณากรอกข้อมูล</p>
                        )}
                        <div className="flex gap-2 items-center">
                          <p>Working End :</p>
                          <input
                            type="datetime-local"
                            className="border-[1px] border-black rounded-lg p-1"
                            {...register("workingEnd", { required: true })}
                          />
                        </div>
                        {errors.workingEnd && (
                          <p className="text-red-500">กรุณากรอกข้อมูล</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateHeight>
            </div>
            {localData && (
              <>
                {/* section-2 */}
                <div className="bg-[#EDEDED] p-3 rounded-md">
                  <div
                    className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
                    onClick={() => setBoxTwo(!boxTwo)}
                  >
                    <h1>Image</h1>
                    <RiArrowDownSLine
                      className={`h-10 w-10 ${boxTwo ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimateHeight duration={1000} height={boxTwo ? "auto" : 0}>
                    <div className="p-5 flex flex-col items-center text-[#213555]">
                      <h1 className="text-3xl font-bold w-full p-5">Image</h1>
                      <div className="lg:grid gap-5 text-center">
                        <h1 className="text-3xl font-bold text-[#213555]">
                          Before
                        </h1>
                        <div className="lg:grid lg:grid-cols-3 gap-5">
                          <div className="flex flex-col gap-3">
                            {imageList[0]?.fileName !== "" &&
                            imageList[0]?.fileName !== undefined ? (
                              <div className="relative">
                                <img
                                  src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[0].maintenanceInfoId}/${imageList[0].fileName}`}
                                  alt="หน้าตู้ ATM"
                                  className="w-[300px] h-[300px]"
                                />
                                <TiDelete
                                  className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNamePicture(0)}
                                />
                              </div>
                            ) : (
                              <>
                                <label
                                  htmlFor="file-input0"
                                  className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                                >
                                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                                    <span className="text-8xl ">+</span>
                                    <p>Upload Photo</p>
                                  </div>
                                </label>
                                <input
                                  type="file"
                                  id="file-input0"
                                  className="hidden"
                                  onChange={(e) => handleUpload(e, 0, "B1")}
                                />
                              </>
                            )}
                            <p>หน้าตู้ ATM</p>
                          </div>
                          <div className="flex flex-col gap-3">
                            {imageList[1]?.fileName !== "" &&
                            imageList[1]?.fileName !== undefined ? (
                              <div className="relative">
                                <img
                                  src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[1].maintenanceInfoId}/${imageList[1].fileName}`}
                                  alt="หน้าตู้ Rack"
                                  className="w-[300px] h-[300px]"
                                />
                                <TiDelete
                                  className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNamePicture(1)}
                                />
                              </div>
                            ) : (
                              <>
                                <label
                                  htmlFor="file-input1"
                                  className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                                >
                                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                                    <span className="text-8xl ">+</span>
                                    <p>Upload Photo</p>
                                  </div>
                                </label>
                                <input
                                  type="file"
                                  id="file-input1"
                                  className="hidden"
                                  onChange={(e) => handleUpload(e, 1, "B2")}
                                />
                              </>
                            )}
                            <p>หน้าตู้ Rack</p>
                          </div>
                          <div className="flex flex-col gap-3">
                            {imageList[2]?.fileName !== "" &&
                            imageList[2]?.fileName !== undefined ? (
                              <div className="relative">
                                <img
                                  src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[2].maintenanceInfoId}/${imageList[2].fileName}`}
                                  alt="ด้านข้างตู้ Rack"
                                  className="w-[300px] h-[300px]"
                                />
                                <TiDelete
                                  className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNamePicture(2)}
                                />
                              </div>
                            ) : (
                              <>
                                <label
                                  htmlFor="file-input2"
                                  className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                                >
                                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                                    <span className="text-8xl ">+</span>
                                    <p>Upload Photo</p>
                                  </div>
                                </label>
                                <input
                                  type="file"
                                  id="file-input2"
                                  className="hidden"
                                  onChange={(e) => handleUpload(e, 2, "B3")}
                                />
                              </>
                            )}
                            <p>ด้านข้างตู้ Rack (ให้เห็นว่าปิดล็อกตู้ Rack)</p>
                          </div>
                        </div>
                        <h1 className="text-3xl font-bold text-[#213555]">
                          After
                        </h1>
                        <div className="lg:grid lg:grid-cols-3 gap-5">
                          <div className="flex flex-col gap-3">
                            {imageList[3]?.fileName !== "" &&
                            imageList[3]?.fileName !== undefined ? (
                              <div className="relative">
                                <img
                                  src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[3].maintenanceInfoId}/${imageList[3].fileName}`}
                                  alt="หน้าตู้ ATM"
                                  className="w-[300px] h-[300px]"
                                />
                                <TiDelete
                                  className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNamePicture(3)}
                                />
                              </div>
                            ) : (
                              <>
                                <label
                                  htmlFor="file-input3"
                                  className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                                >
                                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                                    <span className="text-8xl ">+</span>
                                    <p>Upload Photo</p>
                                  </div>
                                </label>
                                <input
                                  type="file"
                                  id="file-input3"
                                  className="hidden"
                                  onChange={(e) => handleUpload(e, 3, "A1")}
                                />
                              </>
                            )}
                            <p>หน้าตู้ ATM</p>
                          </div>
                          <div className="flex flex-col gap-3">
                            {imageList[4]?.fileName !== "" &&
                            imageList[4]?.fileName !== undefined ? (
                              <div className="relative">
                                <img
                                  src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[4].maintenanceInfoId}/${imageList[4].fileName}`}
                                  alt="หน้าตู้ Rack"
                                  className="w-[300px] h-[300px]"
                                />
                                <TiDelete
                                  className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNamePicture(4)}
                                />
                              </div>
                            ) : (
                              <>
                                <label
                                  htmlFor="file-input4"
                                  className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                                >
                                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                                    <span className="text-8xl">+</span>
                                    <p>Upload Photo</p>
                                  </div>
                                </label>
                                <input
                                  type="file"
                                  id="file-input4"
                                  className="hidden"
                                  onChange={(e) => handleUpload(e, 4, "A2")}
                                />
                              </>
                            )}
                            <p>หน้าตู้ Rack</p>
                          </div>
                          <div className="flex flex-col gap-3">
                            {imageList[5]?.fileName !== "" &&
                            imageList[5]?.fileName !== undefined ? (
                              <div className="relative">
                                <img
                                  src={`${packageJson.domain.ipftp}/api/v1/maintenance/maintenancereport/${maintenance.cid}/${imageList[5].maintenanceInfoId}/${imageList[5].fileName}`}
                                  alt="ด้านข้างตู้ Rack"
                                  className="w-[300px] h-[300px]"
                                />
                                <TiDelete
                                  className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNamePicture(5)}
                                />
                              </div>
                            ) : (
                              <>
                                <label
                                  htmlFor="file-input5"
                                  className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                                >
                                  <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                                    <span className="text-8xl ">+</span>
                                    <p>Upload Photo</p>
                                  </div>
                                </label>
                                <input
                                  type="file"
                                  id="file-input5"
                                  className="hidden"
                                  onChange={(e) => handleUpload(e, 5, "A3")}
                                />
                              </>
                            )}
                            <p>ด้านข้างตู้ Rack (ให้เห็นว่าปิดล็อกตู้ Rack)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimateHeight>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end gap-5 py-5">
            {/* <Link
              // to="/user/install"
              className="flex items-center text-red-500 gap-1 font-bold bg-red-200 px-3 w-28 h-12 rounded-xl hover:bg-red-300"
            >
              <MdCancel className="h-6 w-7" /> Cancel
            </Link> */}
            {/* <button
              className={`flex items-center gap-1 font-bold px-3 w-28 rounded-xl  ${
                status.isComplete && isAdmin !== "Admin"
                  ? "bg-slate-300 opacity-50 cursor-no-drop"
                  : "bg-yellow-200 hover:bg-yellow-300 text-yellow-800"
              }`}
              type="submit"
              disabled={status.isComplete && isAdmin !== "Admin"}
              onClick={() => setUpdate(1)}
            >
              <RiDraftFill className="h-6 w-7" />
              {status.isComplete && isAdmin === "Admin" ? "Update" : "Draft"}
            </button> */}
            {/* {isAdmin === "Admin" && ( */}
            {!localData && (
              <button
                className="flex items-center gap-1 p-3 font-bold px-3 w-28 rounded-xl bg-green-200 hover:bg-green-300 text-green-800"
                type="submit"
                onClick={() => setUpdate(1)}
              >
                <MdSave className="h-6 w-7" />
                Save
              </button>
            )}
            {localData && (
              <Link
                to="/user/maintenance-summary"
                className="flex items-center gap-1 p-3 font-bold justify-center  px-3 w-28 rounded-xl bg-green-200 hover:bg-green-300 text-green-800"
              >
                Submit
              </Link>
            )}
            {/* )} */}
          </div>
        </form>
      </div>
    </>
  );
}

export default CustomerFileUploader;
