import { BrandGuard } from './brand/brand.guard';
import { ProductGuard } from './product/product.guard';
import { SectionGuard } from './section/section.guard';
import { TagGuard } from './tag/tag.guard';
import { TypeGuard } from './type/type.guard';
import { StoreGuard } from './store/store.guard';

export const maintenanceGuards: any[] = [
    BrandGuard,
    ProductGuard,
    SectionGuard,
    TagGuard,
    TypeGuard,
    StoreGuard
];

export * from './brand/brand.guard';
export * from './product/product.guard';
export * from './section/section.guard';
export * from './tag/tag.guard';
export * from './type/type.guard';
export * from './store/store.guard';
export * from './users/user.guard';