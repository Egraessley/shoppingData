/// <reference types="socket.io" />
import {SocketIOHelper} from "./utils/SocketIOHelper";
import {createConnections} from 'typeorm';
import {ExpressController} from "./utils/ExpressDecorators";
import * as controllers from './controllers';


//import * as overrideControllers from './controllers/overrides';

import * as socketControllers from './controllers/socket';
import * as express from 'express';
import * as https from 'http';
import * as bodyParser from 'body-parser';
import * as socketIo from 'socket.io';
import * as path from 'path';
import {SioController} from './utils/SocketDecorators';
import "reflect-metadata";

let ormconfig = require('../../ormconfig.json');

export class RESTApi
{
    public static instance:RESTApi;

    public appSettings;
    public workerId;
    public ElasticSearch;

    private app;
    private io;

    private port:number;

    //Key Info
    private key:string;
    private cert:string;

    private server;

    private socketServer;

    // protected apm = apm;

    constructor(port, key, cert, appSettings, workerId, initDb = false)
    {
        this.port = port;
        this.key = key;
        this.cert = cert;
        this.app = express();
        RESTApi.instance = this;
        this.workerId = workerId;
        this.appSettings = appSettings;


        // this.init_apm();
        if(this.appSettings.ES_ENABLE && this.appSettings.ES_ENABLE === 'true')
        {
            // this.init_es();
            // new ElasticSearch();
        }

        if(!initDb)
            this.init_server();
    }

    private async init_server()
    {
        try
        {
            let connection = await this.init_db(false);

            this.app.all('*', function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, app-key-priv, app-key-pub");
                res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
                next();
            });

            //Expand Express
            this.app.use(bodyParser.urlencoded({extended:false,limit: '5120mb'}));
            this.app.use(bodyParser.json({limit: '5120mb'}));
            this.app.set('trust proxy', true);

            let initControllers = [];
            let initSocketControllers = [];


            //Add base classes
            for(let controller in controllers)
            {
                let c = new controllers[controller]();
                initControllers.push(c);
                ExpressController.register(this.app, c)
            }
            // //Add overwritten classes!
            // for(let oController in overrideControllers)
            // {
            //     let oc = new overrideControllers[oController]();
            //     initControllers.push(oc);
            //     web.register(this.app, oc);
            // }

            // require('express-print-routes')(this.app, './file.txt');
            this.app.use('/images', express.static(path.join(__dirname, '../../localUploads')));

            this.app.all('*', function(req,res, next){

                //Preflight check! We don't want to 404 this!
                if(req.method == 'OPTIONS')
                    return next();
                res.status(404).send(req.method + ' ' + req.originalUrl + ' Does not exist');
            });

            this.server = https.createServer(this.app);

            this.socketServer = socketIo(this.server);
            // this.socketServer.use(socketJwt.authorize({
            //     secret:this.appSettings.SOCKET_KEY,
            //     handshake:true
            // }));

            //Init controllers
            for(let controller in socketControllers)
            {
                let nc = new socketControllers[controller]();
                initSocketControllers.push(nc);
            }

            const sioCrl = SioController.getInstance();
            sioCrl.init(this.socketServer);
            SocketIOHelper.io = this.socketServer;

            // this.app.use(apm.middleware.connect());

            this.server.listen(this.port, () =>
            {
                console.log('Started API Server on port: ' + this.port + ' I am worker ' + this.workerId);
            });



        }
        catch(error)
        {
            console.log(error);
            process.exit(1);
        }
    }
    public async init_db(sync = true)
    {
        try {


            let defaultConnection = ormconfig;

            defaultConnection.synchronize = sync;
            defaultConnection.logging = this.appSettings.DEBUG_MODE == 'true';

            let connection = await createConnections([defaultConnection]);

            if (sync) {
                console.log('Initializing Defaults');
                /*
                for (let dbBase in defaultDbs) {
                    let dbDefault = new defaultDbs[dbBase]();

                    await dbDefault.init();
                    await dbDefault.run();
                    await dbDefault.end();
                }*/
            }
            return connection;
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

    public async init_es()
    {
        // try {
        //     const hosts = this.appSettings.ES_HOSTS.split(';');
        //     this.ElasticSearch = new elasticSearchClient.Client({
        //         hosts:hosts
        //     });
        //
        //     this.ElasticSearch.ping({
        //         requestTimeout:1000
        //     }, (err) => {
        //         if(err)
        //         {
        //             console.error('Connection to Elastic Search failed');
        //             console.error(err);
        //         }
        //         else {
        //             console.log('****************************');
        //             console.log('** Elastic Search is running');
        //             console.log('****************************');
        //         }
        //     });
        //
        //     // let results = await this.ElasticSearch.search({
        //     //     q:'templates'
        //     // });
        //     // console.log('results',results);
        //
        //     // await this.ElasticSearch;
        // } catch (e) {
        //     console.error('Error initiating ES');
        //     console.error(e);
        // }
    }

    public init_apm()
    {
        // try {
        //     if(this.appSettings.ELK_APM == 'false')
        //     {
        //         return;
        //     }
        //
        //     console.log('****** ELK STACK APM INITIALIZATION *****');
        //     this.apm.start({
        //         serviceName:'nasa-api',
        //         serviceVersion: this.appSettings.APP_VERSION,
        //         serverUrl:this.appSettings.ELK_URL,
        //         // active: process.env.ENV === 'prod'
        //     });
        //     console.log('****** ELK STACK APM INITIALIZATION *****');
        // } catch (e) {
        //     console.error(e);
        //     process.exit(1);
        // }
    }
}
