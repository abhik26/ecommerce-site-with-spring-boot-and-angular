import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
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

    webStorage: Storage = sessionStorage;
    private readonly userFullNameStorageKey = 'userFullName';
    private readonly userEmailStorageKey = 'userEmail';


    constructor(private formBuilder: FormBuilder, private checkoutFromService: CheckoutFormService,
            private cartService: CartService, private router: Router) { }

    ngOnInit(): void {
        this.cartService.totalItemInCart.subscribe(data => this.totalItemInCart = data);
        this.cartService.totalPriceOfCart.subscribe(data => this.totalPriceOfCart = data);

        let userFirstName = '';
        let userLastName = '';
        let userEmail = '';

        let tempUserFullName = JSON.parse(this.webStorage.getItem(this.userFullNameStorageKey));
        let tempUserEmail = JSON.parse(this.webStorage.getItem(this.userEmailStorageKey));

        if (tempUserFullName) {
            let userNames: string[] = tempUserFullName.split(' ', 2);
            userFirstName = userNames[0];
            userLastName = userNames[1];
        }

        if (tempUserEmail) {
            userEmail = tempUserEmail;
        }

        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: new FormControl(userFirstName, [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                lastName: new FormControl(userLastName, [Validators.required, Validators.minLength(2), CheckoutComponent.notOnlyWhiteSpace]),
                email: new FormControl(userEmail, [Validators.required, Validators.email])
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
        if (!this.totalItemInCart || this.totalItemInCart < 0) {
            alert(`No item in cart`);
            this.router.navigateByUrl('/products');
        }

        if (this.checkoutFormGroup.invalid) {
            this.checkoutFormGroup.markAllAsTouched();
            return;
        } else {
            console.log(this.checkoutFormGroup.value);
        }

        const cartItems = this.cartService.cartItems;
        let order = new Order();
        order.totalItem = this.totalItemInCart;
        order.totalPrice = this.totalPriceOfCart;

        let orderItems: OrderItem[] = cartItems.map(item => new OrderItem(item));
        
        let purchase: Purchase = new Purchase();
        purchase.customer = this.checkoutFormGroup.get('customer').value;

        purchase.shippingAddress = this.checkoutFormGroup.get('shippingAddress').value;
        purchase.shippingAddress.country = JSON.parse(JSON.stringify(purchase.shippingAddress.country)).name;
        purchase.shippingAddress.state = JSON.parse(JSON.stringify(purchase.shippingAddress.state)).name;

        purchase.billingAddress = this.checkoutFormGroup.get('billingAddress').value;
        purchase.billingAddress.country = JSON.parse(JSON.stringify(purchase.billingAddress.country)).name;
        purchase.billingAddress.state = JSON.parse(JSON.stringify(purchase.billingAddress.state)).name;

        purchase.order = order;
        purchase.orderItems = orderItems;

        console.log(purchase);
        // return;

        this.checkoutFromService.placeOrder(purchase).subscribe({
            next: response => {
                alert(`You order has been received with the tracking number: ${response.orderTrackingNumber}`);
                this.resetCart();
            },
            error: response => {
                alert(`An error occurred: ${response.message}`);
            }
        })
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

    resetCart() {
        this.cartService.resetCart();
        this.checkoutFormGroup.reset();

        this.router.navigateByUrl('/products');
    }

}
