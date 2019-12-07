const inputString = "3,225,1,225,6,6,1100,1,238,225,104,0,1102,88,66,225,101,8,125,224,101,-88,224,224,4,224,1002,223,8,223,101,2,224,224,1,224,223,223,1101,87,23,225,1102,17,10,224,101,-170,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1101,9,65,225,1101,57,74,225,1101,66,73,225,1101,22,37,224,101,-59,224,224,4,224,102,8,223,223,1001,224,1,224,1,223,224,223,1102,79,64,225,1001,130,82,224,101,-113,224,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1102,80,17,225,1101,32,31,225,1,65,40,224,1001,224,-32,224,4,224,102,8,223,223,1001,224,4,224,1,224,223,223,2,99,69,224,1001,224,-4503,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1002,14,92,224,1001,224,-6072,224,4,224,102,8,223,223,101,5,224,224,1,223,224,223,102,33,74,224,1001,224,-2409,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,107,677,677,224,1002,223,2,223,1006,224,329,101,1,223,223,108,677,677,224,1002,223,2,223,1005,224,344,101,1,223,223,1007,677,677,224,1002,223,2,223,1006,224,359,101,1,223,223,1107,226,677,224,1002,223,2,223,1006,224,374,1001,223,1,223,8,677,226,224,1002,223,2,223,1006,224,389,101,1,223,223,1108,677,677,224,1002,223,2,223,1005,224,404,1001,223,1,223,7,226,226,224,1002,223,2,223,1006,224,419,101,1,223,223,1107,677,677,224,1002,223,2,223,1005,224,434,101,1,223,223,107,226,226,224,102,2,223,223,1005,224,449,101,1,223,223,107,677,226,224,1002,223,2,223,1006,224,464,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,479,1001,223,1,223,108,677,226,224,102,2,223,223,1005,224,494,1001,223,1,223,1108,677,226,224,1002,223,2,223,1005,224,509,1001,223,1,223,1107,677,226,224,1002,223,2,223,1005,224,524,101,1,223,223,1008,226,226,224,1002,223,2,223,1006,224,539,101,1,223,223,1008,226,677,224,1002,223,2,223,1005,224,554,1001,223,1,223,7,226,677,224,1002,223,2,223,1005,224,569,101,1,223,223,1007,677,226,224,1002,223,2,223,1006,224,584,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,599,101,1,223,223,1007,226,226,224,102,2,223,223,1006,224,614,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,629,101,1,223,223,108,226,226,224,102,2,223,223,1006,224,644,101,1,223,223,1108,226,677,224,1002,223,2,223,1005,224,659,101,1,223,223,8,226,226,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226";

// const test = "3,3,1107,-1,8,3,4,3,99";

const getInstructionPointer = (opcode, i, value1, value2) => {
    switch (Number(opcode)) {
        case 1:
        case 2:
        case 7:
        case 8:
            return i + 4;
        case 3:
        case 4:
            return i + 2;
        case 5:
            return value1 !== 0 ? value2 : i + 3
        case 6:
            return value1 === 0 ? value2 : i + 3
        default:
            return Number.MAX_VALUE;
    }
}

const getOpcodeCase = (opcode) => {
    switch (Number(opcode)) {
        case 1:
        case 2:
        case 7:
        case 8:
            return 4;
        case 3:
        case 4:
            return 2;
        case 5:
        case 6:
            return 0;
        default:
            return Number.MAX_VALUE;
    }
}

const process4Elements = (opcode, value1, value2, param3, inputArray) => {
    switch (Number(opcode)) {
        case 1: {
            let result = value1 + value2;
            inputArray[param3] = result.toString();
            break;
        }
        case 2: {
            let result = value1 * value2;
            inputArray[param3] = result.toString();
            break;
        }
        case 7: {
            value1 < value2 ? inputArray[param3] = 1 + "" : inputArray[param3] = 0 + "";
            break;
        }
        case 8: {
            value1 === value2 ? inputArray[param3] = 1 + "" : inputArray[param3] = 0 + "";
            break;
        }
        default: {
            console.log("error in process4Elements");
            break;
        }
    }
}

const getResult = (puzzleString, inputSignal) => {
    
    let inputArray = puzzleString.split(",");
    const resultArray = [];

    for (let i = 0; i < inputArray.length - 1; i) {

        const addedLeadingZeroes = inputArray[i].padStart(5, '0');
        const mode = addedLeadingZeroes.substring(0, 3)
        const opcode = addedLeadingZeroes.substring(3)

        const value1 = (mode[2] === '0' ? parseInt(inputArray[inputArray[i + 1]], 10) : parseInt(inputArray[i + 1]));
        const value2 = (mode[1] === '0' ? parseInt(inputArray[inputArray[i + 2]], 10) : parseInt(inputArray[i + 2]));
        const opcodeCase = getOpcodeCase(opcode);

        if (opcodeCase === 4 ) {
            process4Elements(opcode, value1, value2, inputArray[i + 3], inputArray);
        }

        else if (opcodeCase === 2) {
            const param1 = inputArray[i + 1];

            if (Number(opcode) === 4) {
                resultArray.push( parseInt(inputArray[param1]));
            }
            else if (Number(opcode) === 3) {
                let setInput = inputSignal.shift().toString()
                inputArray[param1] = setInput;
               
            }
        }

        i = getInstructionPointer(opcode, i, value1, value2);
    }
    return Math.max(...resultArray);
}


console.log(getResult(inputString, [1]));