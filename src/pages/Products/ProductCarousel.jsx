import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { useGetTopProductsQuery } from "../../redux/api/productsApiSlice";

const ProductCarousel = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  // console.log(data.products);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 mx-auto my-8 w-full max-w-screen-xl px-2 sm:px-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings}>
          {data?.products?.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-[26rem] xl:h-[30rem] rounded-lg object-cover"
                />

                <div className="mt-4 flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-bold">{name}</h2>
                    <p className="text-pink-600 font-semibold text-base sm:text-lg">
                      $ {price}
                    </p>
                    <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-full lg:max-w-md">
                      {description.substring(0, 170)} ...
                    </p>
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <h1 className="flex items-center text-sm sm:text-base">
                        <FaStore className="mr-2 text-pink-500" /> Brand:{" "}
                        {brand}
                      </h1>
                      <h1 className="flex items-center text-sm sm:text-base">
                        <FaClock className="mr-2 text-pink-500" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center text-sm sm:text-base">
                        <FaStar className="mr-2 text-pink-500" /> Reviews:{" "}
                        {numReviews}
                      </h1>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h1 className="flex items-center text-sm sm:text-base">
                        <FaStar className="mr-2 text-pink-500" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center text-sm sm:text-base">
                        <FaShoppingCart className="mr-2 text-pink-500" />{" "}
                        Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center text-sm sm:text-base">
                        <FaBox className="mr-2 text-pink-500" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
