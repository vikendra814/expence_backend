require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://expence-frontend-ltzt4khgv-vikendras-projects.vercel.app/"
  ],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));


const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
