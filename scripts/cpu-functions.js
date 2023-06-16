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