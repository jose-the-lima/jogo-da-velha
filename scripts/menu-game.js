const onePlayerBt = document.querySelector(".one-player");
const twoPlayersBt = document.querySelector(".two-players");
const mainScreen = document.querySelector(".menu");
const startGameBackground = document.querySelector(".start-game");
const playersScreen = document.querySelector(".who-will-start");
const buttonOfPrizeDraw = document.querySelector(".start-prize-draw");
const scoresArea = document.querySelector("header");
const gameScreen = document.querySelector("main");

const playerScreen1 = document.querySelector(".player-1");
const playerScreen2 = document.querySelector(".player-2");

const playButton = document.querySelector(".answer-options button:nth-child(2)");

let playerThatStart;



twoPlayersBt.addEventListener("click", abrirTelaDeJogadores)

// Funções de fechamento e abertura de telas

const fecharTela = (elemento) => elemento.classList.add("invisible")
const ativaTela = (elemento) => elemento.classList.remove("invisible");

function abrirTelaDeJogadores() {
    fecharTela(mainScreen);
    ativaTela(playersScreen);
}


// Funções da tela de sorteio de quem vai jogar primeiro

buttonOfPrizeDraw.addEventListener("click", () => {
    limpaPlayers();
    changeTheDrawnPlayer(prizeDrawTheFirst());
    activatePlayButton();
})

function changeTheDrawnPlayer(drawnNumber) {
    if(drawnNumber === 1) {
        playerScreen1.classList.add("selected-x");
    } else {
        playerScreen2.classList.add("selected-ball");
    }

    if(cpuIsPlaying) { 
        if(drawnNumber === 1) {
            player1 = true;
            cpuTurn = false;
        } else {
            cpuTurn = true;
            player1 = false;
        }
    } else {
        playerThatStart = drawnNumber;
    }
    
}

function resetDrawnPlayer() {
    playerScreen1.classList.remove("selected-x");
    playerScreen2.classList.remove("selected-ball");
}

function activatePlayButton() {
    playButton.classList.add("start-game-button")
    playButton.removeAttribute("disabled")
}

function deactivatePlayButton() {
    playButton.classList.remove("start-game-button");
    playButton.setAttribute("disabled", "disabled")
}

function limpaPlayers() {
    playerScreen1.classList.remove("selected-x");
    playerScreen2.classList.remove("selected-ball")
}

function prizeDrawTheFirst() {
    const drawn = Math.round(Math.random() * 3);
    let result;
    if(drawn === 0 || drawn === 1) {
        result = 1;
    } else {
        result = 2;
    }
    
    return result;
}

playButton.addEventListener("click", (event) => {
    const ativo = event.target.classList.contains("start-game-button") && !playButton.hasAttribute("disabled");

    if(ativo) {
        fecharTela(startGameBackground);
        fecharTela(mainScreen);
        fecharTela(playersScreen);
        ativaTela(gameScreen)
        ativaTela(scoresArea)
        

        if(playerThatStart === 2) {
            player2 = true;
            player1 = false;
        } else{
            player1 = true;
            player2 = false;
        }
        resetaPartida();
    }
})



// Funções do botão do player 1

onePlayerBt.addEventListener("click", () => {
    fecharTela(mainScreen);
    ativaTela(playersScreen);
    cpuIsPlaying = true;
})