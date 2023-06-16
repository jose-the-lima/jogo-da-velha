// Funções de pontuação:
function pontuaPlacar(playerThatScored) {
    if(playerThatScored === "x") {
        playerOnePoints++;
        atualizaPlacar(playerOneScoreElement, playerOnePoints);
    } else if(playerThatScored === "ball") {
        playerTwoPoints++;
        atualizaPlacar(playerTwoScoreElement, playerTwoPoints);
    }
}

function atualizaPlacar(elemento, number) {
    elemento.innerHTML = number;
}