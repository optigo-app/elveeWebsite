import moment from "moment";

export const checkMonth = (val) => {
    // month = "January" month = "February" month = "March" month = "April" month = "May" month = "June" month = "July" month = "August" month = "September" month = "October" month = "November" month = "December"
    let month = "";
    switch (val) {
        case 0:
            month = "01"
            break;
        case 1:
            month = "02"
            break;
        case 2:
            month = "03"
            break;
        case 3:
            month = "04"
            break;
        case 4:
            month = "05"
            break;
        case 5:
            month = "06"
            break;
        case 6:
            month = "07"
            break;
        case 7:
            month = "08"
            break;
        case 8:
            month = "09"
            break;
        case 9:
            month = "10"
            break;
        case 10:
            month = "11"
            break;
        case 11:
            month = "12"
            break;

        default:
            break;
    }

    return month;
};

export const checkDates = (fromDates, toDates, cutDates) => {

    let fromdates = `${fromDates?.["$y"]}-${checkMonth(fromDates?.["$M"])}-${fromDates?.["$D"]}`;
    let todates = `${toDates?.["$y"]}-${checkMonth(toDates?.["$M"])}-${toDates?.["$D"]}`;

    let cutDate = cutDates;
    cutDate = `${cutDate[2]}-${cutDate[1]}-${cutDate[0]}`;

    let flags = {
        dateTo: false,
        dateFrom: false,
        alldata: false
    }

    if (cutDate !== undefined) {
        // if(fromDates && toDates && moment(fromdates).isSameOrBefore(moment(todates))){
        if (!fromdates?.includes(undefined) && !todates?.includes(undefined)) {
            let fromdat = moment(fromdates);
            let todat = moment(todates);
            let cutDat = moment(cutDate);
            if (moment(fromdat).isSameOrBefore(todat)) {
                const isBetween = cutDat.isBetween(fromdat, todat);
                if (isBetween || cutDat.isSame(fromdat) || cutDat.isSame(todat)) {
                    flags.dateTo = true;
                    flags.dateFrom = true;
                }
            }
            else {
                flags.alldata = true
            }

        } else if (fromdates?.includes(undefined) && !todates?.includes(undefined)) {
            // let todat = new Date(todates);
            // let cutDat = new Date(cutDate);
            // if (cutDat < todat) {
            //     flags.dateTo = true;
            //     flags.dateFrom = true;
            // }
            flags.dateTo = true;
            flags.dateFrom = true;
            flags.alldata = false;

        } else if (!fromdates?.includes(undefined) && todates?.includes(undefined)) {
            // let fromdat = new Date(fromdates);
            // let cutDat = new Date(cutDate);
            // if (cutDat > fromdat) {
            //     flags.dateTo = true;
            //     flags.dateFrom = true;
            // }
            flags.dateTo = true;
            flags.dateFrom = true;
            flags.alldata = false;
        } else if (fromdates?.includes(undefined) && todates?.includes(undefined)) {
            flags.dateTo = true;
            flags.dateFrom = true;
            flags.alldata = false;
        }
    }
    // }

    return flags;
}

export const NumberWithCommas = (value, val) => {
    const roundedValue = Number(value).toFixed(val || 2);
    const stringValue = roundedValue.toString();
    const [integerPart, decimalPart] = stringValue.split('.');
    let formattedString = integerPart
        .split('')
        .reverse()
        .map((char, index) => (index > 0 && index % 2 === 0 ? ',' + char : char))
        .reverse()
        .join('');
    if (decimalPart !== undefined && val && val !== 0) {
        formattedString += '.' + decimalPart.padEnd(val || 2, '0');
    }
    formattedString = formattedString.replace(/^,+/, '');
    return formattedString;
};

export const getLocalStorageItems = () => {
    const storedData = localStorage.getItem('loginUserDetail');
    const data = JSON.parse(storedData);
    const storeInit = JSON.parse(localStorage.getItem('storeInit'));
    const { FrontEnd_RegNo } = storeInit;

    return {
        data: data, FrontEnd_RegNo: FrontEnd_RegNo
    }
}

