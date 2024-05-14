import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css'
import Tooltip from '@mui/material/Tooltip';
import { Badge, Dialog, Divider, Drawer, SwipeableDrawer, Tabs, TextField } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { PiStarThin } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { ABOUT_US, ACCOUNT, BLOG, CELEBRITY, CUSTERM_SERVICES, ETERNITY_BANDS, FINE_JEWELLERY_GIFTS, FOR_HIM, FREE_INTERNATIONAL_SHIPPING, IMPACT, LAB_GROWN, LIFETIME_WARRANTY, LOGIN, LOGOUT_MESSAGE, LOOK_BOOK, MONEY_BACK_GUARANTEE, PRESS, SHOP } from "../../../../lib/consts/Strings";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiStarFourThin } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CartListCounts, HeaderData, HeaderData2, WishListCounts, companyLogo, loginState, menuTransfData, newMenuData, openSignInModal, searchData } from "../../../../../../Recoil/atom";
import { CommonAPI } from "../../../../Utils/API/CommonAPI";
import Cart from "./Cart";
// import titleImg from "../../../assets/title/sonasons.png"
// import titleImg from "../../../assets/Logo1.png";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ScrollToView, storImagePath } from "../../../../Utils/globalFunctions/GlobalFunction";
import { productListApiCall } from "../../../../Utils/API/ProductListAPI";
import { getDesignPriceList } from "../../../../Utils/API/PriceDataApi";
import { FaPowerOff } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import Tab from '@mui/material/Tab';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import { FilterAPI, FilterListAPI } from "../../../../Utils/API/FilterListAPI";

