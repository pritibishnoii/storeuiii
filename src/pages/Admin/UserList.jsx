import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/userSlice";

import { useEffect, useState } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import AdminMenu from "./AdminMenu";
import Modal from "../../components/Modal";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  // console.log({ users });
  const [deleteUser] = useDeleteUserMutation();
  const [updatedUser] = useUpdateUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async () => {
    try {
      await deleteUser(userIdToDelete);
      setShowModal(false);
      setUserIdToDelete(null);
      refetch(); // for rendering updated users
    } catch (err) {
      toast.error(err.data.message || "error while deleting user  ");
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      updatedUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null); //  state reset  the state  for close UI edit mode
      refetch(); //function user list  fetch  karta taki UI mai updated data dikhe
    } catch (err) {
      toast.error(err.data.message || "error occure while updated user");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold my-6 text-center uppercase ">
        Users Details
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <table className="w-full md:w-4/5 mx-auto my-2">
            <thead>
              <tr className="bg-linear-to-r from-[#f74c9b] to-[#721f76] ">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users?.usersData?.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg"
                          />
                          <button
                            className="ml-2 bg-blue-800 text-white py-2 px-4 rounded-lg cursor-pointer "
                            onClick={() => updateHandler(user._id)}
                          >
                            <FaCheck className="ml-[1rem] " />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}{" "}
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            value={editableUserEmail}
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-800 text-white py-2 px-4 rounded-lg cursor-pointer"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center ">
                          <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-[1rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-800" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    {/* if user is not admin  */}
                    <td className="px-4 py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            onClick={() => {
                              setUserIdToDelete(user._id);
                              setShowModal(true);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setUserIdToDelete(null);
          }}
          onConfirm={deleteHandler}
          onCancel={() => {
            setShowModal(false);
            setUserIdToDelete(null);
          }}
        >
          <div className="px-4 py-2">
            <h2 className="text-pink-200 font-semibold">
              Are you sure you want to delete this user?
            </h2>
            <div className=" flex justify-around mt-4">
              <button
                className="cursor-pointer bg-pink-500 text-white px-4 py-2 rounded mr-2 font-semibold "
                onClick={deleteHandler}
              >
                Delete
              </button>
              <button
                className=" cursor-pointer bg-gray-300 px-4 py-2 rounded text-pink-600 font-semibold"
                onClick={() => {
                  setShowModal(false);
                  setUserIdToDelete(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
