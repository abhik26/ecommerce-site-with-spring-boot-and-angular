import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
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

    constructor(private formBuilder: FormBuilder, private checkoutFromService: CheckoutFormService,
            private cartService: CartService) { }

    ngOnInit(): void {
        this.cartService.totalItemInCart.subscribe(data => this.totalItemInCart = data);
        this.cartService.totalPriceOfCart.subscribe(data => this.totalPriceOfCart = data);

        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                lastName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                email: new FormControl('', [Validators.required, Validators.email])
            }),
            shippingAddress: this.formBuilder.group({
                street: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                city:new FormControl('', [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                state: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                zipCode: new FormControl('', [Validators.required, Validators.minLength(6), CheckoutComponent.notOnlyWhiteSpace])
            }),
            billingAddress: this.formBuilder.group({
                street: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                city:new FormControl('', [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                state: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                zipCode: new FormControl('', [Validators.required, Validators.minLength(6), CheckoutComponent.notOnlyWhiteSpace])
            }),
            creditCard: this.formBuilder.group({
                cardType: new FormControl('', [Validators.required]),
                nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
                securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
                expiryMonth: new FormControl('', [Validators.required]),
                expiryYear: new FormControl('', [Validators.required])
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

    get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
    get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
    get email() { return this.checkoutFormGroup.get('customer.email'); }
    
    get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
    get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
    get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
    get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
    get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

    get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
    get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
    get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
    get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
    get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

    get creditCardCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
    get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
    get creditCardCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
    get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
    get creditCardExpiryMonth() { return this.checkoutFormGroup.get('creditCard.expiryMonth'); }
    get creditCardExpiryYear() { return this.checkoutFormGroup.get('creditCard.expiryYear'); }


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
        if (this.checkoutFormGroup.invalid) {
            this.checkoutFormGroup.markAllAsTouched();
        } else {
            console.log(this.checkoutFormGroup.value);
        }
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

    static notOnlyWhiteSpace(formControl: FormControl): ValidationErrors {
        if (formControl.value && formControl.value.trim().length === 0) {
            return { 'onlyWhiteSpace': true };
        } else {
            return null;
        }
    }

}
