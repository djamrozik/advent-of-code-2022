import * as fs from 'fs';
import path from 'path';

const joinedPath = path.join(__dirname, './../data/input_9.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');

type Direction = 'U' | 'D' | 'L' | 'R';

const NUM_KNOTS = 10;

const run = () => {
  let knots = [...new Array(NUM_KNOTS)].map(() => [1, 1]);
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
        knots[0][0]++;
      }
      if (direction === 'L') {
        knots[0][0]--;
      }
      if (direction === 'U') {
        knots[0][1]++;
      }
      if (direction === 'D') {
        knots[0][1]--;
      }

      for (let i = 1; i < NUM_KNOTS; i++) {
        const prevKnot = knots[i - 1];
        const curKnot = knots[i];

        // 2 spots off, same col or row
        if (prevKnot[0] === curKnot[0] && prevKnot[1] - curKnot[1] === 2) {
          knots[i][1]++;
        }
        if (prevKnot[0] === curKnot[0] && curKnot[1] - prevKnot[1] === 2) {
          knots[i][1]--;
        }
        if (prevKnot[1] === curKnot[1] && prevKnot[0] - curKnot[0] === 2) {
          knots[i][0]++;
        }
        if (prevKnot[1] === curKnot[1] && curKnot[0] - prevKnot[0] === 2) {
          knots[i][0]--;
        }

        if (Math.abs(prevKnot[0] - curKnot[0]) === 1 && prevKnot[1] - curKnot[1] === 2) {
          knots[i][0] = prevKnot[0];
          knots[i][1]++;
        }
        if (Math.abs(prevKnot[0] - curKnot[0]) === 1 && curKnot[1] - prevKnot[1] === 2) {
          knots[i][0] = prevKnot[0];
          knots[i][1]--;
        }
        if (Math.abs(prevKnot[1] - curKnot[1]) === 1 && prevKnot[0] - curKnot[0] === 2) {
          knots[i][1] = prevKnot[1];
          knots[i][0]++;
        }
        if (Math.abs(prevKnot[1] - curKnot[1]) === 1 && curKnot[0] - prevKnot[0] === 2) {
          knots[i][1] = prevKnot[1];
          knots[i][0]--;
        }

        // new edge case that can occur if the next know moves diagonally
        if (prevKnot[0] - curKnot[0] === 2 && prevKnot[1] - curKnot[1] === 2) {
          knots[i][0]++;
          knots[i][1]++;
        }
        if (prevKnot[0] - curKnot[0] === 2 && curKnot[1] - prevKnot[1] === 2) {
          knots[i][0]++;
          knots[i][1]--;
        }
        if (curKnot[0] - prevKnot[0] === 2 && curKnot[1] - prevKnot[1] === 2) {
          knots[i][0]--;
          knots[i][1]--;
        }
        if (curKnot[0] - prevKnot[0] === 2 && prevKnot[1] - curKnot[1] === 2) {
          knots[i][0]--;
          knots[i][1]++;
        }
      }

      markTailSpot(knots[NUM_KNOTS - 1][0], knots[NUM_KNOTS - 1][1]);
      rem--;
    }
  }

  console.log('Total tail visited spots', countTailSpots());
};

run();
