import { Routes, Route } from "react-router-dom";
import CustomerList from "../admin/CustomerList";
import LoginPage from "./LoginPage";
import CustomerInfo from "../admin/CustomerInfo";
import TemplateReport from "../admin/TemplateReport";
import ConfigPage from "../admin/ConfigPage";
import DataView from "../admin/DataView";
import EditPage from "../admin/EditPage";

import HomePage from "./HomePage";
import DetailPage from "./DetailPage";
import PDFFile from "../component/PDFFile";
import LargeContentPage from "../component/test";

function AdminAuthenticated() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/customer" element={<CustomerList />} />
      <Route path="/cusinfo" element={<CustomerInfo />} />
      <Route path="/template" element={<TemplateReport />} />
      <Route path="/config" element={<ConfigPage />} />
      <Route path="/view/:id" element={<DataView />} />
      <Route path="/config/:id" element={<EditPage />} />

      <Route path="/homepage" element={<HomePage />} />
      <Route path="/detailpage/:id" element={<DetailPage />} />
      <Route path="/pdf/:id" element={<PDFFile />} />
      <Route path="/123" element={<LargeContentPage />} />
    </Routes>
  );
}

export default AdminAuthenticated;
