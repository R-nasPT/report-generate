import { useState } from "react";

function MailPopup() {

    const [isOpen, setIsOpen] = useState();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <img className=" cursor-pointer relative transition duration-300 hover:translate-y-[-5px] "
                src="/user/mail.svg" alt="file" onClick={togglePopup} />
            {isOpen && (
                <div className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-10">
                    <div className=" bg-white rounded-3xl relative">
                        <img className=" w-3 h-3 absolute right-4 top-3 cursor-pointer "
                            onClick={togglePopup}
                            src="/user/close-line-icon.svg" alt="" />
                        <div className="flex gap-10 px-10 pt-10 ">
                            <img src="/user/message.svg" alt="message" />
                            <div className="flex flex-col gap-3">
                                <p className=" font-semibold">รายชื่อ : <span className="text-[#646D89] font-normal"> Siam Commercial Bank PCL.</span></p>
                                <p className=" font-semibold">รายละเอียด : <span className="text-[#646D89] font-normal"> ................................................</span></p>
                                <p className=" font-semibold">อีเมลล์ผู้ส่ง : <span className="text-[#646D89] font-normal"> sender@email.com</span></p>
                                <p className=" font-semibold">อีเมลล์ผู้รับ : <span className="text-[#646D89] font-normal"> recipient@email.com</span></p>
                                <p className=" font-semibold">สถานะ : <span className="text-[#646D89] font-normal"> สำเร็จ</span></p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-5">
                            <button className=" bg-[#F26969] text-white w-16 h-9 rounded-lg hover:bg-red-500"
                                onClick={togglePopup}>cancel</button>
                            <button className=" bg-sky-500  text-white w-16 h-9 rounded-lg hover:bg-sky-600">send</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default MailPopup;