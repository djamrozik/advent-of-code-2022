
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
}

export {
    splitByEmptyLine
}
