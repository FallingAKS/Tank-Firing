let Tank;
let Bullet;
let Page;
let Ground;

const wb = 20;
const hb = 10;

let v;

const npcNum = parseInt(window.localStorage.getItem('npcNum'));
const difficulty = parseInt(window.localStorage.getItem('difficulty'));

let blackDiedNum = 0;

let newX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let newY = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let oldX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let oldY = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let direction = [0, 0, 0, 0, 0, 0, 0, 0, 0];

let redX = 0;
let redY = 0;

Tank = function () {
  let thisTank = this;
  let canvas;
  let x;
  let y;
  let f;
  let color;
  let bulletCount;
  let lastFireTime;
  let died;
  this.init = function (_canvas, _x, _y, _f, _color) {
    canvas = _canvas;
    x = _x;
    y = _y;
    f = _f;
    color = _color;
    bulletCount = 5;
    died = false;
    lastFireTime = new Date().getTime();
    return this;
  }
  this.getPos = function () {
    return {x: x, y: y};
  }
  this.setPos = function (xx, yy) {
    x = xx;
    y = yy;
  }
  this.draw = function (rg) {
    let ctx = canvas.getContext('2d');
    let t = rg({x: x, y: y});
    let ff = f - Math.PI / 2;
    ctx.rotate(-ff);
    let tcos = Math.cos(ff);
    let tsin = Math.sin(ff);
    if (color == 'red') {
      ctx.fillStyle = 'rgb(250,80,80)';
    } else {
      ctx.fillStyle = 'rgb(0,0,0)';
    }
    // ctx.fillRect(t.x * tcos - t.y * tsin - 7, t.x * tsin + t.y * tcos - 10, 14, 20);
    // ctx.fillRect(t.x * tcos - t.y * tsin - 2, t.x * tsin + t.y * tcos - 16, 4, 6);
    ctx.fillRect(t.x * tcos - t.y * tsin - 14, t.x * tsin + t.y * tcos - 20, 28, 40);
    ctx.fillRect(t.x * tcos - t.y * tsin - 4, t.x * tsin + t.y * tcos - 32, 8, 12);
    if (died) {
      ctx.fillStyle = 'rgb(250,250,230)';
      ctx.fillRect(t.x * tcos - t.y * tsin - 15, t.x * tsin + t.y * tcos - 21, 30, 42);
      ctx.fillRect(t.x * tcos - t.y * tsin - 5, t.x * tsin + t.y * tcos - 33, 10, 14);
    }
    ctx.rotate(ff);
  }
  this.die = function () {
    died = true;
  }
  this.move = function (rv, tl, tr, tg, tb) {
    if (died) return;
    let v = rv({x: x, y: y});
    if (tl && !tr) {
      f += Math.PI / 36;
    } else if (tr && !tl) {
      f -= Math.PI / 36;
    }

    // Normalize f to be within 0 to 2*Math.PI
    f = f % (2 * Math.PI);

    // If f is negative, convert it to a positive equivalent
    if (f < 0) {
      f += 2 * Math.PI;
    }

    let np;
    if (tg && !tb) {
      np = {x: x + Math.cos(f) / 22, y: y - Math.sin(f) / 22};
    } else if (tb && !tg) {
      np = {x: x - Math.cos(f) / 28, y: y + Math.sin(f) / 28};
    } else {
      np = {x: x, y: y};
    }
    if (Math.floor(x - 0.25) < Math.floor(x)) {
      v.t = v.t || rv({x: x, y: y - 1}).l || rv({x: x - 1, y: y}).t;
      v.b = v.b || rv({x: x, y: y + 1}).l || rv({x: x - 1, y: y}).b;
    } else if (Math.floor(x + 0.25) > Math.floor(x)) {
      v.t = v.t || rv({x: x, y: y - 1}).r || rv({x: x + 1, y: y}).t;
      v.b = v.b || rv({x: x, y: y + 1}).r || rv({x: x + 1, y: y}).b;
    }
    if (Math.floor(y - 0.25) < Math.floor(y)) {
      v.l = v.l || rv({x: x - 1, y: y}).t || rv({x: x, y: y - 1}).l;
      v.r = v.r || rv({x: x + 1, y: y}).t || rv({x: x, y: y - 1}).r;
    } else if (Math.floor(y + 0.25) > Math.floor(y)) {
      v.l = v.l || rv({x: x - 1, y: y}).b || rv({x: x, y: y + 1}).l;
      v.r = v.r || rv({x: x + 1, y: y}).b || rv({x: x, y: y + 1}).r;
    }
    if (v.l && Math.floor(x - 0.3) < Math.floor(x)) {
      np.x = x + 1 / 30;
    } else if (v.r && Math.floor(x + 0.3) > Math.floor(x)) {
      np.x = x - 1 / 30;
    }
    if (v.t && Math.floor(y - 0.3) < Math.floor(y)) {
      np.y = y + 1 / 30;
    } else if (v.b && Math.floor(y + 0.3) > Math.floor(y)) {
      np.y = y - 1 / 30;
    }
    x = np.x;
    y = np.y;
    oldX[iNumber] = newX[iNumber];
    oldY[iNumber] = newY[iNumber];
    newX[iNumber] = x;
    newY[iNumber] = y;
    direction[iNumber] = f;
  }
  this.fire = function (callback) {
    if (died) return;
    let thisFireTime = new Date().getTime();
    if (thisFireTime - lastFireTime > 200 && bulletCount > 0) {
      lastFireTime = thisFireTime;
      bulletCount--;
      callback(new Bullet().init(canvas, x + Math.cos(f) * 0.27, y - Math.sin(f) * 0.27, f, function () {
        bulletCount++;
      }));
    }
  }
}
Bullet = function () {
  let thisBullet = this;
  let canvas;
  let life = true;
  let x;
  let y;
  let f;
  let dis;
  let cb;
  this.init = function (_canvas, _x, _y, _f, _cb) {
    canvas = _canvas;
    x = _x;
    y = _y;
    f = _f;
    cb = _cb;
    dis = 50;
    return this;
  }
  this.move = function (rv) {
    if (!life) return;
    let v = rv({x: x, y: y});
    let np = {x: x + Math.cos(f) / 22, y: y - Math.sin(f) / 22};
    dis -= 1 / 15;
    if (v.l == null || dis < 0) {
      life = false;
      cb();
      return;
    }
    const tp = 0.075;
    if (Math.floor(x - tp / 2) < Math.floor(x)) {
      v.t = v.t || rv({x: x, y: y - 1}).l || rv({x: x - 1, y: y}).t;
      v.b = v.b || rv({x: x, y: y + 1}).l || rv({x: x - 1, y: y}).b;
    } else if (Math.floor(x + tp / 2) > Math.floor(x)) {
      v.t = v.t || rv({x: x, y: y - 1}).r || rv({x: x + 1, y: y}).t;
      v.b = v.b || rv({x: x, y: y + 1}).r || rv({x: x + 1, y: y}).b;
    }
    if (Math.floor(y - tp / 2) < Math.floor(y)) {
      v.l = v.l || rv({x: x - 1, y: y}).t || rv({x: x, y: y - 1}).l;
      v.r = v.r || rv({x: x + 1, y: y}).t || rv({x: x, y: y - 1}).r;
    } else if (Math.floor(y + tp / 2) > Math.floor(y)) {
      v.l = v.l || rv({x: x - 1, y: y}).b || rv({x: x, y: y + 1}).l;
      v.r = v.r || rv({x: x + 1, y: y}).b || rv({x: x, y: y + 1}).r;
    }
    if (v.l && Math.floor(np.x - tp) < Math.floor(x)) {
      np.x = Math.floor(x) + tp;
      f = Math.PI - f;
    } else if (v.r && Math.floor(np.x + tp) > Math.floor(x)) {
      np.x = Math.floor(x) + 1 - tp;
      f = Math.PI - f;
    }
    if (v.t && Math.floor(np.y - tp) < Math.floor(y)) {
      np.y = Math.floor(y) + tp;
      f = -f;
    } else if (v.b && Math.floor(np.y + tp) > Math.floor(y)) {
      np.y = Math.floor(y) + 1 - tp;
      f = -f;
    }
    x = np.x;
    y = np.y;
  }
  this.draw = function (rg) {
    if (!life) return;
    let ctx = canvas.getContext('2d');
    let t = rg({x: x, y: y});
    ctx.beginPath();
    ctx.arc(t.x, t.y, 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fill();
  }
  this.hit = function (tank) {
    if (!life) return false;
    let v = tank.getPos();
    if (Math.sqrt((x - v.x) * (x - v.x) + (y - v.y) * (y - v.y)) < 0.3) {
      life = false;
      cb();
      tank.die();
      return true;
    }
    return false;
  };
}

let iNumber = 0;
let iMoves = [];
let iPeriod = [];

function bfs(startX, startY, endX, endY) {
  let queue = []; // 使用队列来存储访问的节点
  let visited = new Set(); // 使用集合来记录访问过的坐标
  let path = new Map(); // 用于记录路径

  // 初始化
  queue.push({x: startX, y: startY});
  visited.add(`${startX},${startY}`);
  path.set(`${startX},${startY}`, null); // 起始点没有前一个点

  // BFS
  while (queue.length > 0) {
    let {x, y} = queue.shift(); // 取出队列中的第一个元素

    // 如果到达终点，构建路径并返回
    if (x === endX && y === endY) {
      return buildPath(path, endX, endY);
    }

    // 查看四个方向的邻居
    let neighbors = [
      {x: x + 1, y: y, valid: !v[x][y].r},
      {x: x, y: y + 1, valid: !v[x][y].b},
      {x: x - 1, y: y, valid: x > 0 && !v[x - 1][y].r},
      {x: x, y: y - 1, valid: y > 0 && !v[x][y - 1].b}
    ];

    for (let neighbor of neighbors) {
      if (neighbor.valid && !visited.has(`${neighbor.x},${neighbor.y}`)) {
        queue.push({x: neighbor.x, y: neighbor.y});
        visited.add(`${neighbor.x},${neighbor.y}`);
        path.set(`${neighbor.x},${neighbor.y}`, {x, y}); // 记录路径
      }
    }
  }

  // 如果没有找到路径
  return null;
}

// 根据记录的前置节点构建路径
function buildPath(path, endX, endY) {
  let route = [];
  let current = {x: endX, y: endY};
  while (current) {
    route.unshift(current);
    current = path.get(`${current.x},${current.y}`);
  }
  return route;
}

function hardDirection(moves) {
  if (iPeriod[iNumber] !== undefined && iPeriod[iNumber] > 0) {
    switch (iMoves[iNumber]) {
      case 'go':
        moves.go = true;
        iPeriod[iNumber] -= 0.01;
        break;
      case 'back':
        moves.back = true;
        iPeriod[iNumber] -= 0.01;
        break;
      case 'left':
        moves.left = true;
        iPeriod[iNumber] -= 0.01;
        break;
      case 'right':
        moves.right = true;
        iPeriod[iNumber] -= 0.01;
        break;
      default:
        break;
    }
    return;
  }

  // console.log(redX, redY);
  let blackX = newX[iNumber];
  let blackY = newY[iNumber];

  // bfs
  let route = bfs(Math.floor(blackX), Math.floor(blackY), Math.floor(redX), Math.floor(redY));

  if (route && route.length > 2) {
    // 安全地获取第一步的坐标
    let nextX = route[1].x;
    let nextY = route[1].y;
    blackX = route[0].x;
    blackY = route[0].y;
    // console.log(nextX, nextY);
    // todo: 十八罗汉塔 前面的
    // todo: 十八罗汉塔 后面的
  } else {
    moves.fire = true;
    iPeriod[iNumber] = 0.1;
    // iPeriod[iNumber] = 0.01;
    iMoves[iNumber] = 'left';
  }
}

Ground = function () {
  let thisGround = this;
  let canvas;
  let x;
  let y;
  let width;
  let height;
  let rg;
  let rv;
  let redOne;
  let blackOnes = [];
  let bullets;
  let addBullet;
  let win;
  this.init = function (_canvas, _x, _y, _width, _height) {
    canvas = _canvas;
    x = _x;
    y = _y;
    width = _width;
    height = _height;
    v = [];
    for (let i = 0; i < wb; i++) {
      v[i] = [];
      for (let j = 0; j < hb; j++) {
        v[i][j] = {
          r: i == wb - 1 || Math.random() < 1 / 2,
          b: j == hb - 1 || Math.random() < 1 / 4,
        };
      }
    }
    let t1 = {x: Math.floor(Math.random() * wb), y: Math.floor(Math.random() * hb)};
    let t2s = [];

    for (let i = 0; i < npcNum; i++) {
      (function () {
        let q = [];
        for (let i = 0; i < wb; i++) {
          q[i] = [];
          for (let j = 0; j < hb; j++) {
            q[i][j] = false;
          }
        }
        let vt = [];
        let dfs = function (tx, ty) {
          if (q[tx][ty]) return;
          q[tx][ty] = true;
          vt.push({x: tx, y: ty});
          if (!v[tx][ty].r) dfs(tx + 1, ty);
          if (!v[tx][ty].b) dfs(tx, ty + 1);
          if (tx > 0 && !v[tx - 1][ty].r) dfs(tx - 1, ty);
          if (ty > 0 && !v[tx][ty - 1].b) dfs(tx, ty - 1);
        }
        dfs(t1.x, t1.y);
        t2s.push(vt[Math.floor(Math.random() * vt.length)]);
      })();
    }
    rg = function (vv) {
      return {x: x + (vv.x + 1) * width / (wb + 2), y: y + (vv.y + 1) * height / (hb + 2)};
    }
    rv = function (vv) {
      let hv = {x: Math.floor(vv.x), y: Math.floor(vv.y)};
      if (hv.x < 0 || hv.y < 0 || hv.x >= wb || hv.y >= hb) return {};
      return {
        l: hv.x == 0 || v[hv.x - 1][hv.y].r,
        r: v[hv.x][hv.y].r,
        t: hv.y == 0 || v[hv.x][hv.y - 1].b,
        b: v[hv.x][hv.y].b
      };
    }
    bullets = [];
    addBullet = function (bullet) {
      bullets.push(bullet);
    }
    redOne = new Tank().init(canvas, t1.x + 0.5, t1.y + 0.5, Math.random() * 2 * Math.PI, 'red');
    blackOnes = [];
    for (let i = 0; i < npcNum; i++) {
      blackOnes.push(new Tank().init(canvas, t2s[i].x + 0.5, t2s[i].y + 0.5, Math.random() * 2 * Math.PI, 'black'));
    }
    win = 'none';
    return this;
  }
  this.iswin = function () {
    return win;
  }
  this.draw = function (keys) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(250,250,230)';
    ctx.fillRect(x, y, width, height);
    ctx.beginPath();
    ctx.moveTo(x + width / (wb + 2), y + height / (hb + 2));
    ctx.lineTo(x + width - width / (wb + 2), y + height / (hb + 2));
    ctx.moveTo(x + width / (wb + 2), y + height / (hb + 2));
    ctx.lineTo(x + width / (wb + 2), y + height - height / (hb + 2));
    for (let i = 0; i < wb; i++) {
      for (let j = 0; j < hb; j++) {
        if (v[i][j].r) {
          ctx.moveTo(x + (i + 2) * width / (wb + 2), y + (j + 1) * height / (hb + 2));
          ctx.lineTo(x + (i + 2) * width / (wb + 2), y + (j + 2) * height / (hb + 2));
        }
        if (v[i][j].b) {
          ctx.moveTo(x + (i + 1) * width / (wb + 2), y + (j + 2) * height / (hb + 2));
          ctx.lineTo(x + (i + 2) * width / (wb + 2), y + (j + 2) * height / (hb + 2));
        }
      }
    }
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.fillColor = 'rgb(230,200,230)';
    ctx.stroke();
    if (win == 'none') {
      redOne.move(rv, keys[37], keys[39], keys[38], keys[40]);
      redX = redOne.getPos().x;
      redY = redOne.getPos().y;
    }
    redOne.draw(rg);
    // if (keys[77]) redOne.fire(addBullet);
    for (iNumber = 0; iNumber < blackOnes.length; iNumber++) {
      if (win == 'none') {
        let moves = {
          go: false,
          back: false,
          left: false,
          right: false,
          fire: false
        };
        hardDirection(moves);
        blackOnes[iNumber].move(rv, moves.left, moves.right, moves.go, moves.back);
        if (moves.fire) blackOnes[iNumber].fire(addBullet);
      }
      if (difficulty !== 2 || Math.sqrt((blackOnes[iNumber].getPos().x - redX) ** 2 + (blackOnes[iNumber].getPos().y - redY) ** 2) < 2)
        blackOnes[iNumber].draw(rg);
    }
    for (let i = 0; i < bullets.length; i++) {
      if (win == 'none') {
        bullets[i].move(rv);
        if (bullets[i].hit(redOne)) {
          win = 'blacks';
          blackDiedNum = 0;
        }
        for (let j = 0; j < npcNum; j++) {
          if (bullets[i].hit(blackOnes[j])) {
            blackDiedNum++;
            blackOnes[j].setPos(-20, -20)
          }
        }
        if (blackDiedNum === npcNum) {
          win = 'red';
          blackDiedNum = 0;
        }
      }
      bullets[i].draw(rg);
    }
  }
}
Page = function () {
  let thisPage = this;
  let page;
  let canvas;
  let life;
  let ground;
  let keys;
  let blacksCnt;
  let redCnt;
  let stop;
  this.init = function (_page) {
    page = _page;
    canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    // canvas.style.left = '0';
    // canvas.style.right = '0';
    // canvas.style.top = '0';
    // canvas.style.bottom = '0';
    page.appendChild(canvas);
    ground = new Ground().init(canvas, 50, 50, 1600, 800);
    keys = [];
    window.onkeydown = function (event) {
      if (!life) return;
      keys[event.keyCode] = true;
    }
    window.onkeyup = function (event) {
      if (!life) return;
      keys[event.keyCode] = null;
    }
    redCnt = 0;
    blacksCnt = 0;
    stop = false;
    life = true;
    thisPage.draw();
    return this;
  }
  this.clear = function () {
    page.innerHTML = '';
    life = false;
  }
  this.draw = function () {
    if (!life) return;
    if (!stop && ground.iswin() != 'none') {
      if (ground.iswin() == 'red') {
        redCnt++;
      } else {
        blacksCnt++;
      }
      stop = true;
      setTimeout(function () {
        ground = new Ground().init(canvas, 50, 50, 1600, 800);
        stop = false;
      }, 2500);
    }
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(200,220,250)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.font = '20px 黑体';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('红色 ' + redCnt, 250, 870);
    ctx.fillText('黑色恶犬 ' + blacksCnt, 750, 870);
    ctx.fillText('方向键（已禁用发射）', 400, 870);
    ctx.fillText('电脑控制', 900, 870);
    ground.draw(keys);
    setTimeout(thisPage.draw, 20);
  }
}
window.onload = function () {
  new Page().init(document.getElementById('page'));
}