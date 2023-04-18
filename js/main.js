import { getDir, movedPoint, initState } from './tool.js';

const mapElem = document.getElementById('map');
const state = initState();

// 蛇向当前方向移一格
// 之后一系列判断：
// 若撞墙 -> game over
// 若食己 -> game over
// 若食豆 -> 添加 tail

const snakeMoved = snake => snake.map(movedPoint(state.dir));

function updateTile() {
  const calcIdx = (count, p) => (p.x % count - 1) + (p.y % count - 1);
  state.snake.forEach(p => {
    mapElem.children.item(calcIdx(p)).classList.add('snake');
  });

  mapElem.children.item(calcIdx(state.bean)).classList
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
