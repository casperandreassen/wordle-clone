
let todaysWord = extractTodaysWord();
let guessString = [];
let currentRow = 0;
let activeState = false; 

function getTodaysWord(URL, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    
    xmlHttp.open("GET", URL, true);
    xmlHttp.send(null);
}

function extractTodaysWord() {
    let obj = JSON.parse(getTodaysWord("http://localhost:8080/todaysWord"))
    console.log(obj.word)
    console.log(obj.todaysDate)
}



document.addEventListener("keydown", function (event) {
    if (activeState) {
        if ("abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".includes(event.key)) {
            if (!(guessString.length > 4)) {
                guessString.push(event.key.toUpperCase()); 
                console.log(guessString);
                updateLetterRow(guessString, currentRow);
            }
            else {
                displayNewNotification("Kan ikke legge til flere bokstaver")
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

document.getElementById("start_button").addEventListener("click", () => {
    activeState = true;
    document.getElementById("how_to_play_card").style.cssText = "display: none;"
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
            document.getElementById("box_" + currentId).style.cssText = "border: 1px solid #3d3d3d; transition: 0.2s;";
        } else {
            document.getElementById(currentId).innerText = guessString[i].toString();
            document.getElementById("box_" + currentId).style.cssText = "border: 1px solid lightgray; transition: 0.2s;";
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
            document.getElementById(currentId).style.cssText = "background-color: #46b019; border: 1px solid lightgray; transition: 0.2s;"
        }
        if (rowColor[i] == 0) {
            document.getElementById(currentId).style.cssText = "background-color: #e6a122; border: 1px solid lightgray; transition: 0.2s;"
        }
        if (rowColor[i] == -1) {
            document.getElementById(currentId).style.cssText = "background-color: #3b3b3b; border: 1px solid lightgray; transition: 0.2s;"
        }
    }
    if (points == 5) {
        setWinState(currentRow);
    }
    displayNewNotification("Prøv igjen")
}

function setWinState(currentRow) {
    activeState = false; 
    displayNewNotification("Gratulerer du gjettet riktig på " + (currentRow + 1) + " forsøk!")

}



function displayNewNotification (notification) {
    document.getElementById('information').innerText = notification;
    document.getElementById('information').style.cssText = 'visibility: visible; opacity: 1; transition: visibility 1s, opacity 0.5s linear;'
    setTimeout(function() {
        document.getElementById('information').style.cssText = 'visibility: hidden; opacity: 0; transition: visibility 1s, opacity 0.5s linear;'
    }, 2000);
}