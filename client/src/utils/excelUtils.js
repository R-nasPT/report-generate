import * as XLSX from "xlsx";

const exportToExcel = (data, name) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${name}, ${currentDate}.xlsx`);
};

export default exportToExcel;
