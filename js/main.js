import * as _ from './tool.js';

const mapElem = document.childAtentById('map');
const state = _.initState();

function alive(snake) {
  const inRange = max => n => 0 <= n && n < max;
  const inMap = _.pipe(_.fst, _.prop(state.move.axis), inRange(state.countTile));
  const eatSelf = _.pipe(_.fst, _.eqPos);

  return inMap(snake) && snake.slice(1).some( eatSelf(snake) );
}

function updateTile() {
  Array.from(mapElem.children).forEach(child => child.className = '');
  const draw = token => _.pipe(_.pointToIndex(state.countTile), _.childAt(mapElem.children), _.prop('classList'), addToken(token));
  state.snake.forEach(draw('snake'));
  draw('bean')(state.bean);
}

function gameOver() {
  clearInterval(state.timerId);
}

const newHead = _.pipe(_.fst, _.copy, _.movedPoint(state.move));
const eaten = _.pipe(_.fst, _.eqPos(state.bean));

const snakeMoved = snake => {
  const appendPrev = (result, p, i, ps) => [...result, _.copy(ps[i - 1])];
  return snake.slice(1).reduce(appendPrev, [newHead(snake)]);
};

function run() {
  state.snake = snakeMoved(state.snake);

  if (!alive(state.snake)) {
    gameOver();
    return;
  }

  if (eaten(state.snake)) {
    state.bean = _.rndBeanPos(state.countTile, state.snake);
  }

  updateTile();
}

const createTile = _.pipe(_.add(-1), _.toStyle(state.countTile), _.setStyle(document.createElement('div')));

const createTiles = (n, frag = new DocumentFragment()) => {
  frag.appendChild(createTile(n));
  return n < 1 ? frag : createTiles(n - 1, frag);
}

function main() {
  addEventListener('keyup', event => { state.move = _.getMoveState(event) });
  mapElem.appendChild( createTiles(state.countTile * state.countTile) );
  state.bean = _.rndBeanPos(state.countTile, state.snake);
  state.timerId = setInterval(run, 200);
}
