import * as fs from 'fs';
const path = require('path');

const joinedPath = path.join(__dirname, './../data/input_1.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');

let richestElf = -1;
let richestElfTotal = 0;

let currentElf = 0;
let currentElfTotal = 0;

const elfAmounts = [];

for (const line of inputTextLines) {
  if (!line) {
    if (currentElfTotal > richestElfTotal) {
      richestElf = currentElf;
      richestElfTotal = currentElfTotal;
    }
    elfAmounts.push(currentElfTotal);
    currentElf++;
    currentElfTotal = 0;
    continue;
  }
  currentElfTotal += Number(line);
}

// end of list logic
if (currentElfTotal > richestElfTotal) {
  richestElf = currentElf;
  richestElfTotal = currentElfTotal;
}
elfAmounts.push(currentElfTotal);

//
// part 1, richest elf total
//

console.log('Richest elf total', richestElfTotal);

//
// part 2, get top 3 and sum
//

const topThreeAmounts = elfAmounts
  .sort((a, b) => {
    return b - a;
  })
  .slice(0, 3);

const sum = (x: number[]) => {
  return x.reduce((sum, cur) => sum + cur);
};
console.log('Sum of top three richest elves', sum(topThreeAmounts));
