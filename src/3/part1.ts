import * as fs from 'fs';
const path = require('path');

const joinedPath = path.join(__dirname, './../data/input_3.txt');
const inputText = fs.readFileSync(joinedPath,'utf8');
const inputTextLines = inputText.split("\n");

const lowerCaseValueStart = 97;
const upperCaseValueStart = 65;

const isCapitalLetter = (letter: string): boolean => {
    return letter.toUpperCase() === letter;
}

// given two words, find the letter that appears in both words
// we can assume only one letter is repeated
const findRepeatedLetter = (word1: string, word2: string): string => {
    const word1Map: {[key: string]: boolean} = {};
    for (const letter of word1) {
        word1Map[letter] = true;
    }
    for (const letter of word2) {
        if (word1Map[letter]) {
            return letter;
        }
    }
    return '';
}

const getLetterValue = (letter: string) => {
    if (isCapitalLetter(letter)) {
        return letter.charCodeAt(0) - upperCaseValueStart + 27;
    }
    return letter.charCodeAt(0) - lowerCaseValueStart + 1;
}

const run = () => {
    let total = 0;
    for (const line of inputTextLines) {
        const secondHalfStart = line.length / 2;
        const repeatedLetter = findRepeatedLetter(line.slice(0, secondHalfStart), line.slice(secondHalfStart));
        total += getLetterValue(repeatedLetter);
    }
    console.log(total);
}

run();
