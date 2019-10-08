import { ExpressController } from "../utils/ExpressDecorators";
import * as _ from "lodash";
import BaseController from "./BaseController";
import { getConnection } from "typeorm";
import { Users, Accounts } from "../db/models";
import { mappers } from "../db/mappers";
import { ResultsHelper } from "../utils/ResultsHelper";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { UserView } from "../db/viewModels";
import * as bcrypt from 'bcrypt';
import { RESTApi } from "../RestAPI";
import * as jwt from 'jsonwebtoken';


@ExpressController.basePath('/account')
export default class AccountsController implements BaseController {
    @ExpressController.get('/user', [AuthMiddleware.checkToken, AuthMiddleware.adminCheck])
    async getUsers(req, res) {
        try {
            let account = res.locals.account;
            let users = await getConnection().getRepository(Users).find({
                where: {
                    account
                },
                relations: [

                ]
            });
            let models: UserView[] = users.map(user => {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    userName: user.userName,
                    isAdmin: user.isAdmin,
                }
            });
        return res.json(models);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, { error: e }, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.get('/user/:id', [AuthMiddleware.checkToken, AuthMiddleware.adminCheck])
    async getUserById(req, res) {
        try {
            const user = await getConnection().getRepository(Users).findOne(req.params.id);
            let model = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                isAdmin: user.isAdmin,
            }
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, { error: e }, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }

    @ExpressController.post('/user', [AuthMiddleware.checkToken, AuthMiddleware.adminCheck])
    async addUser(req, res) {
        try {
            let usernameUser = await getConnection().getRepository(Users).findOne({where:{userName: req.body.userName}});
            let emailUser = await getConnection().getRepository(Users).findOne({where:{email: req.body.email.toLowerCase()}});
            console.log(usernameUser);
            console.log(emailUser);
            if(usernameUser || emailUser)
            {
                return res.json({unUsed: usernameUser ? true : false, emailUsed: emailUser ? true : false});
            }
            let model: UserView = req.body;
            let user = new Users();
            user.account = res.locals.account;
            user.firstName = model.firstName;
            user.lastName = model.lastName;
            user.email = model.email.toLowerCase();
            user.password = await bcrypt.hashSync(model.password, Number(RESTApi.instance.appSettings.PASSWORD_SALT_ROUNDS));
            user.isAdmin = model.isAdmin;
            user.isSuper = false;
            user.userName = model.userName.toLowerCase();
            user.id = 0;

            await getConnection().getRepository(Users).save(user);
            user = await getConnection().getRepository(Users).findOne(user.id);
            model = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                isAdmin: user.isAdmin,
            }
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, { error: e }, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.put('/user/:id', [AuthMiddleware.checkToken, AuthMiddleware.adminCheck])
    async updateUser(req, res) {
        try {
            let emailUser = await getConnection().getRepository(Users).findOne({where:{email: req.body.email.toLowerCase()}});
            if(emailUser)
            {
                return res.json({emailUsed: emailUser ? true : false});
            }
            let model: UserView = req.body;
            let user = new Users();
            user.id = model.id;
            user.firstName = model.firstName;
            user.lastName = model.lastName;
            user.isAdmin = model.isAdmin;
            user.email = model.email;

            await getConnection().getRepository(Users).save(user);
            user = await getConnection().getRepository(Users).findOne(req.params.id);
            model = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                isAdmin: user.isAdmin,
            }
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, { error: e }, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.del('/user/:id', [AuthMiddleware.checkToken, AuthMiddleware.adminCheck])
    async deleteUser(req, res) {
        try {
            await getConnection().getRepository(Users).delete(req.params.id);
            return res.json(req.params.id);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, { error: e }, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }
}