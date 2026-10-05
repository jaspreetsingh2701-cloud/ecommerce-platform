import React from "react";

type ProductCardProps = {
  name: string;
  price: number;
};

const ProductCard = ({ name, price }: ProductCardProps) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <h3>{name}</h3>
      <p>₹{price}</p>

      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;