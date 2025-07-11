import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import { useEffect } from "react";

function App() {
  const index = 0;
  const data = [];

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/category/categories", {
  //     credentials: "include", // Required for cookies
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error(res.statusText);
  //       return res.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error("Fetch error:", err));
  // }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        transition={Flip}
        theme="dark"
        autoClose={800}
        closeOnClick
        hideProgressBar
      />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
