const crypto = require("crypto");

const safeCompare = (a, b) => {
  const aBuf = Buffer.from(a || "");
  const bBuf = Buffer.from(b || "");

  if (aBuf.length !== bBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuf, bBuf);
};

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const encoded = authHeader.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const separator = decoded.indexOf(":");

  if (separator === -1) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = decoded.slice(0, separator);
  const pass = decoded.slice(separator + 1);

  const expectedUser = process.env.ADMIN_USER || "";
  const expectedPass = process.env.ADMIN_PASS || "";

  if (!safeCompare(user, expectedUser) || !safeCompare(pass, expectedPass)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return next();
};

module.exports = adminAuth;
