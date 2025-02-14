const logout = (req, res) => {
  console.log('Logout request!');

  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 0,
  });

  res.json({ logout: 'success', profile: {} });
};

export default logout;
