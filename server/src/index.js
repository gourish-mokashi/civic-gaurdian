import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoute.js';
import issueRouter from './routes/issueRoute.js';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import { betterAuthMiddleware } from './middleware/betterAuthMiddleware.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:8081", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials if needed
}));

// auth route should be before express.json middleware
app.all("/api/auth/{*any}", toNodeHandler(auth))

app.use(express.json());

app.use(betterAuthMiddleware);

app.use("/api/issues", issueRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});