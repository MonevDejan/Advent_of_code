
function creatingObject(string)
{
    string.trim();
    // spliting string with difrent values and puting parametars in array
    let valuesOfstring =string.split('@').join(',').split(' ').join('').split('x').join(',').split(':').join(',').split(','); // K'lbasa :D :D :D
    let parametars = 
    {
        id:  parseInt(valuesOfstring[0]),
        LeftEdge: parseInt(valuesOfstring[1]),
        Topedge: parseInt(valuesOfstring[2]),
        wide: parseInt(valuesOfstring[3]),
        long: parseInt(valuesOfstring[4]),
        
        // we need this function to determine the size of the main array
        maxwidth: function() { return this.LeftEdge + this.wide },
        maxheight: function () { return this.Topedge + this.long}
    }
    return parametars;
}

function objectsInArry(someArry)
{
    let arrayOfobject =[];
    for (let counter = 0; counter < someArry.length; counter++) 
    {
        arrayOfobject[counter] = creatingObject(someArry[counter]);
    }
    return arrayOfobject;
}
// Create matrix with null values
function creatematrix( width, height)
{
    let matrix = [];
    for (let i = 0; i <  width; i++) 
    {
        let helparry = [];
        for (let j = 0; j < height; j++) 
        {
            helparry.push(null);
        }
        matrix[i] = helparry; 
    }
    return matrix;
}
// Marking squares with 0, marking overlapped squares with 1
function markingSquares(leftEdge, Topedge, wide, long, matrix)
{
    for (let i = leftEdge; i < (leftEdge +  wide); i++) 
    {
        for (let j = Topedge; j <(Topedge +  long); j++) 
        {
            if(matrix[i][j] !== null) {matrix[i][j] = 1;}
            else{ matrix[i][j] = 0; }  
        }
    }
    return matrix;
}
// sum all the elements with value 1
function sumOfOverlapingSquares (somematrix)
{
    let sum = 0;
    for (let i = 0; i < somematrix.length; i++) 
    {
        for (let j = 0; j < somematrix[0].length; j++) 
        {
            if(somematrix[i][j] !== null)
            { sum += somematrix[i][j]; }
        }
    }
    return sum;
}

function individualFabricSum(leftEdge, Topedge, wide, long, matrix)
{
    let sum = 0;

    for (let i = leftEdge; i < (leftEdge +  wide); i++) 
    {
        for (let j = Topedge; j <(Topedge +  long); j++) 
        {
            sum += matrix[i][j];  
        }
    }
    return sum;
}


let input = document.getElementById("string");
let arrayOfstrings = input.innerText.split("#");
let objectArry = objectsInArry(arrayOfstrings);

let wideDimension = 0;
let longDimension = 0;

// calculating the dimension of the main matrix
for (let i = 0; i < objectArry.length; i++) 
{
    if(wideDimension < objectArry[i].maxwidth())
    { wideDimension = objectArry[i].maxwidth()}
    
    if(longDimension < objectArry[i].maxheight() )
    { longDimension = objectArry[i].maxheight() }
}

let maxMatrix = creatematrix(wideDimension, longDimension);


for (let i = 0; i < objectArry.length; i++) 
{
   maxMatrix = markingSquares(objectArry[i].LeftEdge, objectArry[i].Topedge, objectArry[i].wide, objectArry[i].long, maxMatrix);
}

let sum = sumOfOverlapingSquares(maxMatrix);

let nonTouchingFabric = 0;

for (let i = 0; i < objectArry.length; i++) 
{
  let sum1 = individualFabricSum(objectArry[i].LeftEdge, objectArry[i].Topedge, objectArry[i].wide, objectArry[i].long, maxMatrix);
  if (sum1 === 0) { nonTouchingFabric = objectArry[i].id }
}

document.getElementById("string").innerText = `The sum of overlaping squares is ${sum} and id of fabric is ${nonTouchingFabric}`;

