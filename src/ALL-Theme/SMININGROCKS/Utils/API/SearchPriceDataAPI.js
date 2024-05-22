import { CommonAPI } from "./CommonAPI";

export const SearchPriceDataAPI = async (autocodeList,searchVar) => {

  const storeInit = JSON.parse(localStorage.getItem("storeInit"))
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  const colorStone = JSON.parse(localStorage.getItem("ColorStoneQualityColor"));
  const diaColQuality = JSON.parse(localStorage.getItem("QualityColor"));
  const UserEmail = localStorage.getItem("registerEmail")

  let metalTypeArr = JSON.parse(localStorage.getItem("MetalTypeData"))
  let item = metalTypeArr.filter(item => item?.metaltype === loginUserDetail?.cmboMetalType)

  let encodedFilter = {
    "PageNo":1,
    "Metalid":`${item[0]?.Metalid}`,
    "DiaQCid":`${loginUserDetail?.cmboDiaQCid === "0,0" ? `${diaColQuality[0]?.QualityId},${diaColQuality[0]?.ColorId}`:loginUserDetail?.cmboDiaQCid}`,
    "CsQCid":`${loginUserDetail?.cmboCSQCid === "0,0" ? `${colorStone[0]?.QualityId},${colorStone[0]?.ColorId}`: loginUserDetail?.cmboCSQCid}`,
    "SearchKey":`${searchVar}`,
    "AutoCodeList":`${autocodeList}`
  }

  console.log("log11",encodedFilter)

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
    if(res){
      localStorage.setItem("getPriceData", JSON.stringify(res?.Data))
      finalData = res?.Data 
    }
    //   setpriceDataApi(res?.Data)
  })

  console.log("searchPriceData",finalData);

  return finalData

}