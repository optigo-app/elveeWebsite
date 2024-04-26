import './App.css';
import { BrowserRouter} from 'react-router-dom';
import ThemeRoutes from './ThemeRoutes';
import { RecoilRoot, useRecoilState } from 'recoil';
// import { newTestProdData } from './Recoil/atom';
// import { newProdApiCalling } from './ALL-Theme/SMININGROCKS/Utils/API/ProductListAPI';
// import { useEffect } from 'react';

function App() {

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

  return (
    <RecoilRoot>
    <BrowserRouter>
      <ThemeRoutes />
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;