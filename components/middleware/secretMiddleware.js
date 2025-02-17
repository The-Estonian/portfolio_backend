import dotenv from 'dotenv';
dotenv.config();

const secretMiddleware = (req, res, next) => {
  console.log('Secret check!');

  const secretToken = req.get('X-Client-Secret');

  // OUTSOURCE THI
  if (secretToken === process.env.CLIENT_SECRET) {
    next();
  } else {
    return res.status(403).send('Forbidden: Unknown client');
  }
};

export default secretMiddleware;
