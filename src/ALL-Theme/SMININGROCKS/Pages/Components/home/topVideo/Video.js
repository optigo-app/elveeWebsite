import React, { useState, useEffect } from "react";
import "./Video.css";
import { storImagePath } from "../../../../Utils/globalFunctions/GlobalFunction";
import CountdownTimer from '../CountDownTimer/CountDownTimer'
import { useRecoilValue } from "recoil";
import { loginState } from "../../../../../../Recoil/atom";
import ReactPlayer from 'react-player';
import Skeleton from '@mui/material/Skeleton';
import { LocalDining } from "@mui/icons-material";
export default function Video() {
  const islogin = useRecoilValue(loginState);
  const [loading, setLoading] = useState(true);
  const [isLoginStatus, setIsloginStatus] = useState();
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    if (islogin) {
      setIsloginStatus(islogin)
    }
  }, [])

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const handleVideoPlay = () => {
    setVideoStarted(true);
    setLoading(false);
  };
  
console.log('loding--', loading);
  return (
    <div>
      {islogin == 'false' ? (
        <>
          {loading == 'true' ? (
            <Skeleton variant="rectangular" width='100%' height={700} animation="wave" />
          ) : (
            <ReactPlayer
              url={`${storImagePath()}/images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`}
              playing={true}
              muted={true}
              controls={!videoStarted}
              loop={true}
              width='100%'
              height='auto'
              onReady={handleVideoLoad}
              onPlay={handleVideoPlay}
            />
          )}
        </>
      ) :
        <>
          <img loading="lazy" src={`${storImagePath()}/images/HomePage/MainBanner/image/HomepageMainBannerVideo.png`} style={{ width: '100%' }} />
          <CountdownTimer />
        </>
      }
    </div>
  );
}
