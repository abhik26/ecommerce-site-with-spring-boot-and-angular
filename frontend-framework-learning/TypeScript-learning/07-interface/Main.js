"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CricketCoach_1 = require("./CricketCoach");
const GolfCoach_1 = require("./GolfCoach");
let cricketCoach = new CricketCoach_1.CricketCoach();
let golfCoach = new GolfCoach_1.GOlfCoach();
let coaches = [];
coaches.push(cricketCoach);
coaches.push(golfCoach);
for (let c of coaches) {
    console.log(c.getDailyWorkout());
}
