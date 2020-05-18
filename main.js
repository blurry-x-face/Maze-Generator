let cols, rows, current;
let cellWidth = 25;
let grid = [],
  stack = [];

function setup() {
  createCanvas(500, 500);
  cols = floor(width / cellWidth);
  rows = floor(height / cellWidth);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}

function draw() {
  background(0, 86, 153);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  let next = current.checkNeighbors();

  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

const index = (i, j) => {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
};

const removeWalls = (a, b) => {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
};

/* Code for Cell */

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    let neighbors = [];

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };

  this.highlight = function() {
    let x = this.i * cellWidth;
    let y = this.j * cellWidth;
    noStroke();
    fill(144, 21, 37, 160);
    rect(x, y, cellWidth, cellWidth);
  };

  this.show = function() {
    let x = this.i * cellWidth;
    let y = this.j * cellWidth;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + cellWidth, y);
    }
    if (this.walls[1]) {
      line(x + cellWidth, y, x + cellWidth, y + cellWidth);
    }
    if (this.walls[2]) {
      line(x + cellWidth, y + cellWidth, x, y + cellWidth);
    }
    if (this.walls[3]) {
      line(x, y + cellWidth, x, y);
    }
    if (this.visited) {
      noStroke();
      fill(14, 183, 189, 41);
      rect(x, y, cellWidth, cellWidth);
    }
  };
}
