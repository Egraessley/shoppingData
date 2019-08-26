import {ExpressController} from "../utils/ExpressDecorators";
import * as _ from "lodash";
import BaseController from "./BaseController";
import { getConnection } from "typeorm";
import { Tags } from "../db/models";
import { mappers } from "../db/mappers";
import { ResultsHelper } from "../utils/ResultsHelper";


@ExpressController.basePath('/tags')
export default class TagController implements BaseController
{
    @ExpressController.get('/',[])
    async getAll(req,res)
    {
        try {
        const tags = await getConnection().getRepository(Tags).find({order:{name: 'ASC'}});
        let models = tags.map(tag=>mappers.tags.tagToTagView(tag));
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
            const tag = await getConnection().getRepository(Tags).findOne(req.params.id);
            let model = mappers.tags.tagToTagView(tag);
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
            let tag = req.body;
            await getConnection().getRepository(Tags).save(tag);
            let model = mappers.tags.tagViewToTag(tag);
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
            let tag = req.body;
            await getConnection().getRepository(Tags).update(req.params.id,tag);
            let model = mappers.tags.tagViewToTag(tag);
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
            await getConnection().getRepository(Tags).delete(req.params.id);
            return res.json(req.params.id);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }
}