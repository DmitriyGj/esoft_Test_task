import { DataSource } from 'typeorm';
import {User, Role, User_details, Task} from './entities';
import * as dotenv from 'dotenv';

dotenv.config();

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.db_host,
    port: +process.env.db_port,
    username:  process.env.db_username,
    password: process.env.db_password,
    database: process.env.dbatabse,
    // ssl: {
    //     rejectUnauthorized:false
    // },
    entities: [User, Role, User_details, Task],
})


export default PostgresDataSource;