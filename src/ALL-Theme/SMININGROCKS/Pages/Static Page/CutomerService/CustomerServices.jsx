import React, { useEffect } from 'react';
import "./CustomerService.css"; // Assuming you have a CSS file for styling
import { storImagePath } from '../../../Utils/globalFunctions/GlobalFunction';
import Footer from '../../Components/home/Footer/Footer';

function CustomerService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div>
        {/* Main Banner */}
        <img src={`${storImagePath()}/images/HomePage/CustomerService/CustomerServiceMainBanner1Img.jpg`} className="bannercs" alt="#banner" />
      </div>
      <div>
        {/* Title */}
        <div className="cstitle centerall_cs">AFTER SALES SERVICE</div>
        {/* Content */}
        <div className="cs_content">
          Our commitment is to provide you with the highest level of jewelry care services. Our experts will be delighted to offer you advice and 
          services to personalize your jewels, restore them, or simply preserve their beauty and longevity.
        </div>
      </div>
      <div className="cs_section">
        {/* Engraving Service */}
        <div className="cs_section_box">
          <div><img src={`${storImagePath()}/images/HomePage/CustomerService/CustomerServicesSubnBanner1Img.jpg`} alt="#engrave" className="cs_section_img" /></div>
          <div className="cs_section_box_title">Engraving Service</div>
          <div className="cs_section_box_title_2">Crafting memories that last a lifetime with our precision engraving service. Personalize your moments with intricate details and heartfelt 
            messages. Elevate your cherished possessions with a touch of uniqueness. Unleash the art of engraving – where every mark tells a story.
          </div>
        </div>
        {/* Cleaning and Polishing */}
        <div className="cs_section_box">
          <div><img src={`${storImagePath()}/images/HomePage/CustomerService/CustomerServicesSubnBanner2Img.jpg`} alt="#engrave" className="cs_section_img" /></div>
          <div className="cs_section_box_title">Cleaning and Polishing</div>
          <div className="cs_section_box_title_2">Elevate your surroundings with our exceptional cleaning and services. Impeccable cleanliness, efficient solutions, and a commitment to 
            excellence define our work. Experience a space that radiates freshness and order, tailored just for you. Discover the difference of our 
            dedicated approach to cleaning and services.                    
          </div>
        </div>
        {/* Repair Service */}
        <div className="cs_section_box">
          <div><img src={`${storImagePath()}/images/HomePage/CustomerService/CustomerServicesSubnBanner3Img.jpg`} alt="#engrave" className="cs_section_img" /></div>
          <div className="cs_section_box_title">Repair Service</div>
          <div className="cs_section_box_title_2">Your jewel is a precious creation and proper care in its use and handling will preserve its shine over time. If you see any signs of damage, 
            you should refrain from wearing it until you have had it examined at our display office. We will take care of your jewel and broken parts may be repaired 
            to restore the beauty of your jewel. You will receive a quotation once the type of service that needs to be carried out has been assessed.
            The service will be carried out as quickly as possible, upon your acceptance.
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default CustomerService;
