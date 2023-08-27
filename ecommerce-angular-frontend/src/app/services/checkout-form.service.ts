import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { Purchase } from '../common/purchase';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CheckoutFormService {

    private readonly countriesUrl: string = `${environment.apiUrl}/countries`;
    private readonly statesUrl: string = `${environment.apiUrl}/states`;
    private readonly purchaseUrl: string = `${environment.apiUrl}/checkout/purchase`;

    constructor(private httpClient: HttpClient) { }

    getCountries(): Observable<Country[]> {
        return this.httpClient.get<ResponseCountries>(this.countriesUrl).pipe(
            map(response => response._embedded.countries)
        );
    }

    getStates(countryCode: string): Observable<State[]> {
        const statesByCountryCodeUrl = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;

        return this.httpClient.get<ResponseStates>(statesByCountryCodeUrl).pipe(
            map(response => response._embedded.states)
        );
    }

    getCreditCardMonths(currentMonth: number): Observable<number[]> {
        let months: number[] = [];

        for (let i = currentMonth; i <= 12; i++) {
            months.push(i);
        }

        return of(months);
    }

    getCreditCardYears(): Observable<number[]> {
        let years: number[] = [];
        let currentYear: number = new Date().getFullYear();

        for (let i = currentYear; i <= (currentYear + 10); i++) {
            years.push(i);
        }

        return of(years);
    }

    placeOrder(purchase: Purchase): Observable<any> {
        return this.httpClient.post(this.purchaseUrl, purchase);
    }
}

interface ResponseCountries {
    _embedded: {
        countries: Country[];
    }
}

interface ResponseStates {
    _embedded: {
        states: State[];
    }
}