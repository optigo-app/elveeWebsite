import { CommonAPI } from "./CommonAPI"

export const productListApiCall = async(param,page=1,filterObj={}) =>{

    const keyMapping = {
        "0": "id",
        "1": "IsBestSeller",
        "2": "IsTrending",
        "3": "designno",
        "4": "UnitCost",
        "5": "UnitCostWithmarkup",
        "6": "autocode",
        "7": "DefaultImageName",
        "8": "imgrandomno",
        "9": "RollOverImageName",
        "10": "IsNewArrival",
        "11": "MetalWeight",
        "12": "diamondweight",
        "13": "TitleLine",
        "14": "diamondquality",
        "15": "diamondsetting",
        "16": "diamondshape",
        "17": "diamondcolorname",
        "18": "colorstonequality",
        "19": "colorstonecolorname",
        "20": "totaldiamondweight",
        "21": "totaladditionalvalueweight",
        "22": "diamondpcs",
        "23": "totalcolorstoneweight",
        "24": "Grossweight",
        "25": "MasterManagement_labid",
        "26": "DisplayOrder",
        "27": "Producttypeid",
        "28": "Collectionid",
        "29": "Categoryid",
        "30": "SubCategoryid",
        "31": "Brandid",
        "32": "Genderid",
        "33": "Ocassionid",
        "34": "Themeid",
        "35": "MetalTypeid",
        "36": "MetalColorid",
        "37": "IsInReadyStock",
        "38": "InReadyStockCnt",
        "39": "AdditionalValWt",
        "40": "MetalPurityid",
        "41": "FrontEnd_OrderCnt",
        "42": "CenterStoneId",
        "43": "ColorWiseRollOverImageName",
        "44": "CenterStonePieces",
        "45": "Hashtagid",
        "46": "Hashtagname",
        "47": "ThumbImagePath",
        "48": "MediumImagePath",
        "49": "OriginalImagePath",
        "50": "videoName",
        "51": "UpdateDate",
        "52": "oldtag",
        "53": "description",
        "54": "netwt",
        "55": "totalcolorstonepcs",
        "56": "colorstoneshape",
        "57": "diamondclarityEcat_id",
        "58": "diamondcolorEcat_id",
        "59": "diamondshapeEcat_id",
        "60": "MasterManagement_labname",
        "61": "CollectionName",
        "62": "CategoryName",
        "63": "SubCategoryName",
        "64": "BrandName",
        "65": "GenderName",
        "66": "OcassionName",
        "67": "ThemeName",
        "68": "MetalTypeName",
        "69": "MetalColorName",
        "70": "MetalPurity",
        "71": "SetDno",
        "72": "similarband",
        "73": "DefaultSize",
        "74": "imagepath",
        "75": "ProducttypeName",
        "76": "ImageName",
        "77": "VideoName",
        "78": "DesignFolderName"
      };

    let pdList=[];

    let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
    let userEmail = localStorage.getItem("userEmailForPdList")
      console.log('props---', param);

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
      "PageSize":`${storeinit?.PageSize}`,
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
      "Producttypeid": `${filterObj?.Producttypeid ?? ""}`
    }



    const data = {
      "PackageId":`${loginInfo?.PackageId}`,
      "autocode":"","FrontEnd_RegNo":`${storeinit?.FrontEnd_RegNo}`,
      "Customerid":`${loginInfo?.id}`,
      "Filter":btoa(JSON.stringify(encodedFilter)),
    }
    let encData =  btoa(JSON.stringify(data))
    console.log('encodedFilter',encodedFilter);

    let body = {
      "con":`{\"id\":\"\",\"mode\":\"GETPRODUCTLIST\",\"appuserid\":\"${userEmail}\"}`,
      "f":"onlogin (GETPRODUCTLIST)",
      "p":encData
    }

    // let CategoryFilter;
    // let ProductTypeFilter;
    // let GenderFilter;
    // let CollectionFilter;
    // let BrandFilter;
    // let OcassionFilter;
    // let ThemeFilter;
    // let SubCategoryFilter;


    let prodCount;
    let autoCodeList;
    await CommonAPI(body).then((res) => {
        let pdData = res?.Data.rd;
        prodCount = res?.Data?.rd1[0]?.designcount
        autoCodeList = res?.Data?.rd1[0]?.AutoCodeList
        pdData?.forEach(p => {
            const mergedItem = {};
            for (let key in p) {
                if (keyMapping[key]) {
                    mergedItem[keyMapping[key]] = p[key]
                }
            }
            pdList.push(mergedItem); 
        });

        // CategoryFilter = res?.Data.rd3
        // ProductTypeFilter = res?.Data.rd14
        // GenderFilter = res?.Data.rd6;
        // CollectionFilter = res?.Data.rd2
        // BrandFilter = res?.Data.rd5
        // OcassionFilter = res?.Data.rd7
        // ThemeFilter = res?.Data.rd8
        // SubCategoryFilter = res?.Data.rd4
        // console.log("pdList",pdList);
    });

    console.log("prodCount",prodCount);
    
    localStorage.setItem("allproductlist", JSON.stringify(pdList));
    localStorage.setItem("allproductcount", JSON.stringify(prodCount));
    localStorage.setItem("autoCodeList", JSON.stringify(autoCodeList));
    // localStorage.setItem("CategoryFilter",JSON.stringify(CategoryFilter));
    // localStorage.setItem("ProductTypeFilter",JSON.stringify(ProductTypeFilter));
    // localStorage.setItem("GenderFilter",JSON.stringify(GenderFilter));
    // localStorage.setItem("CollectionFilter",JSON.stringify(CollectionFilter));
    // localStorage.setItem("BrandFilter",JSON.stringify(BrandFilter));
    // localStorage.setItem("OcassionFilter",JSON.stringify(OcassionFilter));
    // localStorage.setItem("ThemeFilter",JSON.stringify(ThemeFilter));
    // localStorage.setItem("SubCategoryFilter",JSON.stringify(SubCategoryFilter));
    

    //DesignList API Calling
    return pdList

  }


  // export const newProdApiCalling = async() => {

  //     let AllData = []

  //     const myHeaders = new Headers();
  //     myHeaders.append("Authorization", "Bearer 9267110870402867");
  //     myHeaders.append(
  //       "Yearcode",
  //       "e3tsaXZlLm9wdGlnb2FwcHMuY29tfX17ezIwfX17e3RzdG9yZX19e3t0c3RvcmV9fQ=="
  //     );
  //     myHeaders.append("Version", "V4");
  //     myHeaders.append("sp", "1");
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Cookie", "ASP.NET_SessionId=ywvybkt4qq3dgrbtejrfgqec");

  //     const raw = JSON.stringify({
  //       con: '{"id":"","mode":"GETPRODUCTLIST","appuserid":"ketan@gmail.com"}',
  //       f: "zen (cartcount)",
  //       p: "eyJQYWNrYWdlSWQiOiIzIiwiYXV0b2NvZGUiOiIiLCJGcm9udEVuZF9SZWdObyI6InRzdG9yZXhwMWQ2NHRqYXl4IiwiQ3VzdG9tZXJpZCI6Ijg3NiJ9",
  //     });

  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };

  //     const keyMapping = {
  //       "0": "id",
  //       "1": "IsBestSeller",
  //       "2": "IsTrending",
  //       "3": "designno",
  //       "4": "UnitCost",
  //       "5": "UnitCostWithmarkup",
  //       "6": "autocode",
  //       "7": "DefaultImageName",
  //       "8": "imgrandomno",
  //       "9": "RollOverImageName",
  //       "10": "IsNewArrival",
  //       "11": "MetalWeight",
  //       "12": "diamondweight",
  //       "13": "TitleLine",
  //       "14": "diamondquality",
  //       "15": "diamondsetting",
  //       "16": "diamondshape",
  //       "17": "diamondcolorname",
  //       "18": "colorstonequality",
  //       "19": "colorstonecolorname",
  //       "20": "totaldiamondweight",
  //       "21": "totaladditionalvalueweight",
  //       "22": "diamondpcs",
  //       "23": "totalcolorstoneweight",
  //       "24": "Grossweight",
  //       "25": "MasterManagement_labid",
  //       "26": "DisplayOrder",
  //       "27": "Producttypeid",
  //       "28": "Collectionid",
  //       "29": "Categoryid",
  //       "30": "SubCategoryid",
  //       "31": "Brandid",
  //       "32": "Genderid",
  //       "33": "Ocassionid",
  //       "34": "Themeid",
  //       "35": "MetalTypeid",
  //       "36": "MetalColorid",
  //       "37": "IsInReadyStock",
  //       "38": "InReadyStockCnt",
  //       "39": "AdditionalValWt",
  //       "40": "MetalPurityid",
  //       "41": "FrontEnd_OrderCnt",
  //       "42": "CenterStoneId",
  //       "43": "ColorWiseRollOverImageName",
  //       "44": "CenterStonePieces",
  //       "45": "Hashtagid",
  //       "46": "Hashtagname",
  //       "47": "ThumbImagePath",
  //       "48": "MediumImagePath",
  //       "49": "OriginalImagePath",
  //       "50": "videoName",
  //       "51": "UpdateDate",
  //       "52": "oldtag",
  //       "53": "description",
  //       "54": "netwt",
  //       "55": "totalcolorstonepcs",
  //       "56": "colorstoneshape",
  //       "57": "diamondclarityEcat_id",
  //       "58": "diamondcolorEcat_id",
  //       "59": "diamondshapeEcat_id",
  //       "60": "MasterManagement_labname",
  //       "61": "CollectionName",
  //       "62": "CategoryName",
  //       "63": "SubCategoryName",
  //       "64": "BrandName",
  //       "65": "GenderName",
  //       "66": "OcassionName",
  //       "67": "ThemeName",
  //       "68": "MetalTypeName",
  //       "69": "MetalColorName",
  //       "70": "MetalPurity",
  //       "71": "SetDno",
  //       "72": "similarband",
  //       "73": "DefaultSize",
  //       "74": "imagepath",
  //       "75": "ProducttypeName"
  //     };

  //     await fetch("https://api.optigoapps.com/test/store.aspx", requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log("result",result?.Data?.rd);
  //         if (result) {
  //           // setTestProdData(result?.Data?.rd);
  //           let pdData = result?.Data?.rd
  //           pdData.forEach(p => {
  //             const mergedItem = {};
  //             for (let key in p) {
  //                 if (keyMapping[key]) {
  //                     mergedItem[keyMapping[key]] = p[key]
  //                 }
  //             }
  //             AllData.push(mergedItem)
  //         });
  //         }
  //       })
  //       .catch((error) => console.error(error))
  
  //     return AllData;

  // }