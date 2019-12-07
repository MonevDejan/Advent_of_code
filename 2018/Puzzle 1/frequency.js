
let numbersAsString = document.getElementById("string").innerText;
let arrayOfnumbers = numbersAsString.split(" ");

// calculating the sum
let sum1 = 0;
for (let i = 0; i < arrayOfnumbers.length; i++) 
{
    arrayOfnumbers[i] = parseInt(arrayOfnumbers[i]);
    sum1 += arrayOfnumbers[i];
}

sum = 0;
let arrayNew = [];
let frequency = 0;

/*  Finding the first frequency that is reached twice 
    The logic here is to put sum in new array, then compare 
    the element witht he rest of the array.
    Because of this logic, it will take some time to load the page :)
*/

for (let index = 0; index < arrayOfnumbers.length; index++) 
{
    sum += arrayOfnumbers[index];
    arrayNew.push(sum);
    for (let compare = 0; compare < arrayNew.length-1; compare++)
    {
        if (arrayNew[arrayNew.length-1] === arrayNew[compare])
        {
            frequency =  arrayNew[compare];
            break;
        }
    }
    // to break the cycle if the frequency is found
    if(frequency !== 0)
    {
        break;
    }

    // to reset the cycle if frequency is not found
    if(index === arrayOfnumbers.length-1)
    {
        index = -1;
    }
}

document.getElementById("string").innerText = `sum is ${sum1}, frequency is ${frequency}`;

