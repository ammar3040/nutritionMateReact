import React from 'react';

const FourSection = () => {
  return (
    <section className="s-3 position-relative overflow-hidden" id="blog" >
      <div className="container-fluid h-100">
        <div className="row justify-content-between h-100 gap-5">
        <div className="col-lg-7" >
            <div className="m-card pt-5">
              <h3 className="display-6 fw-bolder p-3 pt-5" style={{ color: '#142958' }}>
                Nourish Your Body, Elevate Your Health
              </h3>
              
              <div className="row" style={{ color: '#142958' }}>
                {/* Healthy Eating Section */}
                <div className="col-lg-3 col-md-12">
                  <p className="fw-bold p-0 m-0 fs-2 text-center">
                    <i className="fa-solid fa-apple-alt"></i>
                  </p>
                  <p className="fw-bolder p-0 m-0 mb-1">
                    Healthy Eating
                  </p>
                  <p>
                    Learn how to make informed food choices and develop a balanced diet for optimal health.
                  </p>
                </div>

                {/* Approach to Nutrition Section */}
                <div className="col-lg-8 col-md-12">
                  <p className="fw-bold">
                    Our Approach to Nutrition
                  </p>
                  <p>
                    We believe that nutrition is the foundation of overall health and well-being. Our team of experts provides personalized guidance on meal planning, nutrition counseling, and healthy lifestyle habits.
                  </p>
                </div>
              </div>
              <div
      className="row md-d-block gap-3 me-card-main"
      style={{ width: '80%', position: 'absolute', bottom: '5%', left:"20px" }}
    >
      <div
        className="col-lg-3 col-md-12 rounded-4 border"
        style={{
          backgroundColor: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
      >
        <div className="me-card my-3 mx-2">
          <span className="fs-2" style={{ color: '#9dca00' }}>
            <i className="fa-solid fa-leaf"></i>
          </span>
          <h3 className="fw-bold fs-5 py-3">Nutrition Services</h3>
          <p className="pb-5">
            Our team offers personalized nutrition counseling, meal planning,
            and wellness programs to help you achieve your health goals.
          </p>
        </div>
      </div>

      <div
        className="col-lg-3 col-md-12 rounded-4"
        style={{
          backgroundColor: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
      >
        <div className="me-card my-3 mx-2">
          <span className="fs-2" style={{ color: '#9dca00' }}>
            <i className="fa-solid fa-book"></i>
          </span>
          <h3 className="fw-bold fs-5 py-3">Nutrition Resources</h3>
          <p className="pb-5">
            Access our library of nutrition articles, recipes, and tips to help
            you make informed decisions about your diet and lifestyle.
          </p>
        </div>
      </div>

      <div
        className="col-lg-3 col-md-12 rounded-4"
        style={{
          backgroundColor: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
      >
        <div className="me-card my-3 mx-2">
          <span className="fs-2" style={{ color: '#9dca00' }}>
            <i className="fa-solid fa-chart-line"></i>
          </span>
          <h3 className="fw-bold fs-5 py-3">Nutrition News</h3>
          <p className="pb-5">
            Stay up-to-date with the latest nutrition news, research, and
            trends to help you stay informed and motivated.
          </p>
        </div>
      </div>
    </div>
            </div>
           
          </div>  
          {/* Image Column */}
          <div className="col-lg-4 h-75 rounded-4">
            <img 
              src="/assets/image/girl with jar.png" 
              alt="Healthy Food" 
              className="img-fluid my-5 rounded-4" 
              style={{
                height:"130vh",
                width:"800px"
              }}
             
            />
          </div>

          {/* Content Column */}
        
        </div>
      </div>
    </section>
  );
};

export default FourSection;