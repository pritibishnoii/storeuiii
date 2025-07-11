import React from "react";
import { useGetTopProductsQuery } from "../redux/api/productsApiSlice";
import Loader from "./Loader";
import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProducts from "../pages/Products/SmallProduct";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  // console.log(data.products);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1 className="text-4xl text-pink-600">ERROR</h1>;
  }

  return (
    <>
      <div className="flex justify-around flex-col mx-auto">
        <div className="xl:block lg:hidden md:hidden sm:hidden ml-[5rem] my-8">
          <div className="grid grid-cols-2">
            {data?.products?.map((product) => (
              <div key={product._id}>
                <SmallProducts product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
