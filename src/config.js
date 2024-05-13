import { config } from "dotenv";

export const PORT = process.env.PORT || 4000;
export const posgtresIntegration = {
    host: "localhost",
    password: "82850406sh",
    user: "postgres",
    database: "books"
}
config();