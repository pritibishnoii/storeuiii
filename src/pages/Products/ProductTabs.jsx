import React, { useState } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productsApiSlice";
import Loader from "../../components/Loader";
import Ratings from "./Ratings";
import SmallProducts from "./SmallProduct";
import { Link } from "react-router-dom";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  products,
}) => {
  //   console.log(products.product.reviews[0].name);
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);
  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
      {/* Tab Navigation */}
      <section className="flex flex-row lg:flex-col border-b lg:border-b-0 lg:border-r border-gray-600 lg:min-w-[200px] xl:min-w-[250px]">
        <div
          className={`flex-1 lg:flex-none p-3 sm:p-4 cursor-pointer text-sm sm:text-base lg:text-lg border-b lg:border-b-0 lg:border-r border-transparent transition-all    whitespace-nowrap duration-200 ${
            activeTab === 1
              ? "font-bold text-pink-500 border  border-b-pink-600"
              : "text-gray-400 hover:text-white "
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 lg:flex-none p-3 sm:p-4 cursor-pointer text-sm sm:text-base lg:text-lg border-b lg:border-b-0 lg:border-r border-transparent transition-all  whitespace-nowrap rounded-lg   duration-200 ${
            activeTab === 2
              ? "font-bold text-pink-500 border  border-b-pink-600"
              : "text-gray-400 hover:text-white "
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 lg:flex-none p-3 sm:p-4 cursor-pointer text-sm sm:text-base lg:text-lg border-b lg:border-b-0 lg:border-r border-transparent transition-all whitespace-nowrap rounded-lg  duration-200 ${
            activeTab === 3
              ? "font-bold text-pink-500 border  border-b-pink-600"
              : "text-gray-400 hover:text-white "
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {/* Tab Content */}
      <section className="flex-1">
        {activeTab === 1 && (
          <div className="mt-4 lg:mt-0 mb-[5rem]">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-lg sm:text-xl mb-2 font-semibold"
                  >
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] p-3 border border-gray-600 rounded-lg text-pink-500 bg-gray-800 focus:border-pink-500 focus:outline-none transition-colors duration-200"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block text-lg sm:text-xl mb-2 font-semibold"
                  >
                    Comment
                  </label>

                  <textarea
                    id="comment"
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full sm:w-80 md:w-96 lg:w-[500px] xl:w-[600px] p-3 border border-gray-600 rounded-lg text-pink-500 bg-gray-800 focus:border-pink-500 focus:outline-none transition-colors duration-200 resize-vertical"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                >
                  {loadingProductReview ? "Submitting..." : "Submit"}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg mb-4">
                  Please{" "}
                  <Link
                    to="/login"
                    className="text-pink-500 hover:text-pink-400 underline"
                  >
                    sign in
                  </Link>{" "}
                  to write a review
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="mt-4 lg:mt-0 mb-[8rem]">
            {products?.product?.reviews?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-400">No Reviews</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products?.product?.reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                      <strong className="text-pink-400 text-sm sm:text-base">
                        {review.name}
                      </strong>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {review.createdAt?.substring(0, 10) || ""}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
                      {review.comment}
                    </p>
                    <Ratings value={review.rating} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 3 && (
          <div className="mt-4 lg:mt-0">
            {!data.products ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-14">
                {data?.products?.map((product) => (
                  <div key={product._id} className="flex justify-center">
                    <SmallProducts product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
