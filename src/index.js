const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes')

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(taskRoutes);
app.use((err, req, res, next) => {
  return res.json({
    message:err.message
  })
});

PORT = 3001
app.listen(PORT);
console.log(`Server on Port ${PORT}`)