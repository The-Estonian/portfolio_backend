const createTables = (db) => {
  db.serialize(() => {
    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY, 
          firstName TEXT, 
          lastName TEXT, 
          email TEXT, 
          password TEXT
          )
          `);

    // visitor table
    db.run(`
          CREATE TABLE IF NOT EXISTS visits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT,
            user_agent TEXT,
            referer TEXT,
            path TEXT,
            timestamp TEXT
          )
      `);

    // visitor visit count table
    db.run(`
          CREATE TABLE IF NOT EXISTS visitor_counts (
            ip TEXT PRIMARY KEY,
            visit_count INTEGER
          )
      `);
  });

  console.log('Database tables regenerated successfully!');
};

export default createTables;
