import { Routes, Route } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";

import Dashboard from "../component/Dashboard";
import LoginPage from "./LoginPage";
import TemplateReport from "../admin/TemplateReport";
import ConfigPage from "../admin/ConfigPage";
import DataView from "../admin/DataView";

import HomePage from "./HomePage";
import DetailPage from "./DetailPage";
import PDFFile from "../component/PDFFile";
import EditPage from "../admin/EditPage";

function AuthenticatedApp() {
  // const { isAdmin,  isLoggedIn } = useAuthContext();

  // if (!isLoggedIn) {
  //   return <LoginPage />;
  // }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<LoginPage />} />
        {/* {isAdmin === "Admin" && ( */}
        <Route path="admin">
          <Route path="template" element={<TemplateReport />} />
          <Route path="config" element={<ConfigPage />} />
          <Route path="view/:id" element={<DataView />} />
          <Route path="config/:id" element={<EditPage />} />
        </Route>
        {/* )}   */}
        {/* {isAdmin === "User" && (   */}
        <Route path="user">
          <Route path="homepage" element={<HomePage />} />
          <Route path="detailpage/:id" element={<DetailPage />} />
          <Route path="pdf/:id" element={<PDFFile />} />
        </Route>
        {/* // )}   */}
      </Route>
    </Routes>
  );
}

export default AuthenticatedApp;
