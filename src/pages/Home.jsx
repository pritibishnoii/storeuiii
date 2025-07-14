import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productsApiSlice";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mt-8 sm:mt-12 lg:mt-16">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left mb-2 md:mb-0">
                Special Product
              </h1>
              <Link
                to="/shop"
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full py-2 px-6 sm:px-8 md:px-10 transition-colors duration-200 w-full md:w-auto text-center"
              >
                Shop
              </Link>
            </div>

            <div className="mt-8 sm:mt-12">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {data?.products?.map((product) => (
                  <div key={product._id} className="flex justify-center">
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
