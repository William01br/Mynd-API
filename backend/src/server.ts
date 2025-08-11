import { app } from './app';
import dotenv from 'dotenv';
import connect from './config/database.js';
import { connectToPrisma } from './infra/prisma/prisma';
dotenv.config();

(async () => {
  try {
    await connect();
    await connectToPrisma();
    console.log('pg established...');
    app.listen(process.env.PORT, () => {
      console.log('listening on port ' + process.env.PORT);
    });
  } catch (error) {
    console.error('ERROR', error);
  }
})();
