import db from '../../database/database.js';

const visitor = (req, res) => {
  console.log('Visitor request');

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const referer = req.body.referer;
  const path = req.body.path;
  const timestamp = new Date().toISOString();

  db.run(
    `INSERT INTO visits (ip, user_agent, referer, path, timestamp) VALUES (?, ?, ?, ?, ?)`,
    [ip, userAgent, referer, path, timestamp],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      db.run(
        `INSERT INTO visitor_counts (ip, visit_count) VALUES (?, 1) 
                 ON CONFLICT(ip) DO UPDATE SET visit_count = visit_count + 1`,
        [ip],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'accepted' });
        }
      );
    }
  );
};

export default visitor;
