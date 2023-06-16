// Funções dos botões iniciais 1 player or 2 players

onePlayerBt.addEventListener("click", () => {
    fecharTela(mainScreen);
    ativaTela(playersScreen);
    cpuIsPlaying = true;
})

twoPlayersBt.addEventListener("click", abrirTelaDeJogadores)


// Botão de jogar com evento
function verifyIfPlayButtonIsActive(elemento) {
    return elemento.classList.contains("start-game-button") && !playButton.hasAttribute("disabled");
}

playButton.addEventListener("click", (event) => {
    if(verifyIfPlayButtonIsActive(event.target)) {
        abrirTelaPrincipalDoJogo();

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