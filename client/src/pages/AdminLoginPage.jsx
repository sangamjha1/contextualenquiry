import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchResponses } from "../services/api";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = btoa(`${username}:${password}`);
      await fetchResponses({ authToken: token });
      sessionStorage.setItem("adminAuthToken", token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10">
      <form onSubmit={onSubmit} className="card-surface w-full rounded-3xl border border-slate-700/60 p-7 shadow-soft">
        <h2 className="mb-6 text-2xl font-bold text-slate-100">Admin Login</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Admin username"
          className="mb-4 w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Admin password"
          className="mb-4 w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          required
        />
        {error && <p className="mb-3 text-sm text-rose-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