export const accountValidation = () => {
    let getVal = JSON?.parse(localStorage.getItem("storeInit"))?.["IsMyaccount"];

    let getVals = [1163, 1164, 1157, 1314, 17020, 1159];
    let pageIsOn = false;
    getVals?.forEach((e, i) => {
        let getValss = JSON?.parse(localStorage?.getItem("myAccountFlags"))?.find(ele => ele?.pageid === e);
        if (getValss !== undefined) {
            if (getValss?.isvisible === 1) {
                pageIsOn = true;
            }
        }
    })
    return (getVal === 1 && pageIsOn === true) ? true : false;
}

export const accountDetailPage = (pageId) => {
    let getVal = JSON?.parse(localStorage?.getItem("myAccountFlags"))?.find(ele => ele?.pageid === pageId);
    // return getVal !== undefined ? (getVal?.isvisible === 1 ? true : true) : true;
    return getVal !== undefined ? (getVal?.isvisible === 1 ? true : false) : false;
}



export const accountDetailPages = () => {
    let arr = [
        { id: 1163, tabLabel: "Quote", tabComp: "QuotationQuote", compPath: "./QuotationQuote/QuotationQuote" },
        { id: 1164, tabLabel: "Job", tabComp: "QuotationJob", compPath: "./quotationFilters/QuotationJob" },
        { id: 1157, tabLabel: "Sales", tabComp: "Sales", compPath: "../sales/Sales/Sales" },
        { id: 1314, tabLabel: "Sales Report", tabComp: "SalesReport", compPath: "../sales/salesReport/SalesReport" },
        { id: 17020, tabLabel: "Design Wise Sales Report", tabComp: "DesignWiseSalesReport", compPath: "../sales/DesignWiseSalesReport/DesignWiseSalesReport" },
        { id: 1159, tabLabel: "Account Ledger", tabComp: "AccountLedger", compPath: "./accountLedger/AccountLedger" }
    ];

    let getValArr = [];
    arr?.forEach((e, i) => {
        let getVal = JSON?.parse(localStorage?.getItem("myAccountFlags"))?.find(ele => ele?.pageid === e?.id);
        getVal !== undefined && (getVal?.isvisible === 1 && getValArr?.push(e))
        // getValArr?.push({ label: e?.tabLabel,id: e?.id, comp: e?.tabComp, value: false }))  
        // getValArr?.push({ label: e?.tabLabel,id: e?.id, comp: e?.tabComp, value: false });
    });
    return getValArr;
}
export function formatAmount(amount) {
    const formattedAmount = parseFloat(+amount).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formattedAmount;
}

export function storImagePath() {
        let storeinit = JSON.parse(localStorage.getItem("storeInit"))
        if(storeinit){
            return `${storeinit?.UploadLogicalPath}/${storeinit?.ukey}/${storeinit?.ufcc}`
            // return 'https://cdnfs.optigoapps.com/content-global3/elveesterKGYLM5CREI9H2XBNT/elveester'
        }
}

export function findMetalType(paramId) {
    let metalTypeArr = JSON.parse(localStorage.getItem("MetalTypeData"))
    let item = metalTypeArr.filter(item => item?.Metalid === paramId)
    return item
}

export function findMetalColor(paramId) {
    let metalColorArr = JSON.parse(localStorage.getItem("MetalColorData"))
    let item = metalColorArr.filter(item => item?.id === paramId)
    return item
}

export function findMetalTypeId(param) {
    let metalTypeArr = JSON.parse(localStorage.getItem("MetalTypeData"))
    let item = metalTypeArr.filter(item => item?.metaltype === param)
    console.log("param", item);
    return item
}

