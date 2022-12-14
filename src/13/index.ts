import { getInputLines, splitByEmptyLine } from '../utils/input';

const inputLines = getInputLines('input_13');
const listPairs = splitByEmptyLine(inputLines);

type NestedList = (number | NestedList)[];

const strToList = (str: string): NestedList => {
  if (str[0] !== '[' || str[str.length - 1] !== ']') {
    throw 'Invalid string input to strToList';
  }

  if (str === '[]') {
    return [];
  }

  const res: NestedList = [];
  let startingBracketIdx = -1;
  let extraBracketsToPass = 0;

  for (let i = 1; i < str.length - 1; i++) {
    if (str[i] === ',' || str[i] === ' ') {
      continue;
    }

    if (str[i] === '[') {
      if (startingBracketIdx === -1) {
        startingBracketIdx = i;
      } else {
        extraBracketsToPass++;
      }
      continue;
    }

    if (str[i] === ']') {
      if (startingBracketIdx === -1) {
        throw 'Unexpected situation, closing bracket before any opening bracket';
      }
      if (extraBracketsToPass > 0) {
        extraBracketsToPass--;
      } else {
        const innerElementStr = str.substring(startingBracketIdx, i + 1);
        res.push(strToList(innerElementStr));
        startingBracketIdx = -1;
      }
      continue;
    }

    if (startingBracketIdx !== -1) {
      continue;
    }

    let curNum = str[i];
    while ([' ', ',', '[', ']'].indexOf(str[i + 1]) === -1) {
      i++;
      curNum += str[i];
    }
    res.push(Number(curNum));
  }

  return res;
};

// true if in order, false if not
// null if both empty lists
const compareLists = (left: NestedList, right: NestedList): boolean | null => {
  if (!left.length && !right.length) {
    return null;
  }

  if (!left.length && right.length) {
    return true;
  }
  if (left.length && !right.length) {
    return false;
  }

  if (typeof left[0] === 'number' && typeof right[0] === 'number') {
    if (left[0] < right[0]) {
      return true;
    }
    if (left[0] > right[0]) {
      return false;
    }
  }

  if (typeof left[0] !== 'number' && typeof right[0] !== 'number') {
    const listComparison = compareLists(left[0], right[0]);
    if (listComparison) {
      return true;
    }
    if (listComparison === false) {
      return false;
    }
  }

  if (typeof left[0] === 'number' && typeof right[0] !== 'number') {
    const listComparison = compareLists([left[0]], right[0]);
    if (listComparison) {
      return true;
    }
    if (listComparison === false) {
      return false;
    }
  }

  if (typeof left[0] !== 'number' && typeof right[0] === 'number') {
    const listComparison = compareLists(left[0], [right[0]]);
    if (listComparison) {
      return true;
    }
    if (listComparison === false) {
      return false;
    }
  }

  return compareLists(left.slice(1), right.slice(1));
};

const run = () => {
  let sumOfIndices = 0;
  let allPairs: NestedList[] = [[[2]], [[6]]]; // divider packets for part 2

  for (let i = 0; i < listPairs.length; i++) {
    const listPair = listPairs[i];
    const leftList = strToList(listPair[0]);
    const rightList = strToList(listPair[1]);

    if (compareLists(leftList, rightList)) {
      sumOfIndices += i + 1;
    }

    allPairs.push(leftList);
    allPairs.push(rightList);
  }

  console.log('Sum of indices', sumOfIndices);

  // --
  // part 2
  // --

  const allPairsSorted = allPairs.sort((a, b) => {
    const compareResult = compareLists(a, b);
    if (compareResult === null) {
      return 0;
    }
    return compareResult ? -1 : 1;
  });

  let posDecoder2 = -1,
    posDecoder6 = -1;
  for (let i = 0; i < allPairsSorted.length; i++) {
    if (compareLists(allPairsSorted[i], [[2]]) === null) {
      posDecoder2 = i + 1;
    }
    if (compareLists(allPairsSorted[i], [[6]]) === null) {
      posDecoder6 = i + 1;
    }
  }

  console.log('Decoder value', posDecoder2 * posDecoder6);
};

run();
