import { IdNamePairModel } from './id-name-pair.model';

export interface ProductListModel extends IdNamePairModel {
    brand: string;
    type: string;
    section: string;
    brandId: number;
    typeId: number;
    sectionId: number;
}