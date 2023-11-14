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
import PDFlte from "./PDFlte";
import Installation from "./Installation";
import TotalInputInstallation from "./TotalInputInstallation";
import OnsiteReport from "./OnsiteReport";
import HomePage from "./HomePage";
import Service from "./Service";
import InstallHistory from "./InstallHistory";
import ViewInstall from "./ViewInstall";
import PDFlteHistory from "./PDFlteHistory";
import Replacement from "./Replacement";
import OnsiteUpdate from "./OnsiteUpdate";

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
            <Route path="atmpage/:id" element={<TotalInputInstallation />} />
            <Route path="install" element={<Installation />} />
            <Route path="install-history" element={<InstallHistory />} />
            <Route path="service" element={<Service />} />
            <Route path="pdf/:id" element={<PDFFile />} />
            <Route path="pdflte/:id" element={<PDFlte />} />
          </Route>
        )}
        <Route path="public">
          <Route path="view-install/:id" element={<ViewInstall />} />
          <Route path="pdflte-history/:id" element={<PDFlteHistory />} />
          <Route path="pdfcus/:id" element={<PDFCustomerInfo />} />
          <Route path="replace/:cid/:ticketId/:userId" element={<Replacement />} />
          <Route path="onsite-update/:cid/:ticketId/:userId" element={<OnsiteUpdate />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AuthenticatedApp;
