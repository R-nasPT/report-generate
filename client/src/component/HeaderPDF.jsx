import React from "react";
import { useAuthContext } from "../context/AuthContext";

const HeaderPDF = ({ ticketDetail }) => {
  const { formatDate } = useAuthContext();

  return (
    <>
      <header>
        <div className="flex h-20 justify-center gap-6 px-3">
          <img src="/component/logoWhite.PNG" alt="logo" />
          <div className="flex flex-col items-center justify-center gap-3 pb-6 border-[2px] border-black rounded-2xl w-11/12">
            <h1 className="text-xl font-medium">
              ::: {ticketDetail.config?.doc_name} :::{" "}
            </h1>
            <div className="flex text-xs justify-evenly w-full">
              <p className="font-medium">
                Ticket Order :{" "}
                <span className="text-red-500 font-normal">
                  {ticketDetail.ticket_order}
                </span>
              </p>
              <p className="font-medium">
                Ticket Bank :{" "}
                <span className="text-red-500 font-normal">
                  {ticketDetail.ticket_bank}
                </span>
              </p>
              <p className="font-medium">
                Onsite Date :{" "}
                <span className="text-red-500 font-normal">
                  {formatDate(ticketDetail.onsite_date)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="w-full mt-4 border-t-2 border-black" />
        <hr className="w-full mt-1 border-t-4 border-black" />
      </header>
    </>
  );
};

export default HeaderPDF;
