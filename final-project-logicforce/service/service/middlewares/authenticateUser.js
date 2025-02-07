import jwt from 'jsonwebtoken';

// const authenticateUser = (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ code: "Unauthorized", message: "Invalid authorization header format." });
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { userId: decoded.id };
//         next();
//     } catch (err) {
//         if (err.name === 'TokenExpiredError') {
//             return res.status(401).json({ code: "TokenExpired", message: "Token has expired. Please log in again." });
//         }
//         return res.status(400).json({ code: "InvalidToken", message: "Invalid token." });
//     }
// };

// export default authenticateUser;

const authHandler = (req, res, next) => {
  try {
    const authHeader = req.header("authorization");
    if (!authHeader)
      return res.status(401).send({
        message: "Access Denied",
      });

    const tokenArr = authHeader.split("Bearer ");
    if (tokenArr.length != 2)
      return res.status(401).send({
        message: "Access Denied",
      });

    const token = tokenArr[1];
    let decodedToken;
    decodedToken = jwt.verify(token, ENVIRONMENT.JWT.TOKEN_SECRET);
    if (!decodedToken)
      return res.status(401).send({
        message: "Access Denied",
      })();

    req.decodedToken = decodedToken;
    next();
  } catch (err) {
    return res.status(401).send({
      message: err.message,
    });
  }
};

export default authHandler;