const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const express = require("express");

dotenv.config();

const app = express();
const port = 3001;
const client = new MongoClient(process.env.DB_LINK);
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB server');

    const db = client.db('webdev');

    app.use(express.json());
    app.use("/users", userRoutes(db)); 

    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

main();
