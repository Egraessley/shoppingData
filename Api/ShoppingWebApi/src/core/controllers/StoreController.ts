import {ExpressController} from "../utils/ExpressDecorators";
import * as _ from "lodash";
import BaseController from "./BaseController";
import { getConnection } from "typeorm";
import { mappers } from "../db/mappers";
import { ResultsHelper } from "../utils/ResultsHelper";
import { Stores } from "../db/models";
import { AuthMiddleware } from "../middleware/AuthMiddleware";


@ExpressController.basePath('/store')
export default class StoreController implements BaseController
{
    @ExpressController.get('/',[AuthMiddleware.checkToken])
    async getAll(req,res)
    {
        try {
        const stores = await getConnection().getRepository(Stores).find({order:{name: 'ASC'}});
        let models = stores.map(x=>{
            return {
                name: x.name,
                id: x.id
            }
        })
        return res.json(models);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.get('/:id',[AuthMiddleware.checkToken])
    async getOne(req,res)
    {
        try {
            const store = await getConnection().getRepository(Stores).findOne(req.params.id);
            let model = {
                name: store.name,
                id: store.id
            }
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }

    @ExpressController.post('/',[AuthMiddleware.checkToken])
    async createOne(req,res)
    {
        try {
            let model = req.body;
            let store = new Stores();
            store.name = model.name;
            store.account = res.locals.account;
            await getConnection().getRepository(Stores).save(store);
            return res.json({id: store.id, name: store.name});
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.put('/:id',[AuthMiddleware.checkToken])
    async updateOne(req,res)
    {
        try {
            let store = req.body;
            await getConnection().getRepository(Stores).update(req.params.id,store);
            let model = {
                id: store.id,
                name: store.name
            };
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.del('/:id',[AuthMiddleware.checkToken])
    async deleteOne(req,res)
    {
        try {
            await getConnection().getRepository(Stores).delete(req.params.id);
            return res.json(req.params.id);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }
}