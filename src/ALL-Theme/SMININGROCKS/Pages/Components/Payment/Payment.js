import React, { useEffect, useState } from 'react'
import './Payment.css'
import Footer from '../home/Footer/Footer'
import { CommonAPI } from '../../../Utils/API/CommonAPI';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { useSetRecoilState } from 'recoil';
import { CartListCounts, WishListCounts } from '../../../../../Recoil/atom';
import { GetCount } from '../../../Utils/API/GetCount';
import { storImagePath } from '../../../Utils/globalFunctions/GlobalFunction';

export default function Payment() {

    const [CurrencyId, setCustomerId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAdd, setSelectedAdd] = useState('');
    const navigation = useNavigate();
    const [TotlaPrice, setTotalPrice] = useState('');
    const [TotlaPriceText, setTotalPriceText] = useState('');
    const [finalTotal, setFinlTotal] = useState('');
    const [currData, setCurrData] = useState()

    const setCartCount = useSetRecoilState(CartListCounts)
    const setWishCount = useSetRecoilState(WishListCounts)

    useEffect(() => {
        let loginData = JSON.parse(localStorage.getItem('loginUserDetail'));
        let obj = { "CurrencyRate": loginData?.CurrencyRate, "Currencysymbol": loginData?.Currencysymbol }
        if (obj) {
            setCurrData(obj)
        }

        const totalPriceData = localStorage.getItem('TotalPriceData');
        if (totalPriceData) {
            const totalPriceNum = parseFloat(totalPriceData);
            const newPrice = totalPriceNum * 0.03;
            setTotalPriceText(newPrice.toFixed(2)); // Assuming you want to show 2 decimal places
            setTotalPrice(totalPriceNum);
            const finalTotalPrice = totalPriceNum + newPrice;
            setFinlTotal(finalTotalPrice.toFixed(2)); // Assuming you want to show 2 decimal places
        }

        const selectedAddressId = localStorage.getItem('selectedAddressId');
        const selctedid = JSON.parse(selectedAddressId);
        setSelectedAdd(selctedid);
        console.log('selelee', selctedid);

        const fetchData = async () => {
            try {
                const storedData = localStorage.getItem('loginUserDetail');


                const data = JSON.parse(storedData);
                const customerid = data.id;

                const storeInit = JSON.parse(localStorage.getItem('storeInit'));
                const { FrontEnd_RegNo } = storeInit;

                const combinedValue = JSON.stringify({
                    FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
                });
                console.log('combinedValuecombinedValue...', combinedValue);

                const encodedCombinedValue = btoa(combinedValue);
                const body = {
                    "con": `{\"id\":\"Store\",\"mode\":\"CURRENCYCOMBO\",\"appuserid\":\"${data.userid}\"}`,
                    "f": "payment (getTheId)",
                    p: encodedCombinedValue
                };
                const response = await CommonAPI(body);
                if (response.Data?.rd[0]) {
                    setCustomerId(response.Data.rd[0].Currencyid);
                    console.log('response...', response.Data.rd[0].Currencyid);
                }

            } catch (error) {
                console.error('Error:', error);
            } finally {
                // setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const getCountFunc = async () => {
        await GetCount().then((res) => {
            if (res) {
                setCartCount(res.CountCart)
                setWishCount(res.WishCount)
            }
        })

    }



    const handlePayment = async () => {
        try {
            setIsLoading(true);
            const storedData = localStorage.getItem('loginUserDetail');
            const selectedAddressId = localStorage.getItem('selectedAddressId');
            const selctedid = JSON.parse(selectedAddressId);


            const data = JSON.parse(storedData);
            const customerid = data.id;

            const storeInit = JSON.parse(localStorage.getItem('storeInit'));
            const { FrontEnd_RegNo } = storeInit;

            const combinedValue = JSON.stringify({
                addrid: `${selctedid.id}`, PaymentMethod: 'Cash on Delivery', Istempaddress: '', addrType: 'select', OrderPlacedFrom: "1", CurrencyId: `${CurrencyId}`, orderRemarks: '', FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
            });

            console.log('combinedValuecombinedValue...', combinedValue);

            const encodedCombinedValue = btoa(combinedValue);
            const body = {
                "con": `{\"id\":\"Store\",\"mode\":\"PlaceOrder\",\"appuserid\":\"${data.userid}\"}`,
                "f": "m-test2.orail.co.in (PlaceOrder)",
                p: encodedCombinedValue
            };
            const response = await CommonAPI(body);

            console.log('response...', response);
            if (response.Data?.rd[0]?.stat == 1) {
                let num = response.Data?.rd[0]?.orderno
                getCountFunc();
                localStorage.setItem('orderNumber', num)
                navigation('/Confirmation')

            } else {
                alert('error')
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const decodeEntities = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <div className='paddingTopMobileSet'>
            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div className='smilingPaymentMain'>
                <div className='smilingPaymentMainWeb'>
                    <div class="bg-imageCart">
                        <div class="overlay"></div>
                        <div class="text-container">
                            <div className='textContainerData'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <p className="designCounttext paymentText" style={{ fontSize: '30px', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                        Payment
                                    </p>
                                    <span className='breadComesDeliver' style={{ fontSize: '10px', marginLeft: '40px' }}>My Cart &gt; Delivery &gt; Payment</span>
                                </div>
                                <img src={`${storImagePath()}/images/HomePage/MainBanner/image/featuresImage.png`} className='featherImage' />
                            </div>
                        </div>
                    </div>

                    <div className="filterDivcontainerPaymetPage" style={{ width: '100%', height: '60px' }}>
                        <div className="partCart" style={{ flex: '20%', cursor: 'pointer' }} onClick={() => navigation('/Delivery')} >
                            <span className='cartPageTopLink'>Back</span>
                        </div>
                        <div className="divider"></div>

                        <div className="partCart HideBlackViewPaymentTop" style={{ flex: '20%' }}>
                            {/* <p className='cartPageTopLink' onClick={handleOpen}>Add New Address</p> */}
                        </div>

                        <div className="divider HideBlackViewPaymentTop"></div>

                        <div className="partCart HideBlackViewPaymentTop" style={{ flex: '20%' }}>
                            <div style={{ display: 'flex', }}>
                                {/* <p
                                        className="cartPageTopLink"
                                    >
                                        Clear All
                                    </p> */}
                            </div>
                        </div>

                        <div className="divider HideBlackViewPaymentTop"></div>

                        <div className="partCart HideBlackViewPaymentTop" style={{ flex: '20%' }}>
                            {/* <p style={{ margin: '0px 10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', color: '#7d7f85', textDecoration: 'underline' }} onClick={handleClickOpenOrderRemark}>{cartSelectData?.OrderRemarks ? 'View & Edit Remark' : 'Add Order Remark'}</p> */}
                        </div>
                        <div className="divider HideBlackViewPaymentTop"></div>

                        <div className="partCart" style={{ flex: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                className="cartPageTopBtn"
                                onClick={handlePayment}
                            // style={{ position: 'absolute', right: '0px', height: '50px' }}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>

                    <div className='smilingPaySub1Main'>
                        <div className='smilingPaySub1'>
                            {/* <IoArrowBackOutline style={{ height: '40px', width: '60px', cursor: 'pointer' }} /> */}
                            <div className='smilingPaySub1Box1'>
                                <p className='PaymentMainTitle' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e' }}>Payment Card Method</p>

                                <div className='BilingMainApyment' style={{ marginTop: '40px' }}>
                                    <p className='PaymentMainTitle' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e' }}>Billing Address :</p>
                                    <p className='AddressTitle'>Name : <span className='AdressData'>{selectedAdd.shippingfirstname} {selectedAdd.shippinglastname}</span></p>
                                    <p className='AddressTitle'>Address : <span className='AdressData'>{selectedAdd.street}</span></p>
                                    <p className='AddressTitle'>City : <span className='AdressData'>{selectedAdd.city}-{selectedAdd.zip}</span></p>
                                    <p className='AddressTitle'>State : <span className='AdressData'>{selectedAdd.state},{selectedAdd.country}</span></p>
                                    <p className='AddressTitle'>Mobile : <span className='AdressData'>{selectedAdd.shippingmobile}</span></p>
                                </div>
                            </div>
                            <div className='smilingPaySub1Box2'>
                                <div className='orderSubmmuryMain'>
                                    <p className='PaymentMainTitle' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e' }}>Order Summary</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                        <p className='orderSubTitle'>Subtotal</p>
                                        <p style={{ fontWeight: 500, display: 'flex', margin: '0px' }}>

                                            <div className="currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />{TotlaPrice}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgb(233, 233, 233)', paddingBottom: "5px" }}>
                                        <p className='orderSubTitle'>Estimated Tax(3%)</p>
                                        <p style={{ fontWeight: 500, display: 'flex', margin: '0px' }}> <div className="currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />{TotlaPriceText}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <p className='orderSubTitle'>Estimated Total</p>
                                        <p style={{ fontWeight: 500, display: 'flex', margin: '0px' }}> <div className="currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />{finalTotal}</p>
                                    </div>
                                </div>
                                <div className='deliveryShiipingMain'>

                                <p className='PaymentMainTitle' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e' }}>Shipping Address :</p>
                                <div style={{ marginTop: '0px' }}>
                                    <p className='OrderNamMAinTitle' style={{ fontSize: '25px', margin: '0px', fontWeight: 500, color: '#5e5e5e' }}>{selectedAdd.shippingfirstname} {selectedAdd.shippinglastname}</p>
                                    <p className='AddressTitle'><span className='AdressData'>{selectedAdd.street}</span></p>
                                    <p className='AddressTitle'><span className='AdressData'>{selectedAdd.city}-{selectedAdd.zip}</span></p>
                                    <p className='AddressTitle'><span className='AdressData'>{selectedAdd.state},{selectedAdd.country}</span></p>
                                    <p className='AddressTitle'><span className='AdressData'>{selectedAdd.shippingmobile}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='smilingPaymentBtn'>
                        <button onClick={handlePayment} className='paymentBtn'>PAY ON ACCOUNT</button>
                    </div> */}

                    {/* <div style={{ display: 'flex', justifyContent: 'center',marginTop: '-100px' }}>
                        <img src='http://gstore.orail.co.in/assets/newfolder/images/account/blue-box.jpg' className='smilingPayentImg' />
                    </div> */}
                </div>

                {/* <div className='smilingPaymentMainMobile'>
                    <div className='paymentSubDiv' style={{ padding: '50px' }}>

                        <div style={{ width: '100%' }}>
                            <p className='mainTitleMobileShiping' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e' }}>Payment Card Method</p>

                            <div className='BilingAdressMain' style={{ marginTop: '40px' }}>
                                <p className='mainTitleMobileShiping' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e', margin: '0px' }}>Billing Address</p>
                                <p className='AddressTitle'>Name : <span className='AdressData'>{selectedAdd.shippingfirstname} {selectedAdd.shippinglastname}</span></p>
                                <p className='AddressTitle'>Address : <span className='AdressData'>{selectedAdd.street}</span></p>
                                <p className='AddressTitle'>City : <span className='AdressData'>{selectedAdd.city}-{selectedAdd.zip}</span></p>
                                <p className='AddressTitle'>State : <span className='AdressData'>{selectedAdd.state},{selectedAdd.country}</span></p>
                                <p className='AddressTitle'>Mobile : <span className='AdressData'>{selectedAdd.shippingmobile}</span></p>
                            </div>
                        </div>
                        <div style={{ width: '100%', marginTop: '30px' }}>
                            <p className='mainTitleMobileShiping' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e', marginBottom: '5px' }}>Shipping Address</p>
                            <div style={{ marginTop: '0px' }}>
                                <p className='shipingName' style={{ fontSize: '20px', margin: '0px', fontWeight: 500, color: '#5e5e5e' }}>{selectedAdd.shippingfirstname} {selectedAdd.shippinglastname}</p>
                                <p className='AddressTitle'><span className='AdressData'>{selectedAdd.street}</span></p>
                                <p className='AddressTitle'><span className='AdressData'>{selectedAdd.city}-{selectedAdd.zip}</span></p>
                                <p className='AddressTitle'><span className='AdressData'>{selectedAdd.state},{selectedAdd.country}</span></p>
                                <p className='AddressTitle'><span className='AdressData'>{selectedAdd.shippingmobile}</span></p>
                            </div>

                            <p className='mainTitleMobileShiping' style={{ fontSize: '25px', fontWeight: 500, color: '#5e5e5e', marginTop: '30px' }}>Order Summary</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Subtotal</p>
                                <p style={{ fontWeight: 500, display: 'flex' }}> <div className="currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />{TotlaPrice}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Estimated Tax</p>
                                <p style={{ fontWeight: 500, display: 'flex' }}> <div className="currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />{TotlaPriceText}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p>Estimated Total</p>
                                <p style={{ fontWeight: 500, display: 'flex' }}> <div className="currencyFont" dangerouslySetInnerHTML={{ __html: decodeEntities(currData?.Currencysymbol) }} />{finalTotal}</p>
                            </div>
                        </div>
                        <div className='smilingPaymentBtn'>
                            <button onClick={handlePayment} className='paymentBtn'>Place Order</button>
                        </div>

                        <p style={{ color: 'blue', textDecoration: 'underline', marginTop: '10px', textAlign: 'center' }} onClick={() => navigation('/Delivery')}>Cancel</p>
                    </div>
                </div> */}
            </div>
            <div
                style={{
                    position: 'absolute',
                    bottom: 'auto',
                    width: '100%'
                }}
            >
                <Footer />
            </div>
        </div>
    )
}
