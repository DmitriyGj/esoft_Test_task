import { DataSource } from 'typeorm';
import {User, role, User_details} from './entities';

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "lol355183",
    database: "esoft",
    entities: [User, role, User_details],
})


export default PostgresDataSource;