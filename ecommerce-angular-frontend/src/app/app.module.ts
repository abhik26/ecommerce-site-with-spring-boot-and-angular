import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AppComponent } from './app.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchComponent } from './components/search/search.component';
import appConfig from './config/app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthHttpInterceptorService } from './services/auth-http-interceptor.service';

const oktaConfig = appConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
    // Use injector to access any service available within the application
    const router = injector.get(Router);
    router.navigate(['/login']);
}

const routes: Routes = [
    { path: 'login/callback', component: OktaCallbackComponent },
    { path: 'login', component: LoginComponent },

    {
        path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard],
        data: { onAuthRequired: sendToLoginPage }
    },

    {
        path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard],
        data: { onAuthRequired: sendToLoginPage }
    },

    { path: 'category/:id', component: ProductListComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    { path: 'cart-details', component: CartDetailsComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductCategoryMenuComponent,
        SearchComponent,
        ProductDetailsComponent,
        CartStatusComponent,
        CartDetailsComponent,
        CheckoutComponent,
        LoginComponent,
        LoginStatusComponent,
        MembersPageComponent,
        OrderHistoryComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        OktaAuthModule
    ],
    providers: [
        { provide: OKTA_CONFIG, useValue: { oktaAuth } },
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
