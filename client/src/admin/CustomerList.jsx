import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";

function CustomerList() {

    const navigate = useNavigate();

    return (
        <>
            <table className="h-screen flex flex-col items-center p-8">
                <thead>
                    <tr className="w-[1290px] h-[60px] bg-[#D6D9E4] rounded-t-3xl flex justify-around items-center text-[#424C6B] font-semibold">
                        <td>Customer</td>
                        <td>Email</td>
                        <td>Line Token</td>
                        <td>Customer Name</td>
                        <td>Site Name</td>
                        <td>PICTURE</td>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        className="w-[1290px] h-[106px] border-[1px] border-[#D6D9E4]  flex justify-around items-center">

                        <td>Kasikorn</td>
                        <td>Kasikorn@ksb.com </td>
                        <td>sdsdsd</td>
                        <td>Kasikorn Bank</td>
                        <td>สาขา....</td>
                        <td><img
                            className=" cursor-pointer"
                            src="admin/edit.svg" alt="file"
                            onClick={() => navigate('/cusinfo')} />
                        </td>

                    </tr>
                    <tr className="w-[1290px] h-[106px] border-[1px] border-[#D6D9E4]  flex justify-around items-center">
                        <td>Siam Commercial </td>
                        <td>Siamcommercial@scb.com</td>
                        <td>20/6/2023</td>
                        <td>Kasikorn Bank</td>
                        <td>สาขา....</td>
                        <td><img src="admin/edit.svg" alt="file" /></td>
                    </tr>
                </tbody>
            </table>
            <Footer />
        </>
    )
};

export default CustomerList;