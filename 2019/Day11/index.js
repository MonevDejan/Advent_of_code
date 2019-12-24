const input = "3,8,1005,8,320,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,102,1,8,29,2,1005,1,10,1006,0,11,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,57,1,8,15,10,1006,0,79,1,6,3,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,90,2,103,18,10,1006,0,3,2,105,14,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,123,2,9,2,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,150,1,2,2,10,2,1009,6,10,1,1006,12,10,1006,0,81,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,187,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,209,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,231,1,1008,11,10,1,1001,4,10,2,1104,18,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,1001,8,0,264,1,8,14,10,1006,0,36,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,293,1006,0,80,1006,0,68,101,1,9,9,1007,9,960,10,1005,10,15,99,109,642,104,0,104,1,21102,1,846914232732,1,21102,1,337,0,1105,1,441,21102,1,387512115980,1,21101,348,0,0,1106,0,441,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,209533824219,1,1,21102,1,395,0,1106,0,441,21101,0,21477985303,1,21102,406,1,0,1106,0,441,3,10,104,0,104,0,3,10,104,0,104,0,21101,868494234468,0,1,21101,429,0,0,1106,0,441,21102,838429471080,1,1,21102,1,440,0,1106,0,441,99,109,2,21201,-1,0,1,21101,0,40,2,21102,472,1,3,21101,0,462,0,1106,0,505,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,467,468,483,4,0,1001,467,1,467,108,4,467,10,1006,10,499,1102,1,0,467,109,-2,2106,0,0,0,109,4,2101,0,-1,504,1207,-3,0,10,1006,10,522,21101,0,0,-3,21202,-3,1,1,22101,0,-2,2,21102,1,1,3,21102,541,1,0,1106,0,546,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,569,2207,-4,-2,10,1006,10,569,22102,1,-4,-4,1105,1,637,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21102,588,1,0,1105,1,546,22101,0,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,607,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,629,21201,-1,0,1,21102,629,1,0,105,1,504,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0";

const parameterCount = { 1: 3, 2: 3, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 3, 9: 1, 99: 0 };
const getIndexes = (modes, iPointer, input, relativeBase) => {
    const indexes = [];
    modes.forEach((mode, index) => {

        const position = iPointer + index + 1;
        if (mode === 0) {
            indexes.push(input[position])
        }
        if (mode === 1) {
            indexes.push(position);
        }
        if (mode === 2) {
            indexes.push(input[position] + relativeBase);
        }
    })
    return indexes;
}

function* intCode(puzzleString, inputSignal) {
    let inputArray = puzzleString.split(",").map(x => Number(x));
    let relativeBase = 0;
    let instructionpointer = 0;

    function processOpcode(inputSignal) {
        for (let i = instructionpointer; i < inputArray.length - 1; i) {
            const instruction = inputArray[i];
            const opcode = instruction % 100;

            if (opcode === 99) {
                console.log("Halt");
                return "Halt";
            }
            const modes = Array.from({ length: parameterCount[opcode] }, (_, index) => Math.floor(instruction / 10 ** (index + 2) % 10));
            const indexes = getIndexes(modes, i, inputArray, relativeBase);

            switch (opcode) {
                case 1: {
                    let result = inputArray[indexes[0]] + inputArray[indexes[1]];
                    inputArray[indexes[2]] = result
                    i += parameterCount[opcode] + 1;
                    break;
                }
                case 2: {
                    let result = inputArray[indexes[0]] * inputArray[indexes[1]];
                    inputArray[indexes[2]] = result
                    i += parameterCount[opcode] + 1;
                    break;
                }
                case 3: {
                    inputArray[indexes[0]] = inputSignal.shift();
                    i += parameterCount[opcode] + 1;
                    break;
                }
                case 4: {
                    i += parameterCount[opcode] + 1;
                    instructionpointer = i;
                    return inputArray[indexes[0]];
                }
                case 5: {
                    inputArray[indexes[0]] !== 0 ? i = inputArray[indexes[1]] : i += parameterCount[opcode] + 1;
                    break;
                }
                case 6: {

                    inputArray[indexes[0]] === 0 ? i = inputArray[indexes[1]] : i += parameterCount[opcode] + 1;
                    break;
                }
                case 7: {
                    inputArray[indexes[0]] < inputArray[indexes[1]] ? inputArray[indexes[2]] = 1 : inputArray[indexes[2]] = 0;
                    i += parameterCount[opcode] + 1;
                    break;
                }
                case 8: {
                    inputArray[indexes[0]] === inputArray[indexes[1]] ? inputArray[indexes[2]] = 1 : inputArray[indexes[2]] = 0;
                    i += parameterCount[opcode] + 1;
                    break;
                }
                case 9: {
                    relativeBase += inputArray[indexes[0]];
                    i += parameterCount[opcode] + 1;
                    break;
                }
                default: {
                    console.log("error in processOpcode");
                    break;
                }
            }
        }
    }

    while (instructionpointer < inputArray.length) {
        const output = processOpcode(inputSignal);
        if (output === "Halt") { return; }
        inputSignal = yield output;
    }
}

const getPaintedArea = (puzzleString, input) => {

    let facingDirection = 90;
    const robotPosition = { x: 0, y: 0 };
    const areaToPaint = {};
    let isRunung = true;
    const runIntCode = intCode(puzzleString, [input]);

    while (isRunung) {
        let standingColor;
        let prop = `${robotPosition.x},${robotPosition.y}`;
        
        if (areaToPaint[prop]) {
            standingColor = areaToPaint[prop].value;
        }
        else {
            areaToPaint[prop] = { value: 0, painted: false }
            standingColor = 0;
        }

        const paintColor = runIntCode.next([standingColor]);
        const directionOutput = runIntCode.next();

        isRunung = !directionOutput.done;

        if (isRunung) {
            if (paintColor.value !== areaToPaint[prop].value) {
                areaToPaint[prop].value = paintColor.value;
                areaToPaint[prop].painted = true;
            }

            directionOutput.value === 0 ? facingDirection += 90 : facingDirection -= 90;

            let directionAngle = facingDirection % 360;
            if (directionAngle < 0) {
                directionAngle += 360;
            }

            switch (directionAngle) {
                case 0: {
                    robotPosition.x += 1;
                    break;
                }
                case 90: {
                    robotPosition.y += 1;
                    break;
                }
                case 180: {
                    robotPosition.x -= 1;
                    break;
                }
                case 270: {
                    robotPosition.y -= 1;
                    break;
                }
                default: {
                    console.log("error in update coordinates")
                    break;
                }
            }
        }
    }
    return areaToPaint;
}

const part1 = () => {
    const mainObject = getPaintedArea(input, 0);
    let sum = 0;
    for (const property in mainObject) {
        if(mainObject[property].painted) {sum ++};
    }
    console.log(sum);   
}

const part2 = () => {
    const mainObject2 = getPaintedArea(input, 1);
    const arrayToPrint = [new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array()];
    
    for (const property in mainObject2) {
        const coordinates = property.split(',').map(x => Number(x) < 0 ? Number(x) * -1 : Number(x));
        
    mainObject2[property].value === 1 ?
        arrayToPrint[coordinates[1]][coordinates[0]] = '#' :
        arrayToPrint[coordinates[1]][coordinates[0]] = ' ';
    }
    
    arrayToPrint.forEach(x => {
        x.shift();
        console.log(x.join(''));
    })
}

part1();
part2();