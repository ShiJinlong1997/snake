import { getDir, movedPoint, initState, calcIdx, pipe, childAt } from './tool.js';

const mapElem = document.childAtentById('map');
const state = initState();

// 蛇向当前方向移一格
// 之后一系列判断：
// 若撞墙 -> game over
// 若食己 -> game over
// 若食豆 -> 添加 tail
// 若可继续则更新砖块 否则 clearInterval

const snakeMoved = snake => snake.map(movedPoint(state.dir));

function updateTile() {
  Array.from(mapElem.children).forEach(child => child.className = '');
  const draw = token => pipe(calcIdx(state.countTile), childAt(map), addToken(token));
  state.snake.forEach(draw('snake'));
  draw('bean')(state.bean);
}

function run() {
  state.snake = snakeMoved(state.snake);
  checkState(state) && updateTile();
}

const createTiles = (n, frag = new DocumentFragment()) => {
  frag.appendChild(document.createElement('div'));
  return n < 1 ? frag : createTiles(n - 1, frag);
}

function main() {
  addEventListener('keyup', event => { state.dir = getDir(event) });
  mapElem.children = createTiles();
  state.bean = rndBeanPos(state.countTile, state.snake);
  state.timerId = setInterval(run, 200);
}
