//initializing variable
let counter1 =0;
let counter2 =0;

// function to generate model of game
function createfn(){

    var temp = []

    //creating div for game
    var element = document.createElement('div');
    element.setAttribute('id','puzzle')
    document.getElementsByTagName('body')[0].appendChild(element)

    //creating blank puzzle
    for (let i = 1; i < 31; i++){

        temp.push(i);

        //creating 6 by 5 board
        var tile = document.createElement("span");
        tile.setAttribute('class','empty')
        tile.setAttribute('id', i)
        element.appendChild(tile);
        if (i % 5 == 0){
            lineBreak = document.createElement('br');
            element.appendChild(lineBreak);2
        }
    }
    // getting random pattern of answer and id array
    var pattern  = shuffle(temp)
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
    if (counter2 == 6 || counter1 ==10){
        document.getElementById('button02').hidden =false;
        displayLock()
        var score = calculateRes()
        revealAnswer(arr2)

        if (counter2==6){
            var results = "Sorry you ran out of tries, the remaining tiles are shown in green! You scored a total of " + score + "!"
            var p1 = document.createTextNode(results)
            document.getElementById('resultsText').appendChild(p1)
        }
        else if (counter1 ==10){
            var results = "Congratulations! You completed the game! You scored a total of " + score + "!"
            var p1 = document.createTextNode(results)
            document.getElementById('resultsText').appendChild(p1)
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

window.onload = createfn();
