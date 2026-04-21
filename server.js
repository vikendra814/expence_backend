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
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]); // DNS fix

const app = express();

// ✅ Better CORS handling
const allowedOrigins = [
  "http://localhost:5173",
  "https://expence-frontend-bb88h4a4j-vikendras-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// ✅ Health check (VERY IMPORTANT for testing)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

// ✅ Connect DB and start server
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log('MongoDB connected');

    const PORT = process.env.PORT || 5000;

    // 🔥 MOST IMPORTANT FIX
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });