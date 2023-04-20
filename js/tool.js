export const pipe = (...fns) => fns.reduce((f, g) => (...xs) => f(g(...xs)));

export const prop = k => o => o[k];

export const add = x => y => x + y;

export const assign = target => source => Object.assign({}, target, source);

export const rename = kMap => o => Object.entries(o).reduce((result, [oldK, v]) => {
  const selectK = (kMap, oldK) => Reflect.get(kMap, oldK) || oldK;
  const toPair = v => k => ({ [k]: v });
  return pipe(selectK, toPair(v), assign(result))(kMap, oldK);
}, {});

export const rndNum = ({ max = 10, min = 0 } = { max: 10, min: 0 }) => Math.floor(Math.random() * (max - min)) + min;

export const rndPoint = max => ({ x: rndNum({ max }), y: rndNum({ max }) });

export const rndBeanPoint = (max, snake) => {
  const p = rndPoint(max);
  return snake.some(eqPos(p)) ? rndBeanPoint(max, snake) : p;
};

export const eqPos = p1 => p2 => p1.x == p2.x && p1.y == p2.y;

export const pToI = count => p => p.x * count + p.y;

export const iToP = count => i => ({ x: i % count * count, y: i % count * count });

export const childAt = elem => i => elem.children.item(i);

export const addToken = token => elem => elem.classList.add(token);

export const setStyle = o => elem => {
  Object.entries(o).forEach(([k, v]) => elem.style.setProperty(k, v));
  return elem;
};

export const getMoveState = event => ({
  'ArrowUp': { axis: 'y', sign: -1 },
  'ArrowRight': { axis: 'x', sign: 1 },
  'ArrowDown': { axis: 'y', sign: 1 },
  'ArrowLeft': { axis: 'x', sign: -1 },
})[event.key];

const axisMoved = move => p => ( Reflect.set(p, move.axis, p[move.axis] + move.sign) , p );

const copy = o => Object.assign({}, o);

export const movedPoint = move => pipe(copy, axisMoved(move));

export const initState = () => ({
  timerId: null,
  countTile: 20,
  move: { axis: 'x', sign: 1 },
  snake: [{ x: 1, y: 0 }, { x: 0, y: 0 }],
  bean: null,
});
