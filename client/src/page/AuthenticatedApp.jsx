import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import Dashboard from "../component/Dashboard";
import LoginPage from "./LoginPage";
import TemplateReport from "../admin/TemplateReport";
import ConfigPage from "../admin/ConfigPage";
import DataView from "../admin/DataView";

import DetailPage from "./DetailPage";
import PDFFile from "./PDFFile";
import EditPage from "../admin/EditPage";
import PDFCustomerInfo from "./PDFCustomerInfo";
import DetailMock from "./DetailMock";
import PDFlte from "./PDFlte";
import Installation from "./Installation";
import TotalInputInstallation from "./TotalInputInstallation";
import OnsiteReport from "./OnsiteReport";
import HomePage from "./HomePage";
import Service from "./Service";

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
        {isAdmin && (
          <Route path="user">
            <Route path="homepage" element={<HomePage />} />
            <Route path="onsite" element={<OnsiteReport />} />
            <Route path="detailpage/:id" element={<DetailPage />} />
            <Route path="pdf/:id" element={<PDFFile />} />
            <Route path="atmpage/:id" element={<TotalInputInstallation />} />
            <Route path="pdfcus" element={<PDFCustomerInfo />} />
            <Route path="detailmock" element={<DetailMock />} />
            <Route path="pdflte" element={<PDFlte />} />
            <Route path="install" element={<Installation />} />
            <Route path="service" element={<Service />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
}

export default AuthenticatedApp;
