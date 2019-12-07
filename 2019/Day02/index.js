let puzzleInput = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0";

// let test = "3,3,1107,-1,8,3,4,3,99";

function processInstructions4(input, noun, verb) {

    let inputArray = input.split(",");
    inputArray[1] = noun + '';
    inputArray[2] = verb + '';

    for (let i = 0; i < inputArray.length - 1; i += 4) {

        let addedLeadingZeroes = inputArray[i].padStart(5, '0');
        let mode = addedLeadingZeroes.substring(0, 3)
        let opcode = addedLeadingZeroes.substring(3)

        let param1 = inputArray[i + 1];
        let param2 = inputArray[i + 2];
        let param3 = inputArray[i + 3];

        let value1 = (mode[2] === '0' ? Number.parseInt(inputArray[param1], 10) : Number(param1));
        let value2 = (mode[1] === '0' ? Number.parseInt(inputArray[param2], 10) : Number(param2));

        if (Number(opcode) === 1) {
            let result = value1 + value2;
            inputArray[param3] = result.toString();
        }
        else if (Number(opcode) === 2) {

            let result = value1 * value2;
            inputArray[param3] = result.toString();
        }
    }
    return inputArray[0];
}

console.log(`part1 solution = ${processInstructions4(puzzleInput, 12, 2)}`);
;

let desiredOutput = '19690720';
let noun, verb;

for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
        let result = processInstructions4(puzzleInput, i, j);
        if (result === desiredOutput) {
            noun = i;
            verb = j;
            break;
        }
    }
}

console.log(`part2 solution = ${100*noun+verb}`)