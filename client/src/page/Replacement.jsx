import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import {
  RiArrowDownSLine,
  RiDraftFill,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import { MdSave } from "react-icons/md";
import { BsBackspaceFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import packageJson from "../../package.json";
import { useForm } from "react-hook-form";
import LoadingPage from "../component/LoadingPage";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

function Replacement() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [boxOne, setBoxOne] = useState(false);
  const [boxTwo, setBoxTwo] = useState(false);
  const [boxThree, setBoxThree] = useState(false);
  const [update, setUpdate] = useState(0);

  const [status, setStatus] = useState([]);

  const [siteinfo, setSiteinfo] = useState([]);
  const [eqpList, setEqpList] = useState([]);
  const [causeList, setCauseList] = useState([]);
  const [router, setRouter] = useState([]);
  const [provider, setProvider] = useState([]);
  const [apn, setAPN] = useState([]);
  const [ups, setUps] = useState([]);

  const [member, setMember] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [imageList, setImageList] = useState([]);

  const { cid, ticketId, userId } = useParams();

  // console.log(status);
  const server = axios.create({
    baseURL: packageJson.domain.ipSiteInfo,
  });

  const fetchEquipment = async () => {
    const result = await server.get(`/siteInforeplace/type`);
    setEqpList(result.data);
  };

  const fetchCause = async () => {
    const result = await server.get(`/siteInforeplace/replaceobjective`);
    setCauseList(result.data);
  };

  const fetchMember = async () => {
    const response = await axios.get(`${packageJson.domain.ipbackend}/member`);
    const role = response.data.find((mem) => mem.ID.toString() === userId);
    // console.log(role);
    setMember(role?.IsAdmin);
  };

  const routerModelList = async () => {
    const response = await server.get(`/router/producttype`);
    setRouter(response.data);
  };

  const providerList = async () => {
    const response = await server.get(`/provider/provider`);
    setProvider(response.data);
  };

  const apnList = async () => {
    const response = await server.get(`/apn/apn`);
    setAPN(response.data);
  };
  const upsList = async () => {
    const response = await server.get(`/iupsModel/iUPSModel`);
    setUps(response.data);
  };

  const fetchSiteinfo = async () => {
    const response = await server.get(`/siteinfo/${cid}`);
    setSiteinfo(response.data);
    getBeforeDraft(response.data);
  };
  // --- Before Draft --------
  const getBeforeDraft = async (info) => {
    try {
      let data = {
        ticketId: ticketId,
        cid: info?.cid,
      };
      // console.log(data);
      const response = await server.post(
        `/siteInforeplace/siteInfoReplaceByCIDAndTicket`,
        data
      );
      // console.log(response.data);
      const dataList = response?.data?.lastData;
      let rawType = [];
      dataList.forEach((item) => {
        rawType.push(item?.siteinfoReportReplaceTypeId.toString());
        if (item?.siteinfoReportReplaceTypeId === 1) {
          setValue("routerModel", item?.modelNewName?.productTypeId);
          setValue("RouterSerial", item?.serialNumberNew);
          setValue("RouterIp", item?.ipNew);
        }
        if (item?.siteinfoReportReplaceTypeId === 3) {
          setValue("mainSim1", item?.modelNewName?.providerId);
          setValue("callNoSim1", item?.serialNumberNew);
          setValue("callIpSim1", item?.ipNew);
          setValue("APNsim1", item?.apnNew);
        }
        if (item?.siteinfoReportReplaceTypeId === 5) {
          setValue("mainSim2", item?.modelNewName?.providerId);
          setValue("callNoSim2", item?.serialNumberNew);
          setValue("callIpSim2", item?.ipNew);
          setValue("APNsim2", item?.apnNew);
        }
        if (item?.siteinfoReportReplaceTypeId === 4) {
          // console.log(item);
          setValue("UpsModel", item?.modelIdNew);
          setValue("UpsSerial", item?.serialNumberNew);
          setValue("UpsBrand", item?.firmwareNew);
        }
        if (item?.siteinfoReportReplaceTypeId === 2) {
          setValue("Firmware", item?.firmwareNew);
        }

        setValue(
          "customerSiteETA",
          item?.customerSiteETA
            ? item?.customerSiteETA.replace("T", " ").slice(0, -1)
            : null
        );
        setValue(
          "workingStart",
          item?.workingStart
            ? item?.workingStart.replace("T", " ").slice(0, -1)
            : null
        );
        setValue(
          "workingEnd",
          item?.workingEnd
            ? item?.workingEnd.replace("T", " ").slice(0, -1)
            : null
        );
        setValue("cause", item?.objectiveId);

        setStatus(item);
      });

      setEquipment(rawType);
      setImageList(response?.data?.fileInfo);
    } catch (error) {
      console.error(error);
    }
  };
  // -------------- SUBMIT -----------------------
  const handleFormSubmit = async (data) => {
    // console.log(data);
    try {
      let tempData = undefined;
      if (update === 1) {
        const equip = [];
        //  ------------------
        if (equipment.includes("1")) {
          equip.push({
            siteinfoReportReplaceTypeId: 1,
            modelIdOld:
              siteinfo.routerInfoModel?.productTypeModel?.productTypeId,
            modelIdNew: data.routerModel,
            serialNumberOld: siteinfo.routerInfoModel?.serialNo,
            serialNumberNew: data.RouterSerial,
            ipOld: siteinfo.routerInfoModel?.gateway,
            ipNew: data.RouterIp,
          });
        }
        if (equipment.includes("3")) {
          equip.push({
            siteinfoReportReplaceTypeId: 3,
            modelIdOld: siteinfo.aisInfoModel?.providerModel?.providerId,
            modelIdNew: data.mainSim1,
            serialNumberOld: siteinfo.aisInfoModel?.aisCalling,
            serialNumberNew: data.callNoSim1,
            ipOld: siteinfo.aisInfoModel?.aisIp,
            ipNew: data.callIpSim1,
            apnOld: siteinfo.aisInfoModel?.aisApnModel?.aisApnId,
            apnNew: data.APNsim1,
          });
        }
        if (equipment.includes("5")) {
          equip.push({
            siteinfoReportReplaceTypeId: 5,
            modelIdOld: siteinfo.dtacInfoModel?.providerModel?.providerId,
            modelIdNew: data.mainSim2,
            serialNumberOld: siteinfo.dtacInfoModel?.dtacCalling,
            serialNumberNew: data.callNoSim2,
            ipOld: siteinfo.dtacInfoModel?.dtacIp,
            ipNew: data.callIpSim2,
            apnOld: siteinfo.dtacInfoModel?.dtacApnModel?.dtacApnId,
            apnNew: data.APNsim2,
          });
        }
        if (equipment.includes("4")) {
          equip.push({
            siteinfoReportReplaceTypeId: 4,
            modelIdOld: siteinfo.upsInfoModel?.upsModelId,
            modelIdNew: data.UpsModel,
            serialNumberOld: siteinfo.upsInfoModel?.serialNo,
            serialNumberNew: data.UpsSerial,
            firmwareOld: siteinfo.upsInfoModel?.upsBrandId,
            firmwareNew: data.UpsBrand,
          });
        }
        if (equipment.includes("2")) {
          equip.push({
            siteinfoReportReplaceTypeId: 2,
            firmwareOld: siteinfo.routerInfoModel?.firmwareVersion,
            firmwareNew: data.Firmware,
          });
        }
        // console.log(equip);
        // -----------------------
        tempData = {
          cid: siteinfo.cid,
          ticketId: ticketId,
          objectiveId: data.cause,
          userId: userId,
          customerSiteETA: data.customerSiteETA,
          workingStart: data.workingStart,
          workingEnd: data.workingEnd,
          equipments: equip,
        };
        await server.post(`/siteInforeplace/`, tempData);

        Swal.fire({
          icon: "success",
          title: "Your work has been Draft",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      } else {
        let tempData = {
          ticketId: ticketId,
          cid: siteinfo.cid,
        };
        await server.post(`/siteInforeplace/siteinfoReplacetomain`, tempData);

        let timerInterval;
        Swal.fire({
          title: "Saving!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --- picture ----
  const handleUpload = async (e, queue, name) => {
    try {
      console.log(queue);
      if (e.target.files[0]) {
        let type = e.target.files[0].name.split(".");
        const formData = new FormData();
        formData.append("userProfile", e.target.files[0]);
        formData.append("cid", siteinfo.cid);
        formData.append("ticketId", ticketId);
        formData.append("name", name);
        formData.append("queue", queue);
        console.log(formData);
        server.post(`/ftpreplace/addimage`, formData, {
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
    console.log(queue);
    try {
      let data = {
        cid: siteinfo.cid,
        ticketId: ticketId,
        name: "",
        queue: queue,
      };
      // console.log(data);
      server.post(`/ftpreplace/delectimage`, data);
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

  useEffect(() => {
    fetchSiteinfo();
    fetchMember();
    fetchEquipment();
    fetchCause();
    routerModelList();
    providerList();
    apnList();
    upsList();
  }, []);

  if (siteinfo.length === 0) return <LoadingPage />;

  return (
    <>
      <div className="lg:px-32 lg:py-5">
        <div className="bg-[#213555] text-white mt-5 flex justify-center gap-10 py-3 px-5 font-bold shadow-sm shadow-black rounded-md lg:text-2xl">
          <h1>Service Replace CID : {siteinfo.cid}</h1>
          <h1>Ticket : {ticketId}</h1>
        </div>
        <div className="flex justify-end items-center p-3">
          <button
            className="bg-sky-200 text-blue-700 font-bold w-24 h-9 rounded-xl hover:bg-sky-300"
            onClick={() => {
              if (boxOne === true || boxTwo === true || boxThree === true) {
                setBoxOne(false);
                setBoxTwo(false);
                setBoxThree(false);
              } else {
                setBoxOne(true);
                setBoxTwo(true);
                setBoxThree(true);
              }
            }}
          >
            Select All
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              <div className="grid">
                <select
                  className="h-12 mt-3 rounded-lg p-2 border-[1px] border-black w-full"
                  disabled={status.isComplete}
                  {...register("cause", { required: true })}
                >
                  <option value="">วัตถุประสงค์/สาเหตุ</option>
                  {causeList.map((cause) => (
                    <option
                      key={cause.siteinfoReportReplaceObjectiveId}
                      value={cause.siteinfoReportReplaceObjectiveId}
                    >
                      {cause.siteinfoReportReplaceObjectiveName}
                    </option>
                  ))}
                </select>
                {errors.cause && (
                  <p className="text-red-500 text-xs">กรุณาเลือกข้อมูล</p>
                )}
                <select
                  className="h-12 mt-3 rounded-lg p-2 border-[1px] border-black"
                  disabled={status.isComplete}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (
                      selectedValue !== "" &&
                      !equipment.includes(selectedValue)
                    ) {
                      setEquipment([...equipment, selectedValue]);
                    }
                  }}
                >
                  <option value="">อุปกรณ์ที่จะเปลี่ยน</option>
                  {eqpList.map((eqp) => (
                    <option
                      key={eqp.siteinfoReportReplaceTypeId}
                      value={eqp.siteinfoReportReplaceTypeId}
                    >
                      {eqp.siteinfoReportReplaceTypeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-3">
                {equipment.includes("1") && (
                  <>
                    {/* -- Router -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* box-1 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Router (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                          <div className="flex flex-col gap-5 text-right font-bold">
                            <p>Router Model :</p>
                            <p>Router S/N :</p>
                            <p>Router IP :</p>
                          </div>
                          <div className="flex flex-col gap-5">
                            <p>
                              {
                                siteinfo.routerInfoModel?.productTypeModel
                                  ?.productTypeName
                              }
                            </p>
                            <p>{siteinfo.routerInfoModel?.serialNo}</p>
                            <p>{siteinfo.routerInfoModel?.gateway}</p>
                          </div>
                        </div>
                      </div>
                      {/* box-2 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Router (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                          <div className="flex flex-col gap-5 text-right font-bold">
                            <p>Router Model :</p>
                            <p>Router S/N :</p>
                            <p>Router IP :</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <select
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("routerModel")}
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                              {router.map((item) => (
                                <option
                                  key={item.productTypeId}
                                  value={item.productTypeId}
                                >
                                  {item.productTypeName}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("RouterSerial")}
                            />
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("RouterIp")}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className={`w-full flex justify-center items-center p-1 rounded-xl mt-2 lg:w-[50px] lg:h-40  ${
                          status.isComplete
                            ? "bg-slate-400 opacity-50 cursor-no-drop"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        disabled={status.isComplete}
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "1"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
                {equipment.includes("3") && (
                  <>
                    {/* -- SIM 1 -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* box-3 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 1 (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Main SIM :</p>
                            <p>Call No :</p>
                            <p>APN :</p>
                            <p>Call IP :</p>
                          </div>
                          <div className="grid gap-4 lg:gap-5">
                            <p>
                              {
                                siteinfo.aisInfoModel?.providerModel
                                  ?.providerName
                              }
                            </p>
                            <p>{siteinfo.aisInfoModel?.aisCalling}</p>
                            <p>
                              {siteinfo.aisInfoModel?.aisApnModel?.aisApnName}
                            </p>
                            <p>{siteinfo.aisInfoModel?.aisIp}</p>
                          </div>
                        </div>
                      </div>
                      {/* ฺBox-4 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 1 (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Main SIM :</p>
                            <p>Call No :</p>
                            <p>APN :</p>
                            <p>Call IP :</p>
                          </div>
                          <div className="grid gap-2">
                            <select
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("mainSim1")}
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                              {provider.map((item) => (
                                <option
                                  key={item.providerId}
                                  value={item.providerId}
                                >
                                  {item.providerName}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("callNoSim1")}
                            />
                            <select
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("APNsim1")}
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                              {apn.map((item) => (
                                <option key={item.apnId} value={item.apnId}>
                                  {item.apnName}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("callIpSim1")}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className={`w-full flex justify-center items-center p-1 rounded-xl mt-2 lg:w-[50px] lg:h-40  ${
                          status.isComplete
                            ? "bg-slate-400 opacity-50 cursor-no-drop"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        disabled={status.isComplete}
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "3"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
                {equipment.includes("5") && (
                  <>
                    {/* -- SIM 2 -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* box-5 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 2 (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Main SIM :</p>
                            <p>Call No :</p>
                            <p>APN :</p>
                            <p>Call IP :</p>
                          </div>
                          <div className="grid gap-4 lg:gap-5">
                            <p>
                              {
                                siteinfo.dtacInfoModel?.providerModel
                                  ?.providerName
                              }
                            </p>
                            <p>{siteinfo.dtacInfoModel?.dtacCalling}</p>
                            <p>
                              {
                                siteinfo.dtacInfoModel?.dtacApnModel
                                  ?.dtacApnName
                              }
                            </p>
                            <p>{siteinfo.dtacInfoModel?.dtacIp}</p>
                          </div>
                        </div>
                      </div>
                      {/* ฺBox-6 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          SIM 2 (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Main SIM :</p>
                            <p>Call No :</p>
                            <p>APN :</p>
                            <p>Call IP :</p>
                          </div>
                          <div className="grid gap-2">
                            <select
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("mainSim2")}
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                              {provider.map((item) => (
                                <option
                                  key={item.providerId}
                                  value={item.providerId}
                                >
                                  {item.providerName}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("callNoSim2")}
                            />
                            <select
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("APNsim2")}
                            >
                              <option value="" className="text-center">
                                -- select --
                              </option>
                              {apn.map((item) => (
                                <option key={item.apnId} value={item.apnId}>
                                  {item.apnName}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("callIpSim2")}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className={`w-full flex justify-center items-center p-1 rounded-xl mt-2 lg:w-[50px] lg:h-40  ${
                          status.isComplete
                            ? "bg-slate-400 opacity-50 cursor-no-drop"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        disabled={status.isComplete}
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "5"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
                {equipment.includes("4") && (
                  <>
                    {/* -- UPS -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* Box-7 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          UPS (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>UPS S/N :</p>
                            <p>UPS Brand :</p>
                            <p>UPS Model :</p>
                          </div>
                          <div className="grid gap-5">
                            <p>{siteinfo.upsInfoModel?.serialNo}</p>
                            <p>{siteinfo.upsInfoModel?.upsBrandId}</p>
                            <p>{siteinfo.upsInfoModel?.upsModelId}</p>
                          </div>
                        </div>
                      </div>
                      {/* Box-8 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          UPS (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>UPS S/N :</p>
                            <p>UPS Brand :</p>
                            <p>UPS Model :</p>
                          </div>
                          <div className="grid gap-2">
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("UpsSerial")}
                            />
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("UpsBrand")}
                            />
                            <select
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("UpsModel")}
                            >
                              <option value="">-- select --</option>
                              {ups.map((item) => (
                                <option
                                  key={item.providerId}
                                  value={item.providerId}
                                >
                                  {item.providerName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        className={`w-full flex justify-center items-center p-1 rounded-xl mt-2 lg:w-[50px] lg:h-40  ${
                          status.isComplete
                            ? "bg-slate-400 opacity-50 cursor-no-drop"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        disabled={status.isComplete}
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "4"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
                {equipment.includes("2") && (
                  <>
                    {/* -- Firmware -- */}
                    <div className="lg:flex gap-5 lg:items-center">
                      {/* Box-9 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Firmware (Old)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Router F/W :</p>
                          </div>
                          <div className="grid gap-2">
                            <p>{siteinfo.routerInfoModel?.firmwareVersion}</p>
                          </div>
                        </div>
                      </div>
                      {/* Box-10 */}
                      <div className="lg:w-1/2">
                        <h1 className="text-[#213555] font-bold lg:text-2xl">
                          Firmware (Replace to)
                        </h1>
                        <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                          <div className="grid gap-5 text-right font-bold">
                            <p>Router F/W :</p>
                          </div>
                          <div className="grid gap-2">
                            <input
                              type="text"
                              className="border-2 border-black rounded-lg p-1"
                              disabled={status.isComplete}
                              {...register("Firmware")}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className={`w-full flex justify-center items-center p-1 rounded-xl mt-2 lg:w-[50px] lg:py-7 ${
                          status.isComplete
                            ? "bg-slate-400 opacity-50 cursor-no-drop"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        disabled={status.isComplete}
                        onClick={(e) => {
                          e.preventDefault();
                          const newEquipment = equipment.filter(
                            (item) => item !== "2"
                          );
                          setEquipment(newEquipment);
                        }}
                      >
                        <RiDeleteBin6Fill className="w-7 h-7" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </AnimateHeight>
          </div>
          <>
            {/* section-2 */}
            <div className="bg-[#EDEDED] p-3 rounded-md">
              <div
                className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
                onClick={() => setBoxTwo(!boxTwo)}
              >
                <h1>
                  Image{" "}
                  <span className="text-yellow-400">
                    (Open Ticket Before Upload Image Files)
                  </span>
                </h1>
                <RiArrowDownSLine
                  className={`h-10 w-10 ${boxTwo ? "rotate-180" : ""}`}
                />
              </div>
              <AnimateHeight duration={1000} height={boxTwo ? "auto" : 0}>
                <div className="p-5 flex flex-col items-center text-[#213555]">
                  <h1 className="text-3xl font-bold w-full p-5">Image</h1>
                  <div className="lg:grid lg:grid-cols-3 gap-5 text-center">
                    <div className="flex flex-col gap-3">
                      {imageList[0]?.fileName !== "" &&
                      imageList[0]?.fileName !== undefined ? (
                        <div className="relative">
                          <img
                            src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[0]?.cid}/${imageList[0]?.ticketId}/${imageList[0]?.fileName}`}
                            alt="รูปหน้าร้าน"
                            className="w-[300px] h-[300px]"
                          />
                          {status.isComplete !== true && (
                            <TiDelete
                              className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                              onClick={() => handleDeleteNamePicture(0)}
                            />
                          )}
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
                            onChange={(e) => handleUpload(e, 0, "storefront")}
                          />
                        </>
                      )}
                      <p>รูปหน้าร้าน</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      {imageList[1]?.fileName !== "" &&
                      imageList[1]?.fileName !== undefined ? (
                        <div className="relative">
                          <img
                            src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[1]?.cid}/${imageList[1]?.ticketId}/${imageList[1]?.fileName}`}
                            alt="หน้าตู้/จุดวางอุปกรณ์"
                            className="w-[300px] h-[300px]"
                          />
                          {status.isComplete !== true && (
                            <TiDelete
                              className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                              onClick={() => handleDeleteNamePicture(1)}
                            />
                          )}
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
                            onChange={(e) => handleUpload(e, 1, "cabinetFront")}
                          />
                        </>
                      )}
                      <p>หน้าตู้/จุดวางอุปกรณ์</p>
                    </div>
                    <>
                      <div className="flex flex-col gap-3">
                        {imageList[2]?.fileName !== "" &&
                        imageList[2]?.fileName !== undefined ? (
                          <div className="relative">
                            <img
                              src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[2]?.cid}/${imageList[2]?.ticketId}/${imageList[2]?.fileName}`}
                              alt="หน้าร้านด้านขวา"
                              className="w-[300px] h-[300px]"
                            />
                            {status.isComplete !== true && (
                              <TiDelete
                                className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                onClick={() => handleDeleteNamePicture(2)}
                              />
                            )}
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
                              onChange={(e) =>
                                handleUpload(e, 2, "cabinetRight")
                              }
                            />
                          </>
                        )}
                        <p>หน้าร้านด้านขวา</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {imageList[3]?.fileName !== "" &&
                        imageList[3]?.fileName !== undefined ? (
                          <div className="relative">
                            <img
                              src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[3]?.cid}/${imageList[3]?.ticketId}/${imageList[3]?.fileName}`}
                              alt="หน้าร้านด้านซ้าย"
                              className="w-[300px] h-[300px]"
                            />
                            {status.isComplete !== true && (
                              <TiDelete
                                className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                onClick={() => handleDeleteNamePicture(3)}
                              />
                            )}
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
                              onChange={(e) =>
                                handleUpload(e, 3, "cabinetLeft")
                              }
                            />
                          </>
                        )}
                        <p>หน้าร้านด้านซ้าย</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {imageList[4]?.fileName !== "" &&
                        imageList[4]?.fileName !== undefined ? (
                          <div className="relative">
                            <img
                              src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[4]?.cid}/${imageList[4]?.ticketId}/${imageList[4]?.fileName}`}
                              alt="จุดวางอุปกรณ์/จุดติดตั้ง"
                              className="w-[300px] h-[300px]"
                            />
                            {status.isComplete !== true && (
                              <TiDelete
                                className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                onClick={() => handleDeleteNamePicture(4)}
                              />
                            )}
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
                              onChange={(e) =>
                                handleUpload(e, 4, "InstallPoint")
                              }
                            />
                          </>
                        )}
                        <p>จุดวางอุปกรณ์/จุดติดตั้ง</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {imageList[5]?.fileName !== "" &&
                        imageList[5]?.fileName !== undefined ? (
                          <div className="relative">
                            <img
                              src={`${packageJson.domain.ipftp}/api/v1/siteinforeport/siteinforeport/${imageList[5]?.cid}/${imageList[5]?.ticketId}/${imageList[5]?.fileName}`}
                              alt="จุดวางอุปกรณ์/จุดติดตั้ง"
                              className="w-[300px] h-[300px]"
                            />
                            {status.isComplete !== true && (
                              <TiDelete
                                className="absolute -top-3 -right-3 w-10 h-10 cursor-pointer text-red-500 hover:text-red-400"
                                onClick={() => handleDeleteNamePicture(5)}
                              />
                            )}
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
                              onChange={(e) =>
                                handleUpload(e, 5, "behindCabinet")
                              }
                            />
                          </>
                        )}
                        <p>จุดวางอุปกรณ์/จุดติดตั้ง</p>
                      </div>
                    </>
                  </div>
                </div>
              </AnimateHeight>
            </div>
          </>
          {/* section-3 */}
          <div className="bg-[#EDEDED] p-3 rounded-md">
            <div
              className="flex items-center justify-between bg-[#4F709C] text-white text-2xl font-bold p-2 rounded-md hover:bg-[#213555]"
              onClick={() => setBoxThree(!boxThree)}
            >
              <h1>Engineer Action</h1>
              <RiArrowDownSLine
                className={`h-10 w-10 ${boxThree ? "rotate-180" : ""}`}
              />
            </div>
            <AnimateHeight duration={1000} height={boxThree ? "auto" : 0}>
              <div className="p-5">
                <h1 className="text-[#213555] font-bold text-2xl">
                  Working Time
                </h1>
                <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                  <div className="grid gap-[22px] text-right font-bold">
                    <p>Customer Site ETA :</p>
                    <p>Working Start :</p>
                    <p>Working End :</p>
                  </div>
                  <div className="grid gap-3 lg:gap-2">
                    <input
                      type="datetime-local"
                      className="border-[1px] border-black rounded-lg p-1"
                      disabled={status.isComplete}
                      {...register("customerSiteETA")}
                    />

                    <input
                      type="datetime-local"
                      className="border-[1px] border-black rounded-lg p-1"
                      disabled={status.isComplete}
                      {...register("workingStart")}
                    />

                    <input
                      type="datetime-local"
                      className="border-[1px] border-black rounded-lg p-1"
                      disabled={status.isComplete}
                      {...register("workingEnd")}
                    />
                  </div>
                </div>
              </div>
            </AnimateHeight>
          </div>
          <div className="flex justify-between py-5">
            <div className="flex gap-3">
              <Link
                to={`/public/onsite-update/${cid}/${ticketId}/${userId}`}
                className="bg-gray-300 text-gray-600 flex items-center gap-2 rounded-xl px-3 py-3 font-bold hover:bg-gray-400"
              >
                <BsBackspaceFill />
                Back
              </Link>
              <button
                className={`flex items-center gap-1 font-bold px-3 w-28 rounded-xl  ${
                  status.isComplete
                    ? "bg-slate-300 opacity-50 cursor-no-drop"
                    : "bg-yellow-200 hover:bg-yellow-300 text-yellow-800"
                }`}
                type="submit"
                onClick={() => setUpdate(1)}
                disabled={status.isComplete}
              >
                <RiDraftFill className="h-6 w-7" />
                Draft
              </button>
            </div>
            {member === "Admin" && (
              <button
                className={`flex items-center gap-1 font-bold px-3 w-28 rounded-xl ${
                  status.isComplete
                    ? "bg-slate-300 opacity-50 cursor-no-drop"
                    : "bg-green-200 hover:bg-green-300 text-green-800"
                }`}
                type="submit"
                onClick={() => setUpdate(2)}
                disabled={status.isComplete}
              >
                <MdSave className="h-6 w-7" />
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default Replacement;
