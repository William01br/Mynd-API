import { app } from './app';
import dotenv from 'dotenv';
import connect from './config/database.js';
dotenv.config();

(async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log('listening on port ' + process.env.PORT);
    });
  } catch (error) {
    console.error('ERROR', error);
  }
})();
