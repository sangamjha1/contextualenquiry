import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteResponse, fetchDeletedResponses, fetchResponses, exportResponsesCsv, restoreResponse } from "../services/api";
import { professionLabels } from "../data/questions";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [profession, setProfession] = useState("");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("respondents");
  const [dataScope, setDataScope] = useState("active");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(() => new Set());
  const [deletingId, setDeletingId] = useState(null);
  const [restoringId, setRestoringId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authToken = useMemo(() => sessionStorage.getItem("adminAuthToken") || "", []);

  useEffect(() => {
    if (!authToken) {
      navigate("/admin");
      return;
    }

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data =
          dataScope === "deleted"
            ? await fetchDeletedResponses({ profession, search, authToken })
            : await fetchResponses({ profession, search, authToken });
        setResponses(data.data || []);
      } catch (err) {
        setError("Session expired or unauthorized");
        sessionStorage.removeItem("adminAuthToken");
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authToken, navigate, profession, search, dataScope]);

  useEffect(() => {
    setPage(1);
    setExpanded(new Set());
  }, [profession, search, dataScope]);

  const onExport = async () => {
    try {
      const response = await exportResponsesCsv({ profession, authToken });
      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "jeevan-netra-responses.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      setError("Unable to export CSV");
    }
  };

  const PAGE_SIZE = 8;
  const totalPages = Math.max(1, Math.ceil(responses.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageItems = responses.slice(pageStart, pageStart + PAGE_SIZE);

  const groupedByQuestion = useMemo(() => {
    const map = new Map();
    responses.forEach((entry) => {
      entry.answers.forEach((qa) => {
        if (!map.has(qa.question)) {
          map.set(qa.question, []);
        }
        map.get(qa.question).push({
          respondent: entry.name,
          identity: entry.identity,
          workplace: entry.workplace,
          profession: entry.profession,
          createdAt: entry.createdAt,
          answer: qa.answer,
        });
      });
    });
    return Array.from(map.entries()).map(([question, answers]) => ({
      question,
      answers,
    }));
  }, [responses]);

  const questionPageTotal = Math.max(1, Math.ceil(groupedByQuestion.length / PAGE_SIZE));
  const questionPageStart = (page - 1) * PAGE_SIZE;
  const questionItems = groupedByQuestion.slice(questionPageStart, questionPageStart + PAGE_SIZE);

  const toggleExpanded = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const onDelete = async (entry) => {
    const confirmDelete = window.confirm(
      `Delete all responses for ${entry.name}? This cannot be undone.`
    );
    if (!confirmDelete) return;

    setDeletingId(entry._id);
    setError("");
    try {
      await deleteResponse({ id: entry._id, authToken });
      setResponses((prev) => prev.filter((item) => item._id !== entry._id));
      setExpanded((prev) => {
        const next = new Set(prev);
        next.delete(entry._id);
        return next;
      });
    } catch (err) {
      setError(err.message || "Unable to delete response");
    } finally {
      setDeletingId(null);
    }
  };

  const onRestore = async (entry) => {
    const confirmRestore = window.confirm(`Restore responses for ${entry.name}?`);
    if (!confirmRestore) return;

    setRestoringId(entry._id);
    setError("");
    try {
      await restoreResponse({ id: entry._id, authToken });
      setResponses((prev) => prev.filter((item) => item._id !== entry._id));
      setExpanded((prev) => {
        const next = new Set(prev);
        next.delete(entry._id);
        return next;
      });
    } catch (err) {
      setError(err.message || "Unable to restore response");
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Admin Dashboard</h2>
          <p className="text-sm text-slate-300">Review contextual enquiry submissions.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("adminAuthToken");
            navigate("/admin");
          }}
          className="rounded-xl border border-slate-600 px-4 py-2 text-sm text-slate-200"
        >
          Logout
        </button>
      </div>

      <div className="card-surface mb-4 rounded-2xl border border-slate-700/60 p-4 shadow-soft">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <select
            className="rounded-xl border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          >
            <option value="">All Professions</option>
            {Object.entries(professionLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <input
            className="rounded-xl border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm"
            placeholder="Search name or workplace"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="rounded-xl border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm"
            value={dataScope}
            onChange={(e) => setDataScope(e.target.value)}
          >
            <option value="active">Active responses</option>
            <option value="deleted">Deleted bin (24h)</option>
          </select>

          <select
            className="rounded-xl border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            disabled={dataScope === "deleted"}
          >
            <option value="respondents">Group by respondent</option>
            <option value="questions">Group by question</option>
          </select>

          <button
            type="button"
            onClick={onExport}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Export CSV
          </button>
        </div>
      </div>

      {error && <p className="mb-3 text-sm text-rose-400">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-300">Loading responses...</p>
      ) : (
        <div className="space-y-3">
          {viewMode === "respondents" || dataScope === "deleted" ? (
            <>
              {pageItems.map((entry) => {
                const isOpen = expanded.has(entry._id);
                return (
                  <div key={entry._id} className="card-surface rounded-2xl border border-slate-700/60 p-5 shadow-soft">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">{entry.name}</h3>
                    <p className="text-xs text-slate-300">{entry.identity}</p>
                    <p className="text-xs text-slate-400">{entry.workplace}</p>
                  </div>
                      <div className="text-right text-xs text-slate-300">
                        <p>{professionLabels[entry.profession] || entry.profession}</p>
                        <p>{new Date(entry.createdAt).toLocaleString()}</p>
                        {entry.deletedAt && (
                          <p className="text-rose-300">Deleted: {new Date(entry.deletedAt).toLocaleString()}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                      onClick={() => toggleExpanded(entry._id)}
                      className="rounded-xl border border-slate-600 px-4 py-2 text-xs text-slate-200"
                    >
                        {isOpen ? "Hide answers" : `View answers (${entry.answers.length})`}
                      </button>
                      {dataScope === "active" ? (
                        <button
                          type="button"
                          onClick={() => onDelete(entry)}
                          disabled={deletingId === entry._id}
                          className="rounded-xl border border-rose-400/60 px-4 py-2 text-xs text-rose-200 disabled:opacity-50"
                        >
                          {deletingId === entry._id ? "Deleting..." : "Delete response"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onRestore(entry)}
                          disabled={restoringId === entry._id}
                          className="rounded-xl border border-emerald-400/60 px-4 py-2 text-xs text-emerald-200 disabled:opacity-50"
                        >
                          {restoringId === entry._id ? "Restoring..." : "Restore response"}
                        </button>
                      )}
                    </div>

                    {isOpen && (
                      <div className="mt-4 space-y-2">
                        {entry.answers.map((qa, idx) => (
                          <div key={`${entry._id}-${idx}`} className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3">
                            <p className="text-xs font-semibold text-slate-200">Q: {qa.question}</p>
                            <p className="mt-1 text-sm text-slate-300">A: {qa.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {!responses.length && <p className="text-sm text-slate-300">No responses found for selected filters.</p>}

              {responses.length > PAGE_SIZE && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-slate-400">
                    Showing {pageStart + 1}-{Math.min(pageStart + PAGE_SIZE, responses.length)} of {responses.length}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="rounded-xl border border-slate-600 px-4 py-2 text-xs text-slate-200 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={page === totalPages}
                      className="rounded-xl border border-slate-600 px-4 py-2 text-xs text-slate-200 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {questionItems.map((item) => {
                const isOpen = expanded.has(item.question);
                return (
                  <div key={item.question} className="card-surface rounded-2xl border border-slate-700/60 p-5 shadow-soft">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-primary">Question</p>
                        <h3 className="mt-2 text-base font-semibold text-slate-100">{item.question}</h3>
                      </div>
                      <p className="text-xs text-slate-300">{item.answers.length} answers</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpanded(item.question)}
                      className="mt-4 rounded-xl border border-slate-600 px-4 py-2 text-xs text-slate-200"
                    >
                      {isOpen ? "Hide answers" : "View answers"}
                    </button>

                    {isOpen && (
                      <div className="mt-4 space-y-2">
                        {item.answers.map((answer, idx) => (
                          <div key={`${item.question}-${idx}`} className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3">
                            <p className="text-xs font-semibold text-slate-200">
                              {answer.respondent} · {professionLabels[answer.profession] || answer.profession}
                            </p>
                            <p className="text-xs text-slate-400">
                              {answer.workplace} {answer.identity ? `· ${answer.identity}` : ""}
                            </p>
                            <p className="mt-2 text-sm text-slate-300">{answer.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {!groupedByQuestion.length && <p className="text-sm text-slate-300">No responses found for selected filters.</p>}

              {groupedByQuestion.length > PAGE_SIZE && (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-slate-400">
                    Showing {questionPageStart + 1}-{Math.min(questionPageStart + PAGE_SIZE, groupedByQuestion.length)} of {groupedByQuestion.length}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="rounded-xl border border-slate-600 px-4 py-2 text-xs text-slate-200 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setPage((prev) => Math.min(prev + 1, questionPageTotal))}
                      disabled={page === questionPageTotal}
                      className="rounded-xl border border-slate-600 px-4 py-2 text-xs text-slate-200 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
