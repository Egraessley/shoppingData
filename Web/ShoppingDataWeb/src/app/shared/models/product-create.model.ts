import { IdNamePairModel } from './id-name-pair.model';

export interface ProductCreateModel extends IdNamePairModel {
    brandId: number;
    typeId: number;
    sectionId: number;
}