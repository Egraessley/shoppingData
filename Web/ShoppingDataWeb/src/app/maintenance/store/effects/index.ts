import { BrandEffects } from './brand.effects';
import { ProductEffects } from './product.effects';
import { SectionEffects } from './section.effects';
import { TagEffects } from './tags.effects';
import { TypeEffects } from './type.effects';

export const effects: any[] = [
    BrandEffects,
    ProductEffects,
    SectionEffects,
    TagEffects,
    TypeEffects
];

export * from './brand.effects';
export * from './product.effects';
export * from './section.effects';
export * from './tags.effects';
export * from './type.effects';