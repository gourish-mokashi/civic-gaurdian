import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// auth route should be before express.json middleware
app.use(authRouter);

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});