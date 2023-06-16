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