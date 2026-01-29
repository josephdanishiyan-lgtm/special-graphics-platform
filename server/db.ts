// server/db.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  // CLOUD MODE (Render / Neon)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for Neon
      }
    },
    logging: false
  });
} else {
  // LOCAL MODE (Your Laptop)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'special_graphics',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      logging: false,
    }
  );
}

export default sequelize;
