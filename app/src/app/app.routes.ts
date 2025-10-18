import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { CatalogComponent } from './pages/catalog/catalog.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'catalog', component: CatalogComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' },
];
