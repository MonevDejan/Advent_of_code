const input = `<x=3, y=2, z=-6>
<x=-13, y=18, z=10>
<x=-8, y=-1, z=13>
<x=5, y=10, z=4>`;

const RegCoordinates = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;

const moons = input.split('\n').map(moon => {
    const moonValues = [...moon.match(RegCoordinates).slice(1).map(Number)];
    return {
        posx: moonValues[0],
        posy: moonValues[1],
        posz: moonValues[2],

        velx: 0,
        vely: 0,
        velz: 0
    }
})

const evaluateMoon = (moonToCompare, moon) => {

    if (moonToCompare.posx !== moon.posx)
        moonToCompare.posx < moon.posx ? moonToCompare.velx += 1 : moonToCompare.velx -= 1;

    if (moonToCompare.posy !== moon.posy)
        moonToCompare.posy < moon.posy ? moonToCompare.vely += 1 : moonToCompare.vely -= 1;

    if (moonToCompare.posz !== moon.posz)
        moonToCompare.posz < moon.posz ? moonToCompare.velz += 1 : moonToCompare.velz -= 1;

}

const addVelocity = (moon) => {
    moon.posx += moon.velx;
    moon.posy += moon.vely;
    moon.posz += moon.velz;
}

const proceesStep = (moons) => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i === j) {
                continue;
            }
            evaluateMoon(moons[i], moons[j])
        }
    }
    for (let i = 0; i < moons.length; i++) {
        addVelocity(moons[i]);
    }
}

// const proceesStep = (moons) => {
//     moons.forEach(moonToCompare => {
//         const remainingMoons = moons.filter(moon => moon !== moonToCompare);
//         remainingMoons.forEach(moon => evaluateMoon(moonToCompare, moon));
//     })

//     moons.forEach(moon => {
//         addVelocity(moon);
//     })
// }

const copyOfMoons1 = moons.map(moon => ({ ...moon }));

const totalEnergy = (moons) => {
    let sum = 0;
    moons.forEach(moon => {
        const potEnergy = Math.abs(moon.posx) + Math.abs(moon.posy) + Math.abs(moon.posz);
        const kinEnergy = Math.abs(moon.velx) + Math.abs(moon.vely) + Math.abs(moon.velz);
        sum += potEnergy * kinEnergy;
    })
    return sum;
}

const part1 = (steps, moons) => {
    for (let i = 0; i < steps; i++) {
        proceesStep(moons);
    }

    console.log(totalEnergy(moons));
}

part1(1000, copyOfMoons1);

const checkAxisX = (moons, firstPosition) => {
    for (let i = 0; i < moons.length; i++) {
        if (moons[i].posx !== firstPosition[i].posx || moons[i].velx !== firstPosition[i].velx) {
            return false;
        }
    }
    return true;
}

const checkAxisY = (moons, firstPosition) => {
    for (let i = 0; i < moons.length; i++) {
        if (moons[i].posy !== firstPosition[i].posy || moons[i].vely !== firstPosition[i].vely) {
            return false;
        }
    }
    return true;
}

const checkAxisZ = (moons, firstPosition) => {
    for (let i = 0; i < moons.length; i++) {
        if (moons[i].posz !== firstPosition[i].posz || moons[i].velz !== firstPosition[i].velz) {
            return false;
        }
    }
    return true;
}

const getPeriodes = (moons, firstPosition) => {

    let steps = 0;
    let periodX = 0;
    let periodY = 0;
    let periodZ = 0;

    while (true) {
        steps += 1;
        proceesStep(moons);

        if (checkAxisX(moons, firstPosition) && periodX === 0) {
            periodX = steps;
        }
        if (checkAxisY(moons, firstPosition) && periodY === 0) {
            periodY = steps;
        }
        if (checkAxisZ(moons, firstPosition) && periodZ === 0) {
            periodZ = steps;
        }
        if (periodX && periodY && periodZ) {
            return [periodX, periodY, periodZ];
        }
    }
}

function greatestCommonDivisor(value1, value2) {
    while (value2) {
        const temp = value2;
        value2 = value1 % value2;
        value1 = temp;
    }
    return value1;
}

function LeastCommonMultiple(value1, value2) {
    return value1 / greatestCommonDivisor(value1, value2) * value2;
}

const part2 = (moons, firstPosition) => {
    const periodes = getPeriodes(moons, firstPosition);
    const lcm1 = LeastCommonMultiple(periodes[0], periodes[1]);
    const result = LeastCommonMultiple(lcm1, periodes[2])
    console.log(result);
}

const copyOfMoons2 = moons.map(moon => ({ ...moon }));

part2(copyOfMoons2, moons);
