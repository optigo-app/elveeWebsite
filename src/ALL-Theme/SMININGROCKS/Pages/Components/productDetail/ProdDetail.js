import React, { useState, useEffect, useCallback } from 'react'
import './proddetail.css'
import Header from '../home/Header/Header'
import Footer from '../home/Footer/Footer'
import SmilingRock from '../home/smiling_Rock/SmilingRock'
import { Checkbox, Divider, Skeleton } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import filterData from '../../jsonFile/M_4_95oztttesi0o50vr.json'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { CommonAPI } from '../../../Utils/API/CommonAPI'
import { GetCount } from '../../../Utils/API/GetCount'
import { CartListCounts, WishListCounts, designSet, colorstoneQualityColorG, diamondQualityColorG, metalTypeG, priceData } from '../../../../../Recoil/atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import notFound from '../../assets/image-not-found.jpg'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useNavigate } from 'react-router-dom'
import playVidoe from '../../assets/paly.png'
import { IoIosPlayCircle } from "react-icons/io";
import { getDesignPriceList } from '../../../Utils/API/PriceDataApi'
import { FullProInfoAPI } from '../../../Utils/API/FullProInfoAPI'
import { findCsQcId, findCsQcIdDiff, findDiaQcId, findMetalTypeId, findValueFromId } from '../../../Utils/globalFunctions/GlobalFunction'

