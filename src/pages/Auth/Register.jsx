import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/userSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const r = useRegisterMutation();
  // console.log(r);
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        const { token, ...userData } = res;
        dispatch(setCredentials({ ...userData }, token));
        toast.success("User successfully registered");
        navigate(redirect);
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };
  return (
    <div>
      <section className="pl-[10rem] flex  flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <form className="container w-[40rem]" onSubmit={submitHandler}>
            <div className="my-[2rem]">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                type="text"
                id="name"
                placeholder="Enter Your Name"
                className="mt-2 p-3 border   border-gray-600 focus:border-pink-400 rounded w-full focus-within:outline-none placeholder:text-gray-400 text-sm"
              />
            </div>

            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                id="email"
                placeholder="Enter Your Email"
                className="mt-2 p-3 border   border-gray-600 focus:border-pink-400 rounded w-full focus-within:outline-none placeholder:text-gray-400 text-sm"
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder="Enter Your Password"
                className="mt-2 p-3 border   border-gray-600 focus:border-pink-400 rounded w-full focus-within:outline-none placeholder:text-gray-400 text-sm"
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="c-password"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                id="c-password"
                placeholder="Enter Your  Confirm Password"
                className="mt-2 p-3 border   border-gray-600 focus:border-pink-400 rounded w-full focus-within:outline-none placeholder:text-gray-400 text-sm"
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-white">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
          alt=""
          className="h-[30rem] w-[50%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    </div>
  );
};

export default Register;
