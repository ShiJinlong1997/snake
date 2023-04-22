import * as _ from './tool.js';

const mapElem = document.getElementById('map');
const state = _.initState();
const draw = token => _.pipe(_.pointToIndex(state.mapSize), _.childAt(mapElem.children), _.prop('classList'), _.addToken(token));

function alive(snake) {
  const inMap = _.pipe(_.fst, _.prop(state.move.axis), _.inRange(state.mapSize));
  const eatSelf = _.pipe(_.fst, _.eqPos);

  return inMap(snake) && !snake.slice(1).some( eatSelf(snake) );
}

function updateTile() {
  Array.from(mapElem.children).forEach(child => child.className = '');
  state.snake.forEach(draw('snake'));
  draw(state.move.dir)(_.fst(state.snake))
  draw('bean')(state.bean);
}

function gameOver() {
  clearInterval(state.timerId);
  state.timerId = null;
}

const snakeMoved = snake => {
  const newHead = _.pipe(_.fst, _.copy, _.movedPoint(state.move));
  return [newHead(snake), ...snake.slice(0, -1).map(_.copy)];
};

function run() {
  const last = _.copy(_.last(state.snake));
  state.snake = snakeMoved(state.snake);
  
  if (!alive(state.snake)) {
    gameOver();
    return;
  }
  
  const eaten = _.pipe(_.fst, _.eqPos(state.bean));
  if (eaten(state.snake)) {
    state.snake = [...state.snake, last];
    state.bean = _.rndBeanPos(state.mapSize, state.snake);
  }

  updateTile();
}

// const addStyleTo = _.pipe(_.toStyle(state), _.setStyle);

const createTiles = (n, frag = document.createDocumentFragment(), i = 0) => {
  frag.appendChild( document.createElement('div') );
  return n <= i + 1 ? frag : createTiles(n, frag, ++i);
}

function main() {
  addEventListener('keyup', event => { state.move = _.getMoveState(event) });
  mapElem.appendChild( createTiles(state.mapSize * state.mapSize) );
  state.bean = _.rndBeanPos(state.mapSize, state.snake);
  state.timerId = setInterval(run, 200);
}

main();
