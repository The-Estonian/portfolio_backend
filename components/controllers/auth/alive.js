const status = (req, res) => {
  console.log('Ping pong');

  res.json({ ping: 'pong' });
};

export default status;
