const fields = document.querySelectorAll(".field");
const lines = document.querySelectorAll(".line");
let player1 = true;
let player2 = false;

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
        if(verificaSeJaFoiMarcado(local)) {
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

    const nobodyWin = [crossWin, horizontalWin, verticalWin].every(el => el === false);
    const velha = verificaVelha();

    if(crossWin || horizontalWin || verticalWin) {
        alert("Alguem venceu");
    } else if(nobodyWin && velha) {
        alert("Velha")
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

    console.log(victoryBall);
    console.log(victoryX)

    if(victoryBall.includes(true)) {
        return true
    } else if(victoryX.includes(true)) {
        return true
    } else {
        return false
    }
}

function vitoriaHorizontal(lista) {
    const victoryBall = validaSeTemVitoria(lista, "O")
    const victoryX = validaSeTemVitoria(lista, "X")

    let victory = false;
    if(victoryBall.includes(true)) {
        victory = true
    } else if (victoryX.includes(true))[
        victory = true
    ]

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

    if(victoryBall.includes(true)) {
        return true
    } else if(victoryX.includes(true)) {
        return true
    }
    return false
}

function verificaVelha() {
    let array = montaArrayComLinhas();
    array = [...array[0], ...array[1], ...array[2]]

    const todosMarcados = array.every(el => el === "X" || el === "O");
    console.log("Todos marcados ? " , todosMarcados);

    return todosMarcados;
}
