import { CommonAPI } from "./CommonAPI";

export const getDesignPriceList = async () => {

  // console.log("datadesprice",data);

  const storeInit = JSON.parse(localStorage.getItem("storeInit"))
  const currencyCombo = JSON.parse(localStorage.getItem("CURRENCYCOMBO"))
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  const UserEmail = localStorage.getItem("registerEmail")

  const handelCurrencyData = () => {
    const currencyData = JSON.parse(localStorage.getItem('CURRENCYCOMBO'));
    const loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
  
    let finalData;
  
    if (currencyData && loginData) {
      if (Array.isArray(currencyData)) {
        finalData = currencyData.find(cd => cd.Currencyid === loginData.CurrencyCodeid);
      } else {
        finalData = currencyData;
      }
    }
  
    if (!finalData) {
      finalData = {
        Currencyid: 42,
        Currencycode: 'INR',
        Currencyname: 'Rupees',
        Currencysymbol: '₹',
        CurrencyRate: 1.00000,
        IsDefault: 1
      };
    }
  
    return finalData;
  };
  
  const GetPriceReq = {
    "CurrencyRate": `${handelCurrencyData()?.CurrencyRate}`,
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
    "DesignNo": ""
  }

  const encodedCombinedValue = btoa(JSON.stringify(GetPriceReq));

  let body = {
    "con": `{\"id\":\"Store\",\"mode\":\"getdesignpricelist\",\"appuserid\":\"${UserEmail}\"}`,
    "f": "onloadFirstTime (getdesignpricelist)",
    "p": encodedCombinedValue
  }

  await CommonAPI(body).then((res) => {
    localStorage.setItem("getPriceData", JSON.stringify(res?.Data))
    //   setpriceDataApi(res?.Data)
  })

}