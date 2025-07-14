import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  // console.log(product.image);
  return (
    <>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto p-2 sm:p-3 md:p-4 relative">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <HeartIcon product={product} />
        </div>

        <div className="p-3 sm:p-4 md:p-5">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
              <div className="text-base sm:text-lg md:text-xl font-semibold text-gray-400 hover:text-pink-600 transition-colors duration-200">
                {product.name}
              </div>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2 py-1 rounded-full dark:bg-pink-900 text-center dark:text-pink-300 self-start sm:self-auto whitespace-nowrap inline-block">
                $ {product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Product;
