import { createConnection } from 'typeorm';
import path from 'path';
/**
 *
 * Create Database Connection
 *
 */

export default function connectToDatabase() {
  createConnection({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [path.join(__dirname, '..', '/models/*.js')],
    migrations: ['src/database/migration/**/*.ts'],
    synchronize: true,
    logging: ['info'],
  })
    .then(() => {
      // here you can start to work with your entities
      console.log('Database Connection Successful');
    })
    .catch((error) => console.log(error));
}
