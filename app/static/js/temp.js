

function gameGen(){
    function TESTING(){
        return fetch('/test')
        .then(function (response) {
            return response.json();
        }).then(function (text) {
            var x = JSON.parse(text)
            console.log(x)
            return x
        });
    }
console.log(await TESTING());  
}   
    

function gameGen1(test){
    console.log("THSO:", test)
}
//window.onload= gameGen2()








//initializing variables
let counter1 =0;
let counter2 =0;
let gameCount = 0;
let masterCount = 0;

//variables for sharing results
//scores for 3 diff games
let score1 = 0;
let score2 = 0;
let score3 = 0;

//breakdown of scores for 3 games
let G1C1 = 0;
let G1C2 = 0;
let G2C1 = 0;
let G2C2 = 0;
let G3C1 = 0;
let G3C2 = 0;

//function to generate game 
function gameGen(){
    var idList = idGen()
    
    var temp = []
    
    //creating main div for whole game
    var element01 = document.createElement('div')
    element01.setAttribute('id','puzzle')
    document.getElementsByTagName('body')[0].appendChild(element01)

    //creating board
    for (let i = 1; i < 31; i++){

        temp.push(i);

        //creating 6 by 5 board
        var tile = document.createElement("span")
        tile.setAttribute('class','empty')
        tile.setAttribute('id', i)
        element01.appendChild(tile);
        if (i % 5 == 0){ //moving to next row
            lineBreak = document.createElement('br')
            element01.appendChild(lineBreak)
        }
    }

    //creating first button to begin game 
    var btn01 = document.createElement('button')
    var btn01Txt = document.createTextNode('Play')
    btn01.appendChild(btn01Txt)
    btn01.setAttribute('id', 'button01')
    btn01.onclick = function(){beginGame(idList)}
    document.getElementsByTagName('body')[0].appendChild(btn01)

    //creating second button to play again
    var btn02 = document.createElement('button')
    var btn02Txt = document.createTextNode('Play Again')
    btn02.appendChild(btn02Txt)
    btn02.setAttribute('id','button02')
    //INSERT
    btn02.hidden =true //hiding button when loading game
    document.getElementsByTagName('body')[0].appendChild(btn02)

    //creating third button for endless mode
    var btn03 = document.createElement('button')
    var btn03Txt = document.createTextNode('Play Again (Endless)')
    btn03.appendChild(btn03Txt)
    btn03.setAttribute('id','button03')
    //INSERT
    btn03.hidden = true //hiding button when loading game
    document.getElementsByTagName('body')[0].appendChild(btn03)
}

//function to generate ids
function idGen(){
    idList = [] 
    for (let i = 1; i<31; i++){
        idList.push(i)
    }

    return idList
}

//function to generate patterns
function shuffle(){

    var pattern = []
    var allIds = idGen()

    //generating a random subset of 10 from all ids as game pattern
    for (let i = 0; i < 10; i ++){
        var item = allIds[Math.floor(Math.random()*allIds.length)]
        var index = allIds.indexOf(item)
        allIds.splice(index,1)
        pattern.push(item)
    }
    return pattern
}

//function for initial display of pattern
function displayPattern(pattern){
    for(let i = 0; i <pattern.length; i++){
        var tile = document.getElementById(pattern[i]) //retrieving based on id
        tile.setAttribute('class', 'answer') //changing class to answer to display pattern
    }
}

function hidePattern(ids,pattern){
    for(let i = 0; i<ids.length; i++){
        var tile = document.getElementById(ids[i]) //retrieving based on id
        tile.setAttribute('class', 'empty') //changing class to empty to hide pattern    
        tile.onclick = function(){checker(this.id,pattern);}    
    }
}

//function to begin game
function beginGame(ids){

    pattern = shuffle() // NOTE: SHOULD GET FROM DB HERE (BUT CAN'T SEEM TO WORK IT)

    document.getElementById('button01').hidden = true //hide the button
    displayPattern(pattern) //display pattern
    setTimeout(function(){hidePattern(ids,pattern);},1000) //hide pattern after 1 second
}

//function to check selected tile 
function checker(id,pattern){
    var choice = parseInt(id)
    if(pattern.includes(choice)){
        var tile = document.getElementById(id)
        tile.setAttribute('class', 'answer') //revealing result
        tile.onclick = '' //preventing user from clicking same tile twice
        counter1 ++
    } 
    else{
        var tile = document.getElementById(id)
        tile.setAttribute('class', 'wrong') //revealing result
        tile.onclick = '' //preventing user from clicking same tile twice
        counter2 ++
    }

    //ending the game
    if (counter2 == 6 || counter1 ==10){
        console.log('MASTER:', masterCount)
        gameCount++
        masterCount++
        displayLock()
        displayAnswer(pattern)
        var score = calculateRes(counter1,counter2)
        displayResult(score, counter1, counter2)
        if (masterCount <3){
            document.getElementById('button02').hidden = false
            document.getElementById('button02').onclick = function(){nextGame()}
        }
        else{
            document.getElementById('button03').hidden = false
            document.getElementById('button03').onclick = function(){endlessGame()}
        }
    }
}

//function to remove onlcick on all tiles to lock user
function displayLock(){
    for(let i = 1; i<31; i ++){
        tile = document.getElementById(i)
        tile.onclick ='' 
    }
}

