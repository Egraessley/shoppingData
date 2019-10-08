import { BrandService } from './brand/brand.service';
import { ProductService } from './product/product.service';
import { SectionService } from './section/section.service';
import { TagsService } from './tags/tags.service';
import { TypesService } from './types/types.service';
import { TransactionService } from './transaction/transaction.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthenticationService } from './authentication/authentication.service';
import { StoresService } from './stores/stores.service';
import { AccountsService } from './account/accounts.service';

export const services: any[] = [
    BrandService,
    ProductService,
    SectionService,
    TagsService,
    TypesService,
    TransactionService,
    LocalStorageService,
    AuthenticationService,
    StoresService,
    AccountsService
];

export * from './brand/brand.service';
export * from './product/product.service';
export * from './section/section.service';
export * from './tags/tags.service';
export * from './types/types.service';
export * from './transaction/transaction.service';
export * from './authentication/authentication.service';
export * from './local-storage/local-storage.service';
export * from './stores/stores.service';
export * from './account/accounts.service';