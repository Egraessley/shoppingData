import {ExpressController} from "../utils/ExpressDecorators";
import * as _ from "lodash";
import BaseController from "./BaseController";
import { getConnection } from "typeorm";
import { Types } from "../db/models";
import { mappers } from "../db/mappers";
import { ResultsHelper } from "../utils/ResultsHelper";


@ExpressController.basePath('/types')
export default class TypeController implements BaseController
{
    @ExpressController.get('/',[])
    async getAll(req,res)
    {
        try {
        const types = await getConnection().getRepository(Types).find({order:{name: 'ASC'}});
        let models = types.map(type=>mappers.types.typeToTypeView(type));
        return res.json(models);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.get('/:id',[])
    async getOne(req,res)
    {
        try {
            const type = await getConnection().getRepository(Types).findOne(req.params.id);
            let model = mappers.types.typeToTypeView(type);
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }

    @ExpressController.post('/',[])
    async createOne(req,res)
    {
        try {
            let type = req.body;
            await getConnection().getRepository(Types).save(type);
            let model = mappers.types.typeViewToType(type);
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.put('/:id',[])
    async updateOne(req,res)
    {
        try {
            let type = req.body;
            await getConnection().getRepository(Types).update(req.params.id,type);
            let model = mappers.types.typeViewToType(type);
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.del('/:id',[])
    async deleteOne(req,res)
    {
        try {
            await getConnection().getRepository(Types).delete(req.params.id);
            return res.json(req.params.id);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }
}