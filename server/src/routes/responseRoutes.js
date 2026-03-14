const express = require("express");
const { body, query, validationResult } = require("express-validator");
const { addResponse, queryResponses, deleteResponse, restoreResponse } = require("../services/storage");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

const sanitizeText = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\r\n\t]+/g, " ")
    .trim();

router.post(
  "/",
  [
    body("name").isString().trim().isLength({ min: 2, max: 120 }),
    body("identity").isString().trim().isLength({ min: 2, max: 120 }),
    body("workplace").isString().trim().isLength({ min: 2, max: 200 }),
    body("profession").isString().trim().isLength({ min: 2, max: 100 }),
    body("answers").isArray({ min: 1 }),
    body("answers.*.question").isString().trim().isLength({ min: 5, max: 500 }),
    body("answers.*.answer").isString().trim().isLength({ min: 1, max: 3000 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const payload = {
        name: sanitizeText(req.body.name),
        identity: sanitizeText(req.body.identity),
        workplace: sanitizeText(req.body.workplace),
        profession: sanitizeText(req.body.profession).toLowerCase(),
        answers: req.body.answers.map((item) => ({
          question: sanitizeText(item.question),
          answer: sanitizeText(item.answer),
        })),
      };

      const saved = await addResponse(payload);
      return res.status(201).json({ message: "Response submitted", id: saved._id });
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  "/",
  adminAuth,
  [
    query("profession").optional().isString().trim().isLength({ min: 2, max: 100 }),
    query("search").optional().isString().trim().isLength({ min: 1, max: 120 }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { profession, search } = req.query;
      const filter = {};

      if (profession) {
        filter.profession = sanitizeText(profession).toLowerCase();
      }

      if (search) {
        filter.search = sanitizeText(search);
      }

      const responses = await queryResponses(filter);
      return res.json({ count: responses.length, data: responses });
    } catch (error) {
      return next(error);
    }
  }
);

router.get("/export", adminAuth, async (req, res, next) => {
  try {
    const { profession } = req.query;
    const filter = profession
      ? { profession: sanitizeText(profession).toLowerCase() }
      : {};

    const responses = await queryResponses(filter);

    const header = ["name", "identity", "workplace", "profession", "question", "answer", "createdAt"];
    const rows = [header.join(",")];

    responses.forEach((entry) => {
      entry.answers.forEach((qa) => {
        const cells = [
          entry.name,
          entry.identity,
          entry.workplace,
          entry.profession,
          qa.question,
          qa.answer,
          new Date(entry.createdAt).toISOString(),
        ].map((value) => `"${String(value).replace(/"/g, '""')}"`);

        rows.push(cells.join(","));
      });
    });

    const csv = rows.join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=jeevan-netra-responses.csv");
    return res.status(200).send(csv);
  } catch (error) {
    return next(error);
  }
});

router.get("/deleted", adminAuth, async (req, res, next) => {
  try {
    const { profession, search } = req.query;
    const filter = { includeDeleted: true };

    if (profession) {
      filter.profession = sanitizeText(profession).toLowerCase();
    }

    if (search) {
      filter.search = sanitizeText(search);
    }

    const responses = await queryResponses(filter);
    const deletedOnly = responses.filter((entry) => entry.deletedAt);
    return res.json({ count: deletedOnly.length, data: deletedOnly });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", adminAuth, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid response id" });
    }

    const deleted = await deleteResponse(id);
    if (!deleted) {
      return res.status(404).json({ message: "Response not found" });
    }

    return res.json({ message: "Response deleted" });
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/restore", adminAuth, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid response id" });
    }

    const restored = await restoreResponse(id);
    if (!restored) {
      return res.status(404).json({ message: "Response not found or not deleted" });
    }

    return res.json({ message: "Response restored" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
