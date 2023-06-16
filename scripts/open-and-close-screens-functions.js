function fecharTela(elemento) {
    elemento.classList.add("invisible");
}

function ativaTela(elemento) {
    elemento.classList.remove("invisible");
}

function abrirTelaDeJogadores() {
    fecharTela(mainScreen);
    ativaTela(playersScreen);
}

function abrirTelaPrincipalDoJogo() {
    fecharTela(startGameBackground);
    fecharTela(mainScreen);
    fecharTela(playersScreen);
    ativaTela(gameScreen)
    ativaTela(scoresArea)
}