const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const dotenv = require("dotenv");
const { initDb } = require("./src/config/postgres");
const { purgeDeleted } = require("./src/services/storage");
const responseRoutes = require("./src/routes/responseRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  max: Number(process.env.RATE_LIMIT_MAX || 100),
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(hpp());
app.use(limiter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "jeevan-netra-api" });
});

app.use("/api/responses", responseRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

initDb()
  .then(() => {
    setInterval(() => {
      purgeDeleted(24).catch((error) => {
        console.error("Failed to purge deleted responses:", error.message);
      });
    }, 60 * 60 * 1000);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error.message);
    process.exit(1);
  });
