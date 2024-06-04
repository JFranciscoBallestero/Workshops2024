const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const majorRoutes = require('./routes/routes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Could not connect to database:', err));

app.use('/api/majors', majorRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});