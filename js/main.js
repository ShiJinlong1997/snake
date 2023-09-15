import * as _ from './tool.js';

const mapElem = document.getElementById('map');
const state = _.initState();
const draw = token => R.pipe(_.pointToIndex(state.mapSize), R.prop(R.__, mapElem.children), R.prop('classList'), _.addToken(token));

function alive({ snake, dir, mapSize }) {
  const inMap = R.pipe(R.head, R.prop(_.Axis(dir)), _.inRange(mapSize));
  const eatenSelf = R.pipe( R.tail, R.any(R.equals( R.head(snake) )) );
  return R.both(inMap, R.complement(eatenSelf))(snake);
}

function updateTile() {
  Array.from(mapElem.children).forEach(child => child.className = '');
  state.snake.forEach(draw('snake'));
  draw(state.dir)(R.head(state.snake))
  draw('bean')(state.bean);
}

function gameOver() {
  clearInterval(state.timerId);
  state.timerId = null;
}

const snakeMoved = ({ snake, move }) => {
  const Head = R.pipe(R.head, R.clone, _.movedPoint(move));
  return [Head(snake), ...R.init(snake)];
};

function run() {
  const last = R.clone(R.last(state.snake));
  state.snake = snakeMoved(state);
  
  if (!alive(state)) {
    gameOver();
    return;
  }
  
  const eaten = R.pipe(R.head, R.equals(state.bean));
  if (eaten(state.snake)) {
    state.snake = [...state.snake, last];
    state.bean = _.rndBeanPos(state.mapSize, state.snake);
  }

  updateTile();
}

const createTiles = (n, frag = document.createDocumentFragment(), i = 0) => {
  frag.appendChild( document.createElement('div') );
  return n <= i + 1 ? frag : createTiles(n, frag, ++i);
}

function main() {
  addEventListener('keyup', event => {
    state.move = _.MoveState(event.key);
    state.dir = _.Dir(event.key);
  });
  mapElem.appendChild( createTiles(state.mapSize * state.mapSize) );
  state.bean = _.rndBeanPos(state.mapSize, state.snake);
  state.timerId = setInterval(run, 200);
}

main();
