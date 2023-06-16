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