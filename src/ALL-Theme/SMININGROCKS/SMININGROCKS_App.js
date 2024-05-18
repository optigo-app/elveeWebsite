import React, { useState, useEffect, useRef } from 'react'
import { Route, Routes, useLocation, useNavigate, redirect } from 'react-router-dom'
import Home from './Pages/Components/home'
import Impact from './Pages/Components/Impact'
import AboutUs from './Pages/Static Page/aboutUs/AboutUs'
import LabGroDiamonds from './Pages/Components/LabGroDiamonds/LabGroDiamonds'
import Register from './Pages/Components/AuthScreen/Registretion/Register'
import ForgotPass from './Pages/Components/AuthScreen/forgotPass/ForgotPass'
import ContactUs from './Pages/Components/contactUs/ContactUs'
import FAQ from './Pages/Components/FAQ/FAQ'
import ServicePolicy from './Pages/Components/ServicePolicy/ServicePolicy'
import MyWishList from './Pages/Components/myWishList/MyWishList'
import Lookbook from './Pages/Components/Lookbook/index'
import Press from './Pages/Components/press/Press'
import Account from './Pages/Components/account/Account'
import SearchResult from './Pages/Components/searchResult/SearchResult'
import Celeb from './Pages/Components/celebrity/Celeb'
import Blog from './Pages/Components/Blog/Blog'
import ProductList from './Pages/Components/productPage/ProductList'
import ProdDetail from './Pages/Components/productDetail/ProdDetail'
import ContinueWithEmail from './Pages/Components/AuthScreen/ContinueWithEmail/ContinueWithEmail'
import LoginWithEmail from './Pages/Components/AuthScreen/LoginWithEmail/LoginWithEmail'
import LoginWithEmailCode from './Pages/Components/AuthScreen/LoginWithEmailCode/LoginWithEmailCode'
import ContimueWithMobile from './Pages/Components/AuthScreen/ContimueWithMobile/ContimueWithMobile'
import LoginWithMobileCode from './Pages/Components/AuthScreen/LoginWithMobileCode/LoginWithMobileCode'
import Delivery from './Pages/Components/delivery/Delivery'
import Header from './Pages/Components/home/Header/Header'
import { Dialog } from '@mui/material'
import { IoMdMail } from 'react-icons/io'
import { FaMobileAlt } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import AccountLedgerTable from './Pages/Components/account/accountLedgerTablePrint/AccountLedgerTable';
import AccountLedgerExcel from './Pages/Components/account/accountLedgerExcelDownload/AccountLedgerExcel';
import AccountLedger from './Pages/Components/account/accountLedger/AccountLedger';
import DebitVoucher from './Pages/Components/account/accountLedgerVouchers/debitVoucher/DebitVoucher';
import CreditVoucher from './Pages/Components/account/accountLedgerVouchers/creditVoucher/CreditVoucher';
import { CartListCounts, WishListCounts, loginState } from '../../Recoil/atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Payment from './Pages/Components/Payment/Payment'
import Confirmation from './Pages/Components/confirmation/Confirmation'
import { GetCount } from './Utils/API/GetCount'
import LoginOption from './Pages/Components/AuthScreen/LoginOption/LoginOption'
import CartPage from './Pages/Components/home/Header/cartPage/CartPage'
import CurrentVersion from "./Pages/Components/ProjectVersion/CurrentVersion"
// import OrderHistory from './Pages/Components/account/accountOrderHistory/OrderHistory';
import { ToastContainer } from 'react-toastify';
import CustomerService from './Pages/Static Page/CutomerService/CustomerServices'
import Customize from './Pages/Static Page/Customize/Customize'
import History from './Pages/Static Page/History/HistoryPage'
import TermsAndConditions from './Pages/Static Page/Terms&Condition/TermsCondition'
import PrivateRoutes from './PrivateRoutes'
import ProductListSkeleton from './Pages/Components/productPage/ProductListSkelton'
import PageNotFound from "./Pages/Components/404Page/PageNotFound"
import CartPageSkelton from './Pages/Components/home/Header/cartPage/CartPageSkelton'
import ProductFilterSkelton from './Pages/Components/productPage/ProductFilterSkelton'

