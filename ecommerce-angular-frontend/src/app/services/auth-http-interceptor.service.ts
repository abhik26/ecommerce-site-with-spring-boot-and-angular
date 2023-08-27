import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Observable, from, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {

    constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(request, next));
    }
    
    private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

        const ENDPOINT = environment.apiUrl + '/orders';
        const SECURED_ENDPOINTS = [ENDPOINT];

        if (SECURED_ENDPOINTS.some(url => request.urlWithParams.includes(url))) {
            // get access token from okta auth
            const ACCESS_TOKEN = this.oktaAuth.getAccessToken();
            
            // clone the request to set headers with authorization token
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }
            });
        }

        return await lastValueFrom(next.handle(request));
    }
}
