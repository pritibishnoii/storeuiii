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
      <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 flex flex-col gap-8 mt-0">
        {/* Responsive Product Grid */}
        <div className="my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {data?.products?.map((product) => (
              <div key={product._id} className="flex justify-center">
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
