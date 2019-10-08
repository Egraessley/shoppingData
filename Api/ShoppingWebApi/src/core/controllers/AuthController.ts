import { ExpressController } from '../utils/ExpressDecorators'
import { ResultsHelper } from "../utils/ResultsHelper";
import { getConnection } from "typeorm";
import * as jwt from 'jsonwebtoken';
import { RESTApi } from "../RestAPI";
import * as moment from 'moment';
import * as bcrypt from "bcrypt";
import { Users, Accounts } from '../db/models';
import { UserView } from '../db/viewModels';


@ExpressController.basePath('/auth')
export default class AuthController {
    @ExpressController.post('/login', [])
    async loginUser(req, res) {
        try {
            let user = await getConnection().getRepository(Users).findOne({
                where: {
                    userName: (<string>req.body.userName).toLowerCase()
                },
                relations: ['account']
            });
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                return ResultsHelper.sendResult(res, { message: 'Invalid Username or Password' }, 401);
            }
            //We're all good on the Auth here! Generate a token!
            let token = jwt.sign({ id: user.id, userName: user.userName, account: user.account.id, isAdmin: user.isAdmin, isSuper: user.isSuper }, RESTApi.instance.appSettings.TOKEN_SECRET, { expiresIn: RESTApi.instance.appSettings.TOKEN_EXPIRE_TIME });

            return res.json({ access_token: token });
        }
        catch (err) {
            console.error(err);
            return ResultsHelper.sendResult(res, { message: err.message }, 500);
        }
    }
    @ExpressController.post('/register', [])
    async register(req, res) {
        try {
            let usernameUser = await getConnection().getRepository(Users).findOne({ where: { userName: req.body.userName } });
            let emailUser = await getConnection().getRepository(Users).findOne({ where: { userName: req.body.userName } })
            if (usernameUser || emailUser) {
                return res.json({ unUsed: usernameUser ? true : false, emailUsed: emailUser ? true : false });
            }
            let account = new Accounts();
            let user = new Users();
            await getConnection().getRepository(Accounts).save(account);
            let model: UserView = req.body;
            user.account = account;
            user.email = model.email.toLowerCase();
            user.firstName = model.firstName;
            user.lastName = model.lastName;
            user.password = await bcrypt.hashSync(model.password, Number(RESTApi.instance.appSettings.PASSWORD_SALT_ROUNDS));
            user.isAdmin = true;
            user.isSuper = false;
            user.userName = model.userName.toLowerCase();
            user.id = 0;
            await getConnection().getRepository(Users).save(user);
            console.log(user);
            user = await getConnection().getRepository(Users).findOne(user.id, { relations: ['account'] });
            console.log(user);
            let token = jwt.sign({ id: user.id, userName: user.userName, account: user.account.id, isAdmin: user.isAdmin, isSuper: user.isSuper }, RESTApi.instance.appSettings.TOKEN_SECRET, { expiresIn: RESTApi.instance.appSettings.TOKEN_EXPIRE_TIME });

            return res.json({ access_token: token });
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, { error: e }, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }
}
