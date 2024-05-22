import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Checkbox, Chip, CircularProgress, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material';
import "./QuotationJob.css";
import { formatAmount } from '../../../../Utils/globalFunctions/GlobalFunction';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import { useToast } from 'react-toastify';
import PrintIcon from '@mui/icons-material/Print';
// import jsonData from "../../../jsonFile/account/quotationfilter.json";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { checkMonth } from '../../../../Utils/globalFunctions/GlobalFunction';
import { CommonAPI } from '../../../../Utils/API/CommonAPI';
import Swal from 'sweetalert2';
import axios from 'axios';
const CustomSortIcon = ({ order }) => {
  return (
    <>
      {order === 'asc' && <ArrowUpwardIcon />}
      {order === 'desc' && <ArrowDownwardIcon />}
    </>
  );
};

const QuotationJob = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [printJobError, setPrintJobError] = useState('');

  const [allChecked, setAllChecked] = useState(false);
  const [orderProm, setOrderProm] = useState('order');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterData2, setFilterData2] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [categoryList, setCategoryList] = useState([
   
  ]);
  const [metalColorList, setmetalColorList] = useState([

  ]);
  const [metalPurityList, setMetalPurityList] = useState([
    
  ]);
  const [statuse, setStatus] = useState(statusList[0]?.value || "");
  const [category, setCategory] = useState(categoryList[0]?.value || "");
  const [MetalColor, setMetalColor] = useState(metalColorList[0]?.value || "");
  const [metalPurity, setMetalPurity] = useState(metalPurityList[0]?.value || "");

  const [isLoading, setIsLoading] = useState(false);

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  
  const [PrintUrl, setPrintUrl] = useState('');

  const handleOrderProms = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setOrderProm(event.target.value);
  };
  const handleStatus = (event) => {
    setPage(0);
    setRowsPerPage(10);
    // setStatus(event.target.value);
    setSelectedStatus(event.target.value);
    // handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm);
    handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, category, event.target.value, orderProm);
  };
  const handleCategory = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setCategory(event.target.value);
    handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, event.target.value, statuse, orderProm);
  };
  const handleMetalColor = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setMetalColor(event.target.value);
    handleSearch(event, searchVal, fromDate, toDate, metalPurity, event.target.value, category, statuse, orderProm);
  };
  const handleMetalPurity = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setMetalPurity(event.target.value);
    handleSearch(event, searchVal, fromDate, toDate, event.target.value, MetalColor, category, statuse, orderProm);
  };
  moment.locale('en-gb');

  const columns = [
    { id: 'checkbox', label: <Checkbox />, minWidth: 50, align: "center" },
    { id: 'Sr#', label: 'Sr No', minWidth: 85, align: "center" },
    { id: 'Date', label: 'Date', minWidth: 130, align: "center" },
    { id: 'SKUNO', label: 'SKU#', minWidth: 110, align: "center" },
    { id: 'PO', label: 'PO', minWidth: 110, align: "center" },
    { id: 'JobNo', label: 'Job#', minWidth: 100, align: "center" },
    { id: 'DesignNo', label: 'Design#', minWidth: 100, align: "center" },
    { id: 'Category', label: 'Category', minWidth: 110, align: "center" },
    { id: 'PDate', label: 'Promise Date', minWidth: 130, align: "center" },
    { id: 'FinalAmount', label: 'Quote Price', minWidth: 120, align: "center" },
    { id: 'ProgressStatusName', label: 'Status', minWidth: 120, align: "center" },
    { id: 'Quantity', label: 'Total Qty', minWidth: 100, align: "center" },
    { id: 'SuppliedQuantity', label: 'Supplied', minWidth: 100, align: "center" },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setAllChecked(false);
    scrollToTop();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setAllChecked(false);
    scrollToTop();
  };

  const handleSearch = (eve, searchValue, fromDatess, todatess, metalPurities, MetalColors, categories, statuss, orderPromDate) => {
    let fromdates = `${fromDatess?.["$y"]}-${checkMonth(fromDatess?.["$M"])}-${fromDatess?.["$D"]}`
    let todates = `${todatess?.["$y"]}-${checkMonth(todatess?.["$M"])}-${todatess?.["$D"]}`
    let filteredData = [];
    let count = 0;
    data?.forEach((e, i) => {
      let flags = {
        dateFrom: false,
        dateTo: false,
        status: false,
        category: false,
        MetalColor: false,
        search: false,
        metalPurity: false,
      }
      if (searchValue !== "") {
        if (e?.["Sr#"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["Date"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["SKUNO"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["PO"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["JobNo"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["DesignNo"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["Category"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["metal_color"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["metal_purity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["PDate"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["FinalAmount"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["ProgressStatusName"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["Quantity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["SuppliedQuantity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()))
           {
          flags.search = true;
        }
        // const searchLower = searchValue?.trim()?.toLowerCase(); // Convert search value to lowercase
        // if (
        //     (e?.["Sr#"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["Date"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["SKUNO"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["PO"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["JobNo"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["DesignNo"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["metal_color"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["metal_purity"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["PDate"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["FinalAmount"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["ProgressStatusName"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["Quantity"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["SuppliedQuantity"]?.toString()?.toLowerCase().startsWith(searchLower)) ||
        //     (e?.["Category"]?.toString()?.toLowerCase().startsWith(searchLower)) 
        //   ) {
        //     flags.search = true;
        // }
      } else {
        flags.search = true;
      }
      //order date and promise date flag filter
      let cutDate = "";
      if (orderPromDate === "order") {
        cutDate = e?.["Date"]?.split("-");
      } else {
        cutDate = e?.["PDate"]?.split("-");
      }
      if (cutDate !== undefined) {
        // if(fromDatess && todatess && moment(fromdates).isSameOrBefore(moment(todates))){


        cutDate = `${cutDate[2]}-${cutDate[1]}-${cutDate[0]}`;
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
          } else {
            setTimeout(() => {
              resetAllFilters();
            }, 0)
          }
        } else if (fromdates?.includes(undefined) && !todates?.includes(undefined)) {
          // let todat = new Date(todates);
          // let cutDat = new Date(cutDate);
          // if (cutDat < todat) {
          //   flags.dateTo = true;
          //   flags.dateFrom = true;
          // }
          flags.dateTo = true;
          count++;
          Swal.fire({
            title: "Error !",
            text: "Enter Valid Date From",
            icon: "error",
            confirmButtonText: "ok"
          });
          // flags.dateFrom = true;

        } else if (!fromdates?.includes(undefined) && todates?.includes(undefined)) {
          // let fromdat = new Date(fromdates);
          // let cutDat = new Date(cutDate);
          // if (cutDat > fromdat) {
          //   flags.dateTo = true;
          //   flags.dateFrom = true;
          // }
          // flags.dateTo = true;
          flags.dateFrom = true;
          count++;
          Swal.fire({
            title: "Error !",
            text: "Enter Valid Date To",
            icon: "error",
            confirmButtonText: "ok"
          });

        } else if (fromdates?.includes(undefined) && todates?.includes(undefined)) {
          flags.dateTo = true;
          flags.dateFrom = true;
        }
        //  }
      }





      if (e?.MetalType?.toString()?.toLowerCase()?.startsWith(metalPurities?.toLowerCase()) || metalPurities?.toLowerCase() === "all") {
        flags.metalPurity = true;
      }
      if (e?.MetalColor?.toString()?.toLowerCase()?.startsWith(MetalColors?.toLowerCase()) || MetalColors?.toLowerCase() === "all") {
        flags.MetalColor = true;
      }
      if (e?.Category?.toString()?.toLowerCase()?.startsWith(categories?.toLowerCase()) || categories?.toLowerCase() === "all") {
        flags.category = true;
      }




      // if ((e?.ProgressStatusName?.toString()?.toLowerCase() === statuss?.toLowerCase()) || statuss?.toLowerCase() === "all") {
      //   flags.status = true;
      // }



      if (!Array.isArray(statuss) || statuss?.length === 0) {
        flags.status = true; // Show all data
      } else {
        // Check if any selected status matches the ProgressStatusName
        if (Array.isArray(statuss)) {
          if (statuss.includes(e?.ProgressStatusName)) {
            flags.status = true;
          }
        } else {
          if (e?.ProgressStatusName === statuss || statuss === "all") {
            flags.status = true;
          }
        }
      }






      if (flags.dateFrom === true && flags.dateTo === true && flags.status === true && flags.category === true && flags.MetalColor === true && flags.search === true && flags.metalPurity === true) {
        filteredData.push(e);
      }

    });
    if (count === 0) {
      setFilterData(filteredData);
    } else {
      resetAllFilt();
      handleSearch(eve, "", null, null, metalPurityList[0]?.value, metalColorList[0]?.value, categoryList[0]?.value, statusList[0]?.value, "order");
    }
  }

  const resetAllFilters = (eve) => {
    setSelectedStatus([]);
    setOrderProm("order");
    setFromDate(null);
    setToDate(null);
    setStatus(statusList[0]?.value);
    setCategory(categoryList[0]?.value);
    setMetalColor(metalColorList[0]?.value);
    setMetalPurity(metalPurityList[0]?.value);
    setSearchVal("");
    handleSearch(eve, "", null, null, metalPurityList[0]?.value, metalColorList[0]?.value, categoryList[0]?.value, statusList[0]?.value, "order");
    setFilterData(data);
    setAllChecked(false);
    scrollToTop();
    setPage(0);
    setRowsPerPage(10);
    // setOrderBy('');
    // setOrder('asc')
  }

  const resetAllFilt = () => {
    setOrderProm("order");
    setFromDate(null);
    setToDate(null);
    setStatus(statusList[0]?.value);
    setCategory(categoryList[0]?.value);
    setMetalColor(metalColorList[0]?.value);
    setMetalPurity(metalPurityList[0]?.value);
    setSearchVal("");
  }

  // function createData(srNo, Date, SKU, Job, Design, Category, PromiseDate, QuotePrice, Status, TotalQty, Supplied) {
  //   return {
  //     srNo, Date, SKU, Job, Design, Category, PromiseDate, QuotePrice, Status, TotalQty, Supplied,
  //   };
  // }

  const handleRequestSort = (property) => {
    let isAsc = ((orderBy === property) && (order === 'asc'));
    if(isAsc){
      setOrder('desc');
    }else{
      setOrder('asc');
    }
    // setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    const sortedData = stableSort(data, getComparator(order, property));
    setData(sortedData); // Update the data array with sorted data
  
    // Update the filterData array with the sorted data
    const sortedFilterData = stableSort(filterData, getComparator(order, property));
    // setPage(0);
    setFilterData(sortedFilterData);

    //  let arr = data?.map((e) => {
    //   e.isJobSelected = false;
    //   return e;
    //  })
    //  setFilterData(arr);
     
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // function descendingComparator(a, b, orderBy) {
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };
  
  // function parseCustomDate(dateString) {
  //   const parts = dateString?.split(' ');
  //   if (parts?.length !== 3) {
  //     throw new Error('Invalid date format');
  //   }
  //   const day = parseInt(parts[0]);
  //   const month = months[parts[1]];
  //   const year = parseInt(parts[2]);
  //   if (isNaN(day) || isNaN(month) || isNaN(year)) {
  //     throw new Error('Invalid date format');
  //   }
  //   return new Date(year, month, day);
  // }
  function parseCustomDate(dateString) {
    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const parts = dateString?.split(' ');
    if (parts?.length !== 3) {
      throw new Error('Invalid date format');
    }
    const day = parseInt(parts[0]);
    const month = months[parts[1].substring(0, 3)]; // Extract the first three characters of the month name
    const year = parseInt(parts[2]);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error('Invalid date format');
    }
    return new Date(year, month, day);
  }
  function descendingComparator(a, b, orderBy) {
    if (!orderBy) return 0; // Add null check for orderBy
    
    if (orderBy === 'Date' || orderBy === 'PDate') {
        try {
            const dateA = parseCustomDate(a[orderBy]);
            const dateB = parseCustomDate(b[orderBy]);

            if (dateB < dateA) {
                return -1;
            }
            if (dateB > dateA) {
                return 1;
            }
            return 0;
        } catch (error) {
            console.error('Error parsing date:', error.message);
            return 0;
        }
    } else if(orderBy === 'FinalAmount'){
      
      const valueA = parseFloat(a[orderBy]) || 0;
      const valueB = parseFloat(b[orderBy]) || 0;

      if (valueB < valueA) {
          return -1;
      }
      if (valueB > valueA) {
          return 1;
      }

      return 0;

    }else if ((orderBy === 'PO') || (orderBy === 'PO') || (orderBy === 'SKUNO') || (orderBy === 'DesignNo')) {
      // Handle sorting for SKU# column
      return customComparator_Col(a[orderBy], b[orderBy]);
  }  else {
        const valueA = a[orderBy]?.toString()?.toLowerCase() || '';
        const valueB = b[orderBy]?.toString()?.toLowerCase() || '';

        if (valueB < valueA) {
            return -1;
        }
        if (valueB > valueA) {
            return 1;
        }
        return 0;
    }
}
  const customComparator_Col = (a, b) => {
  const regex = /([^\d]+)(\d+)/;
  const [, wordA, numA] = a?.match(regex);
  const [, wordB, numB] = b?.match(regex);
  
  if (wordA !== wordB) {
      return wordA?.localeCompare(wordB);
  }
  
  return parseInt(numB, 10) - parseInt(numA, 10);
};
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const storedData = localStorage.getItem('loginUserDetail');
      const data = JSON.parse(storedData);
      const customerid = data?.id;
      // const customerEmail = data.email1;
      // setUserEmail(customerEmail);
      const storeInit = JSON.parse(localStorage.getItem('storeInit'));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        CurrencyRate: "1", FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
      });
      // {"CurrencyRate":"1","FrontEnd_RegNo":"95oztttesi0o50vr","Customerid":"856"}
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        "con": `{\"id\":\"Store\",\"mode\":\"getjob\",\"appuserid\":\"${data?.email1}\"}`,
        "f": "zen (cartcount)",
        p: encodedCombinedValue
      };
      const response = await CommonAPI(body);
      // setCheckboxState(new Array(response?.Data?.rd?.length)?.fill(false));
      setPrintUrl(response?.Data?.rd1[0]?.PrintUrl);
      if (response.Data?.rd) {

        let datass = [];
        let allStatus = [];
        let allCategory = [];
        let allMetalColor = [];
        let allMetalPurity = [];
        
        response?.Data?.rd?.forEach((e, i) => {
          let obj = { ...e };
          obj["checkbox"] = <Checkbox />;
          obj["Sr#"] = i + 1;
          obj["isJobSelected"] = false;
          datass?.push(obj);
          let findStatus = allStatus?.findIndex((ele, ind) => ele?.label === e?.ProgressStatusName);
          let findCategory = allCategory?.findIndex((ele, ind) => ele?.label === e?.Category);
          let findMetalColor = allMetalColor?.findIndex((ele, ind) => ele?.label === e?.MetalColor);
          let findMetalPurity = allMetalPurity?.findIndex((ele, ind) => ele?.label === e?.MetalType);
          if (findStatus === -1) {
            allStatus?.push({ id: allStatus?.length, label: e?.ProgressStatusName, value: e?.ProgressStatusName, });
          }
          if (findCategory === -1) {
            allCategory?.push({ id: allCategory?.length, label: e?.Category, value: e?.Category, });
          }
          if (findMetalColor === -1) {
            allMetalColor?.push({ id: allMetalColor?.length, label: e?.MetalColor, value: e?.MetalColor, });
          }
          if (findMetalPurity === -1) {
            allMetalPurity?.push({ id: allMetalPurity?.length, label: e?.MetalType, value: e?.MetalType, });
          }
        });
        // allStatus?.unshift({ id: allStatus?.length, label: "ALL", value: "ALL" });
        allCategory?.unshift({ id: allCategory?.length, label: "ALL", value: "ALL" });
        allMetalColor?.unshift({ id: allMetalColor?.length, label: "ALL", value: "ALL" });
        allMetalPurity?.unshift({ id: allMetalPurity?.length, label: "ALL", value: "ALL" });
         let allStatus2 = allStatus?.filter((e) => (e?.label !== '' && e?.value !== ''))
        setStatusList(allStatus2);
        setCategoryList(allCategory);
        setmetalColorList(allMetalColor);
        setMetalPurityList(allMetalPurity);
        setStatus(allStatus[0]?.value);
        setCategory(allCategory[0]?.value);
        setMetalColor(allMetalColor[0]?.value);
        setMetalPurity(allMetalPurity[0]?.value);
        setData(datass);
        setFilterData(datass);
      } else {
        alert('nodata')
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    let inputFrom = fromDateRef?.current?.querySelector(".MuiInputBase-root input");
    if (inputFrom) {
      inputFrom.placeholder = 'Date From';
    }
    let inputTo = toDateRef?.current?.querySelector(".MuiInputBase-root input");
    if (inputTo) {
      inputTo.placeholder = 'Date To';
    }
  }, []);


  const handlePrintJobs = async(filterdatas, mainData) => {
      let onlyTrueJobjs = filterdatas?.filter((e) => e?.isJobSelected === true);
      // if(onlyTrueJobjs?.length > 0){

          let allAreChecked = [];
          onlyTrueJobjs?.forEach((e) => {
            let obj = {...e};
              obj.isJobSelected = true;
              allAreChecked.push(obj);
          });


          let jobStringArr = allAreChecked?.map((e) => e?.JobNo)?.toString();
        
            const storedData = localStorage.getItem('loginUserDetail');
            const data = JSON.parse(storedData);
            const customerid = data?.id;
    
          let fromdate =  moment(fromDate)
          let enddate =  moment(toDate)
          let daytextf = fromdate?._i?.$d;
          let daytextt = enddate?._i?.$d;
          
          const startDate = new Date(daytextf);
          const endDate = new Date(daytextt);
          
          const formattedStartDate = moment(startDate).format('DD MMM YYYY');
          const formattedEndDate = moment(endDate).format('DD MMM YYYY');
          
          
          const Farr = [
            {
              Customerid:`${customerid}`,
              DateFill:`${orderProm}`,
              fromdate:`${fromDate === null ? '' : formattedStartDate}`,
              todate:`${toDate === null ? '' : formattedEndDate}`,
              Search:`${searchVal}`,
              Catgeory:`${category?.toLowerCase() === 'all' ? '' : category}`,
              MetalPurity:`${metalPurity?.toLowerCase() === 'all' ? '' : metalPurity}`,
              MetalColor:`${MetalColor?.toLowerCase() === 'all' ? '' : MetalColor}`,
              JobList:`${jobStringArr}`,
              StatusF:`${selectedStatus}`,
              order:`${order === '' ? 'desc' : order}`,
              orderBy:`${orderBy === '' ? 'Date' : orderBy}`,
              // orderProm:`${orderProm}`,
            }
          ]
          const jsonConvert = btoa((JSON.stringify(Farr)));
          
          const printMainUrl = `${PrintUrl}&Farr=${jsonConvert}`;
          
          const form = document.createElement('form');
          form.setAttribute('method', 'post');
          form.setAttribute('action', `${PrintUrl}`);
          form.setAttribute('target', '_blank'); // Opens in a new tab
        
          const dataInput = document.createElement('input');
          dataInput.setAttribute('type', 'hidden');
          dataInput.setAttribute('name', 'Farr');
          dataInput.setAttribute('value', jsonConvert);
          form.appendChild(dataInput);
        
          document.body.appendChild(form);
          
          // Debugging - log the form HTML to see if everything looks correct
          // console.log(form.outerHTML);
        
          // Submit the form
          form.submit();
    

      // }
      // else{
      //   setPrintJobError('Please select any one job for print');
      // }

  }

  // // working code 11-05-2024
  // const handleCheckboxChange = (event, rowIndex, row) => {
  //   console.log(event?.target?.checked);
  //   // const newData = [...filterData]; // Make a copy of the data array
  //   // newData[rowIndex].isJobSelected = event.target.checked; // Update isJobSelected property
  //   // setFilterData(newData); // Update state with the modified data
  //   console.log(event, rowIndex, row);
  //    const newData = filterData.map((row, index) => {
  //   if (index === (page * rowsPerPage + rowIndex)) {
  //     let obj = {...row};
  //     obj.isJobSelected = event?.target?.checked;
  //     row = obj;
  //     return row;
  //     // return obj
  //     // return {
  //     //   ...row,
  //     //   isJobSelected: (event.target.checked ? false : true),
  //     // };
  //   }else{
  //     return row;
  //   }
  // });

  // setFilterData(newData);


  // };
  // // working code 11-05-2024
  // const handleMasterCheckboxChange = (event) => {
  //   const isChecked = event.target.checked;
  
  //   // const newData = filterData.map((row, index) => ({
  //   //   ...row,
  //   //   isJobSelected: (isChecked && index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) || row.isJobSelected,
  //   // }));
  //   // const newData = filterData.map((row, index) => ({
  //   //   ...row,
  //   //   isJobSelected: (isChecked && index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) || row.isJobSelected,
  //   // }));
  
  //   // setFilterData(newData);
  //   // setAllChecked(isChecked);
  //   // const isChecked = event.target.checked;
  //   // setAllChecked(isChecked);
  //   // const newData = filterData.map((row) => ({
  //   //   ...row,
  //   //   isJobSelected: isChecked,
  //   // }));
  //   // setFilterData(isChecked ? [...newData] : []);
    
  //   setAllChecked(isChecked);
  
  //   const newData = filterData.map((row, index) => {
  //     if (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) {
  //       return {
  //         ...row,
  //         isJobSelected: isChecked,
  //       };
  //     }
  //     return row;
  //   });
  
  //   setFilterData(newData);
  // };

  // const handleMasterCheckboxChange = (event) => {
  //   const isChecked = event.target.checked;
  //   setAllChecked(isChecked);
    
  //   const startIndex = page * rowsPerPage;
  //   const endIndex = Math.min((page + 1) * rowsPerPage, filterData.length);
    
  //   // const newData = filterData.map((row, index) => ({
  //   //   ...row,
  //   //   isJobSelected: (index >= startIndex && index < endIndex) ? isChecked : row.isJobSelected,
  //   // }));
    

  // const newData = filterData.map((row, index) => ({
  //   ...row,
  //   isJobSelected: (page * rowsPerPage <= index && index < (page + 1) * rowsPerPage) ? isChecked : row.isJobSelected,
  // }));

  // setFilterData(newData);
  // setAllChecked(isChecked);
    
  //   // setFilterData(newData);
  // };



  



  // const handleCheckboxChange = (event, index) => {
  //   const newState = [...checkboxState];
  //   newState[index] = event.target.checked;
  //   setCheckboxState(newState);
  // };
  

  // const handleMasterCheckboxChange = (event) => {
  //   const isChecked = event.target.checked;
  //   setAllChecked(isChecked);
  //   // Update checkbox state for current page
  //   setCheckboxState((prev) => prev.map(() => isChecked));
  // };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    
  };

 // Inside handleMasterCheckboxChange function
// Inside handleMasterCheckboxChange function
const handleMasterCheckboxChange = (event) => {

  // setOrder(isAsc ? 'desc' : 'asc');
  
  const sortedData = stableSort(data, getComparator(order, orderBy));
  setData(sortedData); // Update the data array with sorted data

  // Update the filterData array with the sorted data
  const sortedFilterData = stableSort(filterData, getComparator(order, orderBy));
  
  setFilterData(sortedFilterData);



  const isChecked = event.target.checked;
  setAllChecked(isChecked);

  // Update the isJobSelected property for all rows in the current page of sortedData array
  const newData = sortedFilterData?.map((row, index) => {
    if (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) {
      return {
        ...row,
        isJobSelected: isChecked,
      };
    }
    return row;
  });
  setFilterData(newData);
};

// Inside handleCheckboxChange function
const handleCheckboxChange = (event, rowIndex) => {

  const sortedData = stableSort(data, getComparator(order, orderBy));
  setData(sortedData); // Update the data array with sorted data

  // Update the filterData array with the sorted data
  const sortedFilterData = stableSort(filterData, getComparator(order, orderBy));
  
  setFilterData(sortedFilterData);

  const newData = sortedFilterData?.map((row, index) => {
    if (index === page * rowsPerPage + rowIndex) {
      return {
        ...row,
        isJobSelected: event.target.checked,
      };
    }
    return row;
  });

  setFilterData(newData);
};


const scrollToTop = () => {
  // Find the table container element and set its scrollTop property to 0
  const tableContainer = document.querySelector('.quotationJobSec');
  if (tableContainer) {
    tableContainer.scrollTop = 0;
  }
};

  return (
    <Box className='smilingSavedAddressMain quotationFiltersText' sx={{ padding: "20px", }}>
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="contained" sx={{ marginBottom: "35px", background: "#7d7f85" }} className='muiSmilingRocksBtn QuotationJobAllBtn' onClick={eve => resetAllFilters(eve)} >All</Button>
        <Box sx={{ padding: "0 20px" }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={orderProm}

            onChange={handleOrderProms}
            sx={{ display: "flex", alignItems: "center", flexDirection: "unset" }}
          >
            <FormControlLabel value="order" className='orderFrom QuotationJobAllBtnSecDate' control={<Radio />} label="Order Date" sx={{ padding: "0 20px 35px 0", marginRight: "0" }} />
            <FormControlLabel value="prom" className='orderFrom QuotationJobAllBtnSecDate' control={<Radio />} label="Promise Date" sx={{ padding: "0 10px 35px 0", marginRight: "0" }} />
          </RadioGroup>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", paddingRight: "15px", paddingBottom: "35px" }} className="QuotationJobAllBtnSec">
            {/* <p className='fs-6 mb-0' style={{minWidth: "50px"}}>Date: </p> */}
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date From"
                  value={fromDate}
                  ref={fromDateRef}
                  // onChange={(newValue) => setFromDate(newValue)}
                  format="DD MM YYYY"
                  className='quotationFilterDates'
                  onChange={(newValue) => {
                    if (newValue === null) {
                      setFromDate(null)
                    } else {
                      if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
                        setFromDate(newValue)
                      } else {

                        Swal.fire({
                          title: "Error !",
                          text: "Enter Valid Date From",
                          icon: "error",
                          confirmButtonText: "ok"
                        });
                        resetAllFilters();
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", paddingBottom: "35px", paddingRight: "15px" }} className="QuotationJobAllBtnSec">
            {/* <p className='fs-6 mb-0' style={{minWidth: "50px"}}>To: </p> */}
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date To"
                  value={toDate}
                  ref={toDateRef}
                  // onChange={(newValue) => setToDate(newValue)}
                  format="DD MM YYYY"
                  className='quotationFilterDates'
                  onChange={(newValue) => {
                    if (newValue === null) {
                      setToDate(null)
                    } else {
                      if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
                        setToDate(newValue)
                      } else {
                        Swal.fire({
                          title: "Error !",
                          text: "Enter Valid Date To",
                          icon: "error",
                          confirmButtonText: "ok"
                        });
                        resetAllFilters();
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
        <Box sx={{ padding: "0 15px 35px 0", }} className="QuotationJobAllBtnSec">
          <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm)}><SearchIcon sx={{ color: "#fff !important" }} /></Button>
        </Box>
        <Box sx={{ position: "relative", padding: "0 15px 40px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
        <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-8px", }}>Status</label>
          {/* <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">ALL</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedStatus} // Assuming selectedStatus is an array of selected values
          onChange={handleStatus} // Assuming handleStatus function receives selected values
          input={<OutlinedInput  />}
          MenuProps={MenuProps}
          // label='ALL'
          className='statusSelect'
          size='small'
          style={{width:'50%'}}
          renderValue={(selected) => (
            <div>
              {selected?.map((value) => (
                <div></div>
                // <Chip key={value} label={value} />
              ))}
            </div>
          )}
        >
          {statusList?.map((status) => (
                <MenuItem key={status.id} value={status.value}>
                  <Checkbox checked={selectedStatus?.indexOf(status.value) > -1} />
                  <ListItemText primary={status.label} />
                </MenuItem>
              ))}
        </Select>
          </FormControl> */}
          
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedStatus} // Assuming selectedStatus is an array of selected values
                onChange={handleStatus} // Assuming handleStatus function receives selected values
                MenuProps={MenuProps}
                input={<OutlinedInput  />}
                style={{minHeight:'2.9375em'}}
                className='statusSelect'
                size='small'
                label='ALL'
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em style={{color:'black'}}>Placeholder</em>;
                  }
      
                  return '';
                }}
                inputProps={{
                  placeholder: 'Placeholder', // Set placeholder directly on the inputProps
              }}
                // renderValue={(selected) => (
                //   <div>
                    
                //     { selected?.length === 0 ? <div>Placeholder</div> : selected?.map((value) => (
                //       <div></div>
                //       // <Chip key={value} label={value} />
                //     ))}
                //   </div>
                // )}
              
              >
                
              {statusList?.map((status) => (
                <MenuItem key={status.id} value={status.value}>
                  <Checkbox checked={selectedStatus?.indexOf(status.value) > -1} />
                  <ListItemText primary={status.label} />
                </MenuItem>
              ))}
            </Select>
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={statuse}
            label="Status"
            onChange={handleStatus}
            className='statusSelect'
          >
            {
              statusList?.map((e, i) => {
                return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
              })
            }
          </Select> */}
        </Box>
        <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
          <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Category</label>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" className='categoryList' value={category} label="Status" onChange={handleCategory} >
            {
              categoryList?.map((e, i) => {
                return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
              })
            }
          </Select>
        </Box>
        <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
          <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Color</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={MetalColor}
            label="Status"
            className='MetalColorList'
            onChange={handleMetalColor}
          >
            {
              metalColorList?.map((e, i) => {
                return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
              })
            }
          </Select>
        </Box>
        <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
          <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Purity</label>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={metalPurity}
            label="Status"
            className='MetalPurityList'
            onChange={handleMetalPurity}
          >
            {
              metalPurityList?.map((e, i) => {
                return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
              })
            }
          </Select>
        </Box>
        {/* <Box sx={{ paddingBottom: "35px", paddingRight: "15px", marginTop: "-5px" }} className="QuotationJobAllBtnSec">
          <Button sx={{ padding: 0, minWidth: "max-content" }}><PrintIcon /></Button>
        </Box> */}
        <Box sx={{ display: "flex", alignItems: "center", position: "relative", padding: "0 15px 35px 0", maxWidth: "max-content" }} className="searchbox QuotationJobAllBtnSec">
          <TextField id="standard-basic" label="Search" variant="outlined" value={searchVal} onChange={eve => {
            setSearchVal(eve?.target?.value);
            setPage(0);
            handleSearch(eve, eve?.target?.value, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm);
          }} />
          <Button sx={{ padding: 0, maxWidth: "max-content", minWidth: "max-content", position: "absolute", right: "20px", color: "#757575" }}
            onClick={eve => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm)}><SearchIcon /></Button>
        </Box>
        <Box sx={{ padding: "0 0px 40px 0", }} className="QuotationJobAllBtnSec">
          <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handlePrintJobs(filterData, data)}><PrintIcon sx={{ color: "#fff !important" }} /></Button>
        </Box>
      </Box>

      <Box sx={{ padding: "0 0 35px 0", marginTop: "-15px" }}>
        {isLoading ?
          <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}><CircularProgress className='loadingBarManage' /></Box> : <Paper sx={{ width: '100%', overflow: 'hidden' }} className='QuoteJobtable'>
            <TableContainer sx={{ maxHeight: 810 }} className='quotationJobSec'>
              <Table stickyHeader aria-label="sticky table" className='quotaionFiltertable'>
                <TableHead>
                  <TableRow>
                  <TableCell style={{backgroundColor: "#ebebeb", color: "#6f6f6f"}}>
                    <Checkbox
                      checked={allChecked}
                      onChange={handleMasterCheckboxChange}
                    />
                  </TableCell>  
                    {columns?.slice(1)?.map((column) => (
                      <TableCell
                        key={column?.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor: "#ebebeb", color: "#6f6f6f", }}
                        onClick={() => handleRequestSort(column?.id)}
                      >
                        {column.label}
                        {orderBy === column.id ? (
                          <span style={{ display: 'flex', alignItems: 'right' }}>
                            {orderBy === column?.id && (<CustomSortIcon order={order} />)}
                          </span>
                        ) : null}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
           

                  {stableSort(filterData, getComparator(order, orderBy))
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row, rowIndex) => {
                      let serialNumber = page * rowsPerPage + rowIndex + 1;
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column, index) => {
                            const value = row[column?.id];
                            return (
                              <TableCell key={column?.id} align={column?.align}>
                              {column.id === 'Sr#' ? serialNumber : 
                                column?.id === 'checkbox' ? 
                                // <Checkbox
                                //     checked={checkboxState[page * rowsPerPage + rowIndex]}
                                //     onChange={(event) => handleCheckboxChange(event, page * rowsPerPage + rowIndex)}
                                //   />
                                  <Checkbox 
                                    checked={row?.isJobSelected} 
                                    onChange={(event) => handleCheckboxChange(event, rowIndex, row)} 
                                  /> 
                                  : 
                                  column?.format && typeof value === 'number'
                                    ? column.format(value)
                                    : column?.id === 'FinalAmount' ? formatAmount(value) : value}
                            </TableCell>
                              // <TableCell key={column?.id} align={column?.align}>
                              //   {column.id === 'Sr#' ? serialNumber : column?.format && typeof value === 'number'
                              //     ? column.format(value)
                              //     : value}
                              // </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filterData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>}
      </Box>


    </Box>
  )
}

export default QuotationJob

// import React, { useEffect, useRef, useState } from 'react';
// import Box from '@mui/material/Box';
// import { Button, Checkbox, CircularProgress, FormControlLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material';
// import "./QuotationJob.css";
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import { DateField } from '@mui/x-date-pickers/DateField';
// import moment from 'moment';
// import SearchIcon from '@mui/icons-material/Search';
// import { useToast } from 'react-toastify';
// import PrintIcon from '@mui/icons-material/Print';
// // import jsonData from "../../../jsonFile/account/quotationfilter.json";
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import { checkMonth, formatAmount } from '../../../../Utils/globalFunctions/GlobalFunction';
// import { CommonAPI } from '../../../../Utils/API/CommonAPI';
// import Swal from 'sweetalert2';
// const CustomSortIcon = ({ order }) => {
//   return (
//     <>
//       {order === 'asc' && <ArrowUpwardIcon />}
//       {order === 'desc' && <ArrowDownwardIcon />}
//     </>
//   );
// };

// const QuotationJob = () => {

//   const [orderProm, setOrderProm] = useState('order');
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [data, setData] = useState([]);
//   const [filterData, setFilterData] = useState([]);
//   const [searchVal, setSearchVal] = useState("");
//   const [orderBy, setOrderBy] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [statusList, setStatusList] = useState([]);
//   const [allChecked, setAllChecked] = useState(false);
//   const [categoryList, setCategoryList] = useState([

//   ]);
//   const [metalColorList, setmetalColorList] = useState([

//   ]);
//   const [metalPurityList, setMetalPurityList] = useState([

//   ]);
//   const [statuse, setStatus] = useState(statusList[0]?.value || "");
//   const [category, setCategory] = useState(categoryList[0]?.value || "");
//   const [MetalColor, setMetalColor] = useState(metalColorList[0]?.value || "");
//   const [metalPurity, setMetalPurity] = useState(metalPurityList[0]?.value || "");

//   const [isLoading, setIsLoading] = useState(false);

//   const fromDateRef = useRef(null);
//   const toDateRef = useRef(null);
//   const [selectedStatus, setSelectedStatus] = useState([]);
  
//   const [PrintUrl, setPrintUrl] = useState('');

//   const handleOrderProms = (event) => {
//     setOrderProm(event.target.value);
//   };
//   const handleStatus = (event) => {
//     setPage(0);
//     setRowsPerPage(10);
//     setStatus(event.target.value);
//     // handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm);
//     handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, category, event.target.value, orderProm);
//   };
//   const handleCategory = (event) => {
//     setPage(0);
//     setRowsPerPage(10);
//     setCategory(event.target.value);
//     handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, event.target.value, statuse, orderProm);
//   };
//   const handleMetalColor = (event) => {
//     setPage(0);
//     setRowsPerPage(10);
//     setMetalColor(event.target.value);
//     handleSearch(event, searchVal, fromDate, toDate, metalPurity, event.target.value, category, statuse, orderProm);
//   };
//   const handleMetalPurity = (event) => {
//     setPage(0);
//     setRowsPerPage(10);
//     setMetalPurity(event.target.value);
//     handleSearch(event, searchVal, fromDate, toDate, event.target.value, MetalColor, category, statuse, orderProm);
//   };
//   moment.locale('en-gb');

//   const columns = [
//     // { id: 'checkbox', label: <Checkbox />, minWidth: 50, align: "center" },
//     { id: 'Sr#', label: 'Sr No', minWidth: 85, align: "center" },
//     { id: 'Date', label: 'Date', minWidth: 130, align: "center" },
//     { id: 'SKUNO', label: 'SKU#', minWidth: 110, align: "center" },
//     { id: 'PO', label: 'PO', minWidth: 110, align: "center" },
//     { id: 'JobNo', label: 'Job#', minWidth: 100, align: "center" },
//     { id: 'DesignNo', label: 'Design#', minWidth: 100, align: "center" },
//     { id: 'Category', label: 'Category', minWidth: 110, align: "center" },
//     { id: 'PDate', label: 'Promise Date', minWidth: 130, align: "center" },
//     { id: 'FinalAmount', label: 'Quote Price', minWidth: 120, align: "center" },
//     { id: 'ProgressStatusName', label: 'Status', minWidth: 120, align: "center" },
//     { id: 'Quantity', label: 'Total Qty', minWidth: 100, align: "center" },
//     { id: 'SuppliedQuantity', label: 'Supplied', minWidth: 100, align: "center" },
//   ];

//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     scrollToTop();
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//     scrollToTop();
//   };

//   const handleSearch = (eve, searchValue, fromDatess, todatess, metalPurities, MetalColors, categories, statuss, orderPromDate) => {
//     let fromdates = `${fromDatess?.["$y"]}-${checkMonth(fromDatess?.["$M"])}-${fromDatess?.["$D"]}`
//     let todates = `${todatess?.["$y"]}-${checkMonth(todatess?.["$M"])}-${todatess?.["$D"]}`
//     let filteredData = [];
//     let count = 0;
//     data?.forEach((e, i) => {
//       let flags = {
//         dateFrom: false,
//         dateTo: false,
//         status: false,
//         category: false,
//         MetalColor: false,
//         search: false,
//         metalPurity: false,
//       }
//       console.log('search value---', statuss);
//       if (searchValue !== "") {
//         if (e?.["Sr#"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["Date"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["SKUNO"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["PO"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["JobNo"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["DesignNo"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["Category"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["metal_color"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["metal_purity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["PDate"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["FinalAmount"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["ProgressStatusName"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["Quantity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
//           e?.["SuppliedQuantity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase())) {
//           flags.search = true;
//         }
//       } else {
//         flags.search = true;
//       }
//       //order date and promise date flag filter
//       let cutDate = "";
//       if (orderPromDate === "order") {
//         cutDate = e?.["Date"]?.split("-");
//       } else {
//         cutDate = e?.["PDate"]?.split("-");
//       }
//       if (cutDate !== undefined) {
//         // if(fromDatess && todatess && moment(fromdates).isSameOrBefore(moment(todates))){


//         cutDate = `${cutDate[2]}-${cutDate[1]}-${cutDate[0]}`;
//         if (!fromdates?.includes(undefined) && !todates?.includes(undefined)) {
//           let fromdat = moment(fromdates);
//           let todat = moment(todates);
//           let cutDat = moment(cutDate);
//           if (moment(fromdat).isSameOrBefore(todat)) {
//             const isBetween = cutDat.isBetween(fromdat, todat);
//             if (isBetween || cutDat.isSame(fromdat) || cutDat.isSame(todat)) {
//               flags.dateTo = true;
//               flags.dateFrom = true;
//             }
//           } else {
//             setTimeout(() => {
//               resetAllFilters();
//             }, 0)
//           }
//         } else if (fromdates?.includes(undefined) && !todates?.includes(undefined)) {
//           // let todat = new Date(todates);
//           // let cutDat = new Date(cutDate);
//           // if (cutDat < todat) {
//           //   flags.dateTo = true;
//           //   flags.dateFrom = true;
//           // }
//           flags.dateTo = true;
//           count++;
//           Swal.fire({
//             title: "Error !",
//             text: "Enter Valid Date From",
//             icon: "error",
//             confirmButtonText: "ok"
//           });
//           // flags.dateFrom = true;

//         } else if (!fromdates?.includes(undefined) && todates?.includes(undefined)) {
//           // let fromdat = new Date(fromdates);
//           // let cutDat = new Date(cutDate);
//           // if (cutDat > fromdat) {
//           //   flags.dateTo = true;
//           //   flags.dateFrom = true;
//           // }
//           // flags.dateTo = true;
//           flags.dateFrom = true;
//           count++;
//           Swal.fire({
//             title: "Error !",
//             text: "Enter Valid Date To",
//             icon: "error",
//             confirmButtonText: "ok"
//           });

//         } else if (fromdates?.includes(undefined) && todates?.includes(undefined)) {
//           flags.dateTo = true;
//           flags.dateFrom = true;
//         }
//         //  }
//       }

//       if (e?.MetalType?.toString()?.toLowerCase()?.startsWith(metalPurities?.toLowerCase()) || metalPurities?.toLowerCase() === "all") {
//         flags.metalPurity = true;
//       }
//       if (e?.MetalColor?.toString()?.toLowerCase()?.startsWith(MetalColors?.toLowerCase()) || MetalColors?.toLowerCase() === "all") {
//         flags.MetalColor = true;
//       }
//       if (e?.Category?.toString()?.toLowerCase()?.startsWith(categories?.toLowerCase()) || categories?.toLowerCase() === "all") {
//         flags.category = true;
//       }
//       // if ((e?.ProgressStatusName?.toString()?.toLowerCase() === statuss?.toLowerCase()) || statuss?.toLowerCase() === "all") {
//       //   flags.status = true;
//       // }
//       if (!Array.isArray(statuss) || statuss?.length === 0) {
//         flags.status = true; // Show all data
//       } else {
//         // Check if any selected status matches the ProgressStatusName
//         if (Array.isArray(statuss)) {
//           if (statuss.includes(e?.ProgressStatusName)) {
//             flags.status = true;
//           }
//         } else {
//           if (e?.ProgressStatusName === statuss || statuss === "all") {
//             flags.status = true;
//           }
//         }
//       }



//       if (flags.dateFrom === true && flags.dateTo === true && flags.status === true && flags.category === true && flags.MetalColor === true && flags.search === true && flags.metalPurity === true) {
//         filteredData.push(e);
//       }

//     });
//     if (count === 0) {
//       setFilterData(filteredData);
//     } else {
//       resetAllFilt();
//       handleSearch(eve, "", null, null, metalPurityList[0]?.value, metalColorList[0]?.value, categoryList[0]?.value, statusList[0]?.value, "order");
//     }
//   }

//   const resetAllFilters = (eve) => {
//     setOrderProm("order");
//     setFromDate(null);
//     setToDate(null);
//     setStatus(statusList[0]?.value);
//     setCategory(categoryList[0]?.value);
//     setMetalColor(metalColorList[0]?.value);
//     setMetalPurity(metalPurityList[0]?.value);
//     setSearchVal("");
//     handleSearch(eve, "", null, null, metalPurityList[0]?.value, metalColorList[0]?.value, categoryList[0]?.value, statusList[0]?.value, "order");
//     setFilterData(data);
//     setAllChecked(false);
//     scrollToTop();
//     setPage(0);
//     setRowsPerPage(10);
//   }

//   const resetAllFilt = () => {
//     setOrderProm("order");
//     setFromDate(null);
//     setToDate(null);
//     setStatus(statusList[0]?.value);
//     setCategory(categoryList[0]?.value);
//     setMetalColor(metalColorList[0]?.value);
//     setMetalPurity(metalPurityList[0]?.value);
//     setSearchVal("");
//   }

//   // function createData(srNo, Date, SKU, Job, Design, Category, PromiseDate, QuotePrice, Status, TotalQty, Supplied) {
//   //   return {
//   //     srNo, Date, SKU, Job, Design, Category, PromiseDate, QuotePrice, Status, TotalQty, Supplied,
//   //   };
//   // }

//   const handleRequestSort = (property) => {
//     // const isAsc = orderBy === property && order === 'asc';
//     // setOrder(isAsc ? 'desc' : 'asc');
//     // setOrderBy(property);
//     let isAsc = ((orderBy === property) && (order === 'asc'));
//     if(isAsc){
//       setOrder('desc');
//     }else{
//       setOrder('asc');
//     }
//     // setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//     const sortedData = stableSort(data, getComparator(order, property));
//     setData(sortedData); // Update the data array with sorted data
  
//     // Update the filterData array with the sorted data
//     const sortedFilterData = stableSort(filterData, getComparator(order, property));
//     // setPage(0);
//     setFilterData(sortedFilterData);
//   };

//   function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) return order;
//       return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
//   }

//   function getComparator(order, orderBy) {
//     return order === 'desc'
//       ? (a, b) => descendingComparator(a, b, orderBy)
//       : (a, b) => -descendingComparator(a, b, orderBy);
//   }

//   // function descendingComparator(a, b, orderBy) {
//   //   if (b[orderBy] < a[orderBy]) {
//   //     return -1;
//   //   }
//   //   if (b[orderBy] > a[orderBy]) {
//   //     return 1;
//   //   }
//   //   return 0;
//   // }
//   const months = {
//     Jan: 0,
//     Feb: 1,
//     Mar: 2,
//     Apr: 3,
//     May: 4,
//     Jun: 5,
//     Jul: 6,
//     Aug: 7,
//     Sep: 8,
//     Oct: 9,
//     Nov: 10,
//     Dec: 11
//   };
  
//   function parseCustomDate(dateString) {
//     const parts = dateString?.split(' ');
//     if (parts.length !== 3) {
//       throw new Error('Invalid date format');
//     }
//     const day = parseInt(parts[0]);
//     const month = months[parts[1]];
//     const year = parseInt(parts[2]);
//     if (isNaN(day) || isNaN(month) || isNaN(year)) {
//       throw new Error('Invalid date format');
//     }
//     return new Date(year, month, day);
//   }
  
// //   function descendingComparator(a, b, orderBy) {
// //     if (!orderBy) return 0; // Add null check for orderBy
    
// //     if (orderBy === 'Date') {
// //         try {
// //             const dateA = parseCustomDate(a[orderBy]);
// //             const dateB = parseCustomDate(b[orderBy]);

// //             if (dateB < dateA) {
// //                 return -1;
// //             }
// //             if (dateB > dateA) {
// //                 return 1;
// //             }
// //             return 0;
// //         } catch (error) {
// //             console.error('Error parsing date:', error.message);
// //             return 0;
// //         }
// //     } else {
// //         const valueA = a[orderBy]?.toString()?.toLowerCase() || '';
// //         const valueB = b[orderBy]?.toString()?.toLowerCase() || '';

// //         if (valueB < valueA) {
// //             return -1;
// //         }
// //         if (valueB > valueA) {
// //             return 1;
// //         }
// //         return 0;
// //     }
// // }
// function descendingComparator(a, b, orderBy) {
//   if (!orderBy) return 0; // Add null check for orderBy
  
//   if (orderBy === 'Date' || orderBy === 'PDate') {
//       try {
//           const dateA = parseCustomDate(a[orderBy]);
//           const dateB = parseCustomDate(b[orderBy]);

//           if (dateB < dateA) {
//               return -1;
//           }
//           if (dateB > dateA) {
//               return 1;
//           }
//           return 0;
//       } catch (error) {
//           console.error('Error parsing date:', error.message);
//           return 0;
//       }
//   } else if(orderBy === 'FinalAmount'){
    
//     const valueA = parseFloat(a[orderBy]) || 0;
//     const valueB = parseFloat(b[orderBy]) || 0;

//     if (valueB < valueA) {
//         return -1;
//     }
//     if (valueB > valueA) {
//         return 1;
//     }

//     return 0;

//   }else if ((orderBy === 'PO') || (orderBy === 'PO') || (orderBy === 'SKUNO') || (orderBy === 'DesignNo')) {
//     // Handle sorting for SKU# column
//     return customComparator_Col(a[orderBy], b[orderBy]);
// }  else {
//       const valueA = a[orderBy]?.toString()?.toLowerCase() || '';
//       const valueB = b[orderBy]?.toString()?.toLowerCase() || '';

//       if (valueB < valueA) {
//           return -1;
//       }
//       if (valueB > valueA) {
//           return 1;
//       }
//       return 0;
//   }
// }
// const customComparator_Col = (a, b) => {
// const regex = /([^\d]+)(\d+)/;
// const [, wordA, numA] = a?.match(regex);
// const [, wordB, numB] = b?.match(regex);

// if (wordA !== wordB) {
//     return wordA?.localeCompare(wordB);
// }

// return parseInt(numB, 10) - parseInt(numA, 10);
// };

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const storedData = localStorage.getItem('loginUserDetail');
//       const data = JSON.parse(storedData);
//       const customerid = data?.id;
//       // const customerEmail = data.email1;
//       // setUserEmail(customerEmail);
//       const storeInit = JSON.parse(localStorage.getItem('storeInit'));
//       const { FrontEnd_RegNo } = storeInit;
//       const combinedValue = JSON.stringify({
//         CurrencyRate: "1", FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
//       });
//       // {"CurrencyRate":"1","FrontEnd_RegNo":"95oztttesi0o50vr","Customerid":"856"}
//       const encodedCombinedValue = btoa(combinedValue);
//       const body = {
//         "con": `{\"id\":\"Store\",\"mode\":\"getjob\",\"appuserid\":\"${data.email1}\"}`,
//         "f": "zen (cartcount)",
//         p: encodedCombinedValue
//       };
//       const response = await CommonAPI(body);
//       setPrintUrl(response?.Data?.rd1[0]?.PrintUrl);
//       if (response.Data?.rd) {

//         let datass = [];
//         let allStatus = [];
//         let allCategory = [];
//         let allMetalColor = [];
//         let allMetalPurity = [];
//         response?.Data?.rd?.forEach((e, i) => {
//           let obj = { ...e };
//           // obj["checkbox"] = <Checkbox />;
//           obj["Sr#"] = i + 1;
//           obj["isJobSelected"] = false;
//           datass?.push(obj);
//           let findStatus = allStatus?.findIndex((ele, ind) => ele?.label === e?.ProgressStatusName);
//           let findCategory = allCategory?.findIndex((ele, ind) => ele?.label === e?.Category);
//           let findMetalColor = allMetalColor?.findIndex((ele, ind) => ele?.label === e?.MetalColor);
//           let findMetalPurity = allMetalPurity?.findIndex((ele, ind) => ele?.label === e?.MetalType);
//           if (findStatus === -1) {
//             allStatus?.push({ id: allStatus?.length, label: e?.ProgressStatusName, value: e?.ProgressStatusName, });
//           }
//           if (findCategory === -1) {
//             allCategory?.push({ id: allCategory?.length, label: e?.Category, value: e?.Category, });
//           }
//           if (findMetalColor === -1) {
//             allMetalColor?.push({ id: allMetalColor?.length, label: e?.MetalColor, value: e?.MetalColor, });
//           }
//           if (findMetalPurity === -1) {
//             allMetalPurity?.push({ id: allMetalPurity?.length, label: e?.MetalType, value: e?.MetalType, });
//           }
//         });
//         allStatus?.unshift({ id: allStatus?.length, label: "ALL", value: "ALL" });
//         let allStatus2 = allStatus?.filter((e) => (e?.label !== '' && e?.value !== ''))
//         setStatusList(allStatus2);
//         allCategory?.unshift({ id: allCategory?.length, label: "ALL", value: "ALL" });
//         allMetalColor?.unshift({ id: allMetalColor?.length, label: "ALL", value: "ALL" });
//         allMetalPurity?.unshift({ id: allMetalPurity?.length, label: "ALL", value: "ALL" });
//         setCategoryList(allCategory);
//         setmetalColorList(allMetalColor);
//         setMetalPurityList(allMetalPurity);
//         setStatus(allStatus[0]?.value);
//         setCategory(allCategory[0]?.value);
//         setMetalColor(allMetalColor[0]?.value);
//         setMetalPurity(allMetalPurity[0]?.value);
//         setData(datass);
//         setFilterData(datass);
//       } else {
//         alert('nodata')
//       }
//     } catch (error) {
//       console.log('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     let inputFrom = fromDateRef?.current?.querySelector(".MuiInputBase-root input");
//     if (inputFrom) {
//       inputFrom.placeholder = 'Date From';
//     }
//     let inputTo = toDateRef?.current?.querySelector(".MuiInputBase-root input");
//     if (inputTo) {
//       inputTo.placeholder = 'Date To';
//     }
//   }, []);

//   const handlePrintJobs = async(filterdatas, mainData) => {
//     let onlyTrueJobjs = filterdatas?.filter((e) => e?.isJobSelected === true);
//     // if(onlyTrueJobjs?.length > 0){

//         let allAreChecked = [];
//         onlyTrueJobjs?.forEach((e) => {
//           let obj = {...e};
//             obj.isJobSelected = true;
//             allAreChecked.push(obj);
//         });


//         let jobStringArr = allAreChecked?.map((e) => e?.JobNo)?.toString();
      
//           const storedData = localStorage.getItem('loginUserDetail');
//           const data = JSON.parse(storedData);
//           const customerid = data?.id;
  
//         let fromdate =  moment(fromDate)
//         let enddate =  moment(toDate)
//         let daytextf = fromdate?._i?.$d;
//         let daytextt = enddate?._i?.$d;
        
//         const startDate = new Date(daytextf);
//         const endDate = new Date(daytextt);
        
//         const formattedStartDate = moment(startDate).format('DD MMM YYYY');
//         const formattedEndDate = moment(endDate).format('DD MMM YYYY');
        
        
//         const Farr = [
//           {
//             Customerid:`${customerid}`,
//             DateFill:`${orderProm}`,
//             fromdate:`${fromDate === null ? '' : formattedStartDate}`,
//             todate:`${toDate === null ? '' : formattedEndDate}`,
//             Search:`${searchVal}`,
//             Catgeory:`${category?.toLowerCase() === 'all' ? '' : category}`,
//             MetalPurity:`${metalPurity?.toLowerCase() === 'all' ? '' : metalPurity}`,
//             MetalColor:`${MetalColor?.toLowerCase() === 'all' ? '' : MetalColor}`,
//             JobList:`${jobStringArr}`,
//             StatusF:`${selectedStatus}`,
//             order:`${order === '' ? 'desc' : order}`,
//             orderBy:`${orderBy === '' ? 'Date' : orderBy}`,
//             // orderProm:`${orderProm}`,
//           }
//         ]
//         const jsonConvert = btoa((JSON.stringify(Farr)));
        
//         const printMainUrl = `${PrintUrl}&Farr=${jsonConvert}`;
        
//         const form = document.createElement('form');
//         form.setAttribute('method', 'post');
//         form.setAttribute('action', `${PrintUrl}`);
//         form.setAttribute('target', '_blank'); // Opens in a new tab
      
//         const dataInput = document.createElement('input');
//         dataInput.setAttribute('type', 'hidden');
//         dataInput.setAttribute('name', 'Farr');
//         dataInput.setAttribute('value', jsonConvert);
//         form.appendChild(dataInput);
      
//         document.body.appendChild(form);
        
//         // Debugging - log the form HTML to see if everything looks correct
//         // console.log(form.outerHTML);
      
//         // Submit the form
//         form.submit();
  

//     // }
//     // else{
//     //   setPrintJobError('Please select any one job for print');
//     // }

// }
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
  
// };

// // Inside handleMasterCheckboxChange function
// // Inside handleMasterCheckboxChange function
// const handleMasterCheckboxChange = (event) => {

// // setOrder(isAsc ? 'desc' : 'asc');

// const sortedData = stableSort(data, getComparator(order, orderBy));
// setData(sortedData); // Update the data array with sorted data

// // Update the filterData array with the sorted data
// const sortedFilterData = stableSort(filterData, getComparator(order, orderBy));

// setFilterData(sortedFilterData);



// const isChecked = event.target.checked;
// setAllChecked(isChecked);

// // Update the isJobSelected property for all rows in the current page of sortedData array
// const newData = sortedFilterData?.map((row, index) => {
//   if (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) {
//     return {
//       ...row,
//       isJobSelected: isChecked,
//     };
//   }
//   return row;
// });
// setFilterData(newData);
// };

// // Inside handleCheckboxChange function
// const handleCheckboxChange = (event, rowIndex) => {

// const sortedData = stableSort(data, getComparator(order, orderBy));
// setData(sortedData); // Update the data array with sorted data

// // Update the filterData array with the sorted data
// const sortedFilterData = stableSort(filterData, getComparator(order, orderBy));

// setFilterData(sortedFilterData);

// const newData = sortedFilterData?.map((row, index) => {
//   if (index === page * rowsPerPage + rowIndex) {
//     return {
//       ...row,
//       isJobSelected: event.target.checked,
//     };
//   }
//   return row;
// });

// setFilterData(newData);
// };


// const scrollToTop = () => {
// // Find the table container element and set its scrollTop property to 0
// const tableContainer = document.querySelector('.quotationJobSec');
// if (tableContainer) {
//   tableContainer.scrollTop = 0;
// }
// };
//   return (
//     <Box className='smilingSavedAddressMain quotationFiltersText' sx={{ padding: "20px", }}>
//       <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
//         <Button variant="contained" sx={{ marginBottom: "35px", background: "#7d7f85" }} className='muiSmilingRocksBtn QuotationJobAllBtn' onClick={eve => resetAllFilters(eve)} >All</Button>
//         <Box sx={{ padding: "0 20px" }}>
//           <RadioGroup
//             aria-labelledby="demo-controlled-radio-buttons-group"
//             name="controlled-radio-buttons-group"
//             value={orderProm}

//             onChange={handleOrderProms}
//             sx={{ display: "flex", alignItems: "center", flexDirection: "unset" }}
//           >
//             <FormControlLabel value="order" className='orderFrom QuotationJobAllBtnSecDate' control={<Radio />} label="Order Date" sx={{ padding: "0 20px 35px 0", marginRight: "0" }} />
//             <FormControlLabel value="prom" className='orderFrom QuotationJobAllBtnSecDate' control={<Radio />} label="From. Date" sx={{ padding: "0 10px 35px 0", marginRight: "0" }} />
//           </RadioGroup>
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
//           <Box sx={{ display: "flex", alignItems: "center", paddingRight: "15px", paddingBottom: "35px" }} className="QuotationJobAllBtnSec">
//             {/* <p className='fs-6 mb-0' style={{minWidth: "50px"}}>Date: </p> */}
//             <Box>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="Date From"
//                   value={fromDate}
//                   ref={fromDateRef}
//                   // onChange={(newValue) => setFromDate(newValue)}
//                   format="DD MM YYYY"
//                   className='quotationFilterDates'
//                   onChange={(newValue) => {
//                     if (newValue === null) {
//                       setFromDate(null)
//                     } else {
//                       if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
//                         setFromDate(newValue)
//                       } else {

//                         Swal.fire({
//                           title: "Error !",
//                           text: "Enter Valid Date From",
//                           icon: "error",
//                           confirmButtonText: "ok"
//                         });
//                         resetAllFilters();
//                       }
//                     }
//                   }}
//                 />
//               </LocalizationProvider>
//             </Box>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", paddingBottom: "35px", paddingRight: "15px" }} className="QuotationJobAllBtnSec">
//             {/* <p className='fs-6 mb-0' style={{minWidth: "50px"}}>To: </p> */}
//             <Box>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   label="Date To"
//                   value={toDate}
//                   ref={toDateRef}
//                   // onChange={(newValue) => setToDate(newValue)}
//                   format="DD MM YYYY"
//                   className='quotationFilterDates'
//                   onChange={(newValue) => {
//                     if (newValue === null) {
//                       setToDate(null)
//                     } else {
//                       if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
//                         setToDate(newValue)
//                       } else {
//                         Swal.fire({
//                           title: "Error !",
//                           text: "Enter Valid Date To",
//                           icon: "error",
//                           confirmButtonText: "ok"
//                         });
//                         resetAllFilters();
//                       }
//                     }
//                   }}
//                 />
//               </LocalizationProvider>
//             </Box>
//           </Box>
//         </Box>
//         <Box sx={{ padding: "0 15px 35px 0", }} className="QuotationJobAllBtnSec">
//           <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm)}><SearchIcon sx={{ color: "#fff !important" }} /></Button>
//         </Box>
//         <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
//           <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Status</label>

//           {/* <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={statuse}
//             label="Status"
//             onChange={handleStatus}
//             className='statusSelect'
//           >
//             {
//               statusList?.map((e, i) => {
//                 return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
//               })
//             }
//           </Select> */}
//             <Select
//                 labelId="demo-multiple-checkbox-label"
//                 id="demo-multiple-checkbox"
//                 multiple
//                 value={selectedStatus} // Assuming selectedStatus is an array of selected values
//                 onChange={handleStatus} // Assuming handleStatus function receives selected values
//                 MenuProps={MenuProps}
//                 input={<OutlinedInput  />}
//                 style={{minHeight:'1.8375em'}}
//                 className='statusSelect'
//                 size='small'
//                 label='ALL'
//                 renderValue={(selected) => {
//                   if (selected.length === 0) {
//                     return <em style={{color:'black'}}>Placeholder</em>;
//                   }
      
//                   return '';
//                 }}
//                 inputProps={{
//                   placeholder: 'Placeholder', // Set placeholder directly on the inputProps
//               }}
//                 // renderValue={(selected) => (
//                 //   <div>
                    
//                 //     { selected?.length === 0 ? <div>Placeholder</div> : selected?.map((value) => (
//                 //       <div></div>
//                 //       // <Chip key={value} label={value} />
//                 //     ))}
//                 //   </div>
//                 // )}
              
//               >
                
//               {statusList?.map((status) => (
//                 <MenuItem key={status.id} value={status.value}>
//                   <Checkbox checked={selectedStatus?.indexOf(status.value) > -1} />
//                   <ListItemText primary={status.label} />
//                 </MenuItem>
//               ))}
//             </Select>
//         </Box>
//         <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
//           <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Category</label>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             className='categoryList'
//             value={category}
//             label="Status"
//             onChange={handleCategory}
//           >
//             {
//               categoryList?.map((e, i) => {
//                 return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
//               })
//             }
//           </Select>
//         </Box>
//         <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
//           <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Color</label>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={MetalColor}
//             label="Status"
//             className='MetalColorList'
//             onChange={handleMetalColor}
//           >
//             {
//               metalColorList?.map((e, i) => {
//                 return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
//               })
//             }
//           </Select>
//         </Box>
//         <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
//           <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Purity</label>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={metalPurity}
//             label="Status"
//             className='MetalPurityList'
//             onChange={handleMetalPurity}
//           >
//             {
//               metalPurityList?.map((e, i) => {
//                 return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
//               })
//             }
//           </Select>
//         </Box>
//         {/* <Box sx={{ paddingBottom: "35px", paddingRight: "15px", marginTop: "-5px" }} className="QuotationJobAllBtnSec">
//           <Button sx={{ padding: 0, minWidth: "max-content" }}><PrintIcon /></Button>
//         </Box> */}
//         <Box sx={{ display: "flex", alignItems: "center", position: "relative", padding: "0 15px 35px 0", maxWidth: "max-content" }} className="searchbox QuotationJobAllBtnSec">
//           <TextField id="standard-basic" label="Search" variant="outlined" value={searchVal} onChange={eve => {
//             setSearchVal(eve?.target?.value);
//             setPage(0);
//             handleSearch(eve, eve?.target?.value, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm);
//           }} />
//           <Button sx={{ padding: 0, maxWidth: "max-content", minWidth: "max-content", position: "absolute", right: "20px", color: "#757575" }}
//             onClick={eve => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm)}><SearchIcon /></Button>
//         </Box>
//         <Box sx={{ padding: "0 0px 40px 0", }} className="QuotationJobAllBtnSec">
//           <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handlePrintJobs(filterData, data)}><PrintIcon sx={{ color: "#fff !important" }} /></Button>
//         </Box>
//       </Box>

//       <Box sx={{ padding: "0 0 35px 0", marginTop: "-15px" }}>
//         {isLoading ?
//           <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}><CircularProgress className='loadingBarManage' /></Box> : <Paper sx={{ width: '100%', overflow: 'hidden' }} className='QuoteJobtable'>
//             <TableContainer sx={{ maxHeight: 810 }} className='quotationJobSec'>
//               <Table stickyHeader aria-label="sticky table" className='quotaionFiltertable'>
//                 <TableHead>
//                   <TableRow>
//                   <TableCell style={{backgroundColor: "#ebebeb", color: "#6f6f6f"}}>
//                     <Checkbox
//                       checked={allChecked}
//                       onChange={handleMasterCheckboxChange}
//                     />
//                   </TableCell>  
//                     {columns.map((column) => (
//                       <TableCell
//                         key={column.id}
//                         align={column.align}
//                         style={{ minWidth: column.minWidth, backgroundColor: "#ebebeb", color: "#6f6f6f" }}
//                         onClick={() => handleRequestSort(column.id)}
//                       >
//                         {column.label}
//                         {orderBy === column.id ? (
//                           <span style={{ display: 'flex', alignItems: 'center' }}>
//                             {orderBy === column.id && (<CustomSortIcon order={order} />)}
//                           </span>
//                         ) : null}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {/* {stableSort(filterData, getComparator(order, orderBy))
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row) => {
//                       return (
//                         <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                           {columns.map((column) => {
//                             const value = row[column.id];
//                             return (
//                               <TableCell key={column.id} align={column.align}>
//                                 {column.format && typeof value === 'number'
//                                   ? column.format(value)
//                                   : value}
//                               </TableCell>
//                             );
//                           })}
//                         </TableRow>
//                       );
//                     })} */}

//                   {/* {stableSort(filterData, getComparator(order, orderBy))
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row, rowIndex) => {
//                       let serialNumber = page * rowsPerPage + rowIndex + 1;
//                       return (
//                         <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                           {columns.map((column, index) => {
//                             const value = row[column.id];
//                             return (
//                               <TableCell key={column.id} align={column.align}>
//                                 {column.id === 'Sr#' ? serialNumber : column.format && typeof value === 'number'
//                                   ? column.format(value)
//                                   : value}
//                               </TableCell>
//                             );
//                           })}
//                         </TableRow>
//                       );
//                     })} */}
//                      {stableSort(filterData, getComparator(order, orderBy))
//                     ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     ?.map((row, rowIndex) => {
//                       let serialNumber = page * rowsPerPage + rowIndex + 1;
//                       return (
//                         <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                           {columns.map((column, index) => {
//                             const value = row[column?.id];
//                             return (
//                               <TableCell key={column?.id} align={column?.align}>
//                               {column.id === 'Sr#' ? serialNumber : 
//                                 column?.id === 'checkbox' ? ''
//                                 // <Checkbox
//                                 //     checked={checkboxState[page * rowsPerPage + rowIndex]}
//                                 //     onChange={(event) => handleCheckboxChange(event, page * rowsPerPage + rowIndex)}
//                                 //   />
//                                   // <Checkbox 
//                                   //   checked={row?.isJobSelected} 
//                                   //   onChange={(event) => handleCheckboxChange(event, rowIndex, row)} 
//                                   // /> 
                                  
//                                   : 
//                                   column?.format && typeof value === 'number'
//                                     ? column.format(value)
//                                     : column?.id === 'FinalAmount' ? formatAmount(value) : value}
//                             </TableCell>
//                               // <TableCell key={column?.id} align={column?.align}>
//                               //   {column.id === 'Sr#' ? serialNumber : column?.format && typeof value === 'number'
//                               //     ? column.format(value)
//                               //     : value}
//                               // </TableCell>
//                             );
//                           })}
//                         </TableRow>
//                       );
//                     })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <TablePagination
//               rowsPerPageOptions={[10, 25, 100]}
//               component="div"
//               count={filterData.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Paper>}
//       </Box>


//     </Box>
//   )
// }

// export default QuotationJob
