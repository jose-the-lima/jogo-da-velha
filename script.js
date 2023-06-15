const fields = document.querySelectorAll(".field");
const lines = document.querySelectorAll(".line");
let player1 = true;
let player2 = false;

let playerOnePoints = 0;
let playerTwoPoints = 0;
let haUmVencedor = false;
let vencedor;

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
    player1 = !player1;
    player2 = !player2;
}


fields.forEach((field) => {
    field.addEventListener("click", (event) => {
        const local = event.target;
        if(verificaSeJaFoiMarcado(local) && !haUmVencedor) {
            player1 ? marca(local, createX()) : marca(local, createO());
        }

        verificaSeHaGanhador()
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
        preencheVencedor([{cross: crossWin}, {horizontal: horizontalWin}, {vertical: verticalWin}]);
    } else if(nobodyWin && velha) {
        alert("Velha")
    }

    pontuaPlacar();
    ativarTelaDeResetDeJogo();
    haUmVencedor = true;
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

    const todosMarcados = array.every(el => el === "X" || el === "O");

    return todosMarcados;
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
        return vertical[2]; // Minha lógica por trás daqui, é que por aqui será retornadao um valor do vencedor, e na função preenche vencedor
        // vai retornara ele, e de acordo com a resposta retornada o placar vai ser alterado, se for "x" o player 1 marca, se for "ball" o player 2 marca
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

function pontuaPlacar() {

}


// Tela de reset de jogo: 

function ativarTelaDeResetDeJogo() {
    ativaTela(document.querySelector(".winner-section"))
}