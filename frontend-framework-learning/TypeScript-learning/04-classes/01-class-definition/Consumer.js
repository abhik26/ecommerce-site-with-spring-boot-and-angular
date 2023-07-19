var Consumer = /** @class */ (function () {
    function Consumer(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Consumer;
}());
// let myConsumer = new Consumer();
// myConsumer.firstName = "Martin";
// myConsumer.lastName = "Gary";
var myConsumer = new Consumer("David", "Warner");
console.log("Consumer name is: ".concat(myConsumer.firstName, " ").concat(myConsumer.lastName));
