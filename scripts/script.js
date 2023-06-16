let player1 = true;
let player2 = false;
let cpuIsPlaying = false;
let cpuTurn = false;

let playerOnePoints = 0;
let playerTwoPoints = 0;
let haUmVencedor = false;

function verificaSeJaFoiMarcado(target) {
    return target.classList.contains("field") && !target.classList.contains("mark")
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