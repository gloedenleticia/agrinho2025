function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let player;
let obstacles = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  player = new Player();
}

function draw() {
  background(200, 255, 200); // Cor do fundo, simula o campo

  // Se o jogo acabou, mostra a tela de "Game Over"
  if (gameOver) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Game Over", width / 2, height / 2);
    noLoop();
    return;
  }

  // Desenha a cidade (parte superior da tela)
  fill(150, 150, 150); // Cor da cidade
  rect(0, 0, width, 50);

  // Atualiza e desenha os obstáculos
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    // Verifica se o jogador colidiu com algum obstáculo
    if (player.collidesWith(obstacles[i])) {
      gameOver = true;
    }

    // Remove obstáculos que saíram da tela
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Atualiza e desenha o jogador
  player.update();
  player.show();

  // Cria novos obstáculos a cada 60 quadros
  if (frameCount % 60 == 0 && !gameOver) {
    obstacles.push(new Obstacle());
  }

  // Mostra a pontuação
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0);
  text('Pontos: ' + score, 10, 10);
}

// Função para o jogador
class Player {
  constructor() {
    this.x = 50;
    this.y = height - 70;
    this.size = 20;
    this.speed = 5;
  }

  update() {
    // Movimento com as teclas de seta
    if (keyIsDown(UP_ARROW) && this.y > 50) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height - this.size) {
      this.y += this.speed;
    }
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.size) {
      this.x += this.speed;
    }
  }

  show() {
    fill(0, 100, 255); // Cor do jogador
    rect(this.x, this.y, this.size, this.size);
  }

  // Função de colisão com obstáculos
  collidesWith(obstacle) {
    return this.x < obstacle.x + obstacle.width &&
           this.x + this.size > obstacle.x &&
           this.y < obstacle.y + obstacle.height &&
           this.y + this.size > obstacle.y;
  }
}

// Função para os obstáculos
class Obstacle {
  constructor() {
    this.width = random(30, 60);
    this.height = random(20, 50);
    this.x = width;
    this.y = random(50, height - 70); // Obstáculos começam na região do campo
    this.speed = 5;
  }

  update() {
    this.x -= this.speed; // Move o obstáculo para a esquerda
  }

  show() {
    fill(255, 0, 0); // Cor dos obstáculos
    rect(this.x, this.y, this.width, this.height);
  }
}
