import Footer from "../component/Footer";
import PopupSucceeded from "../component/PopupSucceeded";

function CustomerInfo() {
    return (
        <>
            <div className="h-screen p-10 flex flex-col items-center justify-evenly">
                <h1 className=" text-[#22269E] text-4xl font-medium">Edit Information / Permission!</h1>
                <div className="grid grid-cols-2 p-10 gap-5">
                    <div>
                        <h2>Customer</h2>
                        <label htmlFor="customer">
                            <input className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                                type="text"
                                name="customer"
                                placeholder="Enter Username" />
                        </label>
                    </div>
                    <div>
                        <h2>Email</h2>
                        <label htmlFor="email">
                            <input className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                                type="email"
                                name="email"
                                placeholder="Enter Email" />
                        </label>
                    </div>
                    <div>
                        <h2>Line Token</h2>
                        <label htmlFor="line">
                            <input className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                                type="text"
                                name="line"
                                placeholder="Enter lineID" />
                        </label>
                    </div>
                    <div>
                        <h2>........</h2>
                        <label htmlFor="">
                            <input className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                                type="text"
                                name=""
                                placeholder="Enter Username" />
                        </label>
                    </div>
                </div>
                <PopupSucceeded />
            </div>
            <Footer />
        </>
    )
};

export default CustomerInfo;