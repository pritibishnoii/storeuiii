import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

function App() {
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
      <div className="fixed top-0 left-0 h-screen z-100 ">
        <Navigation />
      </div>
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
