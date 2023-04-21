export const pipe = (...fns) => fns.reduce((f, g) => (...xs) => f(g(...xs)));

export const prop = k => o => o[k];

export const fst = prop(0);

export const last = arr => arr.at(-1);

export const add = x => y => x + y;

export const assign = target => source => Object.assign({}, target, source);

export const rndNum = ({ max = 10, min = 0 } = { max: 10, min: 0 }) => Math.floor(Math.random() * (max - min)) + min;

export const rndPoint = max => ({ x: rndNum({ max }), y: rndNum({ max }) });

export const rndBeanPos = (max, snake) => {
  const p = rndPoint(max);
  return snake.some(eqPos(p)) ? rndBeanPos(max, snake) : p;
};

export const eqPos = p1 => p2 => p1.x == p2.x && p1.y == p2.y;

export const pointToIndex = mapSize => p => p.x * mapSize + p.y;

export const toStyle = mapSize => i => ({ '--left': i % mapSize * mapSize, '--top': i % mapSize * mapSize });

export const childAt = children => i => children.item(i);

export const addToken = token => classList => classList.add(token);

export const setStyle = elem => o => {
  Object.entries(o).forEach(([k, v]) => elem.style.setProperty(k, v));
  return elem;
};

export const getMoveState = event => ({
  'ArrowUp': { axis: 'y', sign: -1 },
  'ArrowRight': { axis: 'x', sign: 1 },
  'ArrowDown': { axis: 'y', sign: 1 },
  'ArrowLeft': { axis: 'x', sign: -1 },
})[event.key];

export const copy = o => Object.assign({}, o);

export const movedPoint = move => p => ( Reflect.set(p, move.axis, p[move.axis] + move.sign) , p );

export const initState = () => ({
  timerId: null,
  mapSize: 20,
  move: { axis: 'x', sign: 1 },
  snake: [{ x: 1, y: 0 }, { x: 0, y: 0 }],
  bean: null,
});
