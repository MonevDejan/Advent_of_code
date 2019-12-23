const input = `.#......#...#.....#..#......#..##..#
..#.......#..........#..##.##.......
##......#.#..#..#..##...#.##.###....
..#........#...........#.......##...
.##.....#.......#........#..#.#.....
.#...#...#.....#.##.......#...#....#
#...#..##....#....#......#..........
....#......#.#.....#..#...#......#..
......###.......#..........#.##.#...
#......#..#.....#..#......#..#..####
.##...##......##..#####.......##....
.....#...#.........#........#....#..
....##.....#...#........#.##..#....#
....#........#.###.#........#...#..#
....#..#.#.##....#.........#.....#.#
##....###....##..#..#........#......
.....#.#.........#.......#....#....#
.###.....#....#.#......#...##.##....
...##...##....##.........#...#......
.....#....##....#..#.#.#...##.#...#.
#...#.#.#.#..##.#...#..#..#..#......
......#...#...#.#.....#.#.....#.####
..........#..................#.#.##.
....#....#....#...#..#....#.....#...
.#####..####........#...............
#....#.#..#..#....##......#...#.....
...####....#..#......#.#...##.....#.
..##....#.###.##.#.##.#.....#......#
....#.####...#......###.....##......
.#.....#....#......#..#..#.#..#.....
..#.......#...#........#.##...#.....
#.....####.#..........#.#.......#...
..##..#..#.....#.#.........#..#.#.##
.........#..........##.#.##.......##
#..#.....#....#....#.#.......####..#
..............#.#...........##.#.#..`

const asteroids = []
input.split('\n')
  .forEach((rowElement, indexRow) => rowElement
    .split('')
    .forEach((columnElement, indexColumn) => {
      if (columnElement === '#') {
        const point = {
          x: indexColumn,
          y: indexRow === 0 ? indexRow : (indexRow * -1)
        }
        asteroids.push(point);
      }
    }))

const degree = (point, centerPoint) => {
  let rad = Math.atan2(point.y - centerPoint.y, point.x - centerPoint.x);
  rad < 0 ? rad = (Math.PI + rad) + Math.PI : rad;
  const degree = rad * 180 / Math.PI;
  return degree;
};

const distance = (point, centerPoint) => {
  const a = Math.abs(point.x - centerPoint.x);
  const b = Math.abs(point.y - centerPoint.y);
  return Math.sqrt(a ** 2 + b ** 2);
}

const sortBy = (expresion, order) => (value1, value2) => {
  value1 = expresion(value1)
  value2 = expresion(value2)
  if (order === "acc") {
    return value1 < value2 ? -1 : value1 > value2 ? 1 : 0
  }
  if (order === "dec") {
    return value1 > value2 ? -1 : value1 < value2 ? 1 : 0
  }
}

function puzzlePart1(asteroids) {
  const visableAsteroids = asteroids.map(centerAsteroid => {
    const remainingAsteroids = asteroids.filter(asteroid => asteroid !== centerAsteroid);
    const asteroidsCount = new Set(remainingAsteroids.map(x => degree(x, centerAsteroid))).size
    return { centerAsteroid, asteroidsCount }
  })
  const maxAsteroids = visableAsteroids.reduce(
    (p, v) => (p.asteroidsCount > v.asteroidsCount ? p : v),
    { asteroidsCount: 0 }
  )
  return maxAsteroids
}

function puzzlePart2(asteroids, laserLocation, indexToFind) {
  const angles = asteroids
    .filter(asteroid => asteroid !== laserLocation)
    .map(p => {
      const angleDeg = degree(p, laserLocation)
      return {
        angle: angleDeg,
        distance: distance(p, laserLocation),
        point: p
      }
    })
    .sort(sortBy(p => p.angle, "dec"));

  const to90gegree = [];
  const above90degree = [];

  angles.reduce((point, value) => {
    if (point.length === 0) {
      point[0] = [value];
    } else if (point[point.length - 1][0].angle === value.angle) {
      point[point.length - 1].push(value);
    } else {
      point.push([value]);
    }
    return point
  }, [])
    .map(x => x.slice().sort(sortBy(x => x.distance, "dec")))
    .forEach(x => {
      x[0].angle <= 90 ? to90gegree.push(x) : above90degree.push(x)
    });

  const order = to90gegree.concat(above90degree);
  const asteroidsToDestroy = []
  for (let i = 0; i < angles.length; ++i) {
    const value = order[i % order.length].pop()
    if (value) asteroidsToDestroy.push(value)
  }

  const toFind = asteroidsToDestroy[indexToFind - 1]
  return toFind.point.x * 100 + Math.abs(toFind.point.y);
}

const part1Answer = puzzlePart1(asteroids);
console.log(part1Answer.asteroidsCount)
console.log(puzzlePart2(asteroids, part1Answer.centerAsteroid, 200));