export default function SMININGROCKS_App() {
    const isLoginStatus = useRecoilValue(loginState);
    const location = useLocation();
    const setCartCount = useSetRecoilState(CartListCounts)
    const setWishCount = useSetRecoilState(WishListCounts)
    const getCountFunc = async () => {
        await GetCount().then((res) => {
            if (res) {
                setCartCount(res.CountCart)
                setWishCount(res.WishCount)
            }
        })

    }

    useEffect(() => {
        getCountFunc();
    }, [])

    console.log("isLoginStatus", isLoginStatus);

    return (
        <>
            <ToastContainer />
            <div>
                {(location.pathname === "/accountledgertable" ||
                    location.pathname === "/accountledgerexcel" ||
                    location.pathname === "/accountledgerdebit" ||
                    location.pathname === "/accountledgercredit" ||
                    location.pathname === "/CurrentVersion") ?
                    null : <Header />}
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/impact" element={<Impact />} />
                        <Route path="/aboutUs" element={<AboutUs />} />
                        <Route path="/labGrowDaimonds" element={<LabGroDiamonds />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgotPass" element={<ForgotPass />} />
                        <Route path="/ContinueWithEmail" element={<ContinueWithEmail />} />
                        <Route path="/LoginWithEmail" element={<LoginWithEmail />} />
                        <Route path="/LoginWithEmailCode" element={<LoginWithEmailCode />} />
                        <Route path="/ContimueWithMobile" element={<ContimueWithMobile />} />
                        <Route path="/LoginWithMobileCode" element={<LoginWithMobileCode />} />
                        <Route path="/contactUs" element={<ContactUs />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/servicePolicy" element={<ServicePolicy />} />
                        {/* <Route path="/myWishList" element={<MyWishList />} /> */}
                        <Route path="/lookbook" element={<Lookbook />} />
                        <Route path="/press" element={<Press />} />
                        {/* <Route path="/account" element={<Account />} /> */}
                        {/* <Route path="/accountledger" element={<AccountLedger />} /> */}
                        {/* <Route path="/accountledgertable" element={<AccountLedgerTable />} /> */}
                        {/* <Route path="/accountledgerexcel" element={<AccountLedgerExcel />} /> */}
                        {/* <Route path="/accountledgerdebit" element={<DebitVoucher />} /> */}
                        {/* <Route path="/accountledgercredit" element={<CreditVoucher />} /> */}
                        <Route path="/searchResult" element={<SearchResult />} />
                        <Route path="/celeb" element={<Celeb />} />
                        <Route path="/blog" element={<Blog />} />
                        {/* <Route path="/productpage" element={<ProductList />} /> */}
                        {/* <Route path="/productdetail" element={<ProdDetail />} /> */}
                        {/* <Route path="/Delivery" element={<Delivery />} /> */}
                        {/* <Route path="/Payment" element={<Payment />} /> */}
                        {/* <Route path="/Confirmation" element={<Confirmation />} /> */}
                        <Route path="/LoginOption" element={<LoginOption />} />
                        {/* <Route path="/CartPage" element={<CartPage />} /> */}
                        <Route path="/customerServices" element={<CustomerService />} />
                        <Route path="/customize" element={<Customize />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/term&condition" element={<TermsAndConditions />} />
                        <Route path='/' element={<PrivateRoutes isLoginStatus={isLoginStatus} />}>
                            <Route path="/myWishList" element={<MyWishList />} />
                            <Route path="/productpage/*" element={<ProductList />} />
                            <Route path="/productdetail" element={<ProdDetail />} />
                            <Route path="/Delivery" element={<Delivery />} />
                            <Route path="/Payment" element={<Payment />} />
                            <Route path="/Confirmation" element={<Confirmation />} />
                            <Route path="/CartPage" element={<CartPage />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/accountledger" element={<AccountLedger />} />
                            <Route path="/accountledgertable" element={<AccountLedgerTable />} />
                            <Route path="/accountledgerexcel" element={<AccountLedgerExcel />} />
                            <Route path="/accountledgerdebit" element={<DebitVoucher />} />
                            <Route path="/accountledgercredit" element={<CreditVoucher />} />
                        </Route>
                        <Route path="/CurrentVersion" element={<CurrentVersion />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}
