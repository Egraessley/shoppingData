import { IdNamePairModel } from './id-name-pair.model';

export interface ProductUpdateModel extends IdNamePairModel {
    brandId: number;
    typeId: number;
    sectionId: number;
}