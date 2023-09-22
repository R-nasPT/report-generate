/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimateHeight from "react-animate-height";
import TotalSiteInformation from "../component/TotalSiteInformation";
import Replacement from "../component/Replacement";
import axios from "axios";
import packageJson from "../../package.json";
import { useForm } from "react-hook-form";
import { RiArrowDownSLine, RiDraftFill } from "react-icons/ri";
import { MdCancel, MdSave } from "react-icons/md";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import LoadingPage from "../component/LoadingPage";

function TotalInputInstallation() {
  const [siteinfo, setSiteinfo] = useState([]);
  const [boxOne, setBoxOne] = useState(false);
  const [boxTwo, setBoxTwo] = useState(false);
  const [boxThree, setBoxThree] = useState(false);

  const [status, setStatus] = useState([]);
  const [update, setUpdate] = useState(0);
  const [imageList, setImageList] = useState([]);
  const userId = localStorage.getItem("id");
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors },
  } = useForm();

  console.log(update);

  const { id } = useParams();

  const getStatus = async () => {
    try {
      const response = await axios.get(
        `${packageJson.domain.ipSiteInfo}/siteinfo/checkstaus/${id}`
      );
      setStatus(response.data);
      if (response.data.isDraft === true) {
        getSiteinfoReportByCIDAndTicket(response.data);
      } else {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
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

      setValue(
        "connectionSimFirst",
        response.data.aisInfoModel?.aisConnectionServiceType
      );
      setValue("packageSimFirst", response.data.aisInfoModel?.simPackId);
      setValue("signalStrengthSimFirst", response.data.aisInfoModel?.aisSignal);
      setValue("averageSimFirst", response.data.aisInfoModel?.average);
      //-----SIM 2
      setValue("providerSimSecond", response.data.dtacInfoModel?.simProvider);
      setValue("callSimSecond", response.data.dtacInfoModel?.dtacCalling);
      setValue("apnSimSecond", response.data.dtacInfoModel?.dtacApnId);
      setValue("ipSimSecond", response.data.dtacInfoModel?.dtacIp);
      setValue("lacSimSecond", response.data.dtacInfoModel?.dtacLac);
      setValue("cellIdSimSecond", response.data.dtacInfoModel?.dtacCallId);
      setValue(
        "connectionSimSecond",
        response.data.dtacInfoModel?.dtacConnectionServiceType
      );
      setValue("packageSimSecond", response.data.dtacInfoModel?.simPackId);
      setValue(
        "signalStrengthSimSecond",
        response.data.dtacInfoModel?.dtacSignal
      );
      setValue("averageSimSecond", response.data.dtacInfoModel?.average);
      //----UPS
      setValue("upsType", response.data.actTestingInfoModel?.upsUseId);
      setValue("upsSN", response.data.upsInfoModel.serialNo);
      setValue("upsBrand", response.data.upsInfoModel.upsBrandId);
      setValue("upsModel", response.data.upsInfoModel.upsModelId);
      setValue("batteryStart", response.data.upsInfoModel.batteryStartDate);
      setValue("rate", response.data.upsInfoModel.kva);
      setValue("load", response.data.upsInfoModel.upsLoad);
      setValue("temperature", response.data.upsInfoModel.temperatureC);
      //----Other Information
      setValue(
        "Name1",
        response.data?.equipmentInfoDetailsModels[0]?.equipNameId
      );
      setValue(
        "Name2",
        response.data?.equipmentInfoDetailsModels[1]?.equipNameId
      );
      setValue(
        "Name3",
        response.data?.equipmentInfoDetailsModels[2]?.equipNameId
      );
      setValue(
        "Name4",
        response.data?.equipmentInfoDetailsModels[3]?.equipNameId
      );
      setValue(
        "Type1",
        response.data?.equipmentInfoDetailsModels[0]?.equipTypeId
      );
      setValue(
        "Type2",
        response.data?.equipmentInfoDetailsModels[1]?.equipTypeId
      );
      setValue(
        "Type3",
        response.data?.equipmentInfoDetailsModels[2]?.equipTypeId
      );
      setValue(
        "Type4",
        response.data?.equipmentInfoDetailsModels[3]?.equipTypeId
      );
      setValue(
        "Brand1",
        response.data?.equipmentInfoDetailsModels[0]?.equipBrandId
      );
      setValue(
        "Brand2",
        response.data?.equipmentInfoDetailsModels[1]?.equipBrandId
      );
      setValue(
        "Brand3",
        response.data?.equipmentInfoDetailsModels[2]?.equipBrandId
      );
      setValue(
        "Brand4",
        response.data?.equipmentInfoDetailsModels[3]?.equipBrandId
      );
      setValue("Serial1", response.data?.equipmentInfoDetailsModels[0]?.serial);
      setValue("Serial2", response.data?.equipmentInfoDetailsModels[1]?.serial);
      setValue("Serial3", response.data?.equipmentInfoDetailsModels[2]?.serial);
      setValue("Serial4", response.data?.equipmentInfoDetailsModels[3]?.serial);

      setValue("customerSiteETA", response.data.actTestingInfoModel?.cusETA);
      setValue("workingStart", response.data.actTestingInfoModel?.workStart);
      setValue("workingEnd", response.data.actTestingInfoModel?.workEnd);
      setValue(
        "officeDeparture",
        response.data.actTestingInfoModel?.officeDate
      );
      setValue(
        "customerSiteArrival",
        response.data.actTestingInfoModel?.cusArrival
      );
      setValue(
        "customerSiteDeparture",
        response.data.actTestingInfoModel?.cusDeparture
      );
      setValue(
        "officeArrival",
        response.data.actTestingInfoModel?.officeArrival
      );

      // setValue("note", response.data.otherInfoModel.antennaGain);

      setSiteinfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSiteinfoReportByCIDAndTicket = async (info) => {
    try {
      let data = {
        ticketId:
          info?.TicketInfoModel != null ? info.TicketInfoModel?.tkdt_ID : "",
        cid: info?.cid,
      };
      // console.log(data);
      const response = await axios.post(
        `${packageJson.domain.ipSiteInfo}/siteinfo/report/`,
        data
      );
      console.log("test", response.data);
      //Site Information
      setValue("stationId", response.data.rawData.siteInfo?.stationID);
      setValue("brand", response.data.rawData.siteInfo?.branch);
      setValue("address", response.data.rawData.siteInfo?.address);
      //Site Update
      setValue("contractName", response.data.rawData.siteUpdate?.contractName);
      setValue("tel", response.data.rawData.siteUpdate?.tel);
      setValue("GPSN", response.data.rawData.siteUpdate?.GPSN);
      setValue("GPSE", response.data.rawData.siteUpdate?.GPSE);
      // //-----Router Information
      setValue("routerModel", response.data.rawData.routerInfo?.routerModel);
      setValue("routerFW", response.data.rawData.routerInfo?.routerFW);
      setValue("routerSN", response.data.rawData.routerInfo?.routerSN);
      setValue("routerIp", response.data.rawData.routerInfo?.routerIp);
      setValue("subnetMask", response.data.rawData.routerInfo?.subnetMask);
      setValue("rackSN", response.data.rawData.routerInfo?.rackSN);
      setValue("antenaGain", response.data.rawData.routerInfo?.antenaGain);
      // //-----ATM Information
      setValue("atmbrand", response.data.rawData.atmInfo?.atmbrand);
      setValue("atmtype", response.data.rawData.atmInfo?.atmtype);
      setValue("atmIp", response.data.rawData.atmInfo?.atmIp);
      //-----SIM 1
      setValue("providerSimFirst", response.data.rawData.simFirst?.provider);
      setValue("callSimFirst", response.data.rawData.simFirst?.callSimFirst);
      setValue("apnSimFirst", response.data.rawData.simFirst?.apnSimFirst);
      setValue("ipSimFirst", response.data.rawData.simFirst?.ipSimFirst);
      setValue("lacSimFirst", response.data.rawData.simFirst?.lacSimFirst);
      setValue(
        "cellIdSimFirst",
        response.data.rawData.simFirst?.cellIdSimFirst
      );
      setValue(
        "switchOverSimFirst",
        response.data.rawData.simFirst?.switchOverSimFirst
      );
      //-----Test SIM 1
      if (status.customerModel?.cusGroupType === 1) {
        //-----Test SIM 1 ATM
        setValue(
          "connectionSimFirst",
          response.data.rawData?.testSimFirst?.connection
        );
        setValue(
          "packageSimFirst",
          response.data.rawData?.testSimFirst?.package
        );
        setValue(
          "signalStrengthSimFirst",
          response.data.rawData?.testSimFirst?.signalStrength
        );
        // Test SIM 2 ATM
        setValue(
          "connectionSimSecond",
          response.data.rawData?.testSimSecond?.connection
        );

        setValue(
          "packageSimSecond",
          response.data.rawData?.testSimSecond?.package
        );
        setValue(
          "signalStrengthSimSecond",
          response.data.rawData?.testSimSecond?.signalStrength
        );
      } else {
        //-----SIM 1 LTE
        setValue(
          "connectionSimFirst",
          response.data.rawData?.simFirst?.connection
        );
        setValue("packageSimFirst", response.data.rawData?.simFirst?.package);
        setValue(
          "signalStrengthSimFirst",
          response.data.rawData?.simFirst?.signalStrength
        );
        //-----SIM 2 LTE
        setValue(
          "connectionSimSecond",
          response.data.rawData?.simSecond?.connection
        );

        setValue("packageSimSecond", response.data.rawData?.simSecond?.package);
        setValue(
          "signalStrengthSimSecond",
          response.data.rawData?.simSecond?.signalStrength
        );
      }
      //-----Test SIM 1 ATM
      setValue(
        "pingingTestSimFirst",
        response.data.rawData?.testSimFirst.pingingTest
      );
      setValue("averageSimFirst", response.data.rawData?.testSimFirst?.average);
      setValue(
        "downloadSimFirst",
        response.data.rawData?.testSimFirst.download
      );
      setValue("UploadSimFirst", response.data.rawData?.testSimFirst.Upload);
      //-----Test SIM 2 ATM
      setValue(
        "pingingTestSimSecond",
        response.data.rawData?.testSimSecond?.pingingTest
      );
      setValue(
        "averageSimSecond",
        response.data.rawData?.testSimSecond?.average
      );
      setValue(
        "downloadSimSecond",
        response.data.rawData?.testSimSecond?.download
      );
      setValue("UploadSimSecond", response.data.rawData?.testSimSecond?.Upload);
      //-----SIM 2
      setValue("providerSimSecond", response.data.rawData?.simSecond?.provider);
      setValue(
        "callSimSecond",
        response.data.rawData?.simSecond?.callSimSecond
      );
      setValue("apnSimSecond", response.data.rawData?.simSecond?.apnSimSecond);
      setValue("ipSimSecond", response.data.rawData?.simSecond?.ipSimSecond);
      setValue("lacSimSecond", response.data.rawData?.simSecond?.lacSimSecond);
      setValue(
        "cellIdSimSecond",
        response.data.rawData?.simSecond?.cellIdSimSecond
      );
      setValue(
        "switchOverSimSecond",
        response.data.rawData?.simSecond.switchOverSimSecond
      );

      //----UPS
      setValue("upsType", response.data.rawData?.upsInfo?.upsType);
      setValue("upsSN", response.data.rawData?.upsInfo.upsSN);
      setValue("upsBrand", response.data.rawData?.upsInfo.upsBrand);
      setValue("upsModel", response.data.rawData?.upsInfo.upsModel);
      setValue("batteryStart", response.data.rawData?.upsInfo.batteryStart);
      setValue("rate", response.data.rawData?.upsInfo.rate);
      setValue("load", response.data.rawData?.upsInfo.load);
      setValue("temperature", response.data.rawData?.upsInfo.temperature);

      setValue("ln", response.data.rawData?.testUps.ln);
      setValue("lg", response.data.rawData?.testUps.lg);
      setValue("ng", response.data.rawData?.testUps.ng);
      setValue("bypassMode", response.data.rawData?.testUps.bypassMode);
      setValue("powerFailTest", response.data.rawData?.testUps.powerFailTest);
      setValue("commandTest", response.data.rawData?.testUps.commandTest);

      //Test SIM 1 Download
      setValue(
        "downloadAverageSimFirstDownload",
        response.data.rawData?.testSimFirst.downloadAverage
      );
      setValue(
        "pingingTestSimFirstDownload",
        response.data.rawData?.testSimFirst.pingingTest
      );
      setValue(
        "averageSimFirstDownload",
        response.data.rawData?.testSimFirst.average
      );
      setValue(
        "fileSize1SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[0]?.fileSize
      );
      setValue(
        "fileSize2SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[1].fileSize
      );
      setValue(
        "fileSize3SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[2].fileSize
      );
      setValue(
        "fileSize4SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[3].fileSize
      );
      setValue(
        "fileSize5SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[4].fileSize
      );
      setValue(
        "speed1SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[0]?.speed
      );
      setValue(
        "speed2SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[1].speed
      );
      setValue(
        "speed3SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[2].speed
      );
      setValue(
        "speed4SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[3].speed
      );
      setValue(
        "speed5SimFirstDownload",
        response.data.rawData?.testSimFirst?.test?.[4].speed
      );
      //Test Sim 1 Upload
      setValue(
        "downloadAverageSimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.downloadAverage
      );
      setValue(
        "pingingTestSimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.pingingTest
      );
      setValue(
        "averageSimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.average
      );
      setValue(
        "fileSize1SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[0]?.fileSize
      );
      setValue(
        "fileSize2SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[1].fileSize
      );
      setValue(
        "fileSize3SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[2].fileSize
      );
      setValue(
        "fileSize4SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[3].fileSize
      );
      setValue(
        "fileSize5SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[4].fileSize
      );
      setValue(
        "speed1SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[0]?.speed
      );
      setValue(
        "speed2SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[1].speed
      );
      setValue(
        "speed3SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[2].speed
      );
      setValue(
        "speed4SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[3].speed
      );
      setValue(
        "speed5SimFirstUpload",
        response.data.rawData?.testSimFirstUpload?.test?.[4].speed
      );
      //Test SIM 2 Download
      setValue(
        "downloadAverageSimSecondUpload",
        response.data.rawData?.testSimSecond?.downloadAverage
      );
      setValue(
        "pingingTestSimSecondUpload",
        response.data.rawData?.testSimSecond?.pingingTest
      );
      setValue(
        "averageSimSecondUpload",
        response.data.rawData?.testSimSecond?.average
      );
      setValue(
        "fileSize1SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[0]?.fileSize
      );
      setValue(
        "fileSize2SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[1].fileSize
      );
      setValue(
        "fileSize3SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[2].fileSize
      );
      setValue(
        "fileSize4SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[3].fileSize
      );
      setValue(
        "fileSize5SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[4].fileSize
      );
      setValue(
        "speed1SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[0]?.speed
      );
      setValue(
        "speed2SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[1].speed
      );
      setValue(
        "speed3SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[2].speed
      );
      setValue(
        "speed4SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[3].speed
      );
      setValue(
        "speed5SimSecondUpload",
        response.data.rawData?.testSimSecond?.test?.[4].speed
      );
      //Test SIM 2 Upload
      setValue(
        "downloadAverageSimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.downloadAverage
      );
      setValue(
        "pingingTestSimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.pingingTest
      );
      setValue(
        "averageSimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.average
      );
      setValue(
        "fileSize1SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[0]?.fileSize
      );
      setValue(
        "fileSize2SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[1].fileSize
      );
      setValue(
        "fileSize3SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[2].fileSize
      );
      setValue(
        "fileSize4SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[3].fileSize
      );
      setValue(
        "fileSize5SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[4].fileSize
      );
      setValue(
        "speed1SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[0]?.speed
      );
      setValue(
        "speed2SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[1].speed
      );
      setValue(
        "speed3SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[2].speed
      );
      setValue(
        "speed4SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[3].speed
      );
      setValue(
        "speed5SimSecondUpload",
        response.data.rawData?.testSimSecondUpload?.test?.[4].speed
      );

      setValue(
        "testSimFirstOther",
        response.data.rawData?.testSimFirstOther?.simtype
      );
      setValue(
        "testSimSecondOther",
        response.data.rawData?.testSimSecondOther?.simtype
      );
      // //----Other Information
      setValue("Name1", response.data.rawData?.otherInfo?.[0]?.name);
      setValue("Name2", response.data.rawData?.otherInfo?.[1]?.name);
      setValue("Name3", response.data.rawData?.otherInfo?.[2]?.name);
      setValue("Name4", response.data.rawData?.otherInfo?.[3]?.name);
      setValue("Type1", response.data.rawData?.otherInfo?.[0]?.type);
      setValue("Type2", response.data.rawData?.otherInfo?.[1]?.type);
      setValue("Type3", response.data.rawData?.otherInfo?.[2]?.type);
      setValue("Type4", response.data.rawData?.otherInfo?.[3]?.type);
      setValue("Brand1", response.data.rawData?.otherInfo?.[0]?.brand);
      setValue("Brand2", response.data.rawData?.otherInfo?.[1]?.brand);
      setValue("Brand3", response.data.rawData?.otherInfo?.[2]?.brand);
      setValue("Brand4", response.data.rawData?.otherInfo?.[3]?.brand);
      setValue("Serial1", response.data.rawData?.otherInfo?.[0]?.serial);
      setValue("Serial2", response.data.rawData?.otherInfo?.[1]?.serial);
      setValue("Serial3", response.data.rawData?.otherInfo?.[2]?.serial);
      setValue("Serial4", response.data.rawData?.otherInfo?.[3]?.serial);

      setValue(
        "customerSiteETA",
        response.data.rawData?.workingTime?.customerSiteETA
      );
      setValue(
        "workingStart",
        response.data.rawData?.workingTime?.workingStart
      );
      setValue("workingEnd", response.data.rawData?.workingTime?.workingEnd);
      setValue(
        "officeDeparture",
        response.data.rawData?.workingTime?.officeDeparture
      );
      setValue(
        "customerSiteArrival",
        response.data.rawData?.workingTime?.customerSiteArrival
      );
      setValue(
        "customerSiteDeparture",
        response.data.rawData?.workingTime?.customerSiteDeparture
      );
      setValue(
        "officeArrival",
        response.data.rawData?.workingTime?.officeArrival
      );
      setValue("note", response.data.rawData?.note);
      // response.data.fileInfo.forEach((file) => {
      //   setImageList(...imageList, {file});
      // });
      console.log(response.data.fileInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (data) => {
    // console.log(data);
    if (update === 1) {
      let tempData = undefined;
      if (status.customerModel.cusGroupType === 1) {
        tempData = {
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
            customerSiteETA: data.customerSiteETA,
            workingStart: data.workingStart,
            workingEnd: data.workingEnd,
            officeDeparture: data.officeDeparture,
            officeArrival: data.officeArrival,
            customerSiteArrival: data.customerSiteArrival,
            customerSiteDeparture: data.customerSiteDeparture,
          },
          note: data.note,
          cid: status.cid,
          ticketId: status.TicketInfoModel?.tkdt_ID,
          userId: userId,
          action: "INS",
        };
      } else {
        tempData = {
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
            connection: data.connectionSimFirst,
            package: data.packageSimFirst,
            signalStrength: data.signalStrengthSimFirst,
            switchOverSimFirst: data.switchOverSimFirst,
          },
          testSimFirst: {
            downloadAverage: data.downloadAverageSimFirstDownload,
            pingingTest: data.pingingTestSimFirstDownload,
            average: data.averageSimFirstDownload,
            test: [
              {
                fileSize: data.fileSize1SimFirstDownload,
                speed: data.speed1SimFirstDownload,
              },
              {
                fileSize: data.fileSize2SimFirstDownload,
                speed: data.speed2SimFirstDownload,
              },
              {
                fileSize: data.fileSize3SimFirstDownload,
                speed: data.speed3SimFirstDownload,
              },
              {
                fileSize: data.fileSize4SimFirstDownload,
                speed: data.speed4SimFirstDownload,
              },
              {
                fileSize: data.fileSize5SimFirstDownload,
                speed: data.speed5SimFirstDownload,
              },
            ],
          },
          simSecond: {
            provider: data.providerSimSecond,
            callSimSecond: data.callSimSecond,
            apnSimSecond: data.apnSimSecond,
            ipSimSecond: data.ipSimSecond,
            lacSimSecond: data.lacSimSecond,
            cellIdSimSecond: data.cellIdSimSecond,
            connection: data.connectionSimSecond,
            package: data.packageSimSecond,
            signalStrength: data.signalStrengthSimSecond,
            switchOverSimSecond: data.switchOverSimSecond,
          },
          testSimSecond: {
            downloadAverage: data.downloadAverageSimSecondDownload,
            pingingTest: data.pingingTestSimSecondDownload,
            average: data.averageSimSecondDownload,
            test: [
              {
                fileSize: data.fileSize1SimSecondDownload,
                speed: data.speed1SimSecondDownload,
              },
              {
                fileSize: data.fileSize2SimSecondDownload,
                speed: data.speed2SimSecondDownload,
              },
              {
                fileSize: data.fileSize3SimSecondDownload,
                speed: data.speed3SimSecondDownload,
              },
              {
                fileSize: data.fileSize4SimSecondDownload,
                speed: data.speed4SimSecondDownload,
              },
              {
                fileSize: data.fileSize5SimSecondDownload,
                speed: data.speed5SimSecondDownload,
              },
            ],
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
          testSimFirstUpload: {
            downloadAverage: data.downloadAverageSimFirstUpload,
            pingingTest: data.pingingTestSimFirstUpload,
            average: data.averageSimFirstUpload,
            test: [
              {
                fileSize: data.fileSize1SimFirstUpload,
                speed: data.speed1SimFirstUpload,
              },
              {
                fileSize: data.fileSize2SimFirstUpload,
                speed: data.speed2SimFirstUpload,
              },
              {
                fileSize: data.fileSize3SimFirstUpload,
                speed: data.speed3SimFirstUpload,
              },
              {
                fileSize: data.fileSize4SimFirstUpload,
                speed: data.speed4SimFirstUpload,
              },
              {
                fileSize: data.fileSize5SimFirstUpload,
                speed: data.speed5SimFirstUpload,
              },
            ],
          },
          testSimSecondUpload: {
            downloadAverage: data.downloadAverageSimSecondUpload,
            pingingTest: data.pingingTestSimSecondUpload,
            average: data.averageSimSecondUpload,
            test: [
              {
                fileSize: data.fileSize1SimSecondUpload,
                speed: data.speed1SimSecondUpload,
              },
              {
                fileSize: data.fileSize2SimSecondUpload,
                speed: data.speed2SimSecondUpload,
              },
              {
                fileSize: data.fileSize3SimSecondUpload,
                speed: data.speed3SimSecondUpload,
              },
              {
                fileSize: data.fileSize4SimSecondUpload,
                speed: data.speed4SimSecondUpload,
              },
              {
                fileSize: data.fileSize5SimSecondUpload,
                speed: data.speed5SimSecondUpload,
              },
            ],
          },
          testSimSecondOther: {
            simtype: data.sim1,
            data: [
              {
                name: data.sim1name1,
                pass: data.sim1no1,
              },
              {
                name: data.sim1name2,
                pass: data.sim1no2,
              },
              {
                name: data.sim1name3,
                pass: data.sim1no3,
              },
              {
                name: data.sim1name4,
                pass: data.sim1no4,
              },
              {
                name: data.sim1name5,
                pass: data.sim1no5,
              },
              {
                name: data.sim1name6,
                pass: data.sim1no6,
              },
              {
                name: data.sim1name7,
                pass: data.sim1no7,
              },
              {
                name: data.sim1name8,
                pass: data.sim1no8,
              },
            ],
          },
          testSimFirstOther: {
            simtype: data.sim2,
            data: [
              {
                name: data.sim2name1,
                pass: data.sim2no1,
              },
              {
                name: data.sim2name2,
                pass: data.sim2no2,
              },
              {
                name: data.sim2name3,
                pass: data.sim2no3,
              },
              {
                name: data.sim2name4,
                pass: data.sim2no4,
              },
              {
                name: data.sim2name5,
                pass: data.sim2no5,
              },
              {
                name: data.sim2name6,
                pass: data.sim2no6,
              },
              {
                name: data.sim2name7,
                pass: data.sim2no7,
              },
              {
                name: data.sim2name8,
                pass: data.sim2no8,
              },
            ],
          },
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
            customerSiteETA: data.customerSiteETA,
            workingStart: data.workingStart,
            workingEnd: data.workingEnd,
          },
          note: data.note,
          cid: status.cid,
          ticketId: status.TicketInfoModel
            ? status.TicketInfoModel?.tkdt_ID
            : "",
          userId: userId,
          action: "INS",
        };
      }
      const response = await axios.post(
        `${packageJson.domain.ipSiteInfo}/siteinfo/`,
        tempData
      );
      console.log("test", response.data);
    } else {
      let tempData = {
        ticketId: status.TicketInfoModel ? status.TicketInfoModel?.tkdt_ID : "",
        cid: status.cid,
      };
      const response = await axios.post(
        `${packageJson.domain.ipSiteInfo}/siteinfo/updatesiteinfo`,
        tempData
      );
    }
  };
  const handleFilePicUpload = (e, queue, name) => {
    console.log("file", queue);
    console.log("file", name);
    console.log(imageList);
    if (e.target.files[0]) {
      console.log("file", e.target.files[0]);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <>
      <div className="lg:px-32 lg:py-5">
        <h1 className="py-3 px-5 font-bold shadow-sm shadow-black rounded-md">
          Home / Installation / New Install{" "}
          <span className="text-[#E5D283]">/ {status.cid}</span>
        </h1>
        <div className="px-5">
          <div className="bg-[#213555] text-white mt-5 flex justify-center gap-10 py-3 px-5 font-bold shadow-sm shadow-black rounded-md lg:text-2xl">
            <h1>
              CID : <span>{status.cid}</span>
            </h1>
            <h1>
              Ticket : <span>{status?.TicketInfoModel?.tkdt_ID}</span>
              <span>{status?.ticketInfoLTEModel?.tkdt_ID}</span>
              <span>{status?.ticketInfoKTBModel?.tkdt_ID}</span>
            </h1>
          </div>
          <div className="flex justify-between items-center p-3">
            <div className="flex gap-3 py-1">
              {status.isComplete === true && (
                <>
                  <button className="bg-[#949494] text-white w-40 py-2 rounded-3xl hover:bg-neutral-500 focus:bg-[#1A16D3]">
                    Onsite Update
                  </button>
                  <button className="bg-[#949494] text-white w-40 py-2 rounded-3xl hover:bg-neutral-500 focus:bg-[#1A16D3]">
                    Replacement
                  </button>
                </>
              )}
              <Link
                to="/user/pdfcus"
                className="flex gap-2 items-center w-24 px-2 py-2 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-100"
              >
                <BsFillFileEarmarkPdfFill className="w-5 h-5" />
                <p>Cus.</p>
              </Link>
              <Link
                to="/user/pdflte"
                className="flex gap-2 items-center w-24 px-2 py-2 bg-white text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-100"
              >
                <BsFillFileEarmarkPdfFill className="w-5 h-5" />
                <p>Onsite</p>
              </Link>
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
                  status,
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
                        <input
                          type="file"
                          id="file-input"
                          className="hidden"
                          onChange={(e) =>
                            handleFilePicUpload(e, 1, "storefront")
                          }
                        />
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
                        {status.customerModel?.cusGroupType === 1 && (
                          <>
                            <p>Office Departure :</p>
                            <p>Office Arrival :</p>
                            <p>Customer Site Arrival :</p>
                            <p>Customer Site Departure :</p>
                          </>
                        )}
                        <p>Customer Site ETA :</p>
                        <p>Working Start :</p>
                        <p>Working End :</p>
                      </div>
                      <div className="grid gap-3 lg:gap-2">
                        {status.customerModel?.cusGroupType === 1 && (
                          <>
                            <input
                              type="datetime-local"
                              className="border-[1px] border-black rounded-lg p-1"
                              {...register("officeDeparture")}
                            />
                            <div className="flex flex-col lg:flex-row  lg:gap-3">
                              <input
                                type="datetime-local"
                                className="border-[1px] border-black rounded-lg p-1"
                                {...register("officeArrival")}
                              />
                            </div>
                            <input
                              type="datetime-local"
                              className="border-[1px] border-black rounded-lg p-1"
                              {...register("customerSiteArrival")}
                            />
                            <input
                              type="datetime-local"
                              className="border-[1px] border-black rounded-lg p-1"
                              {...register("customerSiteDeparture")}
                            />
                          </>
                        )}
                        <input
                          type="datetime-local"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("customerSiteETA")}
                        />

                        <input
                          type="datetime-local"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("workingStart")}
                        />

                        <input
                          type="datetime-local"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("workingEnd")}
                        />
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
                className={`flex items-center gap-1 font-bold px-3 w-28 rounded-xl  ${
                  status.isComplete
                    ? "bg-slate-300 opacity-50 cursor-no-drop"
                    : "bg-yellow-200 hover:bg-yellow-300 text-yellow-800"
                }`}
                type="submit"
                disabled={status.isComplete}
                onClick={() => setUpdate(1)}
              >
                <RiDraftFill className="h-6 w-7" />
                Draft
              </button>
              <button
                className={`flex items-center gap-1 font-bold px-3 w-28 rounded-xl ${
                  status.isComplete
                    ? "bg-slate-300 opacity-50 cursor-no-drop"
                    : "bg-green-200 hover:bg-green-300 text-green-800"
                }`}
                type="submit"
                disabled={status.isComplete}
                onClick={() => setUpdate(2)}
              >
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
