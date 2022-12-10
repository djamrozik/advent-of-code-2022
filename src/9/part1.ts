import * as fs from 'fs';
import path from 'path';

const joinedPath = path.join(__dirname, './../data/input_9.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');

type Direction = 'U' | 'D' | 'L' | 'R';

const run = () => {
  let [hX, hY, tX, tY] = [1, 1, 1, 1];
  const tailSpots: { [key: number]: { [key: number]: boolean } } = {};

  const markTailSpot = (x: number, y: number) => {
    if (!tailSpots[x]) {
      tailSpots[x] = {};
    }
    tailSpots[x][y] = true;
  };

  const countTailSpots = () => {
    let total = 0;
    for (const x in tailSpots) {
      for (const y in tailSpots[x]) {
        total++;
      }
    }
    return total;
  };

  for (const line of inputTextLines) {
    const lineTokens = line.split(' ');
    const direction = lineTokens[0] as Direction;
    const amount = Number(lineTokens[1]);

    let rem = amount;
    while (rem > 0) {
      if (direction === 'R') {
        hX++;
      }
      if (direction === 'L') {
        hX--;
      }
      if (direction === 'U') {
        hY++;
      }
      if (direction === 'D') {
        hY--;
      }

      // 2 spots off, same col or row
      if (hX === tX && hY - tY === 2) {
        tY++;
      }
      if (hX === tX && tY - hY === 2) {
        tY--;
      }
      if (hY === tY && hX - tX === 2) {
        tX++;
      }
      if (hY === tY && tX - hX === 2) {
        tX--;
      }

      if (Math.abs(hX - tX) === 1 && hY - tY === 2) {
        tX = hX;
        tY++;
      }
      if (Math.abs(hX - tX) === 1 && tY - hY === 2) {
        tX = hX;
        tY--;
      }
      if (Math.abs(hY - tY) === 1 && hX - tX === 2) {
        tY = hY;
        tX++;
      }
      if (Math.abs(hY - tY) === 1 && tX - hX === 2) {
        tY = hY;
        tX--;
      }

      markTailSpot(tX, tY);
      rem--;
    }
  }

  console.log('Total tail visited spots', countTailSpots());
};

run();
