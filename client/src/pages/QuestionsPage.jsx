import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEnquiry } from "../context/EnquiryContext";
import { professionLabels, questionsByProfession } from "../data/questions";
import ProgressBar from "../components/ProgressBar";
import { submitResponse } from "../services/api";

const QuestionsPage = () => {
  const navigate = useNavigate();
  const { state, setAnswer, reset } = useEnquiry();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const questions = useMemo(() => questionsByProfession[state.profession] || [], [state.profession]);

  if (!state.profession || !state.name || !state.identity || !state.workplace) {
    return <Navigate to="/profession" replace />;
  }

  const currentQuestion = questions[index];
  const storedAnswer = state.answers[currentQuestion?.question];
  const currentAnswer = storedAnswer || "";
  const currentOptions = currentQuestion?.options || [];

  const allowMulti = useMemo(() => {
    if (!currentQuestion?.question) return false;
    if (typeof currentQuestion.multi === "boolean") return currentQuestion.multi;
    const text = currentQuestion.question.toLowerCase();
    if (text.includes("first") || text.includes("most") || text.includes("longest") || text.includes("best")) {
      return false;
    }
    const multiHints = [
      "gaps",
      "issues",
      "delays",
      "tasks",
      "bottlenecks",
      "updates",
      "metrics",
      "risks",
      "inefficiencies",
      "features",
      "outcomes",
      "data points",
      "reports",
      "duplication",
      "missing",
      "information",
      "communication",
    ];
    return multiHints.some((hint) => text.includes(hint));
  }, [currentQuestion]);

  const saveCurrentAnswer = (value) => {
    if (!currentQuestion?.question) return;
    if (allowMulti) {
      const existing = Array.isArray(currentAnswer) ? currentAnswer : [];
      const next = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];
      setAnswer(currentQuestion.question, next);
      return;
    }
    setAnswer(currentQuestion.question, value);
  };

  const next = () => {
    if (Array.isArray(currentAnswer) ? currentAnswer.length === 0 : !String(currentAnswer || "").trim()) return;
    setIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  const allFilled = questions.every((item) => {
    const value = state.answers[item.question];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return (value || "").trim().length > 0;
  });

  const onSubmit = async () => {
    setError("");

    if (!allFilled) {
      setError("Please complete all required answers before submitting.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: state.name,
        identity: state.identity,
        workplace: state.workplace,
        profession: state.profession,
        answers: questions.map((item) => {
          const value = state.answers[item.question];
          const answer = Array.isArray(value) ? value.join("; ") : String(value || "").trim();
          return { question: item.question, answer };
        }),
      };

      await submitResponse(payload);
      reset();
      navigate("/success");
    } catch (submitError) {
      setError(submitError.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10">
      <div className="card-surface w-full rounded-3xl border border-slate-700/60 p-6 shadow-soft md:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">{professionLabels[state.profession]}</p>
            <h2 className="text-xl font-bold text-slate-100 md:text-2xl">Contextual Enquiry</h2>
          </div>
        </div>

        <ProgressBar current={index + 1} total={questions.length} />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            <p className="mb-2 text-lg font-medium text-slate-100">{currentQuestion?.question}</p>
            {allowMulti && <p className="mb-4 text-xs text-slate-400">Select all that apply.</p>}
            <div className="grid gap-3">
              {currentOptions.map((option, optionIndex) => {
                const selected = allowMulti
                  ? Array.isArray(currentAnswer) && currentAnswer.includes(option)
                  : currentAnswer === option;
                return (
                <button
                  key={`${currentQuestion.question}-${option}`}
                  type="button"
                  onClick={() => saveCurrentAnswer(option)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "border-primary bg-primary/15 text-slate-100"
                      : "border-slate-600 bg-slate-900/60 text-slate-200 hover:border-primary/70"
                  }`}
                >
                  <span className="mr-2 font-semibold text-slate-400">{optionIndex + 1}.</span>
                  {option}
                </button>
              );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="rounded-xl border border-slate-600 px-5 py-2 text-sm text-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {index < questions.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={Array.isArray(currentAnswer) ? currentAnswer.length === 0 : !String(currentAnswer || "").trim()}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!allFilled || loading}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Response"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
