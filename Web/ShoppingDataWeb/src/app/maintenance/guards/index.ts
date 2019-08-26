import { BrandGuard } from './brand/brand.guard';
import { ProductGuard } from './product/product.guard';
import { SectionGuard } from './section/section.guard';
import { TagGuard } from './tag/tag.guard';
import { TypeGuard } from './type/type.guard';

export const maintenanceGuards: any[] = [
    BrandGuard,
    ProductGuard,
    SectionGuard,
    TagGuard,
    TypeGuard
];

export * from './brand/brand.guard';
export * from './product/product.guard';
export * from './section/section.guard';
export * from './tag/tag.guard';
export * from './type/type.guard';