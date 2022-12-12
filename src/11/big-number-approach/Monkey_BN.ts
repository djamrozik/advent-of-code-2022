
import BigNumber from "bignumber.js";

export default class Monkey {
    id: number;
    startingItems: BigNumber[];
    operationFunc: (x: BigNumber) => BigNumber;
    divisibleTestNum: number;
    targetIfTestTrue: number;
    targetIfTestFalse: number;

    constructor(definition: string[]) {
        if (definition.length !== 6) {
            throw "Definition must be 6 lines";
        }
        this.id = this.getIdFromDefs(definition);
        this.startingItems = this.getStartingItemsFromDefs(definition);
        this.operationFunc = this.getOperationFuncFromDefs(definition);
        this.divisibleTestNum = this.getDivisibleTestNumFromDefs(definition);
        this.targetIfTestTrue = this.getTargetIfTestTrue(definition);
        this.targetIfTestFalse = this.getTargetIfTestFalse(definition)
    }

    private getIdFromDefs(definition: string[]): number {
        return Number(definition[0].split(' ')[1].charAt(0));
    }

    private getStartingItemsFromDefs(defintion: string[]): BigNumber[] {
        const startText = "Starting items:";
        const indexStart = defintion[1].indexOf(startText);
        const listStartIdx = indexStart + startText.length + 1;
        const itemsText = defintion[1].substring(listStartIdx, defintion[1].length - 1);
        return itemsText.split(', ').map((x) => new BigNumber(x));
    }
    
    private getOperationFuncFromDefs(defintion: string[]): (x: BigNumber) => BigNumber {
        const startText = "Operation: new =";
        const indexStart = defintion[2].indexOf(startText);
        const operationStartIdx = indexStart + startText.length + 1;
        const operationText = defintion[2].substring(operationStartIdx, defintion[2].length - 1);
        const operationTextItems = operationText.split(' ');
        const [operator, secondaryNum] = [operationTextItems[1], operationTextItems[2]];

        return (y: BigNumber) => {
            const z = secondaryNum === "old" ? y : new BigNumber(secondaryNum);
            if (operator === '+') {
                return y.plus(z);
            } else if (operator === '*') {
                return y.times(z);
            } else if (operator === '-') {
                return y.minus(z);
            } else if (operator === '/') {
                return y.dividedBy(z);
            }
            throw 'No operator matched'
        } 
    }

    private getDivisibleTestNumFromDefs(defintion: string[]): number {
        const startText = "Test: divisible by";
        const indexStart = defintion[3].indexOf(startText);
        const listStartIdx = indexStart + startText.length + 1;
        return Number(defintion[3].substring(listStartIdx, defintion[3].length - 1));
    }

    private getTargetIfTestTrue(definition: string[]): number {
        const lineLength = definition[4].length;
        return Number(definition[4].substring(lineLength - 2, lineLength));
    }

    private getTargetIfTestFalse(definition: string[]): number {
        const lineLength = definition[5].length;
        return Number(definition[5].substring(lineLength - 2, lineLength));
    }
}