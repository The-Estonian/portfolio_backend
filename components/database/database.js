import sqlite3 from 'sqlite3';
import fs from 'fs';
import createTables from './tables.js';

const DB_PATH = './components/database/test.db';

const isNewDatabase = !fs.existsSync(DB_PATH);

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    createTables(db);
  }
});

export default db;
