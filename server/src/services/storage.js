const { getPool } = require("../config/mysql");

const addResponse = async (payload) => {
  const pool = getPool();
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.execute(
      "INSERT INTO responses (name, identity, workplace, profession) VALUES (?, ?, ?, ?)",
      [payload.name, payload.identity, payload.workplace, payload.profession]
    );

    const responseId = result.insertId;
    const answerValues = payload.answers.map((item) => [
      responseId,
      item.question,
      item.answer,
    ]);

    if (answerValues.length) {
      await connection.query(
        "INSERT INTO response_answers (response_id, question, answer) VALUES ?",
        [answerValues]
      );
    }

    await connection.commit();
    return {
      _id: responseId,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const queryResponses = async ({ profession, search, includeDeleted = false }) => {
  const pool = getPool();
  const filters = [];
  const params = [];

  if (profession) {
    filters.push("r.profession = ?");
    params.push(profession);
  }

  if (search) {
    filters.push("(r.name LIKE ? OR r.workplace LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }

  if (!includeDeleted) {
    filters.push("r.deleted_at IS NULL");
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const [rows] = await pool.query(
    `SELECT r.id, r.name, r.identity, r.workplace, r.profession, r.created_at, r.deleted_at,
            a.question, a.answer
     FROM responses r
     LEFT JOIN response_answers a ON a.response_id = r.id
     ${whereClause}
     ORDER BY r.created_at DESC, a.id ASC`,
    params
  );

  const byResponse = new Map();
  rows.forEach((row) => {
    if (!byResponse.has(row.id)) {
      byResponse.set(row.id, {
        _id: row.id,
        name: row.name,
        identity: row.identity,
        workplace: row.workplace,
        profession: row.profession,
        createdAt: row.created_at,
        deletedAt: row.deleted_at,
        answers: [],
      });
    }
    if (row.question) {
      byResponse.get(row.id).answers.push({
        question: row.question,
        answer: row.answer,
      });
    }
  });

  return Array.from(byResponse.values());
};

module.exports = {
  addResponse,
  queryResponses,
  deleteResponse: async (id) => {
    const pool = getPool();
    const [result] = await pool.execute(
      "UPDATE responses SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL",
      [id]
    );
    return result.affectedRows > 0;
  },
  restoreResponse: async (id) => {
    const pool = getPool();
    const [result] = await pool.execute(
      "UPDATE responses SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL",
      [id]
    );
    return result.affectedRows > 0;
  },
  purgeDeleted: async (hours = 24) => {
    const pool = getPool();
    const [result] = await pool.execute(
      "DELETE FROM responses WHERE deleted_at IS NOT NULL AND deleted_at < (NOW() - INTERVAL ? HOUR)",
      [hours]
    );
    return result.affectedRows || 0;
  },
};
