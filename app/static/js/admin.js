
// function to add new rows with patterns
function insertPattern(){

    var patternList = []

    //generating unique pattern for each game (total of 3 games)
    for (let x = 0; x<3; x++){
    
        //initalizing variables
        var ids = []
        var pattern = []

        //creating list of ids    
        for (let i = 1; i<31; i++){
            ids.push(i)
        }

        //generating pattern
        for (let i = 0; i < 10; i ++){
            var item = ids[Math.floor(Math.random()*ids.length)];
            var index = ids.indexOf(item);
            ids.splice(index,1)
            pattern.push(item);
        }
        patternList.push(pattern)
    }

    //sending to backend
    const sendPuzzle= JSON.stringify(patternList) //Stringify converts a JS value to JSON
    window.alert('Successfully added patterns, refresh to view new database')
    $.ajax({
        url:"/update_puzzle",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(sendPuzzle)              
    });
}

//fucntion to add onlcik to submit and pass id
function openDateEditor(id){
    var btn = document.getElementById('updateDateBtn')
    btn.onclick = function(){updateDate(id)}
}

//function to update Date
function updateDate(id){
    var temp = []

    input = document.getElementById('dateInput').value;

    temp.push(id)
    temp.push(input)

    //sending to backend
    const sendDate = JSON.stringify(temp)
    console.log(sendDate)
    $.ajax({
        url:'/updateDate',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendDate)
    })
    
}
