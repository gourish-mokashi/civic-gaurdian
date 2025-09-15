import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:8081", // Allow all origins for simplicity, adjust as needed
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials if needed
}));

// auth route should be before express.json middleware
app.use(authRouter);

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});