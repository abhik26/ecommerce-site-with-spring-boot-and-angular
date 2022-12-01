import { Shape } from "./Shape";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

let circle = new Circle(15, 25, 5);
let rectangle = new Rectangle(0, 0, 7, 14);
let shapes: Shape[] = [];

shapes.push(circle);
shapes.push(rectangle);

for (let s of shapes) {
    console.log(s.getInfo());
    console.log(s.calculateArea());
    console.log();
}

