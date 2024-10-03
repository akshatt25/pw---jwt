require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile'); 
const cors = require('cors');
const router = express.Router(); 
const app = express();
const port = 8080;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
// const corsOptions = {
//   origin: 'http://192.168.29.4:3000/',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // if you need to send cookies or authentication
//   optionsSuccessStatus: 204
// };



// router.get("/", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//    });
// app.options('*', cors(corsOptions));
// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));





// Start the server
app.listen(port,"0.0.0.0" ,() => {
  console.log(`Server is running on http://localhost:${port}`);
});
