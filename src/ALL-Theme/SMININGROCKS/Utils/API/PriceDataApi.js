import { CommonAPI } from "./CommonAPI";

export const getDesignPriceList = async (param,page=1,obj) => {

  

  const storeInit = JSON.parse(localStorage.getItem("storeInit"))
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  const UserEmail = localStorage.getItem("registerEmail")

  let mtid = `${obj?.mt}` ?? loginUserDetail?.MetalId
  let diaqcId = obj?.dqc?.length ? `${obj?.dqc[0]},${obj?.dqc[1]}` :loginUserDetail?.cmboDiaQCid
  let csqcId = obj?.csqc?.length ? `${obj?.csqc[0]},${obj?.csqc[1]}` :loginUserDetail?.cmboCSQCid

  // console.log("log",obj?.dqc[0]);
  
  let encodedFilter = {
    "DesignNo":"",
    "FilterKey":`${param?.data.param1name}`,
    "FilterVal":`${param?.data.param1dataname}`,
    "PageNo":`${page}`,
    "PageSize":`${storeInit?.PageSize}`,
    "Metalid":`${mtid}`,
    "DiaQCid":`${diaqcId}`,
    "CsQCid":`${csqcId}`,
    "IsFromDesDet":"0"
  }

  const GetPriceReq = {
    "CurrencyRate": `${loginUserDetail?.CurrencyRate}`,
    "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
    "Customerid": `${loginUserDetail?.id}`,
    "Laboursetid": `${loginUserDetail?.pricemanagement_laboursetid}`,
    "diamondpricelistname": `${loginUserDetail?.diamondpricelistname}`,
    "colorstonepricelistname": `${loginUserDetail?.colorstonepricelistname}`,
    "SettingPriceUniqueNo": `${loginUserDetail?.SettingPriceUniqueNo}`,
    // "Laboursetid": `${storeInit.PolicyApplyOnName === "Customer Wise Policy" ? loginUserDetail?._pricemanagement_laboursetid : loginUserDetail?.pricemanagement_laboursetid}`,
    // "diamondpricelistname": `${storeInit.PolicyApplyOnName === "Customer Wise Policy" ? loginUserDetail?._diamondpricelistname : loginUserDetail?.diamondpricelistname}`,
    // "colorstonepricelistname": `${storeInit.PolicyApplyOnName === "Customer Wise Policy" ? loginUserDetail?._colorstonepricelistname : loginUserDetail?.colorstonepricelistname}`,
    // "SettingPriceUniqueNo": `${storeInit.PolicyApplyOnName === "Customer Wise Policy" ? loginUserDetail?._SettingPriceUniqueNo : loginUserDetail?.SettingPriceUniqueNo }`,
    "Filter":btoa(JSON.stringify(encodedFilter)),
  }

  const encodedCombinedValue = btoa(JSON.stringify(GetPriceReq));

  let body = {
    "con": `{\"id\":\"Store\",\"mode\":\"getdesignpricelist\",\"appuserid\":\"${UserEmail}\"}`,
    "f": "onloadFirstTime (getdesignpricelist)",
    "p": encodedCombinedValue
  }

  let finalData;

  await CommonAPI(body).then((res) => {
    localStorage.setItem("getPriceData", JSON.stringify(res?.Data))
    //   setpriceDataApi(res?.Data)
    finalData = res?.Data 
  })

  return finalData

}