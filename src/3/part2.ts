import * as fs from 'fs';
const path = require('path');

const joinedPath = path.join(__dirname, './../data/input_3.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');

const lowerCaseValueStart = 97;
const upperCaseValueStart = 65;

const isCapitalLetter = (letter: string): boolean => {
  return letter.toUpperCase() === letter;
};

// given a list of words, find the letter that exists once in each word
const findSharedLetter = (words: string[]): string => {
  const expectedValue = Array.from(Array(words.length), (_, x) => x).join('');
  const letterMap: { [key: string]: string } = {};

  for (let i = 0; i < words.length; i++) {
    for (const letter of words[i]) {
      if (!letterMap[letter]) {
        letterMap[letter] = String(i);
      } else {
        const lastChar = letterMap[letter][letterMap[letter].length - 1];
        if (lastChar === String(i)) {
          continue;
        }
        letterMap[letter] += String(i);
      }
    }
  }

  for (const letter in letterMap) {
    if (letterMap[letter] === expectedValue) {
      return letter;
    }
  }

  return '';
};

const getLetterValue = (letter: string) => {
  if (isCapitalLetter(letter)) {
    return letter.charCodeAt(0) - upperCaseValueStart + 27;
  }
  return letter.charCodeAt(0) - lowerCaseValueStart + 1;
};

const run = () => {
  let total = 0;
  let nextUp = [];

  for (const line of inputTextLines) {
    nextUp.push(line);
    if (nextUp.length === 3) {
      const sharedLetter = findSharedLetter(nextUp);
      total += getLetterValue(sharedLetter);
      nextUp = [];
    }
  }

  console.log(total);
};

run();
