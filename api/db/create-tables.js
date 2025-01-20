import {closeDatabaseConnection, connectToDatabase, db} from './db.js';
import fs from 'fs/promises';

const createTablesFromFile = async (filePath) => {
    try {
        await connectToDatabase();
        const sql = await fs.readFile(filePath, 'utf-8');
        await db.query(sql);
        console.log("Tables created successfully.");
    } catch (err) {
        console.error("Error creating tables:", err.message);
    } finally {
        await closeDatabaseConnection();
        process.exit(0);
    }
};

const filePath = './schema.sql';
createTablesFromFile(filePath);
