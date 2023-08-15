export class OrderHistory {
    constructor(public id: number,
            public orderTrackingNumber: string,
            public totalItem: number,
            public totalPrice: number,
            public dateCreated: Date) {

    }
}
