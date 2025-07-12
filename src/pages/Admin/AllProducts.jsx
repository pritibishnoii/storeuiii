import React, { useEffect } from "react";
import { useAllProductsQuery } from "../../redux/api/productsApiSlice";
import { Link } from "react-router-dom";
import moment from "moment";
import { TbArrowBigRightLines } from "react-icons/tb";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log(products);
  if (isError) {
    return <div>Error loading products</div>;
  }
  if (isLoading)
    return (
      <div className="text-indigo-600 font-bold text-4xl mx-auto ml-[5rem]">
        Loading..............
      </div>
    );

  return (
    <div className="mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Products ({products?.product?.length})
          </div>

          <div className="flex flex-wrap justify-around items-center">
            {products?.product?.map((p) => (
              <Link
                key={p._id}
                to={`/admin/product/update/${p._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-[10rem] object-cover"
                  />

                  <div className="p-4 flex flex-col justify-around">
                    <div className="flex  justify-between">
                      <h1 className="text-xl font-semibold mb-2">{p?.name}</h1>
                      <p className="text-gray-400 text-xs">
                        {moment(p.createdAt).format("MMMM Do YYYY")}
                      </p>
                    </div>

                    <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                      {p?.description?.substring(0, 160)}
                    </p>

                    <div className="flex justify-between">
                      <Link
                        to={`/admin/product/update/${p._id}`}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                      >
                        <span> Update Product</span>
                        <TbArrowBigRightLines className="text-lg " />
                      </Link>
                      <p>${p?.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
