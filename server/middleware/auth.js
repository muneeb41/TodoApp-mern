const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
 try {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  const decode = jwt.verify(token, process.env.SECUREKEY);
  if(!decode){
    res.status(400).json({message: 'user is not authenticated'})
  }
  next();
 } catch (error) {
  res.status(400).json({message: 'user is not authenticated'})
 }
};
