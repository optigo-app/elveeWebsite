import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../home/Footer/Footer";
import SmilingRock from "../home/smiling_Rock/SmilingRock";
import "./product.css";
import featherImg from '../../assets/LV Feather.png';
import { json, useFetcher, useLocation, useNavigate } from "react-router-dom";
import prodListData from "../../jsonFile/Productlist_4_95oztttesi0o50vr.json";
// import prodListData from "../../jsonFile/testingFile/Productlist_4_95oztttesi0o50vr_Original.json";
import filterData from "../../jsonFile/M_4_95oztttesi0o50vr.json";
import PriceData from "../../jsonFile/Productlist_4_95oztttesi0o50vr_8.json";
// import PriceData from "../../jsonFile/testingFile/Productlist_4_95oztttesi0o50vr_8_Original.json";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CardContent, Checkbox, CircularProgress, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Pagination, Slider, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { CommonAPI } from "../../../Utils/API/CommonAPI";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CartListCounts, HeaderData, HeaderData2, WishListCounts, colorstoneQualityColorG, diamondQualityColorG, menuTransfData, metalTypeG, newMenuData, newTestProdData, priceData, productDataNew, searchData } from "../../../../../Recoil/atom";
import { GetCount } from "../../../Utils/API/GetCount";
import notFound from "../../assets/image-not-found.jpg";
import { productListApiCall } from "../../../Utils/API/ProductListAPI";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AppsIcon from '@mui/icons-material/Apps';
import GridViewIcon from '@mui/icons-material/GridView';
import { IoGrid } from "react-icons/io5";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getDesignPriceList } from "../../../Utils/API/PriceDataApi";
import { findCsQcId, findDiaQcId, findMetalColor, findMetalType, findMetalTypeId, findValueFromId, storImagePath } from "../../../Utils/globalFunctions/GlobalFunction";
import ProductListSkeleton from "./ProductListSkelton";

import { Card } from "react-bootstrap";
import ProductFilterSkelton from "./ProductFilterSkelton";
import { FaChevronDown } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";

function valuetext(value) {
  return `${value}°C`;
}

