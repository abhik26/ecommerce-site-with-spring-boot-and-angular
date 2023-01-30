import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    doSearch(searchKeyword: string) {
        console.log(`search keyword: ${searchKeyword}`);
        this.router.navigateByUrl(`/search/${searchKeyword}`);
    }
}
