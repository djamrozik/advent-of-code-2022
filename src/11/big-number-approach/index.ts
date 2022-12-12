import * as fs from 'fs';
import path from 'path';
import BigNumber from "bignumber.js";

import { splitByEmptyLine } from '../../utils/input';
import Monkey from './Monkey_BN';

const joinedPath = path.join(__dirname, './../../data/input_11.txt');
const inputText = fs.readFileSync(joinedPath, 'utf8');
const inputTextLines = inputText.split('\n');

const NUM_ROUNDS = 1000;   // change to 20 for part 1
const RELIEF_FACTOR = 1;    // change to 3 for part 1

BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_FLOOR })

const run = () => {
    const monkeyGroupDefinitions = splitByEmptyLine(inputTextLines);
    const monkeys = monkeyGroupDefinitions.map(def => new Monkey(def));
    
    const monkeyToId: {[key: number]: Monkey} = {};
    const inspectCount: {[key: number]: number} = {};
    let allDivisorsProduct = 1;

    for (const monkey of monkeys) {
        monkeyToId[monkey.id] = monkey;
        inspectCount[monkey.id] = 0;
        allDivisorsProduct *= monkey.divisibleTestNum;
    }

    let round = 1;
    while (round <= NUM_ROUNDS) {
        for (const monkey of monkeys) {
            while (monkey.startingItems.length) {
                const currentItem = monkey.startingItems[0];
                const worryLevelAfterInspect = monkey.operationFunc(currentItem);
                const newWorryLevel = worryLevelAfterInspect.dividedBy(new BigNumber(RELIEF_FACTOR)).integerValue();
                const passesTest = newWorryLevel.modulo(monkey.divisibleTestNum).toNumber() === 0;
                inspectCount[monkey.id]++;

                if (passesTest) {
                    monkeyToId[monkey.targetIfTestTrue].startingItems.push(newWorryLevel);
                } else {
                    monkeyToId[monkey.targetIfTestFalse].startingItems.push(newWorryLevel);
                }
                
                monkey.startingItems.shift();
            }
        }

        if (round % 50 === 0) {
            console.log(`On round ${round}`);
        }

        round++;
    }

    const inspectCounts = Object.values(inspectCount).sort((a, b) => b - a);
    console.log('Monkey business calc', inspectCounts[0] * inspectCounts[1]);
}

run();
