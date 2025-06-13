let trator; // objeto do trator
let milhos = []; // array que guarda os milhos caindo
let pontos = 0; // contador de milhos colhidos
let jogoAtivo = true; // define se o jogo está rodando
let limiteMilhos = 30; // número de milhos necessários para vencer
let fundo; // imagem de fundo

function preload() {
  // Carrega a imagem de fundo antes do jogo iniciar
  fundo = loadImage('fundo.avif');
}

function setup() {
  createCanvas(400, 600); // cria a tela do jogo com 400x600 pixels
  trator = new Trator(); // cria uma instância do trator
  textAlign(CENTER, CENTER); // centraliza os textos horizontal e verticalmente
}

function draw() {
  image(fundo, 0, 0, width, height); // desenha a imagem de fundo no canvas

  if (jogoAtivo) {
    fill(255); // define a cor do texto como branco
    stroke(0); // define a borda do texto como preta
    strokeWeight(2); // espessura da borda do texto
    textSize(16); // tamanho do texto
    // Mostra os pontos colhidos na parte de cima
    text("🌽 Colhidos: " + pontos + " / " + limiteMilhos, width / 2, 30);

    trator.mostrar(); // desenha o trator
    trator.mover();   // move o trator com base na tecla pressionada

    // A cada 60 quadros, adiciona um milho novo na tela
    if (frameCount % 60 === 0) {
      milhos.push(new Milho());
    }

    // Laço que percorre todos os milhos na tela
    for (let i = milhos.length - 1; i >= 0; i--) {
      milhos[i].mostrar(); // desenha o milho
      milhos[i].mover();   // faz o milho cair

      // Verifica se o milho foi colhido pelo trator
      if (milhos[i].colhido(trator)) {
        milhos.splice(i, 1); // remove o milho do array
        pontos++; // aumenta os pontos
      } 
      // Remove o milho se sair da tela
      else if (milhos[i].y > height) {
        milhos.splice(i, 1);
      }
    }

    // Verifica se o jogador já colheu 30 milhos
    if (pontos >= limiteMilhos) {
      jogoAtivo = false; // encerra o jogo
    }

  } else {
    // Tela final quando o jogador ganha
    fill(0, 150, 0); // cor do texto verde escuro
    textSize(28);
    text("🎉 Parabéns, colheita concluída! 🎉", width / 2, height / 2 - 20);
    textSize(18);
    text("Você colheu " + pontos + " milhos! 🌽", width / 2, height / 2 + 20);
    text("Pressione R para jogar de novo", width / 2, height / 2 + 60);
  }
}

// Detecta quando o jogador pressiona uma tecla
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    trator.dir = -1; // move o trator para a esquerda
  } else if (keyCode === RIGHT_ARROW) {
    trator.dir = 1; // move o trator para a direita
  } else if (key === 'r' || key === 'R') {
    reiniciarJogo(); // reinicia o jogo se apertar R
  }
}

// Detecta quando a tecla é solta
function keyReleased() {
  trator.dir = 0; // para o trator
}

// Reinicia todas as variáveis e objetos para jogar novamente
function reiniciarJogo() {
  jogoAtivo = true;
  pontos = 0;
  milhos = [];
  trator = new Trator();
}

// Classe que representa o trator
class Trator {
  constructor() {
    this.x = width / 2; // posição horizontal no centro
    this.y = height - 60; // posição vertical próxima da parte de baixo
    this.dir = 0; // direção: -1 para esquerda, 1 para direita, 0 para parado
  }

  mostrar() {
    textSize(32);
    text("🚜", this.x, this.y); // desenha o emoji do trator
  }

  mover() {
    this.x += this.dir * 5; // move o trator na direção definida
    this.x = constrain(this.x, 20, width - 20); // impede de sair da tela
  }
}

// Classe que representa o milho caindo
class Milho {
  constructor() {
    this.x = random(20, width - 20); // posição horizontal aleatória
    this.y = -20; // começa fora da tela (em cima)
    this.vel = random(2, 4); // velocidade de queda aleatória
  }

  mostrar() {
    textSize(28);
    text("🌽", this.x, this.y); // desenha o emoji do milho
  }

  mover() {
    this.y += this.vel; // faz o milho cair
  }

  colhido(trator) {
    // Verifica a distância entre o milho e o trator
    let d = dist(this.x, this.y, trator.x, trator.y);
    return d < 30; // se estiver perto o suficiente, considera colhido
  }
}
