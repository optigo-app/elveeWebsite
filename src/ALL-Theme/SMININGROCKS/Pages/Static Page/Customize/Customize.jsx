import React, { useEffect } from 'react';
import "./customize.css";
import { storImagePath } from '../../../Utils/globalFunctions/GlobalFunction';
import Footer from '../../Components/home/Footer/Footer';

function Customize() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div>
        <img src={`${storImagePath()}/images/HomePage/Customize/CustomizeMainBanner.jpg`} className="bannercust" alt="#bannercust" />
      </div>
      <div>
        <div className="custtitle centerall_cust">Build your own unique design</div>
        <div className="custtitle centerall_cust">Types of Designs</div>
        <div className="cust_content">
          Our designers will work with you and help you to confidently select the elements in jewelry that you will like. It is our responsibility to make sure that we discover your needs before we execute a project for you. We are so confident in the custom jewelry design process that we create all of our customized jewelry on approval.
        </div>
      </div>
      <div className="cust_Section">
        <div><img src={`${storImagePath()}/images/HomePage/Customize/CustomizeSubBanner1.jpg`} alt="#custimg" className="cust_Section_img" /></div>
        <div className="cust_Section_info">
          <div className="cust_Section_info_1">Create New Design</div>
          <div className="cust_Section_info_2">If you're the creative type and have a design of your own or have seen a method that has inspired you, we will assist you to place your ideas into precious metals and gemstones. Our designers can run through logistics, feasibility, durability, and affordability with you. This is often a really rewarding process that leads to an ingenious piece of fine jewelry of your own design.</div>
        </div>
      </div>
      <div className="cust_Section">
        <div><img src={`${storImagePath()}/images/HomePage/Customize/CustomizeSubBanner2.jpg`} alt="#custimg" className="cust_Section_img" /></div>
        <div className="cust_Section_info">
          <div className="cust_Section_info_1">Modify Existing Design</div>
          <div className="cust_Section_info_2">Custom designs are mostly derived from existing jewelry, preferred with a different shape, size, or color stone. Frequently, our customers desire a piece of jewelry that they like, a touch thinner, longer, taller, or favor a special texture or pattern. We often face a challenge in finding ways to make similar jewelry at a price point that meets your budget. No problem, we will make it for you the way that you want it! You may have even found the right design except for its finishes. Simply switching the stone type or employing a different value could also be only enough to satisfy your personal taste.</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Customize;
