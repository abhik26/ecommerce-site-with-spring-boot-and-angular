import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
    selector: 'app-sales-person-list',
    templateUrl: './sales-person-list.component.html',
    styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

    // sales persion list
    salesPersonList: SalesPerson[] = [
        new SalesPerson("Puja", "Kumari", "puja.kumari@example.com", 1000),
        new SalesPerson("Rahul", "Kumar", "rahul.kumar@example.com", 5000),
        new SalesPerson("Pankaj", "Kumar", "pankaj.kumar@example.com", 100),
        new SalesPerson("Shanaya", "Shinghania", "shanaya.shinghania@example.com", 10),
    ];


    constructor() { }

    ngOnInit(): void {
    }

}
