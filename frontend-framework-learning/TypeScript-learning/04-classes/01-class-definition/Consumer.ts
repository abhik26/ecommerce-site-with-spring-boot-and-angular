class Consumer {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

// let myConsumer = new Consumer();
// myConsumer.firstName = "Martin";
// myConsumer.lastName = "Gary";

let myConsumer = new Consumer("David", "Warner");

console.log(`Consumer name is: ${myConsumer.firstName} ${myConsumer.lastName}`)