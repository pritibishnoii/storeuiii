import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productsApiSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import HeartIcon from "./HeartIcon";
import ProductTabs from "./ProductTabs";
import {
  FaStore,
  FaClock,
  FaStar,
  FaShoppingCart,
  FaBox,
} from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";

const ProductDetails = () => {
  const { id: productId } = useParams();
  //   console.log(productId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: products,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    const item = {
      ...products.product,
      qty: Number(qty),
      product: products.product._id, // required for backend
      _id: products.product._id, // required for backend
    };
    dispatch(addToCart(item));
    navigate("/cart");
  };

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-[3rem]">
        <Link
          to="/"
          className="text-white font-semibold hover:underline inline-block mb-4 sm:mb-6"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
              {/* Product Image Section */}
              <div className="lg:w-1/2 xl:w-2/5 relative">
                <img
                  src={products?.product?.image}
                  alt={products?.product?.name}
                  className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover rounded-lg shadow-lg"
                />
                <HeartIcon product={products} />
              </div>

              {/* Product Info Section */}
              <div className="lg:w-1/2 xl:w-3/5 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
                    {products?.product?.name}
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 leading-relaxed">
                    {products?.product?.description}
                  </p>

                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-pink-600 mb-6">
                    $ {products?.product?.price}
                  </p>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FaStore className="mr-3 text-pink-500 text-lg" />
                        <span className="text-sm sm:text-base">
                          Brand: {products?.product?.brand}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-3 text-pink-500 text-lg" />
                        <span className="text-sm sm:text-base">
                          Added: {moment(products?.product?.createAt).fromNow()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaStar className="mr-3 text-pink-500 text-lg" />
                        <span className="text-sm sm:text-base">
                          Reviews: {products?.product?.reviews?.length || 0}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FaStar className="mr-3 text-pink-500 text-lg" />
                        <span className="text-sm sm:text-base">
                          Ratings: {products?.product?.rating}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaShoppingCart className="mr-3 text-pink-500 text-lg" />
                        <span className="text-sm sm:text-base">
                          Quantity: {products?.product?.quantity}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaBox className="mr-3 text-pink-500 text-lg" />
                        <span className="text-sm sm:text-base">
                          In Stock: {products?.product?.countInStock}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ratings and Quantity Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <Ratings
                      value={products?.product?.rating}
                      text={`${products?.product.numReview ?? 0} reviews`}
                    />

                    {products?.product?.countInStock > 0 && (
                      <div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="p-2 sm:p-3 w-20 sm:w-24 rounded-lg text-pink-500 bg-white border border-gray-300 focus:border-pink-500 focus:outline-none"
                        >
                          {[
                            ...Array(products?.product?.countInStock).keys(),
                          ].map((x) => (
                            <option
                              key={x + 1}
                              value={x + 1}
                              className="text-gray-800"
                            >
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <div className="mb-8">
                    <button
                      onClick={addToCartHandler}
                      disabled={products?.countInStock === 0}
                      className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs Section */}
            <div className="mt-8 sm:mt-12 lg:mt-16">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                products={products}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
