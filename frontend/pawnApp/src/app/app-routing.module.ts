import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: 'app-home', component: HomeComponent },
    { path: 'order-management', loadChildren: '../app/order-management/orderManagement.module#OrderManagementModule' },
    { path: '', redirectTo: '/app-home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