const ProductList = () => {

  const ProductData2 = [];
  const dropdownRef = useRef(null);

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [ProductApiData, setProductApiData] = useState([])
  const [ProductApiData2, setProductApiData2] = useState([])
  const [drawerShowOverlay, setDrawerShowOverlay] = useState(false)
  const [filterChecked, setFilterChecked] = useState({})
  const [wishFlag, setWishFlag] = useState({})
  const [cartFlag, setCartFlag] = useState(false)
  const [cartData, setCartData] = useState([])
  const [WishData, setWishData] = useState([])
  const [cartRemoveData, setCartRemoveData] = useState("")
  const [wishListRemoveData, setWishListRemoveData] = useState("")
  const [newProData, setNewProData] = useState([])
  // const [priceDataApi, setpriceDataApi] = useRecoilState(priceData)
  const [priceDataApi, setpriceDataApi] = useState([])
  const [currencySym, setCurrencySym] = useState()

  const [metalRdPrice, setMetalRdPrice] = useState([])
  const [diaRd1Price, setDiaRd1Price] = useState([])
  const [csRd2Price, setCsRd2Price] = useState([])

  const setCartCount = useSetRecoilState(CartListCounts)
  const setWishCount = useSetRecoilState(WishListCounts)
  const getHeaderData = useRecoilValue(HeaderData)
  const getHeaderData2 = useRecoilValue(HeaderData2)
  const getnewMenuData = useRecoilValue(newMenuData)
  const getAllProdData = useRecoilValue(newTestProdData);

  // console.log("getHeaderData2",getHeaderData2)

  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minNetwt, setMinNetwt] = useState(null);
  const [maxNetwt, setMaxNetwt] = useState(null);
  const [minGrosswt, setMinGrossWt] = useState(null);
  const [maxGrosswt, setMaxGrossWtt] = useState(null);
  const [minDiamondWt, setMinDiamondWt] = useState(null);
  const [maxDiamondWt, setMaxDiamondWt] = useState(null);

  const [hoverProductImageShow, setHoverProductImageShow] = useState(false);
  const [isColorWiseImageShow, setIsColorWiseImage] = useState('');
  const [updatedColorImage, setUpdateColorImage] = useState({});

  const navigate = useNavigate();

  const getPdData = useRecoilValue(productDataNew)
  const getSearchData = useRecoilValue(searchData)
  const mtName = useRecoilValue(metalTypeG)
  const dqcName = useRecoilValue(diamondQualityColorG)
  const csqcName = useRecoilValue(colorstoneQualityColorG)
  const [pdData, setPdData] = useRecoilState(productDataNew)
  const [dataPriceApiCallFlag, setDataPriceApiCallFlag] = useState(false)

  // console.log(mtName, dqcName, csqcName);
  //RANGE FILTERS

  const [value1, setValue1] = useState([minPrice, maxPrice]);
  const [value2, setValue2] = useState([minNetwt, maxNetwt]);
  const [value3, setValue3] = useState([minGrosswt, maxGrosswt]);
  const [value4, setValue4] = useState([minDiamondWt, maxDiamondWt]);

  const [ismetalWShow, setIsMeatlWShow] = useState('');
  const [isGrossWShow, setIsGrossShow] = useState('');
  const [isDaaimongWShow, setIsDaaimongWShow] = useState('');
  const [isDaaimonPShow, setIsDaaimonPShow] = useState('');
  const [isStoneWShow, setIsStoneWShow] = useState('');
  const [isStonePShow, setIsStonePShow] = useState('');
  const [isMetalTCShow, setIsMetalTCShow] = useState('');
  const [isPriceShow, setIsPriceShow] = useState('');
  const [globImagePath, setGlobImagepath] = useState();
  const [IsProdLoading, setIsProdLoading] = useState(false);
  const [filterProdLoding, setFilterProdLoding] = useState(false);
  const [currData, setCurrData] = useState()
  const [isFilterData, setIsFilterData] = useState(false)
  const [rangeProData, setRangeProData] = useState([])
  const [isMetalCutoMizeFlag, setIsMetalCutoMizeFlag] = useState('');
  const [mtTypeOption, setmtTypeOption] = useRecoilState(metalTypeG);
  const [metalType, setMetalType] = useState([]);

  const [isDaimondCstoFlag, setIsDaimondCstoFlag] = useState('');
  const [diaQColOpt, setDiaQColOpt] = useRecoilState(diamondQualityColorG);
  const [colorData, setColorData] = useState([]);
  const [cSQopt, setCSQOpt] = useRecoilState(colorstoneQualityColorG);

  const [isCColrStoneCustFlag, setIsCColrStoneCustFlag] = useState('');
  const [DaimondQualityColor, setDaimondQualityColor] = useState([]);

  const [selectedOptionData, setSelectedOptionData] = useState(null);
  const [prodPageSize, setProdPageSize] = useState(0)
  const [prodCount, setProdCount] = useState(0)
  const [storeInitData, setStoreInitData] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [ListReloadData, setListReloadData] = useState()
  const [menuParamsState, setMenuParamsState] = useState();

  const getMenuTransData = useRecoilValue(menuTransfData)

  let location = useLocation();

  console.log('diaQColOpt', diaQColOpt);

  console.log("mttypeoption", mtTypeOption, diaQColOpt, cSQopt);

  console.log("ProductApiData2", ProductApiData2);


  //   const handelCurrencyData = () =>{
  //     let currencyData = JSON.parse(localStorage.getItem('CURRENCYCOMBO'));
  //     let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
  //     console.log("param",loginData);

  //     if(currencyData && loginData){
  //       const filterData = currencyData?.filter((cd)=>cd?.Currencyid === loginData?.CurrencyCodeid)[0]
  //       console.log("currencyData",filterData);
  //       if(filterData){
  //         setCurrData(filterData)
  //       }
  //       else{
  //         let DefaultObj = {
  //           "Currencyid": 42,
  //           "Currencycode": "INR",
  //           "Currencyname": "Rupees",
  //           "Currencysymbol": "₹",
  //           "CurrencyRate": 1.00000,
  //           "IsDefault": 1
  //       }
  //       const DefaultObjData = currencyData?.filter((cd)=>cd?.IsDefault == 1)
  //       if(DefaultObjData.length > 0){
  //         setCurrData(DefaultObjData[0])
  //       }else{
  //         setCurrData(DefaultObj);
  //       }
  //       }
  //     }
  // }  

  useEffect(() => {

    let param = JSON.parse(localStorage.getItem("menuparams"))

    setMenuParamsState(param ?? {})

  }, [])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // handelCurrencyData();

    const storedDataAll = localStorage.getItem('storeInit');
    const data = JSON.parse(storedDataAll);
    setIsMetalCutoMizeFlag(data.IsMetalCustomization);

    setIsDaimondCstoFlag(data.IsDiamondCustomization);
    setIsCColrStoneCustFlag(data.IsCsCustomization);

    const storedData2 = JSON.parse(localStorage.getItem('MetalTypeData'));
    if (storedData2) {
      setMetalType(storedData2);
    }

    const storedData1 = JSON.parse(localStorage.getItem('ColorStoneQualityColor'));
    if (storedData1) {
      setDaimondQualityColor(storedData1);
    }


    const storedData = JSON.parse(localStorage.getItem('QualityColor'));
    if (storedData) {
      setColorData(storedData);
    }
    let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
    let MetalTypeData = JSON.parse(localStorage.getItem("MetalTypeData"))
    let DimondQualityColor = JSON.parse(localStorage.getItem("QualityColor"))
    let ColorStoneQualityColor = JSON.parse(localStorage.getItem("ColorStoneQualityColor"))
    let selectedCombomt = JSON.parse(localStorage.getItem("selectedCombomt"))
    let selectedCombodia = JSON.parse(localStorage.getItem("selectedCombodia"))
    let selectedCombocs = JSON.parse(localStorage.getItem("selectedCombocs"))

    // console.log("selectedCombomt",selectedCombomt)


    if (loginData?.MetalId !== 0) {
      let metalType = MetalTypeData?.find(item => item?.Metalid == loginData?.MetalId)
      if (selectedCombomt) {
        setmtTypeOption(selectedCombomt)
      } else {
        setmtTypeOption(metalType?.metaltype)
      }
    } else {
      if (selectedCombomt) {
        setmtTypeOption(selectedCombomt)
      } else {
        setmtTypeOption(MetalTypeData[0]?.metaltype)
      }
    }

    // if(selectedCombodia){
    //   setDiaQColOpt(selectedCombodia)
    // }

    let diaQCVar = DimondQualityColor?.find(item => item.QualityId == loginData?.cmboDiaQCid?.split(',')[0] && item.ColorId == loginData?.cmboDiaQCid?.split(',')[1]);
    if (loginData?.cmboDiaQCid !== "0,0") {
      if (selectedCombodia) {
        setDiaQColOpt(selectedCombodia)
      } else {
        let qualityColor = `${diaQCVar?.Quality}#${diaQCVar?.color}`
        setDiaQColOpt(qualityColor)
      }
    }
    else {
      setDiaQColOpt("")
      //   if (selectedCombodia) {
      //     setDiaQColOpt(selectedCombodia)
      //   } else {
      //     if (DimondQualityColor && DimondQualityColor?.length) {
      //       setDiaQColOpt(`${DimondQualityColor[0]?.Quality}#${DimondQualityColor[0]?.color}`)
      //     }
      //   }
    }

    // if(selectedCombocs){
    //   setCSQOpt(selectedCombocs)
    // } 

    let csQCVar = ColorStoneQualityColor?.find(item => item?.QualityId === loginData?.cmboCSQCid?.split(',')[0] && item?.ColorId === loginData?.cmboCSQCid?.split(',')[1])
    if (loginData?.cmboCSQCid !== "0,0") {
      if (selectedCombocs) {
        setCSQOpt(selectedCombocs)
      } else {
        let csQualColor = `${csQCVar?.Quality}-${csQCVar?.color}`
        setCSQOpt(csQualColor)
      }
    }
    else {
      setCSQOpt("")
      //   if (selectedCombocs) {
      //     setCSQOpt(selectedCombocs)
      //   } else {
      //     if (ColorStoneQualityColor && ColorStoneQualityColor?.length) {
      //       setCSQOpt(`${ColorStoneQualityColor[0].Quality}-${ColorStoneQualityColor[0].color}`)
      //     }
      //   }

    }

    let obj = { "CurrencyRate": loginData?.CurrencyRate, "Currencysymbol": loginData?.Currencysymbol }
    if (obj) {
      setCurrData(obj)
    }
  }, [])

  // useEffect(()=>{
  //   let currencyData = JSON.parse(localStorage.getItem("currencyData"))
  //   setCurrData(currencyData)
  // },[])

  useEffect(() => {
    if (Object.keys(WishData)?.length === 0) {
      let obj = {};
      WishData.map(item => {
        obj[item?.DesignNo] = true;
      })

      if (Object.keys(obj).length > 0) {
        setWishFlag(obj)
      }
    }
  }, [WishData])

  useEffect(() => {
    if (Object.keys(cartData)?.length === 0) {
      let obj = {};
      cartData.map(item => {
        obj[item?.DesignNo] = true;
      })

      if (Object.keys(obj).length > 0) {
        setCartFlag(obj)
      }
    }
  }, [cartData])

  const WishListToCart = () => {
    let findData = Object.keys(wishFlag).filter((wd) => Object.keys(cartFlag).find((cd) => wd === cd))
    // console.log("findData", findData)
    if (findData) {
      wishFlag[findData] = false
      setWishFlag(wishFlag)
    }
  }

  useEffect(() => {
    WishListToCart()
  }, [WishData, cartData])


  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem('storeInit'))
    if (storeInit) {
      setGlobImagepath(storeInit?.DesignImageFol)
      setProdPageSize(storeInit?.PageSize)
      setStoreInitData(storeInit)
    }
  }, [])

  // useEffect(() => {
  //   let pdDataCalling = async () => {
  //     await productListApiCall().then((res) => {
  //       console.log("call1");
  //       setPdData(res)
  //     })
  //   }
  //   pdDataCalling()
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      if (getSearchData) {
        setNewProData(getSearchData);
      }
    }, 100);
  }, [getSearchData]);

  const getProductData = () => {
    const data = JSON.parse(localStorage.getItem("allproductlist"));
    const prodCount = JSON.parse(localStorage.getItem("allproductcount"));
    if (data) {
      setProductApiData2(data)
      // setListReloadData(data)
    }
    if (prodCount) setProdCount(prodCount)
  }
  const getProdPriceData = () => {
    const data = JSON.parse(localStorage.getItem("getPriceData"));
    setpriceDataApi(data)
  }

  // let menuparams11;

  // console.log("menuparams11",JSON.parse(localStorage.getItem("menuparams")))

  // console.log("priceDataApi",priceDataApi);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("allproductlist"));
    const prodCount = JSON.parse(localStorage.getItem("allproductcount"));
    if (!data?.length) {
      setProductApiData2(data)
    }
    if (!prodCount?.length) setProdCount(prodCount)
    setFilterChecked({})
  }, [getMenuTransData])

  useEffect(() => {
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("getPriceData"))
      console.log("test", data);
      if (!data?.length) {
        setpriceDataApi(data)
      }
    }, 2000)
  }, [getMenuTransData])


  useEffect(() => {
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("allproductlist"));

      // const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
      // const storeInit = JSON.parse(localStorage.getItem('storeInit'));

      // console.log("priceDataApi",priceDataApi);

      const updatedData = await Promise?.all(data?.map(async (product) => {
        // debugger

        const newPriceData = priceDataApi?.rd?.find((pda) => pda.A == product.autocode)

        const newPriceData1 = priceDataApi?.rd1?.filter((pda) => pda.A == product.autocode).reduce((acc, obj) => acc + obj.S, 0)

        const newPriceData2 = priceDataApi?.rd2?.filter((pda) => pda.A == product.autocode).reduce((acc, obj) => acc + obj.S, 0)


        let price = 0;
        let markup = 0;
        let metalrd = 0;
        let diard1 = 0;
        let csrd2 = 0;
        let updNWT = 0;
        let updGWT = 0;
        let updDWT = 0;
        let updDPCS = 0;
        let updCWT = 0;
        let updCPCS = 0;
        let updMT = "";
        let updMC = "";
        let diaQ = "";
        let diaQid = "";
        let diaC = "";
        let diaCid = "";
        let csQ = "";
        let csQid = "";
        let csC = "";
        let csCid = "";
        let ismrpbase;
        let mrpbaseprice;

        console.log("newPriceData", newPriceData)
        console.log("Listprice", product.autocode, newPriceData, newPriceData1, newPriceData2);


        if (newPriceData || newPriceData1 || newPriceData2) {
          price = (((newPriceData?.V ?? 0) / currData?.CurrencyRate ?? 0) + (newPriceData?.W ?? 0) + (newPriceData?.X ?? 0)) + (newPriceData1 ?? 0) + (newPriceData2 ?? 0);
          metalrd = (((newPriceData?.V ?? 0) / currData?.CurrencyRate ?? 0) + (newPriceData?.W ?? 0) + (newPriceData?.X ?? 0))
          diard1 = newPriceData1 ?? 0
          csrd2 = newPriceData2 ?? 0
          markup = newPriceData?.AB
          updNWT = newPriceData?.I ?? 0
          updGWT = newPriceData?.N ?? 0
          updDWT = newPriceData?.K ?? 0
          updDPCS = newPriceData?.J ?? 0
          updCWT = newPriceData?.M ?? 0
          updCPCS = newPriceData?.L ?? 0
          updMT = findMetalType(newPriceData?.C ?? product?.MetalTypeid)[0]?.metaltype ?? ""
          updMC = findMetalColor(product?.MetalColorid)[0]?.metalcolorname ?? ""
          diaQ = ""
          diaQid = ""
          diaC = ""
          diaCid = ""
          csQ = ""
          csQid = ""
          csC = ""
          csCid = ""
          ismrpbase = newPriceData?.U
          mrpbaseprice = newPriceData?.Z
        }
        // console.log("priceprod", product?.designno, metalrd, diard1, csrd2);
        return {
          ...product, price, markup, metalrd, diard1, csrd2, updNWT, updGWT,
          updDWT, updDPCS, updCWT, updCPCS, updMT, updMC,
          diaQ, diaQid,
          diaC, diaCid, csQ, csQid, csC, csCid, ismrpbase, mrpbaseprice
        }
      }));

      localStorage.setItem("allproductlist", JSON.stringify(updatedData));
      setProductApiData2(updatedData);
      return true;
    };

    console.log("productPrice", ProductApiData2?.price);

    // console.log("calling");
    fetchData().then((res) => {
      if (res) {
        setFilterProdLoding(false);
      }
    });

  }, [priceDataApi, mtTypeOption, diaQColOpt, cSQopt]);


  const toggleDeatilList = () => {
    setIsOpenDetail(!isOpenDetail)
  };

  const getCountFunc = async () => {
    await GetCount().then((res) => {
      if (res) {
        setCartCount(res.CountCart)
        setWishCount(res.WishCount)
      }
    })

  }

  function paramnameSetting(paramVal) {
    if (paramVal === 'param0') {
      return getnewMenuData?.data?.param0name
    }
    if (paramVal === 'param1') {
      return getnewMenuData?.data?.param1name
    }
    if (paramVal === 'param2') {
      return getnewMenuData?.data?.param2name
    }
  }

  function paramdataSetting(paramVal) {
    if (paramVal === 'param0') {
      return getnewMenuData?.data?.param0dataname
    }
    if (paramVal === 'param1') {
      return getnewMenuData?.data?.param1dataname
    }
    if (paramVal === 'param2') {
      return getnewMenuData?.data?.param2dataname
    }
  }

  useEffect(() => {
    if (paramnameSetting(getnewMenuData.label) === "brand") {
      const data = ProductApiData2.filter((pd) => pd && pd.BrandName === paramdataSetting(getnewMenuData.label))
      if (data) {
        setNewProData(data)
      }
    }

    if (paramnameSetting(getnewMenuData.label) === "collection") {
      const data = ProductApiData2.filter((pd) => pd && pd.CollectionName === paramdataSetting(getnewMenuData.label))
      if (data) {
        setNewProData(data)
      }
    }

    if (paramnameSetting(getnewMenuData.label) === "category") {

      const data = ProductApiData2.filter((pd) => pd && pd.CategoryName === paramdataSetting(getnewMenuData.label))
      if (data) {
        setNewProData(data)
      }
    }

    if (paramnameSetting(getnewMenuData.label) === "gender") {
      const data = ProductApiData2.filter((pd) => pd && pd.GenderName === paramdataSetting(getnewMenuData.label))
      if (data) {
        setNewProData(data)
      }
    }
  }, [getnewMenuData, ProductApiData2])

  //productList File Fatching (old mathod)


  const fetchFile = async () => {

    let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
    setIsColorWiseImage(storeinit.IsColorWiseImages);
    setIsMeatlWShow(storeinit.IsMetalWeight);
    setIsGrossShow(storeinit.IsGrossWeight);
    setIsDaaimongWShow(storeinit.IsDiamondWeight);
    setIsDaaimonPShow(storeinit.IsDiamondPcs);
    setIsStoneWShow(storeinit.IsStoneWeight);
    setIsStonePShow(storeinit.IsStonePcs);
    setIsMetalTCShow(storeinit.IsMetalTypeWithColor);
    setIsPriceShow(storeinit.IsPriceShow);

    // await axios.get(
    //   `https://${storeinit?.domain}/assets/${storeinit?.FrontEnd_RegNo}/Store_Data/Productlist/Productlist_${loginInfo?.PackageId}_${storeinit?.FrontEnd_RegNo}.txt`
    // ).then(
    //   (res) => {
    //     setProductApiData(res?.data)
    //   })
    //   .catch((err) => console.log("err", err))
  };

  useEffect(() => {

    let Symbol = JSON.parse(localStorage.getItem('CURRENCYCOMBO'))
    setCurrencySym(Symbol)

    fetchFile()
  }, [])

  const toggleDrawerOverlay = () => {
    setDrawerShowOverlay(!drawerShowOverlay);
  };

  let productData = [];

  if (ProductApiData?.data?.[0]) {
    ProductApiData.data[0]?.map((ele) => {
      let obj = {};
      Object.entries(prodListData?.ProductsList)?.map((objele) => {
        obj[objele[0]] = ele[objele[1]];
      });
      productData.push(obj);
    });
  }

  useEffect(() => {
    // const element = document.getElementById("top");
    // if (element) {
    //   element.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //     inline: "nearest"
    //   });
    // }
    window.scrollTo(0, 0);
  }, []);

  // function updateProductsWithMetalColorName() {
  //   productData?.forEach((product) => {
  //     const metalColor = filterData?.MetalColorList?.find(
  //       (color) => color.MetalColorid === product.MetalColorid
  //     );
  //     const categoryName = filterData?.CategoryList?.find(
  //       (cate) => cate.Categoryid === product.Categoryid
  //     );
  //     const collectionName = filterData?.CollectionList?.find(
  //       (coll) => coll.Collectionid === product.Collectionid
  //     );
  //     const mtpurity = filterData?.MetalPurityList?.find(
  //       (mtp) => mtp.MetalPurityid === product.MetalPurityid
  //     );
  //     const prodtype = filterData?.ProductTypeList?.find(
  //       (pt) => pt.Producttypeid === product.Producttypeid
  //     );
  //     const gendertype = filterData?.GenderList?.find(
  //       (gen) => gen.Genderid === product.Genderid
  //     );
  //     const Berandtype = filterData?.BrandList?.find(
  //       (brand) => brand.Brandid === product.Brandid
  //     )
  //     const MetalType = filterData?.MetalTypeList?.find(
  //       (mt) => mt.MetalTypeid === product.MetalTypeid
  //     )
  //     const OcassionType = filterData?.OcassionList?.find(
  //       (ocs) => ocs.Ocassionid === product.Ocassionid
  //     )
  //     const SubCategoryType = filterData?.SubCategoryList?.find(
  //       (sct) => sct.SubCategoryid === product.SubCategoryid
  //     )
  //     const ThemeType = filterData?.ThemeList?.find(
  //       (tl) => tl.Themeid === product.Themeid
  //     )

  //     if (metalColor) {
  //       product.MetalColorName = metalColor.MetalColorName;
  //     }
  //     if (categoryName) {
  //       product.CategoryName = categoryName.CategoryName;
  //     }
  //     if (collectionName) {
  //       product.CollectionName = collectionName.CollectionName;
  //     }
  //     if (mtpurity) {
  //       product.MetalPurity = mtpurity.MetalPurity;
  //     }
  //     if (prodtype) {
  //       product.ProducttypeName = prodtype.ProducttypeName;
  //     }
  //     if (gendertype) {
  //       product.GenderName = gendertype.GenderName;
  //     }
  //     if (Berandtype) {
  //       product.BrandName = Berandtype.BrandName
  //     }
  //     if (MetalType) {
  //       product.MetalTypeName = MetalType.MetalTypeName
  //     }
  //     if (OcassionType) {
  //       product.OcassionName = OcassionType.OcassionName
  //     }
  //     if (SubCategoryType) {
  //       product.SubCategoryName = SubCategoryType.SubCategoryName
  //     }
  //     if (ThemeType) {
  //       product.ThemeName = ThemeType.ThemeName
  //     }
  //   });

  //   return productData;
  // }


  // const diffCartData = useCallback(() => {

  //   // let pdata;

  //   ProductApiData2.forEach((pd) => {
  //     const pdata = cartData?.find((cd) => pd.designno === cd.DesignNo)



  //     if (pdata && !pd?.checkFlag) {
  //       pd.checkFlag = true
  //     }
  //     else {
  //       pd.checkFlag = false
  //     }
  //   })


  //   return ProductApiData2

  // }, [ProductApiData2, cartData])

  // diffCartData()

  // const diffWishData = useCallback(() => {

  //   ProductApiData2.forEach((pd) => {
  //     const pdata = WishData.find((cd) => pd.designno === cd.DesignNo)


  //     if (pdata && !pd?.wishCheck) {
  //       pd.wishCheck = true
  //     }
  //     else {
  //       pd.wishCheck = false
  //     }
  //   })

  //   return ProductApiData2

  // }, [ProductApiData2, WishData])


  // diffWishData()

  // const removefromCart = () => {
  //   ProductApiData2.map((pd) => {


  //     if (cartRemoveData && pd.designno === cartRemoveData) {
  //       pd.checkFlag = false
  //     }

  //     if (wishListRemoveData && pd.designno === wishListRemoveData) {
  //       pd.wishCheck = false
  //     }

  //   })


  //   return ProductApiData2
  //   // // console.log("prodddd",product);
  //   // let prodD;
  //   // productData.forEach((pd)=>{

  //   //   // let prodD = productData.find((p)=>p?.designno === product?.designno && p?.checkFlag === true)

  //   //   // if(prodD){
  //   //   //   pd.checkFlag = false
  //   //   // }

  //   // if(pd?.designno===product?.designno){
  //   //    prodD = pd
  //   // }
  //   // if(prodD){
  //   //   pd.checkFlag = false
  //   // }

  //   // })

  //   // console.log("prodD",prodD);
  //   // return productData
  // }

  // removefromCart()

  // ProductApiData2?.map((product) => {
  //     console.log("product",product);

  //    let loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail')) 

  //   const newPriceData = priceDataApi.rd?.find(
  //     (pda) => 
  //       pda.A === product.autocode && 
  //       pda.B === product.designno &&
  //       pda.D === loginUserDetail?.cmboMetalType 
  //   )

  //   const newPriceData1 = priceDataApi.rd1?.find(
  //     (pda) => 
  //       pda.A === product.autocode && 
  //       pda.B === product.designno && 
  //       pda.H === loginUserDetail?.cmboDiaQualityColor?.split('#@#')[0] &&
  //       pda.J === loginUserDetail?.cmboDiaQualityColor?.split('#@#')[1]
  //   )

  //   const newPriceData2 = priceDataApi.rd2?.find(
  //     (pda) => 
  //       pda.A === product.autocode && 
  //       pda.B === product.designno && 
  //       pda.H === loginUserDetail?.cmboCSQualityColor?.split('#@#')[0] &&
  //       pda.J === loginUserDetail?.cmboCSQualityColor?.split('#@#')[1]

  //   )



  //   if (newPriceData || newPriceData1 || newPriceData2) {
  //     product['price'] = (newPriceData?.Z ?? 0) + (newPriceData1?.S ?? 0) + (newPriceData2?.S ?? 0)
  //   } else {
  //     product['price'] = "Not Availabel";
  //   }



  // });

  //     localStorage.setItem("allproductlist",JSON?.stringify(product))
  //     setProductApiData2(product)

  // useEffect(() => {
  // let newWishCheckData = (ProductApiData2)?.map((pd) => {

  //   let newWish = WishData?.find((cd) => pd.designno === cd.DesignNo && pd.autocode === cd.autocode)


  //   let wishCheck = false
  //   if (newWish?.length && newWish) {
  //     wishCheck = true
  //   } else {
  //     wishCheck = false
  //   }
  //   return { ...pd, wishCheck }
  // })
  // setProductApiData2(newWishCheckData)
  // if(newWishCheckData?.length && newWishCheckData){
  //   console.log("updateWish",newWishCheckData);
  //   // debugger
  //   localStorage.setItem("allproductlist",JSON.stringify(newWishCheckData))
  // }

  //   let newWishCheckData = (ProductApiData2 || []).map((pd) => {
  //     const newWish = WishData?.find((cd) => pd.designno === cd.DesignNo && pd.autocode === cd.autocode);
  //     let wishCheck = !!newWish;
  //     return { ...pd, wishCheck };
  //   });

  //   try {
  //     localStorage.setItem("allproductlist", JSON.stringify(newWishCheckData));
  //     if (JSON.stringify(newWishCheckData) !== JSON.stringify(ProductApiData2)) {
  //       setProductApiData2(newWishCheckData);
  //     }
  //   } catch (error) {
  //     console.error("Error storing data in localStorage:", error);
  //   }
  // }, [WishData, ProductApiData2])

  // let cartlistUpdate = async () => {
  //   let newCartCheckData = (ProductApiData2)?.map((pd) => {

  //     let newWish = cartData?.find((cd) => pd.designno === cd.DesignNo && pd.autocode === cd.autocode)


  //     let checkFlag = false
  //     if (newWish) {
  //       checkFlag = true
  //     } else {
  //       checkFlag = false
  //     }
  //     return { ...pd, checkFlag }
  //   })
  //   if (newCartCheckData) {
  //     setProductApiData2(newCartCheckData)
  //     localStorage.setItem("allproductlist", JSON.stringify(newCartCheckData))
  //   }
  // }

  // useEffect(() => {
  // let newCartCheckData = (ProductApiData2 || []).map((pd) => {
  //   const newWish = cartData?.find((cd) => pd.designno === cd.DesignNo && pd.autocode === cd.autocode);
  //   let checkFlag = !!newWish;
  //   return { ...pd, checkFlag };
  // });

  // try {
  //   localStorage.setItem("allproductlist", JSON.stringify(newCartCheckData));
  //   if (JSON.stringify(newCartCheckData) !== JSON.stringify(ProductApiData2)) {
  //     setProductApiData2(newCartCheckData);
  //   }
  // } catch (error) {
  //   console.error("Error storing data in localStorage:", error);
  // }
  // cartlistUpdate()
  // }, [cartData])


  const handelProductSubmit = (product) => {
    console.log("clickedsss", mtTypeOption, diaQColOpt, cSQopt)
    localStorage.setItem("srProductsData", JSON.stringify(product));
    // if (mtTypeOption && diaQColOpt && cSQopt) {
    localStorage.setItem("srProdPriceInfo", JSON.stringify({ mtTypeOption, diaQColOpt, cSQopt }))
    // }
    navigate("/productdetail");
  };



  // const NewFilterData = () => {
  //   const newFilter = [];
  //   filterData?.SideMenuList?.forEach((ele) => {
  //     if (ele.Fno === '1') {
  //       newFilter.push({ label: "CATEGORY", filterList: filterData.CategoryList?.map((ele) => { return ele.CategoryName }), listType: 'CategoryName' });
  //     } else if (ele.Fno === '2') {
  //       newFilter.push({ label: "PRODUCT TYPE", filterList: filterData.ProductTypeList?.map((ele) => { return ele.ProducttypeName }), listType: 'ProducttypeName' });
  //     } else if (ele.Fno === '8') {
  //       newFilter.push({ label: "GENDER", filterList: filterData.GenderList?.map((ele) => { return ele.GenderName }), listType: 'GenderName' });
  //     } else if (ele.Fno === '12') {
  //       // newFilter.push({ label: "PRICE", filterList: [] });
  //     } else if (ele.Fno === '15') {
  //       newFilter.push({ label: "COLLECTION", filterList: filterData.CollectionList?.map((ele) => { return ele.CollectionName }), listType: 'CollectionName' });
  //     } else if (ele.Fno === '18') {

  //       newFilter.push({ label: "PRICE", filterList: [] });
  //       newFilter.push({ label: "NETWT", filterList: [] });
  //       newFilter.push({ label: "GROSSWT", filterList: [] });
  //       newFilter.push({ label: "DIAMONDWT", filterList: [] });
  //     }
  //   });

  //   return newFilter;
  // }

  // let NewFilterData = () => {

  //   const newFilter = [];

  //   let categoryFilter = JSON.parse(localStorage.getItem("CategoryFilter"))
  //   let ProductTypeFilter = JSON.parse(localStorage.getItem("ProductTypeFilter"))
  //   let GenderFilter = JSON.parse(localStorage.getItem("GenderFilter"))
  //   let CollectionFilter = JSON.parse(localStorage.getItem("CollectionFilter"))

  //   if (categoryFilter) {
  //     newFilter.push({ label: "CATEGORY", filterList: categoryFilter.map((res) => { return res?.CategoryName }), listType: 'CategoryName' })
  //   }
  //   if (ProductTypeFilter) {
  //     newFilter.push({ label: "PRODUCT TYPE", filterList: ProductTypeFilter.map((res) => { return res?.ProducttypeName }), listType: 'ProducttypeName' })
  //   }
  //   if (GenderFilter) {
  //     newFilter.push({ label: "GENDER", filterList: GenderFilter.map((res) => { return res?.GenderName }), listType: 'GenderName' })
  //   }
  //   if (CollectionFilter) {
  //     newFilter.push({ label: "COLLECTION", filterList: CollectionFilter.map((res) => { return res?.CollectionName }), listType: 'CollectionName' })
  //   }

  //   newFilter.push({ label: "PRICE", filterList: [] });
  //   newFilter.push({ label: "NETWT", filterList: [] });
  //   newFilter.push({ label: "GROSSWT", filterList: [] });
  //   newFilter.push({ label: "DIAMONDWT", filterList: [] });

  //   return newFilter

  // }

  let NewFilterData1 = () => {

    const newFilter = [];

    let categoryFilter = JSON.parse(localStorage.getItem("CategoryFilter"))
    let ProductTypeFilter = JSON.parse(localStorage.getItem("ProductTypeFilter"))
    let GenderFilter = JSON.parse(localStorage.getItem("GenderFilter"))
    let CollectionFilter = JSON.parse(localStorage.getItem("CollectionFilter"))
    let BrandFilter = JSON.parse(localStorage.getItem("BrandFilter"))
    let OcassionFilter = JSON.parse(localStorage.getItem("OcassionFilter"))
    let ThemeFilter = JSON.parse(localStorage.getItem("ThemeFilter"))
    let SubCategoryFilter = JSON.parse(localStorage.getItem("SubCategoryFilter"))

    if (categoryFilter) {
      newFilter.push({ label: "CATEGORY", filterList: categoryFilter.map((res) => { return { "label": res?.CategoryName, "id": res?.Categoryid } }), listType: 'Categoryid' })
    }
    if (ProductTypeFilter) {
      newFilter.push({ label: "PRODUCT TYPE", filterList: ProductTypeFilter.map((res) => { return { "label": res?.ProducttypeName, "id": res?.Producttypeid } }), listType: 'Producttypeid' })
    }
    if (GenderFilter) {
      newFilter.push({ label: "GENDER", filterList: GenderFilter.map((res) => { return { "label": res?.GenderName, "id": res?.Genderid } }), listType: 'Genderid' })
    }
    if (CollectionFilter) {
      newFilter.push({ label: "COLLECTION", filterList: CollectionFilter.map((res) => { return { "label": res?.CollectionName, "id": res?.Collectionid } }), listType: 'Collectionid' })
    }
    if (BrandFilter) {
      newFilter.push({ label: "BRAND", filterList: BrandFilter.map((res) => { return { "label": res?.BrandName, "id": res?.Brandid } }), listType: 'Brandid' })
    }
    if (OcassionFilter) {
      newFilter.push({ label: "OCASSION", filterList: OcassionFilter.map((res) => { return { "label": res?.OcassionName, "id": res?.Ocassionid } }), listType: 'Ocassionid' })
    }
    if (ThemeFilter) {
      newFilter.push({ label: "THEME", filterList: ThemeFilter.map((res) => { return { "label": res?.ThemeName, "id": res?.Themeid } }), listType: 'Themeid' })
    }
    if (SubCategoryFilter) {
      newFilter.push({ label: "SUBCATEGORY", filterList: SubCategoryFilter.map((res) => { return { "label": res?.SubCategoryName, "id": res?.SubCategoryid } }), listType: 'SubCategoryid' })
    }

    // newFilter.push({ label: "PRICE", filterList: [] });
    // newFilter.push({ label: "NETWT", filterList: [] });
    // newFilter.push({ label: "GROSSWT", filterList: [] });
    // newFilter.push({ label: "DIAMONDWT", filterList: [] });

    return newFilter

  }

  // console.log("NewFilterData()",NewFilterData1())

  const handleCheckboxChange = (e, ele, flist) => {
    const { name, checked, value } = e.target;

    setFilterChecked((prev) => ({
      ...prev,
      [name]: { checked, value: flist, type: ele.listType }
    }));
  }


  useEffect(() => {

    let FilterCheckedLength = (Object.values(filterChecked)).filter(fc => fc.checked !== false).filter(fc => fc.checked !== undefined)

    setTimeout(() => {
      if (FilterCheckedLength?.length > 0 && newProData?.length === 0) {
        setIsFilterData(true)
      } else {
        setIsFilterData(false)
      }
    }, 0)

  }, [filterChecked, newProData])


  // useEffect(() => {
  //   let FilterDataVar = [];
  //   let NewFilterArr = Object?.values(filterChecked).filter((ele) => ele?.checked === true)
  //   NewFilterArr.map((ele) => {
  //     let fd = ProductApiData2.filter((pd) => pd[ele?.type] === ele?.value)
  //     if (fd) {
  //       FilterDataVar.push(fd)
  //     }
  //   })

  //   console.log("filterDataVar",NewFilterArr)

  //   if (FilterDataVar.length && FilterDataVar) {
  //     let reverseData = FilterDataVar.reverse()
  //     const mergedArray = [].concat(...reverseData);
  //     setNewProData(mergedArray)
  //     // console.log("FilterDataVar", mergedArray)
  //   } else {
  //     setNewProData(ProductApiData2)
  //   }

  // }, [filterChecked])

  let filterFunction = async () => {
    setFilterProdLoding(true);
    let param = JSON.parse(localStorage.getItem("menuparams"))
    const activeFilters = Object.values(filterChecked).filter(ele => ele.checked);

    const output = {};

    activeFilters.forEach(item => {
      if (!output[item.type]) {
        output[item.type] = '';
      }
      output[item.type] += `${item.value}, `;
    });

    for (const key in output) {
      output[key] = output[key].slice(0, -2);
    }

    console.log("activeFilters", output)

    console.log("priceDataApi", priceDataApi);

    if (param && output) {
      await productListApiCall(param, 1, output).then(res => {
        if (res) {
          getProductData()
        }
        return res
      }).then(async (res) => {
        if (res) {
          console.log("resProduct", res?.map((item) => item?.autocode))
          let autoCodeList = JSON.parse(localStorage.getItem("autoCodeList"))
          let metalTypeId = findMetalTypeId(mtTypeOption)[0]?.Metalid
          let DiaQCid = [findDiaQcId(diaQColOpt)[0]?.QualityId, findDiaQcId(diaQColOpt)[0]?.ColorId]
          let CsQcid = [findCsQcId(cSQopt)[0]?.QualityId, findCsQcId(cSQopt)[0]?.ColorId]

          let obj = { mt: metalTypeId, dqc: DiaQCid, csqc: CsQcid }

          console.log("autoCodeList", typeof (autoCodeList))

          await getDesignPriceList(param, 1, obj, output, autoCodeList).then(resp => {
            if (resp) {
              getProdPriceData()
            }
          })

        }
      })
    }



  }
  console.log("apiCalling", filterChecked)

  useEffect(() => {
    // let filteredData = ProductApiData2;
    if (Object.keys(filterChecked).length > 0) {
      filterFunction()
    }

    //   {
    //     "checked": true,
    //     "value": 22,
    //     "type": "Brandid"
    // }

    // if (activeFilters.length > 0) {
    //   filteredData = filteredData.filter(product => {
    //     // Group filters by type
    //     const filtersByType = activeFilters.reduce((acc, filter) => {
    //       acc[filter.type] = acc[filter.type] || [];
    //       acc[filter.type].push(filter);
    //       return acc;
    //     }, {});

    //     // return Object.values(filtersByType).every(filters => {
    //     //     return filters.some(filter => product[filter.type] === filter.value);
    //     // });

    //     return Object.values(filtersByType).every(filters => {
    //       const filterResults = filters.map(filter => product[filter.type] === filter.value);
    //       return filterResults.some(result => result);
    //     });
    //   });
    // }

    // // let FilterCheckedLength = (Object.values(filterChecked)).filter(fc=> fc.checked !== false).filter(fc=> fc.checked !== undefined)
    // let FilterCheckedLength = (Object.values(filterChecked)).filter(fc => fc.checked === true)

    // if (FilterCheckedLength.length === 0) {
    //   setNewProData([])
    //   setRangeProData([])
    //   setSelectedSortOption('Recommended')
    // } else {
    //   setNewProData(filteredData);
    // }

  }, [filterChecked]);

  useEffect(() => {
    // let productList =  JSON.parse(localStorage.getItem('allproductlist'))

    ProductApiData2.forEach(item => {
      let prodData = cartData.find(ele => ele.autocode == item?.autocode)

      if (prodData) {
        item.checkFlag = true
      } else {
        item.checkFlag = false
      }

    })
    localStorage.setItem("allproductlist", JSON.stringify(ProductApiData2))
  }, [cartData, ProductApiData2])

  useEffect(() => {
    ProductApiData2.forEach(item => {
      let prodData = WishData.find(ele => ele.autocode == item?.autocode)

      if (prodData) {
        item.wishCheck = true
      } else {
        item.wishCheck = false
      }
    })
    localStorage.setItem("allproductlist", JSON.stringify(ProductApiData2))
  }, [WishData, ProductApiData2])


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
      if (res?.Message === "Success") {

        setCartData(res?.Data?.rd)
        setWishData(res?.Data?.rd1)

      }
    })

  }

  // useEffect(() => {
  //   let newData = Object.keys(cartFlag).filter((cf) => Object.keys(wishFlag).find((wf) => wf === cf))

  //   // const cartFlagKeys = Object.keys(cartFlag);
  //   // const updatedWishFlag = { ...wishFlag };

  //   // cartFlagKeys.forEach((cf) => {
  //   //   if (updatedWishFlag.hasOwnProperty(cf)) {
  //   //     delete updatedWishFlag[cf];
  //   //   }
  //   // });
  //   // console.log({ cartFlag, wishFlag }, newData)
  //   console.log(wishFlag)

  // }, [cartFlag, wishFlag])

  useEffect(() => {

    getCartAndWishListData()
    // getCountApi()
    getCountFunc()

  }, [])

  const handelWishList = async (event, prod) => {

    try {
      setWishFlag(prev => ({ ...prev, [prod?.designno]: event.target.checked }))
      // setWishFlag(event.target.checked)

      if (event.target.checked === true) {

        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        const product = prod

        const finalJSON = {
          "stockweb_event": "",
          "Mastermanagement_CategorySize": "",
          "sizeamountpersentage": "",
          "stockno": "",
          "is_show_stock_website": "0",
          "cmboDiaQualityColor": `${diaQColOpt?.split("#") ?? ""}`,
          "cmboMetalType": `${product?.updMT}`,
          "AdditionalValWt": Number(`${product?.AdditionalValWt ?? 0}`),
          "BrandName": `${findValueFromId("brand", product?.Brandid)?.BrandName}`,
          "Brandid": Number(`${product?.Brandid}`),
          "CategoryName": `${findValueFromId("cate", product?.Categoryid)?.CategoryName}`,
          "Categoryid": Number(`${product?.Categoryid}`),
          "CenterStoneId": Number(`${product?.CenterStoneId}`),
          "CenterStonePieces": Number(`${product?.updCPCS}`),
          "CollectionName": `${findValueFromId("collect", product?.Collectionid)?.CollectionName}`,
          "Collectionid": Number(`${product?.Collectionid}`),
          "ColorWiseRollOverImageName": `${product?.ColorWiseRollOverImageName}`,
          "DefaultImageName": `${product?.DefaultImageName}`,
          "DisplayOrder": Number(`${product?.DisplayOrder}`),
          "FrontEnd_OrderCnt": Number(`${product?.FrontEnd_OrderCnt}`),
          "GenderName": `${findValueFromId("gender", product?.Genderid)?.GenderName}`,
          "Genderid": Number(`${product?.Genderid}`),
          "Grossweight": Number(`${product?.updGWT}`),
          "InReadyStockCnt": Number(`${product?.InReadyStockCnt}`),
          "IsBestSeller": Number(`${product?.IsBestSeller}`),
          "IsColorWiseImageExists": `${product?.ColorWiseRollOverImageName?.length > 0 ? 1 : 0}`,
          "IsInReadyStock": Number(`${product?.IsInReadyStock}`),
          "IsNewArrival": Number(`${product?.IsNewArrival}`),
          "IsRollOverColorWiseImageExists": Number(`${product?.IsRollOverColorWiseImageExists?.length > 0 ? 1 : 0}`),
          "IsTrending": Number(`${product?.IsTrending}`),
          "MasterManagement_labid": Number(`${product?.MasterManagement_labid}`),
          "MasterManagement_labname": "",
          "MetalColorName": `${product?.updMC}`,
          "MetalColorid": Number(`${product?.MetalColorid}`),
          "MetalPurity": `${product?.updMT?.split(" ")[1] ?? '18K'}`,
          "MetalPurityid": Number(`${product?.MetalTypeid}`),
          "MetalTypeName": `${product?.updMT.split(" ")[0]}`,
          "MetalTypeid": Number(`${product?.IsInReadyStock}`),
          "MetalWeight": Number(`${product?.updNWT}`),
          "OcassionName": `${findValueFromId("ocass", product?.Ocassionid)?.OcassionName}`,
          "Ocassionid": Number(`${product?.Ocassionid}`),
          "ProducttypeName": `${findValueFromId("prodtype", product?.Producttypeid)?.ProducttypeName}`,
          "Producttypeid": Number(`${product?.Producttypeid}`),
          "RollOverImageName": `${product?.RollOverImageName}`,
          "SubCategoryName": `${findValueFromId("subcate", product?.SubCategoryid)?.SubCategoryName}`,
          "SubCategoryid": Number(`${product?.SubCategoryid}`),
          "ThemeName": `${findValueFromId("theme", product?.Themeid)?.ThemeName}`,
          "Themeid": Number(`${product?.Themeid}`),
          "TitleLine": `${product?.TitleLine}`,
          // "UnitCost": `${product?.price === "Not Available" ? 0 : product?.price}`,
          // "UnitCostWithmarkup": (`${(product?.price === "Not Available" ? 0 : product?.price) + (product?.markup ?? 0)}`),
          "UnitCost": Number(`${product?.ismrpbase === 1 ? product?.mrpbaseprice : PriceWithMarkupFunction(0, product?.price, currData?.CurrencyRate)?.toFixed(2)}`),
          "UnitCostWithmarkup": Number(`${product?.ismrpbase === 1 ? product?.mrpbaseprice : PriceWithMarkupFunction(product?.markup, product?.price, currData?.CurrencyRate)?.toFixed(2)}`),
          "autocode": `${product?.autocode}`,
          "colorstonecolorname": `${cSQopt?.split('-')[1] ?? ""}`,
          "colorstonequality": `${cSQopt?.split('-')[0] ?? ""}`,
          "designno": `${product?.designno}`,
          "diamondcolorname": `${diaQColOpt.split("#")[1]}`,
          "diamondpcs": Number(`${product?.updDPCS}`),
          "diamondquality": `${diaQColOpt.split("#")[0]}`,
          "diamondsetting": `${product?.diamondsetting ?? ""}`,
          "diamondshape": `${product?.diamondshape ?? ""}`,
          "diamondweight": Number(`${product?.updDWT}`),
          "encrypted_designno": `${product?.encrypted_designno ?? ""}`,
          "hashtagid": Number(`${product?.Hashtagid ?? 0}`),
          "hashtagname": `${product?.Hashtagname ?? ""}`,
          "imagepath": `${globImagePath}`,
          "imgrandomno": `${product?.imgrandomno}`,
          "mediumimage": `${product?.MediumImagePath ?? ""}`,
          "originalimage": `${product?.OriginalImagePath ?? ""}`,
          "storyline_html": `${product?.storyline_html ?? ""}`,
          "storyline_video": `${product?.storyline_video ?? ""}`,
          "thumbimage": `${product?.ThumbImagePath ?? ''}`,
          "totaladditionalvalueweight": Number(`${product?.totaladditionalvalueweigt ?? 0}`),
          "totalcolorstoneweight": Number(`${product?.updCWT}`),
          "totaldiamondweight": Number(`${product?.updDWT}`),
          "updatedate": `${product?.UpdateDate ?? 0}`,
          "videoname": `${product?.videoname ?? ""}`,
          "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
          "Customerid": Number(`${Customer_id?.id}`),
          "PriceMastersetid": Number(`${product?.PriceMastersetid ?? 0}`),
          "DQuality": `${diaQColOpt.split("#")[0]}`,
          "DColor": `${diaQColOpt.split("#")[1]}`,
          "UploadLogicalPath": `${product?.UploadLogicalPath ?? ""}`,
          "ukey": `${storeInit?.ukey}`
        }

        const encodedCombinedValue = btoa(JSON.stringify(finalJSON));

        const body = {
          con: `{\"id\":\"\",\"mode\":\"addwishlist\",\"appuserid\":\"${UserEmail}\"}`,
          f: "AddToWishListIconClick (addwishlist)",
          p: encodedCombinedValue,
        };

        await CommonAPI(body).then(async (res) => {
          if (res?.Data?.rd[0]?.msg === "success") {
            await getCartAndWishListData()
            getCountFunc()
          }
        })
      }
      else {
        // {"designlist":"'MCJ10'","isselectall":"0","FrontEnd_RegNo":"95oztttesi0o50vr","Customerid":"856"}

        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        setWishListRemoveData(prod.designno)

        let Data = { "designlist": `'${prod?.designno}'`, "isselectall": "0", "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}` }

        let encodedCombinedValue = btoa(JSON.stringify(Data))
        const body = {
          con: `{\"id\":\"\",\"mode\":\"removeFromWishList\",\"appuserid\":\"${UserEmail}\"}`,
          f: "RemoveFromWishlistIconClick (removeFromWishList)",
          p: encodedCombinedValue,
        }

        await CommonAPI(body).then(async (res) => {
          // console.log("responsePlist",res?.Data?.rd[0]?.msg === "success");
          if (res?.Data?.rd[0]?.stat_msg === "success") {
            // removefromCart()
            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()
            // removefromCart(prod)
          }
        })
      }
    }
    catch (error) {
      console.log("error", error);
    }
  }

  const handelCartList = async (event, prod) => {
    try {
      setCartFlag(prev => ({ ...prev, [prod?.designno]: event.target.checked }))

      if (event.target.checked === true) {
        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        const product = prod

        let isWishHasCartData = WishData?.filter((pd) => product.autocode === pd.autocode)
        // console.log("isWishHasCartData", isWishHasCartData)

        let wishToCartEncData = { "autocodelist": `${isWishHasCartData[0]?.autocode}`, "ischeckall": 0, "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}` }

        const finalJSON = {
          "stockweb_event": "",
          "designno": `${product?.designno}`,
          "autocode": `${product?.autocode}`,
          "imgrandomno": `${product?.imgrandomno}`,
          "producttypeid": Number(`${product?.Producttypeid}`),
          "metaltypeid": Number(`${product?.MetalTypeid}`),
          "metalcolorid": Number(`${product?.MetalColorid}`),
          "stockno": "",
          // "DQuality": `${product?.diamondquality?.split(",")[0]}`,
          "DQuality": `${diaQColOpt.split("#")[0]}`,
          "DColor": `${diaQColOpt.split("#")[1]}`,
          "cmboMetalType": `${product?.updMT}`,
          "AdditionalValWt": Number(`${product?.AdditionalValWt ?? 0}`),
          "BrandName": `${findValueFromId("brand", product?.Brandid)?.BrandName}`,
          "Brandid": Number(`${product?.Brandid}`),
          "CategoryName": `${findValueFromId("cate", product?.Categoryid)?.CategoryName}`,
          "Categoryid": Number(`${product?.Categoryid}`),
          "CenterStoneId": Number(`${product?.CenterStoneId}`),
          "CenterStonePieces": Number(`${product?.updCPCS}`),
          "CollectionName": `${findValueFromId("collect", product?.Collectionid)?.CollectionName}`,
          "Collectionid": Number(`${product?.Collectionid}`),
          "ColorWiseRollOverImageName": `${product?.ColorWiseRollOverImageName}`,
          "DefaultImageName": `${product?.DefaultImageName}`,
          "DisplayOrder": Number(`${product?.DisplayOrder}`),
          "FrontEnd_OrderCnt": Number(`${product?.FrontEnd_OrderCnt}`),
          "GenderName": `${findValueFromId("gender", product?.Genderid)?.GenderName}`,
          "Genderid": Number(`${product?.Genderid}`),
          "Grossweight": Number(`${product?.updGWT}`),
          "InReadyStockCnt": Number(`${product?.InReadyStockCnt}`),
          "IsBestSeller": Number(`${product?.IsBestSeller}`),
          "IsColorWiseImageExists": Number(`${product?.IsColorWiseImageExists ?? 0}`),
          "IsInReadyStock": Number(`${product?.IsInReadyStock}`),
          "IsNewArrival": Number(`${product?.IsNewArrival ?? 0}`),
          "IsRollOverColorWiseImageExists": Number(`${product?.IsRollOverColorWiseImageExists ?? 0}`),
          "IsTrending": Number(`${product?.IsTrending}`),
          "MasterManagement_labid": Number(`${product?.MasterManagement_labid}`),
          "MasterManagement_labname": "",
          "MetalColorName": `${product?.updMC}`,
          "MetalColorid": Number(`${product?.MetalColorid}`),
          "MetalPurity": `${product?.updMT.split(" ")[1]}`,
          "MetalPurityid": Number(`${product?.MetalTypeid}`),
          "MetalTypeName": `${product?.updMT.split(" ")[0]}`,
          "MetalTypeid": Number(`${product?.IsInReadyStock}`),
          "MetalWeight": Number(`${product?.updNWT}`),
          "OcassionName": `${findValueFromId("ocass", product?.Ocassionid)?.OcassionName}`,
          "Ocassionid": Number(`${product?.Ocassionid}`),
          "ProducttypeName": `${findValueFromId("prodtype", product?.Producttypeid)?.ProducttypeName}`,
          "Producttypeid": Number(`${product?.Producttypeid}`),
          "RollOverImageName": `${product?.RollOverImageName}`,
          "SubCategoryName": `${findValueFromId("subcate", product?.SubCategoryid)?.SubCategoryName}`,
          "SubCategoryid": Number(`${product?.SubCategoryid}`),
          "ThemeName": `${findValueFromId("theme", product?.Themeid)?.ThemeName}`,
          "Themeid": Number(`${product?.Themeid}`),
          "TitleLine": `${product?.TitleLine}`,
          "UnitCost": Number(`${product?.ismrpbase === 1 ? product?.mrpbaseprice : PriceWithMarkupFunction(0, product?.price, currData?.CurrencyRate)?.toFixed(2)}`),
          "UnitCostWithmarkup": Number(`${product?.ismrpbase === 1 ? product?.mrpbaseprice : PriceWithMarkupFunction(product?.markup, product?.price, currData?.CurrencyRate)?.toFixed(2)}`),
          "colorstonecolorname": `${cSQopt?.split('-')[1] ?? ""}`,
          "colorstonequality": `${cSQopt?.split('-')[0] ?? ""}`,
          "diamondcolorname": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[1]}`,
          "diamondpcs": Number(`${product?.updDPCS}`),
          "diamondquality": `${JSON.parse(localStorage.getItem("loginUserDetail"))?.cmboDiaQualityColor.split("#@#")[0]}`,
          "diamondsetting": `${product?.diamondsetting ?? ""}`,
          "diamondshape": `${product?.diamondshape ?? ""}`,
          "diamondweight": Number(`${product?.updDWT}`),
          "encrypted_designno": `${product?.encrypted_designno ?? ""}`,
          "hashtagid": Number(`${product?.Hashtagid ?? 0}`),
          "hashtagname": `${product?.Hashtagname ?? ""}`,
          "imagepath": `${globImagePath}`,
          "mediumimage": `${product?.MediumImagePath ?? ""}`,
          "originalimage": `${product?.OriginalImagePath ?? ""}`,
          "storyline_html": `${product?.storyline_html ?? ""}`,
          "storyline_video": `${product?.storyline_video ?? ""}`,
          "thumbimage": `${product?.ThumbImagePath ?? ''}`,
          "totaladditionalvalueweight": Number(`${product?.totaladditionalvalueweigt ?? 0}`),
          "totalcolorstoneweight": Number(`${product?.updCWT}`),
          "totaldiamondweight": Number(`${product?.updDWT}`),
          "updatedate": `${product?.UpdateDate ?? 0}`,
          "videoname": `${product?.videoname ?? ""}`,
          "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
          "Customerid": Number(`${Customer_id?.id}`),
          "PriceMastersetid": Number(`${product?.PriceMastersetid ?? 0}`),
          "quantity": Number(`${product?.quantity ?? 1}`),
          "CurrencyRate": `${product?.CurrencyRate ?? ""}`,
          "remarks_design": `${product?.remarks_design ?? ""}`,
          "diamondcolorid": `${product?.diamondcolorid ?? ""}`,
          "diamondqualityid": `${product?.diamondqualityid ?? ""}`,
          "detail_ringsize": `${product?.detail_ringsize ?? ""}`,
          "ProjMode": `${product?.ProjMode ?? ""}`,
          "AlbumMasterid": Number(`${product?.AlbumMasterid ?? 0}`),
          "AlbumMastername": `${product?.AlbumMastername ?? ""}`,
          "Albumcode": `${product?.Albumcode ?? ""}`,
          "Designid": Number(`${product?.Designid ?? 0}`)
        }

        // console.log("product", finalJSON)


        const encodedCombinedValue = btoa(JSON.stringify(finalJSON));
        const wishToCartEncData1 = btoa(JSON.stringify(wishToCartEncData));

        const body = {
          con: `{\"id\":\"\",\"mode\":\"ADDTOCART\",\"appuserid\":\"${UserEmail}\"}`,
          f: "AddToCartIconClick (addcartlist)",
          p: encodedCombinedValue,
        };

        let body1 = {
          con: `{\"id\":\"Store\",\"mode\":\"addwishlisttocart\",\"appuserid\":\"${UserEmail}\"}`,
          f: "iconclick (addwishlisttocart)",
          p: wishToCartEncData1
        }

        await CommonAPI(isWishHasCartData.length ? body1 : body).then(async (res) => {
          // console.log("responsePlist",res?.Data?.rd[0]?.msg === "success");
          if (!isWishHasCartData.length && res?.Data?.rd[0]?.msg === "success") { //ADDTOCART
            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()
            // prod.checkFlag=false
          }

          if (isWishHasCartData.length && res?.Data?.rd[0]?.stat_msg === "success") { //ADDWISHLISTTOCART
            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()
            WishListToCart()

          } else {
            await getCartAndWishListData()
            getCountFunc()
          }
        })



      }
      else {
        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));
        const UserEmail = localStorage.getItem("registerEmail")

        setCartRemoveData(prod.designno)

        let Data = { "designno": `${prod?.designno}`, "autocode": `${prod?.autocode}`, "metalcolorid": 0, "isSolStockNo": 0, "is_show_stock_website": "0", "isdelete_all": 0, "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}`, "cartidlist": "" }

        let encodedCombinedValue = btoa(JSON.stringify(Data))
        const body = {
          con: `{\"id\":\"\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${UserEmail}\"}`,
          f: "RemoveFromCartIconClick (removeFromCartList)",
          p: encodedCombinedValue,
        }

        await CommonAPI(body).then(async (res) => {
          // console.log("responsePlist",res?.Data?.rd[0]?.msg === "success");
          if (res?.Data?.rd[0]?.stat_msg === "success") {
            // removefromCart()
            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()
            // removefromCart(prod)
          } else {
            await getCartAndWishListData()
            getCountFunc()
          }
        })

      }

    }
    catch (error) {
      console.log("error", error);
    }

  }

  // useEffect(() => {
  //   let flag = localStorage.getItem('productDataShow') ?? 'true';
  //   if (newProData.length === 0 && flag === 'true') {
  //     let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData?.value1)
  //     setNewProData(data);
  //     setTimeout(() => {
  //       localStorage.setItem('productDataShow', 'false')
  //     }, 100)
  //   }
  // }, [getHeaderData, newProData])


  useEffect(() => {
    //level1 filter
    if (getHeaderData2?.label1 === "collection" && getHeaderData2?.label2 === "collection") {
      let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData2?.value1 && pd.CollectionName === getHeaderData2?.value2)
      setNewProData(data)
    }
    if (getHeaderData2?.label1 === "collection" && getHeaderData2?.label2 === "category") {
      let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData2?.value1 && pd.CategoryName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "collection" && getHeaderData2?.label2 === "gender") {
      let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData2?.value1 && pd.GenderName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "collection" && getHeaderData2?.label2 === "brand") {
      let data = productData.filter((pd) => pd && pd.CollectionName === getHeaderData2?.value1 && pd.BrandName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "brand" && getHeaderData2?.label2 === "brand") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData2?.value1 && pd.BrandName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "brand" && getHeaderData2?.label2 === "collection") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData2?.value1 && pd.CollectionName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "brand" && getHeaderData2?.label2 === "category") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData2?.value1 && pd.CategoryName === getHeaderData2?.value2)
      setNewProData(data);

    }
    if (getHeaderData2?.label1 === "brand" && getHeaderData2?.label2 === "gender") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData2?.value1 && pd.GenderName === getHeaderData2?.value2)
      setNewProData(data);

    }

    // level2 filter
    if (getHeaderData?.label1 === "collection") {
      let data = productData?.filter((pd) => pd && pd.CollectionName === getHeaderData?.value1)
      setNewProData(data)

    }
    if (getHeaderData?.label1 === "brand") {
      let data = productData?.filter((pd) => pd && pd.BrandName === getHeaderData?.value1)
      setNewProData(data)

    }
    if (getHeaderData?.label1 === "category") {
      let data = productData?.filter((pd) => pd && pd.CategoryName === getHeaderData?.value1)
      setNewProData(data)

    }
    if (getHeaderData?.label1 === "gender") {
      let data = productData?.filter((pd) => pd && pd.GenderName === getHeaderData?.value1)
      setNewProData(data)

    }

  }, [getHeaderData2, getHeaderData])

  const newMenuProdData = () => {
    let data = productData?.filter((pd) => pd && pd.CollectionName === getHeaderData?.value1)
    setNewProData(data)
  }
  useEffect(() => {
    if (getHeaderData && getHeaderData.value1 && productData) {
      newMenuProdData()
    }
  }, [getHeaderData])

  // const getDesignPriceList = async () => {

  //   const storeInit = JSON.parse(localStorage.getItem("storeInit"))
  //   const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  //   const currencyCombo = JSON.parse(localStorage.getItem("CURRENCYCOMBO"));
  //   const UserEmail = localStorage.getItem("registerEmail")

  //   const GetPriceReq = {
  //     "CurrencyRate": `${currencyCombo?.CurrencyRate}`,
  //     "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
  //     "Customerid": `${loginUserDetail?.id}`,
  //     "Laboursetid": `${storeInit.PolicyApplyOnName === "Customer Wise Policy" ? loginUserDetail?._pricemanagement_laboursetid : loginUserDetail?.pricemanagement_laboursetid}`,
  //     "diamondpricelistname": `${loginUserDetail?._diamondpricelistname}`,
  //     "colorstonepricelistname": `${loginUserDetail?._colorstonepricelistname}`,
  //     "SettingPriceUniqueNo": `${loginUserDetail?.SettingPriceUniqueNo}`,
  //     "DesignNo": ""
  //   }

  //   const encodedCombinedValue = btoa(JSON.stringify(GetPriceReq));

  //   let body = {
  //     "con": `{\"id\":\"Store\",\"mode\":\"getdesignpricelist\",\"appuserid\":\"${UserEmail}\"}`,
  //     "f": "onloadFirstTime (getdesignpricelist)",
  //     "p": encodedCombinedValue
  //   }

  //   await CommonAPI(body).then((res) => {
  //     localStorage.setItem("getPriceData",JSON.stringify(res?.Data))
  //     setpriceDataApi(res?.Data)
  //   })

  // }

  const handleChange1 = () => {

  }

  // useEffect(() => {
  //   getDesignPriceList()
  // }, [])

  useEffect(() => {
    const priceOnly = (newProData.length ? newProData : ProductApiData2)?.filter(item => item?.price !== 'Not Available')
      ?.map(item => item.price != 0 && item.price)?.sort((a, b) => a - b);

    // ?.map(item => item.price != 0 && item.price != '' ? item.price + item?.UnitCost : item.UnitCost)

    setMinPrice(priceOnly[0]);
    setMaxPrice(priceOnly[priceOnly?.length - 1]);
    setValue1([priceOnly[0], priceOnly[priceOnly?.length - 1]])
    // const netWtOnly = ProductApiData2?.map((item) => item?.netwt).sort((a, b) => a - b);
    const netWtOnly = (newProData.length ? newProData : ProductApiData2)?.map((item) => item?.updNWT).sort((a, b) => a - b);
    setMinNetwt(netWtOnly[0]);
    setMaxNetwt(netWtOnly[netWtOnly?.length - 1]);
    setValue2([netWtOnly[0], netWtOnly[netWtOnly?.length - 1]])

    // const grossWtOnly = ProductApiData2?.map((item) => item?.Grossweight).sort((a, b) => a - b);
    const grossWtOnly = (newProData.length ? newProData : ProductApiData2)?.map((item) => item?.updGWT).sort((a, b) => a - b);
    setMinGrossWt(grossWtOnly[0]);
    setMaxGrossWtt(grossWtOnly[grossWtOnly?.length - 1]);
    setValue3([grossWtOnly[0], grossWtOnly[grossWtOnly?.length - 1]])

    // const diamondWtOnly = ProductApiData2?.map((item) => item?.diamondweight).sort((a, b) => a - b);
    const diamondWtOnly = (newProData.length ? newProData : ProductApiData2)?.map((item) => item?.updDWT).sort((a, b) => a - b);
    setMinDiamondWt(diamondWtOnly[0]);
    setMaxDiamondWt(diamondWtOnly[diamondWtOnly?.length - 1]);
    setValue4([diamondWtOnly[0], diamondWtOnly[diamondWtOnly?.length - 1]])

  }, [ProductApiData2, newProData]);

  const handlePriceChange = (event, newValue, activeThumb) => {
    setValue1(newValue);
    filterDatasfunc(newValue, value2, value3, value4);
  };

  const handleNetWtChange = (event, newValue, activeThumb) => {
    setValue2(newValue);
    filterDatasfunc(value1, newValue, value3, value4);
  };

  const handlegrossWtChange = (event, newValue, activeThumb) => {
    setValue3(newValue);
    filterDatasfunc(value1, value2, newValue, value4);
  };

  const handleDiamondChange = (event, newValue, activeThumb) => {
    setValue4(newValue);
    filterDatasfunc(value1, value2, value3, newValue);
  };

  const filterDatasfunc = (priceRange, netWtRange, grossWtRange, diamondWtRange) => {

    const filteredData = (newProData.length ? newProData : ProductApiData2)?.filter((item) => {
      const priceInRange = item?.price >= priceRange[0] && item?.price <= priceRange[1];
      const netWtInRange = item.netwt >= netWtRange[0] && item.netwt <= netWtRange[1];
      const grossWtInRange = item.Grossweight >= grossWtRange[0] && item.Grossweight <= grossWtRange[1];
      const diamondWtInRange = item.diamondweight >= diamondWtRange[0] && item.diamondweight <= diamondWtRange[1];
      return priceInRange && netWtInRange && grossWtInRange && diamondWtInRange;

    });
    // setNewProData(filteredData);
    setRangeProData(filteredData)
  };

  const handlePageReload = async () => {
    // window.location.reload();
    // setRangeProData([])
    setFilterChecked({})
    let param = JSON.parse(localStorage.getItem("menuparams"))
    await productListApiCall(param, 1).then(res => {
      if (res) {
        getProductData()
      }
      return res
    }).then(async (res) => {
      if (res) {
        console.log("resProduct", res?.map((item) => item?.autocode))
        let autoCodeList = JSON.parse(localStorage.getItem("autoCodeList"))
        let metalTypeId = findMetalTypeId(mtTypeOption)[0]?.Metalid
        let DiaQCid = [findDiaQcId(diaQColOpt)[0]?.QualityId, findDiaQcId(diaQColOpt)[0]?.ColorId]
        let CsQcid = [findCsQcId(cSQopt)[0]?.QualityId, findCsQcId(cSQopt)[0]?.ColorId]

        let obj = { mt: metalTypeId, dqc: DiaQCid, csqc: CsQcid }


        await getDesignPriceList(param, 1, obj, {}, autoCodeList).then(resp => {
          if (resp) {
            getProdPriceData()
          }
        })

      }
    })
    // setNewProData(ProductApiData2);  
    setMinPrice(0)
    setMaxPrice(maxPrice)
    setValue1([minPrice, maxPrice])
    setMinNetwt(0)
    setMaxNetwt(maxNetwt)
    setValue2([0, maxNetwt])
    setMinGrossWt(0)
    setMaxGrossWtt(maxGrosswt)
    setValue3([0, maxGrosswt])
    setMinDiamondWt(0)
    setMaxDiamondWt(maxDiamondWt)
    setValue4([0, maxDiamondWt])

  }

  const [hoveredImageUrls, setHoveredImageUrls] = useState({});

  const handleHoverImageShow = (index, designimgfol, dfoldername, imgSize, roleoverImage) => {
    // let updatedFilename = rollPath?.replace(/\s/g, '_');
    // let newPath = url.replace(/\/([^/]+)$/, '/' + updatedFilename);

    let path = `${designimgfol}${dfoldername}/${imgSize}/${roleoverImage}`

    if (roleoverImage.length !== 0) {


      setHoveredImageUrls(prevHoveredImageUrls => {
        return { ...prevHoveredImageUrls, [index]: path };
      });
      console.log('hoverimage', hoveredImageUrls[10]);
    }

  };

  // console.log("prod_img", hoveredImageUrls);

  const handleMouseLeave = (index) => {
    setHoveredImageUrls(prevState => {
      const newState = { ...prevState };
      delete newState[index];
      return newState;
    });
  };


  function convertPath(path) {
    return path.replace(/\\/g, '/');
  }

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const handleColorSelection = async (product, index, color) => {
    const uploadPath = localStorage.getItem('UploadLogicalPath');
    const storedDataAll = localStorage.getItem('storeInit');
    const data = JSON.parse(storedDataAll);
    const colorWiseImageData = JSON.parse(localStorage.getItem('colorDataImages'));
    const productAutoCode = product?.autocode;
    const productColorName = color;
    // console.log("color--", productColorName);

    if (!colorWiseImageData) {
      return [];
    }

    if (data.IsColorWiseImages === 1) {
      const matchingData = colorWiseImageData.filter(imageDataItem => (
        productAutoCode === imageDataItem.autocode &&
        productColorName.toLowerCase() === imageDataItem.colorname.toLowerCase()
      ));

      const checkAvailabilityPromises = matchingData.map(async (imageDataItem) => {
        const imagePath = uploadPath + '/' + data.ukey + convertPath(imageDataItem.imagepath);
        const isAvailable = await checkImageAvailability(imagePath);
        console.log('isAvailable---', isAvailable);
        return { imagePath: imagePath.replace(/ /g, "%20"), isAvailable };
      });

      const imageData = await Promise.all(checkAvailabilityPromises);
      const availableImage = imageData.find(image => image.isAvailable);

      if (availableImage) {
        const formedImgData = { [index]: availableImage.imagePath };
        setUpdateColorImage(formedImgData);
        console.log('formedImgData', formedImgData)
        return availableImage;
      } else {
        console.log('No available image found');
        return [];
      }
    } else {
      setUpdateColorImage({});
      return [];
    }
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const toggleDetailDrawer = () => {
    setIsOpenDetail(!isOpenDetail);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, marginInline: '10px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}

      {isOpenDetail &&
        <div>
          {NewFilterData1().map((ele, index) => (
            <>
              <Accordion
                elevation={0}
                sx={{
                  borderBottom: "1px solid #c7c8c9",
                  borderRadius: 0,
                  "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                  },
                  "&.MuiPaper-root.MuiAccordion-root:before": {
                    background: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    color: "#7f7d85",
                    borderRadius: 0,

                    "&.MuiAccordionSummary-root": {
                      padding: 0,
                    },
                  }}
                >
                  <span className="filtercategoryLable">
                    {ele.label}
                  </span>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {ele.label === "PRICE" &&
                    <div>
                      <Slider
                        className='netWtSecSlider'
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        min={minPrice}
                        max={maxPrice}
                        size="small"
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                      />
                      <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                        <input value={value1[0]} className="minmaxvalpl" disabled />
                        <input value={value1[1]} className="minmaxvalpl" disabled />
                      </div>
                    </div>}

                  {ele.label === "CENTERSTONE" &&
                    <div>
                      <Slider
                        className='netWtSecSlider'
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                      />
                    </div>
                  }

                  {ele?.filterList?.map((flist, i) => (
                    // <div
                    //   style={{
                    //     display: "flex",
                    //     alignItems: "center",
                    //     gap: "12px",
                    //     width: 'fit-content'
                    //   }}
                    //   key={i}
                    //   onClick={(e) =>
                    //     handleCheckboxChange(e, ele, flist.id)
                    //   }
                    //   checked={
                    //     filterChecked[`checkbox${index + 1}${i + 1}`]
                    //       ?.checked
                    //   }
                    // >
                    //   <Checkbox
                    //     name={`checkbox${index + 1}${i + 1}`}
                    //     checked={
                    //       filterChecked[`checkbox${index + 1}${i + 1}`]
                    //         ?.checked
                    //     }
                    //     style={{
                    //       color: "#7f7d85",
                    //       padding: 0,
                    //       width: "10px",
                    //     }}
                    //     size="small"
                    //   />
                    //   <small
                    //     style={{
                    //       fontFamily: "TT Commons, sans-serif",
                    //       color: "#7f7d85",
                    //       textTransform: "lowercase",
                    //     }}
                    //   >
                    //     {flist.label}
                    //   </small>
                    // </div>
                    <label
                      htmlFor={`checkbox${index + 1}${i + 1}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', width: 'fit-content' }}
                      onClick={(e) => handleCheckboxChange(e, ele, flist.id)}
                    >
                      <Checkbox
                        id={`checkbox${index + 1}${i + 1}`}
                        name={`checkbox${index + 1}${i + 1}`}
                        checked={filterChecked[`checkbox${index + 1}${i + 1}`]?.checked}
                        onChange={(e) => handleCheckboxChange(e, ele, flist.id)}
                        style={{ color: '#7f7d85', padding: 0, width: '10px' }}
                        size="small"
                      />
                      <small
                        style={{
                          fontFamily: 'TT Commons, sans-serif',
                          color: '#7f7d85',
                        }}
                      >
                        {flist.label}
                      </small>
                    </label>
                  ))}
                </AccordionDetails>
              </Accordion>
            </>
          ))}
        </div>}
    </Box>
  );

  const [selectedSortOption, setSelectedSortOption] = useState('None');

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("allproductlist"));
  //   setProductApiData2(data);
  // }, []);


  const handleSortChange = (e) => {
    const selectedOption = e?.target?.value;
    setSelectedSortOption(selectedOption);
    let sortedData = [...ProductApiData2];
    console.log('seirt--', e?.target?.value);

    if (selectedOption === 'PRICE HIGH TO LOW') {
      sortedData.sort((a, b) => ((b?.UnitCost ?? 0) + (b?.price ?? 0) + (b?.markup ?? 0)) - ((a?.UnitCost ?? 0) + (a?.price ?? 0) + (a?.markup ?? 0)));
    } else if (selectedOption === 'PRICE LOW TO HIGH') {
      sortedData.sort((a, b) => ((a?.UnitCost ?? 0) + (a?.price ?? 0) + (a?.markup ?? 0)) - ((b?.UnitCost ?? 0) + (b?.price ?? 0) + (b?.markup ?? 0)));
    } else {
      setNewProData(ProductApiData2);
    }
    setNewProData(sortedData);
  };
  console.log('newprodata--', newProData, ProductApiData2);

  useEffect(() => {
    if ((newProData?.length != 0 || ProductApiData2?.length != 0)) {
      setIsProdLoading(true)
    } else {
      if (newProData?.length == 0 || ProductApiData2?.length == 0) {
        setTimeout(() => {
          setIsProdLoading(true);
        }, 1000);
      } else {
        setIsProdLoading(false);
      }
    }
  }, [newProData, ProductApiData2])

  console.log('proDcount--', prodCount);

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const PriceWithMarkupFunction = (pmu, pPrice, curr) => {
    if (pPrice <= 0) {
      return 0
    }
    else if (pmu <= 0) {
      return pPrice
    }
    else {
      let percentPMU = ((pmu / 100) / curr)
      return (Number(pPrice * (percentPMU ?? 0)) + Number(pPrice ?? 0))
    }
  }

  const [isActive, setIsActive] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);

  const [isShowfilter, setIsShowFilter] = useState(true);
  const sortOptions = [
    { label: 'Recommended' },
    { label: 'New' },
    { label: 'In stock' },
    { label: 'PRICE LOW TO HIGH' },
    { label: 'PRICE HIGH TO LOW' },
  ];

  const handleFilterShow = () => {
    setIsShowFilter(!isShowfilter)
  }


  const toggleDropdown = () => {
    setIsActive(!isActive);
  };
  const toggleMobileDropdown = () => {
    setIsMobileActive(!isMobileActive);
  };

  const [show1ImagesView, setShow1ImageView] = useState(false);
  const [show2ImagesView, setShow2ImageView] = useState(false);
  const [show3ImagesView, setShow3ImageView] = useState(false);
  const [show4ImagesView, setShow4ImageView] = useState(false);

  const hanlde1ImageShow = () =>{
    setShow4ImageView(false)
    setShow3ImageView(false)
    setShow2ImageView(false)
    setShow1ImageView(true)
  }
  
  const handle2ImageShow = () => {
    setShow4ImageView(false)
    setShow1ImageView(false)
    setShow3ImageView(false)
    setShow2ImageView(true)
  }

  const handle3ImageShow = () => {
    setShow4ImageView(false)
    setShow2ImageView(false)
    setShow3ImageView(true)
  }

  const handle4ImageShow = () => {
    setShow2ImageView(false)
    setShow3ImageView(false)
    setShow4ImageView(true)
  }

  const ShortcutComboFunc = async (event, type) => {
    if (type === "metal") {
      setmtTypeOption(event)
      localStorage.setItem("selectedCombomt", JSON.stringify(event))
    }
    if (type === "dia") {
      setDiaQColOpt(event)
      localStorage.setItem("selectedCombodia", JSON.stringify(event))
    }
    if (type === "cs") {
      setCSQOpt(event)
      localStorage.setItem("selectedCombocs", JSON.stringify(event))
    }


    let metalTypeId = type === "metal" ? findMetalTypeId(`${event}`)[0]?.Metalid : findMetalTypeId(mtTypeOption)[0]?.Metalid
    // let metalTypeId = findMetalTypeId(mtTypeOption)[0]?.Metalid 
    let DiaQCid = type === "dia" ? [findDiaQcId(event)[0]?.QualityId, findDiaQcId(event)[0]?.ColorId] : [findDiaQcId(diaQColOpt)[0]?.QualityId, findDiaQcId(diaQColOpt)[0]?.ColorId]
    let CsQcid = type === "cs" ? [findCsQcId(event)[0]?.QualityId, findCsQcId(event)[0]?.ColorId] : [findCsQcId(cSQopt)[0]?.QualityId, findCsQcId(cSQopt)[0]?.ColorId]

    let obj = { mt: metalTypeId, dqc: DiaQCid, csqc: CsQcid }

    console.log("obj11", obj)

    let param = JSON.parse(localStorage.getItem("menuparams"))
    let autoCodeList = JSON.parse(localStorage.getItem("autoCodeList"))

    // if(param && currentPage && metalTypeId && DiaQCid && CsQcid){
    await getDesignPriceList(param, currentPage, obj, {}, autoCodeList).then(res => {
      if (res) {
        getProdPriceData()
      }
    })
    // }
  }

  // useEffect(() => {
  //   // if(JSON.parse(localStorage.getItem("getPriceData")) !== priceDataApi && location?.state.menuFlag !== true){

  //     ShortcutComboFunc()
  //     console.log("apiCalling")

  // }, [mtTypeOption, diaQColOpt, cSQopt])


  const handlePageChange = async (event, value) => {
    const activeFilters = Object.values(filterChecked).filter(ele => ele.checked);

    const output = {};

    activeFilters.forEach(item => {
      if (!output[item.type]) {
        output[item.type] = '';
      }
      output[item.type] += `${item.value}, `;
    });

    for (const key in output) {
      output[key] = output[key].slice(0, -2);
    }

    console.log("filterData", output);

    setFilterProdLoding(true);
    let param = JSON.parse(localStorage.getItem("menuparams"))
    setCurrentPage(value)

    let metalTypeId = findMetalTypeId(mtTypeOption)[0]?.Metalid
    let DiaQCid = [findDiaQcId(diaQColOpt)[0]?.QualityId, findDiaQcId(diaQColOpt)[0]?.ColorId]
    let CsQcid = [findCsQcId(cSQopt)[0]?.QualityId, findCsQcId(cSQopt)[0]?.ColorId]

    let obj = { mt: metalTypeId, dqc: DiaQCid, csqc: CsQcid }

    setTimeout(() => {
      window.scroll(0, 0)
    }, 100);

    await productListApiCall(param, value, output).then((res) => {
      if (res) return res
      return res
    }).then(async (res) => {
      if (res) {
        let autoCodeList = JSON.parse(localStorage.getItem("autoCodeList"))
        console.log("priceCall1");
        await getDesignPriceList(param, value, obj, output, autoCodeList)
        return res
      }
    }).then((res) => {
      if (res) {
        setDataPriceApiCallFlag(true)
        getProdPriceData()
        getProductData()
        setTimeout(() => {
          setFilterProdLoding(false);
        }, 10);
      }
      else {
        setDataPriceApiCallFlag(false)
      }
    })

    // console.log("value", value, param);
  }


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickN = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseN = () => {
    setAnchorEl(null);
  };



  return (
    <div id="top">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="customizationMain">
          <div>
            <div className="part" style={{ flex: '20%' }}>
              {isMetalCutoMizeFlag == 1 && <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: '95%',
                  gap: '5px'
                }}
              >
                <select
                  className='menuitemSelectoreMainPopup'
                  value={mtTypeOption}
                  onChange={(e) => {
                    // setmtTypeOption(e.target.value)
                    ShortcutComboFunc(e.target.value, "metal")
                    // console.log("event222",e.target.value)
                  }}
                  style={{ color: '#7b7b7b', fontSize: '12px', fontWeight: 400, cursor: 'pointer' }}
                >
                  {metalType.map((data, index) => (
                    <option key={index} value={data.metalType}>
                      {data.metaltype}
                    </option>
                  ))}
                </select>
              </div>}
            </div>
            {isMetalCutoMizeFlag == 1 && <div className="divider"></div>}
            {((isDaimondCstoFlag == 1) && (productData?.diamondweight !== 0 || productData?.diamondpcs !== 0)) &&
              <div className="part" style={{ flex: '20%' }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: '95%',
                    paddingTop: '10px',
                    gap: '5px',
                  }}
                >
                  <select
                    className='menuitemSelectoreMainPopup'
                    value={diaQColOpt}
                    onChange={(e) => {
                      setDiaQColOpt(e.target.value)
                    }}
                    style={{ color: '#7b7b7b', fontSize: '12px', fontWeight: 400, cursor: 'pointer' }}
                  >
                    {colorData?.map((colorItem) => (
                      <option key={colorItem.ColorId} value={`${colorItem.Quality}#${colorItem.color}`}>
                        {`${colorItem.Quality}#${colorItem.color}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            }
            {((isDaimondCstoFlag == 1) && (productData?.diamondweight !== 0 || productData?.diamondpcs !== 0)) &&
              <div className="divider"></div>}

            {isCColrStoneCustFlag === 1 && DaimondQualityColor?.length !== 0 &&
              <div className="part" style={{ flex: '20%' }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: '95%',
                    gap: '5px',
                  }}
                >
                  <select
                    className='menuitemSelectoreMain'
                    onChange={(e) =>
                      // setCSQOpt(e.target.value)
                      ShortcutComboFunc(e.target.value, "cs")
                    }
                    value={cSQopt}
                    style={{ color: '#7b7b7b', fontSize: '12px', fontWeight: 400, cursor: 'pointer' }}
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
              </div>
            }
          </div>
        </Box>
      </Modal>

      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {!IsProdLoading ? (
          <ProductListSkeleton />
        ) :
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: '30px',
              marginInline: '13%'
            }}
            className='paddingTopMobileSet mainProduct'
          >
            <div style={{ width: '100%' }}>
              <div class="bg-image">
                <div class="overlay"></div>
                <div class="text-container">
                  <div className='textContainerData'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p className="designCounttext" style={{ fontSize: '20px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {/* {location?.state?.filtervalue?.FilterVal2 ? location?.state?.filtervalue?.FilterVal2 : location?.state?.filtervalue?.FilterVal1 ? location?.state?.filtervalue?.FilterVal1 : location?.state?.filtervalue?.menuname} */}
                        {menuParamsState?.FilterVal2 ? menuParamsState?.FilterVal2 : menuParamsState?.FilterVal1 ? menuParamsState?.FilterVal1 : menuParamsState?.menuname}
                        &nbsp;{newProData?.length != 0 || ProductApiData2?.length != 0 ? prodCount : 0} <span style={{ textTransform: 'capitalize' }}>Designs</span>
                        <br />
                        <span style={{ fontSize: '10px' }}>{`${menuParamsState?.menuname || ''}${menuParamsState?.FilterVal1 ? ` > ${menuParamsState?.FilterVal1}` : ''}${menuParamsState?.FilterVal2 ? ` > ${menuParamsState?.FilterVal2}` : ''}`}</span>
                      </p>
                    </div>
                    <img src={`${storImagePath()}/images/HomePage/MainBanner/image/featuresImage.png`} className='featherImage' />
                  </div>
                </div>
              </div>
              <div className="filterDivcontainer">
                <div className="part" style={{ flex: '20%' }}>
                  <div className="part-content" onClick={handleFilterShow} style={{ fontSize: '12px' }}>
                    {isShowfilter ? "HIDE FILTER" : "SHOW FILTER"}
                    <FilterListIcon />
                  </div>
                </div>
                <div className="divider"></div>
                <div className="part" style={{ flex: '20%' }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: '95%',
                      gap: '5px'
                    }}
                  >
                    <select
                      className='menuitemSelectoreMain'
                      onChange={handleSortChange}
                      value={selectedSortOption}
                      style={{ color: '#7b7b7b', fontSize: '12px', fontWeight: 400, cursor: 'pointer' }}
                    >
                      {sortOptions?.map((option, index) => (
                        <option key={index} value={option.label}>
                          {(option.label).toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="part" style={{ flex: '20%' }}>
                  {isMetalCutoMizeFlag == 1 && <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: '95%',
                      gap: '5px'
                    }}
                  >
                    <select
                      className='menuitemSelectoreMain'
                      value={mtTypeOption}
                      onChange={(e) => {
                        // setmtTypeOption(e.target.value)
                        ShortcutComboFunc(e.target.value, "metal")
                        // console.log("event222",e.target.value)
                      }}
                      style={{ color: '#7b7b7b', fontSize: '12px', fontWeight: 400, cursor: 'pointer' }}
                    >
                      {metalType.map((data, index) => (
                        <option key={index} value={data.metalType}>
                          {data.metaltype}
                        </option>
                      ))}
                    </select>
                  </div>}
                </div>
                {isMetalCutoMizeFlag == 1 && <div className="divider"></div>}
                {((isDaimondCstoFlag == 1) && (productData?.diamondweight !== 0 || productData?.diamondpcs !== 0)) &&
                  <div className="part" style={{ flex: '20%' }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: '95%',
                        paddingTop: '10px',
                        marginBottom: '15px',
                        gap: '5px',
                      }}
                    >
                      <select
                        className='menuitemSelectoreMain'
                        value={diaQColOpt}
                        onChange={(e) => {
                          // setDiaQColOpt(e.target.value) 
                          ShortcutComboFunc(e.target.value, "dia")
                          // console.log("event444",e.target.value);

                        }}
                        style={{ color: '#7b7b7b', fontSize: '12px', fontWeight: 400, cursor: 'pointer' }}
                      >
                        {colorData?.map((colorItem) => (
                          <option key={colorItem.ColorId} value={`${colorItem.Quality}#${colorItem.color}`}>
                            {`${colorItem.Quality}#${colorItem.color}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                }
                {((isDaimondCstoFlag == 1) && (productData?.diamondweight !== 0 || productData?.diamondpcs !== 0)) &&
                  <div className="divider"></div>}

                {isCColrStoneCustFlag === 1 && DaimondQualityColor?.length !== 0 &&
                  <div className="part" style={{ flex: '20%' }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: '95%',
                        gap: '5px',
                      }}
                    >
                      <select
                        className='menuitemSelectoreMain'
                        onChange={(e) =>
                          // setCSQOpt(e.target.value)
                          ShortcutComboFunc(e.target.value, "cs")
                        }
                        value={cSQopt}
                        style={{ color: '#7b7b7b', fontSize: '12px', fontWeight: 400, cursor: 'pointer' }}
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
                  </div>
                }
                {isCColrStoneCustFlag === 1 &&
                  <div className="divider"></div>}
                <div className="part" style={{ flex: '20%', justifyContent: 'end' }}>
                  <div className="part-content">
                    <IoGrid style={{ height: '18px', width: '18px', opacity: 0.7, color: '#7b7b7b' }} onClick={() => handle2ImageShow()} />
                    <AppsIcon style={{ height: '22px', width: '22px', opacity: 0.8, color: '#1f1919' }} onClick={() => handle3ImageShow()} />
                    <TfiLayoutGrid4Alt style={{ height: '17px', width: '17px', opacity: 0.6 }} onClick={() => handle4ImageShow()} />
                  </div>
                </div>
              </div>
              <div className="smilingProductMain" id="smilingProductMain">
                <div
                  className="smilingProductSubMain"
                  style={{ width: "100%", display: "flex", position: "relative", gap: '10px' }}
                >
                  <div className="smilingWebProductListSideBar" style={{ transition: "1s ease", width: `19%`, left: `${isShowfilter ? "0" : "-500%"}`, position: 'relative', display: isShowfilter ? "block" : "none" }}>
                    <ul className="d-flex" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0px 20px 0px 0px' }}>
                      <li className="finejwelery me-4" id="finejwelery" style={{ fontSize: '14px' }}>
                        Filters
                        {/* {newProData.length > 0 ? ` (${newProData.length}/${ProductApiData2?.length}) ` : null} */}
                      </li>
                      <li className="finejwelery" id="finejwelery"
                        onClick={() => handlePageReload()}
                        style={{ cursor: 'pointer', fontSize: '14px' }}>
                        {
                          (Object.values(filterChecked)).filter(fc => fc.checked !== false).filter(fc => fc.checked !== undefined).length ?
                            "Clear All"
                            :
                            // `Product: ${ProductApiData2?.length}`
                            null
                        }
                      </li>
                    </ul>
                    <div>
                      {NewFilterData1().map((ele, index) => (
                        <>
                          <Accordion
                            elevation={0}
                            sx={{
                              borderBottom: "1px solid #c7c8c9",
                              borderRadius: 0,
                              "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                                borderBottomLeftRadius: "0px",
                                borderBottomRightRadius: "0px",
                              },
                              "&.MuiPaper-root.MuiAccordion-root:before": {
                                background: "none",
                              },
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon sx={{ width: "20px" }} />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                              sx={{
                                color: "#7f7d85",
                                borderRadius: 0,

                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                            >
                              <span className="filtercategoryLable">
                                {ele.label}
                              </span>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                                // ...(ele.label.length > 10 && {
                                minHeight: 'fit-content',
                                maxHeight: '300px',
                                overflow: 'auto',
                                // }),
                              }}
                            >
                              {/* {ele.label === "PRICE" &&
                              <div>
                                <Slider
                                  className='netWtSecSlider'
                                  getAriaLabel={() => 'Minimum distance'}
                                  value={value1}
                                  min={minPrice}
                                  max={maxPrice}
                                  size="small"
                                  onChange={handlePriceChange}
                                  valueLabelDisplay="auto"
                                  getAriaValueText={valuetext}
                                  disableSwap
                                />
                                <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                                  <input value={value1[0]} className="minmaxvalpl" disabled />
                                  <input value={value1[1]} className="minmaxvalpl" disabled />
                                </div>
                              </div>}

                          {ele.label === "NETWT" &&
                            <div>
                              <Slider
                                className='netWtSecSlider'
                                getAriaLabel={() => 'Minimum distance'}
                                value={value2}
                                min={minNetwt}
                                max={maxNetwt}
                                size="small"
                                onChange={handleNetWtChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                              />
                              <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                                <input value={value2[0]} className="minmaxvalpl" disabled />
                                <input value={value2[1]} className="minmaxvalpl" disabled />
                              </div>
                            </div>
                          }

                          {ele.label === "GROSSWT" &&
                            <div>
                              <Slider
                                className='netWtSecSlider'
                                getAriaLabel={() => 'Minimum distance'}
                                value={value3}
                                min={minGrosswt}
                                max={maxGrosswt}
                                size="small"
                                onChange={handlegrossWtChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                disableSwap
                              />
                              <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                                <input value={value3[0]} className="minmaxvalpl" disabled />
                                <input value={value3[1]} className="minmaxvalpl" disabled />
                              </div>
                            </div>
                          }

                            {ele.label === "DIAMONDWT" &&
                              <div>
                                <Slider
                                  className='netWtSecSlider'
                                  getAriaLabel={() => 'Minimum distance'}
                                  value={value4}
                                  min={minDiamondWt}
                                  max={maxDiamondWt}
                                  size="small"
                                  onChange={handleDiamondChange}
                                  valueLabelDisplay="auto"
                                  getAriaValueText={valuetext}
                                  disableSwap
                                />
                                <div className="d-flex w-100 justify-content-between align-items-center mt-1">
                                  <input value={value4[0]} className="minmaxvalpl" disabled />
                                  <input value={value4[1]} className="minmaxvalpl" disabled />
                                </div>
                              </div>
                            } */}

                              {ele.filterList.map((flist, i) => (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: 'space-between',
                                    gap: "12px",
                                  }}
                                  key={i}
                                >

                                  <small
                                    style={{
                                      fontFamily: "TT Commons, sans-serif",
                                      color: "#7f7d85",
                                    }}
                                  >
                                    {flist.label}
                                  </small>
                                  <Checkbox
                                    name={`checkbox${index + 1}${i + 1}`}
                                    checked={
                                      filterChecked[`checkbox${index + 1}${i + 1}`]
                                        ? filterChecked[`checkbox${index + 1}${i + 1}`]?.checked
                                        : false
                                    }
                                    style={{
                                      color: "#7f7d85",
                                      padding: 0,
                                      width: "10px",
                                    }}
                                    onClick={(e) =>
                                      handleCheckboxChange(e, ele, flist.id)
                                    }
                                    size="small"
                                  />
                                </div>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        </>
                      ))}
                    </div>
                  </div>
                  {/* for mobile */}
                  <div className="smilingMobileProductListSideBar">
                    <div className="filterListMobileData" style={{ display: "flex", marginInline: "15px" }}>
                      <div style={{ width: "100%" }} onClick={toggleDrawerOverlay}>
                        <Drawer
                          anchor="left"
                          open={isOpenDetail}
                          onClose={toggleDetailDrawer}
                        >
                          {list("left")}
                        </Drawer>
                        <div className="filterMobileDivcontainer">
                          <div className="part firstfilteDiv" style={{ flex: '20%' }}>
                            <div className="part-content" onClick={toggleDetailDrawer}>
                              Filter
                              <FilterListIcon />

                            </div>
                          </div>
                          <div className="part secondfilteDiv" style={{ flex: '20%' }}>
                            {/* <div className={`custom-select ${isMobileActive ? 'active' : ''}`}>
                                <button
                                  ref={dropdownRef}
                                  className="select-button"
                                  onClick={toggleMobileDropdown}
                                  aria-haspopup="listbox"
                                  aria-expanded={isMobileActive}
                                >
                                  <span className="selected-value">{selectedOptionData ? selectedOptionData : 'Featured'}
                                    <SortIcon />
                                  </span>
                                </button>
                                {isMobileActive && (
                                  <ul className="select-dropdown">
                                    {options.map((option, index) => (
                                      <li key={index} role="option" onClick={() => handleSortChange(option)}>
                                        <label htmlFor={`option-${index}`}>{option.label}</label>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div> */}
                            <div
                              style={{
                                display: "flex",
                                // width: '95%',
                                // gap: '5px'
                                alignItems: 'center'
                              }}
                            >
                              <select
                                className='menuitemSelectoreMainMobile'
                                onChange={handleSortChange}
                                value={selectedSortOption}
                                style={{ color: '#7b7b7b', cursor: 'pointer', backgroundColor: 'transparent', fontWeight: 400 }}
                              >
                                {sortOptions?.map((option, index) => (
                                  <option key={index} value={option.label}>
                                    {(option.label)}
                                  </option>
                                ))}
                              </select>
                              <FaChevronDown style={{ color: '#7b7b7b' }} />
                            </div>
                          </div>

                          <div className="part secondfilteDiv" style={{ flex: '20%' }}>
                            <div className="part-content">
                              <button
                                className="select-button"
                                aria-haspopup="listbox"
                                onClick={handleOpen}
                              >
                                <span className="selected-value">Combo
                                  <SortIcon />
                                </span>
                              </button>
                            </div>
                          </div>

                          <div className="part thirdfilteDiv" style={{ flex: '60%', justifyContent: 'end' }}>
                            <div className="part-content">
                              <Button style={{ minWidth: '0px', padding: '0px' }}>
                                <IoGrid style={{ height: '18px', width: '18px', opacity: 0.7, color: '#7b7b7b' }} onClick={() => handle2ImageShow()} />
                              </Button>
                              <Button style={{ minWidth: '0px', padding: '0px' }}>
                                <AppsIcon style={{ height: '22px', width: '22px', opacity: 0.8, color: '#1f1919' }} onClick={() => handle3ImageShow()} />
                              </Button>
                              {/* <TfiLayoutGrid4Alt style={{ height: '17px', width: '17px', opacity: 0.6 }} onClick={() => handle4ImageShow()} /> */}
                            </div>
                          </div>

                          {/* <CiMenuKebab style={{ height: '25px', width: '22px', opacity: 0.7, color: '#283045' }} onClick={() => handle2ImageShow()} /> */}


                          <div className="part thirdfilteDivMobile" style={{ flex: '5%', justifyContent: 'end' }}>
                            <div className="part-content">
                              <Button
                                style={{ minWidth: '0px', padding: '0px' }}
                                onClick={handleClickN}
                              >
                                <CiMenuKebab style={{ height: '25px', width: '22px', opacity: 0.7, color: '#283045' }} />
                              </Button>
                              <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseN}
                              >
                                <MenuItem style={{color: 'rgb(123, 123, 123)' , fontSize: '14px'}} onClick={() => {handleCloseN(); hanlde1ImageShow();}}>Single View</MenuItem>
                                <MenuItem style={{color: 'rgb(123, 123, 123)', fontSize: '14px'}} onClick={() => {handleCloseN(); handle2ImageShow();}}>Double View</MenuItem>
                              </Menu>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      // width: isShowfilter ? "80%" : "100%",
                      width: isShowfilter ? "80%" : "100%",
                      display: "flex",
                      flexDirection: 'column',
                      transition: "1s ease"
                      // margin: "40px 0px 0px 0px",
                    }}
                    className="smilingProductImageMain"
                    id="smilingProductImageMain"
                  >
                    {/* <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: '10px'
                    }}
                    className="smilingFilterweb"
                  >
                    <select
                      style={{
                        width: "20%",
                        height: '40px',
                        border: '1px solid lightgray',
                        borderRadius: '5px',
                        paddingBottom: '10px',
                        outline: "none",
                        fontSize: "13px ",
                      }}
                      onChange={handleSortChange}
                      value={selectedSortOption}
                    >
                      <option value="None">Recommended</option>
                      <option value="None">New</option>
                      <option value="None">In stock</option>
                      <option value="PRICE HIGH TO LOW">PRICE HIGH TO LOW</option>
                      <option value="PRICE LOW TO HIGH">PRICE LOW TO HIGH</option>
                    </select>
                  </div> */}
                    {filterProdLoding ? (
                      <ProductFilterSkelton />
                    ) :
                      <>
                        {newProData?.length != 0 || ProductApiData2?.length != 0 ? (
                          <div className={`smilingAllProductDataMainMobile
                                    ${show1ImagesView ? "smilingAllProductDataMainMobileShow1Image" : ""}
                                    ${show2ImagesView ? "smilingAllProductDataMainMobileShow2Image" : ""}
                                    ${show4ImagesView ? "smilingAllProductDataMainMobileShow4Image" : ""}`}>
                            {/* RollOverImageName */}
                            {/* {(newProData.length ? newProData : finalDataOfDisplaying())?.map((products, i) => ( */}
                            {(rangeProData.length ? rangeProData : (newProData?.length ? newProData : ProductApiData2))?.map((products, i) =>
                            (
                              <div className={`main-ProdcutListConatiner
                      ${show1ImagesView ? "main-ProdcutListConatiner1ImageShow" : ""}
                      ${show2ImagesView ? "main-ProdcutListConatiner2ImageShow" : ""}
                      ${show4ImagesView ? "main-ProdcutListConatiner4ImageShow" : ""}`}
                              >
                                <div className={`listing-card
                          ${show2ImagesView ? "listing-cardShow2Image" : ""}
                          ${show4ImagesView ? "listing-cardShow4Image" : ""}`} >
                                  <div className="listing-image">
                                    {products?.designno === "S24705E" && <p id="labelTag_0002388" className="instockP">IN STOCK</p>}
                                    {products?.designno === "S24705" && <p id="labelTag_0002388" className="instockP">IN STOCK</p>}
                                    {products?.designno === "MCJ2" && <p id="labelTag_0002388" className="instockP">IN STOCK</p>}

                                    <div>
                                      <img
                                        className={`${isShowfilter ? "prod_img" : "prod_imgFiletrHide"}
                                        ${show1ImagesView ? "prod_img1" : ""}

                                            ${show2ImagesView ?
                                              isShowfilter ?
                                                "prod_img2" : "prod_img2FiletrHider" : ""}

                                            ${show4ImagesView ?
                                            isShowfilter ?
                                              "prod_img4" : "prod_img4FiletrHider" : ""} `}
                                        src={
                                          hoveredImageUrls[i] ? hoveredImageUrls[i] : updatedColorImage[i] ? updatedColorImage[i] :
                                            (storeInitData ?
                                              `${storeInitData?.DesignImageFol}${products?.DesignFolderName}/${storeInitData?.ImgMe}/${products?.DefaultImageName}`
                                              :
                                              notFound)
                                        }
                                        // src={
                                        //   hoveredImageUrls[i] ? hoveredImageUrls[i] : updatedColorImage[i] ? updatedColorImage[i] :
                                        //     (products?.MediumImagePath ?
                                        //       (globImagePath + products?.MediumImagePath?.split(",")[0])
                                        //       :
                                        //       notFound)
                                        // }
                                        onMouseEnter={() => handleHoverImageShow(i, storeInitData?.DesignImageFol, products?.DesignFolderName, storeInitData?.ImgMe, products?.RollOverImageName)}
                                        // onMouseEnter={() => handleHoverImageShow(products?.MediumImagePath?.split(",")[0], i, products?.RollOverImageName, globImagePath)}
                                        // onMouseEnter={() => handleHoverImageShow(products?.MediumImagePath?.split(",")[0], i, isColorWiseImageShow === 1 ? products?.ColorWiseRollOverImageName : products?.RollOverImageName, products?.imagepath)}
                                        onMouseLeave={() => handleMouseLeave(i)}
                                        // style={{ objectFit: 'contain' }}
                                        alt="#"
                                        onError={(e) => {
                                          e.target.src = notFound;
                                        }}
                                        onClick={() => handelProductSubmit(products)}
                                      />
                                      <Button className="cart-icon">
                                        <Checkbox
                                          icon={
                                            <LocalMallOutlinedIcon
                                              sx={{ fontSize: "22px", color: "#7d7f85", opacity: '.7' }}
                                            />
                                          }
                                          checkedIcon={
                                            <LocalMallIcon
                                              sx={{ fontSize: "22px", color: "#009500" }}
                                            />
                                          }
                                          disableRipple={true}
                                          sx={{ padding: "5px" }}

                                          checked={products?.checkFlag}
                                          onChange={(e) => handelCartList(e, products)}
                                        />
                                      </Button>
                                      <Button className="wishlist-icon">
                                        <Checkbox
                                          icon={
                                            <FavoriteBorderIcon
                                              sx={{ fontSize: "22px", color: "#7d7f85", opacity: '.7' }}
                                            />
                                          }
                                          checkedIcon={
                                            <FavoriteIcon
                                              sx={{ fontSize: "22px", color: "#e31b23" }}
                                            />
                                          }
                                          disableRipple={true}
                                          sx={{ padding: "5px" }}

                                          checked={products?.wishCheck}
                                          onChange={(e) => handelWishList(e, products)}
                                        />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className={show4ImagesView ? 'listing4-details' : "listing-details"} onClick={() => handelProductSubmit(products)}>
                                    <p className={show4ImagesView ? "productDetails property4-type" : "productDetails property-type"} style={{ textAlign: 'center', margin: '0px 5px 0px 5px' }}>
                                      {products?.TitleLine}
                                    </p>
                                    <div>
                                      <p className="property-type" style={{ margin: '0px', textAlign: 'center' }}>
                                        {isMetalTCShow === 1 &&
                                          <span className="property-typeTitleSub" style={{ fontSize: '12px' }}>
                                            {products?.updMC} -
                                            {products?.updMT}
                                          </span>
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  <div className={show4ImagesView ? "listing-features4" : "listing-features"} style={{ marginLeft: '2px' }}>
                                    <div>
                                      {ismetalWShow === 1 &&
                                        <div className={show4ImagesView ? "feature4" : 'feature'}>
                                          <p style={{ margin: '0px' }}>
                                            <span className="feature-count">NWT :
                                            </span> {parseFloat(products?.updNWT).toFixed(2)}
                                          </p>
                                        </div>
                                      }

                                      {(isDaaimongWShow === 1 && (products?.diamondweight !== 0 || products?.diamondpcs !== 0)) &&
                                        <div className={show4ImagesView ? "feature4" : 'feature'}>
                                          <p style={{ margin: '0px' }}>
                                            <span className="feature-count">DWT : </span>
                                            {(isDaaimongWShow === 1 && products?.diamondweight !== 0) && products?.updDWT + '/'}  {(isDaaimonPShow === 1 && products?.diamondpcs !== 0) && products?.updDPCS}</p>
                                        </div>
                                      }

                                      {isGrossWShow === 1 &&
                                        <div className={show4ImagesView ? "feature4" : 'feature'}>
                                          <p style={{ margin: '0px' }}>
                                            <span className="feature-count">GWT : </span> {parseFloat(products?.updGWT).toFixed(3)}
                                          </p>
                                        </div>
                                      }

                                      {((isStoneWShow || isStonePShow) === 1 && (products?.totalcolorstoneweight !== 0 || products?.totalcolorstonepcs !== 0)) &&
                                        <div className={show4ImagesView ? "feature4" : 'feature'}>
                                          <p style={{ margin: '0px' }}>
                                            <span className="feature-count">CWT :</span>
                                            {(isStoneWShow === 1 && products?.totalcolorstoneweight !== 0) && (Number(products?.updCWT ?? 0)).toFixed(3) + '/'}  {(isStonePShow === 1 && products?.totalcolorstonepcs !== 0) && products?.updCPCS}
                                          </p>
                                        </div>
                                      }
                                    </div>
                                    {/* <div className="mobileDeatilDiv2" style={{ display: 'flex', justifyContent: 'center', height: '20px' }}> */}


                                    {/* <div className="mobileDeatilDiv2" style={{ display: 'flex', justifyContent: 'center', height: '20px' }}>
                                        {((isDaaimongWShow || isDaaimongWShow) === 1 && (products?.diamondweight !== 0 || products?.diamondpcs !== 0)) && <div>
                                          <p style={{ margin: '0px', fontSize: '13px' }}>DWT : <span style={{ fontWeight: 600, marginRight: '10px' }}>{(isDaaimongWShow === 1 && products?.diamondweight !== 0) && products?.updDWT + '/'}  {(isDaaimonPShow === 1 && products?.diamondpcs !== 0) && products?.updDPCS}</span></p>
                                        </div>

                                        } */}


                                    {/* </div> */}

                                    <div>
                                      <div className={show4ImagesView ? "feature4" : 'feature'}>
                                        <p className="feature4DesignNum" style={{ margin: '0px', fontSize: '15px' }}>
                                          <span className="feature-count">{products?.designno}</span>
                                        </p>
                                      </div>

                                      <p style={{ display: 'flex', margin: '0px' }}>
                                        {/* {products?.MetalTypeName} - */}
                                        {/* {isMetalTCShow === 1 && <span>
                                  {products?.updMC} -
                                  {products?.updMT} /
                                </span>} */}
                                        {isPriceShow === 1 &&
                                          <div className={show4ImagesView ? "feature4" : 'feature'}>
                                            <p className="feature4DesignNum" style={{ margin: '0px', fontSize: '15px' }}>
                                              <span className="property-type feature4DesignNum" style={{ display: 'flex', fontSize: '15px', fontWeight: 600 }}>
                                                <div className="currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />
                                                {products?.ismrpbase === 1 ? products?.mrpbaseprice : PriceWithMarkupFunction(products?.markup, products?.price, currData?.CurrencyRate)?.toFixed(2)}
                                              </span>
                                            </p>
                                          </div>
                                        }
                                      </p>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            )
                            )}
                          </div>
                        ) :
                          <div className="" style={{ margin: '50px 0px 50px 0px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <img src="https://i.gifer.com/7jM3.gif" alt="No Products Found" style={{ maxWidth: '10%', height: 'auto' }} />
                            </div>
                            <Typography sx={{ color: '#a2a2a2' }} variant="h4" align="center">No Products Found</Typography>
                            <Typography sx={{ color: '#a2a2a2' }} variant="body2" align="center">Your search did not match any products. <br />Please try again.</Typography>
                          </div>
                        }
                      </>
                    }
                  </div>
                </div>
                {(newProData?.length != 0 || ProductApiData2?.length != 0) && <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '100px', marginBottom: '50px' }}>
                  {!((prodCount / prodPageSize) < 1) && <Pagination count={Math.ceil(prodCount / prodPageSize)} onChange={handlePageChange} />}
                  {console.log("pagination", (prodCount / prodPageSize) < 1)}
                </div>}
                {/* <SmilingRock /> */}
                {/* <Footer /> */}
              </div>
            </div>
          </div>
        }
      </div>
      <Footer />
    </div >
  );
};

export default ProductList;