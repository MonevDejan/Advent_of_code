const inputString = "3,8,1001,8,10,8,105,1,0,0,21,46,59,84,93,102,183,264,345,426,99999,3,9,1002,9,4,9,1001,9,3,9,102,2,9,9,1001,9,5,9,102,3,9,9,4,9,99,3,9,1002,9,3,9,101,4,9,9,4,9,99,3,9,1002,9,4,9,1001,9,4,9,102,2,9,9,1001,9,2,9,1002,9,3,9,4,9,99,3,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99";

const parameterCount = { 1: 3, 2: 3, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 3, 9: 1, 99: 0 };

const getIndexes = (modes, iPointer, input, relativeBase) => {
    const indexes = [];
    modes.forEach((mode, index) => {

        const position = iPointer + index+ 1;
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

function* amplifier(puzzleString, inputSignal) {
    let inputArray = puzzleString.split(",").map(x => Number(x));
    let relativeBase = 0;
    let instructionpointer = 0;

    function processOpcode(inputSignal) {
        for (let i = instructionpointer; i < inputArray.length - 1; i) {
            const instruction = inputArray[i];
            const opcode = instruction % 100;
            if (opcode === 99) {
                // console.log("Halt");
                break;
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
        inputSignal = yield output;
    }
}

const getAllPermutations = (string) => {
    var results = [];

    if (string.length === 1) {
        results.push(string);
        return results;
    }

    for (let i = 0; i < string.length; i++) {
        const firstChar = string[i];
        const charsLeft = string.substring(0, i) + string.substring(i + 1);
        const innerPermutations = getAllPermutations(charsLeft);

        for (let j = 0; j < innerPermutations.length; j++) {
            results.push(firstChar + innerPermutations[j]);
        }
    }
    return results;
}

const part1 = (input, perumutation) => {
    const values = [];

    for (let i = 0; i < perumutation.length; i++) {

        const phase = perumutation[i].split('').map(x => Number(x));

        const AMP1 = amplifier(input, [phase[0], 0]);
        const AMP2 = amplifier(input, [phase[1], AMP1.next().value]);
        const AMP3 = amplifier(input, [phase[2], AMP2.next().value]);
        const AMP4 = amplifier(input, [phase[3], AMP3.next().value]);
        const AMP5 = amplifier(input, [phase[4], AMP4.next().value]);

        values.push(AMP5.next().value);
    }
    console.log(Math.max(...values));
}

const part2 = (input, perumutation) => {
    const values = [];
   
    for (let i = 0; i < perumutation.length; i++) {
        let thrustersOutput = 0;
      
        const phase = perumutation[i].split('').map(x => Number(x));
        const ampOutput = { result: 0 }

        const AMP1 = amplifier(input, [phase[0], thrustersOutput]);
        const AMP2 = amplifier(input, [phase[1], AMP1.next().value]);
        const AMP3 = amplifier(input, [phase[2], AMP2.next().value]);
        const AMP4 = amplifier(input, [phase[3], AMP3.next().value]);
        const AMP5 = amplifier(input, [phase[4], AMP4.next().value]);
        thrustersOutput = AMP5.next().value;

        if (thrustersOutput !== undefined) {
            ampOutput.result = thrustersOutput;
        }

        while (thrustersOutput !== undefined) {
            const output1 = AMP1.next([thrustersOutput]).value;
            const output2 = AMP2.next([output1]).value;
            const output3 = AMP3.next([output2]).value;
            const output4 = AMP4.next([output3]).value;
            const output5 = AMP5.next([output4]).value;

            thrustersOutput = output5;
            if (thrustersOutput !== undefined) {
                ampOutput.result = thrustersOutput;
            }
        }
        values.push(ampOutput.result);
    }
    console.log(Math.max(...values));
}

const perumutation1 = getAllPermutations('01234');
const perumutation2 = getAllPermutations('56789');

part1(inputString, perumutation1);
part2(inputString, perumutation2);

