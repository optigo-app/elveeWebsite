import { CommonAPI } from "./CommonAPI";

export const FullProInfoAPI = async (prodInfo) => {

  console.log("prodInfo",prodInfo);

  const storeInit = JSON.parse(localStorage.getItem("storeInit"))
  const currencyCombo = JSON.parse(localStorage.getItem("CURRENCYCOMBO"))
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  const UserEmail = localStorage.getItem("registerEmail")

  
  
  let encodedFilter = {
    "DesignNo":`${prodInfo}`,
    "FilterKey":"",
    "FilterVal":"",
    "PageNo":"",
    "PageSize":"",
    "Metalid":"",
    "DiaQCid":"",
    "CsQCid":"",
    "IsFromDesDet":"1"
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
    "f": "onloadFirstTimeDetailPage (fullProdInfo)",
    "p": encodedCombinedValue
  }

  let finalData;

  await CommonAPI(body).then((res) => {
    localStorage.setItem("fullProdInfo", JSON.stringify(res?.Data))
    //   setpriceDataApi(res?.Data)
    finalData = res?.Data 
  })

  console.log('finaldataa',finalData);

  return finalData

}