const fields = document.querySelectorAll(".field");
const lines = document.querySelectorAll(".line");
const resetScreen = document.querySelector(".winner-section");
let player1 = true;
let player2 = false;
let cpuIsPlaying = false;
let cpuTurn = false;

let playerOnePoints = 0;
let playerTwoPoints = 0;
let haUmVencedor = false;

function createElement(content, classe) {
    const element = document.createElement("div");
    element.innerHTML = content;
    element.classList.add(classe);
    

    return element;
}

const createX = () => createElement("X", "symbol-x");

const createO = () => createElement("O", "symbol-o");

const verificaSeJaFoiMarcado = (target) => {
    return target.classList.contains("field") && !target.classList.contains("mark")
}

function marca(target, elemento) {
    target.append(elemento);
    target.classList.add("mark");

    change();
}

function change() {
    if(cpuIsPlaying) {
        player1 = !player1;
        cpuTurn = !cpuTurn;
    } else {
        player1 = !player1;
        player2 = !player2;
    }
    
}


fields.forEach((field) => {
    field.addEventListener("click", (event) => {
        const local = event.target;
        if(verificaSeJaFoiMarcado(local) && !haUmVencedor) {
            if(cpuIsPlaying) {
                if(!cpuTurn) {
                    marca(local, createX())
                    verificaSeHaGanhador()
                    cpuMark();
                }
            } else {
                player1 ? marca(local, createX()) : marca(local, createO());
                verificaSeHaGanhador()
            }
        }
    })
});

const extraiCampos1 = (element) => {
    const filhos = Array(...element.children);

    const values = filhos.map((filho) => {
        if(typeof filho.children[0] === "undefined") {
            return Math.round(Math.random() * 9999);
        } else {
            return filho.children[0].innerText;
        }
    })

    return values;
}


function montaArrayComLinhas() {
    const line1 = extraiCampos1(lines[0]);
    const line2 = extraiCampos1(lines[1]);
    const line3 = extraiCampos1(lines[2]);

    return [line1, line2, line3];
}

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

// Verificações de vitória de modos diferentes, e verificação de velha


const validaSeTemVitoria = (lista, symbol) => lista.map((array) => array.every(el => el === symbol))

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


// Pintando o vencedor: 

function preencheVencedor(results) {
    if(results[0].cross[1]) {
        const cross = results[0].cross;
        pintarBlocosVencedores(cross[0], "cruzado", cross[2]);
        return cross[2];
    } else if(results[1].horizontal[1]) {
        const horizontal = results[1].horizontal;
        pintarBlocosVencedores(horizontal[0], "horizontal", horizontal[2])
        return horizontal[2];
    } else if(results[2].vertical[1]) {
        const vertical = results[2].vertical;
        pintarBlocosVencedores(vertical[0], "vertical", vertical[2])
        return vertical[2];
    }
}

function buscaElementosCruzados(pos) {
    if(pos === 0) {
        return [lines[0].children[0], lines[1].children[1], lines[2].children[2]]
    } else if(pos === 1) {
        return [lines[0].children[2], lines[1].children[1], lines[2].children[0]]
    }
}

function pintarBlocosVencedores(pos, metodoVencedor, winner) {
    switch(metodoVencedor) {
        case "cruzado":
            const cross = buscaElementosCruzados(pos);
            cross.forEach(el => el.classList.add(`winner-${winner}`))
        break;
        case "horizontal":
            const horizontal = [...lines[pos].children];
            horizontal.forEach(el => el.classList.add(`winner-${winner}`));
        break;
        case "vertical":
            const vertical = [lines[0].children[pos], lines[1].children[pos], lines[2].children[pos]];
            vertical.forEach(el => el.classList.add(`winner-${winner}`));
        break;
    }
}

// Funções de pontuação:
const playerOneScoreElement = document.querySelector(".player-1-score-number");
const playerTwoScoreElement = document.querySelector(".player-2-score-number");

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


// Tela de reset de jogo e funções de reset: 
const resetButton = document.querySelector(".winner-button-reset");
const returnToMenuButton = document.querySelector(".winner-button-menu");

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

    console.log(cpuIsPlaying, cpuTurn);
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


// Funções da máquina como player 2

function returnCamposVazios() {
    return Array(...fields).filter(field => !field.classList.contains("mark"));
}

function sorteiaCampoDoCpu(total) {
    const sorteado = Math.round(Math.random() * total);
    if(sorteado === total) {
        return sorteado - 1;
    } 
    return sorteado;
}

function cpuMark() {
    if(!haUmVencedor) {
        setTimeout(() => {
            const camposVazios = returnCamposVazios();
            const localForMarkNumber = sorteiaCampoDoCpu(camposVazios.length)
            marca(camposVazios[localForMarkNumber], createO())
            verificaSeHaGanhador()
        }, 1000)
    }
    
}