const mysql = require("mysql2/promise");

let pool;

const getPool = () => {
  if (!pool) {
    const {
      MYSQL_HOST,
      MYSQL_PORT,
      MYSQL_USER,
      MYSQL_PASSWORD,
      MYSQL_DATABASE,
    } = process.env;

    if (!MYSQL_HOST || !MYSQL_PORT || !MYSQL_USER || !MYSQL_DATABASE) {
      throw new Error("MySQL env vars are not fully configured");
    }

    pool = mysql.createPool({
      host: MYSQL_HOST,
      port: Number(MYSQL_PORT),
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
};

const initDb = async () => {
  const connection = getPool();
  await connection.query(
    `CREATE TABLE IF NOT EXISTS responses (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      identity VARCHAR(120) NOT NULL,
      workplace VARCHAR(200) NOT NULL,
      profession VARCHAR(100) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP NULL DEFAULT NULL,
      PRIMARY KEY (id),
      INDEX idx_profession (profession),
      INDEX idx_created_at (created_at),
      INDEX idx_deleted_at (deleted_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  );

  await connection.query(
    `CREATE TABLE IF NOT EXISTS response_answers (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      response_id BIGINT UNSIGNED NOT NULL,
      question VARCHAR(500) NOT NULL,
      answer TEXT NOT NULL,
      PRIMARY KEY (id),
      INDEX idx_response_id (response_id),
      CONSTRAINT fk_response
        FOREIGN KEY (response_id)
        REFERENCES responses (id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  );

  const [identityColumn] = await connection.query(
    "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'responses' AND COLUMN_NAME = 'identity'",
    [process.env.MYSQL_DATABASE]
  );
  if (!identityColumn.length) {
    await connection.query("ALTER TABLE responses ADD COLUMN identity VARCHAR(120) NOT NULL DEFAULT 'Unknown'");
  }

  const [deletedColumn] = await connection.query(
    "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'responses' AND COLUMN_NAME = 'deleted_at'",
    [process.env.MYSQL_DATABASE]
  );
  if (!deletedColumn.length) {
    await connection.query("ALTER TABLE responses ADD COLUMN deleted_at TIMESTAMP NULL DEFAULT NULL");
  }
};

module.exports = {
  getPool,
  initDb,
};
