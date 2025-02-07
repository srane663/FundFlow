import dotenv from 'dotenv';
import express from 'express';
import initialize from './service/app.js';


dotenv.config();
const app = express();
const port = process.env.PORT;

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not set in the environment variables");
}


initialize(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
