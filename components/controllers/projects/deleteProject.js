import db from '../../database/database.js';

const deleteProject = (req, res) => {
  console.log('Project delete request');
  const { id } = req.body;
  const username = req.user.name;

  if (!id) {
    return res.status(400).json({ error: 'Project id required' });
  }
  if (username !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  db.run('DELETE FROM projects WHERE id=?', [id], function (err) {
    if (err) {
      console.log('deleteProject error: ', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ success: 'success' });
  });
};

export default deleteProject;
