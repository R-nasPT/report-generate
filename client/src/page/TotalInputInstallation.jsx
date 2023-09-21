/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimateHeight from "react-animate-height";
import { RiArrowDownSLine, RiDraftFill } from "react-icons/ri";
import { MdCancel, MdSave } from "react-icons/md";
import TotalSiteInformation from "../component/TotalSiteInformation";
import Replacement from "../component/Replacement";
import axios from "axios";
import packageJson from "../../package.json";
import { useForm } from "react-hook-form";
import LoadingPage from "../component/LoadingPage";

function TotalInputInstallation() {
  const [siteinfo, setSiteinfo] = useState([]);
  const [siteinfoReport, setSiteinfoReport] = useState([]);
  const [boxOne, setBoxOne] = useState(false);
  const [boxTwo, setBoxTwo] = useState(false);
  const [boxThree, setBoxThree] = useState(false);
  const userId = localStorage.getItem("id");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // console.log(watch("Name1"));

  const { id } = useParams();

  const fetchData = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/siteinfo/${id}`
    );
    // console.log(response.data);
    //-----Site Info
    setValue("stationId", response.data.atmModel.stationId);
    setValue("brand", response.data.atmModel.atmBrandModel.atmBrandName);
    setValue("address", response.data.address);
    setValue("contractName", response.data.contractName);
    setValue("tel", response.data.tel);
    setValue("GPSN", response.data.GPSNo);
    setValue("GPSE", response.data.GPSE);
    //-----Router Information
    setValue("routerModel", response.data.routerInfoModel.productTypeId);
    setValue("routerFW", response.data.routerInfoModel.firmwareVersion);
    setValue("routerSN", response.data.routerInfoModel.serialNo);
    setValue("routerIp", response.data.routerInfoModel.network);
    setValue("subnetMask", response.data.routerInfoModel.mask);
    setValue("rackSN", response.data.otherInfoModel.rackSerialNo);
    setValue("antenaGain", response.data.otherInfoModel.antennaGain);
    //-----ATM Information
    setValue("atmbrand", response.data.atmModel.atmBrandId);
    setValue("atmtype", response.data.atmModel.atmTypeId);
    setValue("atmIp", response.data.atmModel.ip);
    //-----SIM 1
    setValue("providerSimFirst", response.data.aisInfoModel?.simProvider);
    setValue("callSimFirst", response.data.aisInfoModel?.aisCalling);
    setValue("apnSimFirst", response.data.aisInfoModel?.aisApnId);
    setValue("ipSimFirst", response.data.aisInfoModel?.aisIp);
    setValue("lacSimFirst", response.data.aisInfoModel?.aisLac);
    setValue("cellIdSimFirst", response.data.aisInfoModel?.aisCallId);
    // setValue('switchOverSimFirst', response.data.aisInfoModel.antennaGain)

    setValue(
      "connectionSimFirst",
      response.data.aisInfoModel?.aisConnectionServiceType
    );
    setValue("packageSimFirst", response.data.aisInfoModel?.simPackId);
    setValue("signalStrengthSimFirst", response.data.aisInfoModel?.aisSignal);
    // setValue('pingingTestSimFirst', response.data.aisInfoModel.antennaGain)
    setValue("averageSimFirst", response.data.aisInfoModel?.average);
    // setValue('downloadSimFirst', response.data.aisInfoModel.antennaGain)
    // setValue('UploadSimFirst', response.data.aisInfoModel.antennaGain)
    //-----SIM 2
    setValue("providerSimSecond", response.data.dtacInfoModel?.simProvider);
    setValue("callSimSecond", response.data.dtacInfoModel?.dtacCalling);
    setValue("apnSimSecond", response.data.dtacInfoModel?.dtacApnId);
    setValue("ipSimSecond", response.data.dtacInfoModel?.dtacIp);
    setValue("lacSimSecond", response.data.dtacInfoModel?.dtacLac);
    setValue("cellIdSimSecond", response.data.dtacInfoModel?.dtacCallId);
    // setValue('switchOverSimSecond', response.data.dtacInfoModel.antennaGain)
    setValue(
      "connectionSimSecond",
      response.data.dtacInfoModel?.dtacConnectionServiceType
    );
    setValue("packageSimSecond", response.data.dtacInfoModel?.simPackId);
    setValue("signalStrengthSimSecond", response.data.dtacInfoModel?.dtacSignal);
    // setValue('pingingTestSimSecond', response.data.dtacInfoModel.antennaGain)
    setValue("averageSimSecond", response.data.dtacInfoModel?.average);
    // setValue('downloadSimSecond', response.data.dtacInfoModel.antennaGain)
    // setValue('UploadSimSecond', response.data.dtacInfoModel.antennaGain)
    //----UPS
    setValue("upsType", response.data.actTestingInfoModel?.upsUseId);
    setValue("upsSN", response.data.upsInfoModel.serialNo);
    setValue("upsBrand", response.data.upsInfoModel.upsBrandId);
    setValue("upsModel", response.data.upsInfoModel.upsModelId);
    setValue("batteryStart", response.data.upsInfoModel.batteryStartDate);
    setValue("rate", response.data.upsInfoModel.kva);
    setValue("load", response.data.upsInfoModel.upsLoad);
    setValue("temperature", response.data.upsInfoModel.temperatureC);

    // setValue('ln', response.data.otherInfoModel.antennaGain)
    // setValue('lg', response.data.otherInfoModel.antennaGain)
    // setValue('ng', response.data.otherInfoModel.antennaGain)
    // setValue('bypassMode', response.data.otherInfoModel.antennaGain)
    // setValue('powerFailTest', response.data.otherInfoModel.antennaGain)
    // setValue('commandTest', response.data.otherInfoModel.antennaGain)

    // setValue('downloadAverageSimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('pingingTestSimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('averageSimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize1SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize2SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize3SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize4SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize5SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed1SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed2SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed3SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed4SimFirstUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed5SimFirstUpload', response.data.otherInfoModel.antennaGain)

    // setValue('downloadAverageSimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('pingingTestSimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('averageSimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize1SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize2SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize3SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize4SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('fileSize5SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed1SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed2SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed3SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed4SimSecondUpload', response.data.otherInfoModel.antennaGain)
    // setValue('speed5SimSecondUpload', response.data.otherInfoModel.antennaGain)

    // setValue('testSimSecondOther', response.data.otherInfoModel.antennaGain)
    // setValue('testSimFirstOther', response.data.otherInfoModel.antennaGain)
    //----Other Information
    setValue("Name1", response.data.equipmentInfoDetailsModels[0]?.equipNameId);
    setValue("Name2", response.data.equipmentInfoDetailsModels[1]?.equipNameId);
    setValue("Name3", response.data.equipmentInfoDetailsModels[2]?.equipNameId);
    setValue("Name4", response.data.equipmentInfoDetailsModels[3]?.equipNameId);
    setValue("Type1", response.data.equipmentInfoDetailsModels[0]?.equipTypeId);
    setValue("Type2", response.data.equipmentInfoDetailsModels[1]?.equipTypeId);
    setValue("Type3", response.data.equipmentInfoDetailsModels[2]?.equipTypeId);
    setValue("Type4", response.data.equipmentInfoDetailsModels[3]?.equipTypeId);
    setValue(
      "Brand1",
      response.data.equipmentInfoDetailsModels[0]?.equipBrandId
    );
    setValue(
      "Brand2",
      response.data.equipmentInfoDetailsModels[1]?.equipBrandId
    );
    setValue(
      "Brand3",
      response.data.equipmentInfoDetailsModels[2]?.equipBrandId
    );
    setValue(
      "Brand4",
      response.data.equipmentInfoDetailsModels[3]?.equipBrandId
    );
    setValue("Serial1", response.data.equipmentInfoDetailsModels[0]?.serial);
    setValue("Serial2", response.data.equipmentInfoDetailsModels[1]?.serial);
    setValue("Serial3", response.data.equipmentInfoDetailsModels[2]?.serial);
    setValue("Serial4", response.data.equipmentInfoDetailsModels[3]?.serial);

    setValue("customerSiteETA", response.data.actTestingInfoModel?.cusETA);
    setValue("workingStart", response.data.actTestingInfoModel?.workStart);
    setValue("workingEnd", response.data.actTestingInfoModel?.workEnd);
    setValue("officeDeparture", response.data.actTestingInfoModel?.officeDate);
    setValue(
      "customerSiteArrival",
      response.data.actTestingInfoModel?.cusArrival
    );
    setValue(
      "customerSiteDeparture",
      response.data.actTestingInfoModel?.cusDeparture
    );
    setValue("officeArrival", response.data.actTestingInfoModel?.officeArrival);

    // setValue("note", response.data.otherInfoModel.antennaGain);
    // setValue("cid", response.data.cid);
    // setValue("ticketId", response.data.TicketInfoModel.tkdt_ID);
    // setValue("userId", response.data.otherInfoModel.antennaGain);

    setSiteinfo(response.data);
  };

  const getSiteinfoReportByCIDAndTicket = async () => {
    let data = {
      ticketId:
        siteinfo?.TicketInfoModel != null
          ? siteinfo.TicketInfoModel?.tkdt_ID
          : "",
      cid: siteinfo.cid,
    };
    console.log(data);
    const response = await axios.post(
      `${packageJson.domain.ipSiteInfo}/siteinfo/report/`,
      data
    );
    console.log("test", response.data);
  };

  const handleFormSubmit = async (data) => {
    console.log(data);
    let tempData = {
      siteInfo: {
        stationID: data.stationId,
        branch: data.brand,
        address: data.address,
      },
      siteUpdate: {
        contactName: data.contactName,
        tel: data.tel,
        gpsN: data.GPSN,
        gpsE: data.GPSE,
      },
      routerInfo: {
        routerModel: data.routerModel,
        routerFW: data.routerFW,
        routerSN: data.routerSN,
        routerIp: data.routerIp,
        subnetMask: data.subnetMask,
        rackSN: data.rackSN,
        antenaGain: data.antenaGain,
      },
      atmInfo: {
        atmbrand: data.atmbrand,
        atmtype: data.atmtype,
        atmIp: data.atmIp,
      },
      simFirst: {
        provider: data.providerSimFirst,
        callSimFirst: data.callSimFirst,
        apnSimFirst: data.apnSimFirst,
        ipSimFirst: data.ipSimFirst,
        lacSimFirst: data.lacSimFirst,
        cellIdSimFirst: data.cellIdSimFirst,
        switchOverSimFirst: data.switchOverSimFirst,
      },
      testSimFirst: {
        connection: data.connectionSimFirst,
        package: data.packageSimFirst,
        signalStrength: data.signalStrengthSimFirst,
        pingingTest: data.pingingTestSimFirst,
        average: data.averageSimFirst,
        download: data.downloadSimFirst,
        Upload: data.UploadSimFirst,
      },
      simSecond: {
        provider: data.providerSimSecond,
        callSimSecond: data.callSimSecond,
        apnSimSecond: data.apnSimSecond,
        ipSimSecond: data.ipSimSecond,
        lacSimSecond: data.lacSimSecond,
        cellIdSimSecond: data.cellIdSimSecond,
        switchOverSimSecond: data.switchOverSimSecond,
      },
      testSimSecond: {
        connection: data.connectionSimSecond,
        package: data.packageSimSecond,
        signalStrength: data.signalStrengthSimSecond,
        pingingTest: data.pingingTestSimSecond,
        average: data.averageSimSecond,
        download: data.downloadSimSecond,
        Upload: data.UploadSimSecond,
      },
      upsInfo: {
        upsType: data.upsType,
        upsSN: data.upsSN,
        upsBrand: data.upsBrand,
        upsModel: data.upsModel,
        batteryStart: data.batteryStart,
        rate: data.rate,
        load: data.load,
        temperature: data.temperature,
      },
      testUps: {
        ln: data.ln,
        lg: data.lg,
        ng: data.ng,
        bypassMode: data.bypassMode,
        powerFailTest: data.powerFailTest,
        commandTest: data.commandTest,
      },
      testSimFirstUpload: null,
      testSimSecondUpload: null,
      testSimSecondOther: null,
      testSimFirstOther: null,
      otherInfo: [
        {
          name: data.Name1,
          type: data.Type1,
          brand: data.Brand1,
          serial: data.Serial1,
        },
        {
          name: data.Name2,
          type: data.Type2,
          brand: data.Brand2,
          serial: data.Serial2,
        },
        {
          name: data.Name3,
          type: data.Type3,
          brand: data.Brand3,
          serial: data.Serial3,
        },
        {
          name: data.Name4,
          type: data.Type4,
          brand: data.Brand4,
          serial: data.Serial4,
        },
      ],
      workingTime: {
        customerSiteETA: null,
        workingStart: null,
        workingEnd: null,
        officeDeparture: null,
        officeArrival: null,
        customerSiteArrival: null,
        customerSiteDeparture: null,
      },
      note: data.note,
      cid: siteinfo.cid,
      ticketId: siteinfo.TicketInfoModel?.tkdt_ID,
      userId: userId,
    };
    const response = await axios.post(
      `${packageJson.domain.ipSiteInfo}/siteinfo/`,
      tempData
    );
    console.log("test", response.data);
  };

  useEffect(() => {
    fetchData();
    if (siteinfo.isDraft) {
      getSiteinfoReportByCIDAndTicket();
    }
  }, []);

  return (
    <>
      <div className="lg:px-32 lg:py-5">
        <h1 className="py-3 px-5 font-bold shadow-sm shadow-black rounded-md">
          Home / Installation / New Install{" "}
          <span className="text-[#E5D283]">/ {siteinfo.cid}</span>
        </h1>
        <div className="px-5">
          <div className="bg-[#213555] text-white mt-5 flex justify-center gap-10 py-3 px-5 font-bold shadow-sm shadow-black rounded-md lg:text-2xl">
            <h1>
              CID : <span>{siteinfo.cid}</span>
            </h1>
            <h1>
              Ticket : <span>{siteinfo?.TicketInfoModel?.tkdt_ID}</span>
              <span>{siteinfo?.ticketInfoLTEModel?.tkdt_ID}</span>
              <span>{siteinfo?.ticketInfoKTBModel?.tkdt_ID}</span>
            </h1>
          </div>
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-3 py-4">
              {siteinfo.isComplete === true && (
                <>
                  <button className="bg-[#949494] text-white w-40 py-2 rounded-3xl hover:bg-neutral-500 focus:bg-[#1A16D3]">
                    Onsite Update
                  </button>
                  <button className="bg-[#949494] text-white w-40 py-2 rounded-3xl hover:bg-neutral-500 focus:bg-[#1A16D3]">
                    Replacement
                  </button>
                </>
              )}
            </div>
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
            {/* input content */}
            <div className="flex flex-col gap-5">
              {/* section-1 */}
              <TotalSiteInformation
                props={{
                  boxOne: boxOne,
                  setBoxOne: setBoxOne,
                  siteinfo: siteinfo,
                  register: register,
                  setValue,
                  errors,
                }}
              />
              {/* <Replacement boxOne={boxOne} setBoxOne={setBoxOne} /> */}
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
                    <div className="lg:grid lg:grid-cols-3 gap-5 text-center">
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="file-input"
                          className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                        >
                          <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                            <span className="text-8xl ">+</span>
                            <p>Upload Photo</p>
                          </div>
                        </label>
                        <input type="file" id="file-input" className="hidden" />
                        <p>รูปหน้าร้าน</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="file-input"
                          className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                        >
                          <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                            <span className="text-8xl ">+</span>
                            <p>Upload Photo</p>
                          </div>
                        </label>
                        <input type="file" id="file-input" className="hidden" />
                        <p>หน้าตู้/จุดวางอุปกรณ์</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="file-input"
                          className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                        >
                          <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                            <span className="text-8xl ">+</span>
                            <p>Upload Photo</p>
                          </div>
                        </label>
                        <input type="file" id="file-input" className="hidden" />
                        <p>ด้านข้างตู้(ซ้าย-ขวา)</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="file-input"
                          className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                        >
                          <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                            <span className="text-8xl ">+</span>
                            <p>Upload Photo</p>
                          </div>
                        </label>
                        <input type="file" id="file-input" className="hidden" />
                        <p>รูปอุปกรณ์/Serial</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="file-input"
                          className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                        >
                          <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                            <span className="text-8xl">+</span>
                            <p>Upload Photo</p>
                          </div>
                        </label>
                        <input type="file" id="file-input" className="hidden" />
                        <p>รูปอุปกรณ์/Serial</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label
                          htmlFor="file-input"
                          className="flex flex-col justify-center bg-white text-center font-semibold p-5 w-[300px] h-[300px] text-sky-700"
                        >
                          <div className="inline-block transition-transform transform origin-center hover:scale-125 active:scale-[0.8]">
                            <span className="text-8xl ">+</span>
                            <p>Upload Photo</p>
                          </div>
                        </label>
                        <input type="file" id="file-input" className="hidden" />
                        <p>หลังตู้/จุดวางอุปกรณ์</p>
                      </div>
                    </div>
                  </div>
                </AnimateHeight>
              </div>
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
                        <p>Office Departure :</p>
                        <p>Office Arrival :</p>
                        <p>Customer Site ETA :</p>
                        <p>Customer Site Arrival :</p>
                        <p>Customer Site Departure :</p>
                        <p>Working Start :</p>
                        <p>Working End :</p>
                      </div>
                      <div className="grid gap-3 lg:gap-2">
                        <div className="flex flex-col lg:flex-row lg:gap-3">
                          <input
                            type="date"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                          <input
                            type="time"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                        </div>
                        <div className="flex flex-col lg:flex-row  lg:gap-3">
                          <input
                            type="date"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                          <input
                            type="time"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                        </div>
                        <div className="flex flex-col lg:flex-row  lg:gap-3">
                          <input
                            type="date"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                          <input
                            type="time"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                        </div>
                        <div className="flex flex-col lg:flex-row  lg:gap-3">
                          <input
                            type="date"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                          <input
                            type="time"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                        </div>
                        <div className="flex flex-col lg:flex-row  lg:gap-3">
                          <input
                            type="date"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                          <input
                            type="time"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                        </div>
                        <div className="flex flex-col lg:flex-row  lg:gap-3">
                          <input
                            type="date"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                          <input
                            type="time"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                        </div>
                        <div className="flex flex-col lg:flex-row  lg:gap-3">
                          <input
                            type="date"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                          <input
                            type="time"
                            className="border-[1px] border-black rounded-lg p-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </div>
            <div className="flex justify-center gap-5 py-5">
              <button className="flex items-center text-red-500 gap-1 font-bold bg-red-200 px-3 w-28 h-12 rounded-xl hover:bg-red-300">
                <MdCancel className="h-6 w-7" /> Cancel
              </button>
              <button
                type="submit"
                className="flex items-center text-yellow-800 gap-1 font-bold bg-yellow-200 px-3 w-28 rounded-xl hover:bg-yellow-300"
              >
                <RiDraftFill className="h-6 w-7" />
                Draft
              </button>
              <button className="flex items-center text-green-800 gap-1 font-bold bg-green-200 px-3 w-28 rounded-xl hover:bg-green-300">
                <MdSave className="h-6 w-7" />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default TotalInputInstallation;
