// const jwt = require('jsonwebtoken');

// const auth =(req, res, next)=>{
//     const token = req.headers['authorization']
//     console.log("TOKEN RECEIVED:", req.headers["authorization"]);

//     if(!token) return res.status(401).send({message: "Unauthorized: No token provided"})
    
//         try {
//             // Verify Token 
//             const decoded = jwt.verify(token, "secretKey");
//             req.user = decoded; // user Info stored
//             next();
//         } catch (error) {
//             res.status(401).send({message: "Unauthorized: Invalid token"})
//         }
// }

// module.exports = auth;

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("TOKEN RECEIVED:", authHeader);

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }

  // Extract token → remove "Bearer "
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey"); 
    req.user = decoded; // Store user info
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = auth;
