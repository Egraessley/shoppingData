import {ExpressController} from "../utils/ExpressDecorators";
import * as _ from "lodash";
import BaseController from "./BaseController";
import { getConnection } from "typeorm";
import { Products } from "../db/models";
import { mappers } from "../db/mappers";
import { ResultsHelper } from "../utils/ResultsHelper";


@ExpressController.basePath('/products')
export default class ProductController implements BaseController
{
    @ExpressController.get('/',[])
    async getAll(req,res)
    {
        try {
        const products = await getConnection().getRepository(Products).find({
            order:{name: 'ASC'},
            relations: ['brand','section','type']
        });
        let models = products.map(product=>mappers.products.productToProductListView(product));
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
            const product = await getConnection().getRepository(Products).findOne(req.params.id);
            let model = mappers.products.productToProductUpdateView(product);
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
            let product = req.body;
            product = await mappers.products.productUpdateViewToProduct(product);
            await getConnection().getRepository(Products).save(product);
            product = await getConnection().getRepository(Products).findOne(product.id,{
                relations: ['brand','section','type']
            });
            let model = mappers.products.productToProductListView(product);
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
            let product = req.body;
            product = await mappers.products.productUpdateViewToProduct(product);
            await getConnection().getRepository(Products).update(req.params.id,product);
            product = await getConnection().getRepository(Products).findOne(product.id,{
                relations: ['brand','section','type']
            });
            let model = mappers.products.productToProductListView(product);
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
            await getConnection().getRepository(Products).delete(req.params.id);
            return res.json(req.params.id);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }
}