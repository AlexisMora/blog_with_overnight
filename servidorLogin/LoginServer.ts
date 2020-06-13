import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { AuthController } from './controller/AuthController';
import * as passport from 'passport'
import * as cors from 'cors';
 
export class LoginServer extends Server {
    
    constructor() {
        super(process.env.NODE_ENV === 'development'); // setting showLogs to true
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        //CORS
        const whitelist = ['http://localhost:8081','http://localhost:8080','http://localhost:63342','http://localhost:63343','http://localhost:5500']
        const options:cors.CorsOptions = {
            origin: whitelist,
            credentials: true,
            allowedHeaders: 'Authorization, Origin, X-Requested-With, Content-Type, Accept',
            methods: 'POST, GET, DELETE, PUT, OPTIONS',
            maxAge: 3600
        }

        //inicialitzar l'app
        this.app.use(cors(options));
        this.app.use(passport.initialize())


        this.setupControllers();
    }
 
    private setupControllers(): void {
        const authController = new AuthController();
        // super.addControllers() must be called, and can be passed a single controller or an array of 
        // controllers. Optional router object can also be passed as second argument.
        super.addControllers(
            [authController],
            /*, optional router here,*/
            /* middleware that will apply to all controllers here ,*/
        );
    }
 
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log('Server listening on port: ' + port);
        })
    }
}