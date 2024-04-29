import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token is not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        //console.log('Token expired');
        return res
          .status(401)
          .json({ message: "Session Expired", sessionExpired: true });
      } else {
        //console.log('Token invalid:', err.message);
        return res.status(401).json({ message: "Invalid token" });
      }
    }

    req.decoded = decoded;
    next();
  });
};

export default verifyToken
