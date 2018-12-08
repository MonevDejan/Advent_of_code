//Puting string in array
let input = document.getElementById("string");
let arrayOfstrings = input.innerText.split(" ");



let value = arrayOfstrings[0];
let exactlyTwoOfAny = 0;
let exactlyThreeOfAny = 0;

// Putting chars in array from element
function sortedCharInArry(stringValue)
{
    let sortedCharInArry = stringValue.split("");
    sortedCharInArry.sort();
    return sortedCharInArry;
}

/* The logic here is to put every char from one input in array. 
Then to compare the charges for every input */
function checkForOneElement(valueOfArray)
{
    let countOftwo = 0;
    let countofThree = 0;
    let counter = 0;

    let arrayOfChar = sortedCharInArry(valueOfArray);

    //Comparing element with the rest of the array 
    for (let compare= 0; compare < arrayOfChar.length; compare++) 
    {
        // to avoid unnecessary cycle
        if(arrayOfChar[compare] === null) {continue;}

        for (let index = compare+1; index < arrayOfChar.length; index++) 
        {   
            //check for same element
            if((arrayOfChar[compare] === arrayOfChar[index]))
            { 
                counter +=1; 
                // to avoid double count for same element 
                arrayOfChar[index] = null; 
            }
        }
        // to accelerate the algorithm a little 
        switch(counter)
        { 
            case 0: { break;}
            case 1: { countOftwo += 1; counter = 0; break;}
            default: { countofThree+= 1; counter = 0; break;}
        }
    }
    // To increase the parameters for checksum
   if(countOftwo !==0) { exactlyTwoOfAny +=1;}
   if(countofThree !==0) { exactlyThreeOfAny +=1;}
}

function checkForSimilarId(someArray)
{
    let similarId =[];
    
    for (let compare = 0; compare < someArray.length; compare++) 
    {
        for (let index = compare+1; index < someArray.length; index++) 
        {
            let counter = 0;
            for (let i = 0; i < someArray[compare].length; i++) 
            {
                if(someArray[compare].charAt(i) === someArray[index].charAt(i))
                { counter +=1; }
                else { continue;}
            }
            if (counter === (someArray[compare].length -1 ))
            { 
                similarId.push(someArray[compare]);
                similarId.push(someArray[index]);
            }
            else { continue;}
        } 
    }
    return similarId;
}

for (let i = 0; i < arrayOfstrings.length; i++)
{
   checkForOneElement(arrayOfstrings[i]); 
}

let id = checkForSimilarId(arrayOfstrings);

input.innerText = `The sum is ${exactlyTwoOfAny*exactlyThreeOfAny}, and the box with similar id are ${id}}`;



