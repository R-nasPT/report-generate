import "./App.css";
import AuthenticatedApp from "./page/AuthenticatedApp";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;
