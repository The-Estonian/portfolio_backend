import db from '../../database/database.js';

const deleteEducation = (req, res) => {
  const { id } = req.body;
  const username = req.user.name;

  if (!id) {
    return res.status(400).json({ error: 'Education id is required' });
  }
  if (username !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  db.run('DELETE FROM education WHERE id=?', [id], (err, rows) => {
    if (err) {
      console.log('deleteEducation error: ', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ success: 'success' });
  });
};

export default deleteEducation;
