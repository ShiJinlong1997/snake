export const pipe = (...fns) => fns.reduce((f, g) => (...xs) => g(f(...xs)));

export const prop = k => o => o[k];

export const fst = prop(0);

export const last = arr => arr.at(-1);

export const add = x => y => x + y;

export const assign = target => source => Object.assign({}, target, source);

export const inRange = max => n => 0 <= n && n < max;

export const rndNum = ({ max = 10, min = 0 } = { max: 10, min: 0 }) => Math.floor(Math.random() * (max - min)) + min;

export const rndPoint = max => ({ x: rndNum({ max }), y: rndNum({ max }) });

export const rndBeanPos = (max, snake) => {
  const p = rndPoint(max);
  return snake.some(eqPos(p)) ? rndBeanPos(max, snake) : p;
};

export const eqPos = p1 => p2 => p1.x == p2.x && p1.y == p2.y;

export const pointToIndex = mapSize => p => p.y * mapSize + p.x;

export const toStyle = ({ mapSize, tileSize }) => i => ({
  '--left': `${ Math.floor(i % mapSize * tileSize) }px`,
  '--top': `${ Math.floor(i / mapSize) * tileSize }px`,
});

export const childAt = children => i => children.item(i);

export const addToken = token => classList => classList.add(token);

export const setStyle = o => elem => {
  Object.entries(o).forEach(([k, v]) => elem.style.setProperty(k, v));
  return elem;
};

export const getMoveState = event => ({
  'ArrowUp': { axis: 'y', sign: -1, dir: 'up' },
  'ArrowRight': { axis: 'x', sign: 1, dir: 'right' },
  'ArrowDown': { axis: 'y', sign: 1, dir: 'down' },
  'ArrowLeft': { axis: 'x', sign: -1, dir: 'left' },
})[event.key];

export const copy = o => Object.assign({}, o);

export const movedPoint = move => p => (p[move.axis] += move.sign, p);

export const initState = () => ({
  timerId: null,
  mapSize: 10,
  tileSize: 20,
  move: { axis: 'x', sign: 1, dir: 'right' },
  snake: [{ x: 1, y: 0 }, { x: 0, y: 0 }],
  bean: null,
});
