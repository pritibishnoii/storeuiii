import React from "react";
import { useSelector } from "react-redux";
import { selectFavoritesProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

export const Favorites = () => {
  const favorites = useSelector(selectFavoritesProduct);
  //   console.log(favorites);
  return (
    <div>
      <div className="ml-[10rem]">
        <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
          FAVORITE PRODUCTS
        </h1>

        <div className="flex flex-wrap">
          {favorites.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
