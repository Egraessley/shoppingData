import * as fromViews from "./viewModels";
import * as fromModels from "./models";
import { getConnection } from "typeorm";
import { OrderItemsToTag } from "./models";

export const mappers = {

    brands: {
        brandToBrandView(brand: fromModels.Brands): fromViews.BrandView {
            return {
                id: brand.id,
                name: brand.name
            }
        },

        brandViewToBrand(brand: fromViews.BrandView): fromModels.Brands {
            return {
                id: brand.id,
                name: brand.name
            }
        }

    },

    sections: {
        sectionToSectionView(section: fromModels.Sections): fromViews.SectionView {
            return {
                id: section.id,
                name: section.name
            }
        },
        sectionViewToSection(section: fromViews.SectionView): fromModels.Sections {
            return {
                id: section.id,
                name: section.name
            }
        },
    },

    tags: {
        tagToTagView(tag: fromModels.Tags): fromViews.TagView {
            return {
                id: tag.id,
                name: tag.name
            }
        },
        tagViewToTag(tag: fromViews.TagView): fromModels.Tags {
            return {
                id: tag.id,
                name: tag.name
            }
        },

    },

    types: {
        typeToTypeView(type: fromModels.Types): fromViews.TypeView {
            return {
                id: type.id,
                name: type.name
            }
        },
        typeViewToType(type: fromViews.TypeView): fromModels.Types {
            return {
                id: type.id,
                name: type.name
            }
        }
    },

    products: {
        productToProductListView(product: fromModels.Products): fromViews.ProductListView {
            return {
                id: product.id,
                name: product.name,
                brand: product.brand.name,
                brandId: product.brand.id,
                section: product.section.name,
                sectionId: product.section.id,
                type: product.type.name,
                typeId: product.type.id
            }
        },
        productToProductUpdateView(product: fromModels.Products): fromViews.ProductUpdateView {
            return {
                id: product.id,
                name: product.name,
                brandId: product.brand.id,
                sectionId: product.section.id,
                typeId: product.type.id
            }
        },
        async productUpdateViewToProduct(product: fromViews.ProductUpdateView): Promise<fromModels.Products> {
            try {
                const brand = await getConnection().getRepository(fromModels.Brands).findOne(product.brandId);
                const section = await getConnection().getRepository(fromModels.Sections).findOne(product.brandId);
                const type = await getConnection().getRepository(fromModels.Types).findOne(product.brandId);
                return {
                    id: product.id,
                    name: product.name,
                    brand,
                    type,
                    section
                }
            }
            catch (e) {
                console.error(e);
                return null;
            }
        },
    },
    orderItems: {
        orderItemtoOrderItemView(item: fromModels.OrderItems): fromViews.orderItemView {
            return {
                id: item.id,
                productId: item.product.id,
                tags: item.tags.map(x=>mappers.tags.tagToTagView(x.tag)),
                quantity: item.quantity,
                price: item.price,
                transactionId: item.transaction.id
            }
        },
        async orderItemViewToOrderItem(item: fromViews.orderItemView): Promise<fromModels.OrderItems> {
            const product = await getConnection().getRepository(fromModels.Products).findOne(item.productId);
            const transaction = await getConnection().getRepository(fromModels.Transactions).findOne(item.transactionId);
            let orderItem = {
                id: item.id,
                price: item.price,
                product,
                quantity: item.quantity,
                transaction: transaction,
                tags: []
            }
            let tags: fromModels.OrderItemsToTag[] = item.tags.map(tag=>{
                let mid: fromModels.OrderItemsToTag = {
                    id: tag.id,
                    orderItem,
                    tag
                }
                return mid;
            });
            orderItem.tags = tags;
            return orderItem;
        }
    }, 
    transactions: {
        transactionToTransactionList(transaction: fromModels.Transactions): fromViews.TransactionListView {
            return {
                id: transaction.id,
                price: transaction.items.reduce((total,item)=>total+ +item.price,0),
                items: transaction.items.length,
                date: transaction.date
            }
        },
        transactionToTransactionView(transaction: fromModels.Transactions): fromViews.TransactionView {
            return {
                id: transaction.id,
                items: transaction.items.map(item=>mappers.orderItems.orderItemtoOrderItemView(item)),
                date: transaction.date
            }
        },
        async transactionViewToTransaction(view: fromViews.TransactionView): Promise<fromModels.Transactions> {
            let items: fromModels.OrderItems[] = [];
            for (const item of view.items) {
                let newItem = await mappers.orderItems.orderItemViewToOrderItem(item);
                items.push(newItem);
            }
            return {
                id: view.id,
                date: view.date,
                items
            }
        }
    }
}