import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 mt-8 mb-[8rem]">
      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-300">
          Your cart is empty{" "}
          <Link to="/shop" className="text-pink-500 underline">
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-4 text-center lg:text-left">
              Shopping Cart
            </h1>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start mb-6 p-4 bg-[#181818] rounded-lg shadow-sm"
              >
                <div className="w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 sm:ml-4 text-center sm:text-left">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-pink-500 font-semibold text-base sm:text-lg"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-2 text-white text-sm sm:text-base">
                    {item.brand}
                  </div>
                  <div className="mt-2 text-white font-bold text-base sm:text-lg">
                    $ {item.price}
                  </div>
                </div>

                <div className="w-full sm:w-24 mt-4 sm:mt-0">
                  <select
                    className="w-full p-2 border rounded text-white bg-[#222]"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:w-96">
            <div className="p-6 bg-[#181818] rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-center lg:text-left">
                Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>

              <div className="text-2xl font-bold text-center lg:text-left">
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>

              <button
                className="bg-pink-500 mt-6 py-3 px-6 rounded-full text-lg w-full cursor-pointer hover:bg-pink-600 transition-colors duration-200"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
