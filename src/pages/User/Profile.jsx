import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const a = useSelector((state) => state);
  // console.log(a);
  //   ?? (Nullish Coalescing)
  // ?? returns the right side only if the left side is null or undefined.
  const [username, setUserName] = useState(() => userInfo?.username ?? "");
  const [email, setEmail] = useState(() => userInfo?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   Extracting the updateProfile function
  // Extracting isLoading and renaming it to loadingUpdateProfile
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  useEffect(() => {
    setUserName(userInfo?.username ?? "");
    setEmail(userInfo?.email ?? "");
  }, [userInfo]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        });

        const updatedUser = res?.data?.updatedProfile;
        console.log(updatedUser);
        toast.success(res?.data?.message || "your profile Updated");
        dispatch(setCredentials(updatedUser));
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 mt-[3rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full border border-pink-500 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full  border border-pink-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full  border border-pink-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full  border border-pink-500 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 focus:outline-none"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 focus:outline-none"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
