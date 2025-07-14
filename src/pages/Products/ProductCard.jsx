import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-full sm:max-w-sm w-full relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <section className="relative">
        <Link to={`/product/${p._id}`} className="block">
          <span className="absolute bottom-2 right-2 bg-pink-100 text-pink-800 text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full aspect-[4/3] object-cover rounded-t-lg"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-base sm:text-lg md:text-xl font-semibold text-white dark:text-white truncate max-w-[70%]">
            {p?.name}
          </h5>

          <p className="text-pink-500 font-semibold text-sm sm:text-base md:text-lg">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-xs sm:text-sm md:text-base text-[#CFCFCF] line-clamp-2">
          {p?.description?.substring(0, 60)} ...
        </p>

        <section className="flex justify-between items-center mt-auto gap-2">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 transition-colors duration-200"
          >
            Read More
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 sm:p-2.5 rounded-full hover:bg-gray-900 transition-colors duration-200"
            onClick={() => addToCartHandler(p, 1)}
            aria-label="Add to cart"
          >
            <AiOutlineShoppingCart size={22} className="sm:size-6" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
