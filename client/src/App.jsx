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
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
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
      </div>

      <footer className="border-t border-slate-800/60 bg-slate-950/60 px-4 py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-slate-400 md:flex-row md:text-left">
          <p>
            Designed with love by Sangam Jha
          </p>
          <p>Copyright © 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
