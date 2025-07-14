import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProducts = ({ product }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-3 sm:p-4 md:p-5">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
            <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-400 hover:text-pink-600 transition-colors duration-200 truncate">
              {product.name}
            </div>
            <span className="bg-pink-100 text-pink-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full dark:bg-pink-900 dark:text-pink-300 self-start sm:self-auto whitespace-nowrap inline-block">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProducts;
