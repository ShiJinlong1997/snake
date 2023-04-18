export const pipe = (...fns) => fns.reduce((f, g) => (...xs) => f(g(...xs)));

export const rndNum = ({ max = 10, min = 0 } = { max: 10, min: 0 }) => Math.floor(Math.random() * (max - min)) + min;

export const rndPoint = max => ({ x: rndNum({ max }), y: rndNum({ max }) });

export const rndBeanPoint = (max, snake) => {
  const p = rndPoint(max);
  return snake.some(eqPos(p)) ? rndBeanPoint(max, snake) : p;
};

export const eqPos = p1 => p2 => p1.x == p2.x && p1.y == p2.y;

export const calcIdx = count => p => p.x * count + p.y;

export const childAt = elem => i => elem.children.item(i);

export const addToken = token => elem => elem.classList.add(token);

export const getDir = event => ({
  'ArrowUp': { axis: 'y', sign: -1 },
  'ArrowRight': { axis: 'x', sign: 1 },
  'ArrowDown': { axis: 'y', sign: 1 },
  'ArrowLeft': { axis: 'x', sign: -1 },
})[event.key];

export const movedPoint = dir => p => Object.assign({}, p, { [dir.axis]: p[dir.axis] + dir.sign });

export const initState = () => ({
  countTile: 20,
  dir: { axis: 'x', sign: 1 },
  snake: [{ x: 2, y: 1 }, { x: 1, y: 1 }],
  bean: null,
});
