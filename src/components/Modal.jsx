const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-70"></div>
          <div className="absolute top-[40%] right-[40%] bg-linear-to-r from-red-800 to-pink-600 p-4 rounded-lg z-10 text-right">
            <button
              className="text-white font-semibold  focus:outline-none mr-2 cursor-pointer border-2 rounded-full w-8 h-8 "
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
