import React from 'react';


const ThirdSection = () => {
  return (
    <section className="mt-5" id="3">
      <div className="container-fluid">
        <div className="row">
          {/* First Card - Working Hours */}
          <div className="col-lg-4 my-3">
            <div className="e-card-1 p-3 px-auto pt-2 rounded-4 fw-bold text-white">
              <h2 className="display-5 text-white my-2">Working Hours</h2>
              
              {/* Thursday */}
              <div className="e-time row text-white justify-content-between border-bottom text-center border-gray mt-3 px-2 py-2">
                <span className="col-4 py-1 border-bottom border-1">Thursday</span>
                <span className="col-4 py-1 border-bottom border-1">10AM-6PM</span>
                <span className="col-4 border-bottom border-1">
                  <button className="btn border-0 btn-light py-1 px-2 mb-2">
                    <i className="fa-solid fa-utensils"></i>
                    View Meal Plan
                  </button>
                </span>
              </div>
              
              {/* Friday */}
              <div className="e-time row text-white justify-content-between border-bottom text-center border-gray mt-3 px-2 py-2">
                <span className="col-4 py-1 border-bottom border-1">Friday</span>
                <span className="col-4 py-1 border-bottom border-1">12PM-6PM</span>
                <span className="col-4 border-bottom border-1">
                  <button className="btn border-0 btn-light py-1 px-2 mb-2">
                    <i className="fa-solid fa-utensils"></i>
                    View Meal Plan
                  </button>
                </span>
              </div>
              
              {/* Weekend */}
              <div className="e-time row text-white justify-content-between border-bottom text-center border-gray mt-3 px-2 py-2">
                <span className="col-4 py-1 border-bottom border-1">Sat-Sunday</span>
                <span className="col-4 py-1 border-bottom border-1">Closed</span>
                <span className="col-4 border-bottom border-1"></span>
              </div>
              
              <p className="fs-5 fw-bold pt-4">Not Flexible with Schedule?</p>
              <p className="fw-semibold pt-2 pb-3">We provide personalized, high-quality nutritional plans tailored to your needs.</p>
              
              <button className="w-100 e-btn-main">
                <span className="transition"></span>
                <span className="gradient"></span>
                <span className="label">
                  <i className="fa-solid fa-calendar-check mx-3"></i>SUGGEST MEAL PLAN TIME
                </span>
              </button>
            </div>
          </div>

          {/* Second Card - Personalized Nutrition */}
          <div className="col-lg-4 my-3">
            <div className="e-card-2 border h-100 rounded-4">
              <div className="img-frame position-relative">
                <img src={"../../public/assets/image/apple.jpg"} alt="" className="img-fluid"/>
                <div className="img"></div>
                <p>
                  <i className="fa-solid fa-apple-whole p-4 text-white fs-4 rounded-4"></i>
                </p>
              </div>
              <div className="e-body-2 m-0 p-3 w-100">
                <h3 className="fw-bolder fs-3"> Personalized Nutrition <br/> Solutions</h3>
                <p className="text-secondary">
                  We help you craft a tailored meal plan to meet your health and fitness goals, keeping you balanced and nourished.
                </p>
              </div>
            
              <button className="btn btn-white text-success">
                Learn More<i className="fa-solid fa-right-long ms-2"></i>
              </button>
            </div>
          </div>

          {/* Third Card - Nutrition Guidance */}
          <div className="col-lg-4 my-3">
            <div className="e-card-2 border h-100 rounded-4">
              <div className="img-frame position-relative">
                <img src={"../../public/assets/image/girlgrind.jpg"} alt="" className="img-fluid"/>
                <div className="img"></div>
                <p>
                  <i className="fa-solid fa-carrot p-4 text-white fs-4 rounded-4"></i>
                </p>
              </div>
              <div className="e-body-2 m-0 p-3 w-100">
                <h3 className="fw-bolder fs-3"> Nutrition Guidance <br/> For You</h3>
                <p className="text-secondary">
                  Get easy, personalized meal suggestions to help you stay on track with your fitness goals, without any long-term commitments.
                </p>
              </div>
            
              <button className="btn btn-white text-success">
                Explore More<i className="fa-solid fa-right-long ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;