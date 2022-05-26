import { DataSource } from 'typeorm';
import {User, Role, User_details, Task} from './entities';

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "lol355183",
    database: "postgres",
    entities: [User, Role, User_details, Task],
})


export default PostgresDataSource;