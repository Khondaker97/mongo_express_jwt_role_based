const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //Not valid, Forbidden, Doesn't have access right
    if (err) return res.sendStatus(403);
    //custom req, this can be received
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
