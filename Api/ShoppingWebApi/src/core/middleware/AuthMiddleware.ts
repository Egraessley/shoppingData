import { ResultsHelper } from "../utils/ResultsHelper";
import * as jwt from 'jsonwebtoken';
import { RESTApi } from "../RestAPI";
import { getConnection } from "typeorm";
import { Users } from "../db/models";

export class AuthMiddleware {
    public static async checkToken(req, res, next) {
        try {
            let token = req.get('token') != null ? req.get('token') : req.body.token;

            if (req.params.hasOwnProperty('token'))
                token = req.params.token;

            if (token == null)
                return ResultsHelper.sendResult(res, { message: 'Token Missing or Invalid' }, ResultsHelper.HttpErrors.UNAUTHORIZED);

            if (!await jwt.verify(token, RESTApi.instance.appSettings.TOKEN_SECRET))
                return ResultsHelper.sendResult(res, { message: 'Invalid Token' }, ResultsHelper.HttpErrors.UNAUTHORIZED);

            let data: any = await jwt.decode(token);
            let user = await getConnection().getRepository(Users).findOne({
                where: {
                    userName: data.userName
                }, relations: ['account']
            });

            if(!user || !user.account || !data.userName)
            {
                return ResultsHelper.sendResult(res,{message: "invalid User"},ResultsHelper.HttpErrors.UNAUTHORIZED);
            }
            res.locals.user = user;


            res.locals.account = res.locals.user.account

            res.locals.token = token;

            next();
        }
        catch (err) {
            return ResultsHelper.sendResult(res, { message: err.message }, ResultsHelper.HttpErrors.UNAUTHORIZED);
        }
    }

    public static async adminCheck(req, res, next) {
        try {
            if(res.locals.user && res.locals.user.isAdmin)
                next();
            else 
            return ResultsHelper.sendResult(res,{message: "Unauthorized to perform this action"},ResultsHelper.HttpErrors.UNAUTHORIZED);
        }
        catch (err) {
            return ResultsHelper.sendResult(res, { message: err.message }, ResultsHelper.HttpErrors.FORBIDDEN);
        }
    }

    public static async superCheck(req, res, next) {
        try {
            if(res.locals.user && res.locals.user.isSuper)
                next();
            else 
            return ResultsHelper.sendResult(res,{message: "Unauthorized to perform this action"},ResultsHelper.HttpErrors.UNAUTHORIZED);
        }
        catch (err) {
            return ResultsHelper.sendResult(res, { message: err.message }, ResultsHelper.HttpErrors.FORBIDDEN);
        }
    }
}