//function to show missing answers
function displayAnswer(pattern){
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i <spans.length; i ++){
        if(spans[i].className == 'empty' && pattern.includes(parseInt(spans[i].id))){ //reveals missing tiles in green
            spans[i].setAttribute('class', 'reveal')
        }
    }
}

//function to calculate result
function calculateRes(numCorrect, numWrong){
    var total = 10*numCorrect - 3*numWrong
    if (total < 0){
        total = 0
    }
    return total
}

//function to display result
function displayResult(score,numCorrect,numWrong){

    //Trigger modal to reveal the results 
    $('#myModal').modal('toggle');
    $('#myModal').modal('show');
    

    //initializng variables
    var correctEmoji = String.fromCodePoint(0x1F7E6);
    var wrongEmoji = String.fromCodePoint(0x1F7E5);

    var results1 = numCorrect + correctEmoji + numWrong + wrongEmoji
    var results2 = 'Total:' + score

    document.getElementById('res0'+ gameCount.toString()+'a').textContent = results1
    document.getElementById('res0'+ gameCount.toString()+'a').style.fontStyle = 'normal'

    document.getElementById('res0'+ gameCount.toString()+'b').textContent = results2
    document.getElementById('res0'+ gameCount.toString()+'b').style.fontStyle = 'normal'

    if (gameCount == 1){
        score1 = score
        G1C1 = counter1
        G1C2 = counter2
    }
    else if (gameCount ==2){
        score2 = score
        G2C1 = counter1
        G2C2 = counter2
    }
    else {
        G3C1 = counter1
        G3C2 = counter2

         //generating summary 
         var final1 = document.createElement('p')
         var final1a = document.createTextNode('Come Back Tomorrow to Try Again!')
         var final1b = document.createTextNode('Only First Score is Recorded! Play again by clicking Endless')
         final1.appendChild(final1a)
         final1.appendChild(final1b)
         document.getElementById('summary').appendChild(final1);


         //calculating final score
         score3 = score
         var sum = ''
         sum = Number(score1) + Number(score2) + Number(score3)
         finalScore = (sum/3).toFixed(1)
         if (finalScore == 0.0){
             finalScore = 0
         }

        finalRes = 'Final Score: ' + finalScore
        var final2 = document.createElement('p')
        var final2a = document.createTextNode(finalRes)
        final2.appendChild(final2a)
        document.getElementById('summary').appendChild(final2)

        //send final result to routes to be included in leaderboards
        const sendscore= JSON.stringify(finalScore) //Stringify converts a JS value to JSON
        $.ajax({
            url:"/register_stats",
            type:"POST",
            contentType: "application/json",
            data: JSON.stringify(sendscore)              
        });

        //creating share button
        footer = document.getElementById('footer')
        var btn04 = document.createElement('button')
        var btn04Txt = document.createTextNode('SHARE')
        btn04.appendChild(btn04Txt)
        btn04.setAttribute('id','button04')
        btn04.setAttribute('class','btn btn-default')
        btn04.onclick = function(){shareRes(score1, G1C1, G1C2, score2, G2C1, G2C2, score3, G3C1, G3C2, finalScore);}
        footer.appendChild(btn04)
    }
}

//function to share results
function shareRes(res1, res1a, res1b, res2, res2a, res2b, res3, res3a, res3b, resFinal){

    //get todays date in mm/dd format
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd 

    var correctEmoji = String.fromCodePoint(0x1F7E6);
    var wrongEmoji = String.fromCodePoint(0x1F7E5);

    var sum01 = 'G1: ' + res1 + ' (' + res1a + correctEmoji + res1b + wrongEmoji + ')'
    var sum02 = 'G2: ' + res2 + ' (' + res2a + correctEmoji + res2b + wrongEmoji + ')'
    var sum03 = 'G3: ' + res3 + ' (' + res3a + correctEmoji + res3b + wrongEmoji + ')'
    var sum04 = 'FINAL: ' + resFinal

    //creating text area to store and format results
    var tempTxt = document.createElement('textarea');
    tempTxt.value = 'Memory Flash' + today + '\r\n' + '\r\n' + sum01 + '\r\n' + sum02 + '\r\n' + sum03 + '\r\n' +  '\r\n' + sum04
    document.body.appendChild(tempTxt);
    tempTxt.select();
    tempTxt.setSelectionRange(0, 99999); /* For mobile devices */

    //remove text area
    document.body.removeChild(tempTxt);

    //notify user that results have been copied to clipbaord
    window.alert('Results have been copied to clipboard!')

    navigator.clipboard.writeText(tempTxt.value);

}

//subsequent game
function nextGame(){
    counter1 = 0
    counter2 = 0
    
    ids= idGen()
    displayReset()
    beginGame(ids)
    document.getElementById('button02').hidden =true
}

//function to reset pattern to empty board
function displayReset(){
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i <spans.length; i ++){
        spans[i].className = 'empty' //resetting to empty
        spans[i].onclick =" " // removing onclick option
        }
    }

function endlessGame(){
    counter1 = 0
    counter2 = 0

    ids = idGen()
    displayReset()
    resultsReset()
    beginGame(ids)
}

function resultsReset(){
    console.log(masterCount)
}
window.onload = gameGen()