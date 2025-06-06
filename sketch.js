function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
// Definir variáveis
let player;
let obstacles = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  player = new Player();
}

function draw() {
  background(220);

  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text("Game Over!", width / 2, height / 2 - 40);
    textSize(20);
    text("Pressione 'R' para reiniciar", width / 2, height / 2 + 20);
    return;
  }

  // Adicionar e mover obstáculos
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    // Verificar colisão com o jogador
    if (obstacles[i].hits(player)) {
      gameOver = true;
    }

    // Remover obstáculos que saíram da tela
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Mostrar o jogador
  player.update();
  player.show();

  // Exibir pontuação
  textSize(18);
  fill(0);
  text("Pontuação: " + score, 30, 30);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.move(-1);
  } else if (keyCode === DOWN_ARROW) {
    player.move(1);
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    player.move(0);
  }
}

function keyTyped() {
  if (key === 'r' || key === 'R') {
    // Reiniciar o jogo
    gameOver = false;
    obstacles = [];
    score = 0;
    player = new Player();
  }
}

// Classe do jogador
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 30;
    this.ySpeed = 0;
  }

  update() {
    this.y += this.ySpeed * 5;
    this.y = constrain(this.y, 0, height - this.size); // Limitar ao espaço da tela
  }

  move(dir) {
    this.ySpeed = dir;
  }

  show() {
    fill(0);
    noStroke();
    rect(this.x - this.size / 2, this.y, this.size, this.size);
  }
}

// Classe dos obstáculos
class Obstacle {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.size = random(20, 40);
    this.speed = random(3, 6);
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 0, 0);
    noStroke();
    rect(this.x - this.size / 2, this.y, this.size, this.size);
  }

  offscreen() {
    return this.y > height;
  }

  hits(player) {
    // Verificar se o jogador colidiu com o obstáculo
    let pLeft = player.x - player.size / 2;
    let pRight = player.x + player.size / 2;
    let pTop = player.y;
    let pBottom = player.y + player.size;

    let oLeft = this.x - this.size / 2;
    let oRight = this.x + this.size / 2;
    let oTop = this.y;
    let oBottom = this.y + this.size;

    // Se houver interseção, significa colisão
    return !(pRight < oLeft || pLeft > oRight || pBottom < oTop || pTop > oBottom);
  }
}
}
