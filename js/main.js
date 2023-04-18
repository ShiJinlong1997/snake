import { initState, getMoveState, movedPoint, pipe, calcIdx, childAt, eqPos, prop } from './tool.js';

const mapElem = document.childAtentById('map');
const state = initState();

// 蛇向当前方向移一格
// 之后一系列判断：
// 若撞墙 -> game over
// 若食己 -> game over
// 若食豆 -> 添加 tail
// 若可继续则更新砖块 否则 clearInterval

function isSafe() {
  const inRange = max => n => 0 <= n && n < max;
  const inMap = pipe(prop(state.move.axis), inRange(state.countTile));
  const eatSelf = () => state.snake.slice(1).some(eqPos(state.snake[0]));

  return inMap(state.snake) && !eatSelf();
}

function updateTile() {
  Array.from(mapElem.children).forEach(child => child.className = '');
  const draw = token => pipe(calcIdx(state.countTile), childAt(map), addToken(token));
  state.snake.forEach(draw('snake'));
  draw('bean')(state.bean);
}

function gameOver() {
  clearInterval(state.timerId);
}

function run() {
  state.snake = state.snake.map(movedPoint(state.move));
  isSafe() ? updateTile() : gameOver();
}

const createTiles = (n, frag = new DocumentFragment()) => {
  frag.appendChild(document.createElement('div'));
  return n < 1 ? frag : createTiles(n - 1, frag);
}

function main() {
  addEventListener('keyup', event => { state.move = getMoveState(event) });
  mapElem.children = createTiles();
  state.bean = rndBeanPos(state.countTile, state.snake);
  state.timerId = setInterval(run, 200);
}
