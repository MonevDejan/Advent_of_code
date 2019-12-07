const inputString = "3,8,1001,8,10,8,105,1,0,0,21,46,59,84,93,102,183,264,345,426,99999,3,9,1002,9,4,9,1001,9,3,9,102,2,9,9,1001,9,5,9,102,3,9,9,4,9,99,3,9,1002,9,3,9,101,4,9,9,4,9,99,3,9,1002,9,4,9,1001,9,4,9,102,2,9,9,1001,9,2,9,1002,9,3,9,4,9,99,3,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99";

const test = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0";
const test1 = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";

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

const getAmplifierOutput = (puzzleString, inputSignal) => {
    let inputArray = puzzleString.split(",");
    const resultArray = [];

    for (let i = 0; i < inputArray.length - 1; i) {

        const addedLeadingZeroes = inputArray[i].padStart(5, '0');
        const mode = addedLeadingZeroes.substring(0, 3)
        const opcode = addedLeadingZeroes.substring(3)

        const value1 = (mode[2] === '0' ? parseInt(inputArray[inputArray[i + 1]], 10) : parseInt(inputArray[i + 1]));
        const value2 = (mode[1] === '0' ? parseInt(inputArray[inputArray[i + 2]], 10) : parseInt(inputArray[i + 2]));
        const opcodeCase = getOpcodeCase(opcode);

        if (opcodeCase === 4) {
            process4Elements(opcode, value1, value2, inputArray[i + 3], inputArray);
        }

        else if (opcodeCase === 2) {
            const param1 = inputArray[i + 1];

            if (Number(opcode) === 4) {
                resultArray.push(parseInt(inputArray[param1]));
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

const isPhaseDifferentDigts = (ar = []) => {
    let obj = { }
    let flag = true;
    ar.forEach(x => {
        obj[x] ? flag = false : obj[x] = true;
    })
    return flag;
}

const getResult = (input, range = []) => {

    let maxValue = 0;
    let combination = "";
    const [start, end] = range;

    for (let phase5 = start; phase5 <= end; phase5++) {
        for (let phase4 = start; phase4 <= end; phase4++) {
            for (let phase3 = start; phase3 <= end; phase3++) {
                for (let phase2 = start; phase2 <= end; phase2++) {
                    for (let phase1 = start; phase1 <= end; phase1++) {

                        let output1 = getAmplifierOutput(input, [phase1, 0]);
                        let output2 = getAmplifierOutput(input, [phase2, output1]);
                        let output3 = getAmplifierOutput(input, [phase3, output2]);
                        let output4 = getAmplifierOutput(input, [phase4, output3]);
                        let result = getAmplifierOutput(input, [phase5, output4]);

                        const phaseObject = [phase1, phase2, phase3,phase4, phase5 ];
                        
                        let checkPhase = isPhaseDifferentDigts(phaseObject);

                        if (maxValue < result &&  checkPhase) {
                            maxValue = result;
                            combination = `${phase1},${phase2},${phase3},${phase4},${phase5}`;
                        }
                    }

                }

            }

        }

    }
    console.log("combination", combination);
    console.log(maxValue);
}


getResult(test1, [5,9]);


