import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import Dashboard from "../component/Dashboard";
import LoginPage from "./LoginPage";
import TemplateReport from "../admin/TemplateReport";
import ConfigPage from "../admin/ConfigPage";
import DataView from "../admin/DataView";

import HomePage from "./HomePage";
import DetailPage from "./DetailPage";
import PDFFile from "./PDFFile";
import EditPage from "../admin/EditPage";
import ATMPage from "./ATMPage";
import PDFCustomerInfo from "./PDFCustomerInfo";
import DetailMock from "./DetailMock";
import PDFlte from "./PDFlte";

function AuthenticatedApp() {
  const { isAdmin } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<LoginPage />} />
        {isAdmin === "Admin" && (
          <Route path="admin">
            <Route path="template" element={<TemplateReport />} />
            <Route path="config" element={<ConfigPage />} />
            <Route path="view/:id" element={<DataView />} />
            <Route path="config/:id" element={<EditPage />} />
          </Route>
        )}
        {isAdmin === "User" && (
          <Route path="user">
            <Route path="homepage" element={<HomePage />} />
            <Route path="detailpage/:id" element={<DetailPage />} />
            <Route path="pdf/:id" element={<PDFFile />} />
            <Route path="atmpage" element={<ATMPage />} />
            <Route path="pdfcus" element={<PDFCustomerInfo />} />
            <Route path="detailmock" element={<DetailMock />} />
            <Route path="pdflte" element={<PDFlte />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
}

export default AuthenticatedApp;
