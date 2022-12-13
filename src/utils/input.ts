import * as fs from 'fs';
import path from 'path';

const getInputLines = (inputFile: string): string[] => {
  const joinedPath = path.join(__dirname, `./../data/${inputFile}.txt`);
  const inputText = fs.readFileSync(joinedPath, 'utf8');
  return inputText.split('\n');
};

const splitByEmptyLine = (inputLines: string[]): string[][] => {
  const groups: string[][] = [[]];
  for (const line of inputLines) {
    if (!line || line === '\n' || line === '\r') {
      groups.push([]);
      continue;
    }
    groups[groups.length - 1].push(line);
  }
  return groups;
};

export { getInputLines, splitByEmptyLine };
