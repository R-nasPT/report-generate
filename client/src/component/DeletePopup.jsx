import { useState } from "react";

function DeletePopup({ onDelete }) {
  const [isOpen, setIsOpen] = useState();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <img
        src="/admin/trash-fill.svg"
        alt="delete"
        onClick={togglePopup}
        className=" bg-red-600 hover:bg-red-700 cursor-pointer p-3 rounded-lg shadow-md"
      />
      {isOpen && (
        <div className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
          <div className=" bg-white rounded-3xl relative">
            <img
              className=" w-3 h-3 absolute right-4 top-3 cursor-pointer "
              onClick={togglePopup}
              src="user\close-line-icon.svg"
              alt=""
            />
            <div className="flex flex-col gap-6 items-center  p-12">
              <img src="/admin/red-x-line-icon.svg" alt="message" />
              <h1 className="font-bold text-2xl">Do you want to delete?</h1>
              <div className="flex gap-2">
                <button
                  onClick={togglePopup}
                  className=" bg-red-300 hover:bg-red-400 text-white w-[70px] h-[40px] rounded-lg"
                >
                  cancel
                </button>
                <button
                  className=" bg-[#CE4E4E] hover:bg-red-400 text-white w-[70px] h-[40px] rounded-lg"
                  onClick={() => {
                    onDelete();
                    togglePopup();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeletePopup;