export default function Header() {
  // const [titleImg, setTitleImg ] = useState() 
  const navigation = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState(1);
  const [serachsShowOverlay, setSerachShowOverlay] = useState(false);
  const [drawerShowOverlay, setDrawerShowOverlay] = useState(false);
  const [searchText, setSearchText] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCollection, setIsOpenCollection] = useState(false);
  const [isOpenBouti, setIsOpenBouti] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const [menu1Index, setMenu1Index] = useState(null);
  const [menu2Index, setMenu2Index] = useState(null);
  const [menu1Data, setMenu1Data] = useState()
  const [menu2Data, setMenu2Data] = useState()
  const [menuData, setMenuData] = useState([]);

  const getCartListCount = useRecoilValue(CartListCounts)
  const getWishListCount = useRecoilValue(WishListCounts)
  const setHeaderData = useSetRecoilState(HeaderData)
  const setHeaderData2 = useSetRecoilState(HeaderData2)
  const setMenutransData = useSetRecoilState(menuTransfData)

  const [menul0data, setMenul0data] = useState([])
  const [menul1data, setMenul1data] = useState([])
  const [menul2data, setMenul2data] = useState([])

  const [leval0Data, setLeval0Data] = useState()

  // const [newMenu1Data,setNewMenu1Data] = useState([])
  // const [newMenu2Data,setNewMenu2Data] = useState([])
  // const [newMenu3Data,setNewMenu3Data] = useState([])

  const setNewMenuData = useSetRecoilState(newMenuData)
  // console.log("menu1Index",finalData?.map((fd)=>fd?.param1)[menu1Index])

  const separateData = (menuData) => {
    // let tempMenu0data = [];
    // let tempMenu1data = [];
    // let tempMenu2data = [];

    // menuData?.forEach(item => {
    //     // Extract data for menu0data
    //     let menu0 = {
    //         menuname: item.menuname,
    //         param0dataname: item.param0dataname,
    //         param0dataid: item.param0dataid,
    //         param0name: item.param0name,
    //         param0id: item.param0id
    //     };
    //     tempMenu0data.push(menu0);

    //     // Extract data for menu1data
    //     let menu1 = {
    //         param1id: item.param1id,
    //         param1name: item.param1name,
    //         param1dataid: item.param1dataid,
    //         param1dataname: item.param1dataname
    //     };
    //     tempMenu1data.push(menu1);

    //     // Extract data for menu2data
    //     let menu2 = {
    //         param2id: item.param2id,
    //         param2name: item.param2name,
    //         param2dataid: item.param2dataid,
    //         param2dataname: item.param2dataname
    //     };
    //     tempMenu2data.push(menu2);
    // });

    let tempMenu0data = Array.from(new Set(menuData?.map(item => JSON.stringify({
      menuname: item.menuname,
      param0dataname: item.param0dataname,
      param0dataid: item.param0dataid,
      param0name: item.param0name,
      param0id: item.param0id
    }))))?.map(item => JSON.parse(item));

    let tempMenu1data = Array.from(new Set(menuData?.map(item => JSON.stringify({
      param1id: item.param1id,
      param1name: item.param1name,
      param1dataid: item.param1dataid,
      param1dataname: item.param1dataname
    }))))?.map(item => JSON.parse(item));

    let tempMenu2data = Array.from(new Set(menuData?.map(item => JSON.stringify({
      param2id: item.param2id,
      param2name: item.param2name,
      param2dataid: item.param2dataid,
      param2dataname: item.param2dataname
    }))))?.map(item => JSON.parse(item));

    // Update states
    setMenul0data(tempMenu0data)
    setMenul1data(tempMenu1data)
    setMenul2data(tempMenu2data)
  };

  const handelNewMenuData = async (param) => {
    setNewMenuData(param)
    setIsDropdownOpen(false)
    setDrawerShowOverlay(false)
    setDrawerShowOverlay(false)
    localStorage.setItem("menuparams", JSON.stringify(param))
    await productListApiCall(param).then((res) => {
      if (res) {
        console.log("res", res);
        localStorage.setItem("allproductlist", JSON.stringify(res))
      }
      return res
    }).then(async(res)=>{
      if(res){
        let autoCodeList = JSON.parse(localStorage.getItem("autoCodeList"))
        console.log("autoCodeList",autoCodeList)
        await getDesignPriceList(param,1,{},{},autoCodeList)
        navigation("/productpage", { state: { menuFlag: true }})
      }

    })
  }


  useEffect(() => {
    separateData();
  }, []);


  // const handelmenu1 = (param) => {
  //   localStorage.setItem('productDataShow', 'true');
  //   setIsDropdownOpen(false)
  //   navigation("/productpage")
  //   setHeaderData(param)
  // }

  // const handelMenu0 = () => {
  //   setIsDropdownOpen(false)
  //   navigation("/productpage")
  // }


  // const handelmenu2 = (param) => {
  //   setIsDropdownOpen(false)
  //   navigation("/productpage")
  //   setHeaderData2(param)
  // }

  // const transformData = (data) => {

  //   const transformedData = data?.reduce((acc, item) => {
  //     const existingItem = acc.find(i => i.lavelid === item.levelid);
  //     if (existingItem) {
  //       const existingParam1 = existingItem.param1.find(p => p.param1dataid === item.param1dataid);
  //       if (existingParam1) {
  //         if (item.param2id) {
  //           const existingParam2 = existingParam1.param2.find(p => p.param2dataid === item.param2dataid);
  //           if (existingParam2) {
  //             // If param2dataid already exists, do nothing
  //           } else {
  //             // Add new param2
  //             existingParam1.param2.push({
  //               param2id: item.param2id,
  //               param2name: item.param2name,
  //               param2dataid: item.param2dataid,
  //               param2dataname: item.param2dataname
  //             })
  //           }
  //         }
  //       } else {
  //         const newItem = {
  //           param1id: item.param1id,
  //           param1name: item.param1name,
  //           param1dataid: item.param1dataid,
  //           param1dataname: item.param1dataname,
  //           param2: []
  //         };
  //         if (item.param2id) {
  //           newItem.param2.push({
  //             param2id: item.param2id,
  //             param2name: item.param2name,
  //             param2dataid: item.param2dataid,
  //             param2dataname: item.param2dataname
  //           });
  //         }
  //         existingItem.param1.push(newItem);
  //       }
  //     } else {
  //       const newItem = {
  //         lavelid: item.levelid,
  //         menuname: item.menuname,
  //         link: item.link || '',
  //         param0id: item.param0id || '',
  //         param0name: item.param0name || '',
  //         param0dataid: item.param0dataid || '',
  //         param0dataname: item.param0dataname || '',
  //         param1: []
  //       };
  //       if (item.param1id) {
  //         const newParam1 = {
  //           param1id: item.param1id,
  //           param1name: item.param1name,
  //           param1dataid: item.param1dataid,
  //           param1dataname: item.param1dataname,
  //           param2: []
  //         };
  //         if (item.param2id) {
  //           newParam1.param2.push({
  //             param2id: item.param2id,
  //             param2name: item.param2name,
  //             param2dataid: item.param2dataid,
  //             param2dataname: item.param2dataname
  //           });
  //         }
  //         newItem.param1.push(newParam1);
  //       }
  //       acc.push(newItem);
  //     }
  //     return acc;
  //   }, []);

  //   setFinalData(transformedData);
  // };

  // const transformData = (data) => {
  //   const transformedData = data?.reduce((acc, item) => {
  //     const existingItem = acc.find(i => i.levelid === item.levelid);
  //     if (existingItem) {
  //       const existingParam1 = existingItem.param1.find(p => p.param1dataid === item.param1dataid);
  //       if (existingParam1) {
  //         if (item.param2id) {
  //           const existingParam2 = existingParam1.param2.find(p => p.param2dataid === item.param2dataid);
  //           if (!existingParam2) {
  //             existingParam1.param2.push({
  //               param2id: item.param2id,
  //               param2name: item.param2name,
  //               param2dataid: item.param2dataid,
  //               param2dataname: item.param2dataname
  //             });
  //           }
  //         }
  //       } else {
  //         const newParam1 = {
  //           param1id: item.param1id,
  //           param1name: item.param1name,
  //           param1dataid: item.param1dataid,
  //           param1dataname: item.param1dataname,
  //           menuname: item.menuname, // Include menuname here
  //           param2: []
  //         };
  //         if (item.param2id) {
  //           newParam1.param2.push({
  //             param2id: item.param2id,
  //             param2name: item.param2name,
  //             param2dataid: item.param2dataid,
  //             param2dataname: item.param2dataname
  //           });
  //         }
  //         existingItem.param1.push(newParam1);
  //       }
  //     } else {
  //       const newItem = {
  //         levelid: item.levelid,
  //         menuname: item.menuname,
  //         param0dataname: item.param0dataname,
  //         param0dataid: item.param0dataid,
  //         param0name: item.param0name,
  //         param0id: item.param0id,
  //         param1: []
  //       };
  //       if (item.param1id) {
  //         const newParam1 = {
  //           param1id: item.param1id,
  //           param1name: item.param1name,
  //           param1dataid: item.param1dataid,
  //           param1dataname: item.param1dataname,
  //           menuname: item.menuname, // Include menuname here
  //           param2: []
  //         };
  //         if (item.param2id) {
  //           newParam1.param2.push({
  //             param2id: item.param2id,
  //             param2name: item.param2name,
  //             param2dataid: item.param2dataid,
  //             param2dataname: item.param2dataname
  //           });
  //         }
  //         newItem.param1.push(newParam1);
  //       }
  //       acc.push(newItem);
  //     }
  //     return acc;
  //   }, []);

  //   setFinalData(transformedData);
  // };
  // console.log('finalData---', finalData);


  const [islogin, setislogin] = useRecoilState(loginState);
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(companyLogo)
  const titleImg = useRecoilValue(companyLogo);
  const [isB2bFlag, setIsB2BFlag] = useState('');
  const fetchData = () => {
    const value = localStorage.getItem('LoginUser');
    const val = (value === 'true' ? 'true' : 'false')
    setislogin(val);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (titleImg.length == 0) {
      const storeInit = JSON.parse(localStorage.getItem('storeInit'));
      setCompanyTitleLogo(storeInit?.companylogo);
    }
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     const storeInit = JSON.parse(localStorage.getItem('storeInit')) ?? "";
  //     if(storeInit){
  //       setTitleImg(titleImge)
  //     }
  //     const { IsB2BWebsite } = storeInit;
  //     setIsB2BFlag(1);
  //     // setIsB2BFlag(IsB2BWebsite);
  //   }, 300);
  // }, [])

  const getMenuApi = async () => {

    const storeInit = JSON.parse(localStorage.getItem("storeInit")) ?? ""
    const Customer_id = JSON.parse(localStorage.getItem("loginUserDetail")) ?? ""
    // if (storeInit && Customer_id) {
    let pData = JSON.stringify({ "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${Customer_id?.id ?? 0}` })

    let pEnc = btoa(pData)

    const body = {
      con: "{\"id\":\"\",\"mode\":\"GETMENU\",\"appuserid\":\"nimesh@ymail.in\"}",
      f: "onload (GETMENU)",
      p: pEnc
    }

    await CommonAPI(body).then((res) => {
      console.log("getmenuData", res?.Data?.rd)
      setMenuData(res?.Data?.rd)
      // transformData(res?.Data?.rd)
      separateData(res?.Data?.rd)

    })
    // }
  }

  useEffect(() => {
    if (islogin === 'true') {
      getMenuApi()
      const storeInit = JSON.parse(localStorage.getItem('storeInit')) ?? "";
      const { IsB2BWebsite } = storeInit;
      setIsB2BFlag(1);
      // setIsB2BFlag(IsB2BWebsite);
    }
  }, [islogin])

  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  const toggleListCollection = () => {
    setIsOpenCollection(!isOpenCollection);
  };
  const toggleListBouti = () => {
    setIsOpenBouti(!isOpenBouti);
  };


  const toggleOverlay = () => {
    setSearchText('');
    setSerachShowOverlay(!serachsShowOverlay);
  };

  const toggleDrawerOverlay = () => {
    setDrawerShowOverlay(!drawerShowOverlay);
  };


  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isHeaderFixedDropShow, setIsHeaderFixedDropShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 100);
      setIsHeaderFixedDropShow(scrollPosition > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [openCart, setOpenCart] = useState(false);
  const toggleCartDrawer = (isOpen) => (event) => {
    if (isB2bFlag === 1) {
      navigation('/CartPage');
    } else {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setOpenCart(isOpen);
    }
  };


  const setGSearch = useSetRecoilState(searchData);
  function searchDataFucn(e) {
    if (e.key === 'Enter') {
      let ProductApiData2 = JSON.parse(localStorage.getItem("allproductlist"));
      console.log('ProductApiData2', ProductApiData2);
      if (ProductApiData2) {
        let searchText = e.target.value.toLowerCase();
        console.log('searchhhhhhh', searchText);
        let data = ProductApiData2.filter((pd) => {
          for (const key in pd) {
            if (pd.hasOwnProperty(key) && pd[key]?.toString().toLowerCase().includes(searchText)) {
              return true;
            }
          }
          return false;
        });
        console.log('searchhhhhhhdddddddddd', data);
        if (data.length > 0) {
          setGSearch(data);
          navigation('/productpage');
          toggleOverlay();
        } else {
          setGSearch([]);
        }
      } else {
        setGSearch([]);
      }
    }
  }

  function capitalizeText(text) {
    return text?.toLowerCase()?.split(' ').map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  const setIsLoginState = useSetRecoilState(loginState)
  const handleLogout = () => {
    setIsLoginState('false')
    localStorage.clear();
    localStorage.setItem('LoginUser', 'false');
    localStorage.removeItem('storeInit');
    localStorage.removeItem('loginUserDetail');
    localStorage.removeItem('remarks');
    localStorage.removeItem('selectedAddressId');
    localStorage.removeItem('orderNumber');
    localStorage.removeItem('registerEmail');
    localStorage.removeItem('UploadLogicalPath');
    localStorage.removeItem('remarks');
    localStorage.removeItem('registerMobile');
    navigation('/')
    window.location.reload();
  }

  // close menu header when click outside
  // this code for Menu data
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [expandedMenu, setExpandedMenu] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpandedMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // const handleMenuClick = (index) => {
  //   if (expandedMenu === index) {
  //     setExpandedMenu(null);
  //   } else {
  //     setExpandedMenu(index);
  //     // Load data for the selected menu item
  //     setSelectedData(menuItems[index]?.param1 || []);
  //   }
  // };
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleMouseEnter = (index, param) => {
    setHoveredIndex(index);
    setExpandedMenu(index);
    setSelectedData(menuItems[index] || []);
    document.body.style.overflow = 'hidden';
  };
  const handleMouseLeave = (index) => {
      setExpandedMenu(null);
      document.body.style.overflow = 'auto';
  };

  const handleMenuClick = async (param1Item, param2Item) => {
    let menuDataWithoutParam1;

    if (param1Item?.param0dataid) {
      const { param1, ...menuData } = { ...param1Item, param2Item };
      menuDataWithoutParam1 = menuData;
    } else if (param1Item?.param1dataname) {
      const { param2, ...menuData } = { ...param1Item, ...param2Item };
      menuData.param0dataid = param1Item.param0dataid;
      menuDataWithoutParam1 = menuData;
    }
    console.log('menuDataWithoutParam1', menuDataWithoutParam1);

    let finalData = {
      menuname: (leval0Data && leval0Data?.menuname) || (menuDataWithoutParam1 && menuDataWithoutParam1?.menuname) || "",
      FilterKey: (leval0Data && leval0Data.param0name) || (menuDataWithoutParam1 && menuDataWithoutParam1.param0name) || "",
      FilterVal: (leval0Data && leval0Data.param0dataname) || (menuDataWithoutParam1 && menuDataWithoutParam1.param0dataname) || "",
      FilterKey1: menuDataWithoutParam1?.param1name ?? "",
      FilterVal1: menuDataWithoutParam1?.param1dataname ?? "",
      FilterKey2: menuDataWithoutParam1?.param2name ?? "",
      FilterVal2: menuDataWithoutParam1?.param2dataname ?? ""
    }

    console.log('finalData', finalData);

    if (finalData) {
      let resData;
      await FilterListAPI(finalData)
      await productListApiCall(finalData).then((res) => {
        if (res) {
          resData = res;
          console.log("res", res);
          setMenutransData(res)
          localStorage.setItem("allproductlist", JSON.stringify(res))
          localStorage.setItem("finalAllData", JSON.stringify(res))
        }
        return res
      }).then(async(res)=>{
        if(res){
          let autoCodeList = JSON.parse(localStorage.getItem("autoCodeList"))
          await getDesignPriceList(finalData,1,{},{},autoCodeList)
          navigation("/productpage", { state: { menuFlag: true, filtervalue: finalData } })
          setTimeout(() => {
            setDrawerOpen(false);
            handleMouseLeave();
          }, 100)
        }
      })
    }

    console.log('menuData', finalData);
    localStorage.setItem('menuparams', JSON.stringify(finalData));
  };




  // const handleMenuClick = (index) => {
  //   console.log('index--', index);
  //   console.log("index--", index);
  //   console.log("This function is Calling");
  //   setSelectedData(menuItems[index]?.param1 || []);
  //   setExpandedMenu(index);
  // };


  // const handleMenuClick = (item, index) => {
  //   console.log("index--", index);
  //   console.log("This function is Calling");
  //   setIsDropdownOpen(!isDropdownOpen)
  //   setSelectedData(menuItems[index]?.param1 || []);
  // }
  console.log('exapndmenu--', expandedMenu);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    const uniqueMenuIds = [...new Set(menuData?.map(item => item?.menuid))];

    const uniqueMenuItems = uniqueMenuIds.map(menuid => {
      const item = menuData?.find(data => data?.menuid === menuid);
      const param1DataIds = [...new Set(menuData?.filter(data => data?.menuid === menuid)?.map(item => item?.param1dataid))];

      const param1Items = param1DataIds.map(param1dataid => {
        const param1Item = menuData?.find(data => data?.menuid === menuid && data?.param1dataid === param1dataid);
        const param2Items = menuData?.filter(data => data?.menuid === menuid && data?.param1dataid === param1dataid)?.map(item => ({
          param2dataid: item?.param2dataid,
          param2dataname: item?.param2dataname,
          param2id: item?.param2id,
          param2name: item?.param2name
        }));
        return {
          menuname: param1Item?.menuname,
          param1dataid: param1Item?.param1dataid,
          param1dataname: param1Item?.param1dataname,
          param1id: param1Item?.param1id,
          param1name: param1Item?.param1name,
          param2: param2Items
        };
      });

      return {
        menuid: item?.menuid,
        menuname: item?.menuname,
        param0dataid: item?.param0dataid,
        param0dataname: item?.param0dataname,
        param0id: item?.param0id,
        param0name: item?.param0name,
        param1: param1Items
      };
    });

    setMenuItems(uniqueMenuItems);
  }, [menuData]);



  // for login drawer code
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [selectedSubSubMenu, setSelectedSubSubMenu] = useState(null);
  const [finalMenuData, setFinalMenuData] = useState();

  const handleLoginMenuClick = (menuName, menuItem, iconclicked) => {
    if (iconclicked == 'iconclicked') {
      setDrawerOpen(true);
      setSelectedMenu(prevMenu => (prevMenu === menuName ? null : menuName));
      setSelectedSubMenu(null);
      setSelectedSubSubMenu(null);
      return;
    }
    const { param1, ...menuItemWithoutParam1 } = menuItem;
    setFinalMenuData(menuItemWithoutParam1);
    handleMenuClick(menuItemWithoutParam1)
    console.log('MenuItemDtata--', menuItemWithoutParam1);
  };
  console.log('FinalMenuData--', finalMenuData);

  const handleSubMenuClick = (menuItem, subMenuName, subMenuItem, iconclicked) => {
    if (iconclicked == 'iconclicked') {
      setSelectedSubMenu(prevSubMenu => (prevSubMenu === subMenuName ? null : subMenuName));
      setSelectedSubSubMenu(null);
      return;
    }
    console.log('menuItem--', menuItem);
    console.log('subMenuItem--', subMenuItem);
    const { param1, ...menuItemWithoutParam1 } = menuItem;
    const { param2, ...subMenuItemWithoutParam2 } = subMenuItem;
    setFinalMenuData({ ...menuItemWithoutParam1, ...subMenuItemWithoutParam2 });
    handleMenuClick({ ...menuItemWithoutParam1, ...subMenuItemWithoutParam2 });
  };

  const handleSubSubMenuClick = (menuItem, subMenuItem, subSubMenuName, subSubMenuItem) => {
    console.log('subSubMenuItem--', subSubMenuItem);
    const { param1, ...menuItemWithoutParam1 } = menuItem;
    const { param2, ...subMenuItemWithoutParam2 } = subMenuItem;
    setFinalMenuData({ ...menuItemWithoutParam1, ...subMenuItemWithoutParam2, ...subSubMenuItem });
    handleMenuClick({ ...menuItemWithoutParam1, ...subMenuItemWithoutParam2, ...subSubMenuItem })
    setSelectedSubSubMenu(prev2ndSubMenu => (prev2ndSubMenu === subSubMenuName ? null : subSubMenuName));
    setSelectedSubSubMenu(subSubMenuName);
  };


  const containerStyle = {
    marginRight: '0px'
  };

  const alternateStyle = {
    marginLeft: '40px'
  };

  console.log('menuItems', menuItems);
  console.log('isdroopem--', selectedData);

  return (
    <>
      {serachsShowOverlay && (
        <>
          <div className="smlingSearchoverlay">
            <div className="smlingTopSerachOver">
              {location?.pathname == '/productpage' &&
                <IoSearchOutline style={{ height: "15px", width: "15px", marginRight: "10px" }} />
              }
              <input
                type="text"
                placeholder="Enter Design Number End Click Enter"
                value={searchText}
                autoFocus
                onChange={(e) => setSearchText(e.target.value)}
                className="serachinputBoxOverly"
                onKeyDown={searchDataFucn}
              />
              <IoClose
                style={{
                  height: "30px",
                  width: "30px",
                  color: "#7d7f85",
                  cursor: "pointer",
                }}
                onClick={toggleOverlay}
              />
            </div>
          </div>

          <div className={`smlingSearchoverlayNew ${isHeaderFixedDropShow ? "fixed" : ""}`}>
            <div className="smlingTopSerachOver-Fixed">
              {location?.pathname == '/productpage' &&
                <IoSearchOutline style={{ height: "15px", width: "15px", marginRight: "10px" }} />
              }
              <input
                type="text"
                placeholder="Enter Design Number End Click Enter"
                value={searchText}
                autoFocus
                onChange={(e) => setSearchText(e.target.value)}
                className="serachinputBoxOverly"
                onKeyDown={searchDataFucn}
              />
              <IoClose
                style={{
                  height: "30px",
                  width: "30px",
                  color: "#7d7f85",
                  cursor: "pointer",
                }}
                onClick={toggleOverlay}
              />
            </div>
          </div>
        </>
      )}

      {drawerOpen && (
        <>
          {islogin == 'true' ? (
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{ style: { width: '100%' } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 8px 8px 8px' }}>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <CloseIcon />
                </IconButton>
                <div>
                  <a href="/">
                    <img src={titleImg} className="MainlogogMobileImage" style={{ marginTop: '-30px', paddingLeft: '30px', marginLeft: '31px' }} />
                  </a>
                </div>
                <Badge
                  badgeContent={getCartListCount}
                  max={1000}
                  overlap={"rectangular"}
                  color="secondary"
                  style={{ marginInline: '10px' }}
                >
                  <Tooltip title="Cart">
                    <li
                      onClick={() => { setDrawerOpen(false); navigation('/CartPage') }}
                      style={{
                        marginLeft: "-10px",
                        cursor: "pointer",
                        listStyle: 'none',
                        marginTop: "0px",
                      }}
                    >
                      <HiOutlineShoppingBag fontSize='25px' />
                    </li>
                  </Tooltip>
                </Badge>
              </div>
              <List>
                {menuItems.map(menuItem => (
                  <div key={menuItem.menuid}>
                    <ListItem onClick={() => handleLoginMenuClick(menuItem.menuname, menuItem)} >
                      <ListItemText primary={menuItem.menuname} className="muilistMenutext" />
                      {selectedMenu === menuItem.menuname ? (
                        <RemoveIcon sx={{ color: '#7D7F85' }} onClick={(e) => { e.stopPropagation(); handleLoginMenuClick(menuItem.menuname, null, "iconclicked"); }} />
                      ) : (
                        <AddIcon sx={{ color: '#7D7F85' }} onClick={(e) => { e.stopPropagation(); handleLoginMenuClick(menuItem.menuname, null, "iconclicked") }} />
                      )}
                    </ListItem>
                    {selectedMenu === menuItem.menuname && (
                      <List>
                        {menuItem.param1.map(subMenuItem => (
                          <div key={subMenuItem.param1dataid}>
                            <ListItem onClick={() => handleSubMenuClick(menuItem, subMenuItem.param1dataname, subMenuItem)} className="muilistSubMenutext" style={{ paddingLeft: '60px' }}>
                              <ListItemText primary={subMenuItem.param1dataname} />
                              {selectedSubMenu === subMenuItem.param1dataname ? (
                                <RemoveIcon sx={{ color: '#7D7F85' }} onClick={(e) => { e.stopPropagation(); handleSubMenuClick(null, subMenuItem.param1dataname, null, "iconclicked") }} />
                              ) : (
                                <AddIcon sx={{ color: '#7D7F85' }} onClick={(e) => { e.stopPropagation(); handleSubMenuClick(null, subMenuItem.param1dataname, null, "iconclicked") }} />
                              )}
                            </ListItem>
                            {selectedSubMenu === subMenuItem.param1dataname && (
                              <List>
                                {subMenuItem.param2.map(subSubMenuItem => (
                                  <ListItem key={subSubMenuItem.param2dataid} onClick={() => handleSubSubMenuClick(menuItem, subMenuItem, subSubMenuItem.param2dataname, subSubMenuItem)} style={{ paddingLeft: '100px' }}>
                                    <ListItemText primary={subSubMenuItem.param2dataname} className="muilist2ndSubMenutext" />
                                  </ListItem>
                                ))}
                              </List>
                            )}
                          </div>
                        ))}
                      </List>
                    )}
                  </div>
                ))}
              </List>
              {islogin == 'true' &&
                <div
                  style={{
                    width: "100%",
                    position: 'absolute',
                    bottom: '30px',
                    right: '20px',
                    textAlign: 'right'
                  }}
                >
                  <button onClick={handleLogout} type="button" class="btn btn-secondary">Logout</button>
                </div>
              }
            </Drawer>
          ) :
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{ style: { width: '100%' } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <CloseIcon />
                </IconButton>
                <Link to="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={titleImg} alt="Title" className="logoImage1" style={{ marginTop: '-32px' }} />
                </Link>
                <List>
                  <ListItem onClick={() => navigation('/LoginOption')}>
                    <ListItemText primary="Log In" />
                  </ListItem>
                </List>
              </div>
              <List>
                <ListItem onClick={() => { setDrawerOpen(false); ScrollToView('brandsComponentID') }}>
                  <ListItemText primary="Our Brands" />
                </ListItem>
                <ListItem onClick={() => { setDrawerOpen(false); ScrollToView('elveeGiftMainId') }}>
                  <ListItemText primary="Product" />
                </ListItem>
                <ListItem onClick={() => {
                  setDrawerOpen(false);
                  ScrollToView('craftmenshipId');
                }}>
                  <ListItemText primary="Our Craftsmanship" />
                </ListItem>
                <ListItem onClick={() => { setDrawerOpen(false); ScrollToView('mainGalleryConatinerID') }}>
                  <ListItemText primary="Gallery" />
                </ListItem>
                <ListItem onClick={() => { setDrawerOpen(false); ScrollToView('mainSocialMediaConatinerID') }}>
                  <ListItemText primary="Social Media" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </Drawer>
          }
        </>
      )}

      {!serachsShowOverlay &&
        <div className="sminingHeaderWeb ">
          {islogin == 'false' ?
            <div className="Smining-Top-Header ">
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ul className="nav-ul-shop" style={{ listStyle: "none", padding: 0 }}>
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer" }}
                    onClick={() => ScrollToView('brandsComponentID')}
                  >
                    Our Brands
                  </li>
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer" }}
                    onClick={() => ScrollToView('elveeGiftMainId')}
                  >
                    Product
                  </li>
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer" }}
                    onClick={() => ScrollToView('craftmenshipId')}
                  >
                    Our Craftsmanship
                  </li>
                  <a href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-25px' }}>
                    <img src={titleImg} alt="Title" className="logoImage1" />
                  </a>
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer" }}
                    onClick={() => ScrollToView('mainGalleryConatinerID')}
                  >
                    Gallery
                  </li>
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer" }}
                    onClick={() => ScrollToView('mainSocialMediaConatinerID')}
                  >
                    Social Media
                  </li>
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer" }}
                  // onClick={() => navigation("/contact")}
                  >
                    Contact
                  </li>
                </ul>
              </div>

              <div
                style={{
                  width: "10%",
                  display: "flex",
                  justifyContent: 'center'
                }}
              >
                <ul className="nav-ul-shop">
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigation('/LoginOption')}
                  >
                    Log In
                  </li>
                </ul>
              </div>
            </div>
            :
            <div className="Smining-Top-LoginHeader">
              <div
                className="HeaderMenuItemMainDiv"
              >
                <a href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-25px' }}>
                  <img src={titleImg} alt="Title" className="logoImage1" />
                </a>
                <ul className="nav-ul-shop" style={{ height: '100%', display: 'flex', alignItems: 'center', listStyle: "none", padding: 0 }}>
                  {menuItems.map((item, index) => (
                    <li
                      className="nav-li-smining"
                      style={{ height: '100%', display: 'flex', alignItems: 'center', cursor: "pointer", marginTop:'10px', textTransform:'uppercase' }}
                      key={index}
                      label={item.menuname}
                      onMouseEnter={() => handleMouseEnter(index, item)}
                      onMouseLeave={() => {
                        setLeval0Data(item);
                        handleMouseLeave();
                      }}
                      onClick={() => handleMenuClick(item)}
                    >
                      {item.menuname}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: 'end',
                  marginRight: '20px'
                }}
              >
                <ul className="nav-ul-shop" style={{ marginTop: '24px' }}>
                  <>
                    {location?.pathname == '/productpage' &&
                      <li style={{ cursor: "pointer", textDecoration: 'none',marginTop:'0' }} onClick={toggleOverlay}>
                        {/* <IoSearch color="#7D7F85" fontSize='25px' /> */}
                      </li>
                    }
                    <Badge
                      badgeContent={getWishListCount}
                      max={1000}
                      overlap={"rectangular"}
                      color="secondary"
                    >
                      <Tooltip title="WishList">
                        <li style={{ cursor: "pointer", textDecoration: 'none', marginTop: '0' }} onClick={() => navigation("/myWishList")}>
                          <GoHeart color="#7D7F85" fontSize='25px' />
                        </li>
                      </Tooltip>
                    </Badge>
                    <Badge
                      badgeContent={getCartListCount}
                      max={1000}
                      overlap={"rectangular"}
                      color="secondary"
                    >
                      <Tooltip title="Cart">
                        <li
                          onClick={() => navigation('/CartPage')}
                          style={{
                            cursor: "pointer",
                            marginTop: "0px",
                          }}
                        >
                          <HiOutlineShoppingBag color="#7D7F85" fontSize='25px' />
                        </li>
                      </Tooltip>
                    </Badge></>
                  <Tooltip title="Account">
                    <li
                      className="nav-li-smining"
                      style={{ cursor: "pointer", textDecoration: 'none', marginTop: "0" }}
                      onClick={() => navigation("/account")}
                    >
                      <IoPersonOutline color="#7D7F85" fontSize='25px' />
                    </li>
                  </Tooltip>
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer", marginTop: "0" }}
                    onClick={handleLogout}
                  >
                    <FaPowerOff style={{ fontSize: '25px' }} />
                  </li>
                </ul>
              </div>
            </div>
          }
          <>
            <div className={`shop-dropdown ${expandedMenu !== null ? "open" : ""}`} onMouseEnter={() => handleMouseEnter(hoveredIndex)} onMouseLeave={handleMouseLeave}>
              <div
                style={{
                  display: "flex",
                  padding: "50px",
                  color: "#7d7f85",
                  // backgroundColor: "rgba(255, 255, 255, 0.8)",
                  // flexDirection: "column",
                  gap: "50px",
                  justifyContent: 'space-between'
                }}
                className="menuDropdownData"
              >
                <div style={{}}>
                  {/* Render selectedData outside the menuItems loop */}
                  <div style={{ width: '100%', display: 'flex', gap: '60px', textTransform: 'uppercase' }}>
                    {selectedData?.param1?.map((param1Item, param1Index) => (
                      <div key={param1Index}>
                        <span onClick={() => handleMenuClick(param1Item)} className="level1MenuData" key={param1Index} style={{ fontSize: '15px', marginBottom: '10px', fontFamily: '"PT Sans", sans-serif', textAlign: 'start', letterSpacing: 1, fontWeight: 600, cursor: 'pointer' }} > {param1Item?.param1dataname}</span>
                        <div style={{ height: '300px', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                          {param1Item?.param2?.map((param2Item, param2Index) => (
                            <p key={param2Index} onClick={() => handleMenuClick(param1Item, param2Item)} style={{ fontSize: '13.5px', margin: '6px 15px 6px 0px', fontFamily: '"PT Sans", sans-serif', letterSpacing: 0.4, textAlign: 'start', cursor: 'pointer', textTransform: 'capitalize', paddingRight: '15px' }}>
                              {param2Item?.param2dataname}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <img src={`${storImagePath()}/images/Menu/Menu1.jpg`} alt="#" className="menuImages" />
                  <img src={`${storImagePath()}/images/Menu/Menu2.jpg`} alt="#" className="menuImages" />
                </div>

              </div>
            </div>
          </>
        </div >
      }
      <div
        style={{
          top: 0,
          width: "100%",
          zIndex: "100",
        }}
        className="mobileHeaderSmining"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // padding: "20px",
          }}
          className="smilingMobileSubDiv"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            className="mobileViewFirstDiv1"
          // onClick={() => setDrawerOpen(true)}
          >
            <IconButton
              style={{ color: "white" }}
              onClick={() => setDrawerOpen(true)}
              aria-label="open menu"
            >
              <MenuIcon style={{ fontSize: "35px" }} />
            </IconButton>
          </div>
          <div
            className="mobileViewFirstDiv2"
          >
            <a href="/" className="mobileViewFirstDiv2">
              <img src={titleImg} className="MainlogogMobileImage" style={islogin == 'true' ? containerStyle : alternateStyle} />
            </a>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}

            className="mobileViewFirstDiv3"
          >

            {islogin === "false" ? (
              <li
                className="nav-li-smining"
                style={{ cursor: "pointer", color: 'black', marginRight: '15px' }}
                onClick={() => navigation('/LoginOption')}
              >
                Log in
              </li>
            ) :
              <div
                style={{
                  display: "flex",
                  margin: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "20%",
                    gap: '20px'
                  }}
                >
                  {location?.pathname == '/productpage' &&
                    <li className="searchiconInMobile" onClick={toggleOverlay} style={{ listStyle: 'none', width: '40px', textAlign: 'center', cursor: 'pointer' }}>
                      <IoSearch color="#7D7F85" fontSize='30px' />
                    </li>
                  }
                  <Badge
                    badgeContent={getWishListCount}
                    max={1000}
                    overlap={"rectangular"}
                    color="secondary"
                    style={{ marginInline: '5px' }}
                    className="smilingHeaderWhishlistIcon"
                  >
                    <li style={{ listStyle: 'none', cursor: 'pointer' }} onClick={() => navigation("/myWishList")}>
                      <GoHeart color="#7D7F85" fontSize='30px' className="mobileViewSmilingTop1Icone" />
                    </li>
                  </Badge>


                  <Badge
                    badgeContent={getCartListCount}
                    max={1000}
                    overlap={"rectangular"}
                    color="secondary"
                    style={{ marginInline: '10px' }}
                  >
                    <li
                      onClick={() => { setDrawerOpen(false); navigation('/CartPage') }}
                      style={{
                        marginLeft: "-10px",
                        cursor: "pointer",
                        listStyle: 'none',
                        marginTop: "0px",
                      }}
                    >
                      <HiOutlineShoppingBag color="#7D7F85" fontSize='30px' className="mobileViewSmilingTop2Icone"/>
                    </li>
                  </Badge>
                  <li
                    className="nav-li-smining"
                    style={{ cursor: "pointer", textDecoration: 'none' }}
                    onClick={() => navigation("/account")}
                  >
                    <IoPersonOutline color="#7D7F85" fontSize='30px' style={{ marginTop: '-5px' }} className="mobileViewSmilingTop3Icone"/>
                  </li>
                </div>
              </div>

            }
          </div>
        </div>
      </div>

      <Cart open={openCart} toggleCartDrawer={toggleCartDrawer} />
    </>
  );
}
