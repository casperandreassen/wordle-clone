const words = ["HADDE","ETTER","ELLER","DETTE","KUNNE","ANDRE","HENNE","DENNE","VILLE","IGJEN","MANGE","INGEN","UNDER","SIDEN","MÅTTE","STORE","ALDRI","BLITT","SAMME","GJØRE","DISSE","SISTE","RUNDT","FLERE","FORDI","ANNET","NORGE","GAMLE","LANGT","ANNEN","FØRST","MENER","LENGE","BLANT","NORSK","GJORT","DERES","IKKJE","TIDEN","LITEN","HOLDT","BEDRE","MEGET","HVERT","GRUNN","LIVET","EFTER","BEGGE","FINNE","FORAN","DAGEN","HODET","SAKEN","STORT","PLASS","KVELD","SYNES","BESTE","SATTE","KLART","HOLDE","DAGER","MULIG","SLIKE","VISER","HØRTE","ALTSÅ","BORTE","KUNDE","SNART","SVÆRT","TENKE","FAREN","LILLE","SLUTT","LAGET","ALENE","JOHAN","HUSET","FØLTE","MINST","VEIEN","SEIER","KJENT","SLAGS","FRODE","STUND","LANGE","REKKE","BURDE","VISST","SETTE","HJELP","LØPET","METER","MENTE","FØLGE","VISTE","ÅRENE","TENKT","SLIKT","MOREN","HELST","BRUKE","DØREN","BETYR"];

const todaysWord = words[getRandomInt(0, words.length)]
let guessString = [];
let currentRow;
let activeState = true; 

function init() {
    currentRow = 0; 
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }


/* possible future api to get todays word from backend */
/* function extractTodaysWord() {
    fetch('./wordslists/todaysWord.json')
    .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
} */

function handleKeyboardInput(event) {
    if (activeState != false) {
        if ("ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".includes(event)) {
            if (!(guessString.length > 4)) {
                guessString.push(event); 
                updateLetterRow(guessString, currentRow);
            }
            else {
                displayNewNotification("Kan ikke legge til flere bokstaver");
            }
        }
        if (event == "clear") {
            guessString.pop(-1);
            console.log(guessString);
            updateLetterRow(guessString, currentRow);
        }
        if (event == "guess_button") {
            handleCheckWordEvent();
        }
    }
}

function start_game() {
    document.getElementById("how_to_play_card").style.cssText = "visibility: hidden;";
    document.getElementById("keyboard").style.cssText = "display: flex;";
    document.getElementById("letter_grid").style.cssText = "display: flex;";
    activeState = true;
}
    

function handleCheckWordEvent() {
    if (guessString.length < 5) {
        displayNewNotification("Du må fylle ut alle bokstavene");
    } else {
        let guessedWord = "";
        for (let i = 0; i < 5; i++) {
            guessedWord += guessString[i];
        }
        setColor(checkGuessedWord(guessedWord, todaysWord), currentRow, guessedWord);
        currentRow += 1; 
        guessString = []; 
    }
}


function updateLetterRow(guessString, currentRow) {
    for (let i = 0; i < 5; i++) {
        let currentId = currentRow.toString() + i.toString();
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


function setColor(rowColor, row, guessedWord) {
    let points = 0; 
    for (let i = 0; i < 5; i++) {
        currentId = "box_" + row.toString() + i.toString();
        if (rowColor[i] == 1) {
            points++;
            document.getElementById(currentId).style.cssText = "background-color: #46b019; border: 1px solid lightgray; transition: 0.2s;";
        }
        if (rowColor[i] == 0) {
            document.getElementById(currentId).style.cssText = "background-color: #e6a122; border: 1px solid lightgray; transition: 0.2s;";
        }
        if (rowColor[i] == -1) {
            document.getElementById(currentId).style.cssText = "background-color: #3b3b3b; border: 1px solid lightgray; transition: 0.2s;";
        }
    }
    for (let i = 0; i < 5; i++) {
        if (rowColor[i] == 1) {
            document.getElementById(guessedWord[i]).style.cssText = "background-color: #46b019; border: 1px solid lightgray; transition: 0.2s;";
        }
        if (rowColor[i] == 0) {
            document.getElementById(guessedWord[i]).style.cssText = "background-color: #e6a122; border: 1px solid lightgray; transition: 0.2s;";
        }
    }
    if (points == 5) {
        setWinState(currentRow, true);
    } else if (currentRow == 5) {
        setWinState(currentRow, false)
    } else {
        displayNewNotification("Prøv igjen");
    }
}


function setWinState(currentRow, won) {
    activeState = false; 
    if (won) {
        document.getElementById('information').innerText = "Gratulerer du gjettet riktig på " + (currentRow + 1) + " forsøk!"
    } else {
        document.getElementById('information').innerText = "Du klarte ikke gjette riktig ord, riktig ord var " + todaysWord;
    }
    document.getElementById('information').style.cssText = 'visibility: visible; opacity: 1; transition: visibility 1s, opacity 0.5s linear;'
    document.getElementById('play_again').style.cssText = 'visibility: visible;'
}



function displayNewNotification (notification) {
    document.getElementById('information').innerText = notification;
    document.getElementById('information').style.cssText = 'visibility: visible; opacity: 1; transition: visibility 1s, opacity 0.5s linear;'
    setTimeout(function() {
        document.getElementById('information').style.cssText = 'visibility: hidden; opacity: 0; transition: visibility 1s, opacity 0.5s linear;'
    }, 2000);
}