export function findDiaQcId(param) {

    let diaQCArr = JSON.parse(localStorage.getItem("QualityColor"))
    let quality = param.split("#")[0]
    let color = param.split("#")[1]

    let item = diaQCArr?.filter(ele => ele?.Quality == quality && ele?.color == color)
    
    return item
}

export function findCsQcId(param) {

    let CsQCArr = JSON.parse(localStorage.getItem("ColorStoneQualityColor"))
    let quality = param.split("-")[0]
    let color = param.split("-")[1]

    let item = CsQCArr?.filter(ele => ele?.Quality == quality && ele?.color == color)
    console.log("param", param,item);
    return item
}

export function findCsQcIdDiff(param) {

    console.log("paramcs", param);
    let CsQCArr = JSON.parse(localStorage.getItem("ColorStoneQualityColor"))
    let quality = param.split("_")[0]
    let color = param.split("_")[1]

    let item = CsQCArr?.filter(ele => ele?.Quality == quality && ele?.color == color)
    
    return item
}

export function findValueFromId(param1, param2) {

    let output;

    let categoryFilter = JSON.parse(localStorage.getItem("CategoryFilter"))
    let ProductTypeFilter = JSON.parse(localStorage.getItem("ProductTypeFilter"))
    let GenderFilter = JSON.parse(localStorage.getItem("GenderFilter"))
    let CollectionFilter = JSON.parse(localStorage.getItem("CollectionFilter"))
    let BrandFilter = JSON.parse(localStorage.getItem("BrandFilter"))
    let OcassionFilter = JSON.parse(localStorage.getItem("OcassionFilter"))
    let ThemeFilter = JSON.parse(localStorage.getItem("ThemeFilter"))
    let SubCategoryFilter = JSON.parse(localStorage.getItem("SubCategoryFilter"))

    if (param1 === "cate") {
        let data = categoryFilter?.filter(item => item?.Categoryid == param2)
        console.log("cate", data);
        output = data[0]
        return output;
    }
    if (param1 === "brand") {
        let data = BrandFilter?.filter(item => item?.Brandid == param2)
        console.log("brand", data);
        output = data[0]
        return output;
    }
    if (param1 === "prodtype") {
        let data = ProductTypeFilter?.filter(item => item?.Producttypeid == param2)
        console.log("prodtype", data);
        output = data[0]
        return output;
    }
    if (param1 === "collect") {
        let data = CollectionFilter?.filter(item => item?.Collectionid == param2)
        console.log("collect", data);
        output = data[0]
        return output;
    }
    if (param1 === "theme") {
        let data = ThemeFilter?.filter(item => item?.Themeid == param2)
        console.log("theme", data);
        output = data[0]
        return output;
    }
    if (param1 === "gender") {
        let data = GenderFilter?.filter(item => item?.Genderid == param2)
        console.log("gender", data);
        output = data[0]
        return output;
    }
    if (param1 === "subcate") {
        let data = SubCategoryFilter?.filter(item => item?.SubCategoryid == param2)
        console.log("subcate", data);
        output = data[0]
        return output;
    }
    if (param1 === "ocass") {
        let data = OcassionFilter?.filter(item => item?.Ocassionid == param2)
        console.log("ocass", data);
        output = data[0]
        return output;
    }

}

// export function ScrollToView(param){
//     const element = document?.getElementById(param);
//     if (!element) {
//         window.location.href = '/';
//         return;
//     }
//     element?.scrollIntoView({behavior:'smooth', block:'center', inline:'nearest'});
// }

export function ScrollToView(param) {
    if (window.location.pathname !== '/') {
        localStorage.setItem('scrollParam', param);
        window.location.href = '/';
        return;
    }

    const element = document?.getElementById(param);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
}

export function handleHomePageLoad() {
    const scrollParam = localStorage.getItem('scrollParam');
    if (scrollParam) {
        ScrollToView(scrollParam);
        setTimeout(() => {
            localStorage.removeItem('scrollParam');
        }, 5000);
    }
}


