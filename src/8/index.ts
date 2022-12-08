import * as fs from 'fs';
import path from 'path';

const joinedPath = path.join(__dirname, './../data/input_8.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');

type MaxTreeFromPoint = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

const getTreeGrid = () => {
  return inputText.split('\n').map((line) => line.split('').map(Number));
};

const getMaxTreeGrid = (rows: number, cols: number) => {
  return [...new Array(rows)].map(() => [...new Array(cols)].map(() => ({} as MaxTreeFromPoint)));
};

const run = () => {
  const trees = getTreeGrid();
  const maxTreeGrid = getMaxTreeGrid(trees.length, trees[0].length);

  // --
  // part 1
  // dynamic programming approach saving the max tree in each direction
  //

  // set max point left
  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees[0].length - 1; j++) {
      const maxTreeAtPoint = maxTreeGrid[i][j];
      if (j === 1) {
        maxTreeAtPoint.left = trees[i][j - 1];
        continue;
      }

      const maxTreeAtPointLeft = maxTreeGrid[i][j - 1];
      maxTreeAtPoint.left = Math.max(maxTreeAtPointLeft.left as number, trees[i][j - 1]);
    }
  }

  // set max point top
  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees[0].length - 1; j++) {
      const maxTreeAtPoint = maxTreeGrid[i][j];
      if (i === 1) {
        maxTreeAtPoint.top = trees[i - 1][j];
        continue;
      }

      const maxTreeAtPointTop = maxTreeGrid[i - 1][j];
      maxTreeAtPoint.top = Math.max(maxTreeAtPointTop.top as number, trees[i - 1][j]);
    }
  }

  // set max point right
  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = trees[0].length - 2; j >= 1; j--) {
      const maxTreeAtPoint = maxTreeGrid[i][j];
      if (j === trees[0].length - 2) {
        maxTreeAtPoint.right = trees[i][j + 1];
        continue;
      }

      const maxTreeAtPointRight = maxTreeGrid[i][j + 1];
      maxTreeAtPoint.right = Math.max(maxTreeAtPointRight.right as number, trees[i][j + 1]);
    }
  }

  // set max point bottom
  for (let i = trees.length - 2; i >= 1; i--) {
    for (let j = 1; j < trees[0].length - 1; j++) {
      const maxTreeAtPoint = maxTreeGrid[i][j];
      if (i === trees.length - 2) {
        maxTreeAtPoint.bottom = trees[i + 1][j];
        continue;
      }

      const maxTreeAtPointBottom = maxTreeGrid[i + 1][j];
      maxTreeAtPoint.bottom = Math.max(maxTreeAtPointBottom.bottom as number, trees[i + 1][j]);
    }
  }

  let visibleCount = 2 * trees.length + 2 * trees[0].length - 4;
  for (let i = 1; i < maxTreeGrid.length - 1; i++) {
    for (let j = 1; j < maxTreeGrid.length - 1; j++) {
      const val = trees[i][j];
      const maxTreeAtPoint = maxTreeGrid[i][j];
      if (
        val > (maxTreeAtPoint.left as number) ||
        val > (maxTreeAtPoint.top as number) ||
        val > (maxTreeAtPoint.bottom as number) ||
        val > (maxTreeAtPoint.right as number)
      ) {
        visibleCount++;
      }
    }
  }

  console.log('Number of visible trees', visibleCount);

  // --
  // part 2
  // dynamic programming matrix from above cannot be reused unfortunately
  //

  let maxScore = 0;

  // the view score at the edges are automatically 0
  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees[j].length - 1; j++) {
      let [viewLeft, viewTop, viewRight, viewBottom] = [0, 0, 0, 0];
      let val = trees[i][j];

      while (j - viewLeft >= 1) {
        viewLeft++;
        if (trees[i][j - viewLeft] >= val) {
          break;
        }
      }

      while (i - viewTop >= 1) {
        viewTop++;
        if (trees[i - viewTop][j] >= val) {
          break;
        }
      }

      while (j + viewRight < trees[j].length - 1) {
        viewRight++;
        if (trees[i][j + viewRight] >= val) {
          break;
        }
      }

      while (i + viewBottom < trees.length - 1) {
        viewBottom++;
        if (trees[i + viewBottom][j] >= val) {
          break;
        }
      }

      maxScore = Math.max(maxScore, viewLeft * viewTop * viewRight * viewBottom);
    }
  }

  console.log('Max view score', maxScore);
};

run();
