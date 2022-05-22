//initializing variables
let counter1 =0;
let counter2 =0;
let gameCount = 0;

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

var patternTest = null;


// function to generate model of game
function createfn(){
    var temp = []

    //creating div for game
    var element01 = document.createElement('div');
    element01.setAttribute('id','puzzle')
    document.getElementsByTagName('body')[0].appendChild(element01)
    

    //document.getElementById('testing01').addEventListener(onclick, testBackend)

    //creating blank puzzle
    for (let i = 1; i < 31; i++){

        temp.push(i);

        //creating 6 by 5 board
        var tile = document.createElement("span");
        tile.setAttribute('class','empty')
        tile.setAttribute('id', i)
        element01.appendChild(tile);
        if (i % 5 == 0){
            lineBreak = document.createElement('br');
            element01.appendChild(lineBreak);2
        }
    }
    // getting random pattern of answer and id array
    var pattern  = shuffle(temp)
    patternTest = pattern
    var ids = idGen()

    //creating results para
    var para = document.createElement('p')
    para.setAttribute('id', 'resultsText')
    document.getElementsByTagName('body')[0].appendChild(para)

    //creating 1st button to begin game
    var x = document.createElement('button')
    var y = document.createTextNode('Play')
    x.appendChild(y)
    x.setAttribute('id','button01')
    x.onclick = function(){fnCaller1(pattern, ids);}  //displaying / hiding answer and allow onclick.
    document.getElementsByTagName('body')[0].appendChild(x)

    //creating 2nd button to play / try again
    var z = document.createElement('button')
    z.setAttribute('id','button02')
    z.onclick = function(){fnCaller2(ids);} //resetting /reshuffling
    z1 = document.createTextNode('Play Again')
    z.appendChild(z1)
    z.hidden= true
    document.getElementsByTagName('body')[0].appendChild(z)

    //creating button for endless
    var newButton = document.createElement('button')
    newButton.setAttribute('id', 'button04')
}
//function to generate ids as array
function idGen(){
    temp =[]
    for (let i = 1; i<31; i++){
        temp.push(i)
    }
    return temp
}

//function for randomizing puzzle
function shuffle(array){

    final = [];
    
    //generate idList 
    ids = idGen()

    //generating pattern
    for (let i = 0; i < 10; i ++){
        var item = array[Math.floor(Math.random()*array.length)];
        var index = array.indexOf(item);
        array.splice(index,1)
        final.push(item);
    }
    return final
}


function checker(arr1,arr2,id){
    var x = parseInt(id)
    if (arr2.includes(x)){
        elem = document.getElementById(id)
        elem.setAttribute('class', 'answer');
        elem.onclick =""
        counter1++;
    }
    else {
        elem = document.getElementById(id)
        elem.setAttribute('class', 'wrong');
        elem.onclick=""
        counter2 ++;
    }

    //ending game if 6 wrong selections / 10 correct selections

    var correctEmoji = String.fromCodePoint(0x1F7E6);
    var wrongEmoji = String.fromCodePoint(0x1F7E5);

    if (counter2 == 6 || counter1 ==10){
        gameCount ++; 
        document.getElementById('button02').hidden =false;
        displayLock()
        var score = calculateRes()
        revealAnswer(arr2)

        //Revealing the results 
        $('#myModal').modal('toggle');
        $('#myModal').modal('show');

        var results1 = counter1 + correctEmoji + counter2 + wrongEmoji
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
        else{
            G3C1 = counter1
            G3C2 = counter2

            //locking any further attempts
            document.getElementById('button02').hidden = true;

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



            //send final result to routes to be included in leaderboards
            const sendscore= JSON.stringify(finalScore) //Stringify converts a JS value to JSON
            $.ajax({
                url:"/register_stats",
                type:"POST",
                contentType: "application/json",
                data: JSON.stringify(sendscore)              
            });
            
            var final2 = document.createElement('p')
            var final2a = document.createTextNode(finalRes)
            final2.appendChild(final2a)
            document.getElementById('summary').appendChild(final2)

            //creating share button
            footer = document.getElementById('footer')
            var a = document.createElement('button')
            var b = document.createTextNode('SHARE')
            a.appendChild(b)
            a.setAttribute('id','button03')
            a.setAttribute('class','btn btn-default')
            a.onclick = function(){shareRes(score1, G1C1, G1C2, score2, G2C1, G2C2, score3, G3C1, G3C2, finalScore);}
            footer.appendChild(a)



        }
    }
}

//displaying answers before game
function displayAnswer(array){
    for(let i = 0; i<array.length; i ++){
        x = document.getElementById(array[i]);
        x.setAttribute('class', 'answer')        
    }
}  
//hide answers
function hideAnswer(arr1, arr2){
    for(let i = 0; i<arr1.length; i ++){
        x = document.getElementById(arr1[i]);
        x.onclick = function(){checker(arr1,arr2,this.id);}
        x.setAttribute('class', 'empty')        
    }
    document.getElementById('button01').hidden=true;
}

//revealing answers
function revealAnswer(arr){
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i <spans.length; i ++){
        if(spans[i].className == 'empty' && arr.includes(parseInt(spans[i].id))){
            spans[i].setAttribute('class', 'reveal')
        }
    }
}

//locking all tiles
function displayLock(){
    for (i=1; i<31; i++){
        x = document.getElementById(i)  
        x.onclick ="" //removing onclick function
    }
}

//resetting the game
function displayReset(){
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i <spans.length; i ++){
        spans[i].className = 'empty' //resetting to empty
        spans[i].onclick =" " // removing onclick option
        }
    //removing paragraph
    document.getElementById('resultsText').textContent =""
    
    //hiding button
    document.getElementById('button02').hidden =true

    //resetting counter
    counter1 = 0
    counter2 = 0
}

//function to calculate results
function calculateRes(){

    var total = 10*counter1 - 3*counter2
    if (total < 0){
        total = 0
    }
    return total
}

//function caller to show and hide answers
function fnCaller1(ans,ids){
    displayAnswer(ans)
    setTimeout(function(){hideAnswer(ids,ans);},1000)
}

//function to play again
function fnCaller2(ids){
    
    //creating temp array to splice for pattern
    var temp = idGen()
    var newPattern  = shuffle(temp)

    displayReset()
    setTimeout(function(){displayAnswer(newPattern);},1000)
    setTimeout(function(){hideAnswer(ids,newPattern);},2000)
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

    navigator.clipboard.writeText(tempTxt.value);

}

window.onload = createfn();