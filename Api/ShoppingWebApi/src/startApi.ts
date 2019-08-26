import {RESTApi} from './core/RestAPI';
import * as cluster from 'cluster';
import * as os from 'os';

require('dotenv').config({path:__dirname + '/../.env'});
process.env.APP_VERSION = require(__dirname + '/../package.json').version;

// var api = new RESTApi(process.env.REST_API_PORT, '', '', process.env, 0);

// require('dotenv').config({path:__dirname + '/../.env'});
if(cluster.isMaster)
{
    var dbInit = new RESTApi(process.env.REST_API_PORT, '', '',process.env, 1, true);

    dbInit.init_db(process.env.SYNC_DB === 'true').then(
        ()=>{
            for(var i in os.cpus())
            {
                cluster.fork();
            }
            cluster.on('exit', function(worker){
                console.log('Worker died! ' + worker.id + '. And now his watch has ended');
                cluster.fork();
            });
        },
        (err)=>{
            console.error(err.message);
            process.exit(1);
        }
    ).catch((err)=>{
        console.error(err.message);
        process.exit(1);
    })


}
else
    var api = new RESTApi(process.env.REST_API_PORT, '', '', process.env, cluster.worker.id);

