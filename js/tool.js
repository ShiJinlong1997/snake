export const inRange = max => n => 0 <= n && n < max;

export const rndNum = ({ max = 10, min = 0 } = { max: 10, min: 0 }) => Math.floor(Math.random() * (max - min)) + min;

export const rndPoint = max => ({ x: rndNum({ max }), y: rndNum({ max }) });

export const rndBeanPos = (max, snake) => {
  const p = rndPoint(max);
  return R.any(R.equals(p), snake) ? rndBeanPos(max, snake) : p;
};

export const pointToIndex = mapSize => p => p.y * mapSize + p.x;

export const toStyle = ({ mapSize, tileSize }) => i => ({
  '--left': `${ Math.floor(i % mapSize * tileSize) }px`,
  '--top': `${ Math.floor(i / mapSize) * tileSize }px`,
});

export const addToken = token => classList => classList.add(token);

export const movedPoint = move => R.mapObjIndexed((v, k) => v + move[k]);

export const MoveState = R.prop(R.__, {
  ArrowUp: { y: -1, x: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowDown: { y: 1, x: 0 },
  ArrowLeft: { x: -1, y: 0 },
});

export const Dir = R.prop(R.__, {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',
});

export const Axis = R.prop(R.__, {
  left: 'x', right: 'x',
  up: 'y', down: 'y',
});

export const initState = () => ({
  timerId: null,
  mapSize: 10,
  tileSize: 20,
  move: { x: 1, y: 0 },
  dir: 'right',
  snake: [{ x: 1, y: 0 }, { x: 0, y: 0 }],
  bean: null,
});
