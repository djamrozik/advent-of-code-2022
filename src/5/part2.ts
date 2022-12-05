import * as fs from 'fs';
const path = require('path');

const joinedPath = path.join(__dirname, './../data/input_5.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');

const separateInput = () => {
  const stackData = [];
  const moveData = [...inputTextLines];
  while (moveData.length) {
    stackData.push(moveData.shift());
    if (moveData[0] === '') {
      moveData.shift();
      break;
    }
  }
  return [stackData, moveData];
};

const getStackStructure = (stackData: string[]) => {
  const res: { [key: string]: string[] } = {};
  const colNums = stackData[stackData.length - 1].split(/[ ,]+/).filter((x) => Boolean(x));

  for (const colNum of colNums) {
    res[colNum] = [];
    const indexOfCol = stackData[stackData.length - 1].indexOf(colNum);
    for (let i = stackData.length - 2; i >= 0; i--) {
      if (stackData[i][indexOfCol] && stackData[i][indexOfCol] !== ' ') {
        res[colNum].push(stackData[i][indexOfCol]);
      }
    }
  }

  return res;
};

const run = () => {
  const [stackData, moveData] = separateInput() as [string[], string[]];
  const stackStructure = getStackStructure(stackData);

  for (const moveLine of moveData) {
    const lineWords = moveLine.split(' ');
    let moveAmount = Number(lineWords[1]);
    let moveSource = lineWords[3];
    let moveTgt = lineWords[5];

    const startIdx = stackStructure[moveSource].length - moveAmount;
    const cratesToMove = stackStructure[moveSource].splice(startIdx);
    stackStructure[moveTgt].push(...cratesToMove);
  }

  const topCrates = [];
  for (const stack in stackStructure) {
    const lastItem = stackStructure[stack][stackStructure[stack].length - 1];
    topCrates.push(lastItem);
  }

  console.log('Top Crate Letters', topCrates.join(''));
};

run();
