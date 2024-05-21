import { CommonAPI } from "./CommonAPI"

export const SearchProductDataAPI = async(searchVar) =>{

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

    let encodedFilter = {
      "SearchKey":`${searchVar}`
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

    let prodCount;
    let autoCodeList;
    let response;

    await CommonAPI(body).then((res) => {
        response = res?.Data;
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

    });

    console.log("searchProduct",pdList)
    
    localStorage.setItem("allproductlist", JSON.stringify(pdList));
    localStorage.setItem("allproductcount", JSON.stringify(prodCount));
    localStorage.setItem("autoCodeList", JSON.stringify(autoCodeList));

    return {pdList,"response":response}

  }
