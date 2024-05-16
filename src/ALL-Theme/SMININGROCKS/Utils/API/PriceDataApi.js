import { CommonAPI } from "./CommonAPI";

export const getDesignPriceList = async (param,page=1,obj={},filterObj={},autocodeList) => {

  const storeInit = JSON.parse(localStorage.getItem("storeInit"))
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  const UserEmail = localStorage.getItem("registerEmail")

  let mtid =  obj?.mt ?? loginUserDetail?.MetalId
  let diaqcId = obj?.dqc?.length > 0  && obj?.dqc[0] !== undefined && obj?.dqc[1] !== undefined ? `${obj?.dqc[0]},${obj?.dqc[1]}` :loginUserDetail?.cmboDiaQCid
  let csqcId = obj?.csqc?.length > 0 && obj?.csqc[0] !== undefined && obj?.csqc[1] !== undefined ? `${obj?.csqc[0]},${obj?.csqc[1]}` :loginUserDetail?.cmboCSQCid
  
  console.log("mtid",obj?.mt,diaqcId,csqcId)
  
  
  let encodedFilter = {
    "DesignNo":"",
    "FilterKey":`${param?.FilterKey}`,
    "FilterVal":`${param?.FilterVal}`,
    // "FilterKey":'',
    // "FilterVal":'',
    "FilterKey1":`${param?.FilterKey1}`,
    "FilterVal1":`${param?.FilterVal1}`,
    "FilterKey2":`${param?.FilterKey2}`,
    "FilterVal2":`${param?.FilterVal2}`,
    "PageNo":`${page}`,
    "PageSize":`${storeInit?.PageSize}`,
    "Metalid":`${mtid}`,
    "DiaQCid":`${diaqcId}`,
    "CsQCid":`${csqcId}`,
    "IsFromDesDet":"0",
    "Collectionid": `${filterObj?.Collectionid ?? ""}`,
    "Categoryid": `${filterObj?.Categoryid ?? ""}`,
    "SubCategoryid": `${filterObj?.SubCategoryid ?? ""}`,
    "Brandid": `${filterObj?.Brandid ?? ""}`,
    "Genderid": `${filterObj?.Genderid ?? ""}`,
    "Ocassionid": `${filterObj?.Ocassionid ?? ""}`,
    "Themeid": `${filterObj?.Themeid ?? ""}`,
    "Min_DiaWeight": '',
    "Max_DiaWeight": '',
    "Min_GrossWeight": '',
    "Max_GrossWeight": '',
    "Max_NetWt": '',
    "Min_NetWt": '',
    "Max_Price": '',
    "Min_Price": '',
    "Producttypeid": `${filterObj?.Producttypeid ?? ""}`,
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

  return finalData

}