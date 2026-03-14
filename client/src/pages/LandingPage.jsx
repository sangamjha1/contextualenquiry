import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface w-full rounded-3xl border border-slate-700/60 p-8 shadow-soft md:p-14"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-primary">Design Thinking Research</p>
        <h1 className="mb-5 text-3xl font-extrabold leading-tight text-slate-100 md:text-5xl">
          JEEVAN NETRA
          <br />
          Contextual Enquiry Platform
        </h1>
        <p className="max-w-3xl text-sm text-slate-300 md:text-base">
          Help us understand real hospital workflows, pain points, and system gaps to design a stronger
          centralized hospital management system.
        </p>
        <button
          onClick={() => navigate("/profession")}
          className="mt-8 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          type="button"
        >
          Start Enquiry
        </button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
