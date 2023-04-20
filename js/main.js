import { initState, getMoveState, movedPoint, pipe, pToI, add, rename, childAt, eqPos, prop, iToP } from './tool.js';

const mapElem = document.childAtentById('map');
const state = initState();

// 蛇向当前方向移一格
// 之后一系列判断：
// 若撞墙 -> game over
// 若食己 -> game over
// 若食豆 -> 添加 tail
// 若可继续则更新砖块 否则 clearInterval

function eat() {}

function alive() {
  const inRange = max => n => 0 <= n && n < max;
  const inMap = pipe(prop(state.move.axis), inRange(state.countTile));
  const eatSelf = () => state.snake.slice(1).some(eqPos(state.snake[0]));

  return inMap(state.snake) && !eatSelf();
}

function updateTile() {
  Array.from(mapElem.children).forEach(child => child.className = '');
  const draw = token => pipe(pToI(state.countTile), childAt(map), addToken(token));
  state.snake.forEach(draw('snake'));
  draw('bean')(state.bean);
}

function gameOver() {
  clearInterval(state.timerId);
}

function run() {
  state.snake = state.snake.map(movedPoint(state.move));
  if (!alive()) {
    gameOver();
    return;
  }
  
  // 蛇头位置同 bean 则 蛇添加一节，再生成食物
  if (eqPos(state.bean)(state.snake[0])) {
    state.snake.push();
    state.bean = rndBeanPos(state.countTile, state.snake);
  }
    updateTile();
}

const createTile = pipe(
  add(-1),
  iToP(state.countTile),
  rename({ x: 'left', y: 'top' }),
  setStyle(document.createElement('div'))
);

const createTiles = (n, frag = new DocumentFragment()) => {
  frag.appendChild(createTile(n));
  return n < 1 ? frag : createTiles(n - 1, frag);
}

function main() {
  addEventListener('keyup', event => { state.move = getMoveState(event) });
  mapElem.children = createTiles(state.countTile * state.countTile);
  state.bean = rndBeanPos(state.countTile, state.snake);
  state.timerId = setInterval(run, 200);
}
