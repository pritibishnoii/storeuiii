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
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
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
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div className="">
              <img
                src={products?.product?.image}
                alt={products?.product?.name}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
              />

              <HeartIcon product={products} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">
                {products?.product?.name}
              </h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {products?.product?.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">
                $ {products?.product?.price}
              </p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {products?.product?.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(products?.product?.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {products?.product?.reviews?.length || 0}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Ratings:{" "}
                    {products?.product?.rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {products?.product?.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {products?.product?.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={products?.product?.rating}
                  text={`${products?.product.numReview ?? 0} reviews`}
                />

                {products?.product?.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="p-2 w-[6rem] rounded-lg text-pink-500 "
                    >
                      {[...Array(products?.product?.countInStock).keys()].map(
                        (x) => (
                          <option
                            key={x + 1}
                            value={x + 1}
                            className="text-white"
                          >
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container mt-5">
                <button
                  onClick={addToCartHandler}
                  disabled={products?.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0 cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
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
