import React from 'react';
import { Link } from 'react-router-dom';

const SecondSection = () => {
  return (
    <section 
      id="plan"  
      className="my-4" 
      style={{ 
        color: 'black', 
        backgroundImage: 'url(/assets/image/hearthfoods.png)', // Updated path
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'right',
        backgroundSize: 'contain' // Added for better image display
      }}
    >
      <div className="container-fluid">
        <div className="col-md-6 py-5 ps-5">
          <h2 className="display-1 fw-bolder" style={{ color: '#9dca00' }}>
            Workout program made for you
          </h2>
          <p className="fs-5 text-black" style={{ fontStyle: 'italic' }}>
            senenatis iaculis. Donec a mi enim. Morbi euismod vel dolor vitae congue. Proin vel dui semper, bibendum leo in, pellentesque magna. Duis convallis sodales magna. Fusce eu nisl interdum.
          </p>
         <Link to={"/mealplanner/"}>  <button className="ms-btn">
              make plan
            </button></Link>
          
        </div>
      </div>
    </section>
  );
};

export default SecondSection;