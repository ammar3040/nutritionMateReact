// ProductCard.jsx
import React from 'react';

function ProductCard({ name, price, image }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-sm">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2">{name}</h2>
      <p className="text-green-600 font-bold text-lg">₹{price}</p>
    </div>
  );
}

export default ProductCard;
