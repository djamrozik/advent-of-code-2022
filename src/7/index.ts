import * as fs from 'fs';
import path from 'path';
import Folder from './Folder';
import File from './File';

const joinedPath = path.join(__dirname, './../data/input_7.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');

// Note: doing this in an object oriented manner
// Way too verbose, but just experimenting

// Update:
// Really ugly for line handling logic, but calculating answer was easy and sensible at least

const run = () => {
  const homeFolder = new Folder('/');
  let currentFolder = homeFolder;

  const handleChangeDirectory = (targetDirectoryName: string) => {
    if (targetDirectoryName === '/') {
      currentFolder = homeFolder;
      return;
    }

    if (targetDirectoryName === '..') {
      if (!currentFolder.parentDirectory) {
        console.error('Trying to go to parent directory, but current directory has no parent directory');
        return;
      }
      currentFolder = currentFolder.parentDirectory;
      return;
    }

    const targetDirectory = currentFolder.getSubFolder(targetDirectoryName);
    if (!targetDirectory) {
      console.error('Trying to go to target directory, but does not exist as a subfolder');
    }
    currentFolder = targetDirectory as Folder;
  };

  // this could mutate currentLineIdx, but want to avoid
  // mutating global state
  // returns first non ls line
  const handleLS = (lsStartLine: number): number => {
    let currentLine = lsStartLine;

    while (currentLine < inputTextLines.length && inputTextLines[currentLine][0] !== '$') {
      const lsOutputTokens = inputTextLines[currentLine].split(' ');
      if (lsOutputTokens[0] === 'dir') {
        const folder = new Folder(lsOutputTokens[1], currentFolder);
        currentFolder.addSubFolder(folder);
      } else if (!isNaN(Number(lsOutputTokens[0]))) {
        const file = new File(lsOutputTokens[1], Number(lsOutputTokens[0]));
        currentFolder.addFile(file);
      } else {
        console.error('Expected first token to be a number, but is not');
      }
      currentLine++;
    }

    return currentLine;
  };

  let currentLineIdx = 0;
  while (currentLineIdx < inputTextLines.length) {
    const lineTokens = inputTextLines[currentLineIdx].split(' ');

    if (lineTokens[0] === '$' && lineTokens[1] === 'cd') {
      handleChangeDirectory(lineTokens[2]);
      currentLineIdx++;
      continue;
    }

    if (lineTokens[0] === '$' && lineTokens[1] === 'ls') {
      currentLineIdx = handleLS(currentLineIdx + 1);
      continue;
    }

    console.error('Unexpected situation, processing unexepcted lines');
  }

  const allSubFolders = homeFolder.getAllSubFolders();
  console.log('All sub folders length', allSubFolders.length);

  // sum of sub folders with less than 100,000 size
  const customSum = allSubFolders.reduce((sum, cur) => {
    if (cur.getSize() > 100_000) {
      return sum;
    }
    return sum + cur.getSize();
  }, 0);
  console.log('Sum of directories with a size less than or eq to 100_000', customSum);

  //
  // -- part 2
  //

  const totalSize = homeFolder.getSize();
  const currentFreeSpace = 70_000_000 - totalSize;
  const spaceToFreeUp = 30_000_000 - currentFreeSpace;

  // pick the first directory above spaceToFreeUp
  // would be nice if the size was cached
  const allSubFoldersSorted = allSubFolders.sort((a, b) => {
    return a.getSize() - b.getSize();
  });

  let firstAboveSpaceNeeded: Folder | null = null;
  for (const sf of allSubFoldersSorted) {
    // really need this cached
    if (sf.getSize() >= spaceToFreeUp) {
      firstAboveSpaceNeeded = sf;
      break;
    }
  }
  console.log('Size of directory to be deleted for part 2', firstAboveSpaceNeeded?.getSize());
};

run();
