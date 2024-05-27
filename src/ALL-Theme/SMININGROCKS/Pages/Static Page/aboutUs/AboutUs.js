import React, { useEffect, useState } from 'react';
import "./AboutUs.css"
import Footer from '../../Components/home/Footer/Footer';
import { storImagePath } from '../../../Utils/globalFunctions/GlobalFunction';
import CompanyBanner from '../../Components/home/ComapnayData/CompanyData';

function AboutUs() {
  const [activeTab, setActiveTab] = useState(1);

  const checkDetail = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="aboutustabinfo">
            Established in 2017 and housed in the heart of Gujarat’s inner south,
            Elvee Jewels is a name that embodies a trend of designing and
            manufacturing jewelry that is synonymous with beauty and
            sophistication.
            <br />
            <br />
            We are constantly creating innovative strategies to provide the finest
            quality products according to all social and cultural trends. It has a
            reputation for doing things differently, with a keen eye for beauty
            and modern technology. We are focused on serving customers with
            refined taste and love to be beautiful. Elvee has proven beyond a
            doubt their commitment to designing timeless pieces of jewelry.
            <br />
            <br />
            We believe we are on the right path towards the accomplishment of our
            vision with Promise. Promise is renowned for its modern jewelry. It
            has fused inspiration and technical processes into creations to
            develop brilliant collections. We always say that style defines who
            you are and enhances your personality keeping this in mind we are
            introducing to you a new range of jewelry.Lovent - High Fashion
            Jewelry. Beyond Basic - Lab-grown Diamond jewelry, Nuera - Gold
            jewelry, Diament - Platinum Jewelry. An array of wondrous pieces
            spotlighting the same boundless creativity and expertise.
          </div>
        );
      case 2:
        return (
          <div className="aboutustabinfo">
            Our vision? It’s simple. We strive each day to build a beautiful company. Of course, beauty means different things to
            different people and our goal is to be successful at every level; for both our customers and the team. People at Elvee
            are smart, ambitious, go-getters and love what they do. We believe in authenticity and all our interactions are genuine.
            When you love what you do, you’re inspired to do it better every day.
          </div>
        );
      case 3:
        return (
          <div className="aboutustabinfo">
            Our commitment is to provide our customers with the most creative, and highest value end-to-end products.
            Our strategy to realize this goal is simple: via customer-centric. The customer is always at the center
            of our business.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <img
          src={`${storImagePath()}/images/HomePage/AboutUs/AboutUsMainBannerImg.jpg`}
          alt="#mainbanner"
          className="mainbannerabus"
        />
      </div>
      <div className="aboutustitle centerall">about us</div>
      <div className="aboutuscontent">
        <div className="tabpart">
          <div className="tabpart_tabs">
            <div
              className={`aboutustabtitle ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => checkDetail(1)}
            >
              ABOUT
            </div>
            <div
              className={`aboutustabtitle ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => checkDetail(2)}
            >
              OUR MISSION
            </div>
            <div
              className={`aboutustabtitle ${activeTab === 3 ? 'active' : ''}`}
              onClick={() => checkDetail(3)}
            >
              OUR GOAL
            </div>
          </div>
          {renderTabContent()}
        </div>
        <div className="imgpart">
          <img
            src={`${storImagePath()}/images/HomePage/AboutUs/AboutUsVisitngImg.jpg`}
            className="visitimgau"
            alt="#content"
          />
        </div>
      </div>
      <CompanyBanner />
      {/* <div className="aboutuscompany">
        <div className="aboutuscompany_w_1">
          <div className="aboutuscompany_w_1_info">Established Excellence</div>
          <div className='aboutdesc'>A Legacy of success, dream by passion and innovation</div>
        </div>
        <div className="aboutuscompany_w">
          <div className="aboutuscompany_w_1_info">6</div>
          <div>Working Year</div>
        </div>
        <div className="aboutuscompany_w">
          <div className="aboutuscompany_w_1_info">150+</div>
          <div>Happy Client</div>
        </div>
        <div className="aboutuscompany_w">
          <div className="aboutuscompany_w_1_info">5000+</div>
          <div>Design</div>
        </div>
        <div className="aboutuscompany_w">
          <div className="aboutuscompany_w_1_info">450+</div>
          <div>Worker & Team</div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
}

export default AboutUs;
