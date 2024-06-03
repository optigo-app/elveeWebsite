import React, { useEffect, useState } from "react";
// import OrnazApp from './ALL-Theme/ORNAZ/ORNAZ_App'
import SmilingRocksApp from "./ALL-Theme/SMININGROCKS/SMININGROCKS_App";
import GORJANA_App from "./ALL-Theme/GORJANA/GORJANA_App";
import axios from "axios";

export default function ThemeRoutes() {
  const [storeInit, setStoreInit] = useState();
  const fetchData = async () => {
    const APIURL = "https://api.optigoapps.com/storev26/store.aspx";

    const header = {
      Authorization: "Bearer optigo_json_api",
      domain:
        window.location.hostname === "localhost" ||
        window.location.hostname === "zen"
          ? "estore.orail.co.in"
          : window.location.hostname,
      version: "Live",
      sp: "1",
    };

    try {
      const body = {
        con: '{"id":"","mode":"store_init"}',
        p: "",
        f: "formname (init)",
      };
      const response = await axios.post(APIURL, body, { headers: header });
      if (response.status === 200) {
        // localStorage.setItem('UploadLogicalPath', response.data.Data.rd[0].UploadLogicalPath);
        // localStorage.setItem('storeInit', JSON.stringify(response.data.Data.rd[0]));
        // localStorage.setItem('myAccountFlags', JSON.stringify(response.data.Data.rd1));
        // let title = response?.data?.Data?.rd[0]?.companyname
        // let favIcon = response?.data?.Data?.rd[0]?.favicon
        // let companyLogo = response?.data?.Data?.rd[0]?.companylogo
        //   setTitle(title);
        //   setFavIcon(favIcon)
        //   setCompanyTitleLogo(companyLogo);
        // window.scrollTo({
        //   top: 0,
        //   left: 0,
        //   behavior: 'smooth'
        // });
        let data = response.data.Data.rd2[0].theme;
        setStoreInit(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* <div>
        {false && <OrnazApp />}
      </div> */}
      {/* <div>{storeInit === "Theme2" && <SmilingRocksApp />}</div>
      <div>{storeInit === "Theme1" && <GORJANA_App />}</div> */}
      <SmilingRocksApp />
    </div>
  );
}
