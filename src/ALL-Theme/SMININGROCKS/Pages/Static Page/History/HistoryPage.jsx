import React, { useEffect } from 'react';
import './HistoryPage.css';
import Footer from '../../Components/home/Footer/Footer';
import { storImagePath } from '../../../Utils/globalFunctions/GlobalFunction';

function History() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
    <div className="hsitroymainbanner">
      <img
       src={`${storImagePath()}/images/HomePage/History/HistoryMainBanner.jpg`}
        alt="#mainbanner"
        className="mainbanner_h"
      />
    </div>
    <div>
      <div className="historytitle centerall_h">OUR HISTORY</div>
      <div className="history_content">
        Welcome to our History page, where we invite you to embark on an exciting
        journey through the annals of time. From ancient civilizations to
        modern-day marvels, we've curated a captivating collection of historical
        events, stories, and personalities that have shaped the world we live in
        today. Join us as we unravel the threads of history, gaining insights into
        the past and discovering how it influences our present and future.
      </div>
    </div>
    <div className="history_journey">
      <div className="history_journey_1">
        <div className="hbox1">
          <div className="hbox1_1" />
          <div className="hbox1_2">
            <div className="hbox1_2_info">2017</div>
            <div className="hbox1_2_info_content">Elvee was established</div>
          </div>
        </div>
        <br />
        <br />
        <div className="hbox1">
          <div className="hbox1_1">
            <div className="hbox1_2_info end_h">2019</div>
            <div className="hbox1_2_info_content end_h">
              Promise Brand Was established
            </div>
          </div>
          <div className="hbox1_2" />
        </div>
        <br />
        <br />
        <div className="hbox1">
          <div className="hbox1_1" />
          <div className="hbox1_2">
            <div className="hbox1_2_info">2021</div>
            <div className="hbox1_2_info_content">
              The foundation of our new factory at ichchapore was laid and
              expanded to a fully functional production unit of about 20000 Sq.ft.
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="hbox1">
          <div className="hbox1_1">
            <div className="hbox1_2_info end_h">2022</div>
            <div className="hbox1_2_info_content end_h">
              Started operation in USA and started corporate exposure.
            </div>
          </div>
          <div className="hbox1_2" />
        </div>
        <br />
        <br />
        <div className="hbox1">
          <div className="hbox1_1" />
          <div className="hbox1_2">
            <div className="hbox1_2_info">2023</div>
            <div className="hbox1_2_info_content">Started four more brands.</div>
          </div>
        </div>
        <br />
        <br />
        <div className="hbox1">
          <div className="hbox1_1">
            <div className="hbox1_2_info end_h">2024</div>
            <div className="hbox1_2_info_content end_h">
              Started operation at new factory, Ichachapore.
            </div>
          </div>
          <div className="hbox1_2" />
        </div>
      </div>
      <div className="history_journey_2">
        <img
          src={`${storImagePath()}/images/HomePage/History/HistorySubBanner1.jpg`}
          className="h_ownerimg"
          alt="#historyimg"
        />
      </div>
    </div>
    <Footer/>
  </div>
  
  );
}

export default History;
