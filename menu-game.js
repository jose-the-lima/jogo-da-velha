const onePlayerBt = document.querySelector(".one-player");
const twoPlayersBt = document.querySelector(".two-players");
const mainScreen = document.querySelector(".menu");
const playersScreen = document.querySelector(".who-will-start");
const buttonOfPrizeDraw = document.querySelector(".start-prize-draw");

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

    playerThatStart = drawnNumber;
}

function activatePlayButton() {
    playButton.classList.add("start-game-button")
    playButton.removeAttribute("disabled")
}

function limpaPlayers() {
    playerScreen1.classList.remove("selected-x");
    playerScreen2.classList.remove("selected-ball")
}

function prizeDrawTheFirst() {
    const drawn = Math.round(Math.random() * 2);

    return drawn === 0 ? 1 : drawn;
}

playButton.addEventListener("click", (event) => {
    const ativo = event.target.classList.contains("start-game-button") && !playButton.hasAttribute("disabled");

    if(ativo) {
        fecharTela(document.querySelector(".start-game"));
        ativaTela(document.querySelector("main"))

        if(playerThatStart === 2) {
            change();
        }
    }
})