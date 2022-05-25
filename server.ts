import * as express from 'express'
import Config from './app/config/app.config'
import DataBase from './app/db/datasource';
import { User } from './app/db/entities';
DataBase.initialize().then(() => console.log('asds'))
const app = express();
app.get('/', async (requset, response) => {
    const result = await DataBase.getRepository(User).find({
        relations:{
            role:true, 
            user_details:true
        }
    });
    console.log(result)
    response.send(result)
});




app.listen(Config.PORT, () => console.log(`server started on localhost:${Config.PORT}`))
