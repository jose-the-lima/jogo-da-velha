buttonOfPrizeDraw.addEventListener("click", () => {
    resetDrawnPlayer();
    changeTheDrawnPlayer(prizeDrawTheFirst());
    activatePlayButton();
})

function changeTheDrawnPlayer(drawnNumber) {
    if(drawnNumber === 1) {
        playerScreen1.classList.add("selected-x");
    } else {
        playerScreen2.classList.add("selected-ball");
    }

    if(cpuIsPlaying) { 
        if(drawnNumber === 1) {
            player1 = true;
            cpuTurn = false;
        } else {
            cpuTurn = true;
            player1 = false;
        }
    } else {
        playerThatStart = drawnNumber;
    }
    
}

function resetDrawnPlayer() {
    playerScreen1.classList.remove("selected-x");
    playerScreen2.classList.remove("selected-ball");
}

function activatePlayButton() {
    playButton.classList.add("start-game-button")
    playButton.removeAttribute("disabled")
}

function deactivatePlayButton() {
    playButton.classList.remove("start-game-button");
    playButton.setAttribute("disabled", "disabled")
}

function prizeDrawTheFirst() {
    const drawn = Math.round(Math.random() * 3);
    let result;
    if(drawn === 0 || drawn === 1) {
        result = 1;
    } else {
        result = 2;
    }
    
    return result;
}