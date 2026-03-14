import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfessionPage from "./pages/ProfessionPage";
import UserInfoPage from "./pages/UserInfoPage";
import QuestionsPage from "./pages/QuestionsPage";
import SuccessPage from "./pages/SuccessPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

const AdminGuard = ({ children }) => {
  const token = sessionStorage.getItem("adminAuthToken");
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/profession" element={<ProfessionPage />} />
      <Route path="/userinfo" element={<UserInfoPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminGuard>
            <AdminDashboardPage />
          </AdminGuard>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
