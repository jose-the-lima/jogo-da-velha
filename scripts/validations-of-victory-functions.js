// Verificações de vitória de modos diferentes, e verificação de velha
function verificaSeHaGanhador() {
    const array = montaArrayComLinhas();
    const crossWin = vitoriaCruzada(array);
    const horizontalWin = vitoriaHorizontal(array);
    const verticalWin = vitoriaVertical(array);

    const nobodyWin = [crossWin[1], horizontalWin[1], verticalWin[1]].every(el => el === false);
    const velha = verificaVelha();

    if(crossWin[1] || horizontalWin[1] || verticalWin[1]) {
        if(!haUmVencedor) {
            const playerThatScored = preencheVencedor([{cross: crossWin}, {horizontal: horizontalWin}, {vertical: verticalWin}]);
            pontuaPlacar(playerThatScored);
            const message = playerThatScored === "x" ? "Player 1 venceu!!": "Player 2 venceu!!";
            ativarTelaDeResetDeJogo(message);
            haUmVencedor = true;
        }
    } else if(nobodyWin && velha) {
        ativarTelaDeResetDeJogo("Deu velha##!");
    }

    
}

function validaSeTemVitoria(lista, symbol) {
    return lista.map((array) => array.every(el => el === symbol))
}

function extractCross(pos, lista) {
    if(pos === 1) {
        return lista.map((el, index) => {
            switch(index) {
                case 0: return el[0];
                case 1: return el[1];
                case 2: return el[2]; 
            }
        })
    } else if(pos === 2) {
        return lista.map((el, index) => {
            switch(index) {
                case 0: return el[2];
                case 1: return el[1];
                case 2: return el[0];
            }
        })
    }
}

function vitoriaCruzada(lista) {
    const crosses = [extractCross(1, lista), extractCross(2, lista)];
    const victoryBall = validaSeTemVitoria(crosses, "O")
    const victoryX = validaSeTemVitoria(crosses, "X")

    let victory = [-1, false, ""]

    if(victoryBall.includes(true)) {
        victory = [victoryBall.indexOf(true), true, "ball"]
    } else if(victoryX.includes(true)) {
        victory = [victoryX.indexOf(true), true, "x"]
    }
    return victory;
}

function vitoriaHorizontal(lista) {
    const victoryBall = validaSeTemVitoria(lista, "O")
    const victoryX = validaSeTemVitoria(lista, "X")

    let victory = [-1, false, ""];
    if(victoryBall.includes(true)) {
        const index = victoryBall.indexOf(true);
        victory = [index, true, "ball"]
    } else if (victoryX.includes(true)){
        const index = victoryX.indexOf(true);
        victory = [index, true, "x"]
    }

    return victory;
}

function vitoriaVertical(lista) {
    const newArray = [[], [], []];
    for(let i = 0; i < lista.length; i++) {
        newArray[0].push(lista[i][0])
        newArray[1].push(lista[i][1])
        newArray[2].push(lista[i][2])
    }

    const victoryBall = validaSeTemVitoria(newArray, "O")
    const victoryX = validaSeTemVitoria(newArray, "X")

    let victory = [-1, false, ""]

    if(victoryBall.includes(true)) {
        const index = victoryBall.indexOf(true)
        victory = [index, true, "ball"]
    } else if(victoryX.includes(true)) {
        const index = victoryX.indexOf(true);
        victory = [index, true, "x"]
    }
    return victory;
}

function verificaVelha() {
    let array = montaArrayComLinhas();
    array = [...array[0], ...array[1], ...array[2]]

    return array.every(el => el === "X" || el === "O");
}