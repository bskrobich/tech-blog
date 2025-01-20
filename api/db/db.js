import pg from 'pg';

const { Client} = pg;

export const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "tech_blog",
    port: 5432,
    connectionTimeoutMillis: 30000,
    query_timeout: 20000,
    statement_timeout: 20000
});

export const connectToDatabase = async () => {
    try {
        await db.connect();
        console.log("Connected to the database.");
    } catch (err) {
        console.error("Database connection error:", err.message);
        throw err;
    }
};

export const closeDatabaseConnection = async () => {
    try {
        await db.end();
        console.log("Database connection closed.");
    } catch (err) {
        console.error("Error closing database connection:", err.message);
    }
};