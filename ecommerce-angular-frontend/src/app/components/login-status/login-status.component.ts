import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
    selector: 'app-login-status',
    templateUrl: './login-status.component.html',
    styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

    isAuthenticated: boolean = false;
    userFullName: string = '';

    private readonly webStorage: Storage = sessionStorage;
    private userEmail: string;
    private readonly userEmailStorageKey: string = 'userEmail';
    private readonly userFullNameStorageKey: string = 'userFullName';

    constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

    ngOnInit(): void {
        this.oktaAuthService.authState$.subscribe(
            (result) => {
                this.isAuthenticated = result.isAuthenticated;
                this.getUserDetails();
            }
        )
    }

    getUserDetails() {
        if (this.isAuthenticated) {
            this.oktaAuth.getUser().then(
                (result) => {
                    this.userFullName = result.name as string;
                    this.userEmail = result.email;
                    this.webStorage.setItem(this.userFullNameStorageKey, JSON.stringify(this.userFullName));
                    this.webStorage.setItem(this.userEmailStorageKey, JSON.stringify(this.userEmail));
                }
            )
        }
    }

    logout() {
        this.oktaAuth.signOut();
    }

}
