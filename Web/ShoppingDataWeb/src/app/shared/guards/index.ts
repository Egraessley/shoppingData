import { LoggedInGuard } from './logged-in/logged-in.guard';
import { AdminGuard } from './admin/admin.guard';
import { SuperGuard } from './super/super.guard';



export const guards = [
    LoggedInGuard,
    AdminGuard,
    SuperGuard
]



export * from './logged-in/logged-in.guard';
export * from './admin/admin.guard';
export * from './super/super.guard';