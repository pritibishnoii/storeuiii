import React from "react";
import { useSelector } from "react-redux";
import { selectFavoritesProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

export const Favorites = () => {
  const favorites = useSelector(selectFavoritesProduct);
  //   console.log(favorites);
  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        FAVORITE PRODUCTS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {favorites.map((product) => (
          <div key={product._id} className="flex justify-center">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
