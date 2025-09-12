import express from 'express';
import heroesRoutes from "./routes/heroes.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

connectDB();

// app.get('/', (req, res) => {
//     res.send('Hello from Express with ES Modules 🚀');
// });

app.use("/api/heroes", heroesRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});