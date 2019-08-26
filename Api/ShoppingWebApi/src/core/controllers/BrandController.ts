import {ExpressController} from "../utils/ExpressDecorators";
import * as _ from "lodash";
import BaseController from "./BaseController";
import { getConnection } from "typeorm";
import { Brands } from "../db/models";
import { mappers } from "../db/mappers";
import { ResultsHelper } from "../utils/ResultsHelper";


@ExpressController.basePath('/brands')
export default class BrandController implements BaseController
{
    @ExpressController.get('/',[])
    async getAll(req,res)
    {
        try {
        const brands = await getConnection().getRepository(Brands).find({order:{name: 'ASC'}});
        let models = brands.map(brand=>mappers.brands.brandToBrandView(brand));
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
            const brand = await getConnection().getRepository(Brands).findOne(req.params.id);
            let model = mappers.brands.brandToBrandView(brand);
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
            let brand = req.body;
            await getConnection().getRepository(Brands).save(brand);
            let model = mappers.brands.brandViewToBrand(brand);
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
            let brand = req.body;
            await getConnection().getRepository(Brands).update(req.params.id,brand);
            let model = mappers.brands.brandViewToBrand(brand);
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
            await getConnection().getRepository(Brands).delete(req.params.id);
            return res.json(req.params.id);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }
}