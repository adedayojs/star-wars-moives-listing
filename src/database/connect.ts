import { createConnection } from 'typeorm';
import { User } from 'src/models/User';
import { Comment } from 'src/models/comment';
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
    entities: [User, Comment],
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
