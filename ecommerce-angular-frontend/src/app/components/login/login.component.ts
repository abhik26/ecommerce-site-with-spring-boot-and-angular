import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import appConfig from 'src/app/config/app-config';
import OktaSignIn from '@okta/okta-signin-widget'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    oktaSignin: any;

    constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
        this.oktaSignin = new OktaSignIn({
            baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
            clientId: appConfig.oidc.clientId,
            redirectUri: appConfig.oidc.redirectUri,
            authParams: {
                pkce: true,
                issuer: appConfig.oidc.issuer,
                scopes: appConfig.oidc.scopes
            }
        });
    }

    ngOnInit(): void {
        this.oktaSignin.remove();
        this.oktaSignin.renderEl(
            {
                el: '#okta-signin-widget'
            },
            (response: any) => {
                if (response.status == 'SUCCESS') {
                    this.oktaAuth.signInWithRedirect();
                }
            },
            (error: any) => {
                throw error;
            }
        )
    }

}
