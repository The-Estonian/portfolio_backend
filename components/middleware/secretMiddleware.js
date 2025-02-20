import dotenv from 'dotenv';
dotenv.config();
const API_SECRET = process.env.CLIENT_SECRET || 'localhost';

const secretMiddleware = (req, res, next) => {
  const secretToken = req.get('X-Client-Secret');

  if (secretToken === API_SECRET) {
    next();
  } else {
    return res.status(403).send('Forbidden: Unknown client');
  }
};
export default secretMiddleware;
