import { Shape } from "./Shape";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

let shape = new Shape(10, 20);
let circle = new Circle(15, 25, 5);
let rectangle = new Rectangle(0, 0, 7, 14);
let shapes: Shape[] = [];

shapes.push(shape);
shapes.push(circle);
shapes.push(rectangle);

// console.log(shape.getInfo());
// console.log(circle.getInfo());
// console.log(rectangle.getInfo());

for (let s of shapes) {
    console.log(s.getInfo());
}

