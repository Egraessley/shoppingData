import * as fromModels from '../shared/models';
import * as faker from 'faker';
import * as moment from 'moment';
import * as _ from 'lodash';



export const testHelpers = {
    createIdNamePairModel(): fromModels.IdNamePairModel {
        return {
            id: faker.random.number({ min: 1 }),
            name: faker.random.words(faker.random.number({ min: 1, max: 4 }))
        };
    },
    createIdNamePairModels(length: number): fromModels.IdNamePairModel[] {
        return _.range(length).map(x => this.createIdNamePairModel());
    },

    createBrandModel(): fromModels.BrandModel {
        let baseModel: fromModels.IdNamePairModel = this.createIdNamePairModel();
        return {
            ...baseModel,
            ...{

            }
        };
    },
    createBrandModels(length: number): fromModels.BrandModel[] {
        return _.range(length).map(x => this.createBrandModel());
    },

    createSectionModel(): fromModels.SectionModel {
        let baseModel: fromModels.IdNamePairModel = this.createIdNamePairModel();
        return {
            ...baseModel,
            ...{

            }
        };
    },
    createSectionModels(length: number): fromModels.SectionModel[] {
        return _.range(length).map(x => this.createSectionModel());
    },

    createTagModel(): fromModels.TagModel {
        let baseModel: fromModels.IdNamePairModel = this.createIdNamePairModel();
        return {
            ...baseModel,
            ...{

            }
        };
    },
    createTagModels(length: number): fromModels.TagModel[] {
        return _.range(length).map(x => this.createTagModel());
    },
    
    createTypeModel(): fromModels.TypeModel {
        let baseModel: fromModels.IdNamePairModel = this.createIdNamePairModel();
        return {
            ...baseModel,
            ...{

            }
        };
    },
    createTypeModels(length: number): fromModels.TypeModel[] {
        return _.range(length).map(x => this.createTypeModel());
    },

    createProductListModel(): fromModels.ProductListModel {
        let baseModel: fromModels.IdNamePairModel = this.createIdNamePairModel();
        return {
            ...baseModel,
            ...{
                brand: faker.random.word(),
                brandId: faker.random.number({min:1}),
                type: faker.random.word(),
                typeId: faker.random.number({min:1}),
                section: faker.random.word(),
                sectionId: faker.random.number({min:1}),                
            }
        };
    },
    createProductListModels(length: number): fromModels.ProductListModel[] {
        return _.range(length).map(x => this.createProductListModel());
    },

    createProductCreateModel(): fromModels.ProductCreateModel {
        let baseModel: fromModels.IdNamePairModel = this.createIdNamePairModel();
        return {
            ...baseModel,
            ...{
                brand: faker.random.word(),
                brandId: faker.random.number({min:1}),
                type: faker.random.word(),
                typeId: faker.random.number({min:1}),
                section: faker.random.word(),
                sectionId: faker.random.number({min:1}),                
            }
        };
    },
    createProductCreateModels(length: number): fromModels.ProductCreateModel[] {
        return _.range(length).map(x => this.createProductCreateModel());
    },

    createProductUpdateModel(): fromModels.ProductUpdateModel {
        let baseModel: fromModels.IdNamePairModel = this.createIdNamePairModel();
        return {
            ...baseModel,
            ...{
                brand: faker.random.word(),
                brandId: faker.random.number({min:1}),
                type: faker.random.word(),
                typeId: faker.random.number({min:1}),
                section: faker.random.word(),
                sectionId: faker.random.number({min:1}),                
            }
        };
    },
    createProductUpdateModels(length: number): fromModels.ProductUpdateModel[] {
        return _.range(length).map(x => this.createProductUpdateModel());
    }
}