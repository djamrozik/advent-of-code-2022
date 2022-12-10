import * as fs from 'fs';
import path from 'path';

const joinedPath = path.join(__dirname, './../data/input_10.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');

const ADDX_CYCLE_LENGTH = 2;

const run = () => {
  let currentCycle = 1,
    x = 1;
  const strengthList = [];
  const crtScreen: string[][] = [];

  const drawPixel = () => {
    const newCrtRow = (currentCycle - 1) % 40 === 0;
    if (newCrtRow) {
      crtScreen.push([]);
    }

    const curDrawingPos = (currentCycle - 1) % 40;
    if (Math.abs(x - curDrawingPos) <= 1) {
      crtScreen[crtScreen.length - 1].push('#');
    } else {
      crtScreen[crtScreen.length - 1].push('.');
    }
  };

  for (const line of inputTextLines) {
    const lineTokens = line.split(' ');

    if (lineTokens[0] === 'noop') {
      strengthList.push(x);
      drawPixel();
      currentCycle++;
      continue;
    }

    let cycleRem = ADDX_CYCLE_LENGTH;
    while (cycleRem > 0) {
      strengthList.push(x);
      drawPixel();
      currentCycle++;
      cycleRem--;
    }

    x += Number(lineTokens[1]);
  }

  let customTotal = 0;
  for (let i = 20; i < strengthList.length + 1; i += 40) {
    customTotal += strengthList[i - 1] * i;
  }

  console.log('Stength list at custom amount', customTotal);

  for (const line of crtScreen) {
    console.log(line.join(''));
  }
};

run();
