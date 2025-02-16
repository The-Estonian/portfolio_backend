const secretMiddleware = (req, res, next) => {
  console.log('Secret check!');

  const secretToken = req.get('X-Client-Secret');

  if (secretToken === 'estonian') {
    next();
  } else {
    return res.status(403).send('Forbidden: Unknown client');
  }
};

export default secretMiddleware;
