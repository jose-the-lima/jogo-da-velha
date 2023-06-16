function createElement(content, classe) {
    const element = document.createElement("div");
    element.innerHTML = content;
    element.classList.add(classe);
    

    return element;
}

function createX() {
    return createElement("X", "symbol-x");
}

function createO() {
    return createElement("O", "symbol-o")
}