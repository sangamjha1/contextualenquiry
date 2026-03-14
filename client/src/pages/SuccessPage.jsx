import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-10">
      <div className="card-surface w-full rounded-3xl border border-slate-700/60 p-8 text-center shadow-soft">
        <h2 className="text-3xl font-bold text-slate-100">Response Submitted</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-slate-300">
          Thank you for contributing to JEEVAN NETRA. Your inputs will directly support CHMS research and
          design improvements.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white" to="/">
            Back to Home
          </Link>
          <Link className="rounded-xl border border-slate-600 px-5 py-2 text-sm text-slate-200" to="/profession">
            Start Another Enquiry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
