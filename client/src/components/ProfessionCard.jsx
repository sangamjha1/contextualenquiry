import { motion } from "framer-motion";

const ProfessionCard = ({ title, icon: Icon, onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card-surface flex min-h-32 w-full flex-col items-start justify-between rounded-2xl border border-slate-700/60 p-5 text-left shadow-soft transition-colors hover:border-primary/70"
      type="button"
    >
      <Icon className="h-6 w-6 text-primary" />
      <span className="text-sm font-semibold text-slate-100">{title}</span>
    </motion.button>
  );
};

export default ProfessionCard;
