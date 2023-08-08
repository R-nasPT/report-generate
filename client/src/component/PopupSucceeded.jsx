import { useState } from "react";

function PopupSucceeded() {

    const [isOpen, setIsOpen] = useState();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className=" text-center text-white bg-[#22269E] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px] hover:bg-[#060673]"
                onClick={togglePopup}>Update</button>
            {isOpen && (
                <div className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
                    <div className=" bg-white rounded-3xl relative">
                        <img className=" w-3 h-3 absolute right-4 top-3 cursor-pointer "
                            onClick={togglePopup}
                            src="user\close-line-icon.svg" alt="" />
                        <div className="flex flex-col items-center font-bold text-2xl p-14">
                            <img src="component/success-icon.svg" alt="message" />
                            <h1 className=" mt-7">Edit Information</h1>
                            <h1 className="text-[#049D2F]">Successfully !</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default PopupSucceeded;