import React from "react";
import { Link,useNavigate } from "react-router-dom";

import fruitImg from "/assets/img/banner fruit.png";
import leafImg from "/assets/img/blur leaf.png";



const ProductSection = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/product-cards"); // Make sure this route is defined in your routing
//   };

  return (
    <section
      style={{
        height: "100vh",
        backgroundColor: "#87e64b",
      }}
      id="product"
    >
      <marquee
      behavior="scroll"
      direction="left"
      style={{
        backgroundColor: '#f0003c',
        color: 'white',
        padding: '10px 0',
        fontSize: '18px',
        fontWeight: 'bold'
      }}
    >
      🎉 Get 20% OFF on all protein products! Use coupon code: NUTRE20 💪   |    Buy Now    |     🎉 Get 20% OFF on all protein products! Use coupon code: NUTRE20 💪 
    </marquee>

      <div className="container" style={{ width: "100%" }}>
        <div className="mai-sec d-flex">
          <div className="contents w-100">
            <div className="main-img fa-bounce">
              <img src={"/assets/image/PrtMain.png"}alt="" />
            </div>
            <div className="left-img d-flex main-absulut fa-pulse">
              <img src={fruitImg} alt="" />
            </div>
            <div className="left-img d-flex main-absulut fa-pulse" style={{ left: "60%" }}>
              <img src={fruitImg} alt="" />
            </div>
            <div className="right-img d-flex main-absulut fa-shake">
              <img src={leafImg} alt="" />
            </div>
            <div className="right-img d-flex main-absulut fa-shake" style={{ left: "20%", top: "60%" }}>
              <img  src={leafImg} alt="" />
            </div>
            <div className="right-img d-flex main-absulut fa-shake" style={{ left: "7%", top: "20%" }}>
              <img  src={leafImg} alt="" />
            </div>
            <div className="right-img d-flex main-absulut fa-shake" style={{ left: "63%", top: "10%" }}>
              <img  src={leafImg} alt="" />
            </div>
            <div  style={{
              width:"100%",
              padding:"5px",
              margin:"0 auto",
              display:"flex",
              justifyContent:"center"
            }

            }>
              <Link to="/productcard">
              <button className="product-btn" >
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front text">shop</span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
