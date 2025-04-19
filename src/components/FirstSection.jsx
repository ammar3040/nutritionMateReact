import React from 'react';
import mainbanner from "../../../public/assets/image/LOGOMAIN.PNG";
import "../../assets/css/style.css"
import "../../assets/css/bootstrap.min.css"
import Marquee from "react-fast-marquee";


function FirstSection() {
  return (
    <section className="position-relative overflow-hidden"  id="2" style={{backgroundColor:"#ffffff"}}>
      <div>
        <div className="s-main justify-content-between d-flex text-center  w-100">
          
          {/* Left Column with Logo */}
          <div className="col-lg-4 align-content-center ms-5 s-logo color-primary">
            {/* Direct image path */}
            <img 
              src="/assets/image/mutritionmatefood.png" 
              alt="Cliniq Logo"
              style={{ maxWidth: '160%' }}
            />
            
            <div className="s-button  ">
              <button className="s-btn-1 px-2 py-2 mb-5 fs-4 border-0 rounded-4">
                Online documentation
              </button>
              <button className="s-btn-2 px-2 py-2 mb-5 ms-5 fs-4 rounded-4">
                24/7 for Your help
              </button>
            </div>
          </div>
          
          {/* Right Column with Main Image */}
          <div className="col-lg-7  ms-5 mt-5 s-image h-font  right">
            {/* Direct image path */}
            <img 
              src={mainbanner}
              alt="Main Logo" 
              className="w-80 " 
              style={{maxWidth:"500px", margin:0}}
            />
          </div>
          
        </div>
      </div>
      
      {/* Marquee text */}
     <Marquee>
        "Nourish your body, transform your life with Nutrition Mate!"
        </Marquee>
    </section>
  );
}

export default FirstSection;