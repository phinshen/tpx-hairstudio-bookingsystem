import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <AdminAuthProvider>
      <div>
        <Home />
      </div>
    </AdminAuthProvider>
  );
}
