const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = { id: decoded.userId };
    const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};

module.exports = authMiddleware;