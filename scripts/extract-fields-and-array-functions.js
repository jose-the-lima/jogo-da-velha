function extraiCampos1(element) {
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