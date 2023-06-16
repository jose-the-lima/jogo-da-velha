// Background, menu e botões player 1 e player 2
const startGameBackground = document.querySelector(".start-game");
const mainScreen = document.querySelector(".menu");
const onePlayerBt = document.querySelector(".one-player");
const twoPlayersBt = document.querySelector(".two-players");

// Tela de sorteio de quem vai começar primeiro
const playersScreen = document.querySelector(".who-will-start");
const buttonOfPrizeDraw = document.querySelector(".start-prize-draw");
const playButton = document.querySelector(".answer-options button:nth-child(2)");

// Área de pontuações de cada player
const scoresArea = document.querySelector("header");
const playerScreen1 = document.querySelector(".player-1");
const playerScreen2 = document.querySelector(".player-2");

// Área de screen main
const gameScreen = document.querySelector("main");

// Fields, lines e reset
const fields = document.querySelectorAll(".field");
const lines = document.querySelectorAll(".line");
const resetScreen = document.querySelector(".winner-section");

// Ponctuation
const playerOneScoreElement = document.querySelector(".player-1-score-number");
const playerTwoScoreElement = document.querySelector(".player-2-score-number");

// Reset
const resetButton = document.querySelector(".winner-button-reset");
const returnToMenuButton = document.querySelector(".winner-button-menu");


let playerThatStart;