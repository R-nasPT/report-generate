import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { RiArrowDownSLine } from "react-icons/ri";
import packageJson from "../../package.json";
import axios from "axios";
function TotalSiteInformation({ props }) {
  const { boxOne, setBoxOne, siteinfo, register, setValue, errors } = props;
  const [equipmentType, setEquipmentType] = useState([]);
  const [equipmentName, setEquipmentName] = useState([]);
  const [equipmentBrand, setEquipmentBrand] = useState([]);
  const [router, setRouter] = useState([]);
  const [provider, setProvider] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [atmBrand, setAtmBrand] = useState([]);
  const [atmDeviceType, setAtmDeviceType] = useState([]);
  const [atmType, setAtmType] = useState([]);
  const [apn, setAPN] = useState([]);
  const [upsType, setUpsType] = useState([]);

  const equipmentTypeList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/equipment/equiptype`
    );
    setEquipmentType(response.data);
  };
  const equipmentNameList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/equipment/equipname`
    );
    setEquipmentName(response.data);
  };
  const equipmentBrandList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/equipment/equipbrand`
    );
    setEquipmentBrand(response.data);
  };
  const routerModelList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/router/producttype`
    );
    // console.log(response.data);
    // setEquipmentBrand(response.data);
    setRouter(response.data);
  };
  const providerList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/provider/provider`
    );
    // console.log(response.data);
    setProvider(response.data);
  };
  const packageList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/package/package`
    );
    // console.log(response.data);
    setPackageData(response.data);
  };
  const atmBrandList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/atminfo/atmbrand`
    );
    // console.log(response.data);
    setAtmBrand(response.data);
  };
  const atmDeviceTypeList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/atminfo/atmdevicetype`
    );
    console.log(response.data);
  };
  const atmTypeList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/atminfo/atmtype`
    );
    // console.log(response.data);
    setAtmType(response.data);
  };
  const apnList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/apn/apn`
    );
    // console.log(response.data);
    setAPN(response.data);
  };
  const uspTypeList = async () => {
    const response = await axios.get(
      `${packageJson.domain.ipSiteInfo}/upsusetype/upsusetype`
    );
    console.log(response.data);
    setUpsType(response.data);
  };

  useEffect(() => {
    equipmentTypeList();
    equipmentNameList();
    equipmentBrandList();
    routerModelList();
    providerList();
    packageList();
    atmBrandList();
    uspTypeList();
    atmTypeList();
    apnList();
  }, []);
  return (
    <>
      <div className="bg-[#F0F0F0] p-3 rounded-md">
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
          <div className="lg:grid lg:grid-cols-2 p-3 gap-5">
            {/* box-1 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                Site Information
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                <div className="flex flex-col gap-5 text-right font-bold">
                  <p>Station ID :</p>
                  <p>Branch :</p>
                  <p>Address :</p>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    // value={siteinfo.atmModel.stationId}
                    {...register("stationId")}
                  />
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("brand")}
                  />
                  <textarea
                    cols="23"
                    rows="3"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("address")}
                  ></textarea>
                </div>
              </div>
            </div>
            {/* box-2 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                Site Update
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                <div className="flex flex-col gap-5 text-right font-bold">
                  <p>Contact Name :</p>
                  <p>Tel :</p>
                  <p>GPS N :</p>
                  <p>GPS E :</p>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("contractName")}
                  />
                  <input
                    type="tel"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("tel")}
                  />
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("GPSN", {
                      pattern: /^(-?[0-9.]*$)/,
                    })}
                  />
                  {errors.GPSN && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("GPSE", {
                      pattern: /^(-?[0-9.]*$)/,
                    })}
                  />
                  {errors.GPSE && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                </div>
              </div>
            </div>
            {/* box-3 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                Router Information
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                <div className="flex flex-col gap-5 text-right font-bold">
                  <p>Router Model :</p>
                  <p>Router F/W :</p>
                  <p>Router S/N :</p>
                  <p>Router IP :</p>
                  <p>SubnetMask :</p>
                  <p>Rack S/N :</p>
                  <p>Antenna Gain :</p>
                </div>
                <div className="flex flex-col gap-6 lg:gap-2">
                  <select
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("routerModel")}
                  >
                    {router.map((item) => (
                      <option
                        value={item.productTypeId}
                        className="text-center"
                      >
                        {item.productTypeName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("routerFW")}
                  />
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("routerSN")}
                  />
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("routerIp", {
                      pattern: /^[0-9.]*$/,
                    })}
                  />
                  {errors.routerIp && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("subnetMask", {
                      pattern: /^[0-9.]*$/,
                    })}
                  />
                  {errors.subnetMask && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("rackSN")}
                  />
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("antenaGain")}
                  />
                </div>
              </div>
            </div>
            {/* box-4 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                ATM Information
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                <div className="flex flex-col gap-5 text-right font-bold">
                  <p>ATM Brand :</p>
                  <p>ATM Type :</p>
                  <p>ATM IP :</p>
                </div>
                <div className="flex flex-col gap-10 lg:gap-2">
                  <select
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("atmbrand")}
                  >
                    {atmBrand.map((item) => (
                      <option value={item.atmBrandId} className="text-center">
                        {item.atmBrandName}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("atmtype")}
                  >
                    {atmType.map((item) => (
                      <option value={item.atmTypeId} className="text-center">
                        {item.atmTypeName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("atmIp", {
                      pattern: /^[0-9.]*$/,
                    })}
                  />
                  {errors.atmIp && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                </div>
              </div>
            </div>
            {siteinfo.customerModel?.cusGroupType === 1 && (
              <>
                {/* box-5 */}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    SIM 1
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                    <div className="grid gap-5 text-right font-bold">
                      <p>Main SIM :</p>
                      <p>Call No :</p>
                      <p>APN :</p>
                      <p>Call IP :</p>
                      <p>LAC :</p>
                      <p>Cell ID :</p>
                      <p>Switch Over :</p>
                    </div>
                    <div className="grid gap-4 lg:gap-2">
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("providerSimFirst")}
                      >
                        {provider.map((item) => (
                          <option
                            value={item.providerId}
                            className="text-center"
                          >
                            {item.providerName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("callSimFirst", {
                          pattern: /^[0-9.]*$/,
                        })}
                      />
                      {errors.callSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("apnSimFirst")}
                      >
                        {apn.map((item) => (
                          <option value={item.apnId} className="text-center">
                            {item.apnName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("ipSimFirst", {
                          pattern: /^[0-9.]*$/,
                        })}
                      />
                      {errors.ipSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("lacSimFirst")}
                      />
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("cellIdSimFirst")}
                      />
                      <label className="flex p-2 gap-3 items-center">
                        <input
                          type="checkbox"
                          className="h-6 w-6"
                          value={true}
                          {...register("switchOverSimFirst")}
                        />
                        <span>Complete</span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* box-6 */}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    Test SIM 1
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                    <div className="flex flex-col gap-7 lg:gap-5 text-right font-bold">
                      <p>Connection :</p>
                      <p>Package :</p>
                      <p>Signal Strength :</p>
                      <p>Pinging Test :</p>
                      <p>Average :</p>
                      <p>Download :</p>
                      <p>Upload :</p>
                    </div>
                    <div className="flex flex-col gap-5 lg:gap-2">
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("connectionSimFirst")}
                      />
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("packageSimFirst")}
                      >
                        {packageData.map((item) => (
                          <option
                            value={item.packageId}
                            className="text-center"
                          >
                            {item.packageName}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("signalStrengthSimFirst", {
                            pattern: /^(-?[0-9.]*$)/,
                          })}
                        />
                        <span>
                          dBm(
                          <span className="text-red-500 font-bold">
                            &gt;-91dbm
                          </span>
                          )
                        </span>
                      </div>
                      {errors.signalStrengthSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("pingingTestSimFirst", {
                            min: 0,
                            max: 100,
                            pattern: /^[0-9]*$/,
                          })}
                        />
                        % Success
                      </div>
                      {errors.pingingTestSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลข 0-100
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("averageSimFirst", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          ms(
                          <span className="text-red-500 font-bold">
                            &lt;400 ms
                          </span>
                          )
                        </span>
                      </div>
                      {errors.averageSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("downloadSimFirst", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &gt;512 kbps
                          </span>
                          )
                        </span>
                      </div>
                      {errors.downloadSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("UploadSimFirst", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &gt;512 kbps
                          </span>
                          )
                        </span>
                      </div>
                      {errors.UploadSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* box-7 */}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    SIM 2
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 pl-5 rounded-xl">
                    <div className="grid gap-5 text-right font-bold">
                      <p>Main SIM :</p>
                      <p>Call No :</p>
                      <p>APN :</p>
                      <p>Call IP :</p>
                      <p>LAC :</p>
                      <p>Cell ID :</p>
                      <p>Switch Over :</p>
                    </div>
                    <div className="grid gap-5 lg:gap-2">
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("providerSimSecond")}
                      >
                        {provider.map((item) => (
                          <option
                            value={item.providerId}
                            className="text-center"
                          >
                            {item.providerName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("callSimSecond", {
                          pattern: /^[0-9]*$/,
                        })}
                      />
                      {errors.callSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("apnSimSecond")}
                      >
                        {apn.map((item) => (
                          <option value={item.apnId} className="text-center">
                            {item.apnName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("ipSimSecond", {
                          pattern: /^[0-9.]*$/,
                        })}
                      />
                      {errors.ipSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("lacSimSecond")}
                      />

                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("cellIdSimSecond")}
                      />
                      <label className="flex p-2 gap-3 items-center">
                        <input
                          type="checkbox"
                          value={true}
                          className="h-6 w-6"
                          {...register("switchOverSimSecond")}
                        />
                        <span>Complete</span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* box-8 */}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    Test SIM 2
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                    <div className="flex flex-col gap-5 text-right font-bold">
                      <p>Connection :</p>
                      <p>Package :</p>
                      <p>Signal Strength :</p>
                      <p>Pinging Test :</p>
                      <p>Average :</p>
                      <p>Download :</p>
                      <p>Upload :</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("connectionSimSecond")}
                      />
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("packageSimSecond")}
                      >
                        {packageData.map((item) => (
                          <option
                            value={item.packageId}
                            className="text-center"
                          >
                            {item.packageName}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("signalStrengthSimSecond", {
                            pattern: /^(-?[0-9.]*$)/,
                          })}
                        />
                        <span>
                          dBm(
                          <span className="text-red-500 font-bold">
                            &gt;-91dbm
                          </span>
                          )
                        </span>
                      </div>
                      {errors.signalStrengthSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("pingingTestSimSecond", {
                            min: 0,
                            max: 100,
                            pattern: /^[0-9]*$/,
                          })}
                        />
                        % Success
                      </div>
                      {errors.pingingTestSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลข 0-100 เท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("averageSimSecond", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          ms(
                          <span className="text-red-500 font-bold">
                            &lt;400 ms
                          </span>
                          )
                        </span>
                      </div>
                      {errors.averageSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("downloadSimSecond", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &gt;512 kbps
                          </span>
                          )
                        </span>
                      </div>
                      {errors.downloadSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("UploadSimSecond", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &gt;512 kbps
                          </span>
                          )
                        </span>
                      </div>
                      {errors.UploadSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {siteinfo.customerModel?.cusGroupType === 2 && (
              <>
                {/*------ LTE Box-1 --------*/}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    SIM 1
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                    <div className="grid gap-5 text-right font-bold">
                      <p>Main SIM :</p>
                      <p>Call No :</p>
                      <p>APN :</p>
                      <p>Call IP :</p>
                      <p>LAC :</p>
                      <p>Cell ID :</p>
                      <p>Connection :</p>
                      <p>Signal Strength :</p>
                      <p>Package :</p>
                      <p>Switch Over :</p>
                    </div>
                    <div className="grid gap-2">
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("providerSimFirst")}
                      >
                        {provider.map((item) => (
                          <option
                            value={item.providerId}
                            className="text-center"
                          >
                            {item.providerName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("callSimFirst", {
                          pattern: /^[0-9.]*$/,
                        })}
                      />
                      {errors.callSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("apnSimFirst")}
                      >
                        {apn.map((item) => (
                          <option value={item.apnId} className="text-center">
                            {item.apnName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("ipSimFirst")}
                      />
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("lacSimFirst")}
                      />
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("cellIdSimFirst")}
                      />
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("connectionSimFirst")}
                      />
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("signalStrengthSimFirst", {
                            pattern: /^(-?[0-9.]*$)/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &gt;-91dbm
                          </span>
                          )
                        </span>
                      </div>
                      {errors.signalStrengthSimFirst && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("packageSimFirst")}
                      >
                        {packageData.map((item) => (
                          <option
                            value={item.packageId}
                            className="text-center"
                          >
                            {item.packageName}
                          </option>
                        ))}
                      </select>
                      <label className="flex p-1 gap-3 items-center">
                        <input
                          type="checkbox"
                          className="h-6 w-6"
                          value={true}
                          {...register("switchOverSimFirst")}
                        />
                        <span>Complete</span>
                      </label>
                    </div>
                  </div>
                </div>
                {/*------ LTE Box-2 --------*/}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    SIM 2
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                    <div className="grid gap-5 text-right font-bold">
                      <p>Main SIM :</p>
                      <p>Call No :</p>
                      <p>APN :</p>
                      <p>Call IP :</p>
                      <p>LAC :</p>
                      <p>Cell ID :</p>
                      <p>Connection :</p>
                      <p>Signal Strength :</p>
                      <p>Package :</p>
                      <p>Switch Over :</p>
                    </div>
                    <div className="grid gap-2">
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("providerSimSecond")}
                      >
                        {provider.map((item) => (
                          <option
                            value={item.providerId}
                            className="text-center"
                          >
                            {item.providerName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("callSimSecond", {
                          pattern: /^[0-9.]*$/,
                        })}
                      />
                      {errors.callSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("apnSimSecond")}
                      >
                        {apn.map((item) => (
                          <option value={item.apnId} className="text-center">
                            {item.apnName}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("ipSimSecond")}
                      />
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("lacSimSecond")}
                      />
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("cellIdSimSecond")}
                      />
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("connectionSimSecond")}
                      />
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("signalStrengthSimSecond", {
                            pattern: /^(-?[0-9.]*$)/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &gt;-91dbm
                          </span>
                          )
                        </span>
                      </div>
                      {errors.signalStrengthSimSecond && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <select
                        className="border-[1px] border-black rounded-lg p-1"
                        {...register("packageSimSecond")}
                      >
                        {packageData.map((item) => (
                          <option
                            value={item.packageId}
                            className="text-center"
                          >
                            {item.packageName}
                          </option>
                        ))}
                      </select>
                      <label className="flex p-1 gap-3 items-center">
                        <input
                          type="checkbox"
                          className="h-6 w-6"
                          value={true}
                          {...register("switchOverSimSecond")}
                        />
                        <span>Complete</span>
                      </label>
                    </div>
                  </div>
                </div>
                {/*------ LTE Box-3 --------*/}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    Test SIM 1 Download
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                    <div className="grid gap-5 text-right font-bold">
                      <p>Test 1 :</p>
                      <p>Test 2 :</p>
                      <p>Test 3 :</p>
                      <p>Test 4 :</p>
                      <p>Test 5 :</p>
                      <p>Download Average :</p>
                      <p>Pinging Test :</p>
                      <p>Average :</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize1SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed1SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize1SimFirstDownload ||
                        errors.speed1SimFirstDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize2SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed2SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize2SimFirstDownload ||
                        errors.speed2SimFirstDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize3SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed3SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize3SimFirstDownload ||
                        errors.speed3SimFirstDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize4SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed4SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize4SimFirstDownload ||
                        errors.speed4SimFirstDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize5SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed5SimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize5SimFirstDownload ||
                        errors.speed5SimFirstDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("downloadAverageSimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {errors.downloadAverageSimFirstDownload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("pingingTestSimFirstDownload", {
                            min: 0,
                            max: 100,
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>% Success</span>
                      </div>
                      {errors.pingingTestSimFirstDownload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลข 0-100 เท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("averageSimFirstDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &lt;400 ms
                          </span>
                          )
                        </span>
                      </div>
                      {errors.averageSimFirstDownload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/*------ LTE Box-4 --------*/}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    Test SIM 1 Upload
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                    <div className="grid gap-5 text-right font-bold">
                      <p>Test 1 :</p>
                      <p>Test 2 :</p>
                      <p>Test 3 :</p>
                      <p>Test 4 :</p>
                      <p>Test 5 :</p>
                      <p>Download Average :</p>
                      <p>Pinging Test :</p>
                      <p>Average :</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize1SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed1SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize1SimFirstUpload ||
                        errors.speed1SimFirstUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize2SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed2SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize2SimFirstUpload ||
                        errors.speed2SimFirstUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize3SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed3SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize3SimFirstUpload ||
                        errors.speed3SimFirstUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize4SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed4SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize4SimFirstUpload ||
                        errors.speed4SimFirstUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize5SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed5SimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize5SimFirstUpload ||
                        errors.speed5SimFirstUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("UploadAverageSimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {errors.UploadAverageSimFirstUpload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("pingingTestSimFirstUpload", {
                            min: 0,
                            max: 100,
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>% Success</span>
                      </div>
                      {errors.pingingTestSimFirstUpload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลข 0-100 เท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("averageSimFirstUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &lt;400 ms
                          </span>
                          )
                        </span>
                      </div>
                      {errors.averageSimFirstUpload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/*------ LTE Box-5 --------*/}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    Test SIM 2 Download
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                    <div className="grid gap-5 text-right font-bold">
                      <p>Test 1 :</p>
                      <p>Test 2 :</p>
                      <p>Test 3 :</p>
                      <p>Test 4 :</p>
                      <p>Test 5 :</p>
                      <p>Download Average :</p>
                      <p>Pinging Test :</p>
                      <p>Average :</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize1SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed1SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize1SimSecondDownload ||
                        errors.speed1SimSecondDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize2SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed2SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize2SimSecondDownload ||
                        errors.speed2SimSecondDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize3SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed3SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize3SimSecondDownload ||
                        errors.speed3SimSecondDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize4SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed4SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize4SimSecondDownload ||
                        errors.speed4SimSecondDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize5SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed5SimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize5SimSecondDownload ||
                        errors.speed5SimSecondDownload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("downloadAverageSimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {errors.downloadAverageSimSecondDownload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("pingingTestSimSecondDownload", {
                            min: 0,
                            max: 100,
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>% Success</span>
                      </div>
                      {errors.pingingTestSimSecondDownload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลข 0-100 เท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("averageSimSecondDownload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &lt;400 ms
                          </span>
                          )
                        </span>
                      </div>
                      {errors.averageSimSecondDownload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/*------ LTE Box-6 --------*/}
                <div>
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    Test SIM 2 Upload
                  </h1>
                  <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                    <div className="grid gap-5 text-right font-bold">
                      <p>Test 1 :</p>
                      <p>Test 2 :</p>
                      <p>Test 3 :</p>
                      <p>Test 4 :</p>
                      <p>Test 5 :</p>
                      <p>Download Average :</p>
                      <p>Pinging Test :</p>
                      <p>Average :</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize1SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed1SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize1SimSecondUpload ||
                        errors.speed1SimSecondUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize2SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed2SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize2SimSecondUpload ||
                        errors.speed2SimSecondUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize3SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed3SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize3SimSecondUpload ||
                        errors.speed3SimSecondUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize4SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed4SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize4SimSecondUpload ||
                        errors.speed4SimSecondUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <span>File size</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-12"
                          {...register("fileSize5SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>Mb</span>
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1 w-14"
                          {...register("speed5SimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {(errors.fileSize5SimSecondUpload ||
                        errors.speed5SimSecondUpload) && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("UploadAverageSimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>mbps</span>
                      </div>
                      {errors.UploadAverageSimSecondUpload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("pingingTestSimSecondUpload", {
                            min: 0,
                            max: 100,
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>% Success</span>
                      </div>
                      {errors.pingingTestSimSecondUpload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลข 0-100 เท่านั้น
                        </p>
                      )}
                      <div className="flex flex-wrap lg:gap-3 items-center">
                        <input
                          type="text"
                          className="border-[1px] border-black rounded-lg p-1"
                          {...register("averageSimSecondUpload", {
                            pattern: /^[0-9.]*$/,
                          })}
                        />
                        <span>
                          mbps(
                          <span className="text-red-500 font-bold">
                            &lt;400 ms
                          </span>
                          )
                        </span>
                      </div>
                      {errors.averageSimSecondUpload && (
                        <p className="text-red-500 text-xs">
                          เฉพาะตัวเลขเท่านั้น
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* box-9 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                UPS Information
              </h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-5 rounded-xl">
                <div className="grid gap-5 text-right font-bold">
                  <p>UPS Type :</p>
                  <p>UPS S/N :</p>
                  <p>UPS Brand :</p>
                  <p>UPS Model :</p>
                  <p>Battery Start :</p>
                  <p>Rate :</p>
                  <p>Load :</p>
                  <p>Temperature :</p>
                </div>
                <div className="grid gap-2">
                  <select
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("upsType")}
                  >
                    {upsType.map((item) => (
                      <option value={item.upsUseId} className="text-center">
                        {item.upsName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("upsSN")}
                  />
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("upsBrand")}
                  />
                  <input
                    type="text"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("upsModel")}
                  />
                  <input
                    type="date"
                    className="border-[1px] border-black rounded-lg p-1"
                    {...register("batteryStart")}
                  />
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="text"
                      className="border-[1px] border-black rounded-lg p-1"
                      {...register("rate", {
                        pattern: /^[0-9.]*$/,
                      })}
                    />
                    KVA
                  </div>
                  {errors.rate && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      max={100}
                      min={0}
                      className="border-[1px] border-black rounded-lg p-1"
                      {...register("load", {
                        min: 0,
                        max: 100,
                        pattern: /^[0-9]*$/,
                      })}
                    />
                    %
                  </div>
                  {errors.load && (
                    <p className="text-red-500 text-xs">
                      เฉพาะตัวเลข 0-100 เท่านั้น
                    </p>
                  )}
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="text"
                      className="border-[1px] border-black rounded-lg p-1"
                      {...register("temperature", {
                        pattern: /^[0-9.]*$/,
                      })}
                    />
                    C
                  </div>
                  {errors.temperature && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                </div>
              </div>
            </div>
            {/* box-10 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">Test UPS</h1>
              <div className="flex gap-2 bg-[#E5D283] py-5 lg:pl-10 rounded-xl">
                <div className="flex flex-col gap-9 lg:gap-5 text-right font-bold">
                  <p>L - N :</p>
                  <p>L - G :</p>
                  <p>N - G :</p>
                  <p>Bypass Mode :</p>
                  <p>Power Fail Test :</p>
                  <p>Command Test :</p>
                </div>
                <div className="flex flex-col lg:gap-2">
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="text"
                      className="border-[1px] border-black rounded-lg p-1"
                      {...register("ln", {
                        pattern: /^[0-9.]*$/,
                      })}
                    />
                    Volt
                  </div>
                  {errors.ln && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="text"
                      className="border-[1px] border-black rounded-lg p-1"
                      {...register("lg", {
                        pattern: /^[0-9.]*$/,
                      })}
                    />
                    Volt
                  </div>
                  {errors.lg && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                  <div className="flex flex-wrap lg:gap-3 items-center">
                    <input
                      type="text"
                      className="border-[1px] border-black rounded-lg p-1"
                      {...register("ng", {
                        pattern: /^[0-9.]*$/,
                      })}
                    />
                    Volt
                  </div>
                  {errors.ng && (
                    <p className="text-red-500 text-xs">เฉพาะตัวเลขเท่านั้น</p>
                  )}
                  <br className="lg:hidden" />
                  <label className="flex p-1 gap-3 items-center">
                    <input
                      type="checkbox"
                      value={true}
                      className="h-6 w-6"
                      {...register("bypassMode")}
                    />
                    <span>pass</span>
                  </label>
                  <br className="lg:hidden" />
                  <br className="lg:hidden" />
                  <label className="flex p-1 gap-3 items-center">
                    <input
                      type="checkbox"
                      value={true}
                      className="h-6 w-6"
                      {...register("powerFailTest")}
                    />
                    <span>pass</span>
                  </label>
                  <br className="lg:hidden" />
                  <br className="lg:hidden" />
                  <label className="flex p-1 pt-3 gap-3 items-center">
                    <input
                      type="checkbox"
                      value={true}
                      className="h-6 w-6"
                      {...register("commandTest")}
                    />
                    <span>pass</span>
                  </label>
                </div>
              </div>
            </div>
            {/* box-11 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">
                Other Information
              </h1>
              <div className="overflow-auto">
                <table className=" bg-[#E5D283] py-5 pl-5">
                  <thead className="border-[1px] border-zinc-500">
                    <tr>
                      <th>Name :</th>
                      <th>Type :</th>
                      <th>Brand :</th>
                      <th>Serial :</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Name1")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentName.map((item) => (
                            <option
                              value={item.equipNameId}
                              className="text-center"
                            >
                              {item.equipmentName}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Type1")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentType.map((item) => (
                            <option
                              value={item.equipTypeId}
                              className="text-center"
                            >
                              {item.equipmentType}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Brand1")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentBrand.map((item) => (
                            <option
                              value={item.equipBrandId}
                              className="text-center"
                            >
                              {item.equipmentBrand}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="w-36 border-[1px] border-black rounded-lg p-1"
                          {...register("Serial1")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Name2")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentName.map((item) => (
                            <option
                              value={item.equipNameId}
                              className="text-center"
                            >
                              {item.equipmentName}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Type2")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentType.map((item) => (
                            <option
                              value={item.equipTypeId}
                              className="text-center"
                            >
                              {item.equipmentType}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Brand2")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentBrand.map((item) => (
                            <option
                              value={item.equipBrandId}
                              className="text-center"
                            >
                              {item.equipmentBrand}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="w-36 border-[1px] border-black rounded-lg p-1"
                          {...register("Serial2")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Name3")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentName.map((item) => (
                            <option
                              value={item.equipNameId}
                              className="text-center"
                            >
                              {item.equipmentName}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Type3")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentType.map((item) => (
                            <option
                              value={item.equipTypeId}
                              className="text-center"
                            >
                              {item.equipmentType}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Brand3")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentBrand.map((item) => (
                            <option
                              value={item.equipBrandId}
                              className="text-center"
                            >
                              {item.equipmentBrand}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="w-36 border-[1px] border-black rounded-lg p-1"
                          {...register("Serial3")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Name4")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentName.map((item) => (
                            <option
                              value={item.equipNameId}
                              className="text-center"
                            >
                              {item.equipmentName}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Type4")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentType.map((item) => (
                            <option
                              value={item.equipTypeId}
                              className="text-center"
                            >
                              {item.equipmentType}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          className="border-[1px] border-black rounded-lg w-36 p-1"
                          {...register("Brand4")}
                        >
                          <option className="text-center" value="">
                            -- select --
                          </option>
                          {equipmentBrand.map((item) => (
                            <option
                              value={item.equipBrandId}
                              className="text-center"
                            >
                              {item.equipmentBrand}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="w-36 border-[1px] border-black rounded-lg p-1"
                          {...register("Serial4")}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* box-12 */}
            <div>
              <h1 className="text-[#213555] font-bold lg:text-2xl">Note</h1>
              <div className="flex gap-5 bg-[#E5D283] rounded-xl px-5 py-2">
                <span className="font-bold">Note : </span>
                <textarea
                  cols="50"
                  rows="5"
                  className="border-[1px] border-black rounded-lg p-1"
                  {...register("note")}
                ></textarea>
              </div>
            </div>
          </div>
          {siteinfo.customerModel?.cusGroupType === 2 && (
            <>
              {/* outsideBox-1 */}
              <div>
                <div className="flex lg:gap-3 mt-4">
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    Test Other SIM 1
                  </h1>
                  <label className="flex p-1 gap-3 items-center">
                    <input type="radio" name="sim1" className="h-6 w-6" />
                    <span>Active</span>
                  </label>
                  <label className="flex p-1 gap-3 items-center">
                    <input type="radio" name="sim1" className="h-6 w-6" />
                    <span>Back Up</span>
                  </label>
                </div>
                <div className="grid gap-2 bg-[#E5D283] rounded-xl px-7 py-4">
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>1)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim1no1" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim1no1" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>2)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim1no2" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim1no2" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>3)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim1no3" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim1no3" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>4)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim1no4" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim1no4" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>5)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim1no5" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim1no5" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>6)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim1no6" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim1no6" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>7)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim1no7" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim1no7" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>8)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim1no8" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim1no8" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                </div>
              </div>
              {/* outsideBox-2 */}
              <div>
                <div className="flex lg:gap-3 mt-4">
                  <h1 className="text-[#213555] font-bold lg:text-2xl">
                    Test Other SIM 2
                  </h1>
                  <label className="flex p-1 gap-3 items-center">
                    <input type="radio" name="sim2" className="h-6 w-6" />
                    <span>Active</span>
                  </label>
                  <label className="flex p-1 gap-3 items-center">
                    <input type="radio" name="sim2" className="h-6 w-6" />
                    <span>Back Up</span>
                  </label>
                </div>
                <div className="grid gap-2 bg-[#E5D283] rounded-xl px-7 py-4">
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>1)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim2no1" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim2no1" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>2)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim2no2" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim2no2" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>3)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim2no3" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim2no3" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>4)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim2no4" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim2no4" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>5)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim2no5" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim2no5" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>6)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim2no6" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim2no6" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>7)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim2no7" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim2no7" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                  <label className="grid gap-2 lg:flex lg:items-center lg:gap-5">
                    <div className="flex items-center gap-3">
                      <span>8)</span>
                      <input
                        type="text"
                        className="border-[1px] border-black rounded-lg p-1"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input type="radio" name="sim2no8" className="h-6 w-6" />
                      <span>Pass</span>
                      <input type="radio" name="sim2no8" className="h-6 w-6" />
                      <span>Fail</span>
                      <span>..............................</span>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}
        </AnimateHeight>
      </div>
    </>
  );
}

export default TotalSiteInformation;
