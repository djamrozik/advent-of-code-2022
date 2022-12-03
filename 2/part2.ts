import * as fs from 'fs';

const inputText = fs.readFileSync('./data/input.txt','utf8');
const inputTextLines = inputText.split("\n");

enum Shape {
    ROCK = "rock",
    PAPER = "paper",
    SCISSORS = "scissors"
}

enum Result {
    WIN = "win",
    DRAW = "draw",
    LOSE = "lose",
}

const letterToShape = {
    'A': Shape.ROCK,
    'B': Shape.PAPER,
    'C': Shape.SCISSORS,
};

const letterToResult = {
    'X': Result.LOSE,
    'Y': Result.DRAW,
    'Z': Result.WIN
}

const shapeToValue = {
    [Shape.ROCK]: 1,
    [Shape.PAPER]: 2,
    [Shape.SCISSORS]: 3,
}

const resultToValue = {
    [Result.WIN]: 6,
    [Result.DRAW]: 3,
    [Result.LOSE]: 0
}

// first key is the result needed
// second key is their shape
// result is the shape you need for that result
const resultToShapeNeeded = {
    [Result.WIN]: {
        [Shape.ROCK]: Shape.PAPER,
        [Shape.PAPER]: Shape.SCISSORS,
        [Shape.SCISSORS]: Shape.ROCK,
    },
    [Result.DRAW]: {
        [Shape.ROCK]: Shape.ROCK,
        [Shape.PAPER]: Shape.PAPER,
        [Shape.SCISSORS]: Shape.SCISSORS,
    },
    [Result.LOSE]: {
        [Shape.ROCK]: Shape.SCISSORS,
        [Shape.PAPER]: Shape.ROCK,
        [Shape.SCISSORS]: Shape.PAPER,
    },
}

const getRoundScore = (theirShapeLetter: 'A' | 'B' | 'C', resultNeededLetter: 'X' | 'Y' | 'Z'): number => {
    const theirShape = letterToShape[theirShapeLetter];
    const resultNeeded = letterToResult[resultNeededLetter];
    const yourShapeNeeded = resultToShapeNeeded[resultNeeded][theirShape];

    return resultToValue[resultNeeded] + shapeToValue[yourShapeNeeded];
}

const run = () => {
    let total = 0;
    for (const line of inputTextLines) {
        const chars = line.split(' ');
        total += getRoundScore(chars[0] as 'A' | 'B' | 'C',  chars[1] as 'X' | 'Y' | 'Z');
    }
    console.log(total);
}

run();
