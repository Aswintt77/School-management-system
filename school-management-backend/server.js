require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors())
connectDB();

app.use(express.json());

// Adding logs to help debug
console.log('Using userRoutes...');
app.use('/api/users', require('./routes/userRoutes'));
console.log('Using studentRoutes...');
app.use('/api/students', require('./routes/studentRoutes'));
console.log('Using libraryRoutes...');
app.use('/api/library', require('./routes/libraryRoutes'));

app.use('/api/fees', require('./routes/feesRoutes'));

console.log('Using feesRoutes...');
 app.use('/api/count' ,require('./routes/countRoutes'))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