const ProdDetail = () => {

  const [acc, setAcc] = useState(false);
  const [accNo, setAccNo] = useState('');
  const [imgLoading, setImgLoading] = useState(true);
  const [cartFlag, setCartFlag] = useState(false);
  const [WishListFlag, setWishListFlag] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [WishData, setWishData] = useState([]);
  const [productData, setProductData] = useState();
  const [thumbImg, setThumbImg] = useState();
  const [thumbImgMain, setThumbImgMain] = useState('');
  const [colorData, setColorData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [getAllFilterSizeData, setGetAllFilterSizeData] = useState([]);
  const [metalFilterData, setMetalFilterData] = useState([]);
  const [daimondFilterData, setDaimondFiletrData] = useState([]);
  const [colorStoneFilterData, setColorStoneFiletrData] = useState([]);
  const [FindingFilterData, setFindingFiletrData] = useState([]);
  const [updatedColorImage, setUpdateColorImage] = useState('');

  const [metalColorData, setMetalColorData] = useState([]);
  const [metalType, setMetalType] = useState([]);
  const [DaimondQualityColor, setDaimondQualityColor] = useState([]);
  const [isMetalCutoMizeFlag, setIsMetalCutoMizeFlag] = useState('');
  const [isDaimondCstoFlag, setIsDaimondCstoFlag] = useState('');
  const [isCColrStoneCustFlag, setIsCColrStoneCustFlag] = useState('');
  const [isPriseShow, setIsPriceShow] = useState()

  const [sizeOption, setSizeOption] = useState();
  const [diaQColOpt, setDiaQColOpt] = useRecoilState(diamondQualityColorG);
  const [diaQColOptId, setDiaQColOptId] = useState();
  const [mtTypeOption, setmtTypeOption] = useRecoilState(metalTypeG);
  const [mtTypeOptionId, setmtTypeOptionId] = useState();
  const [mtPurity, setmtPurity] = useState();
  const [mtColorName, setmtColorName] = useState();
  const [cSQopt, setCSQOpt] = useRecoilState(colorstoneQualityColorG);
  const [cSQoptId, setCSQOptId] = useState();
  const [colorImageData, setColorImageData] = useState([]);
  const [isProductCuFlag, setIsProductCuFlag] = useState("");
  const [IsColorWiseImagesShow, setIsColorWiseImagesShow] = useState('')
  const [videoUrl, setVideoUrl] = useState('');
  const [completeBackImage, setCompleteBackImage] = useState('');
  const [designUniqueNO, setDesignUnicNo] = useState('');

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImagePath, setSelectedImagePath] = useState('');

  const [showIcateDesign, setShowEcateDesign] = useState('');

  const [mtPrice, setMetalPrice] = useState(0)

  const [dqcPrice, setDQCPrice] = useState(0)
  const [csqcPrice, setCSQCPrice] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)

  const [designSetList, setDesignSetList] = useState([]);
  const [sizeMarkup, setSizeMarkup] = useState();
  const [catSizeData, setCatSizeData] = useState([]);

  const [mtrdData, setMtrdData] = useState([])
  const [dqcData, setDqcData] = useState()
  const [dqcRate, setDqcRate] = useState()
  const [dqcSettRate, setDqcSettRate] = useState()
  const [csqcData, setCsqcData] = useState()
  const [csqcRate, setCsqcRate] = useState()
  const [csqcSettRate, setCsqcSettRate] = useState()
  const [getPriceData, setGetPriceData] = useState([])
  const [globImagePath, setGlobImagepath] = useState()
  const [imageSize, setImageSize] = useState()
  const [diaqcData, setDiaQcData] = useState([]);
  const [csData, setCsData] = useState([])
  const [addToCartFlag, setAddToCartFlag] = useState(false)

  const [uploadLogicPath, setUploadLogicPath] = useState('');
  const [uKey, setUkey] = useState('');
  const [currData, setCurrData] = useState()
  const [fullProdData, setFullProdData] = useState();

  const [storeInitData, setStoreInitData] = useState({})
  const [productThumImg, setProductThumImg] = useState([]);
  const [srProdPriceData, setSrProdPriceData] = useState();
  const [thumFlag, setThumFlag] = useState(false);


  useEffect(() => {

    const fetchProductThumbnails = async () => {

      const storeInit = JSON.parse(localStorage.getItem('storeInit'))
      setGlobImagepath(storeInit?.DesignImageFol)

      let localProductData = JSON.parse(localStorage.getItem('srProductsData'))
      setProductData(localProductData)
      const thumImgPromises = localProductData?.ImageName?.split(",").map(async (data, i) => {
        const imageUrl = storeInit?.DesignImageFol + localProductData?.DesignFolderName + '/' + storeInit?.ImgTh + '/' + data;
        const isAvailable = await checkImageAvailability(imageUrl);
        if (isAvailable) {
          return { imagepath: imageUrl };
        }
        return null;
      });
      const availableThumImgs = await Promise.all(thumImgPromises);
      setProductThumImg(availableThumImgs?.filter(img => img !== null));
      setThumFlag(false);
    };
    fetchProductThumbnails();
  }, [mtColorName, thumFlag]);
  // console.log('productDataproductDataproductData111', productThumImg);

  // console.log('mtPurity', mtPurity);

  useEffect(() => {
    setTimeout(() => {
      let srpriceDataInfo = JSON.parse(localStorage.getItem("srProdPriceInfo"))
      setSrProdPriceData(srpriceDataInfo)
    }, 100)
  }, [])

  console.log("metalFilterData", catSizeData?.sizename);
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

  const getProdFullInfo = () => {
    let fullProdInfo = JSON.parse(localStorage.getItem('fullProdInfo'))
    if (fullProdInfo) {
      setFullProdData(fullProdInfo)
    }
  }

  const setProdFullInfo = async () => {
    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'))
    await FullProInfoAPI(srProductsData?.designno).then(res => {
      if (res) {
        getProdFullInfo();
      }
    })
  }
  useEffect(() => {
    setProdFullInfo();
  }, [])
  useEffect(() => {
    // handelCurrencyData();
    let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
    let obj = { "CurrencyRate": loginData?.CurrencyRate, "Currencysymbol": loginData?.Currencysymbol }
    if (obj) {
      setCurrData(obj)
    }
  }, [])


  const setCartCount = useSetRecoilState(CartListCounts)
  const setWishCount = useSetRecoilState(WishListCounts)
  const getDesignSet = useRecoilValue(designSet)
  const handelImgLoad = () => {
    setImgLoading(false)
  }

  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem('storeInit'))
    setImageSize(storeInit);
    setGlobImagepath(storeInit?.DesignImageFol)
  }, [])



  let currencySymbol = JSON.parse(localStorage.getItem('CURRENCYCOMBO'))
  let navigate = useNavigate()

  useEffect(() => {
    let uploadPath = localStorage.getItem('UploadLogicalPath');
    setUploadLogicPath(uploadPath);

    const data = JSON.parse(localStorage.getItem("getPriceData"))
    setGetPriceData(data)
  }, [])


  console.log("srProdPriceData", srProdPriceData)

  // function findDiaQcIdhere(param) {
  //   console.log("findDiaQcIdhere", param);

  //   let diaQCArr = JSON.parse(localStorage.getItem("QualityColor"))
  //   let quality = param.split("#")[0]
  //   let color = param.split("#")[1]

  //   let item = diaQCArr?.filter(ele => ele?.Quality == quality && ele?.color == color)

  //   return item
  //  }

  console.log("metalType", mtTypeOption)

  // console.log("findCsQcId",findCsQcId(srProdPriceData?.cSQopt)[0]?.ColorId)

  useEffect(() => {

    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
    let ColorStoneQualityColor = JSON.parse(localStorage.getItem("ColorStoneQualityColor"))
    let DimondQualityColor = JSON.parse(localStorage.getItem("QualityColor"))
    let MetalTypeData = JSON.parse(localStorage.getItem("MetalTypeData"))

    if (srProdPriceData?.mtTypeOption) {
      let metalType = MetalTypeData?.find(item => item?.Metalid == findMetalTypeId(srProdPriceData?.mtTypeOption)[0]?.Metalid)



      setmtTypeOption(metalType?.metaltype)
      setmtTypeOptionId(metalType?.Metalid)
      setmtPurity(metalType?.metaltype);
    } else {
      setmtTypeOption(MetalTypeData[0]?.metaltype)
      setmtTypeOptionId(MetalTypeData[0]?.Metalid)
      setmtPurity(MetalTypeData[0]?.metaltype)

    }

    if (srProdPriceData?.diaQColOpt) {
      let diaQCVar = DimondQualityColor?.find(item => (item.QualityId == findDiaQcId(srProdPriceData?.diaQColOpt)[0]?.QualityId) && (item.ColorId == findDiaQcId(srProdPriceData?.diaQColOpt)[0]?.ColorId));
      // let qualityColor = `${loginInfo?.cmboDiaQualityColor.split("#@#")[0]?.toUpperCase()}#${loginInfo?.cmboDiaQualityColor.split("#@#")[1]?.toUpperCase()}`
      let qualityColor = `${diaQCVar?.Quality}#${diaQCVar?.color}`
      setDiaQColOpt(qualityColor)
      setDiaQColOptId([diaQCVar?.QualityId, diaQCVar?.ColorId])
    }
    else {
      if (DimondQualityColor && DimondQualityColor?.length) {
        setDiaQColOpt(`${DimondQualityColor[0]?.Quality}#${DimondQualityColor[0]?.color}`)
        setDiaQColOptId([DimondQualityColor[0]?.QualityId, DimondQualityColor[0]?.ColorId])

      }
    }


    // let dqcc = ColorStoneQualityColor?.find((dqc) => `${dqc.Quality}-${dqc.color}` === csQualColor)

    // if (srProdPriceData?.cSQopt && loginInfo?.cmboCSQCid !== "0,0") {
    //   let csQCVar = ColorStoneQualityColor?.find(item => (item?.QualityId == findCsQcId(srProdPriceData?.cSQopt)[0]?.QualityId) && (item?.ColorId == findCsQcId(srProdPriceData?.cSQopt)[0]?.ColorId))
    //   console.log("colorstone",csQCVar)
    //   let csQualColor = `${csQCVar?.Quality}-${csQCVar?.color}`
    //   setCSQOpt(csQualColor)
    //   setCSQOptId([csQCVar?.QualityId, csQCVar?.ColorId])

    // } else {
    //   // let ref = `${ColorStoneQualityColor[0].Quality}-${ColorStoneQualityColor[0].color}`
    //   // let ref1 = [ColorStoneQualityColor[0].QualityId, ColorStoneQualityColor[0].ColorId]
    //   setCSQOpt("")
    //   setCSQOptId([loginInfo?.cmboCSQCid?.split(",")[0],loginInfo?.cmboCSQCid?.split(",")[1]])

    // }
    if (srProdPriceData?.cSQopt) {
      let csQCVar = ColorStoneQualityColor?.find(item => (item?.QualityId == findCsQcId(srProdPriceData?.cSQopt)[0]?.QualityId) && (item?.ColorId == findCsQcId(srProdPriceData?.cSQopt)[0]?.ColorId))
      console.log("colorstone", csQCVar)
      let csQualColor = `${csQCVar?.Quality}-${csQCVar?.color}`
      setCSQOpt(csQualColor)
      setCSQOptId([csQCVar?.QualityId, csQCVar?.ColorId])

    } else {
      let ref = `${ColorStoneQualityColor[0].Quality}-${ColorStoneQualityColor[0].color}`
      let ref1 = [ColorStoneQualityColor[0].QualityId, ColorStoneQualityColor[0].ColorId]
      setCSQOpt(ref)
      setCSQOptId(ref1)

    }

    // let sizeDatafilter = sizeData?.filter((sd)=>sd?.IsDefaultSize === 1)
    // console.log("sizeData",sizeDatafilter)

    // setSizeOption(sizeData[1]?.id)

  }, [colorData, sizeData, srProdPriceData])

  // console.log("info", mtTypeOption, diaQColOpt, cSQopt);

  // console.log("productData",sizeOption)

  // useEffect(()=>{

  //   let srProductsData = JSON.parse(localStorage.getItem('srProductsData'));

  //       let mtrd = getPriceData?.rd?.filter((ele) => 
  //           ele?.A === srProductsData?.autocode && 
  //           ele?.B === srProductsData?.designno && 
  //           ele?.D === mtTypeOption
  //         )

  //         let showPrice = srProductsData?.price - ((srProductsData?.price - srProductsData?.metalrd) + (mtrd[0].Z ?? 0))

  //         // setMetalPrice(showPrice)

  //       let diaqcprice = getPriceData?.rd1?.filter((ele) => 
  //         ele.A === srProductsData?.autocode && 
  //         ele.B === srProductsData?.designno &&
  //         ele.H === diaQColOpt?.split("_")[0] &&
  //         ele.J === diaQColOpt?.split("_")[1] 
  //         )

  //         let showPrice1 = srProductsData?.price-((srProductsData?.price - srProductsData?.diard1) + (diaqcprice[0].S ?? 0))
  //         // setDQCPrice(showPrice1)

  //       let csqcpirce = getPriceData?.rd2?.filter((ele) => 
  //         ele.A === srProductsData?.autocode && 
  //         ele.B === srProductsData?.designno &&
  //         ele.H === cSQopt?.split("-")[0] &&
  //         ele.J === cSQopt?.split("-")[1]   
  //         )

  //         let showPrice2 = srProductsData?.price -((srProductsData?.price - srProductsData?.csrd2) + (csqcpirce[0].S ?? 0));
  //         // setCSQCPrice(showPrice2)

  //         let showPriceall = (srProductsData?.price - srProductsData?.metalrd) + (mtrd[0]?.Z ?? 0)

  //         console.log({showPrice,showPrice1,showPrice2});
  //         let gt = showPrice + showPrice1 + showPrice2;
  //         setGrandTotal(gt ?? 0)

  // },[mtTypeOption,diaQColOpt,cSQopt])

  // useEffect(()=>{

  //   let srProductsData = JSON.parse(localStorage.getItem('srProductsData'));

  //       let diaqcprice = getPriceData?.rd1?.filter((ele) => 
  //           ele.A === srProductsData?.autocode && 
  //           ele.B === srProductsData?.designno &&
  //           ele.H === diaQColOpt?.split("_")[0] &&
  //           ele.J === diaQColOpt?.split("_")[1] 
  //           )

  //           let showPrice = (srProductsData?.price - srProductsData?.diard1) + (diaqcprice[0]?.S ?? 0)
  //           setDQCPrice(showPrice)

  // },[diaQColOpt])

  // useEffect(() => {
  //   let srProductsData = JSON.parse(localStorage.getItem('srProductsData'));

  //       let csqcpirce = getPriceData?.rd2?.filter((ele) => 
  //           ele.A === srProductsData?.autocode && 
  //           ele.B === srProductsData?.designno &&
  //           ele.H === cSQopt?.split("-")[0] &&
  //           ele.J === cSQopt?.split("-")[1]   
  //           )

  //           let showPrice = ((srProductsData?.price - srProductsData?.csrd2) + (csqcpirce[0]?.S ?? 0));
  //           setCSQCPrice(showPrice)


  // },[cSQopt])

  // useEffect(() => {
  //   let mt = (mtPrice) 
  //   let dqc = (dqcPrice)
  //   let csqc = (csqcPrice)

  //   console.log("mt,dqc,csqc",mt,dqc,csqc)
  //   // console.log("in usee", (mtPrice === NaN ? 0 :mtPrice), (dqcPrice === NaN ? 0 : dqcPrice), (csqcPrice === NaN ? 0 : csqcPrice));
  //   // let gt = (gt === NaN ? 0 : gt);
  //   // setGrandTotal(gt)

  // },[mtPrice, dqcPrice, csqcPrice])


  let diaUpdatedPrice = () => {
    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'))

    if (daimondFilterData && daimondFilterData?.length && diaqcData?.T === 1) {

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

    if (colorStoneFilterData && colorStoneFilterData?.length && csData?.T === 1) {


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
  const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));


  console.log("fullprodData", fullProdData);

  useEffect(() => {
    let srProductsData = JSON.parse(localStorage.getItem('srProductsData'));
    const storeInit = JSON.parse(localStorage.getItem('storeInit'));
    setUkey(storeInit.ukey);
    let mtrd = fullProdData?.rd?.filter((ele) =>
      storeInit?.IsMetalCustomization === 1
        ?
        ele?.A === srProductsData?.autocode &&
        ele?.C === mtTypeOptionId
        :
        ele?.A === srProductsData?.autocode
    );

    console.log("mtrdData2222", mtrd)

    let showPrice = 0;
    if (mtrd && mtrd.length > 0) {
      showPrice = srProductsData?.price - ((srProductsData?.price - srProductsData?.metalrd) + (mtrd[0]?.Z ?? 0));
      setMtrdData(mtrd[0] ?? [])
      setMetalPrice(mtrd[0]?.Z ?? 0)
    }

    let diaqcprice = fullProdData?.rd1?.filter((ele) =>
      storeInit?.IsDiamondCustomization === 1
        ?
        ele.A == srProductsData?.autocode &&
        ele.G == diaQColOptId[0] &&
        ele.I == diaQColOptId[1]
        :
        ele.A == srProductsData?.autocode

    )

    console.log("diaQColOpt", diaqcprice);

    let showPrice1 = 0;
    if (diaqcprice && diaqcprice.length > 0) {
      showPrice1 = srProductsData?.price - ((srProductsData?.price - srProductsData?.diard1) + (diaqcprice[0]?.S ?? 0));
      let totalPrice = diaqcprice?.reduce((acc, obj) => acc + obj.S, 0)
      let diaRate = diaqcprice?.reduce((acc, obj) => acc + obj.O, 0)
      let diaSettRate = diaqcprice?.reduce((acc, obj) => acc + obj.Q, 0)

      setDqcRate(diaRate ?? 0)
      setDqcSettRate(diaSettRate ?? 0)
      setDqcData(totalPrice ?? 0)
      setDQCPrice(diaqcprice[0]?.S ?? 0)
      setDiaQcData(diaqcprice[0] ?? [])
    }

    let csqcpirce = fullProdData?.rd2?.filter((ele) =>
      storeInit?.IsCsCustomization === 1
        ?
        ele.A === srProductsData?.autocode &&
        ele.G === cSQoptId[0] &&
        ele.I === cSQoptId[1]
        // ele.H === cSQoptId[0] &&
        // ele.J === cSQoptId[1]
        :
        ele.A === srProductsData?.autocode

    );

    console.log("csqcpirce", csqcpirce)

    let showPrice2 = 0;
    if (csqcpirce && csqcpirce.length > 0) {
      showPrice2 = srProductsData?.price - ((srProductsData?.price - srProductsData?.csrd2) + (csqcpirce[0]?.S ?? 0));
      let totalPrice = csqcpirce?.reduce((acc, obj) => acc + obj.S, 0)
      let diaRate = csqcpirce?.reduce((acc, obj) => acc + obj.O, 0)
      let diaSettRate = csqcpirce?.reduce((acc, obj) => acc + obj.Q, 0)

      setCsqcData(totalPrice ?? 0)
      setCsqcRate(diaRate ?? 0)
      setCsqcSettRate(diaSettRate ?? 0)
      setCSQCPrice(csqcpirce[0]?.S ?? 0)
      setCsData(csqcpirce[0] ?? [])
    }

    let gt = showPrice + showPrice1 + showPrice2;
    setGrandTotal(gt ?? 0);

  }, [getPriceData, fullProdData, mtTypeOption, diaQColOpt, cSQopt, mtTypeOptionId, diaQColOptId, cSQoptId])


  useEffect(() => {
    if (mtrdData.U === 1) {
      handleColorSelection(productData?.MetalColorName)
    }
  }, [mtrdData])

  const handelLocalStorage = () => {
    handleColorSelection(mtrdData?.F);
    let localProductData = JSON.parse(localStorage.getItem('srProductsData'))
    setProductData(localProductData)
    getColorImagesData(localProductData.autocode);
    getTheImageSetImage(localProductData.autocode);
    setWishListFlag(localProductData?.wishCheck)
    setCartFlag(localProductData?.checkFlag)
    getSizeData(localProductData.autocode);
  }

  useEffect(() => {
    handelLocalStorage();
  }, [])

  const getTheImageSetImage = (autoCode) => {
    const storedData = localStorage.getItem('designsetlist');
    const jsonData = JSON.parse(storedData);
    const filteredData = jsonData.filter(item => item.autocode === autoCode);

    // console.log('filteredData', filteredData);

    if (filteredData.length > 0) {
      const num = filteredData[0].designsetuniqueno;
      const defaultImage = filteredData[0].DefaultImageName;

      setCompleteBackImage(defaultImage);
      setDesignUnicNo(num);
    }

  }

  useEffect(() => {
    const storedDataAll = localStorage.getItem('srProductsData');
    const data = JSON.parse(storedDataAll);
    setVideoUrl(data.videoName);


    let allProductData = JSON.parse(localStorage.getItem('allproductlist'))

    let designListData = productData?.SetDno?.split(",")

    let arrFinal = [];

    designListData?.filter((dld) => {

      let findData = allProductData?.find((ele) => ele.designno === dld)

      if (findData !== undefined) {
        arrFinal.push(findData)
      }
    })

    if (arrFinal) {
      setDesignSetList(arrFinal)
    } else {
      setDesignSetList([])
    }
  }, [productData])

  const getColorImagesData = (autoCode) => {
    const storedData = JSON.parse(localStorage.getItem('colorDataImages'));
    if (!storedData) {
      return;
    }
    const filteredData = storedData.filter(item => item.autocode === autoCode);
    setColorImageData(filteredData)
  }

  useEffect(() => {
  }, [colorImageData]);


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

  useEffect(() => {
    let localProductData = JSON.parse(localStorage.getItem('srProductsData'))
    const storedData3 = JSON.parse(localStorage.getItem('MetalColorData'));
    if (storedData3) {
      setMetalColorData(storedData3);
    }
    let uploadPath = localStorage.getItem('UploadLogicalPath');
    const storedDataAll = localStorage.getItem('storeInit');
    const data = JSON.parse(storedDataAll);
    setShowEcateDesign(data?.IsEcatDesignset);
    setIsProductCuFlag(data?.IsProductWebCustomization)

    const storedData = JSON.parse(localStorage.getItem('colorDataImages'));
    if (!storedData) {
      return;
    }
    const filteredDataN = storedData.filter(item => item.autocode === localProductData.autocode);

    let colorName = selectedColor ? selectedColor : storedData3[0]?.colorname;

    if (data.IsColorWiseImages === 1) {
      const filteredData = filteredDataN?.filter(item => item?.colorname?.toLowerCase() === colorName?.toLowerCase());
      console.log('filteredDatafilteredData', filteredData);


      if (filteredData.length > 0) {
        const correctedData = [];
        Promise.all(filteredData?.map(async (item) => {
          const imageUrl = uploadPath + '/' + data.ukey + convertPath(item.imagepath);
          const isAvailable = await checkImageAvailability(imageUrl);
          if (isAvailable) {
            correctedData.push({ ...item, imagepath: imageUrl });
          }
        })).then(() => {
          setUpdateColorImage(correctedData);
        });
      } else {
        setUpdateColorImage('');
      }
    }
  }, [selectedColor])

  const handleColorSelection = (color) => {
    setThumbImgMain('');
    const selectedColorObject = metalColorData.find(item => item.metalcolorname === color);
    setmtColorName(selectedColorObject?.colorname)
    let uploadPath = localStorage.getItem('UploadLogicalPath');
    const storedDataAll = localStorage.getItem('storeInit');
    const data = JSON.parse(storedDataAll);
    if (data?.IsColorWiseImages === 1) {
      const selectedColor = selectedColorObject?.colorname;
      setSelectedColor(selectedColor);
      const filteredData = colorImageData?.filter(item => item?.colorname.toLowerCase() === selectedColor?.toLowerCase());

      console.log('selectedColorDataselectedColorDataselectedColorData', filteredData);

      if (filteredData?.length > 0) {
        const correctedData = filteredData?.map(item => {
          console.log('item11', item);
          return {
            ...item,

            // globImagePath + productData?.DesignFolderName + '/' + imageSize?.ImgOr + '/' + productData?.DefaultImageName
            imagepath: globImagePath + productData?.DesignFolderName + '/' + imageSize?.ImgOr + '/' + convertPath(item.imagepath)
          };
        });
        setUpdateColorImage(correctedData);

        const selectedColorData = colorImageData?.find(item => item.colorname === selectedColor);


        if (selectedColorData) {
          const correctedImagePath = convertPath(selectedColorData.imagepath);
          let path = uploadPath + '/' + data.ukey + correctedImagePath
          setSelectedImagePath(path);
        } else {
          setSelectedImagePath('');
        }
      } else {
        setUpdateColorImage('');
      }
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {

    const storedDataAll = localStorage.getItem('storeInit');
    const data = JSON.parse(storedDataAll);
    setIsMetalCutoMizeFlag(data.IsMetalCustomization);
    setIsDaimondCstoFlag(data.IsDiamondCustomization)
    setIsCColrStoneCustFlag(data.IsCsCustomization)
    setIsPriceShow(data.IsPriceShow);

    const storedData = JSON.parse(localStorage.getItem('QualityColor'));
    if (storedData) {
      setColorData(storedData);
    }

    const storedData1 = JSON.parse(localStorage.getItem('ColorStoneQualityColor'));
    if (storedData1) {
      setDaimondQualityColor(storedData1);
    }

    const storedData2 = JSON.parse(localStorage.getItem('MetalTypeData'));
    if (storedData2) {
      setMetalType(storedData2);
    }

    const storedData3 = JSON.parse(localStorage.getItem('MetalColorData'));
    if (storedData3) {
      setMetalColorData(storedData3);
    }
  }, []);

  const getSizeData = async (autoCode) => {
    try {
      const storedEmail = localStorage.getItem('registerEmail') || '';
      const storeInit = JSON.parse(localStorage.getItem('storeInit'));
      const { FrontEnd_RegNo } = storeInit;

      const storedData = localStorage.getItem('loginUserDetail') || '0';
      const data = JSON.parse(storedData);
      const customerid = data?.id;
      let autoC = autoCode
      const combinedValue = JSON.stringify({
        autocode: `${autoC}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        "con": `{\"id\":\"\",\"mode\":\"CATEGORYSIZECOMBO\",\"appuserid\":\"${storedEmail}\"}`,
        "f": "index (getSizeData)",
        "p": encodedCombinedValue
      }
      const response = await CommonAPI(body);
      if (response.Data?.rd) {
        setSizeData(response.Data.rd)
        setGetAllFilterSizeData(response.Data.rd1)
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {

    }
  }

  const handelmainImg = () => {
    let filterImg = productData?.OriginalImagePath?.split(",").filter((ele, i) => {
      return i === thumbImg
    })

    return filterImg
  }

  const getCountFunc = async () => {

    await GetCount().then((res) => {
      if (res) {
        setCartCount(res.CountCart)
        setWishCount(res.WishCount)
      }
    })

  }

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

  useEffect(() => {
    let FilterWishData = WishData.filter(item => item?.autocode === productData?.autocode)
    if (FilterWishData?.length) {
      setWishListFlag(true)
    } else {
      setWishListFlag(false)
    }
  }, [WishData, productData])


  useEffect(() => {
    handelCart()
  }, [addToCartFlag])


  useEffect(() => {
    getCartAndWishListData()
  }, [])

  useEffect(() => {
    let FilterData = cartData.filter(item => item?.autocode === productData?.autocode)
    console.log("filterData1212", FilterData);
    if (FilterData?.length) {
      setAddToCartFlag(true)
    }
  }, [productData, cartData])

  const handelCart = async (event) => {

    try {

      if (addToCartFlag) {
        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        productData.checkFlag = addToCartFlag;
        localStorage.setItem("srProductsData", JSON.stringify(productData))
        const product = productData

        let isWishHasCartData = WishData?.filter((pd) => product.autocode === pd.autocode)

        let WishedData = isWishHasCartData.map((wcd) => wcd.autocode === product.autocode ? product : null)

        if (WishedData.length) {
          WishedData[0].checkFlag = true;
          WishedData[0].wishCheck = false;
          localStorage.setItem("srProductsData", JSON.stringify(WishedData[0]))
          handelLocalStorage()
        }

        let wishToCartEncData = { "autocodelist": `${productData?.autocode}`, "ischeckall": 0, "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}` }


        // const finalJSON = {
        //   "stockweb_event": "",
        //   "designno": `${product?.designno}`,
        //   "autocode": `${product?.autocode}`,
        //   "imgrandomno": `${product?.imgrandomno}`,
        //   "producttypeid": `${product?.Producttypeid}`,
        //   "metaltypeid": `${product?.MetalTypeid}`,
        //   "metalcolorid": `${product?.MetalColorid}`,
        //   "stockno": "",
        //   "DQuality": `${product?.diamondquality.split(",")[0]}`,
        //   "DColor": `${product?.diamondcolorname}`,
        //   "cmboMetalType": `${product?.MetalTypeName} ${product?.MetalPurity}`,
        //   "AdditionalValWt": Number(`${product?.AdditionalValWt}`),
        //   "BrandName": `${product?.BrandName ?? ""}`,
        //   "Brandid": Number(`${product?.Brandid}`),
        //   "CategoryName": `${product?.CategoryName}`,
        //   "Categoryid": Number(`${product?.Categoryid}`),
        //   "CenterStoneId": Number(`${product?.CenterStoneId}`),
        //   "CenterStonePieces": Number(`${product?.CenterStonePieces}`),
        //   "CollectionName": `${product?.CollectionName}`,
        //   "Collectionid": Number(`${product?.Collectionid}`),
        //   "ColorWiseRollOverImageName": `${product?.ColorWiseRollOverImageName}`,
        //   "DefaultImageName": `${product?.DefaultImageName}`,
        //   "DisplayOrder": Number(`${product?.DisplayOrder}`),
        //   "FrontEnd_OrderCnt": Number(`${product?.FrontEnd_OrderCnt}`),
        //   "GenderName": `${product?.GenderName}`,
        //   "Genderid": Number(`${product?.Genderid}`),
        //   "Grossweight": Number(`${product?.Grossweight}`),
        //   "InReadyStockCnt": Number(`${product?.InReadyStockCnt}`),
        //   "IsBestSeller": Number(`${product?.IsBestSeller}`),
        //   "IsColorWiseImageExists": `${product?.IsColorWiseImageExists ?? 0}`,
        //   "IsInReadyStock": Number(`${product?.IsInReadyStock}`),
        //   "IsNewArrival": `${product?.IsNewArrival}`,
        //   "IsRollOverColorWiseImageExists": `${product?.IsRollOverColorWiseImageExists}`,
        //   "IsTrending": Number(`${product?.IsTrending}`),
        //   "MasterManagement_labid": Number(`${product?.MasterManagement_labid}`),
        //   "MasterManagement_labname": "",
        //   "MetalColorName": `${product?.MetalColorName}`,
        //   "MetalColorid": Number(`${product?.MetalColorid}`),
        //   "MetalPurity": `${product?.MetalPurity}`,
        //   "MetalPurityid": Number(`${product?.MetalTypeid}`),
        //   "MetalTypeName": `${product?.MetalTypeName}`,
        //   "MetalTypeid": Number(`${product?.IsInReadyStock}`),
        //   "MetalWeight": Number(`${product?.MetalWeight}`),
        //   "OcassionName": `${product?.OcassionName ?? ""}`,
        //   "Ocassionid": Number(`${product?.Ocassionid}`),
        //   "ProducttypeName": `${product?.ProducttypeName}`,
        //   "Producttypeid": Number(`${product?.Producttypeid}`),
        //   "RollOverImageName": `${product?.RollOverImageName}`,
        //   "SubCategoryName": `${product?.SubCategoryName ?? ""}`,
        //   "SubCategoryid": Number(`${product?.SubCategoryid}`),
        //   "ThemeName": `${product?.ThemeName ?? ""}`,
        //   "Themeid": Number(`${product?.Themeid}`),
        //   "TitleLine": `${product?.TitleLine}`,
        //   "UnitCost": Number(`${product?.UnitCost}`),
        //   "UnitCostWithmarkup": Number(`${product?.UnitCostWithmarkup}`),
        //   "colorstonecolorname": `${product?.colorstonecolorname}`,
        //   "colorstonequality": `${product?.colorstonequality}`,
        //   "diamondcolorname": `${product?.diamondcolorname}`,
        //   "diamondpcs": Number(`${product?.diamondpcs}`),
        //   "diamondquality": `${product?.diamondquality.split(",")[0]}`,
        //   "diamondsetting": `${product?.diamondsetting}`,
        //   "diamondshape": `${product?.diamondshape}`,
        //   "diamondweight": Number(`${product?.diamondweight}`),
        //   "encrypted_designno": `${product?.encrypted_designno}`,
        //   "hashtagid": `${product?.hashtagid}`,
        //   "hashtagname": `${product?.hashtagname}`,
        //   "imagepath": `${product?.imagepath}`,
        //   "mediumimage": `${product?.mediumimage ?? ""}`,
        //   "originalimage": `${product?.originalimage}`,
        //   "storyline_html": `${product?.storyline_html}`,
        //   "storyline_video": `${product?.storyline_video}`,
        //   "thumbimage": `${product?.thumbimage}`,
        //   "totaladditionalvalueweight": Number(`${product?.totaladditionalvalueweight}`),
        //   "totalcolorstoneweight": Number(`${product?.totalcolorstoneweight}`),
        //   "totaldiamondweight": Number(`${product?.totaldiamondweight}`),
        //   "updatedate": `${product?.updatedate}`,
        //   "videoname": `${product?.videoname ?? ""}`,
        //   "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
        //   "Customerid": `${Customer_id?.id}`,
        //   "PriceMastersetid": `${product?.PriceMastersetid ?? ""}`,
        //   "quantity": `${product?.quantity ?? "1"}`
        // }

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
          "cmboMetalType": `${mtPurity ?? ""}`,
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
          "MetalColorName": `${selectedColor ?? product?.updMC}`,
          "MetalColorid": Number(`${product?.MetalColorid}`),
          "MetalPurity": `${mtPurity.split(" ")[1]}`,
          "MetalPurityid": Number(`${findMetalTypeId(mtPurity)[0]?.Metalid ?? 0}`),
          "MetalTypeName": `${mtPurity.split(" ")[0]}`,
          "MetalTypeid": Number(`${product?.MetalTypeid ?? 0}`),
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
          "UnitCost": Number(`${PriceWithMarkupFunction(0, product?.price, currData?.CurrencyRate, sizeWisePrice)}`),
          "UnitCostWithmarkup": Number(`${PriceWithMarkupFunction(product?.markup, product?.price, currData?.CurrencyRate, sizeWisePrice)}`),
          "colorstonecolorname": `${cSQopt?.split('-')[1] ?? ""}`,
          "colorstonequality": `${cSQopt?.split('-')[0] ?? ""}`,
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
          "detail_ringsize": `${catSizeData?.sizename ?? catSizeData?.sizename}`,
          "ProjMode": `${product?.ProjMode ?? ""}`,
          "AlbumMasterid": Number(`${product?.AlbumMasterid ?? 0}`),
          "AlbumMastername": `${product?.AlbumMastername ?? ""}`,
          "Albumcode": `${product?.Albumcode ?? ""}`,
          "Designid": Number(`${product?.Designid ?? 0}`)
        }

        console.log("addtocartflag", finalJSON)


        const encodedCombinedValue = btoa(JSON.stringify(finalJSON));
        const wishToCartEncData1 = btoa(JSON.stringify(wishToCartEncData));
        const body = {
          con: `{\"id\":\"\",\"mode\":\"ADDTOCART\",\"appuserid\":\"${UserEmail}\"}`,
          f: "AddToCartIconClick (ADDTOCART)",
          p: encodedCombinedValue,
        };

        let body1 = {
          con: `{\"id\":\"Store\",\"mode\":\"addwishlisttocart\",\"appuserid\":\"${UserEmail}\"}`,
          f: "iconclick (addwishlisttocart)",
          p: wishToCartEncData1
        }

        await CommonAPI(isWishHasCartData.length ? body1 : body).then(async (res) => {
          if (!isWishHasCartData.length && res?.Data?.rd[0]?.msg === "success") {
            await getCartAndWishListData()
            getCountFunc()
          }

          if (isWishHasCartData.length && res?.Data?.rd[0]?.stat_msg === "success") {
            await getCartAndWishListData()
            getCountFunc()
          }
        })

      }
      else {
        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        productData.wishCheck = false;
        localStorage.setItem("srProductsData", JSON.stringify(productData))

        let prod = productData

        let Data = { "designno": `${prod?.designno}`, "autocode": `${prod?.autocode}`, "metalcolorid": 0, "isSolStockNo": 0, "is_show_stock_website": "0", "isdelete_all": 0, "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}`, "cartidlist": "" }

        let encodedCombinedValue = btoa(JSON.stringify(Data))
        const body = {
          con: `{\"id\":\"\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${UserEmail}\"}`,
          f: "RemoveFromCartIconClick (removeFromCartList)",
          p: encodedCombinedValue,
        }

        await CommonAPI(body).then(async (res) => {
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

  let sizeWisePrice = ((sizeMarkup ?? 0) / (currData?.CurrencyRate) ?? 0)

  const handelWishList = async (event) => {

    try {
      setWishListFlag(event.target.checked)

      if (event.target.checked === true) {

        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));

        productData.wishCheck = event.target.checked;
        // setWishListFlag(e.target.checked)
        localStorage.setItem("srProductsData", JSON.stringify(productData))

        const product = productData



        const finalJSON = {
          "stockweb_event": "",
          "Mastermanagement_CategorySize": "",
          "sizeamountpersentage": "",
          "stockno": "",
          "is_show_stock_website": "0",
          "cmboDiaQualityColor": `${diaQColOpt?.split("#") ?? ""}`,
          "cmboMetalType": `${mtPurity}`,
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
          "MetalColorName": `${selectedColor ?? product?.updMC}`,
          "MetalColorid": Number(`${product?.MetalColorid}`),
          "MetalPurity": `${mtPurity.split(" ")[1]}`,
          "MetalPurityid": Number(`${findMetalTypeId(mtPurity)[0]?.Metalid ?? 0}`),
          "MetalTypeName": `${mtPurity.split(" ")[0]}`,
          "MetalTypeid": Number(`${product?.MetalTypeid ?? 0}`),
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
          "UnitCost": Number(`${PriceWithMarkupFunction(0, product?.price, currData?.CurrencyRate, sizeWisePrice)}`),
          "UnitCostWithmarkup": Number(`${PriceWithMarkupFunction(product?.markup, product?.price, currData?.CurrencyRate, sizeWisePrice)}`),
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

        console.log("event", event?.target.checked)
        await CommonAPI(body).then(async (res) => {


          if (res?.Data?.rd[0]?.msg === "success") {


            await getCartAndWishListData()
            // await getCountApi()
            getCountFunc()

          }
        })
      }
      else {
        // {"designlist":"'MCJ10'","isselectall":"0","FrontEnd_RegNo":"95oztttesi0o50vr","Customerid":"856"}


        const storeInit = JSON.parse(localStorage.getItem("storeInit"))
        const UserEmail = localStorage.getItem("registerEmail")
        const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail"));


        let Data = { "designlist": `'${productData?.designno}'`, "isselectall": "0", "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id}` }

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

  const handelSize = (data) => {

    // console.log("data",data)

    const selectedSize = sizeData.find((size) => size.sizename === data)
    if (selectedSize) {
      setSizeMarkup(selectedSize?.MarkUp)
      setCatSizeData(selectedSize)
    }
    setSizeOption(data)
    const filteredData = getAllFilterSizeData?.filter(item => item.sizename === data)
    const filteredDataMetal = filteredData?.filter(item => item.DiamondStoneTypeName === "METAL")
    const filteredDataDaimond = filteredData?.filter(item => item.DiamondStoneTypeName === "DIAMOND")
    const filteredDataColorStone = filteredData?.filter(item => item.DiamondStoneTypeName === "COLOR STONE")
    const filteredDataFinding = filteredData?.filter(item => item.DiamondStoneTypeName === "FINDING")
    console.log("getAllFilterSizeData", getAllFilterSizeData)
    setMetalFilterData(filteredDataMetal)
    setDaimondFiletrData(filteredDataDaimond)
    setColorStoneFiletrData(filteredDataColorStone)
    setFindingFiletrData(filteredDataFinding)
  }


  const handelDesignSet = (ele) => {
    localStorage.setItem("srProductsData", JSON.stringify(ele))
    // navigate(window.location.pathname)
    handelLocalStorage()
    setThumFlag(true);
    window.scrollTo(0, 0)
  }


  // console.log('prodddddddddddd', updatedColorImage);
  // console.log('DefaultSizeDefaultSizeDefaultSize', productData?.DefaultSize);
  // console.log('DefaultSizeDefaultSizeDefaultlengthlength', productData?.DefaultSize.length);

  // console.log('daimondFilterDatadaimondFilterData', daimondFilterData);
  // // console.log("metalFilterData", metalFilterData)
  // // console.log("daimondFilterData", daimondFilterData)
  // // console.log('lastPrice', { "unitcost": productData?.UnitCost ?? 0, "mtrdPrice": mtrdData, "dqcDataPrice": dqcData?.S ?? 0, "csqcData": csqcData?.S ?? 0, sizeMarkup, "metalupdatePrice": metalUpdatedPrice(), "diaUpdatedPrice": diaUpdatedPrice(), "colUpdatedPrice": colUpdatedPrice() })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleClick = () => {
    setIsVideoPlaying(true);
  };

  useEffect(() => {

    let srData = JSON.parse(localStorage.getItem("srProductsData"))
    let price = ((((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)) + (dqcData ?? 0) + (csqcData ?? 0) + (sizeMarkup ?? 0) + (metalUpdatedPrice() ?? 0) + (diaUpdatedPrice() ?? 0) + (colUpdatedPrice() ?? 0))
    //((mtrdData?.V/currData[0]?.CurrencyRate ?? 0) + mtrdData?.W ?? 0)
    if (price) {
      srData.price = Number(price)
    }

    localStorage.setItem("srProductsData", JSON.stringify(srData))

  }, [mtrdData, dqcData, csqcData, sizeMarkup, metalUpdatedPrice, diaUpdatedPrice, colUpdatedPrice])

  // console.log("pricedata", (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)), dqcData, csqcData, sizeMarkup, metalUpdatedPrice(), diaUpdatedPrice(), colUpdatedPrice())
  // console.log("pricedatacv", ((((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)) +
  //   (dqcData ?? 0) +
  //   (csqcData ?? 0) +
  //   (sizeMarkup ?? 0) +
  //   (metalUpdatedPrice() ?? 0) +
  //   (diaUpdatedPrice() ?? 0) +
  //   (colUpdatedPrice() ?? 0)))

  // console.log("currData?.CurrencyRate", currData?.CurrencyRate)

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const PriceWithMarkupFunction = (pmu, pPrice, curr, swp = 0) => {
    // console.log("pricewithmarkup", pmu, pPrice)
    if (pPrice <= 0) {
      return 0
    }
    else if (pmu <= 0) {
      return (pPrice + swp).toFixed(2)
    }
    else {
      let percentPMU = ((pmu / 100) / curr)
      return (Number(pPrice * percentPMU ?? 0) + Number(pPrice ?? 0) + (swp ?? 0)).toFixed(2)
    }
  }

  useEffect(() => {
    FinalPrice()
  }, [catSizeData, mtrdData, dqcData, currData, csqcData, sizeMarkup, metalUpdatedPrice, diaUpdatedPrice, colUpdatedPrice])

  function FinalPrice() {
    if (catSizeData?.IsMarkUpInAmount == 1) {
      let designMarkUp = (mtrdData?.AB ?? 0)
      let sizeWisePrice = ((sizeMarkup ?? 0) / (currData?.CurrencyRate))
      let IsAmountPrice = (
        (((mtrdData?.V ?? 0) / currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0)) +
        (dqcData ?? 0) +
        (csqcData ?? 0) +
        (metalUpdatedPrice() ?? 0) +
        (diaUpdatedPrice() ?? 0) +
        (colUpdatedPrice() ?? 0)
      )
      return PriceWithMarkupFunction(designMarkUp, IsAmountPrice, currData?.CurrencyRate, sizeWisePrice)
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
      )
      // console.log("finalPrice", CalcPrice, percentMarkupPlus);
      return PriceWithMarkupFunction(percentMarkupPlus, CalcPrice, currData?.CurrencyRate)
    }
  }


  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem('storeInit'))
    if (storeInit) {
      // setGlobImagepath(storeInit?.DesignImageFol)
      // setProdPageSize(storeInit?.PageSize)
      setStoreInitData(storeInit)
    }
  }, [])


  // useEffect(async() =>{

  //   let url = (globImagePath + productData?.DesignFolderName + '/' + imageSize?.ImgOr + '/' + (thumbImg?.length ? thumbImg : productData?.DefaultImageName));
  //   const isAvailable = await checkImageAvailability(url);

  //   console.log('isAvailableisAvailable', isAvailable);
  // },[])

  console.log("productThumImgproductThumImg", productThumImg)

  return (
    <div
      className='paddingTopMobileSet'
      style={{
        // backgroundColor: "#c0bbb1",
        // height: "100%",
        // width: "100%",
        // paddingTop: "110px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="prodDetailWhitecont">
          <div className="product-detail-container">
            <div className="srprodetail1">
              {/* {!imgLoading */}

              {/* // src={
                  //   (productData?.OriginalImagePath) ?
                  //     updatedColorImage?.length !== 0 ?
                  //       updatedColorImage[0]?.imagepath
                  //       :
                  //       (
                  //         selectedImagePath == '' ?
                  //           globImagePath + productData?.DesignFolderName + '/' + imageSize?.ImgOr + '/' + (!handelmainImg()?.length ? productData?.ImageName?.split(",")[0]
                  //             :
                  //             handelmainImg()
                  //           )
                  //           :
                  //           selectedImagePath)
                  //     :
                  //     notFound
                  // } */}

              {imgLoading && (
                <>
                <Skeleton
                  sx={{
                    width: "100%",
                    height: "400px",
                  }}
                  variant="rounded"
                />
                </>

              )}
              {isVideoPlaying ?
                <video src={videoUrl} autoPlay={true} style={{
                  width: "100%",
                  zindex: -1,
                  position: "relative",
                  objectFit: "cover",
                  padding: '10%',
                  marginLeft: "51px",
                  display: imgLoading ? "none" : "block",
                }} />
                :
                <img
                  src={
                    thumbImgMain?.length === 0 ?
                      updatedColorImage?.length !== 0 ?
                        updatedColorImage[0]?.imagepath :
                        globImagePath + productData?.DesignFolderName + '/' + imageSize?.ImgOr + '/' + (thumbImg?.length ? thumbImg : productData?.DefaultImageName)
                      :
                      thumbImgMain
                  }
                  alt={""}
                  style={{
                    width: "100%",
                    zindex: -1,
                    position: "relative",
                    objectFit: "cover",
                    marginLeft: "51px",
                    display: imgLoading ? "none" : "block",
                  }}
                  className='smilingDeatilPageMainImage'
                  onLoad={handelImgLoad}
                />
              }
              {updatedColorImage?.length === 0 ?
                <>
                  {productThumImg &&
                    <div className="srthumb_images">
                      {productThumImg.map((data, i) => (
                        <img
                          src={data?.imagepath}
                          alt={""}
                          className="srthumb_images_el"
                          // onClick={() => console.log('data....',(data?.imagepath)?.split('/')[(data?.imagepath)?.split('/').length-1])}
                          onClick={() => setThumbImg((data?.imagepath)?.split('/')[(data?.imagepath)?.split('/').length - 1])}

                        />

                      ))}

                    </div>}
                </>
                :
                <div>
                  {
                    <div className="srthumb_images">
                      {updatedColorImage?.map((data, i) => (
                        <img
                          src={data.imagepath}
                          alt={""}
                          className="srthumb_images_el"
                          onClick={() => setThumbImgMain(data.imagepath)}
                        // onClick={() => { setSelectedImagePath(data.imagepath); setIsVideoPlaying(false); }}
                        // onClick={() => setThumbImg(data.imagepath)}
                        />
                      ))}

                      {
                        videoUrl && (
                          <div style={{ position: 'relative' }} onClick={handleClick}>
                            <video src={videoUrl} autoPlay={false} className="srthumb_images_el" style={{ position: 'absolute' }} />
                            <IoIosPlayCircle className="srthumb_images_el" style={{ position: 'absolute', height: '45px', top: '10px', border: 'none' }} />
                          </div>
                        )
                      }
                    </div>
                  }
                </div>
              }

            </div>
            <div className="srprodetail2">
              <div className="srprodetail2-cont">
                <p className='smilingProdutDetltTitle'>
                  {productData?.TitleLine}
                </p>

                <p style={{ color: "#7d7f85", fontSize: "14px" }}>
                  {/* Slip this open Drizzle Ring from Smiling Rock's iconic
                  collection- Drizzle. It’s an exquisite ring with diamonds all
                  around the ring. The ring creates a wide space to decorate
                  your fingers as much as possible! Featured in lab grown
                  diamonds set in 14K gold, this ring is perfect for your best
                  times. */}
                  {productData?.description}
                </p>

                <div
                  className="part-container"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "1px solid #e1e1e1",
                    paddingBottom: "12px",
                  }}
                >
                  <div
                    className="part1"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        letterSpacing: '2px',
                        color: "rgb(125, 127, 133)",
                      }}
                      className="productDeailFont"
                    >
                      {productData?.designno}
                    </span>
                    <span
                      style={{
                        fontSize: "16px",
                        color: "rgb(125, 127, 133)",
                      }}
                      className="productDeailFont"

                    >
                      Metal Purity :
                      <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>
                        <>
                          {console.log('mtTypeOptionId', mtTypeOptionId)}
                          {mtPurity ? mtPurity : mtTypeOption ? mtTypeOption?.split(" ")[1] : productData?.MetalPurity}
                        </>
                      </span>
                    </span>
                    <sapn
                      style={{
                        fontSize: "16px",
                        color: "rgb(125, 127, 133)",
                      }}
                      className="productDeailFont"

                    >
                      Metal Color : <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>{mtColorName ? mtColorName : selectedColor ? selectedColor : productData?.updMC}</span>
                    </sapn>
                    <sapn
                      style={{
                        fontSize: "16px",
                        color: "rgb(125, 127, 133)",
                      }}
                      className="productDeailFont"

                    >
                      Diamond Quality Color:{" "}
                      <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>{diaQColOpt ? diaQColOpt : `${productData?.diamondquality}-${productData?.diamondcolorname}`}</span>
                    </sapn>
                    <sapn
                      style={{
                        fontSize: "16px",
                        color: "rgb(125, 127, 133)",
                      }}
                      className="productDeailFont"
                    >
                      Net Wt:{" "}
                      <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>{mtrdData?.I}</span>
                    </sapn>
                  </div>
                  {/* {productData?.IsColorWiseImageExists !== null && (
                    <div
                      style={{ display: "flex", gap: "5px" }}
                      className="part2"
                    >
                      <div
                        style={{
                          border: "1px solid #c8c8c8",
                          borderRadius: "50%",
                        }}
                      >
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#c8c8c8",
                            borderRadius: "50%",
                            margin: "1px",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          border: "1px solid #ffcfbc",
                          borderRadius: "50%",
                        }}
                      >
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#ffcfbc",
                            borderRadius: "50%",
                            margin: "1px",
                          }}
                        ></div>
                      </div>
                      <div
                        style={{
                          border: "1px solid #e0be77",
                          borderRadius: "50%",
                        }}
                      >
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: "#e0be77",
                            borderRadius: "50%",
                            margin: "1px",
                          }}
                        ></div>
                      </div>
                    </div>
                  )} */}

                </div>
                {isProductCuFlag === 1 && <div
                  style={{ display: "flex", flexWrap: 'wrap', width: "100%", marginTop: "12px" }}
                  className="CustomiZationDeatilPageWeb"
                >

                  {isMetalCutoMizeFlag == 1 && <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: '95%',
                      marginBottom: '15px',
                      gap: '5px'
                    }}
                  >
                    <label className='menuItemTimeEleveDeatil'>
                      METAL TYPE:
                    </label>
                    {mtrdData.U === 1 ?
                      <span style={{ fontSize: "13px", color: "rgb(66, 66, 66)" }}>
                        {/* {`${productData.MetalPurity} ${productData.MetalTypeName}`} */}
                        {mtPurity ? mtPurity : mtTypeOption ? mtTypeOption?.split(" ")[1] : productData?.MetalPurity}
                      </span>
                      :
                      <select
                        className='menuitemSelectoreMain'
                        value={mtTypeOption}
                        onChange={(e) => {
                          let findMTtypeID = findMetalTypeId(e.target.value)[0]?.Metalid
                          console.log("findMTtypeID", findMTtypeID);
                          { setmtTypeOptionId(findMTtypeID); setmtPurity(e.target.value); setmtTypeOption(e.target.value) }
                        }}
                      >
                        {metalType.map((data, index) => (
                          <option key={index} value={data.metalType}>
                            {data.metaltype}
                          </option>
                        ))}
                      </select>}
                  </div>}


                  {isMetalCutoMizeFlag == 1 &&
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: '95%',
                        marginBottom: '15px',
                        paddingTop: '10px',
                        gap: '5px',
                        borderTop: '1px solid rgba(66, 66, 66, 0.2)'
                      }}
                    >
                      <label className='menuItemTimeEleveDeatil'>
                        METAL COLOR:
                      </label>
                      {mtrdData.U === 1 ?
                        <span style={{ fontSize: "12.5px", color: "#7d7f85" }}>
                          {/* {productData.MetalColorName} */}
                          {mtColorName ? mtColorName : selectedColor ? selectedColor : productData?.updMC}
                        </span>
                        :
                        <select
                          className='menuitemSelectoreMain'
                          defaultValue={mtrdData?.F}
                          onChange={(e) => handleColorSelection(e.target.value)}
                        >
                          {metalColorData.map((colorItem) => (
                            <option key={colorItem.ColorId} value={colorItem.metalcolorname}>
                              {colorItem.metalcolorname}
                            </option>
                          ))}
                        </select>}
                    </div>}


                  {((isDaimondCstoFlag == 1) && (productData?.diamondweight !== 0 || productData?.diamondpcs !== 0)) && <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: '95%',
                      paddingTop: '10px',
                      marginBottom: '15px',
                      gap: '5px',
                      borderTop: '1px solid rgba(66, 66, 66, 0.2)'

                    }}
                  >
                    <label className='menuItemTimeEleveDeatil'>
                      DAIMOND :
                    </label>
                    {mtrdData?.U === 1 ?
                      <span style={{ fontSize: "12.5px", color: "#7d7f85" }}>
                        {diaQColOpt ? diaQColOpt : `${productData?.diamondquality}-${productData?.diamondcolorname}`}
                      </span>
                      :
                      <select
                        className='menuitemSelectoreMain'
                        value={diaQColOpt}
                        onChange={(e) => {
                          let findDCqc = findDiaQcId(e.target.value);
                          // console.log("findDCqc", findDCqc);
                          setDiaQColOpt(e.target.value);
                          setDiaQColOptId([findDCqc[0]?.QualityId, findDCqc[0]?.ColorId])
                        }}
                      >
                        {colorData?.map((colorItem) => (
                          <option key={colorItem.ColorId} value={`${colorItem.Quality}#${colorItem.color}`}>
                            {`${colorItem.Quality}#${colorItem.color}`}
                          </option>
                        ))}
                      </select>}
                  </div>}

                  {isCColrStoneCustFlag === 1 &&
                    (productData?.totalcolorstonepcs !== 0 ||
                      productData?.totalcolorstoneweight !== 0) && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: '95%',
                          marginBottom: '15px',
                          paddingTop: '10px',
                          gap: '5px',
                          borderTop: '1px solid rgba(66, 66, 66, 0.2)'

                        }}
                      >
                        <label className='menuItemTimeEleveDeatil'>
                          COLOR STONE:
                        </label>
                        {mtrdData.U === 1 ? (
                          <span
                            style={{ fontSize: "12.5px", color: "#7d7f85" }}
                          >
                            {cSQopt ? cSQopt : `${productData.colorstonequality}-${productData?.colorstonecolorname}`}
                          </span>
                        ) : (
                          <select
                            className='menuitemSelectoreMain'
                            onChange={(e) => {
                              let fincsqc = findCsQcId(e.target.value);
                              setCSQOpt(e.target.value)
                              setCSQOptId([fincsqc[0]?.QualityId, fincsqc[0]?.ColorId])
                            }}
                            value={cSQopt}
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
                        )}
                      </div>
                    )
                  }

                  {(sizeData?.length !== 0 || (productData?.DefaultSize && productData.DefaultSize.length !== 0)) && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: '95%',
                        marginBottom: '15px',
                        paddingTop: '10px',
                        gap: '5px',
                        borderTop: '1px solid rgba(66, 66, 66, 0.2)'
                      }}
                    >
                      <label className='menuItemTimeEleveDeatil'>
                        SIZE:
                      </label>
                      <select
                        className='menuitemSelectoreMain'
                        onChange={(e) => handelSize(e.target.value)}
                        defaultValue={
                          productData && productData.DefaultSize
                            ? productData.DefaultSize
                            : sizeData.find((size) => size.IsDefaultSize === 1)?.id
                        }
                      >
                        {sizeData?.map((size) => (
                          <option
                            key={size.id}
                            value={size.sizename} // Pass sizename as value
                            selected={
                              productData && productData.DefaultSize === size.sizename
                            }
                          >
                            {size.sizename}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                </div>}

                {isProductCuFlag === 1 && <div
                  style={{ width: "100%", marginTop: "12px" }}
                  className="CustomiZationDeatilPageMobile"
                >

                  {isMetalCutoMizeFlag == 1 && <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: '20px'

                    }}
                  >
                    <label style={{ fontSize: "12.5px", color: "#7d7f85" }}>
                      METAL TYPE:
                    </label>
                    <select
                      style={{
                        border: "none",
                        outline: "none",
                        color: "#7d7f85",
                        fontSize: "12.5px",
                        height: '30px',
                        backgroundColor: 'rgb(244, 244, 244)'
                      }}
                      value={mtTypeOption}
                      onChange={(e) => setmtTypeOption(e.target.value)}
                    >
                      {metalType.map((data, index) => (
                        <option key={index} value={data.metalType}>
                          {data.metaltype}
                        </option>
                      ))}
                    </select>
                    <Divider sx={{
                      marginTop: '20px', background: '#a9a7a7',
                      marginTop: '20px'
                    }} />
                  </div>}

                  {isMetalCutoMizeFlag == 1 &&
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: '20px'

                      }}
                    >
                      <label style={{ fontSize: "12.5px", color: "#7d7f85" }}>
                        METAL COLOR:
                      </label>
                      <select
                        style={{
                          border: "none",
                          outline: "none",
                          color: "#7d7f85",
                          fontSize: "12.5px",  
                          height: '30px',
                          backgroundColor: 'rgb(244, 244, 244)'
                        }}
                        onChange={(e) => handleColorSelection(e.target.value)}
                        defaultValue={mtrdData?.F}
                      >
                        {metalColorData.map((colorItem) => (
                          <option key={colorItem.ColorId} value={colorItem.metalcolorname}>
                            {colorItem.metalcolorname}
                          </option>
                        ))}
                      </select>

                      <Divider sx={{
                        marginTop: '20px', background: '#a9a7a7',
                        marginTop: '20px'
                      }} />
                    </div>}

                  {((isDaimondCstoFlag == 1) && (productData?.diamondweight !== 0 || productData?.diamondpcs !== 0)) && <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: '20px'
                    }}
                  >
                    <label style={{ fontSize: "12.5px", color: "#7d7f85" }}>
                      DAIMOND :
                    </label>
                    <select
                      style={{
                        border: "none",
                        outline: "none",
                        color: "#7d7f85",
                        fontSize: "12.5px",
                        height: '30px',
                        backgroundColor: 'rgb(244, 244, 244)'
                      }}
                      value={diaQColOpt}
                      onChange={(e) => setDiaQColOpt(e.target.value)}
                    >
                      {colorData?.map((colorItem) => (
                        <option key={colorItem.ColorId} value={`${colorItem.Quality}#${colorItem.color}`}>
                          {`${colorItem.Quality}#${colorItem.color}`}
                        </option>
                      ))}
                    </select>

                    <Divider sx={{
                      marginTop: '20px', background: '#a9a7a7',
                      marginTop: '20px'
                    }} />
                  </div>}

                  {((isCColrStoneCustFlag === 1) && (productData?.totalcolorstonepcs !== 0 || productData?.totalcolorstoneweight !== 0)) &&
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: '20px'
                      }}
                    >
                      <label style={{ fontSize: "12.5px", color: "#7d7f85" }}>
                        COLOR STONE:
                      </label>
                      <select
                        style={{
                          border: "none",
                          outline: "none",
                          color: "#7d7f85",
                          height: '30px',
                          backgroundColor: 'rgb(244, 244, 244)',
                          fontSize: "12.5px",
                        }}
                        onChange={(e) => setCSQOpt(e.target.value)}
                        value={cSQopt}
                      >
                        {DaimondQualityColor.map((data, index) => (
                          <option key={index} value={`${data.Quality}-${data.color}`} >
                            {`${data.Quality}-${data.color}`}
                          </option>
                        ))}
                      </select>

                      <Divider sx={{
                        marginTop: '20px', background: '#a9a7a7',
                        marginTop: '20px'
                      }} />

                    </div>}



                  {(sizeData?.length !== 0 || (productData?.DefaultSize && productData.DefaultSize.length !== 0)) && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: '20px'
                      }}
                    >
                      <label style={{ fontSize: "12.5px", color: "#7d7f85" }}>
                        SIZE:
                      </label>
                      <select
                        style={{
                          border: "none",
                          outline: "none",
                          color: "#7d7f85",
                          fontSize: "12.5px",
                          height: '30px',
                          backgroundColor: 'rgb(244, 244, 244)'
                        }}
                        onChange={(e) => handelSize(e.target.value)}
                        defaultValue={
                          productData && productData.DefaultSize
                            ? productData.DefaultSize
                            : sizeData.find((size) => size.IsDefaultSize === 1)?.id
                        }
                      >
                        {sizeData?.map((size) => (
                          <option
                            key={size.id}
                            value={size.sizename} // Pass sizename as value
                            selected={
                              productData && productData.DefaultSize === size.sizename
                            }
                          >
                            {size.sizename}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <Divider sx={{
                    marginTop: '20px', background: '#a9a7a7',
                    marginTop: '20px'
                  }} />

                </div>}

                {isPriseShow == 1 && (
                  <div style={{ marginTop: "23px" }}>
                    <p style={{ color: "#7d7f85", fontSize: "14px", display: 'flex' }}>
                      {/* Price: <span style={{ fontWeight: '500', fontSize: '16px' }}>{currencySymbol?.Currencysymbol}{`${(productData?.price - grandTotal) === 0 ? "Not Availabel" : (productData?.price - grandTotal)?.toFixed(2)}`}</span> */}
                      {/* Price: <span style={{ fontWeight: '500', fontSize: '16px' }}>{currencySymbol?.Currencysymbol}{`${productData?.UnitCost + (productData?.price - grandTotal)?.toFixed(2)}`}</span> */}
                      {/* Price:{" "} */}
                      <span className='mainpriceDeatilPage'>
                        <div dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />
                        {mtrdData?.U === 1 ? mtrdData?.Z : FinalPrice()}
                        {/* {`${(
                          (((mtrdData?.V ?? 0)/currData?.CurrencyRate) + (mtrdData?.W ?? 0) + (mtrdData?.X ?? 0))+
                          (dqcData ?? 0) +
                          (csqcData ?? 0) +
                          (sizeMarkup ?? 0) +
                          (metalUpdatedPrice() ?? 0) +
                          (diaUpdatedPrice() ?? 0) +
                          (colUpdatedPrice() ?? 0)
                        ).toFixed(2)}`} */}
                      </span>
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className='addtocartcont' onClick={() => setAddToCartFlag(!addToCartFlag)}>
                    <span className='addtocarttxt'>
                      {addToCartFlag ? "REMOVE FROM CART" : "ADD TO CART"}
                    </span>
                  </div>

                  <div className='wishlistcont'>
                    <Checkbox
                      icon={
                        <StarBorderIcon
                          sx={{ fontSize: "25px", color: "#d2815f" }}
                        />
                      }
                      checkedIcon={
                        <StarIcon sx={{ fontSize: "25px", color: "#d2815f" }} />
                      }
                      disableRipple={true}
                      checked={WishListFlag}
                      onChange={(e) => handelWishList(e)}
                    />
                  </div>
                </div>

                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={
                        "https://smilingrocks.com/cdn/shop/files/BM_Logo_v02_small.png?v=1659083102"
                      }
                      alt={""}
                      style={{ width: "48px" }}
                    />
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#7f7d85",
                      }}
                    >
                      {" "}
                      Certified Sustainable Brand
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={
                        "https://smilingrocks.com/cdn/shop/files/Frame_1_b70eff1d-e385-41c6-bf21-8cc1b7f0d15d_small.png?v=1613696587"
                      }
                      alt={""}
                      style={{ width: "48px" }}
                    />
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#7f7d85",
                      }}
                    >
                      Lifetime Warranty
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      src={
                        "https://smilingrocks.com/cdn/shop/files/Frame_4_4bb99b96-ffc8-4d77-bf9a-62257c771ff1_small.png?v=1613696586"
                      }
                      alt={""}
                      style={{ width: "48px" }}
                    />
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "12px",
                        color: "#7f7d85",
                      }}
                    >
                      24 Hours Customer Service
                    </p>
                  </div>
                </div>

                <div style={{ fontSize: "12.5px", color: "#7f7d85" }}>
                  <p>DIAMONDS ARE FOR EVERYONE ®</p>

                  <p>
                    KayraCreation aims to create a Chain of Smile and will
                    donate 3% of your purchase to your choice of charity during
                    check-out.
                    <br /> <u style={{ cursor: "pointer" }}>Learn More</u>
                  </p>

                  <p>
                    Custom Jewelry: If you would like to customize this jewelry,
                    please email us at order@smilingrocks.com.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          {(designSetList.length !== 0 && showIcateDesign === 1) &&
            <div className='smilingCompleteLookMainWeb' style={{ position: 'relative', marginInline: '10%', minHeight: '350px', display: 'flex', alignItems: 'center', marginBottom: '7%' }}>
              <div className='similiarBrand' style={{ right: '0px', position: 'absolute', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '100px', marginTop: !(productData?.OriginalImagePath) && '120px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'FreightDisp Pro Medium', color: '#7d7f85', fontSize: '26px' }}>Complete The Look</span>
                </div>
                <div style={{ border: '1px solid #e1e1e1', backgroundColor: 'white', borderRadius: '4px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {
                    designSetList?.slice(0, 3)?.map((dsl, i) => (
                      <>
                        {/* {i !== 0 && <hr style={{opacity:0.06}}/>} */}
                        <div style={{ display: 'flex', alignItems: 'center', width: '670px', gap: '30px', cursor: 'pointer' }} onClick={() => handelDesignSet(dsl)}>
                          <div>
                            <img src={dsl?.DefaultImageName ? globImagePath + dsl?.DesignFolderName + '/' + imageSize?.ImgOr + '/' + dsl?.DefaultImageName : notFound} alt={""} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />

                            {/* <img src={!(dsl?.ThumbImagePath) ? notFound : globImagePath + dsl?.ThumbImagePath.split(",")[0]} alt={""} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /> */}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: '100px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', minWidth: '500px' }}>
                              <sapn style={{ fontWeight: '500' }}>{dsl?.TitleLine}({dsl?.designno})</sapn>
                              {/* <span></span> */}
                              <span style={{ fontSize: '14px', color: '#888' }}>{dsl?.description}</span>
                            </div>
                            <div>
                              <NavigateNextRoundedIcon />
                            </div>
                            {(i !== designSetList?.slice(0, 3).length - 1) && <div style={{ borderBottom: '1px solid #e1e1e1', position: "absolute", bottom: "-18.5px", left: "0", width: "100%", }}></div>}
                          </div>
                        </div>
                      </>
                    ))
                  }
                </div>
              </div>

              <img
                src={`${uploadLogicPath}/${uKey}/Photo_original/designmanagement_designset/${designUniqueNO}/${completeBackImage}`}
                style={{ width: '800px' }}
              />
            </div>
          }

          {(designSetList.length !== 0 && showIcateDesign === 1) &&
            <div className='smilingCompleteLookMainMobile' style={{ position: 'relative', marginInline: '5%', marginBottom: '7%', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={`${uploadLogicPath}/${uKey}/Photo_original/designmanagement_designset/${designUniqueNO}/${completeBackImage}`}
                  className='smilingCompleteLookMainMobileImg'
                />
              </div>
              <div className='similiarBrand' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '100px', marginTop: !(productData?.OriginalImagePath) && '120px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'FreightDisp Pro Medium', color: '#7d7f85', fontSize: '26px' }}>Complete The Look</span>
                </div>
                <div style={{ border: '1px solid #e1e1e1', backgroundColor: 'white', borderRadius: '4px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  {
                    designSetList?.map((dsl, i) => (
                      <>
                        {/* {i !== 0 && <hr style={{opacity:0.06}}/>} */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                          <div >
                            <img src={dsl?.DefaultImageName ? globImagePath + dsl?.DesignFolderName + '/' + imageSize?.ImgOr + '/' + dsl?.DefaultImageName : notFound} alt={""} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: '100px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <sapn style={{ fontWeight: '500' }}>{dsl?.TitleLine}({dsl?.designno})</sapn>
                              {/* <span></span> */}
                              <span style={{ fontSize: '14px', color: '#888' }}>{dsl?.description}</span>
                            </div>
                            <div onClick={() => handelDesignSet(dsl)}>
                              <NavigateNextRoundedIcon />
                            </div>
                            {(i !== designSetList.length - 1) && <div style={{ borderBottom: '1px solid #e1e1e1', position: "absolute", bottom: "-18.5px", left: "0", width: "100%", }}></div>}
                          </div>
                        </div>
                      </>
                    ))
                  }
                </div>
              </div>
            </div>
          }

          <div className="Acc-container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                marginBottom: '60px'
              }}
            >
              <p
                style={{
                  fontSize: "30px",
                  fontFamily: "FreightDisp Pro Medium",
                  color: "#7d7f85",
                }}
              >
                Product Details
              </p>
              <div style={{ width: '60%', marginBottom: '60px' }} className='tellmeMoreMain'>

                {fullProdData?.rd1?.length !== 0 &&
                  <div className='tellmeMoreMainMobileDiv'>
                    <ul style={{
                      margin: '0px 0px 3px 0px'
                    }}>
                      <li style={{ fontWeight: 700, color: 'rgb(125, 127, 133)' }}>{`Diamond Detail(${fullProdData?.rd1?.reduce((accumulator, data) => accumulator + data.M, 0)}/${fullProdData?.rd1?.reduce((accumulator, data) => accumulator + data?.N, 0).toFixed(2)}ct)`}</li>
                    </ul>
                    <ul style={{
                      display: 'flex',
                      textDecoration: 'none',
                      listStyle: 'none',
                      margin: '0px 0px 3px 0px'
                    }}>
                      <li className='proDeatilList'>Shape</li>
                      <li className='proDeatilList'>Clarity</li>
                      <li className='proDeatilList'>Color</li>
                      <li className='proDeatilList'>Pcs/Wt</li>
                    </ul>
                    {
                      fullProdData?.rd1?.map((data) => (
                        <ul style={{
                          display: 'flex',
                          textDecoration: 'none',
                          listStyle: 'none',
                          margin: '0px 0px 3px 0px'
                        }}>
                          <li className='proDeatilList1'>{data?.F}</li>
                          <li className='proDeatilList2'>{data?.H}</li>
                          <li className='proDeatilList3'>{data?.J}</li>
                          <li className='proDeatilList4'>{data.M}/{data?.N}</li>
                        </ul>
                      ))
                    }
                  </div>
                }

                <div className='tellmeMoreMainMobileDiv' style={{ marginTop: '25px' }}>
                  {fullProdData?.rd2?.some(data => data?.D === "COLOR STONE") && (
                    <>
                      <ul style={{ margin: '0px 0px 3px 0px' }}>
                        <li style={{ fontWeight: 700, color: 'rgb(125, 127, 133)' }}>{`Color Stone Detail(${fullProdData?.rd2?.reduce((accumulator, data) => accumulator + data.M, 0)}/${fullProdData?.rd2?.reduce((accumulator, data) => accumulator + data?.N, 0).toFixed(2)}ct)`}</li>
                      </ul>
                      <ul style={{ display: 'flex', textDecoration: 'none', listStyle: 'none', margin: '0px 0px 3px 0px' }}>
                        <li className='proDeatilList'>Shape</li>
                        <li className='proDeatilList'>Clarity</li>
                        <li className='proDeatilList'>Color</li>
                        <li className='proDeatilList'>Pcs/Wt</li>
                      </ul>
                      {fullProdData?.rd2?.map((data) => (
                        data?.D === "COLOR STONE" && (
                          <ul style={{ display: 'flex', textDecoration: 'none', listStyle: 'none', margin: '0px 0px 3px 0px' }}>
                            <li className='proDeatilList1'>{data?.F}</li>
                            <li className='proDeatilList2'>{data?.H}</li>
                            <li className='proDeatilList3'>{data?.J}</li>
                            <li className='proDeatilList4'>{data.M}/{data?.N}</li>
                          </ul>
                        )
                      ))}
                    </>
                  )}
                </div>


                <div className='tellmeMoreMainMobileDiv' style={{ marginTop: '25px' }}>
                  {fullProdData?.rd2?.some(data => data?.D === "MISC") && (
                    <>
                      <ul style={{ margin: '0px 0px 3px 0px' }}>
                        <li style={{ fontWeight: 700, color: 'rgb(125, 127, 133)' }}>{`Misc. Detail(${fullProdData?.rd2?.reduce((accumulator, data) => accumulator + data.M, 0)}/${fullProdData?.rd2?.reduce((accumulator, data) => accumulator + data?.N, 0).toFixed(2)}ct)`}(21/1.022ct)</li>
                      </ul>
                      <ul style={{ display: 'flex', textDecoration: 'none', listStyle: 'none', margin: '0px 0px 3px 0px' }}>
                        <li className='proDeatilList'>Shape</li>
                        <li className='proDeatilList'>Clarity</li>
                        <li className='proDeatilList'>Color</li>
                        <li className='proDeatilList'>Pcs/Wt</li>
                      </ul>
                      {fullProdData?.rd2?.map((data) => (
                        data?.D === "MISC" && (
                          <ul style={{ display: 'flex', textDecoration: 'none', listStyle: 'none', margin: '0px 0px 3px 0px' }}>
                            <li className='proDeatilList1'>{data?.F}</li>
                            <li className='proDeatilList2'>{data?.H}</li>
                            <li className='proDeatilList3'>{data?.J}</li>
                            <li className='proDeatilList4'>{data.M}/{data?.N}</li>
                          </ul>
                        )
                      ))}
                    </>
                  )}
                </div>

              </div>
              <ul
                className="srAccul"
              >
                <li
                  // className="tellmoreli"
                  onClick={() => {
                    setAccNo("");
                    setAccNo("1");
                    setAcc(!acc);
                  }}
                  style={{ userSelect: "none" }}
                >
                  {/* <span className="tellmorep">
                    PRODUCT DETAILS
                    <span style={{ fontSize: "24px" }}>
                      {acc && accNo === "1" ? "-" : "+"}
                    </span>
                  </span> */}
                  {/* <div style={{display:acc && accNo === '1' ? 'block':'none',userSelect:'none',transition:'0.5s'}}> */}
                  <div
                    className={`my-list-fineJewe ${acc && accNo === "1" ? "openAcc" : ""}`}
                  >
                    <div>
                      <div className="srAccContainer">
                        <div className="srFloat">
                          <span>
                            MetalPurity: <b>{productData?.updMT?.split(" ")[1]}</b>
                          </span>
                          {/* <span>
                            <b>MetalWeight</b>: {productData?.MetalWeight}
                          </span> */}
                          <span>
                            GrossWeight:
                            {/* <b>{(
                              productData?.Grossweight +
                              (metalFilterData.length === 0
                                ? 0
                                : metalFilterData[0]?.Weight) +
                              (daimondFilterData.length === 0
                                ? 0
                                : daimondFilterData[0]?.Weight / 5)
                            ).toFixed(2)}</b> */}
                            <b>{productData?.updGWT}</b>
                            {/* {daimondFilterData?.length && metalFilterData.length ? (
                              <>
                                <b>GrossWeight</b>: {metalFilterData[0]?.Weight + (daimondFilterData[0]?.Weight / 5)}
                              </>
                            ) : ''}
                            {daimondFilterData?.length === 0 && metalFilterData.length ? (
                              <>
                                <b>GrossWeight</b>: {metalFilterData[0]?.Weight}
                              </>
                            ) : ''}
                            {daimondFilterData?.length && metalFilterData.length === 0 ? (
                              <>
                                <b>GrossWeight</b>: {daimondFilterData[0]?.Weight / 5}
                              </>
                            ) : ''}
                            {daimondFilterData?.length === 0 && metalFilterData.length === 0 ? (
                              <>
                                <b>GrossWeight</b>: {productData?.Grossweight}
                              </>
                            ) : ''} */}
                          </span>
                          <span>
                            DiamondWeight:{" "}
                            {/* <b>{daimondFilterData?.length
                              ? (
                                productData?.diamondweight +
                                daimondFilterData[0]?.Weight
                              ).toFixed(2)
                              : productData?.diamondweight}</b> */}
                            <b>{daimondFilterData?.length
                              ? (
                                productData?.updDWT +
                                daimondFilterData[0]?.Weight
                              ).toFixed(2)
                              : productData?.updDWT}</b>
                            {/* <b>{productData?.updDWT}</b> */}
                          </span>
                          <span>
                            Diamondpcs:{" "}
                            {/* <b>{daimondFilterData?.length
                              ? productData?.diamondpcs +
                              daimondFilterData[0]?.pieces
                              : productData?.diamondpcs}</b> */}
                            <b>{daimondFilterData?.length
                              ? productData?.updDPCS +
                              daimondFilterData[0]?.pieces
                              : productData?.updDPCS}</b>
                          </span>

                        </div>
                        <div className="srFloat">
                          <span>
                            Netwt:{" "}
                            {/* <b>{metalFilterData?.length
                              ? (
                                productData?.netwt +
                                metalFilterData[0]?.Weight
                              ).toFixed(2)
                              : productData?.netwt}</b> */}
                            <b>{productData?.updNWT}</b>
                          </span>
                          <span>
                            DiamondQuality: <b>{productData?.diamondquality}</b>
                          </span>
                          <span>
                            DiamondColorname:{" "}
                            <b>{productData?.diamondcolorname}</b>
                          </span>
                          <span>
                            NumberOfDiamonds:{" "}
                            <b>{daimondFilterData?.length
                              ? productData?.updDPCS +
                              daimondFilterData[0]?.pieces
                              : productData?.updDPCS}</b>
                            {/* <b>{daimondFilterData?.length
                              ? productData?.diamondpcs +
                              daimondFilterData[0]?.pieces
                              : productData?.diamondpcs}</b> */}
                            {/* <b>{productData?.updDPCS}</b> */}
                          </span>
                          {/* <span>
                            TotalDiamondWeight: */}
                          {/* <b>{daimondFilterData?.length
                              ? (
                                productData?.diamondweight +
                                daimondFilterData[0]?.Weight
                              ).toFixed(2)
                              : productData?.diamondweight}</b> */}
                          {/* <b>{productData?.updDWT}</b>
                          </span> */}
                          {/* <span>
                            DiamondSetting: <b>{productData?.diamondsetting}</b>
                          </span> */}
                        </div>
                      </div>
                      {/* <div style={{marginBottom:'15px'}}>
                        <span style={{fontSize:'13px',fontWeight:'normal'}}>
                          Total carat weight (ctw) represents the approximate
                          total weight of all diamonds in each jewelry and may
                          vary from 0.48 to 0.54 carats. All diamonds are lab
                          grown diamonds.
                        </span>
                      </div> */}
                    </div>
                  </div>
                </li>
                {/* <div style={{display:acc && accNo === '2' ? 'block':'none',userSelect:'none',transition:'0.5s'}}>  */}
                {/* <li
                  className="tellmoreli"
                  onClick={() => {
                    setAccNo("");
                    setAccNo("2");
                    setAcc(!acc);
                  }}
                  style={{ userSelect: "none" }}
                >
                  <span className="tellmorep">
                    STYLE & FIT
                    <span style={{ fontSize: "24px" }}>
                      {acc && accNo === "2" ? "-" : "+"}
                    </span>
                  </span>
                  <div
                    className={`my-list-fineJewe ${
                      acc && accNo === "2" ? "openAcc" : ""
                    }`}
                  >
                    <span style={{fontSize:'12px'}}>A Comfort fit ring with high gold polish for your everyday comfort. Check out your ring size below.</span>
                    <table style={{width:'100%',margin:'20px 0px'}} className='sracctable'>
                      <tbody>
                        <tr>
                          <td className='sracctabletd1'>INSIDE DIAMETER</td>
                          <td className='sracctabletd2'></td>
                          <td className='sracctabletd3'></td>
                        </tr>
                        <tr>
                          <td className='sracctabletd1'>INCHES</td>
                          <td className='sracctabletd2'>MM</td>
                          <td className='sracctabletd3'>US SIZE</td>
                        </tr>
                        <tr>
                          <td className='sracctabletd1'>0.6</td>
                          <td className='sracctabletd2'>15.5</td>
                          <td className='sracctabletd3'>5</td>
                        </tr>
                        <tr>
                          <td className='sracctabletd1'>0.64</td>
                          <td className='sracctabletd2'>16.1</td>
                          <td className='sracctabletd3'>6</td>
                        </tr>
                        <tr>
                          <td className='sracctabletd1'>0.69</td>
                          <td className='sracctabletd2'>17.35</td>
                          <td className='sracctabletd3'>7</td>
                        </tr>
                        <tr>
                          <td className='sracctabletd1'>0.72</td>
                          <td className='sracctabletd2'>18.19</td>
                          <td className='sracctabletd3'>8</td>
                        </tr>
                        <tr>
                          <td className='sracctabletd1'>0.75</td>
                          <td className='sracctabletd2'>19.1</td>
                          <td className='sracctabletd3'>9</td>
                        </tr>
                      </tbody>
                    </table>
                    <span style={{fontSize:'12px'}}>All our rings can be resized by one size up or down, except for Eternity Bands.</span>
                  </div>
                </li> */}
                {/* <div style={{display:acc && accNo === '3' ? 'block':'none',userSelect:'none',transition:'0.5s'}}> */}
                {/* <li
                  className="tellmoreli"
                  onClick={() => {
                    setAccNo("");
                    setAccNo("3");
                    setAcc(!acc);
                  }}
                  style={{ userSelect: "none" }}
                >
                  <span className="tellmorep">
                    SHIPPING AND RETURNS
                    <span style={{ fontSize: "24px" }}>
                      {acc && accNo === "3" ? "-" : "+"}
                    </span>
                  </span>
                  <div
                    className={`my-list-fineJewe ${
                      acc && accNo === "3" ? "openAcc" : ""
                    }`}
                  >
                   We ship all over the USA only. 
                   International shipping is not available at the 
                   moment.We offer a free return & refund up to 30 days after 
                   your purchase. For more please read our Shipping and Returns Policy
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
          {/* <div className="compeletethelook_cont">
            <img
              src={
                "https://cdn.accentuate.io/3245609615460/4121939443812/99-v1581576944425.jpg?2048x1950"
              }
              alt={""}
              className='ctl_img'
            />

            <div className="compeletethelook_prodt" >
              <p
                style={{
                  fontFamily: "FreightDisp Pro Medium",
                  color: "#7d7f85",
                  fontSize: "30px",
                }}
              >
                Complete The Look
              </p>

              <div className='completethelook_outer' >
                <div style={{ display: "flex", gap: "60px" }}>
                  <div style={{ marginLeft: "12px" }}>
                    <img
                      src={
                        "https://smilingrocks.com/cdn/shop/products/Lab-grown-diamond-white-gold-earrings-sre00362wht_medium.jpg?v=1590473229"
                      }
                      className='srthelook_img'
                    />
                  </div>
                  <div
                    className='srthelook_prodinfo'
                  >
                    <div
                      style={{
                        fontSize: "12.5px",
                        color: "#7d7f85",
                        textTransform: "uppercase",
                      }}
                    >
                      <p>
                        Drizzle 0.78ct Lab Grown Diamond Earrings
                        <br />
                        E-00362WHT
                        <br />
                        $2,075.00
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: "30px", color: "#7d7f85",padding:'5px'}} className=''>
                        &#8250;
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "60px" }}>
                  <div style={{ marginLeft: "12px" }}>
                    <img
                      src={
                        "https://smilingrocks.com/cdn/shop/products/Lab-grown-diamond-white-gold-necklace-srnl00367wht_medium.jpg?v=1613626874"
                      }
                      className='srthelook_img'
                    />
                  </div>
                  <div
                    className='srthelook_prodinfo'
                  >
                    <div
                      style={{
                        fontSize: "12.5px",
                        color: "#7d7f85",
                        textTransform: "uppercase",
                      }}
                    >
                      <p>
                        Drizzle 0.78ct Lab Grown Diamond Earrings
                        <br />
                        E-00362WHT
                        <br />
                        $2,075.00
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: "30px", color: "#7d7f85" }}>
                        &#8250;
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "60px" }}>
                  <div style={{ marginLeft: "12px" }}>
                    <img
                      src={
                        "https://smilingrocks.com/cdn/shop/products/Lab-grown-diamond-white-gold-bracelet-srbl00236wht_medium.jpg?v=1590473675"
                      }
                      className='srthelook_img'
                    />
                  </div>
                  <div
                    className='srthelook_prodinfo'
                  >
                    <div
                      style={{
                        fontSize: "12.5px",
                        color: "#7d7f85",
                        textTransform: "uppercase",
                      }}
                    >
                      <p>
                        Drizzle 0.78ct Lab Grown Diamond Earrings
                        <br />
                        E-00362WHT
                        <br />
                        $2,075.00
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: "30px", color: "#7d7f85" }}>
                        &#8250;
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <SmilingRock /> */}
          <Footer />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
        <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
      </div>
    </div >
  );
}

export default ProdDetail