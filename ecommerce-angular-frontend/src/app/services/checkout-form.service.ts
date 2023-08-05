import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
    providedIn: 'root'
})
export class CheckoutFormService {

    private readonly countriesUrl: string = 'http://localhost:8080/api/countries';
    private readonly statesUrl: string = 'http://localhost:8080/api/states';

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