import * as express from 'express'
import Config from './app/config/app.config'
import DataBase from './app/db/datasource';
import Router from './app/router';
import * as bodyParser from 'body-parser'

DataBase.initialize().then(() => console.log('asds'))
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',Router);






app.listen(Config.PORT, () => console.log(`server started on localhost:${Config.PORT}`))
