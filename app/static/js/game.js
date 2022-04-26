// const tiles = document.querySelectorAll('.game-tile');
let tiles = document.querySelectorAll('.game-tile');
let normalTile, correctTile;
// let tileFlipped = false;

// tiles.forEach(tile => tile.addEventListener('click', myFunction()));



// var score = 0;

// const til = document.getElementById('.game-tile');
// let til = document.querySelector('.game-tile');

// let til = document.querySelectorAll('.game-tile');

// til.addEventListener('click', myFunction);



function readClicks(e) {
    // myFunction();
    const currentClick = e.currentTarget;
    let tileFlipped = null;
    var score = 0;

    if(currentClick.className.includes('tileClicked')) {
        return;
    }
    // console.log(currentClick.className);
    currentClick.className = currentClick.className
        .replace('hidden-tile', '')
        .trim();
    
    currentClick.className += ' tileClicked';

    if(currentClick.className.includes('correct')) {
        score++;
        console.log(score);
    }
    
    if(!tileFlipped) {
        tileFlipped = currentClick;
    } else if(tileFlipped) {
        if(tileFlipped.getAttribute('data-tile') === currentClick.getAttribute('data-tile')) {
            // tileFlipped.setAttribute('data-tileclicked', true);
            // tileFlipped.className += ' tileClicked';
            // currentClick.className += ' tileClicked';
        }
    }
}

// tiles.forEach(tile => tile.addEventListener('click', readClicks()));

function myFunction(event) {
    // console.log("working!");
    // console.log(this);
    // // tileClicked();

    
    
    // til.removeEventListener('click', myFunction);

    // let til = document.getElementById('.game-tile');
    // til.addEventListener('click', myFunction);
    // removeHandler();

}

function removeHandler() {
    // tiles.forEach(tile => tile.removeEventListener('click', myFunction));
    
}

function tileClicked() {
    score++;
}

// tiles.addEventListener('click', myFunction);


// tiles.forEach(tile => tile.addEventListener('click', myFunction));


