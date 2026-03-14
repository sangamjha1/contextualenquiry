const { getPool } = require("../config/postgres");

const addResponse = async (payload) => {
  const pool = getPool();
  try {
    const result = await pool.query(
      "INSERT INTO responses (name, identity, workplace, profession) VALUES ($1, $2, $3, $4) RETURNING id, created_at",
      [payload.name, payload.identity, payload.workplace, payload.profession]
    );

    const responseId = result.rows[0].id;

    if (payload.answers.length) {
      const values = [];
      const params = [];
      payload.answers.forEach((item, index) => {
        const offset = index * 3;
        values.push(`($${offset + 1}, $${offset + 2}, $${offset + 3})`);
        params.push(responseId, item.question, item.answer);
      });
      await pool.query(
        `INSERT INTO response_answers (response_id, question, answer) VALUES ${values.join(", ")}`,
        params
      );
    }

    return {
      _id: responseId,
      createdAt: result.rows[0].created_at,
    };
  } catch (error) {
    throw error;
  }
};

const queryResponses = async ({ profession, search, includeDeleted = false }) => {
  const pool = getPool();
  const filters = [];
  const params = [];

  if (profession) {
    params.push(profession);
    filters.push(`r.profession = $${params.length}`);
  }

  if (search) {
    params.push(`%${search}%`);
    const nameIndex = params.length;
    params.push(`%${search}%`);
    const workIndex = params.length;
    filters.push(`(r.name ILIKE $${nameIndex} OR r.workplace ILIKE $${workIndex})`);
  }

  if (!includeDeleted) {
    filters.push("r.deleted_at IS NULL");
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

  const result = await pool.query(
    `SELECT r.id, r.name, r.identity, r.workplace, r.profession, r.created_at, r.deleted_at,
            a.question, a.answer
     FROM responses r
     LEFT JOIN response_answers a ON a.response_id = r.id
     ${whereClause}
     ORDER BY r.created_at DESC, a.id ASC`,
    params
  );

  const byResponse = new Map();
  result.rows.forEach((row) => {
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
    const result = await pool.query(
      "UPDATE responses SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL",
      [id]
    );
    return result.rowCount > 0;
  },
  restoreResponse: async (id) => {
    const pool = getPool();
    const result = await pool.query(
      "UPDATE responses SET deleted_at = NULL WHERE id = $1 AND deleted_at IS NOT NULL",
      [id]
    );
    return result.rowCount > 0;
  },
  purgeDeleted: async (hours = 24) => {
    const pool = getPool();
    const result = await pool.query(
      "DELETE FROM responses WHERE deleted_at IS NOT NULL AND deleted_at < (NOW() - ($1 * INTERVAL '1 hour'))",
      [hours]
    );
    return result.rowCount || 0;
  },
};
