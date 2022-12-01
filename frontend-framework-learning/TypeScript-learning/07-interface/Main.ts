import { Coach } from "./Coach";
import { CricketCoach } from "./CricketCoach";
import { GOlfCoach } from "./GolfCoach";

let cricketCoach = new CricketCoach();
let golfCoach = new GOlfCoach();
let coaches: Coach[] = [];

coaches.push(cricketCoach);
coaches.push(golfCoach);

for (let c of coaches) {
    console.log(c.getDailyWorkout());
}