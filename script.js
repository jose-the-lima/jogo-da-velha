const fields = document.querySelectorAll(".field");
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
    })
});

const extraiCampos = element => Array(...element.children).map((child) => child.children[0].innerText);

function verificaGanhador() {

}
