import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CheckoutFormService } from 'src/app/services/checkout-form.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    checkoutFormGroup: FormGroup;
    totalItemInCart: number = 0;
    totalPriceOfCart: number = 0.0;

    creditCardMonths: number[] = [];
    creditCardYears: number[] = [];

    countries: Country[] = [];
    shippingAddressStates: State[] = [];
    billingAddressStates: State[] = [];

    constructor(private formBuilder: FormBuilder, private checkoutFromService: CheckoutFormService) { }

    ngOnInit(): void {
        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: [''],
                lastName: [''],
                email: ['']
            }),
            shippingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                state: [null],
                country: [null],
                zipCode: ['']
            }),
            billingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                state: [null],
                country: [null],
                zipCode: ['']
            }),
            creditCard: this.formBuilder.group({
                cartType: [''],
                nameOnCard: [''],
                cardNumber: [''],
                securityCode: [''],
                expiryMonth: [''],
                expiryYear: ['']
            })
        });

        
        this.checkoutFromService.getCreditCardMonths(new Date().getMonth() + 1).subscribe(
            data => this.creditCardMonths = data
        );
        this.checkoutFromService.getCreditCardYears().subscribe(data => this.creditCardYears = data);
        // console.log("credit card months: ", this.creditCardMonths);
        // console.log("credit card years: ", this.creditCardYears);

        this.checkoutFromService.getCountries().subscribe(
            data => this.countries = data
        );
    }

    checkBillingAddressWithShippingAddress(event: any) {
        if (event.target.checked) {
            this.checkoutFormGroup.get('billingAddress').setValue(
                this.checkoutFormGroup.get('shippingAddress').value);

                // bug fix for billing address states when checking same address checkbox.
                this.billingAddressStates = this.shippingAddressStates;
        } else {
            this.checkoutFormGroup.get('billingAddress').reset();

            // bug fix for billing address states when checking same address checkbox (Reset the array).
            this.billingAddressStates = [];
        }
    }

    purchaseProducts() {
        console.log(this.checkoutFormGroup.value);
    }

    handleCreditCardExpiryYearChange() {
        let selectedYear: number = Number(this.checkoutFormGroup.get('creditCard').value.expiryYear);
        let startMonth: number = 1;
        
        if (new Date().getFullYear() === selectedYear) {
            startMonth = new Date().getMonth() + 1;
        }

        this.checkoutFromService.getCreditCardMonths(startMonth).subscribe(data => this.creditCardMonths = data);
        this.checkoutFormGroup.get('creditCard.expiryMonth').setValue(null);
    }

    getStates(formGroupName: string) {
        const formGroup = this.checkoutFormGroup.get(formGroupName);

        const countryCode = formGroup.value.country.code;

        this.checkoutFromService.getStates(countryCode).subscribe(
            data => {
                if (formGroupName === 'shippingAddress') {
                    this.shippingAddressStates = data;
                } else {
                    this.billingAddressStates = data;
                }
            }
        );
    }

}
