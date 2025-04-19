import React from 'react';

const FifthSection = () => {
  return (
    <section 
      className="vh-100 my-5" 
      style={{ 
        backgroundImage: 'url(/assets/image/bg-5.jpg)', 
        overflow: 'hidden' 
      }} 
      id="5"
    >
      <div className="row h-100 justify-content-between">
        {/* Left Column - Image and Title */}
        <div className="col-4 h-100 row align-content-end">
          <div className="img-dr position-relative ms-5">
            <img 
              src="/assets/image/inner_team_01.png" 
              alt="Our Providers" 
              className="img-fluid m-0 p-0 h-font" 
              style={{ transform: 'scale(1.4)' }} 
            />
            <h2 
              className="display-4 fw-bolder w-100 text-center"
              style={{ 
                color: '#142958', 
                position: 'absolute', 
                bottom: '10px', 
                left: '0' 
              }}
            >
              Our Providers
            </h2>
          </div>
        </div>

        {/* Right Column - Testimonial */}
        <div className="col-7 row align-content-center text-left">
          <div>
            <img 
              src="/assets/image/quotation-mark.png" 
              alt="Quotation mark" 
              style={{ transform: 'scale(1.5)' }} 
            />
          </div>
          <p 
            className="display-5 ps-5 fw-semibold" 
            style={{ 
              color: '#142958', 
              fontStyle: 'italic' 
            }}
          >
            Nutrition Mate offers expert-backed meal plans that are tailored for optimal health and well-being.
          </p>
          <div className="ps-5 mt-5 w-100">
            <img 
              src="/assets/image/signature_03.png" 
              alt="Signature" 
            />
            <p className="fw-bolder fs-5 p-0 m-0" style={{ color: '#142958' }}>
              Dr Johnatan Smith
            </p>
            <p className="p-0 pt-1 m-0" style={{ color: '#142958' }}>
              Chief Medical Officer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;