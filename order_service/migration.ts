import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DB_URL } from "./src/config";

async function runMigration() {
    try {
        console.log("migration started...");
        const pool = new Pool({
            connectionString: DB_URL
        })
        const db = drizzle(pool);
        await migrate(db, { migrationsFolder: "./src/db/migrations" });
        console.log("migration successful");
        pool.end();
    } catch (error) {
        console.log("migration error", error);
    }
}

runMigration()