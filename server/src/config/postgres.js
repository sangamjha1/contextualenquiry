const { Pool } = require("pg");

let pool;

const getPool = () => {
  if (!pool) {
    const { DATABASE_URL } = process.env;
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is not configured");
    }

    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }

  return pool;
};

const initDb = async () => {
  const connection = getPool();
  await connection.query(
    `CREATE TABLE IF NOT EXISTS responses (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      identity VARCHAR(120) NOT NULL,
      workplace VARCHAR(200) NOT NULL,
      profession VARCHAR(100) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      deleted_at TIMESTAMPTZ NULL
    );`
  );

  await connection.query(
    `CREATE TABLE IF NOT EXISTS response_answers (
      id BIGSERIAL PRIMARY KEY,
      response_id BIGINT NOT NULL REFERENCES responses(id) ON DELETE CASCADE,
      question VARCHAR(500) NOT NULL,
      answer TEXT NOT NULL
    );`
  );

  await connection.query("CREATE INDEX IF NOT EXISTS idx_profession ON responses (profession);");
  await connection.query("CREATE INDEX IF NOT EXISTS idx_created_at ON responses (created_at);");
  await connection.query("CREATE INDEX IF NOT EXISTS idx_deleted_at ON responses (deleted_at);");
  await connection.query("CREATE INDEX IF NOT EXISTS idx_response_id ON response_answers (response_id);");

  await connection.query(
    "ALTER TABLE responses ADD COLUMN IF NOT EXISTS identity VARCHAR(120) NOT NULL DEFAULT 'Unknown'"
  );
  await connection.query("ALTER TABLE responses ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ NULL");
};

module.exports = {
  getPool,
  initDb,
};
