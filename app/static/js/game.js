//initializing variables

//function to generate game using dom
function genGame(){
    console.log('HI')

    //creating div for game
    var element01 = document.createElement('div');
    element01.setAttribute('id','puzzle')
    document.getElementsByTagName('body')[0].appendChild(element01)

    //creating results para
    var para = document.createElement('p')
    para.setAttribute('id', 'resultsText')
    document.getElementsByTagName('body')[0].appendChild(para)
    
    idList = idGen()
    console.log(idList)

    var x;
    fetch('/test')
    .then(function (response) {
    return response.json();
    }).then(function (text) {
        x = JSON.stringify(text.patterns)
        console.log("X:",x)
        return x;
    });
    console.log("X2",x)
}


//function to generate list of ids
function idGen(){
    var idList = []
    for (let i = 0; i< 31; i++){
        idList.push(i)
    }
    return idList
}
window.onload = genGame()