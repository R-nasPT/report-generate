import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../component/LoadingPage";
import packageJson from "../../package.json";

function OnsiteReport() {
  const [ticket, setTicket] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchCircuitId, setSearchCircuitId] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [filteredTicket, setFilteredTicket] = useState([]);
  const navigate = useNavigate();

  const getToDetail = (id) => {
    navigate(`/user/detailpage/${id}`);
  };

  useEffect(() => {
    const getTicketGen = async () => {
      try {
        const result = await axios.get(
          `${packageJson.domain.ipbackend}/ticket`
        );
        setTicket(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTicketGen();
  }, []);

  useEffect(() => {
    const filteredTicket = ticket.filter(
      (item) =>
        item.ticket_order.toLowerCase().includes(searchText.toLowerCase()) &&
        item.customer_name
          .toLowerCase()
          .includes(searchCustomer.toLowerCase()) &&
        item.circuitId.toLowerCase().includes(searchCircuitId.toLowerCase()) &&
        formatDate(item.onsite_date, 2).includes(searchDate)
    );
    // console.log(searchDate);

    setFilteredTicket(filteredTicket);
  }, [ticket, searchText, searchCustomer, searchCircuitId, searchDate]);

  const getToPDF = (id) => {
    navigate(`/user/pdf/${id}`);
  };

  const formatDate = (datestring, type) => {
    let formattedDate = undefined;
    if (type === 1) {
      const createDate = new Date(datestring);
      formattedDate = `${("0" + createDate.getDate()).slice(-2)}/${(
        "0" +
        (createDate.getMonth() + 1)
      ).slice(-2)}/${createDate.getFullYear()}`;
    } else {
      const createDate = new Date(datestring);
      formattedDate = `${createDate.getFullYear()}-${(
        "0" +
        (createDate.getMonth() + 1)
      ).slice(-2)}-${("0" + createDate.getDate()).slice(-2)}`;
    }
    // console.log("formattedDate", formattedDate);
    return formattedDate;
  };

  if (ticket.length === 0) return <LoadingPage />;
  return (
    <>
      <div className="bg-slate-100 flex flex-col items-center h-screen">
        <div className="flex items-center gap-10 p-4">
          <h1 className="text-lg font-medium">Select : </h1>
          <input
            className="w-48 h-9 border-[1px] border-black rounded-lg p-5"
            type="text"
            placeholder="order..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <input
            className="w-48 h-9 border-[1px] border-black rounded-lg p-5"
            type="text"
            placeholder="customer...."
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
          />
          <input
            className="w-48 h-9 border-[1px] border-black rounded-lg p-5"
            type="text"
            placeholder="circuitId...."
            value={searchCircuitId}
            onChange={(e) => setSearchCircuitId(e.target.value)}
          />
          <input
            className="w-48 h-9 border-[1px] border-black rounded-lg p-5"
            type="date"
            placeholder="Date...."
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        <div className="w-[1290px] overflow-auto max-h-[600px]">
          <table className="w-[1290px] border-collapse ">
            <thead className="sticky top-0">
              <tr className="bg-[#58A2E7] text-white text-center">
                <td className="py-4 px-5"></td>
                <td className="py-4 px-5">Status</td>
                <td className="py-4 px-5">Ticket Order</td>
                <td className="py-4 px-5">Onsite Date</td>
                <td className="py-4 px-5">Customer Name</td>
                <td className="py-4 px-5">Site Name</td>
                <td className="py-4 px-5">Circuit</td>
                <td className="py-4 px-5">Problem</td>
                <td className="py-4 px-5">ATM Type</td>
                <td className="py-4 px-5">PPOT Staff</td>
                <td className="py-4 px-5">Position</td>
                <td className="py-4 px-5">Report Name</td>
              </tr>
            </thead>
            <tbody className="h-full bg-white">
              {filteredTicket.map((item, index) => (
                <tr key={index} className="border-[1px] border-[#D6D9E4]">
                  <td className="bg-sky-100 flex flex-col px-7 py-3 gap-3 w-[100px]">
                    <img
                      src="/user/file_pdf.svg"
                      alt="pdf"
                      className="bg-white hover:bg-red-100 cursor-pointer p-[10px] rounded-xl shadow-lg h-12 w-12"
                      onClick={() => getToPDF(item.ticket_generate_id)}
                    />
                    <img
                      src="/admin/view.svg"
                      alt="edit"
                      className="bg-gray-400 hover:bg-gray-300 cursor-pointer p-[10px] rounded-xl shadow-md h-12 w-12"
                      onClick={() => getToDetail(item.ticket_generate_id)}
                    />
                  </td>
                  {item.pictures.length === item.config.pictures.length ? (
                    <td className="p-4">
                      <div className="flex justify-center">
                        <div className="bg-green-500 w-6 h-6 border-2 border-green-300 rounded-full"></div>
                      </div>
                    </td>
                  ) : item.pictures.length === 0 ? (
                    <td className="p-4">
                      <div className="flex justify-center">
                        <div className="bg-red-500 w-6 h-6 border-2 border-red-300 rounded-full"></div>
                      </div>
                    </td>
                  ) : (
                    <td className="p-4 ">
                      <div className="flex justify-center">
                        <div className="bg-yellow-300 w-6 h-6 border-2 border-yellow-100 rounded-full"></div>
                      </div>
                    </td>
                  )}
                  <td className="py-4 px-5 ">{item.ticket_order}</td>
                  <td className="py-4 px-5">
                    <div className="w-24">
                      {formatDate(item.onsite_date, 1)}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    {item.customer_name.length > 20
                      ? `${item.customer_name.slice(0, 20)}...`
                      : item.customer_name}
                  </td>
                  <td className="py-4 px-5">
                    {item.site_name.length > 20
                      ? `${item.site_name.slice(0, 20)}...`
                      : item.site_name}
                  </td>
                  <td className="py-4 px-5">{item.circuitId}</td>
                  <td className="py-4 px-5">{item.problem}</td>
                  <td className="py-4 px-5">{item.atm_type}</td>
                  <td className="py-4 px-5">{item.ppot_staff}</td>
                  <td className="py-4 px-5">{item.position}</td>
                  <td className="py-4 px-5">{item.config.doc_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center gap-3 pr-5 pt-5 w-[1290px]">
          <h1>Rows :</h1>
          <h1 className="p-1 w-9 h-9 text-center border-2 border-black rounded-xl">
            {filteredTicket.length}
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OnsiteReport;
