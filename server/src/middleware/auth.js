import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization is denied, please sign in" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (err) {
    if (err) {
      return res.status(401).json({ message: "Invalid access" });
    }
  }
};

module.exports = auth;
