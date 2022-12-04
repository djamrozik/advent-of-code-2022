import * as fs from 'fs';
const path = require('path');

const joinedPath = path.join(__dirname, './../data/input_2.txt');
const inputText = fs.readFileSync(joinedPath,'utf8');
const inputTextLines = inputText.split("\n");

enum Shape {
    ROCK = "rock",
    PAPER = "paper",
    SCISSORS = "scissors"
}

const letterToShape = {
    'A': Shape.ROCK,
    'B': Shape.PAPER,
    'C': Shape.SCISSORS,
    'X': Shape.ROCK,
    'Y': Shape.PAPER,
    'Z': Shape.SCISSORS
};

const shapeToValue = {
    [Shape.ROCK]: 1,
    [Shape.PAPER]: 2,
    [Shape.SCISSORS]: 3,
}


// first key is your shape
// second key is their shape
// result is if you won the round
const winMatrix = {
    [Shape.ROCK]: {
        [Shape.ROCK]: false,
        [Shape.PAPER]: false,
        [Shape.SCISSORS]: true,
    },
    [Shape.PAPER]: {
        [Shape.ROCK]: true,
        [Shape.PAPER]: false,
        [Shape.SCISSORS]: false,
    },
    [Shape.SCISSORS]: {
        [Shape.ROCK]: false,
        [Shape.PAPER]: true,
        [Shape.SCISSORS]: false,
    },
}

const getRoundScore = (yours: 'X' | 'Y' | 'Z', theirs: 'A' | 'B' | 'C'): number => {
    const yourShape = letterToShape[yours];
    const theirShape = letterToShape[theirs];

    let victoryPoints = 0;
    if (yourShape === theirShape) {
        victoryPoints = 3;
    } else if (winMatrix[yourShape][theirShape]) {
        victoryPoints = 6;
    }

    return victoryPoints + shapeToValue[yourShape];
}

const run = () => {
    let total = 0;
    for (const line of inputTextLines) {
        const chars = line.split(' ');
        total += getRoundScore(chars[1] as 'X' | 'Y' | 'Z', chars[0] as 'A' | 'B' | 'C');
    }
    console.log(total);
}

run();