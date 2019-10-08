import { BrandEffects } from './brand.effects';
import { ProductEffects } from './product.effects';
import { SectionEffects } from './section.effects';
import { TagEffects } from './tags.effects';
import { TypeEffects } from './type.effects';
import { StoreEffects } from './store.effects';
import { UserEffects } from './user.effects';

export const effects: any[] = [
    BrandEffects,
    ProductEffects,
    SectionEffects,
    TagEffects,
    TypeEffects,
    StoreEffects,
    UserEffects
];

export * from './brand.effects';
export * from './product.effects';
export * from './section.effects';
export * from './tags.effects';
export * from './type.effects';
export * from './store.effects';
export * from './user.effects';