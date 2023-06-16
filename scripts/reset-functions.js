// Tela de reset de jogo e funções de reset: 
resetButton.addEventListener("click", resetaPartida)

function ativarTelaDeResetDeJogo(message) {
    const messageElement = resetScreen.querySelector("span");
    messageElement.innerHTML = message;
    ativaTela(resetScreen);
}

function resetaCampos() {
    fields.forEach(el => {
        el.innerHTML = "";
        el.classList.remove("mark", "winner-x", "winner-ball")
    })
}

function resetaPartida() {
    resetaCampos();
    haUmVencedor = false;
    fecharTela(resetScreen)

    if(cpuIsPlaying && cpuTurn) {
        cpuMark();
    }
}

function zeraPontos() {
    playerOneScoreElement.innerHTML = "0";
    playerTwoScoreElement.innerHTML = "0";
    playerOnePoints = 0;
    playerTwoPoints = 0;
    playerThatStart = undefined;
}

function reset() {
    resetaPartida();
    zeraPontos();
    player1 = false;
    player2= false;
    cpuIsPlaying = false;
    cpuTurn = false;
    resetDrawnPlayer();
    ativaTela(document.querySelector(".start-game"));
    ativaTela(mainScreen);
    fecharTela(gameScreen);
    fecharTela(scoresArea);
    deactivatePlayButton();
}

returnToMenuButton.addEventListener("click", reset)