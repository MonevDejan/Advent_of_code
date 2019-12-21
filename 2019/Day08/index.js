
const width = 25;
const height = 6;
const area = width * height;

const LayerContainer = {};

for (let i = 0, counter = 1; i < input.length; i += area, counter++) {
    LayerContainer[`Layer${counter}`] = input.slice(i, area + i);
}

let sumZeroes = Number.MAX_VALUE;
let part1 = 0;
const part2 = LayerContainer[`Layer1`].split('');

for (const prop in LayerContainer) {

    const acumulator = LayerContainer[prop].split('').reduce((acc, digit) => {
        acc[digit] += 1;
        return acc;
    }, { "0": 0, "1": 0, "2": 0 });

    if (acumulator['0'] < sumZeroes) {
        sumZeroes = acumulator["0"];
        part1 = acumulator["1"] * acumulator["2"];
    }

    LayerContainer[prop].split('').forEach((digit, index) => {
        if (digit !== '2' && part2[index] === '2') {
            part2[index] = digit;
        }
    });
}

console.log(part1);

let string = '';
part2.forEach((digit, index) => {
    if ((index % 25 === 0 && index !== 0 ) || (index === part2.length-1)){
     
        console.log(string);
        string = '';
    }
    string += digit === '0' ? ' ' : '#';
});