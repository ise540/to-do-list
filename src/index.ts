import express from 'express';
import mongoose from 'mongoose';
import router from './router';

const PORT = process.env.PORT || 8080;

const DB_URL = 'mongodb://localhost:27017/to-do-list';

const app = express();

app.use(express.json());
app.use('/api', router);

async function start() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
