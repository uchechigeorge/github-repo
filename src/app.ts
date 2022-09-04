import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();

app.use('/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

export default app;