/* eslint-disable no-console */
import express from 'express';
import apiRoutes from './server/routes/api.routes.mjs';

const app = express();

const PORT = process.env.PORT || 3030;
const staticFolder = 'build';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(staticFolder));
app.use('/api', apiRoutes);

async function bootServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on: http//localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootServer();
