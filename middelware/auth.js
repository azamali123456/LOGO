import jwt from "jsonwebtoken";
export default function authenticate(req, res, next) {
  let token = req.header("authorization");
  let bearerToken;
  if (!token) return res.status(401).send("Access denied. No token provided.");
  if (token) {
    bearerToken = token.split(" ")[1];
  }
  try {
    const decoded = jwt.verify(bearerToken, `${process.env.JWT_SECRET}`);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}
