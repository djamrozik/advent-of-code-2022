import * as fs from 'fs';
const path = require('path');

const joinedPath = path.join(__dirname, './../data/input_6.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');
const inputStream = inputTextLines[0];

// change window length to 4 for part 1
// change window length to 14 for part 2
const WINDOW_LENGTH = 14;

const run = () => {
  const window: { [key: string]: number } = {};

  for (let i = 0; i < inputStream.length; i++) {
    if (i > WINDOW_LENGTH - 1) {
      const charToRemove = inputStream[i - WINDOW_LENGTH];
      if (window[charToRemove] === 1) {
        delete window[charToRemove];
      } else {
        window[charToRemove]--;
      }
    }

    window[inputStream[i]] = window[inputStream[i]] ? ++window[inputStream[i]] : 1;

    if (Object.keys(window).length === WINDOW_LENGTH) {
      console.log('Starting number place', i + 1);
      return;
    }
  }

  console.log('Starting numner place', -1);
};

run();
