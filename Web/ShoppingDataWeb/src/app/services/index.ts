import { BrandService } from './brand/brand.service';
import { ProductService } from './product/product.service';
import { SectionService } from './section/section.service';
import { TagsService } from './tags/tags.service';
import { TypesService } from './types/types.service';
import { TransactionService } from './transaction/transaction.service';

export const services: any[] = [
    BrandService,
    ProductService,
    SectionService,
    TagsService,
    TypesService,
    TransactionService
];

export * from './brand/brand.service';
export * from './product/product.service';
export * from './section/section.service';
export * from './tags/tags.service';
export * from './types/types.service';
export * from './transaction/transaction.service';