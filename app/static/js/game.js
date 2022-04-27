let tiles = document.querySelectorAll('.game-tile');
let normalTile, correctTile;
let score = 0;

// FUNCTION THAT READS IN CLICKS FROM USER
function readClicks(e) {
    // myFunction();
    const currentClick = e.currentTarget;
    let tileFlipped = null;

    if(currentClick.className.includes('tileClicked')) {
        return;
    }
    // console.log(currentClick.className);
    currentClick.className = currentClick.className
        .replace('hidden-tile', '')
        .trim();
    
    currentClick.className += ' tileClicked';

    // VERY SCUFFED
    if(currentClick.className.includes('incorrect')) {
    } else {
        score++;
    }

    document.getElementById("game-score").innerHTML = "Score: " + score;
    
    // MARKS TILE WHEN CLICKED, SO THE USER CANNOT CLICK AGAIN
    if(!tileFlipped) {
        tileFlipped = currentClick;
    } else if(tileFlipped) {
        if(tileFlipped.getAttribute('data-tile') === currentClick.getAttribute('data-tile')) {
        }
    }
}

