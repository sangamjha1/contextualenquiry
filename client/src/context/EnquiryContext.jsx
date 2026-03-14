import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "jeevan-netra-draft";

const defaultState = {
  profession: "",
  name: "",
  identity: "",
  workplace: "",
  answers: {},
};

const EnquiryContext = createContext(null);

export const EnquiryProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const draft = localStorage.getItem(STORAGE_KEY);
    if (!draft) return defaultState;
    const parsed = JSON.parse(draft);
    const identityFallback = [
      "Staff Member",
      "Student / Trainee",
      "Visitor / Caregiver",
      "Prefer not to say",
    ];
    if (!parsed.identity && identityFallback.includes(parsed.name)) {
      return {
        ...parsed,
        identity: parsed.name,
        name: "",
      };
    }
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      setProfession: (profession) =>
        setState((prev) => ({ ...prev, profession, answers: {} })),
      setUserDetails: (name, identity, workplace) =>
        setState((prev) => ({ ...prev, name, identity, workplace })),
      setAnswer: (question, answer) =>
        setState((prev) => ({ ...prev, answers: { ...prev.answers, [question]: answer } })),
      reset: () => {
        localStorage.removeItem(STORAGE_KEY);
        setState(defaultState);
      },
    }),
    [state]
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
};

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used inside EnquiryProvider");
  }
  return ctx;
};
