import * as fs from 'fs';
const path = require('path');

const joinedPath = path.join(__dirname, './../data/input_4.txt');
const inputText = fs.readFileSync(joinedPath,'utf8');
const inputTextLines = inputText.split("\n");

const isContainedIn = (src: string, tgt: string) => {
    const [srcLeft, srcRight] = src.split("-");
    const [tgtLeft, tgtRight] = tgt.split("-");
    return Number(srcLeft) >= Number(tgtLeft) && Number(srcRight) <= Number(tgtRight);
}

const isNumberInRange = (rangeStart: number, rangeEnd: number, n: number) => {
    return n >= rangeStart && n <= rangeEnd;
}

// if there any overlap, then that means a single point from one
// range will be contained within the other range
const isOverLap = (zoneA: string, zoneB: string) => {
    const [zoneALeft, zoneARight] = zoneA.split("-").map(Number);
    const [zoneBLeft, zoneBRight] = zoneB.split("-").map(Number);

    const rightPointInLeft = isNumberInRange(zoneALeft, zoneARight, zoneBLeft) 
        || isNumberInRange(zoneALeft, zoneARight, zoneBRight);

    const leftPointInRight = isNumberInRange(zoneBLeft, zoneBRight, zoneALeft) 
        || isNumberInRange(zoneBLeft, zoneBRight, zoneARight);
    
    return rightPointInLeft || leftPointInRight;
}

const run = () => {
    let containedTotal = 0, overLapTotal = 0;

    for (const line of inputTextLines) {
        const [firstZones, secondZones] = line.split(",");
        if (isContainedIn(firstZones, secondZones) || isContainedIn(secondZones, firstZones)) {
            containedTotal++;
        }
        if (isOverLap(firstZones, secondZones)) {
            overLapTotal++;
        }
    }

    console.log('Fully Contained Total', containedTotal);
    console.log('Overlap Total', overLapTotal);
}

run();
