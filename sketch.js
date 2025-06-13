// Variáveis principais do jogo
let trator;                  // Objeto do trator (personagem controlado)
let milhos = [];             // Lista para armazenar os milhos na tela
let pontos = 0;              // Contador de milhos colhidos
let jogoAtivo = false;       // Indica se o jogo está em andamento
let jogoIniciado = false;    // Indica se o jogador já iniciou o jogo
let limiteMilhos = 30;       // Quantidade de milhos que o jogador precisa colher

function setup() {
  createCanvas(400, 600);     // Cria uma tela de 400x600 pixels
  trator = new Trator();      // Cria uma nova instância do trator
  textAlign(CENTER, CENTER);  // Alinha o texto ao centro horizontal e vertical
}

function draw() {
  background(144, 238, 144); // Define a cor de fundo (verde-claro, como um campo)

  // Tela de instrução antes do jogo começar
  if (!jogoIniciado) {
    fill(0);                               // Define a cor do texto como preta
    textSize(22);                          // Tamanho maior para o título
    text("🌽 Você deve colher 30 milhos, boa sorte! 🌽", width / 2, height / 2 - 20);
    textSize(16);                          // Tamanho menor para instrução
    text("Pressione qualquer tecla para começar", width / 2, height / 2 + 20);
    return;                                // Encerra a função draw() até o jogador começar
  }

  // Jogo ativo
  if (jogoAtivo) {
    fill(0);                                 // Texto preto
    textSize(16);                            // Tamanho padrão
    text("🌽 Colhidos: " + pontos + " / " + limiteMilhos, width / 2, 30); // Placar

    trator.mostrar();                        // Exibe o trator
    trator.mover();                          // Move o trator conforme direção

    // A cada 60 quadros, gera um novo milho
    if (frameCount % 60 === 0) {
      milhos.push(new Milho());              // Adiciona novo milho ao array
    }

    // Percorre os milhos de trás pra frente (para evitar erros ao remover elementos)
    for (let i = milhos.length - 1; i >= 0; i--) {
      milhos[i].mostrar();                   // Mostra o milho
      milhos[i].mover();                     // Move o milho para baixo

      // Verifica se o milho foi colhido
      if (milhos[i].colhido(trator)) {
        milhos.splice(i, 1);                 // Remove o milho da lista
        pontos++;                            // Adiciona ponto
      } else if (milhos[i].y > height) {
        milhos.splice(i, 1);                 // Remove milho que saiu da tela
      }
    }

    // Verifica se o jogador já colheu o suficiente
    if (pontos >= limiteMilhos) {
      jogoAtivo = false;                     // Encerra o jogo
    }

  } else {
    // Tela final após vitória
    fill(0, 150, 0);                          // Cor verde escura
    textSize(28);
    text("🎉 Parabéns, colheita concluída! 🎉", width / 2, height / 2 - 20);
    textSize(18);
    text("Você colheu " + pontos + " milhos! 🌽", width / 2, height / 2 + 20);
    text("Pressione R para jogar de novo", width / 2, height / 2 + 60);
  }
}

function keyPressed() {
  // Começa o jogo ao pressionar qualquer tecla
  if (!jogoIniciado) {
    jogoIniciado = true;
    jogoAtivo = true;
    return;
  }

  // Move o trator para a esquerda
  if (keyCode === LEFT_ARROW) {
    trator.dir = -1;
  }
  // Move o trator para a direita
  else if (keyCode === RIGHT_ARROW) {
    trator.dir = 1;
  }
  // Reinicia o jogo ao pressionar R
  else if (key === 'r' || key === 'R') {
    reiniciarJogo();
  }
}

function keyReleased() {
  trator.dir = 0; // Para o trator quando a tecla é solta
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  jogoAtivo = true;
  pontos = 0;
  milhos = [];             // Esvazia a lista de milhos
  trator = new Trator();   // Cria um novo trator
}

// Classe que representa o trator (jogador)
class Trator {
  constructor() {
    this.x = width / 2;        // Posição inicial horizontal
    this.y = height - 60;      // Posição vertical (perto do chão)
    this.dir = 0;              // Direção: -1 esquerda, 1 direita, 0 parado
  }

  mostrar() {
    textSize(32);              // Tamanho do emoji do trator
    text("🚜", this.x, this.y); // Mostra o trator na posição atual
  }

  mover() {
    this.x += this.dir * 5;                         // Move o trator
    this.x = constrain(this.x, 20, width - 20);     // Impede que saia da tela
  }
}

// Classe que representa o milho (objeto a ser colhido)
class Milho {
  constructor() {
    this.x = random(20, width - 20); // Posição horizontal aleatória
    this.y = -20;                    // Começa fora da tela
    this.vel = random(2, 4);         // Velocidade aleatória de queda
  }

  mostrar() {
    textSize(28);                    // Tamanho do emoji do milho
    text("🌽", this.x, this.y);      // Mostra o milho
  }

  mover() {
    this.y += this.vel;             // Faz o milho cair
  }

  colhido(trator) {
    let d = dist(this.x, this.y, trator.x, trator.y); // Distância entre milho e trator
    return d < 30;                // Considera colhido se estiver próximo o suficiente
  }
}
