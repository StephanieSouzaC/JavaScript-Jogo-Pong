//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete do Jogador
let xRaqueteJogador = 3;
let yRaqueteJogador = 160;
let raqueteLarguraJogador = 10;
let raqueteAlturaJogador = 85;

//variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 160;
let raqueteLarguraOponente = 10;
let raqueteAlturaOponente = 85;
let chanceDeErrar = 0;

let colidiu = false;

//variáveis velociadde do oponente
let velocidadeYOponente;

//placar do jogo
let pontosJogador= 0;
let pontosOponente= 0;

//sons do jogo
let raquetada;
let trilha;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound ("raquetada.mp3");
  ponto = loadSound ("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  bolinhaNaoFicaPresa();
  mostraRaquete(xRaqueteJogador, yRaqueteJogador);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteJogador();
  //movimentaRaqueteOponente ();
  calculaChanceDeErrar();
  movimentaRaqueteOponenteMutiplayer();
  //verificaColisaoRaqueteJogador();
  verificaColisaoRaquete (xRaqueteJogador, yRaqueteJogador);
  verificaColisaoRaquete (xRaqueteOponente, yRaqueteOponente);
  incluiPlacar ();
  marcadorPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
    ponto.play();
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
    if (xBolinha - raio > 600) {
      console.log('bolinha ficou presa');
      xBolinha=300;
    }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteLarguraJogador, 
      raqueteAlturaJogador);
}

function movimentaRaqueteJogador(){
  if (keyIsDown(UP_ARROW)){
    yRaqueteJogador -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteJogador += 10;
  }
}

function movimentaRaqueteOponente (){
  velocidadeYOponente = 0.85 * yBolinha -yRaqueteOponente - raqueteLarguraOponente / 2 - 30;
  yRaqueteOponente += velocidadeYOponente
  calculaChanceDeErrar ();
}

function calculaChanceDeErrar() {
  if (pontosOponente >= pontosJogador) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponenteMutiplayer(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = 
    collideRectCircle(x, y, raqueteLarguraJogador, raqueteAlturaJogador, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function verificaColisaoRaqueteJogador(){
  if (xBolinha - raio < xRaqueteJogador + raqueteLarguraJogador && 
      yBolinha - raio < yRaqueteJogador + raqueteAlturaJogador && 
      yBolinha + raio > yRaqueteJogador){
    velocidadeXBolinha *= -1;
  }
}

function incluiPlacar () {
  stroke(255)
  textAlign(CENTER)
  textSize(20)
  fill(color(255, 140, 0))
  rect(210, 8, 41, 22)
  fill(255)
  text(pontosJogador, 230, 26)
  fill(color(255, 140, 0))
  rect(350,8, 41, 22)
  fill(255)
  text(pontosOponente, 370,26)
}

function marcadorPonto (){
  if (xBolinha > 590){
    pontosJogador += 1;
  }
  if (xBolinha  < 10 ){
   pontosOponente += 1;
  }
}
