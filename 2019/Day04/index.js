getResult('402328-864247');

const getResult = (range) => {
    const start = range.split('-')[0], finish = range.split('-')[1];
    let part1 = 0, part2 = 0;

    for(var i = start; i<= finish; i++){
        if (isDigitsIncreasing(i) && hasAdjDuplicates(i)) part1+=1;
        if (isDigitsIncreasing(i) && hasAdjDuplicatesPart2(i)) {
            part2+=1;
        }
    }
    console.log(part1, part2);
    return;
}

const isDigitsIncreasing = (num) => {
    const digitsArray = (num).toString().split('');
    const orderedDigitsArray = (num).toString().split('').sort();
    const result = digitsArray.toString() === orderedDigitsArray.toString();
    return result;
}

const hasAdjDuplicates = (num) => {
    let hasDuplicates = false;
    const str = num.toString();
    for(var i = 1; i< str.length; i++){
        if(str[i] === str[i-1]) {
            hasDuplicates = true;
            break;
        }
    }
    return hasDuplicates;
} 

const hasAdjDuplicatesPart2 = (num) => {
    let hasDuplicates = false;
    const str = num.toString();
    for (var i = 1; i < str.length; i++) {

        const nextDigit = str[i + 1];
        const previousDigit = str[i - 1];
        const prePreviusDigit = str[i - 2];
        
        if (str[i] === previousDigit 
            && ((i -2 >= 0) ? previousDigit != prePreviusDigit : true)
            && ((i + 1 < str.length ? str[i] != nextDigit : true ))
        ) {
            hasDuplicates = true;
            break;
        }
    }
    return hasDuplicates;
} 

