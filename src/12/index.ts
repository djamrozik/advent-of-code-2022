import { getInputLines } from '../utils/input';

const grid = getInputLines('input_12').map((line) => line.split(''));

type Point = {
  i: number;
  j: number;
};

const pointToMinSteps: { [key: number]: { [key: number]: number } } = {};

const getSpecificPoint = (letter: string): Point => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === letter) {
        return { i, j };
      }
    }
  }
  return { i: -1, j: -1 };
};

const getCharCode = (point: Point): number => {
  const letter = grid[point.i][point.j];
  if (letter === 'S') {
    return 'a'.charCodeAt(0);
  }
  if (letter === 'E') {
    return 'z'.charCodeAt(0);
  }
  return letter.charCodeAt(0);
};

const setPointToMinSteps = (point: Point, steps: number) => {
  if (!pointToMinSteps[point.i]) {
    pointToMinSteps[point.i] = {};
  }
  pointToMinSteps[point.i][point.j] = steps;
};

const getMinStepsToPoint = (point: Point) => {
  if (!pointToMinSteps[point.i]) {
    return undefined;
  }
  return pointToMinSteps[point.i][point.j];
};

const getPossibleNextPoints = (point: Point): Point[] => {
  const res = [];
  const curCharCode = getCharCode(point);

  if (point.i > 0) {
    const charCodeTop = getCharCode({ i: point.i - 1, j: point.j });
    if (charCodeTop - curCharCode <= 1) {
      res.push({ i: point.i - 1, j: point.j });
    }
  }

  if (point.i < grid.length - 1) {
    const charCodeBottom = getCharCode({ i: point.i + 1, j: point.j });
    if (charCodeBottom - curCharCode <= 1) {
      res.push({ i: point.i + 1, j: point.j });
    }
  }

  if (point.j > 0) {
    const charCodeLeft = getCharCode({ i: point.i, j: point.j - 1 });
    if (charCodeLeft - curCharCode <= 1) {
      res.push({ i: point.i, j: point.j - 1 });
    }
  }

  if (point.j < grid[0].length - 1) {
    const charCodeRight = getCharCode({ i: point.i, j: point.j + 1 });
    if (charCodeRight - curCharCode <= 1) {
      res.push({ i: point.i, j: point.j + 1 });
    }
  }

  return res;
};

const getShortestPathToE = (point: Point): number => {
  const pointsToVisit = [point];
  setPointToMinSteps(point, 0);

  while (pointsToVisit.length) {
    const currentPoint = pointsToVisit[0];
    const stepsToThisPoint = pointToMinSteps[currentPoint.i][currentPoint.j];
    const possibleNextPoints = getPossibleNextPoints(currentPoint);

    // filter out steps where it would take more steps there
    const actualNextPoints = possibleNextPoints.filter((p) => {
      const minStepsToPoint = getMinStepsToPoint(p);
      if (!minStepsToPoint) {
        return true;
      }
      return stepsToThisPoint + 1 < minStepsToPoint;
    });

    // set the new steps to each point and add to list to visit
    for (const p of actualNextPoints) {
      setPointToMinSteps(p, stepsToThisPoint + 1);
      pointsToVisit.push(p);
    }

    pointsToVisit.shift();
  }

  const endingPoint = getSpecificPoint('E');
  return getMinStepsToPoint(endingPoint) as number;
};

const run = () => {
  const startingPoint = getSpecificPoint('S');
  console.log('Steps from S to E', getShortestPathToE(startingPoint));

  // --
  // part 2, shortest path from any a or S
  // --

  // brute force approach, still pretty instantaneous
  // no need to overengineer, but if needed could optimize
  // by stopping when we saw another 'a', since can't be the most direct path

  let shortestPath = Infinity;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'a' || grid[i][j] === 'S') {
        const pathLength = getShortestPathToE({ i, j });
        if (pathLength < shortestPath) {
          shortestPath = pathLength;
        }
      }
    }
  }

  console.log('Shortest path from any a or S', shortestPath);
};

run();
