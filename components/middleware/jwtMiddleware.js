import jwt from 'jsonwebtoken';

const jwtMiddleware = (req, res, next) => {
  console.log('Token request!');

  const token = req.cookies.token;
  if (!token) {
    return res
      .status(403)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default jwtMiddleware;
