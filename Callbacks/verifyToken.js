import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
 // console.log(authHeader.split(" ")[1])
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token is not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token expired");
        return res
          .status(401)
          .json({ message: "Session Expired", sessionExpired: true });
      } else {
        console.log("Token invalid:", err.message);
        return res.status(401).json({ message: "Invalid token" });
      }
    }
    
    return res.status(200).json({ message: "Token is valid" });
  });
};

export { verifyToken };
