import React, { useEffect, useState } from "react";
import Header from "../home/Header/Header";
import "./MyWishList.css";
import Footer from "../home/Footer/Footer";
import { CommonAPI } from "../../../Utils/API/CommonAPI";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { Button, CircularProgress, Dialog, DialogTitle } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { CartListCounts, WishListCounts } from "../../../../../Recoil/atom";
import { GetCount } from "../../../Utils/API/GetCount";
import notFound from "../../assets/image-not-found.png";

export default function MyWishList() {
  const [wishlistData, setWishlistData] = useState([]);
  const [yKey, setYouKey] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPriseShow, setIsPriceShow] = useState("");
  const [cuurencySymbol, setCuurencySymbol] = useState("");
  const setCartCount = useSetRecoilState(CartListCounts);
  const setWishCount = useSetRecoilState(WishListCounts);
  const navigation = useNavigate();
  const [currData, setCurrData] = useState()

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
    // handelCurrencyData();
    let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
    let obj = { "CurrencyRate": loginData?.CurrencyRate, "Currencysymbol": loginData?.Currencysymbol }
    if (obj) {
      setCurrData(obj)
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
    const storeInit = JSON.parse(localStorage.getItem("CURRENCYCOMBO"));
    const { Currencysymbol } = storeInit;
    setCuurencySymbol(Currencysymbol);

    const fetchData = async () => {
      try {
        wishlistData.length === 0 && setIsLoading(true);
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const storedData = localStorage.getItem("loginUserDetail");
        const ImageURL = localStorage.getItem("UploadLogicalPath");
        setImageURL(ImageURL);
        const data = JSON.parse(storedData);
        const customerid = data.id;
        const priseShow = storeInit.IsPriceShow;
        setIsPriceShow(priseShow);
        setCustomerID(data.id);
        const customerEmail = data.userid;
        setUserEmail(customerEmail);
        const { FrontEnd_RegNo, ukey } = storeInit;
        setYouKey(ukey);
        const combinedValue = JSON.stringify({
          is_show_stock_website: "0",
          PageSize: "1000",
          CurrentPage: "1",
          FrontEnd_RegNo: `${FrontEnd_RegNo}`,
          Customerid: `${customerid}`,
          UploadLogicalPath: "",
          ukey: `${ukey}`,
          ThumDefImg: "",
          CurrencyRate: "1",
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          con: `{\"id\":\"Store\",\"mode\":\"GetWishList\",\"appuserid\":\"${customerEmail}\"}`,
          f: "MyWishList (GetWishList)",
          p: encodedCombinedValue,
        };
        const response = await CommonAPI(body);
        if (response.Data) {
          wishlistData.length === 0 && setIsLoading(false);
          setWishlistData(response.Data.rd);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (autoCode) => {
    try {
      setIsLoading(true);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        autocodelist: `${autoCode}`,
        ischeckall: "",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"addwishlisttocart\",\"appuserid\":\"${userEmail}\"}`,
        f: "MyWishLsit(addwishlisttocart)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data.rd[0].stat === 1) {
        setWishlistData((prevData) =>
          prevData.filter((item) => item.autocode !== autoCode)
        );
        getCountFunc();
        navigation("/myWishList");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAll = async () => {
    try {
      setIsLoading(true);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        autocodelist: "",
        ischeckall: "1",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"addwishlisttocart\",\"appuserid\":\"${userEmail}\"}`,
        f: "MyWishLsit(addwishlisttocart)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data.rd[0].stat === 1) {
        setWishlistData([]);
        getCountFunc();
        navigation("/myWishList");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveWichList = async (data) => {
    try {
      setIsLoading(true);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        designlist: `'${data.designno}'`,
        isselectall: "0",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"removeFromWishList\",\"appuserid\":\"${userEmail}\"}`,
        f: "myWishLisy (handleRemoveWichList)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data.rd[0].stat === 1) {
        setWishlistData((prevData) =>
          prevData.filter((item) => item.designno !== data.designno)
        );
        getCountFunc();
        navigation("/myWishList");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAllWishList = async () => {
    try {
      setIsLoading(true);
      const storeInit = JSON.parse(localStorage.getItem("storeInit"));
      const { FrontEnd_RegNo } = storeInit;
      const combinedValue = JSON.stringify({
        designlist: "",
        isselectall: "1",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${customerID}`,
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"removeFromWishList\",\"appuserid\":\"${userEmail}\"}`,
        f: "myWishLisy (handleRemoveWichList)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      if (response.Data.rd[0].stat === 1) {
        // alert('Remove Success');
        // window.location.reload();
        setWishlistData([]);
        getCountFunc();
        navigation("/myWishList");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelProductSubmit = (product) => {
    console.log("producrrrrrrrrrrr", JSON.stringify(product));
    // localStorage.setItem("srProductsData", JSON.stringify(product));
    // navigation("/productdetail");
  };

  const decodeEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };



  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div
      className="paddingTopMobileSet">
      {isLoading && (
        <div className="loader-overlay">
          <CircularProgress className="loadingBarManage" />
        </div>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are You Sure To Delete Alll This Item?</DialogTitle>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={handleRemoveAllWishList} color="primary">
            YES
          </Button>
        </div>
      </Dialog>

      <div>
        <div className="smiling-wishlist">
          <p className="SmiWishListTitle">My Wishlist</p>

          {wishlistData?.length !== 0 && (
            <div className="smilingListTopButton">
              {/* <button className='smiTopShareBtn'>SHARE WISHLIST</button> */}
              <button
                className="smiTopAddAllBtn"
                onClick={handleClickOpen}
              >
                Clear All
              </button>
              <button className="smiTopAddAllBtn" onClick={handleAddAll}>
                Add To Cart All
              </button>
              {/* <button
                className="smiTopAddAllBtn"
                onClick={() => navigation("/productpage")}
              >
                Show ProductList
              </button> */}
            </div>
          )}

          <div className="smiWishLsitBoxMain">
            {wishlistData?.length === 0
              ? !isLoading && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
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
                  <p>Please First Add To Wishlist Data</p>
                  {/* <button
                    className="browseBtnMore"
                    onClick={() => navigation("/productpage")}
                  >
                    BROWSE OUR COLLECTION
                  </button> */}
                </div>
              )
              : wishlistData?.map((item) => (
                <div key={item.id} className="smiWishLsitBox">
                  <div
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "5px",
                    }}
                  >
                    <IoClose
                      style={{
                        height: "30px",
                        width: "30px",
                        cursor: "pointer",
                        color: "rgb(0 0 0 / 66%)",
                      }}
                      onClick={() => handleRemoveWichList(item)}
                    />
                  </div>
                  <img
                    src={`${imageURL}/${yKey}/${item.DefaultImageName}`}
                    className="smiWishLsitBoxImge"
                    style={{ cursor: "pointer" }}
                    alt="Wishlist item"
                    onClick={() => handelProductSubmit(item)}
                    onError={(e) => {
                      e.target.src = notFound;
                    }}
                  />
                  <p className="smiWishLsitBoxTitltLine">
                    {item.TitleLine}
                  </p>


                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      marginInline: "2%",
                    }}
                  >
                    <p className="smiWishLsitBoxDesc1">{item.designno}</p>
                    {isPriseShow == 1 && (
                      <p className="smiWishLsitBoxDescPrice">
                        {
                          <div
                            dangerouslySetInnerHTML={{
                              __html: decodeEntities(
                                currData?.Currencysymbol
                              ),
                            }}
                            style={{ fontFamily: "serif", marginTop: '2px' }}
                          />
                        }
                        {item.TotalUnitCost}
                      </p>
                    )}
                  </div>


                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      marginInline: "2%",
                      paddingBottom: "18%",
                    }}
                    className="mobileViewDeac"
                  >
                    <p className="smiWishLsitBoxDesc2">
                      GWT: {(item.ActualGrossweight).toFixed(2)}
                    </p>
                    <p className="smiWishLsitBoxDesc2">
                      DWT: {(item.totaldiamondweight).toFixed(2)}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      position: "absolute",
                      bottom: "0px",
                      width: "100%",
                      justifyContent: "center",
                      marginBlock: "15px",
                    }}
                    className="mobilkeAddToCartBtn"
                  >
                    <button
                      className="smiWishLsitBoxDesc3"
                      onClick={() => handleAddToCart(item.autocode)}
                    >
                      ADD TO CART +
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mobileFootreCs" style={{ position: wishlistData?.length === 0 && 'absolute', bottom: '0px',top:'40%', width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}
