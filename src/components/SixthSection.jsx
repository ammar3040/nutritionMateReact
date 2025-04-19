import React from 'react';

const SixthSection = () => {
  return (
    <section id="service" >
      <div className="container-fluid" >
        <div className="row" >
          <div className="col-lg-4 my-3" >
            <div className="e-card-2 border  rounded-4">
              <div className="img-frame position-relative">
                <img 
                  src={"assets/image/apple.jpg"} 
                  alt="Personalized Nutrition" 
                  className="img-fluid"
                  style={{
                    maxHeight:"260px",
                    width:"100%"
                  }}
                />
                <div className="cimg"></div>
                <p>
                  <i className="fa-solid fa-heart p-4 text-white fs-4 rounded-4"></i>
                </p>
              </div>
              <div className="e-body-2 m-0 p-3 w-100">
                <p className="fs-5 fw-bold p-0 m-0" style={{ color: '#23c483' }}>CARDIOLOGY</p>
                <h3 className="fw-bolder fs-2" style={{ color: '#142958' }}>
                  Personalized Nutrition
                </h3>
                <p className="text-secondary">
                  Our personalized nutrition foods are right for you & supplements should be taking with diet plan.
                </p>
              </div>
              <div className="me-btn w-100 row justify-content-between px-5 mb-2">
                <button className="btn-cssbuttons col-5 rounded-5">
                  <span>Button</span>
                  <span>
                    <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon">
                      <path fill="#ffffff" d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"></path>
                    </svg>
                  </span>
                  <ul>
                    <li>
                      <a href="https://twitter.com/SumethWrrn">
                        <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon">
                          <path fill="white" d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z"></path>
                        </svg>
                      </a>
                    </li>
                    {/* Other social icons... */}
                  </ul>
                </button>
                <button className="btn btn-white text-success col-6">
                  Read more<i className="fa-solid fa-right-long ms-2"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="col-lg-4 my-3 " style={{
            
          }}>
            <div className="e-card-2 border rounded-4">
              <div className="img-frame position-relative">
                <img 
                  src="/assets/image/nutritiont2.jpg" 
                  alt="Weight Loss Programs" 
                  className="img-fluid"
                />
                <div className="cimg"></div>
                <p>
                  <i className="fa-solid fa-lungs p-4 text-white fs-4 rounded-4"></i>
                </p>
              </div>
              <div className="e-body-2 m-0 p-3 w-100">
                <p className="fs-5 fw-bold p-0 m-0" style={{ color: '#23c483' }}>PULMOLOGY</p>
                <h3 className="fw-bolder fs-2" style={{ color: '#142958' }}>
                  Weight Loss Programs
                </h3>
                <p className="text-secondary">
                  Weight loss process doesn't mean strive to body but make the eating process healthy and fully exotic.
                </p>
              </div>
              <div className="me-btn w-100 row justify-content-between px-5 mb-2">
                <button className="btn-cssbuttons col-5 rounded-5">
                  <span>Button</span>
                  <span>
                    <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon">
                      <path fill="#ffffff" d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"></path>
                    </svg>
                  </span>
                  <ul>
                    <li>
                      <a href="https://twitter.com/SumethWrrn">
                        <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon">
                          <path fill="white" d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z"></path>
                        </svg>
                      </a>
                    </li>
                    {/* Other social icons... */}
                  </ul>
                </button>
                <button className="btn btn-white text-success col-6">
                  Read more<i className="fa-solid fa-right-long ms-2"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="col-lg-4 my-3">
            <div className="e-card-2 border rounded-4">
              <div className="img-frame position-relative">
                <img 
                  src="/assets/image/nutritiont3.jpg" 
                  alt="Individual Coaching" 
                  className="img-fluid"
                />
                <div className="cimg"></div>
                <p>
                  <i className="fa-solid fa-brain p-4 text-white fs-4 rounded-4"></i>
                </p>
              </div>
              <div className="e-body-2 m-0 p-3 w-100">
                <p className="fs-5 fw-bold p-0 m-0" style={{ color: '#23c483' }}>UROLOGY</p>
                <h3 className="fw-bolder fs-2" style={{ color: '#142958' }}>
                  Individual Coaching
                </h3>
                <p className="text-secondary">
                  We provide air conditioning service, repair maintenance support 24/7, delivered by qualified service engineers.
                </p>
              </div>
                <div className="me-btn w-100 row justify-content-between px-5 mb-2">
                <button className="btn-cssbuttons col-5 rounded-5">
                  <span>Button</span>
                  <span>
                    <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon">
                      <path fill="#ffffff" d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"></path>
                    </svg>
                  </span>
                  <ul>
                    <li>
                      <a href="https://twitter.com/SumethWrrn">
                        <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" className="icon">
                          <path fill="white" d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z"></path>
                        </svg>
                      </a>
                    </li>
                    {/* Other social icons... */}
                  </ul>
                </button>
                <button className="btn btn-white text-success col-6">
                  Read more<i className="fa-solid fa-right-long ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixthSection;