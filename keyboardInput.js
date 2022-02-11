
let todaysWord = "ABBOR"
let guessString = [];
let currentRow = 0;
let winState = false; 

document.addEventListener("keydown", function (event) {
    if (!winState) {
        if ("abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".includes(event.key)) {
            if (!(guessString.length > 4)) {
                guessString.push(event.key.toUpperCase()); 
                console.log(guessString);
                updateLetterRow(guessString, currentRow);
            }
        }
        if (event.key == "Backspace") {
            guessString.pop(-1);
            console.log(guessString);
            updateLetterRow(guessString, currentRow);
        }
        if (event.key == "Enter") {
            handleCheckWordEvent();
        }
    }
})

document.getElementById("guess_button").addEventListener("click", () => {
    handleCheckWordEvent();
})


function handleCheckWordEvent() {
    if (guessString.length < 5) {
        displayNewNotification("Du må fylle ut alle bokstavene");
    } else {
        let guessedWord = "";
        for (let i = 0; i < 5; i++) {
            guessedWord += guessString[i];
        }
        setRowColor(checkGuessedWord(guessedWord, todaysWord), currentRow);
        currentRow += 1; 
        guessString = []; 
    }
}


function updateLetterRow(guessString, currentRow) {
    for (let i = 0; i < 5; i++) {
        let currentId = currentRow.toString() + i.toString()
        if (guessString[i] === undefined) {
            document.getElementById(currentId).innerText = "";
        } else {
            document.getElementById(currentId).innerText = guessString[i].toString();
        }
    } 
}

/* Logic: Green = 1, Orange = 0 and Grey = -1*/


function checkGuessedWord(guessedWord, todaysWord) {
    
    rowColor = [];
    for (let i = 0; i < 5; i++) {
        for (let n = 0; n < 5; n++) {
            if (guessedWord[i] == todaysWord[n]) {
                if (n == i) {
                    rowColor[i] = 1;
                }
                else {
                    if (!(rowColor[i] > 0)) {
                        rowColor[i] = 0; 
                    }
                }
            }
            else {
                if (!(rowColor[i] > -1)) {
                    rowColor[i] = -1; 
                }
            }
        }
    }
    return rowColor;
}


function setRowColor(rowColor, row) {
    let points = 0; 
    for (let i = 0; i < 5; i++) {
        currentId = "box_" + row.toString() + i.toString();
        if (rowColor[i] == 1) {
            points++
            document.getElementById(currentId).style.cssText = "background-color: #46b019;"
        }
        if (rowColor[i] == 0) {
            document.getElementById(currentId).style.cssText = "background-color: #e6a122"
        }
    }

    if (points == 5) {
        setWinState(currentRow);
    }
}

function setWinState(currentRow) {
    winState = true; 
    displayNewNotification("Gratulerer du gjettet riktig på " + (currentRow + 1) + " forsøk!")

}



function displayNewNotification (notification) {
    document.getElementById('information').innerText = notification;
    document.getElementById('information').style.cssText = 'visibility: visible; opacity: 1; transition: visibility 0.4s, opacity 0.5s linear;'
    setTimeout(function() {
        document.getElementById('information').style.cssText = 'visibility: hidden; opacity: 0; transition: visibility 0.4s, opacity 0.5s linear;'
    }, 2000);
}