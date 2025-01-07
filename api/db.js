import pg from 'pg';

const { Client} = pg;

export const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "tech_blog",
    port: 5432
});

db.connect()
    .then(() => console.log("Connected to the database."))
    .catch((err) => console.error("Database connection error:", err.stack));