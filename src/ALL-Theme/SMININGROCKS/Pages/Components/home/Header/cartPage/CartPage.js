import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Footer from "../../Footer/Footer";
import {
  CartListCounts,
  WishListCounts,
  colorstoneQualityColorG,
  diamondQualityColorG,
  metalTypeG,
  newTestProdData,
  priceData,
} from "../../../../../../../Recoil/atom";
import { GetCount } from "../../../../../Utils/API/GetCount";
import { CommonAPI } from "../../../../../Utils/API/CommonAPI";
import "./CartPage.css";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardHeader, Col, Container, Row } from "react-bootstrap";
import noFoundImage from "../../../../assets/image-not-found.jpg"
import { FullProInfoAPI } from "../../../../../Utils/API/FullProInfoAPI";
import { findCsQcIdDiff, findDiaQcId, findMetalType, findMetalTypeId, findValueFromId, storImagePath } from "../../../../../Utils/globalFunctions/GlobalFunction";
import { SingleProductAPI } from "../../../../../Utils/API/SingleProductAPI";
import { IoArrowBackOutline } from "react-icons/io5";
import { getDesignPriceList } from "../../../../../Utils/API/PriceDataApi";
import { productListApiCall } from "../../../../../Utils/API/ProductListAPI";
import { FilterListAPI } from "../../../../../Utils/API/FilterListAPI";
import { MdDeleteOutline } from "react-icons/md";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function CartPage() {
  const [cartListData, setCartListData] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [yKey, setYouKey] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isProductCuFlag, setIsProductCuFlag] = useState("");
  const [isMetalCutoMizeFlag, setIsMetalCutoMizeFlag] = useState("");
  const [isDaimondCstoFlag, setIsDaimondCstoFlag] = useState("");
  const [isCColrStoneCustFlag, setIsCColrStoneCustFlag] = useState("");
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [colorData, setColorData] = useState([]);
  const [metalColorData, setMetalColorData] = useState([]);
  const [metalType, setMetalType] = useState([]);
  const [DaimondQualityColor, setDaimondQualityColor] = useState([]);
  const [showDropdowns, setShowDropdowns] = useState(
    Array(cartListData.length).fill(false)
  );
  const [prodSelectData, setProdSelectData] = useState();
  const [sizeOption, setSizeOption] = useState();
  const [metalFilterData, setMetalFilterData] = useState([]);
  const [daimondFilterData, setDaimondFiletrData] = useState([]);
  const [diaQColOpt, setDiaQColOpt] = useRecoilState(diamondQualityColorG);
  const [cSQopt, setCSQOpt] = useRecoilState(colorstoneQualityColorG);
  const [mtTypeOption, setmtTypeOption] = useRecoilState(metalTypeG);
  const [colorStoneFilterData, setColorStoneFiletrData] = useState([]);
  const [FindingFilterData, setFindingFiletrData] = useState([]);

  const [productData, setProductData] = useState();

  const [cartSelectData, setCartSelectData] = useState();
  const [getAllFilterSizeData, setGetAllFilterSizeData] = useState([]);
  const [sizeData, setSizeData] = useState([]);

  const [mtrdData, setMtrdData] = useState([]);
  const [dqcData, setDqcData] = useState();
  const [csqcData, setCsqcData] = useState();
  const [selectedColor, setSelectedColor] = useState()
  const [getPriceData, setGetPriceData] = useState([])

  const [dqcRate, setDqcRate] = useState()
  const [dqcSettRate, setDqcSettRate] = useState()
  const [csqcRate, setCsqcRate] = useState()
  const [csqcSettRate, setCsqcSettRate] = useState()
  const [storeInitData, setStoreInitData] = useState();

  const [dialogOpen, setDialogOpen] = useState(false)

  const setCartCount = useSetRecoilState(CartListCounts);
  const setWishCount = useSetRecoilState(WishListCounts);
  //   const getPriceData = useRecoilValue(priceData);
  const getTestProdData = useRecoilValue(newTestProdData);
  const [currData, setCurrData] = useState()
  const [catSizeData, setCatSizeData] = useState([]);
  const [diaqcData, setDiaQcData] = useState([]);
  const [csData, setCsData] = useState([])
  const [fullprodData, setFullProdData] = useState();
  const [cartPageLoding, setCartPageloding] = useState(false);
  const [singleProdData, setSingleProdData] = useState();
  const [isLodingSave, setIsLoadingSave] = useState(false);
  const [removeItemAutoCode, setRemoveItemAutoCode] = useState('');
  const [removeItemDesignNumber, setRemoveItemDesignNumber] = useState('');


  const setProdFullInfo = async (paramDesignno) => {
    await FullProInfoAPI(paramDesignno).then(res => {
      if (res) {
        // getProdFullInfo();
        setFullProdData(res)
      }
    })
  }

  const cartSingalDataAPICalling = async () => {
    if (cartListData) {
      await SingleProductAPI(cartListData[0]?.designno).then((res) => {
        let data = res[0]
        setSingleProdData(data)
      })
    }
  }

  useEffect(() => {
    // console.log("cartListData1111",cartListData)
    cartSingalDataAPICalling()
  }, [cartListData])


  console.log('singleProdData', singleProdData, mtrdData, diaqcData, csData)


  useEffect(() => {
    if (cartListData?.length > 0) {
      setProdFullInfo(cartListData[0]?.designno)
    }
  }, [cartListData])



  useEffect(() => {
    // handelCurrencyData();
    let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
    let obj = { "CurrencyRate": loginData?.CurrencyRate, "Currencysymbol": loginData?.Currencysymbol }
    if (obj) {
      setCurrData(obj)
    }
  }, [])

  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem('storeInit'))
    setStoreInitData(storeInit)
  }, []);

  useEffect(() => {
    console.log("getTestProdData", getTestProdData)
  }, [getTestProdData])

  const navigation = useNavigate();
  let currencySymbol = JSON.parse(localStorage.getItem('CURRENCYCOMBO'))

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("getPriceData"))
    setGetPriceData(data)
  }, [])

  useEffect(() => {
    if (!cartListData && cartListData.length === 0) {
      setProdSelectData();
      setCartSelectData();
    }
  }, [])


  const getCountFunc = async () => {
    await GetCount().then((res) => {
      if (res) {
        setCartCount(res.CountCart);
        setWishCount(res.WishCount);
      }
    });
  };

  useEffect(() => {
    if (cartListData && !cartSelectData) {
      setCartSelectData(cartListData[0]);
      getSizeData(cartListData[0]?.autocode);
    }
  }, [cartListData, cartSelectData]);

  // console.log('getPriceDatagetPriceData', getPriceData);

  // useEffect(() => {
  //   console.log('getPriceDatagetPriceData', getPriceData);
  //   let mtrd = getPriceData?.rd?.filter(
  //     (ele) =>
  //       ele?.A === cartSelectData?.autocode &&
  //       ele?.B === cartSelectData?.designno &&
  //       ele?.D === mtTypeOption
  //   );


  //   if (mtrd && mtrd.length > 0) {
  //     setMtrdData(mtrd[0] ?? []);
  //   }

  //   let diaqcprice = getPriceData?.rd1?.filter(
  //     (ele) =>
  //       ele.A === cartSelectData?.autocode &&
  //       ele.B === cartSelectData?.designno &&
  //       ele.H === diaQColOpt?.split("_")[0] &&
  //       ele.J === diaQColOpt?.split("_")[1]
  //   );

  //   console.log("diaqcprice", diaqcprice)

  //   if (diaqcprice && diaqcprice.length > 0) {
  //     let totalPrice = diaqcprice.reduce((acc, obj) => acc + obj.S, 0)
  //     setDqcData(totalPrice ?? 0);
  //   }

  //   let csqcpirce = getPriceData?.rd2?.filter(
  //     (ele) =>
  //       ele.A === cartSelectData?.autocode &&
  //       ele.B === cartSelectData?.designno &&
  //       ele.H === cSQopt?.split("_")[0] &&
  //       ele.J === cSQopt?.split("_")[1]
  //   );

  //   if (csqcpirce && csqcpirce.length > 0) {
  //     let totalPrice = csqcpirce.reduce((acc, obj) => acc + obj.S, 0)
  //     setCsqcData(totalPrice ?? 0)
  //   }
  // }, [mtTypeOption, diaQColOpt, cSQopt, cartSelectData, getPriceData]);

  let diaUpdatedPrice = () => {
    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'))

    if (daimondFilterData && daimondFilterData.length && diaqcData?.T === 1) {

      let calcDiaWt = (srProductsData?.updDWT ?? 0) + (daimondFilterData?.Weight ?? 0)

      let CalcPics = (srProductsData?.updDPCS ?? 0) + (daimondFilterData?.pieces ?? 0)

      let fpprice = ((dqcRate ?? 0) * (calcDiaWt ?? 0)) + ((dqcSettRate ?? 0) * (CalcPics ?? 0))

      return fpprice
    }
    else {
      return 0
    }

  }

  let colUpdatedPrice = () => {

    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'))

    if (colorStoneFilterData && colorStoneFilterData.length && csData?.T === 1) {


      let calcDiaWt = (srProductsData?.totalcolorstoneweight ?? 0) + (colorStoneFilterData?.Weight ?? 0)

      let CalcPics = (srProductsData?.totalcolorstonepcs ?? 0) + (colorStoneFilterData?.pieces ?? 0)

      let fpprice = ((csqcRate ?? 0) * (calcDiaWt ?? 0)) + ((csqcSettRate ?? 0) * (CalcPics ?? 0))

      return fpprice
    } else {
      return 0
    }

  }

  let metalUpdatedPrice = () => {

    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'));

    if (metalFilterData && metalFilterData.length && mtrdData?.AE === 1) {

      let CalcNetwt = ((srProductsData?.netwt ?? 0) + (metalFilterData?.Weight ?? 0) ?? 0)

      let fprice = ((mtrdData?.AD ?? 0) * CalcNetwt) + ((mtrdData?.AC ?? 0) * CalcNetwt)

      return fprice
    } else {
      return 0
    }


  }


  useEffect(() => {
    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'));
    const storeInit = JSON.parse(localStorage.getItem('storeInit'));

    // let mtrd = fullprodData?.rd?.filter((ele) =>
    //   storeInit?.IsMetalCustomization === 1
    //     ?
    //     ele?.A === cartSelectData?.autocode &&
    //     ele?.B === cartSelectData?.designno &&
    //     ele?.D === mtTypeOption
    //     :
    //     ele?.A === cartSelectData?.autocode &&
    //     ele?.B === cartSelectData?.designno

    // );

    let mtrd = fullprodData?.rd?.filter((ele) =>
      storeInit?.IsMetalCustomization === 1
        ?
        ele?.A == cartSelectData?.autocode &&
        ele?.C == findMetalTypeId(mtTypeOption)[0]?.Metalid
        :
        ele?.A == cartSelectData?.autocode
    );

    console.log("cartmtrd", mtrd)

    let showPrice = 0;
    if (mtrd && mtrd.length > 0) {
      // showPrice = cartSelectData?.price - ((cartSelectData?.price - cartSelectData?.metalrd) + (mtrd[0]?.Z ?? 0));
      setMtrdData(mtrd[0]);
      // setMetalPrice(mtrd[0]?.Z ?? 0)
    } else {
      setMtrdData([]);
    }

    // let diaqcprice = fullprodData?.rd1?.filter((ele) =>
    //   storeInit?.IsDiamondCustomization === 1
    //     ?
    //     ele.A === cartSelectData?.autocode &&
    //     ele.B === cartSelectData?.designno &&
    //     ele.H === diaQColOpt?.split("#")[0] &&
    //     ele.J === diaQColOpt?.split("#")[1]
    //     :
    //     ele.A === cartSelectData?.autocode &&
    //     ele.B === cartSelectData?.designno

    // )

    let diaqcprice = fullprodData?.rd1?.filter((ele) =>
      storeInit?.IsDiamondCustomization === 1
        ?
        ele.A == cartSelectData?.autocode &&
        ele.G == findDiaQcId(diaQColOpt)[0]?.QualityId &&
        ele.I == findDiaQcId(diaQColOpt)[0]?.ColorId
        :
        ele.A == cartSelectData?.autocode

    )
    // console.log("cartdiaqcprice",diaqcprice)

    let showPrice1 = 0;
    if (diaqcprice && diaqcprice.length > 0) {
      // showPrice1 = cartSelectData?.price - ((srProductsData?.price - srProductsData?.diard1) + (diaqcprice[0]?.S ?? 0));
      let totalPrice = diaqcprice?.reduce((acc, obj) => acc + obj.S, 0)
      let diaRate = diaqcprice?.reduce((acc, obj) => acc + obj.O, 0)
      let diaSettRate = diaqcprice?.reduce((acc, obj) => acc + obj.Q, 0)
      console.log("cartdiaqcprice", totalPrice)
      setDqcRate(diaRate ?? 0)
      setDqcSettRate(diaSettRate ?? 0)
      setDqcData(totalPrice ?? 0)
      setDiaQcData(diaqcprice[0] ?? [])
      // setDQCPrice(diaqcprice[0]?.S ?? 0)
    } else {
      setDqcRate(0)
      setDqcSettRate(0)
      setDqcData(0)
    }

    // let csqcpirce = fullprodData?.rd2?.filter((ele) =>
    //   storeInit?.IsCsCustomization === 1
    //     ?
    //     ele.A === cartSelectData?.autocode &&
    //     ele.B === cartSelectData?.designno &&
    //     ele.H === cSQopt?.split("_")[0] &&
    //     ele.J === cSQopt?.split("_")[1]
    //     :
    //     ele.A === cartSelectData?.autocode &&
    //     ele.B === cartSelectData?.designno

    // );

    let csqcpirce = fullprodData?.rd2?.filter((ele) =>
      storeInit?.IsCsCustomization === 1
        ?
        ele.A == srProductsData?.autocode &&
        ele.H == findCsQcIdDiff(cSQopt)[0]?.QualityId &&
        ele.J == findCsQcIdDiff(cSQopt)[0]?.ColorId
        :
        ele.A == srProductsData?.autocode

    );

    console.log("cartcsqcpirce", csqcpirce)

    let showPrice2 = 0;
    if (csqcpirce && csqcpirce.length > 0) {
      // showPrice2 = srProductsData?.price - ((srProductsData?.price - srProductsData?.csrd2) + (csqcpirce[0]?.S ?? 0));
      let totalPrice = csqcpirce?.reduce((acc, obj) => acc + obj.S, 0)
      let diaRate = csqcpirce?.reduce((acc, obj) => acc + obj.O, 0)
      let diaSettRate = csqcpirce?.reduce((acc, obj) => acc + obj.Q, 0)
      setCsqcData(totalPrice ?? 0)
      setCsqcRate(diaRate ?? 0)
      setCsqcSettRate(diaSettRate ?? 0)
      setCsData(csqcpirce[0] ?? [])
      // setCSQCPrice(csqcpirce[0]?.S ?? 0)
    } else {
      setCsqcData(0)
      setCsqcRate(0)
      setCsqcSettRate(0)
    }
    // let gt = showPrice + showPrice1 + showPrice2;
    // setGrandTotal(gt ?? 0);
  }, [fullprodData, mtTypeOption, diaQColOpt, cSQopt, cartSelectData, singleProdData])

  useEffect(() => {
    let finalmetalTypeName = cartSelectData?.metaltypename?.length > 4 ? `${cartSelectData?.metaltypename?.split(" ")[0]}` : `${cartSelectData?.metaltypename}`
    let finalMetal = `${finalmetalTypeName} ${cartSelectData?.Purity}`

    setmtTypeOption(finalMetal);

    let qualityColor = `${cartSelectData?.diamondquality}#${cartSelectData?.diamondcolor}`;
    setDiaQColOpt(qualityColor);

    let csQualColor = `${cartSelectData?.colorstonequality}#${cartSelectData?.colorstonecolor}`;
    setCSQOpt(csQualColor);

    setSelectedColor(cartSelectData?.metalcolorname)


    setSizeOption(cartSelectData?.detail_ringsize)

  }, [cartSelectData])

  console.log("cartSelectData", cartSelectData);

  useEffect(() => {
    getCountFunc();
  }, []);

  useEffect(() => {
    const currencyCombo = JSON.parse(localStorage.getItem("CURRENCYCOMBO"));
    setCurrency(currencyCombo?.Currencysymbol);
    getCartData();
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("QualityColor"));
    if (storedData) {
      setColorData(storedData);
    }

    const storedData1 = JSON.parse(
      localStorage.getItem("ColorStoneQualityColor")
    );
    if (storedData1) {
      setDaimondQualityColor(storedData1);
    }

    const storedData2 = JSON.parse(localStorage.getItem("MetalTypeData"));
    if (storedData2) {
      setMetalType(storedData2);
    }

    const storedData3 = JSON.parse(localStorage.getItem("MetalColorData"));
    if (storedData3) {
      setMetalColorData(storedData3);
    }
  }, []);

  const handelLocalStorage = () => {
    let localProductData = JSON.parse(localStorage.getItem("srProductsData"));
    setProductData(localProductData);
  };

  useEffect(() => {
    handelLocalStorage();
  }, []);

  const getSizeData = async (item) => {
    try {
      const storedEmail = localStorage.getItem("registerEmail") || "";
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;

      const storedData = localStorage.getItem("loginUserDetail") || "0";
      const data = JSON.parse(storedData);
      const customerid = data?.id;
      const combinedValue = JSON.stringify({
        autocode: `${item}`,
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerid}`,
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"\",\"mode\":\"CATEGORYSIZECOMBO\",\"appuserid\":\"${storedEmail}\"}`,
        f: "index (getSizeData)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data?.rd) {
        setSizeData(response.Data.rd);
        const sizeDropdownData = response.Data.rd;
        setGetAllFilterSizeData(response.Data.rd1);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (index) => {
    // Your save logic here
    const newShowDropdowns = [...showDropdowns];
    newShowDropdowns[index] = false;
    setShowDropdowns(newShowDropdowns);
  };

  const getCartData = async () => {
    try {
      // cartListData.length === 0 && setIsLoading(true);
      cartListData.length === 0 && setIsLoading(true);
      const ImageURL = localStorage.getItem("UploadLogicalPath");
      setImageURL(ImageURL);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const storedData = localStorage.getItem("loginUserDetail");
      const data = JSON.parse(storedData);
      const customerid = data.id;
      setIsProductCuFlag(storeInit.IsProductWebCustomization);
      setIsMetalCutoMizeFlag(storeInit.IsMetalCustomization);
      setIsDaimondCstoFlag(storeInit.IsDiamondCustomization);
      setIsCColrStoneCustFlag(storeInit.IsCsCustomization);
      setCustomerID(data.id);
      const customerEmail = data.userid;
      setUserEmail(customerEmail);

      const { FrontEnd_RegNo, ukey } = storeInit;
      setYouKey(ukey);

      const combinedValue = JSON.stringify({
        CurrentPage: "1",
        PageSize: "1000",
        ukey: `${ukey}`,
        CurrRate: "1",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerid}`,
      });

      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"\",\"mode\":\"GetCartDetails\",\"appuserid\":\"${customerEmail}\"}`,
        f: "Header (getCartData)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);

      if (response?.Data) {
        setCartListData(response?.Data?.rd);
        setIsLoading(false);
        setMainRemarks(response?.Data?.rd[0].OrderRemarks);
        setRemarks(response?.Data?.rd[0].Remarks);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };


  const handleRemove = async (data) => {

    console.log('cccccccc deeee', cartSelectData);
    console.log('cccccccc deeee', removeItemDesignNumber);
    try {
      setIsLoading(true);
      setDialogOpen(false);
      handleCloseSingleRemove();
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        designno: `${cartSelectData?.designno}`,
        autocode: `${cartSelectData?.autocode}`,
        metalcolorid: "0",
        isSolStockNo: "0",
        is_show_stock_website: "0",
        isdelete_all: "0",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
        cartidlist: "",
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${userEmail}\"}`,
        f: "myWishLisy (handleRemoveCatList)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      console.log('ccccccccccccccc', response);
      if (response.Data.rd[0].stat === 1) {
        await getCartData();
        await getCountFunc();
        let prevIndexofCartList = cartListData?.findIndex((cld) => cld?.autocode === removeItemAutoCode)
        if (prevIndexofCartList === 0) {
          setCartSelectData()
        } else {
          setCartSelectData(cartListData[prevIndexofCartList - 1]);
        }
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [Mainremarks, setMainRemarks] = useState("");
  const [MainremarksApires, setMainRemarksApires] = useState("");
  const handleInputChangeMainRemarks = (e) => {
    setMainRemarks(e.target.value);
  };
  const submitMainRemrks = async () => {
    if (!Mainremarks || Mainremarks.trim() === "") {
      toast.error("Enter a value for remark.");
    } else {
      try {
        setOpenOrderRemark(false);
        setIsLoading(true);
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const { FrontEnd_RegNo } = storeInit;
        const combinedValue = JSON.stringify({
          orderremarks: `${Mainremarks}`,
          FrontEnd_RegNo: `${FrontEnd_RegNo}`,
          Customerid: `${customerID}`,
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          con: `{\"id\":\"\",\"mode\":\"SAVEORDERREMARK\",\"appuserid\":\"${userEmail}\"}`,
          f: "Header (handleMainRemrks)",
          p: encodedCombinedValue,
        };
        const response = await CommonAPI(body);
        if (response.Data.rd[0].stat === 1) {
          toast.success("Add remark successfully");
          setShowOrderRemarkFields(!showOrderRemarkFields)
          setMainRemarksApires(response.Data.rd[0]?.orderremarks)
          // setMainRemarks('')
        } else {
          alert("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  const [remarks, setRemarks] = useState(cartSelectData?.Remarks || '');
  const [remarksApires, setRemarksApiRes] = useState('');
  const handleInputChangeRemarks = (event, index) => {
    let { value } = event.target;
    setRemarks(value);
  };



  const [remakrAutuCode, setRemarkAutoCodr] = useState(false);
  const [reamkrDesignNumber, setDesignNumebr] = useState(false);

  const handleSubmit = async (data) => {
    if (!remarks || remarks.trim() === "") {
      // toast.error("Enter a value for remarks.");
    } else {
      try {
        // setIsLoading(true);
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const { FrontEnd_RegNo } = storeInit;
        const combinedValue = JSON.stringify({
          // designno: `${reamkrDesignNumber}`,
          // autocode: `${remakrAutuCode}`,

          designno: `${data.designno}`,
          autocode: `${data.autocode}`,
          remarks: `${remarks}`,
          FrontEnd_RegNo: `${FrontEnd_RegNo}`,
          Customerid: `${customerID}`,
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          con: `{\"id\":\"\",\"mode\":\"SAVEDESIGNREMARK\",\"appuserid\":\"${userEmail}\"}`,
          f: "Header (handleSingleRemaksSubmit)",
          p: encodedCombinedValue,
        };
        const response = await CommonAPI(body);
        console.log('reeeeeeeeeeeeeeeeeeeeeeeeeee', response);
        if (response.Data.rd[0].stat === 1) {
          await getCartData()
          // toast.success("Add remark successfully");
          setShowRemarkFields(!showRemarkFields)
          setRemarksApiRes(response.Data.rd[0]?.design_remark)
        } else {
          alert("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [lastEnteredQuantity, setLastEnteredQuantity] = useState(cartSelectData?.Quantity || "");
  useEffect(() => {
    setLastEnteredQuantity(cartSelectData?.Quantity || "");
  }, [cartSelectData]);

  const handleInputChange = (event) => {
    let { value } = event.target;
    value = value.replace(/[^0-9.]/g, '');
    const intValue = parseInt(value);
    const positiveIntValue = intValue >= 0 ? intValue : 0;
    setLastEnteredQuantity(positiveIntValue.toString());
  };


  const handleUpdateQuantity = async (num) => {
    setQtyUpdateWaiting(true);
    try {
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        designno: `${num}`,
        Quantity: `${lastEnteredQuantity}`,
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"\",\"mode\":\"UpdateQuantity\",\"appuserid\":\"${userEmail}\"}`,
        f: "header (handleUpdateQuantity)",
        p: encodedCombinedValue,
      };
      if (lastEnteredQuantity !== "") {
        const response = await CommonAPI(body);
        if (response.Data.rd[0].stat === 1) {
          await getCartData()
          // toast.success("QTY change successfully");
          setQtyUpdateWaiting(false);
        } else {
          alert("Error");
        }
      } else {
        toast.error("ERROR !!!,Please Check QTY");
        // setLastEnteredQuantity((prev)=>prev)
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {

    }
  };

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleRemoveAllWishList = async () => {
    handleClose();
    try {
      setIsLoading(true);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        designno: "",
        autocode: "",
        metalcolorid: "0",
        isSolStockNo: "0",
        is_show_stock_website: "0",
        isdelete_all: "1",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
        cartidlist: "",
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${userEmail}\"}`,
        f: "myWishLisy (handleRemoveCatList)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data.rd[0].stat === 1) {
        getCartData();
        getCountFunc();
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const prodData = JSON.parse(localStorage.getItem("allproductlist"))
    let isCartData = cartSelectData ? cartSelectData : cartListData[0]

    const finalProdData = prodData?.filter(
      (pd) =>
        pd?.designno === isCartData?.designno &&
        pd?.autocode === isCartData?.autocode
    )[0]

    if (finalProdData) {
      setProdSelectData(finalProdData)
    }
  }, [cartSelectData, cartListData])


  const [sizeMarkup, setSizeMarkup] = useState(0)

  const handelSize = (data) => {
    const selectedSize = sizeData.find((size) => size.sizename === (data ?? sizeOption))

    if (selectedSize) {
      setSizeMarkup(selectedSize?.MarkUp)
      setCatSizeData(selectedSize)
    } else {
      setSizeMarkup(0)
    }
    setSizeOption(data);
    const filteredData = getAllFilterSizeData?.filter((item) => item.sizename === (data ?? sizeOption))
    const filteredDataMetal = filteredData?.filter((item) => item.DiamondStoneTypeName === "METAL")
    const filteredDataDaimond = filteredData?.filter((item) => item.DiamondStoneTypeName === "DIAMOND")
    const filteredDataColorStone = filteredData?.filter(item => item.DiamondStoneTypeName === "COLOR STONE")
    const filteredDataFinding = filteredData?.filter(item => item.DiamondStoneTypeName === "FINDING")
    setMetalFilterData(filteredDataMetal)
    setDaimondFiletrData(filteredDataDaimond)
    setColorStoneFiletrData(filteredDataColorStone)
    setFindingFiletrData(filteredDataFinding)
  };

  useEffect(() => {
    const selectedSize = sizeData.find((size) => size.sizename === (sizeOption))

    console.log("selectedSize", selectedSize);

    if (selectedSize) {
      setSizeMarkup(selectedSize?.MarkUp)
    } else {
      setSizeMarkup(0)
    }
    const filteredData = getAllFilterSizeData?.filter(
      (item) => item.sizename === (sizeOption)
    )
    const filteredDataMetal = filteredData?.filter(
      (item) => item.DiamondStoneTypeName === "METAL"
    )
    const filteredDataDaimond = filteredData?.filter(
      (item) => item.DiamondStoneTypeName === "DIAMOND"
    )
    setMetalFilterData(filteredDataMetal)
    setDaimondFiletrData(filteredDataDaimond)
  }, [sizeOption, sizeData, getAllFilterSizeData])


  console.log("pricedata", (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)), dqcData, csqcData, sizeMarkup, metalUpdatedPrice(), diaUpdatedPrice(), colUpdatedPrice())

  // const handleColorSelection = (color) => {
  //     let uploadPath = localStorage.getItem('UploadLogicalPath');
  //     const storedDataAll = localStorage.getItem('storeInit');
  //     const data = JSON.parse(storedDataAll);
  //     if (data.IsColorWiseImages === 1) {
  //       const selectedColor = color;
  //       setSelectedColor(selectedColor);
  //       const filteredData = colorImageData.filter(item => item.colorname.toLowerCase() === selectedColor.toLowerCase());
  //       console.log('Filter Data', filteredData);
  //       if (filteredData.length > 0) {
  //         const correctedData = filteredData.map(item => {
  //           return {
  //             ...item,
  //             imagepath: convertPath(item.imagepath)
  //           };
  //         });
  //         correctedData.forEach(item => {
  //           item.imagepath = uploadPath + '/' + data.ukey + item.imagepath;
  //           console.log('Updated Path:', item.imagepath);
  //         });
  //         correctedData.forEach((item, index) => {
  //           correctedData[index] = item;
  //         });
  //         setTimeout(() => {
  //           setUpdateColorImage(correctedData);
  //         }, 100);
  //       } else {
  //         setUpdateColorImage('');
  //       }
  //       const selectedColorData = colorImageData.find(item => item.colorname === selectedColor);
  //       if (selectedColorData) {
  //         const correctedImagePath = convertPath(selectedColorData.imagepath);
  //         let path = uploadPath + '/' + data.ukey + correctedImagePath
  //         setSelectedImagePath(path);
  //       } else {
  //         setSelectedImagePath('');
  //       }
  //     }
  // };

  console.log('cartListData', cartListData);
  // console.log('dqcData', dqcData);
  // console.log('csqcData', csqcData);
  // console.log('mtrdData', mtrdData);

  const getCartAndWishListData = async () => {

    const UserEmail = localStorage.getItem("registerEmail")
    const storeInit = JSON.parse(localStorage.getItem("storeInit"))
    const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

    let EncodeData = { FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`, Customerid: `${Customer_id?.id}` }

    const encodedCombinedValue = btoa(JSON.stringify(EncodeData));

    const body = {
      "con": `{\"id\":\"Store\",\"mode\":\"getdesignnolist\",\"appuserid\":\"${UserEmail}\"}`,
      "f": " useEffect_login ( getdataofcartandwishlist )",
      "p": encodedCombinedValue
    }

    await CommonAPI(body).then((res) => {
      // if (res?.Message === "Success") {
      //   setCartData(res?.Data?.rd)
      //   setWishData(res?.Data?.rd1)
      // }
    })

  }

  const handleCartUpdate = async () => {

    const storeInit = JSON.parse(localStorage.getItem("storeInit"))
    const UserEmail = localStorage.getItem("registerEmail")
    const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

    const finalJSON = {
      "stockweb_event": "",
      "designno": `${singleProdData?.designno}`,
      "autocode": `${singleProdData?.autocode}`,
      "imgrandomno": `${singleProdData?.imgrandomno ?? ""}`,
      "producttypeid": Number(`${singleProdData?.Producttypeid}`),
      "metaltypeid": Number(`${singleProdData?.MetalTypeid}`),
      "metalcolorid": Number(`${singleProdData?.MetalColorid}`),
      "stockno": "",
      "DQuality": `${diaQColOpt?.split('#')[0] ?? ""}`,
      "DColor": `${diaQColOpt?.split('#')[1] ?? ""}`,
      "cmboMetalType": `${findMetalType(singleProdData?.MetalTypeid)}`,
      "AdditionalValWt": Number(`${singleProdData?.AdditionalValWt ?? 0}`),
      "BrandName": `${findValueFromId("cate", singleProdData?.Categoryid)?.CategoryName ?? ""}`,
      "Brandid": Number(`${singleProdData?.Brandid ?? 0}`),
      "CategoryName": `${findValueFromId("cate", singleProdData?.Categoryid)?.CategoryName ?? ""}`,
      "Categoryid": Number(`${singleProdData?.Categoryid ?? 0}`),
      "CenterStoneId": Number(`${singleProdData?.CenterStoneId ?? 0}`),
      "CenterStonePieces": Number(`${singleProdData?.CenterStonePieces ?? 0}`),
      "CollectionName": `${findValueFromId("collect", singleProdData?.Collectionid)?.CollectionName ?? ""}`,
      "Collectionid": Number(`${singleProdData?.Collectionid ?? 0}`),
      "ColorWiseRollOverImageName": `${singleProdData?.ColorWiseRollOverImageName ?? ""}`,
      "DefaultImageName": `${singleProdData?.DefaultImageName}`,
      "DisplayOrder": Number(`${singleProdData?.DisplayOrder ?? 0}`),
      "FrontEnd_OrderCnt": Number(`${singleProdData?.FrontEnd_OrderCnt ?? 0}`),
      "GenderName": `${findValueFromId("gender", singleProdData?.Genderid)?.GenderName ?? ""}`,
      "Genderid": Number(`${singleProdData?.Genderid ?? 0}`),
      "Grossweight": `${Number(`${mtrdData?.N ?? 0}`)}`,
      "InReadyStockCnt": Number(`${singleProdData?.InReadyStockCnt ?? 0}`),
      "IsBestSeller": Number(`${singleProdData?.IsBestSeller ?? 0}`),
      "IsColorWiseImageExists": Number(`${singleProdData?.IsColorWiseImageExists ?? 0}`),
      "IsInReadyStock": Number(`${singleProdData?.IsInReadyStock ?? 0}`),
      "IsNewArrival": Number(`${singleProdData?.IsNewArrival ?? 0}`),
      "IsRollOverColorWiseImageExists": Number(`${singleProdData?.IsRollOverColorWiseImageExists ?? 0}`),
      "IsTrending": Number(`${singleProdData?.IsTrending ?? 0}`),
      "MasterManagement_labid": Number(`${singleProdData?.MasterManagement_labid}`),
      "MasterManagement_labname": "",
      "MetalColorName": `${selectedColor ?? ""}`,
      "MetalColorid": Number(`${singleProdData?.MetalColorid ?? 0}`),
      "MetalPurity": `${(mtTypeOption?.split(' ')[1]) ?? ""}`,
      "MetalPurityid": Number(`${singleProdData?.MetalTypeid ?? 0}`),
      "MetalTypeName": `${mtTypeOption?.split(' ')[0]}`,
      "MetalTypeid": Number(`${singleProdData?.MetalTypeid ?? 0}`),
      "MetalWeight": Number(`${mtrdData?.I ?? 0}`),
      "OcassionName": `${findValueFromId("ocass", singleProdData?.Ocassionid)?.OcassionName ?? ""}`,
      "Ocassionid": Number(`${singleProdData?.Ocassionid ?? 0}`),
      "ProducttypeName": `${findValueFromId("prodtype", singleProdData?.Producttypeid)?.ProducttypeName ?? ""}`,
      "Producttypeid": Number(`${singleProdData?.Producttypeid ?? 0}`),
      "RollOverImageName": `${singleProdData?.RollOverImageName}`,
      "SubCategoryName": `${findValueFromId("subcate", singleProdData?.SubCategoryid)?.SubCategoryName ?? ""}`,
      "SubCategoryid": Number(`${singleProdData?.SubCategoryid ?? 0}`),
      "ThemeName": `${findValueFromId("theme", singleProdData?.Themeid)?.ThemeName ?? ""}`,
      "Themeid": Number(`${singleProdData?.Themeid ?? 0}`),
      "TitleLine": `${singleProdData?.TitleLine}`,
      // "UnitCost": Number(`${singleProdData?.UnitCost ?? 0}`),
      "UnitCost": Number(`${(FinalPrice() * lastEnteredQuantity).toFixed(2) ?? 0}`),
      "UnitCostWithmarkup": Number(`${((FinalPrice() * lastEnteredQuantity).toFixed(2) ?? 0) + (singleProdData?.markup ?? 0)}`),
      "colorstonecolorname": `${cSQopt?.split('-')[1] ?? ""}`,
      "colorstonequality": `${cSQopt?.split('-')[0] ?? ""}`,
      "diamondcolorname": `${diaQColOpt?.split('#')[1] ?? ""}`,
      "diamondpcs": Number(`${mtrdData?.J ?? 0}`),
      "diamondquality": `${diaQColOpt?.split('#')[0] ?? ""}`,
      "diamondsetting": `${singleProdData?.diamondsetting ?? ""}`,
      "diamondshape": `${diaqcData?.diamondshape ?? ""}`,
      "diamondweight": Number(`${diaqcData?.N ?? 0}`),
      "encrypted_designno": `${singleProdData?.encrypted_designno ?? ""}`,
      "hashtagid": Number(`${singleProdData?.Hashtagid ?? 0}`),
      "hashtagname": `${singleProdData?.Hashtagname ?? ""}`,
      "imagepath": `${singleProdData?.imagepath ?? ""}`,
      "mediumimage": `${singleProdData?.MediumImagePath ?? ""}`,
      "originalimage": `${singleProdData?.ImageName ?? ""}`,
      "storyline_html": `${singleProdData?.storyline_html ?? ""}`,
      "storyline_video": `${singleProdData?.storyline_video ?? ""}`,
      "thumbimage": `${singleProdData?.ThumbImagePath ?? ""}`,
      "totaladditionalvalueweight": Number(`${singleProdData?.totaladditionalvalueweight ?? ""}`),
      "totalcolorstoneweight": Number(`${singleProdData?.totalcolorstoneweight ?? ""}`),
      "totaldiamondweight": Number(`${singleProdData?.totaldiamondweight ?? ""}`),
      "updatedate": `${singleProdData?.UpdateDate ?? ""}`,
      "videoname": `${singleProdData?.videoname ?? ""}`,
      "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
      "Customerid": Number(`${Customer_id?.id}`),
      "PriceMastersetid": Number(`${singleProdData?.PriceMastersetid ?? ""}`),
      "quantity": Number(`${lastEnteredQuantity ?? "1"}`),
      "CurrencyRate": `${mtrdData?.AA ?? ""}`,
      "remarks_design": `${singleProdData?.remarks_design ?? ""}`,
      "diamondcolorid": `${diaqcData?.I ?? ""}`,
      "diamondqualityid": `${diaqcData?.G ?? ""}`,
      "detail_ringsize": `${sizeOption ? (sizeOption ?? "") : (singleProdData?.detail_ringsize ?? "")}`,
      "ProjMode": `${singleProdData?.ProjMode ?? ""}`,
      "AlbumMasterid": Number(`${singleProdData?.AlbumMasterid ?? 0}`),
      "AlbumMastername": `${singleProdData?.AlbumMastername ?? ""}`,
      "Albumcode": `${singleProdData?.Albumcode ?? ""}`,
      "Designid": Number(`${singleProdData?.Designid ?? 0}`)
    }

    let Data = { "designno": `${cartSelectData?.designno}`, "autocode": `${cartSelectData?.autocode}`, "metalcolorid": 0, "isSolStockNo": 0, "is_show_stock_website": "0", "isdelete_all": 0, "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}`, "cartidlist": "" }

    let encodedCombinedValue1 = btoa(JSON.stringify(Data))

    const body1 = {
      con: `{\"id\":\"\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${UserEmail}\"}`,
      f: "RemoveFromCartIconClick (removeFromCartList)",
      p: encodedCombinedValue1,
    }
    setIsLoadingSave(true);
    await CommonAPI(body1).then((res) => {
      return res
    }).then(async (prevRes) => {
      if (prevRes?.Data?.rd[0]?.stat_msg === "success") {
        // console.log("prevRes?.Data?.rd[0]?.stat_msg", prevRes?.Data?.rd[0]?.stat_msg);
        // await getCartAndWishListData()
        // getCountFunc()

        const encodedCombinedValue = btoa(JSON.stringify(finalJSON));

        const body = {
          con: `{\"id\":\"\",\"mode\":\"ADDTOCART\",\"appuserid\":\"${UserEmail}\"}`,
          f: "AddToCartIconClick (ADDTOCART)",
          p: encodedCombinedValue,
        };

        await CommonAPI(body).then(async (res) => {
          if (res?.Data?.rd[0]?.msg === "success") {
            await getCartAndWishListData()
            await getCountFunc()
            await getCartData()
            await handleSubmit(cartSelectData);

            toast.success("Product Updated successFully !!!")
            setQtyUpdateWaiting(false);
            setIsLoadingSave(false);

          }
          else {
            console.log("error", res);
            // toast.error("Something Went Wrong!!")
          }
        }).catch((error) => {
          console.log("error", error);

        })

      }
    })

    // console.log("finalJSON",finalJSON);
    // console.log("filterProdData",filterProdData);

  }

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const [showRemarkFields, setShowRemarkFields] = useState(false);
  const [showOrderRemarkFields, setShowOrderRemarkFields] = useState(false);

  const handleShowReamrkFields = () => {
    setShowRemarkFields(!showRemarkFields);
  }
  const handleShowOrderReamrkFields = () => {
    setShowOrderRemarkFields(!showOrderRemarkFields);
  }
  // const [imageStatus, setImgStatus] = useState(false);

  // function handleLoad() {
  //   let imagePath = storeInitData?.DesignImageFol
  //   console.log('imagePath--', imagePath);
  //   const img = new Image();
  //   img.onload = function () {
  //     setImgStatus(true)
  //     console.log('Image loaded successfully.');

  //   };
  //   img.onerror = function () {
  //     console.error('Error loading image. Invalid path:', imagePath);
  //   };
  //   img.src = imagePath;
  // }

  // useEffect(() => {
  //   handleLoad();
  // }, [])

  // console.log('cartsele----------', cartSelectData);
  // console.log('order remark--------', remarksApires)

  const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
    // console.log("pricewithmarkup", pmu, pPrice)
    if (pPrice <= 0) {
      return 0
    }
    else {
      let percentPMU = ((pmu / 100) / curr)
      return (Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0))
    }
  }

  useEffect(() => {
    FinalPrice()
  }, [catSizeData, mtrdData, dqcData, currData, csqcData, sizeMarkup, metalUpdatedPrice, diaUpdatedPrice, colUpdatedPrice])

  console.log("breckupprice",
    (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)),
    (dqcData ?? 0),
    (csqcData ?? 0),
    ((sizeMarkup ?? 0) / (currData?.CurrencyRate) ?? 0),
    (metalUpdatedPrice() ?? 0),
    (diaUpdatedPrice() ?? 0),
    (colUpdatedPrice() ?? 0)
  );


  function FinalPrice() {
    if (catSizeData?.IsMarkUpInAmount == 1) {
      let designMarkUp = (mtrdData?.AB ?? 0)
      let IsAmountPrice = (
        (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)) +
        (dqcData ?? 0) +
        (csqcData ?? 0) +
        ((sizeMarkup ?? 0) / (currData?.CurrencyRate) ?? 0) +
        (metalUpdatedPrice() ?? 0) +
        (diaUpdatedPrice() ?? 0) +
        (colUpdatedPrice() ?? 0)
      ).toFixed(2)
      return PriceWithMarkupFunction(designMarkUp, IsAmountPrice, currData?.CurrencyRate).toFixed(2)
    }
    else {
      const percentMarkupPlus = (mtrdData?.AB ?? 0) + (catSizeData?.MarkUp ?? 0)
      const CalcPrice = (
        (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)) +
        (dqcData ?? 0) +
        (csqcData ?? 0) +
        (metalUpdatedPrice() ?? 0) +
        (diaUpdatedPrice() ?? 0) +
        (colUpdatedPrice() ?? 0)
      ).toFixed(2)
      return PriceWithMarkupFunction(percentMarkupPlus, CalcPrice, currData?.CurrencyRate).toFixed(2)
    }
  }



  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [openSingleRemove, setOpenSingleRemove] = useState(false);

  const handleClickOpenSingleRemove = (data) => {
    console.log('ccccccccc', data);
    console.log('ccccccccc', data.autocode);
    console.log('ccccccccc', data.designno);
    setRemoveItemAutoCode(data.autocode);
    setRemoveItemDesignNumber(data.designno)
    setOpenSingleRemove(true);

  };

  const handleCloseSingleRemove = () => {
    setOpenSingleRemove(false);
  };

  const [openItemRemark, setOpenItemRemark] = useState(false);

  const handleClickOpenItemRemark = (autoCode, designNumbder) => {
    setOpenItemRemark(true);
    setRemarkAutoCodr(autoCode);
    setDesignNumebr(designNumbder);
  };

  const handleCloseItemRemark = () => {
    setOpenItemRemark(false);
  };


  const [openOrderRemark, setOpenOrderRemark] = useState(false);

  const handleClickOpenOrderRemark = () => {
    setOpenOrderRemark(true);
  };

  const handleCloseOrderRemark = () => {
    setOpenOrderRemark(false);
  };


  console.log('sizeData', FinalPrice())

  const handelBrowse = async () => {
    navigation("/productpage")
    let finalData = JSON.parse(localStorage.getItem("menuparams"))

    if (finalData) {
      await FilterListAPI(finalData)
      await productListApiCall(finalData).then((res) => {
        if (res) {
          localStorage.setItem("allproductlist", JSON.stringify(res))
          localStorage.setItem("finalAllData", JSON.stringify(res))
        }
        return res
      }).then(async (res) => {
        if (res) {
          let autoCodeList = JSON.parse(localStorage.getItem("autoCodeList"))
          await getDesignPriceList(finalData, 1, {}, {}, autoCodeList)
        }
      }).catch((err) => {
        if (err) toast.error("Something Went Wrong!!!")
      })
    }
  }

  const handlePlaceOrder = () => {
    let priceData = cartListData.reduce((total, item) => total + item.UnitCost, 0).toFixed(2)
    localStorage.setItem('TotalPriceData', priceData)
    navigation("/Delivery");
    window.scrollTo(0, 0);
  }

  const [qtyUpdateWaiting, setQtyUpdateWaiting] = useState(false);

  const handleIncrementQuantity = () => {
    const incrementedQuantity = parseInt(lastEnteredQuantity) + 1; // Increment quantity by 1
    setLastEnteredQuantity(incrementedQuantity.toString()); // Update comment quantity state
    handleUpdateQuantity(prodSelectData?.designno); // Call handleUpdateQuantity with the incremented quantity
  };

  const handleDecrementQuantity = () => {
    if (parseInt(lastEnteredQuantity) > 1) { // Prevent quantity from going below 1
      const decrementedQuantity = parseInt(lastEnteredQuantity) - 1; // Decrement quantity by 1
      setLastEnteredQuantity(decrementedQuantity.toString());
      handleUpdateQuantity(prodSelectData?.designno); // Call handleUpdateQuantity with the decremented quantity
    }
  };

  useEffect(() => {
    if (cartSelectData?.Remarks) {
      setRemarks(cartSelectData.Remarks);
    }
  }, [cartSelectData]);

  console.log('reeeeeeeeeeeeeeeeeeeeeeeeeee ()', cartListData);
  console.log('FinalPrice() * lastEnteredQuantityFinalPrice() * lastEnteredQuantity', FinalPrice() * lastEnteredQuantity);
  return (
    <>
      <div
        className="paddingTopMobileSet"
      >
        {isLoading && (
          <div className="loader-overlay">
            <CircularProgress className="loadingBarManage" />
          </div>
        )}
        <ToastContainer />
        <Dialog open={open} onClose={handleClose}>
          <p style={{ padding: '15px 15px 0px 15px', fontWeight: 500 }}>Are You Sure To Delete All This Item?</p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button onClick={handleClose} color="primary">
              NO
            </Button>
            <Button onClick={handleRemoveAllWishList} color="primary">
              YES
            </Button>
          </div>
        </Dialog>

        <Dialog open={openSingleRemove} onClose={handleCloseSingleRemove}>
          <p style={{ padding: '15px 15px 0px 15px', fontWeight: 500 }}>Are You Sure To Delete This Item?</p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button onClick={handleCloseSingleRemove} color="primary">
              NO
            </Button>
            <Button onClick={handleRemove} color="primary">
              YES
            </Button>
          </div>
        </Dialog>

        <Dialog open={openItemRemark} onClose={handleCloseItemRemark} >
          <div className="ItemRemarkMain">

            <p style={{ padding: '15px 15px 0px 15px', fontWeight: 500 }} >Add The Item Remark..</p>
            <div className="d-flex flex-row align-items-start">
              <textarea
                className="form-control ml-1 shadow-none textarea"
                defaultValue={""}
                value={remarks}
                style={{
                  height: '160px',
                  fontSize: '13px',
                  marginInline: '10px'
                }}
                onChange={(event) =>
                  handleInputChangeRemarks(event)
                }
              />
            </div>
            <div className="mt-2 text-right" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                type="button"
                onClick={() => handleSubmit(cartSelectData)}
              >
                Save
              </Button>
              <Button
                className="btn btn-outline-primary btn-sm cancelremarkbtn ml-1 shadow-none"
                type="button"
                onClick={handleCloseItemRemark}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>


        <Dialog open={openOrderRemark} onClose={handleCloseOrderRemark} >
          <div className="ItemRemarkMain">

            <p style={{ padding: '15px 15px 0px 15px', fontWeight: 500 }} >Add The Order Remark..</p>

            <div className="d-flex flex-row align-items-start">
              <textarea
                className="form-control ml-1 shadow-none textarea"
                defaultValue={""}
                value={Mainremarks}
                style={{
                  height: '160px',
                  fontSize: '13px',
                  marginInline: '10px'
                }}
                onChange={(e) => handleInputChangeMainRemarks(e)}
              />
            </div>
            <div className="mt-2 text-right Orderremarkbtn">
              <Button
                className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                type="button"
                onClick={submitMainRemrks}
              >
                Save
              </Button>
              <Button
                className="btn btn-outline-primary btn-sm cancelremarkbtn ml-1 shadow-none"
                type="button"
                onClick={handleCloseOrderRemark}
              >
                Cancel
              </Button>
            </div>

            {/* <div className="d-flex flex-row align-items-start">
              <textarea
                className="form-control ml-1 shadow-none textarea"
                defaultValue={""}
                value={remarks}
                style={{
                  height: '100px',
                  fontSize: '13px',
                  marginInline: '10px'
                }}
                onChange={(event) =>
                  handleInputChangeRemarks(event)
                }
              />
            </div>
            <div className="mt-2 text-right">
              <Button
                className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                type="button"
                onClick={() => handleSubmit(cartSelectData)}
              >
                Save
              </Button>
              <Button
                className="btn btn-outline-primary btn-sm cancelremarkbtn ml-1 shadow-none"
                type="button"
                onClick={handleCloseOrderRemark}
              >
                Cancel
              </Button>
            </div> */}
          </div>
        </Dialog>
        <div className="smilingCartPageMain">
          <div
            style={{
              width: "-webkit-fill-available",
              backgroundColor: "white",
              zIndex: "111",
            }}
          >
            {cartListData?.length !== 0 && !isLoading &&
              <div class="bg-imageCart">
                <div class="overlay"></div>
                <div class="text-container">
                  <div className='textContainerData'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p className="designCounttext" style={{ fontSize: '30px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        My Cart
                      </p>
                    </div>
                    <img src={`${storImagePath()}/images/HomePage/MainBanner/image/featuresImage.png`} className='featherImage' />
                  </div>
                </div>
              </div>
            }

            {/* <div className="backErrorMobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {cartListData?.length !== 0 && (
                <div className="backErrorMobile">
                  <IoArrowBackOutline style={{ height: '30px', marginLeft: '5px', width: '30px', color: 'rgb(192 182 182)' }} onClick={() => navigation("/productpage")} />
                </div>)}
              <p className="SmiCartTitle" style={{ paddingTop: "30px" }}>
                My Cart
              </p>
              {cartListData?.length !== 0 && (
                <div className="ClreareAllMobilee">
                  <p style={{ fontWeight: 600, margin: '0px', textDecoration: 'underline', width: '80px', cursor: 'pointer', color: 'rgb(192 182 182)' }} onClick={handleClickOpen}>Clear All</p>
                </div>)}
            </div> */}

            {/* <div
              className="smilingListCartTopButtonNew"
              style={{ marginTop: "0px" }}

            >

            </div> */}
            <div>
              {cartListData?.length !== 0 && !isLoading &&
                <div
                  className="smilingListCartTopButton"
                  style={{ marginTop: "0px" }}
                >
                  <div className="filterDivcontainerCartPage" style={{ width: '100%', height: '60px' }}>
                    <div className="partCart totalPriceTopMain" style={{ flex: '20%' }}>
                      <div style={{ display: 'flex' }}>
                        <span style={{ color: '#7d7f85', fontSize: '16px', marginRight: '3px' }}>Total Price: </span>
                        <div style={{ display: 'flex' }}>
                          <div className="currencyFont" style={{ color: '#7d7f85', fontSize: '18px' }} dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />
                          <span style={{ color: '#7d7f85', fontSize: '16px', fontWeight: '500', }}>{cartListData.reduce((total, item) => total + item.UnitCost, 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="divider totalPriceTopMain"></div>

                    <div className="partCart showTotalItemTop" style={{ flex: '20%' }}>
                      <span style={{ color: '#7d7f85', fontWeight: '500', fontSize: '16px', }}>{cartListData?.length} Items</span>

                    </div>

                    <div className="divider showTotalItemTop"></div>

                    <div className="partCart" style={{ flex: '20%' }}>
                      <div style={{ display: 'flex', }}>
                        <p
                          className="cartPageTopLink"
                          onClick={handleClickOpen}
                        >
                          Clear All
                        </p>
                      </div>
                    </div>

                    <div className="divider"></div>

                    <div className="partCart" style={{ flex: '20%' }}>
                      <p style={{ margin: '0px 10px', fontSize: '16px', fontWeight: 600, cursor: 'prodTitleLine', color: '#7d7f85', textDecoration: 'underline' }} onClick={handleClickOpenOrderRemark}>{cartSelectData?.OrderRemarks ? 'View & Edit Remark' : 'Add Order Remark'}</p>
                    </div>
                    <div className="divider"></div>

                    <div className="partCart topPlcaeOrderBtn" style={{ flex: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Button
                        className="cartPageTopBtn"
                        onClick={handlePlaceOrder}
                      // style={{ position: 'absolute', right: '0px', height: '50px' }}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              }
              {cartListData?.length !== 0 && (
                <>
                  <button
                    className="placeOrderCartPageBtnMobile"
                    onClick={handlePlaceOrder}
                    style={{ display: dialogOpen && 'none' }}
                  >
                    Place Order
                  </button>
                </>
              )}

            </div>
          </div>

          <CustomTabPanel value={value} index={0}>
            <div
              style={{
                display: "flex",
                marginTop: '5px'
              }}
              className="cartPageMobileSet"
            >
              <div className="smilingCartDeatilSub2">
                {cartListData?.length === 0 ? (
                  !isLoading && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBlock: "90px",
                      }}
                    >
                      <p
                        style={{
                          margin: "0px",
                          fontSize: "20px",
                          fontWeight: 500,
                        }}
                      >
                        No Data Available
                      </p>
                      <p>Please First Add To Cart Data</p>
                      <button
                        className="browseBtnMore"
                        onClick={() => handelBrowse()}
                      >
                        BROWSE OUR COLLECTION
                      </button>
                    </div>
                  )
                ) : (
                  <div className="mainCartContainer">
                    {!isLoading && (
                      <div className="cartProdSection resCon" style={{ scrollbarWidth: cartListData?.length <= 2 && 'none' }}>

                        <div className="cartProdpart" >
                          {cartListData?.map((item, index) => (
                            <div
                              key={item.id}
                              className={`smiling-cartPageBoxMain ${cartSelectData && cartSelectData.id === item.id ? 'selected' : ''}`}
                              onClick={async () => {
                                setCartSelectData(item);
                                setProdFullInfo(item.designno);
                                getSizeData(item.autocode);
                                window.innerWidth <= 1080 &&
                                  setDialogOpen(true);

                                await SingleProductAPI(item?.designno).then((res) => {
                                  let data = res[0]
                                  setSingleProdData(data)
                                })
                              }}
                            >
                              <img
                                src={item.DefaultImageName != '' ? `${imageURL}/${yKey}/${item.DefaultImageName}` : noFoundImage}
                                alt="#"
                                className="cartImageShow"
                                onError={(e) => {
                                  e.target.src = noFoundImage;
                                }}
                                onClick={async () => {
                                  setCartSelectData(item);
                                  setProdFullInfo(item.designno);
                                  getSizeData(item.autocode);
                                  window.innerWidth <= 1080 &&
                                    setDialogOpen(true);

                                  await SingleProductAPI(item?.designno).then((res) => {
                                    let data = res[0]
                                    setSingleProdData(data)
                                  })
                                }}
                              />
                              <div className="listing-featuresN" style={{ marginTop: '30px' }}>
                                <p className="designNo">{item.designno}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 10px 0px 0px' }}>
                                  <div>
                                    <div className='feature'>
                                      <p>
                                        <span className="feature-count">NWT :{" "} </span> {item?.MetalWeight}
                                      </p>
                                    </div>
                                    <div className='feature'>
                                      <p style={{ margin: '0px' }}>
                                        <span className="feature-count">DWT :{" "} </span>  {(item?.Rec_DiamondWeight).toFixed(3)} /{" "}
                                        {item?.totaldiamondpcs}
                                      </p>
                                    </div>
                                    <div className='feature'>
                                      <p>
                                        {/* <span className="feature-count">{item?.designno}</span> */}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className='feature'>
                                      <p>
                                        <span className="feature-count">CWT :{" "} </span>  {item?.Rec_CSWeight} /{" "}
                                        {item?.totalcolorstonepcs}
                                      </p>
                                    </div>
                                    <div className='feature'>
                                      <p style={{ margin: '0px' }}>
                                        <span className="feature-count">GWT :{" "}  </span>   {(item?.grossweight).toFixed(3)}
                                      </p>
                                    </div>
                                    {/* <div className='feature'>
                                    <p>
                                      <span className="feature-count" style={{ display: 'flex' }}>
                                        <div className="currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />
                                        {(
                                      (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0)) +
                                      (dqcData ?? 0) +
                                      (csqcData ?? 0) +
                                      (sizeMarkup ?? 0) +
                                      (metalUpdatedPrice() ?? 0) +
                                      (diaUpdatedPrice() ?? 0) +
                                      (colUpdatedPrice() ?? 0)
                                    ).toFixed(2)}
                                    </span>
                                    </p>
                                  </div> */}
                                  </div>
                                </div>

                                <p style={{ position: 'absolute', bottom: '13px' }}>{item?.Remarks ? 'Remark : ' + item?.Remarks : ''}</p>
                                <div className="bottomBtnCart" style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: '10px', width: '35%' }}>
                                  {/* <p onClick={() => handleClickOpenItemRemark(item.autocode, item.designno)} style={{ margin: '0px', fontSize: '13px', cursor: 'pointer', color: '#7d7f85', textDecoration: 'underline' }}>Item Remark</p> */}
                                  <p style={{ margin: '0px', fontSize: '13px', cursor: 'pointer', color: '#7d7f85', textDecoration: 'underline' }}>Item Remark</p>
                                  <p style={{ margin: '0px', fontSize: '13px', cursor: 'pointer', color: '#7d7f85', textDecoration: 'underline' }}

                                  >Remove</p>

                                  {/* <p style={{ margin: '0px', fontSize: '13px', cursor: 'pointer', color: '#7d7f85', textDecoration: 'underline' }}
                                    onClick={() => handleClickOpenSingleRemove(item)}
                                  >Remove</p> */}
                                </div>

                                {/* <div
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  right: "0px",
                                  top: "0px",
                                  backgroundColor: "black",
                                  borderRadius: "2px",
                                  opacity: "0.8",
                                }}
                                onClick={() => handleRemove(item)}
                              >
                                <CloseIcon
                                  sx={{ color: "white", fontSize: "22px" }}
                                />
                              </div> */}

                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div className="">
                          <div className="container-fluid mainOrderRenarkConatiner m-3" style={{ border: MainremarksApires != '' && '1px solid rgb(225, 225, 225)', borderRadius: '12px' }}>
                            <div className="d-flex justify-content-center row">
                              <div className="col-md-12">
                                <div className="d-flex flex-column comment-section">
                                  {MainremarksApires != '' ?
                                    <>
                                      <div className="bg-white p-2">
                                        <div className="d-flex flex-row user-info">
                                          <h6 className="remarkText">Order Remark</h6>
                                        </div>
                                        <div className="mt-2">
                                          <p className="comment-text remarkText w-100" style={{ wordWrap: 'break-word' }}>
                                            {MainremarksApires != '' ? MainremarksApires : cartSelectData?.OrderRemarks}
                                          </p>
                                        </div>
                                      </div>
                                      {!showOrderRemarkFields &&
                                        <div className="mt-2 mb-2 text-right Orderremarkbtn">
                                          <button
                                            className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                                            type="button"
                                            onClick={handleShowOrderReamrkFields}
                                          >
                                            Add Order Remark
                                          </button>
                                        </div>
                                      }
                                    </>
                                    :
                                    <p onClick={handleShowOrderReamrkFields} style={{ margin: '10px 0px', textAlign: 'end', fontSize: '18px', cursor: 'pointer', color: '#7d7f85', textDecoration: 'underline' }}>Add Order Remark</p>
                                  }
                                  {showOrderRemarkFields &&
                                    <div className={`p-2 remark-fields ${showOrderRemarkFields ? 'active' : ''}`}>
                                      <div className="d-flex flex-row align-items-start">
                                        <textarea
                                          className="form-control ml-1 shadow-none textarea"
                                          defaultValue={""}
                                          value={Mainremarks}
                                          style={{
                                            height: '100px',
                                            fontSize: '13px'
                                          }}
                                          onChange={(e) => handleInputChangeMainRemarks(e)}
                                        />
                                      </div>
                                      <div className="mt-2 text-right Orderremarkbtn">
                                        <button
                                          className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                                          type="button"
                                          onClick={submitMainRemrks}
                                        >
                                          Save
                                        </button>
                                        <button
                                          className="btn btn-outline-primary btn-sm cancelremarkbtn ml-1 shadow-none"
                                          type="button"
                                          onClick={() => setShowOrderRemarkFields(!showOrderRemarkFields)}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    )}
                    {!isLoading && (
                      <div className="resproDet">
                        <div
                          className="smilingCartDeatilSub1"
                          style={{
                            display:
                              !prodSelectData && !cartSelectData && "none",
                          }}
                        >
                          <div className="popUpcontainer">
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                              <div
                                style={{
                                  borderRadius: "12px",
                                  width: "90%",
                                  height: "410px",
                                  border: "1px solid #e1e1e1",
                                  overflow: 'hidden',
                                  position: 'relative'
                                }}
                                className="CartPageMainImageShowMobile"
                              >
                                <img
                                  src={
                                    storeInitData?.DesignImageFol +
                                    cartSelectData?.DefaultImageName?.slice(13)
                                  }
                                  style={{
                                    borderRadius: "12px",
                                    width: "100%",
                                    height: "100%"
                                  }}
                                  onError={(e) => {
                                    e.target.src = noFoundImage;
                                  }}
                                />
                                <p style={{ position: 'absolute', top: '5px', left: '5px', fontSize: '14px' }}>{cartSelectData?.designno}</p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end' }} className="cartCustomizationMainMobileMain">
                              <div style={{ width: "90%" }} className="cartCustomizationMainMobile">
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  className="srcolorsizecarat"
                                >
                                  {isProductCuFlag === 1 && (
                                    <div
                                      style={{
                                        // borderTop: "1px solid #e1e1e1",
                                        marginInline: "-10px",
                                        padding: "10px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          flexWrap: "wrap",
                                          // marginTop: "50px",
                                        }}
                                      >
                                        {isMetalCutoMizeFlag == 1 && (
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              width: "45%",
                                            }}
                                          >
                                            <label
                                              style={{
                                                fontSize: "12.5px",
                                                color: "#7d7f85",
                                              }}
                                            >
                                              METAL TYPE :
                                            </label>
                                            <select
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                color: "#7d7f85",
                                                backgroundColor: 'rgb(244 244 244)',
                                                fontSize: "12.5px",
                                                height: '30px'
                                              }}
                                              // value={mtTypeOption ?? cartSelectData?.metal}
                                              value={mtTypeOption}
                                              onChange={(e) =>
                                                setmtTypeOption(e.target.value)
                                              }
                                            >
                                              {metalType.map((data, index) => (
                                                <option
                                                  key={index}
                                                  value={data.metalType}
                                                >
                                                  {data.metaltype}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        )}

                                        {isMetalCutoMizeFlag == 1 && (
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              width: "45%",
                                            }}
                                          >
                                            <label
                                              style={{
                                                fontSize: "12.5px",
                                                color: "#7d7f85",
                                              }}
                                            >
                                              METAL COLOR :
                                            </label>
                                            <select
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                backgroundColor: 'rgb(244 244 244)',
                                                color: "#7d7f85",
                                                fontSize: "12.5px",
                                                height: '30px'

                                              }}
                                              value={selectedColor}
                                              onChange={(e) =>
                                                setSelectedColor(e.target.value)
                                              }
                                            >
                                              {metalColorData.map((colorItem) => (
                                                <option
                                                  key={colorItem.ColorId}
                                                  value={colorItem.metalcolorname}
                                                >
                                                  {colorItem.metalcolorname}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        )}

                                        {isDaimondCstoFlag == 1 && (cartSelectData?.totalDiaWt !== 0 || cartSelectData?.totaldiamondpcs !== 0) && (
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              width: "45%",
                                              marginTop: "20px",
                                            }}
                                          >
                                            <label
                                              style={{
                                                fontSize: "12.5px",
                                                color: "#7d7f85",
                                              }}
                                            >
                                              DIAMOND :
                                            </label>
                                            <select
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                color: "#7d7f85",
                                                backgroundColor: 'rgb(244 244 244)',
                                                fontSize: "12.5px",
                                                height: '30px'
                                              }}
                                              value={diaQColOpt}
                                              onChange={(e) =>
                                                setDiaQColOpt(e.target.value)
                                              }
                                            >
                                              {colorData?.map((colorItem) => (
                                                <option
                                                  key={colorItem.ColorId}
                                                  value={`${colorItem.Quality}#${colorItem.color}`}
                                                >
                                                  {`${colorItem.Quality}#${colorItem.color}`}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        )}

                                        {isCColrStoneCustFlag == 1 &&
                                          (cartSelectData?.totalcolorstonepcs !== 0 ||
                                            cartSelectData?.totalCSWt !== 0) && (
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "45%",
                                                marginTop: "20px",
                                              }}
                                            >
                                              <label
                                                style={{
                                                  fontSize: "12.5px",
                                                  color: "#7d7f85",
                                                }}
                                              >
                                                COLOR STONE :
                                              </label>
                                              <select
                                                style={{
                                                  border: "none",
                                                  outline: "none",
                                                  backgroundColor: 'rgb(244 244 244)',
                                                  color: "#7d7f85",
                                                  fontSize: "12.5px",
                                                  height: '30px'
                                                }}
                                                value={cSQopt}
                                                onChange={(e) =>
                                                  setCSQOpt(e.target.value)
                                                }
                                              >
                                                {DaimondQualityColor.map(
                                                  (data, index) => (
                                                    <option
                                                      key={index}
                                                      value={`${data.Quality}_${data.color}`}
                                                    >
                                                      {`${data.Quality}_${data.color}`}
                                                    </option>
                                                  )
                                                )}
                                              </select>
                                            </div>
                                          )}

                                        {(sizeData?.length !== 0 && (productData?.DefaultSize && productData.DefaultSize.length !== 0)) && (
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              width: "45%",
                                              marginTop: "20px",
                                            }}
                                          >
                                            <label
                                              style={{
                                                fontSize: "12.5px",
                                                color: "#7d7f85",
                                              }}
                                            >
                                              SIZE :
                                            </label>
                                            <select
                                              style={{
                                                border: "none",
                                                outline: "none",
                                                backgroundColor: 'rgb(244 244 244)',
                                                color: "#7d7f85",
                                                fontSize: "12.5px",
                                                height: '30px'
                                              }}
                                              onChange={(e) =>
                                                handelSize(e.target.value)
                                              }
                                              value={sizeOption
                                                // ??
                                                // (productData && productData.DefaultSize
                                                //   ? productData.DefaultSize
                                                //   : sizeData.find(
                                                //     (size) =>
                                                //       size.IsDefaultSize === 1
                                                //   )?.id)
                                              }
                                            >
                                              {sizeData?.map((size) => (
                                                <option
                                                  key={size.id}
                                                  // value={cartSelectData?.detail_ringsize ?? size.sizename} // Pass sizename as value
                                                  value={size.sizename} // Pass sizename as value
                                                // selected={
                                                //   productData &&
                                                //   productData.DefaultSize ===
                                                //   size.sizename
                                                // }
                                                >
                                                  {size.sizename}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div
                                  style={{
                                    marginTop: "20px",
                                    color: "#7d7f85",
                                    fontSize: "14px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {/* <div
                                    className="smilingQualityMain"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="number"
                                      style={{
                                        border: "0px",
                                        textAlign: "center",
                                        outline: "none",
                                        width: "80px",
                                        height: "35px",
                                        border: "1px solid #7d7f85",
                                      }}
                                      maxLength={2}
                                      className="simlingQualityBox"
                                      inputMode="numeric"
                                      onClick={(event) => event.target.select()}
                                      value={lastEnteredQuantity}
                                      onChange={(event) =>
                                        handleInputChange(event)
                                      }
                                    />
                                    <button
                                      className="SmilingUpdateQuantityBtn"
                                      onClick={() =>
                                        handleUpdateQuantity(
                                          prodSelectData?.designno
                                        )
                                      }
                                    >
                                      QTY
                                    </button>
                                  </div> */}

                                  <div className="QTYUpateMain">
                                    <div>
                                      <Button className="QtyLess" disabled={qtyUpdateWaiting && true} onClick={handleDecrementQuantity}>-</Button>
                                    </div>
                                    <p className="QTYvalue">
                                      {lastEnteredQuantity}
                                    </p>
                                    <div>
                                      <Button className='QtyAdd' disabled={qtyUpdateWaiting && true} onClick={handleIncrementQuantity}>+</Button>
                                    </div>
                                  </div>
                                  <span>
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        fontSize: "18px",
                                        color: "black",
                                        display: 'flex'
                                      }}
                                    >
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: decodeEntities(
                                            currData?.Currencysymbol
                                          ),
                                        }}
                                        style={{ fontFamily: "sans-serif" }}
                                      />
                                      {(FinalPrice() * lastEnteredQuantity).toFixed(2)}
                                    </span>
                                  </span>
                                </div>
                                <div className="similingCartPageBotttomMain">
                                  <div style={{ textAlign: 'right' }}>
                                    <button
                                      style={{
                                        border: 'none',
                                        outline: 'none',
                                        backgroundColor: '#e1e1e1',
                                        padding: '6px 17px',
                                        borderRadius: '4px',
                                      }}

                                      onClick={handleCartUpdate}
                                    >
                                      {!isLodingSave ?
                                        <span
                                          style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                          }}
                                          className="SaveBtnCart"
                                          onClick={handleCartUpdate}
                                        >
                                          Apply
                                        </span>
                                        :
                                        <span
                                          className="SaveBtnCart"
                                          style={{ display: 'flex' }}
                                        >
                                          <CircularProgress style={{ height: '20px', width: '20px' }} />
                                        </span>

                                      }
                                    </button>
                                    {/*   <div className="mt-3">
                                      <div className="container-fluid mainRenarkConatiner" style={{ border: remarksApires != '' && '1px solid rgb(225, 225, 225)', borderRadius: '12px' }}>
                                        <div className="d-flex justify-content-center row">
                                          <div className="col-md-12">
                                            <div className="d-flex flex-column comment-section">
                                            {remarksApires != '' ?
                                              <>
                                                <div className="bg-white p-2">
                                                  <div className="d-flex flex-row user-info">
                                                    <h6 className="remarkText">Product Remark</h6>
                                                  </div>
                                                  <div className="mt-2">
                                                    <p className="comment-text remarkText w-100" style={{ wordWrap: 'break-word' }}>
                                                      {remarksApires != '' ? remarksApires : cartSelectData?.Remarks}
                                                    </p>
                                                  </div>
                                                </div>
                                                {!showRemarkFields &&
                                                  <div className="mt-2 mb-2 text-right">
                                                    <button
                                                      className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                                                      type="button"
                                                      onClick={handleShowReamrkFields}
                                                    >
                                                      Add Remark
                                                    </button>
                                                  </div>
                                                }
                                              </>
                                              :
                                              <p onClick={handleShowReamrkFields} style={{ margin: '0px', fontSize: '18px', cursor: 'pointer', color: '#7d7f85', textDecoration: 'underline' }}>Add Product Remark</p>
                                            } 


                                              {showRemarkFields &&
                                                <div className={`p-2 remark-fields ${showRemarkFields ? 'active' : ''}`}>
                                                  <div className="d-flex flex-row align-items-start">
                                                    <textarea
                                                      className="form-control ml-1 shadow-none textarea"
                                                      defaultValue={""}
                                                      value={remarks}
                                                      style={{
                                                        height: '100px',
                                                        fontSize: '13px'
                                                      }}
                                                      onChange={(event) =>
                                                        handleInputChangeRemarks(event)
                                                      }
                                                    />
                                                  </div>
                                                  <div className="mt-2 text-right">
                                                    <button
                                                      className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                                                      type="button"
                                                      onClick={() => handleSubmit(cartSelectData)}
                                                    >
                                                      Save
                                                    </button>
                                                    <button
                                                      className="btn btn-outline-primary btn-sm cancelremarkbtn ml-1 shadow-none"
                                                      type="button"
                                                      onClick={() => setShowRemarkFields(!showRemarkFields)}
                                                    >
                                                      Cancel
                                                    </button>
                                                  </div>
                                                </div>
                                              }
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div style={{ paddingBottom: "150px", marginTop: "10px" }}>
              {cartListData?.length === 0 ? (
                !isLoading && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "200px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0px",
                        fontSize: "20px",
                        fontWeight: 500,
                      }}
                    >
                      No Data Available
                    </p>
                    <p>Please First Add To Cart Data</p>
                    {/* <button
                      className="browseBtnMore"
                      onClick={() => navigation("/productpage")}
                    >
                      BROWSE OUR COLLECTION
                    </button> */}
                  </div>
                )
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: '0px 20px 0px 20px'
                  }}
                >
                  <Grid container spacing={2}>
                    {cartListData.map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                          <CardContent>
                            <Typography variant="body1" component="p" className="ImageViewdesignNo" style={{ position: 'absolute' }}>
                              {item.designno}
                            </Typography>
                            <CardMedia
                              component="img"
                              src={item.DefaultImageName !== '' ? `${imageURL}/${yKey}/${item.DefaultImageName}` : noFoundImage}
                              onError={(e) => {
                                e.target.src = noFoundImage;
                              }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
              {/* {cartListData.length > 0 &&
                <div className="mt-2" style={{ display: 'flex', justifyContent: 'end', margin: '0px 10px 0px 0px' }}>
                  <div className="container-fluid mainOrderRenarkConatiner" style={{ border: '1px solid rgb(225, 225, 225)', borderRadius: '12px' }}>
                    <div className="d-flex justify-content-center row">
                      <div className="col-md-12">
                        <div className="d-flex flex-column comment-section">
                          <div className="bg-white p-2">
                            <div className="d-flex flex-row user-info">
                              <h6 className="remarkText">Order Remark</h6>
                            </div>
                            <div className="mt-2">
                              <p className="comment-text remarkText w-100" style={{ wordWrap: 'break-word' }}>
                                {MainremarksApires != '' ? MainremarksApires : cartSelectData?.OrderRemarks}
                              </p>
                            </div>
                          </div>

                          {!showOrderRemarkFields &&
                            <div className="mt-2 mb-2 text-right Orderremarkbtn">
                              <button
                                className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                                type="button"
                                onClick={handleShowOrderReamrkFields}
                              >
                                Add Order Remark
                              </button>
                            </div>
                          }
                          {showOrderRemarkFields &&
                            <div className={`p-2 remark-fields ${showOrderRemarkFields ? 'active' : ''}`}>
                              <div className="d-flex flex-row align-items-start">
                                <textarea
                                  className="form-control ml-1 shadow-none textarea"
                                  defaultValue={""}
                                  value={Mainremarks}
                                  style={{
                                    height: '100px',
                                    fontSize: '13px'
                                  }}
                                  onChange={(e) => handleInputChangeMainRemarks(e)}
                                />
                              </div>
                              <div className="mt-2 text-right Orderremarkbtn">
                                <button
                                  className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                                  type="button"
                                  onClick={submitMainRemrks}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-outline-primary btn-sm cancelremarkbtn ml-1 shadow-none"
                                  type="button"
                                  onClick={() => setShowOrderRemarkFields(!showOrderRemarkFields)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              } */}
            </div>
          </CustomTabPanel>
        </div >

        <div
          style={{
            position: cartListData?.length === 0 || isLoading ? 'absolute' : 'static',
            bottom: cartListData?.length === 0 || isLoading ? '0px' : 'auto',
            width: '100%'
          }}
          className="mobileFootreCs"
        >
          <Footer />
        </div>
      </div >
      <Dialog
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        // fullWidth
        // maxWidth={"xl"}
        fullScreen
      >
        {!isLoading && (
          <div style={{ marginTop: "35px" }}>
            <div>
              <div
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "12px",
                  top: "12px",
                  borderRadius: "12px",
                }}
                onClick={() => setDialogOpen(false)}
              >
                <CloseIcon sx={{ color: "black", fontSize: "30px" }} />
              </div>
            </div>
            <div
              className="smilingCartDeatilSub11"
              style={{ display: !prodSelectData && !cartSelectData && "none" }}
            >
              <div className="popUpcontainer">
                <img
                  src={
                    storeInitData?.DesignImageFol +
                    cartSelectData?.DefaultImageName?.slice(13)
                  }
                  style={{
                    border: "1px solid #e1e1e1",
                    borderRadius: "12px",
                    width: "100%",
                  }}
                />

                <div style={{ width: '100%' }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    className="srcolorsizecarat"
                  >
                    <div
                      style={{
                        fontSize: "40px",
                        fontFamily: "FreightDisp Pro Medium",
                        color: "#7d7f85",
                        lineHeight: "40px",
                        marginBottom: "14px",
                      }}
                      className="prodTitleLine"
                    >
                      {prodSelectData?.TitleLine}
                    </div>

                    {/* <Divider
                    sx={{
                        margin: "12px",
                        backgroundColor: "#e1e1e1",
                        marginLeft: "-5px",
                    }}
                    /> */}
                    {isProductCuFlag === 1 && (
                      <div
                        style={{
                          borderTop: "1px solid #e1e1e1",
                          marginInline: "-10px",
                          padding: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {isMetalCutoMizeFlag == 1 && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "49%",
                              }}
                            >
                              <label
                                style={{ fontSize: "12.5px", color: "#7d7f85" }}
                              >
                                METAL COLOR:
                              </label>
                              <select
                                style={{
                                  border: "none",
                                  outline: "none",
                                  color: "#7d7f85",
                                  fontSize: "12.5px",
                                  height: '25px'
                                }}
                                value={selectedColor}
                                onChange={(e) =>
                                  setSelectedColor(e.target.value)
                                }
                              >
                                {metalColorData.map((colorItem) => (
                                  <option
                                    key={colorItem.ColorId}
                                    value={colorItem.metalcolorname}
                                  >
                                    {colorItem.metalcolorname}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {isMetalCutoMizeFlag == 1 && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "49%",
                              }}
                            >
                              <label
                                style={{ fontSize: "12.5px", color: "#7d7f85" }}
                              >
                                METAL TYPE:
                              </label>
                              <select
                                style={{
                                  border: "none",
                                  outline: "none",
                                  color: "#7d7f85",
                                  fontSize: "12.5px",
                                  height: '25px'

                                }}
                                // value={mtTypeOption ?? cartSelectData?.metal}
                                value={mtTypeOption}
                                onChange={(e) =>
                                  setmtTypeOption(e.target.value)
                                }
                              >
                                {metalType.map((data, index) => (
                                  <option key={index} value={data.metalType}>
                                    {data.metaltype}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: 'wrap',
                            marginTop: '5px'
                          }}
                        >
                          {isDaimondCstoFlag == 1 && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "49%",
                                marginTop: "10px",
                              }}
                            >
                              <label
                                style={{ fontSize: "12.5px", color: "#7d7f85" }}
                              >
                                DAIMOND :
                              </label>
                              <select
                                style={{
                                  border: "none",
                                  outline: "none",
                                  color: "#7d7f85",
                                  fontSize: "12.5px",
                                  height: '25px'
                                }}
                                value={diaQColOpt}
                                onChange={(e) => setDiaQColOpt(e.target.value)}
                              >
                                {colorData?.map((colorItem) => (
                                  <option
                                    key={colorItem.ColorId}
                                    value={`${colorItem.Quality}#${colorItem.color}`}
                                  >
                                    {`${colorItem.Quality}#${colorItem.color}`}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {isCColrStoneCustFlag == 1 && (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "49%",
                              }}
                            >
                              <label
                                style={{
                                  fontSize: "12.5px",
                                  color: "#7d7f85",
                                  marginTop: "10px",
                                }}
                              >
                                COLOR STONE:
                              </label>
                              <select
                                style={{
                                  border: "none",
                                  outline: "none",
                                  color: "#7d7f85",
                                  fontSize: "12.5px",
                                  height: '25px'
                                }}
                                value={cSQopt}
                                onChange={(e) => setCSQOpt(e.target.value)}
                              >
                                {DaimondQualityColor.map((data, index) => (
                                  <option
                                    key={index}
                                    value={`${data.Quality}-${data.color}`}
                                  >
                                    {`${data.Quality}-${data.color}`}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {(sizeData?.length !== 0 ||
                            (productData?.DefaultSize &&
                              productData.DefaultSize.length !== 0)) && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "49%",
                                  marginTop: "10px",
                                }}
                              >
                                <label
                                  style={{ fontSize: "12.5px", color: "#7d7f85" }}
                                >
                                  SIZE:
                                </label>
                                <select
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    color: "#7d7f85",
                                    fontSize: "12.5px",
                                    height: '25px'
                                  }}
                                  onChange={(e) => handelSize(e.target.value)}
                                  defaultValue={
                                    productData && productData.DefaultSize
                                      ? productData.DefaultSize
                                      : sizeData.find(
                                        (size) => size.IsDefaultSize === 1
                                      )?.id
                                  }
                                >
                                  {sizeData?.map((size) => (
                                    <option
                                      key={size.id}
                                      value={sizeOption} // Pass sizename as value
                                      selected={
                                        productData &&
                                        productData.DefaultSize === size.sizename
                                      }
                                    >
                                      {size.sizename}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                        </div>

                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      color: "#7d7f85",
                      fontSize: "14px",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {/* <div
                      className="smilingQualityMain"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        type="text"
                        style={{
                          border: "0px",
                          textAlign: "center",
                          outline: "none",
                          width: "80px",
                          height: "35px",
                          border: "1px solid #7d7f85",
                        }}
                        maxLength={2}
                        className="simlingQualityBox"
                        inputMode="numeric"
                        onClick={(event) => event.target.select()}
                        value={lastEnteredQuantity}
                        onChange={(event) => handleInputChange(event)}
                      />
                      <button
                        className="SmilingUpdateQuantityBtn"
                        onClick={() =>
                          handleUpdateQuantity(prodSelectData?.designno)
                        }
                      >
                        QTY
                      </button>
                    </div> */}

                    <div className="QTYUpateMain" style={{ backgroundColor: qtyUpdateWaiting && '#d3d3d375' }}>
                      <div>
                        <Button className="QtyLess" disabled={qtyUpdateWaiting && true} onClick={handleDecrementQuantity}>-</Button>
                      </div>
                      <p className="QTYvalue">
                        {lastEnteredQuantity}
                      </p>
                      <div>
                        <Button className='QtyAdd' disabled={qtyUpdateWaiting && true} onClick={handleIncrementQuantity}>+</Button>
                      </div>
                    </div>

                    <MdDeleteOutline style={{ height: '30px', width: '30px' , color:'#ff0000a8' }} onClick={handleRemove}/>

                    <span>
                      Price :
                      <span
                        style={{
                          fontWeight: "500",
                          fontSize: "18px",
                          color: "black",
                          marginLeft: '3px'
                        }}
                      >
                        {currencySymbol?.Currencysymbol}
                        {(
                          ((((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)) +
                            (dqcData ?? 0) +
                            (csqcData ?? 0) +
                            (sizeMarkup ?? 0) +
                            (metalUpdatedPrice() ?? 0) +
                            (diaUpdatedPrice() ?? 0) +
                            (colUpdatedPrice() ?? 0)) *
                          lastEnteredQuantity
                        ).toFixed(2)}
                      </span>
                    </span>
                  </div>
                  <div className="ItemRemarkMain">
                    <div className="d-flex flex-row align-items-start">
                      <textarea
                        className="form-control ml-1 shadow-none textarea"
                        defaultValue={""}
                        placeholder="Enter Item Remark...."
                        value={remarks}
                        style={{
                          height: '100px',
                          fontSize: '13px',
                          marginTop: '30px'
                        }}
                        onChange={(event) =>
                          handleInputChangeRemarks(event)
                        }
                      />
                    </div>
                    <div className="mt-2 text-right" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <Button
                          className="btn btn-primary btn-sm shadow-none showremarkbtn me-2"
                          type="button"
                          onClick={}
                        >
                          Save
                        </Button> */}
                      {/* <Button
                          className="saveRemakrBtn"
                          type="button"
                          onClick={() => handleSubmit(cartSelectData)}
                        >
                          Save Remark
                        </Button> */}
                    </div>
                  </div>
                  <div className="similingCartPageBotttomMain">
                    <button
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "#e1e1e1",
                        padding: "10px 17px",
                        width: '100%',
                        position: 'absolute',
                        bottom: '0px',
                        borderRadius: "4px",
                      }}
                    >
                      {!isLodingSave ?
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                          className="SaveBtnCart"
                          onClick={handleCartUpdate}
                        >
                          Apply
                        </span>
                        :
                        <span
                          className="SaveBtnCart"
                          style={{ display: 'flex' , justifyContent: 'center', alignItems:'center', height:'23px' }}
                        >
                          <CircularProgress style={{ height: '20px', width: '20px' }} />
                        </span>

                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
