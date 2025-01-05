import postgres from "postgres";

export const db = postgres({
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: "tech_blog"
});