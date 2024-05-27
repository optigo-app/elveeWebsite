import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ThemeRoutes from './ThemeRoutes';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
// import { newTestProdData } from './Recoil/atom';
// import { newProdApiCalling } from './ALL-Theme/SMININGROCKS/Utils/API/ProductListAPI';
// import { useEffect } from 'react';

function App() {
  const [storeInitData, setStoreInitData] = useState();
  //   const [largeProdData,setLargeProdData] = useRecoilState(newTestProdData)

  //   const getAllProdData = async() =>{
  //     await newProdApiCalling().then((res)=>{
  //         console.log("res",res)
  //         setLargeProdData(res)
  //     })
  // }

  //   useEffect(()=>{
  //     if(!largeProdData.length){
  //       getAllProdData()
  //     }
  //   },[])

  //   console.log("largeProdData",largeProdData)

  useEffect(() => {
    const storeInit = JSON.parse(localStorage.getItem("storeInit")) ?? ""
    setStoreInitData(storeInit);
    console.log('hhwhudhuwhu--', storeInit);
  }, [])

  return (
    <>
      <Helmet>
        <title>{storeInitData?.companyname}</title>
        <meta name="description" content={storeInitData?.companyname} />
        <link rel="icon" type="image/png" href={storeInitData?.favicon} sizes="16x16" />
        <link rel="apple-touch-icon" href={storeInitData?.favicon} />
        <link rel="manifest" href={storeInitData?.favicon} />
      </Helmet>
      <RecoilRoot>
        <BrowserRouter>
          <ThemeRoutes />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;