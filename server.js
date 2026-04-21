// require('dotenv').config({ path: require('path').join(__dirname, '.env') });
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://expence-frontend-bb88h4a4j-vikendras-projects.vercel.app"
//   ],
//   credentials: true
// }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/expenses', require('./routes/expenses'));


// const dns = require("dns");
// dns.setServers(["8.8.8.8", "1.1.1.1"]);


// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(process.env.PORT || 5000, () =>
//       console.log(`Server running on port ${process.env.PORT || 5000}`)
//     );
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   });


require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');

const app = express();

/* ---------------- DNS FIX (important for MongoDB Atlas) ---------------- */
dns.setServers(["8.8.8.8", "1.1.1.1"]);

/* ---------------- CORS CONFIG ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://expence-frontend-bb88h4a4j-vikendras-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());

/* ---------------- HEALTH CHECK ---------------- */
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* ---------------- ROUTES ---------------- */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

/* ---------------- DB CONNECTION + SERVER START ---------------- */
const PORT = process.env.PORT || 8080; // Railway compatible

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });