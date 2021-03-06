import {ExpressController} from "../utils/ExpressDecorators";
import * as _ from "lodash";
import BaseController from "./BaseController";
import { getConnection } from "typeorm";
import { Transactions, OrderItemsToTag, OrderItems, Products, Tags, Stores } from "../db/models";
import { mappers } from "../db/mappers";
import { ResultsHelper } from "../utils/ResultsHelper";
import { TransactionView } from "../db/viewModels";
import { AuthMiddleware } from "../middleware/AuthMiddleware";


@ExpressController.basePath('/transactions')
export default class TransactionController implements BaseController
{
    @ExpressController.get('/',[AuthMiddleware.checkToken])
    async getAll(req,res)
    {
        try {
        const transactions = await getConnection().getRepository(Transactions).find({
            order:{date: 'ASC'},
            where: {
                account: res.locals.account
            },
            relations: [
                'store',
                'items',
                'items.tags',
                'items.tags.tag',
                'items.product',
                'items.transaction',
            ]
        });
        let models = transactions.map(transaction=>mappers.transactions.transactionToTransactionList(transaction));
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
            const transaction = await getConnection().getRepository(Transactions).findOne(req.params.id,{
            relations: [
                'store',
                'items',
                'items.tags',
                'items.tags.tag',
                'items.product',
                'items.transaction',
            ]
            });
            let model = mappers.transactions.transactionToTransactionView(transaction);
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
            let transaction: TransactionView = req.body;
            let newTransaction = new Transactions();
            newTransaction.account = res.locals.account;
            await getConnection().transaction(async (m)=>{
                let store =await m.getRepository(Stores).findOneOrFail(transaction.storeId);
                newTransaction.id=transaction.id;
                newTransaction.date=transaction.date;
                newTransaction.items = [];
                newTransaction.store = store;
                await m.getRepository(Transactions).save(newTransaction);

                for(const orderItem of transaction.items)
                {
                    let product = await m.getRepository(Products).findOne(orderItem.productId);
                    let newOrderItem: OrderItems = {
                        id: orderItem.id,
                        price: orderItem.price,
                        quantity: orderItem.quantity,
                        transaction: newTransaction,
                        product,
                        tags: []

                    }
                    await m.getRepository(OrderItems).save(newOrderItem);
                    for(const tag of orderItem.tags)
                    {
                        let mid = new OrderItemsToTag();
                        mid.orderItem = newOrderItem;
                        mid.tag = await m.getRepository(Tags).findOne(tag.id);
                        await m.getRepository(OrderItemsToTag).save(mid);
                    }
                }
            });
            let model:any = await getConnection().getRepository(Transactions).findOne(newTransaction.id,{
            relations: [
                'store',
                'items',
                'items.tags',
                'items.tags.tag',
                'items.product',
                'items.transaction',
            ]
            });
            model = mappers.transactions.transactionToTransactionView(model);
            return res.json(model);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }
    }

    @ExpressController.put('/:id',[AuthMiddleware.checkToken])
    async updateOne(req,res)
    {
        try {
            let newModel: TransactionView = req.body;
            await getConnection().transaction(async (m)=>{
                let store =await m.getRepository(Stores).findOneOrFail(newModel.storeId);
                let transaction = await m.getRepository(Transactions).findOne(newModel.id,{
                    relations: [
                        'store',
                        'items',
                        'items.tags',
                        'items.tags.tag',
                        'items.product',
                        'items.transaction',
                    ]
                });
                transaction.date = newModel.date;
                transaction.store = store;
                await m.getRepository(Transactions).save(transaction);

                for(let orderItem of transaction.items) {
                    let newItem = newModel.items.find(x=>x.id===orderItem.id);
                    if(newItem)
                    {
                        orderItem.price= +newItem.price;
                        orderItem.quantity= +newItem.quantity;
                        orderItem.transaction = await m.getRepository(Transactions).findOne(transaction.id);
                        orderItem.product = await m.getRepository(Products).findOne(newItem.productId);
                        orderItem.tags = await m.getRepository(OrderItemsToTag).find({
                            where: {
                                orderItem
                            }
                        });

                        for (const tag of orderItem.tags)
                        {
                            await m.getRepository(OrderItemsToTag).remove(tag);
                        }
                        orderItem.tags = [];

                        await m.getRepository(OrderItems).save(orderItem);
                        for(let tag of newItem.tags)
                        {
                            let mid = new OrderItemsToTag();
                            mid.orderItem = orderItem;
                            mid.tag = await m.getRepository(Tags).findOneOrFail(tag.id);
                            await m.getRepository(OrderItemsToTag).save(mid);
                        }

                    } else {
                        for(const tag of orderItem.tags)
                        {
                            await m.getRepository(OrderItemsToTag).remove(tag);
                        }
                        await m.getRepository(OrderItems).remove(orderItem);
                    }

                }

                for(const newItem of newModel.items.filter(x=>x.id ===0))
                {
                    let orderItem = new OrderItems();
                    orderItem.price= +newItem.price;
                    orderItem.quantity= +newItem.quantity;
                    orderItem.transaction = transaction;
                    orderItem.product = await m.getRepository(Products).findOne(newItem.productId);
                    orderItem.tags = [];

                    await m.getRepository(OrderItems).save(orderItem);
                    for(const tag of newItem.tags)
                    {
                        let mid = new OrderItemsToTag();
                        mid.tag = await m.getRepository(Tags).findOne(tag.id);
                        mid.orderItem = orderItem;
                        await m.getRepository(OrderItemsToTag).save(mid);
                    }
                }


            });
            let model:any = await getConnection().getRepository(Transactions).findOne(req.params.id,{
            relations: [
                'store',
                'items',
                'items.tags',
                'items.tags.tag',
                'items.product',
                'items.transaction',
            ]
            });
            model = mappers.transactions.transactionToTransactionView(model);
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
            await getConnection().getRepository(Transactions).delete(req.params.id);
            return res.json(req.params.id);
        } catch (e) {
            console.error(e);
            return ResultsHelper.sendResult(res, {error: e}, ResultsHelper.HttpErrors.SERVER_ERROR);
        }

    }
}