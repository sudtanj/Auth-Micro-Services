import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User],
  migrations: [],
  synchronize: true,
};

export const appDataSource = new DataSource(dataSourceOptions);
