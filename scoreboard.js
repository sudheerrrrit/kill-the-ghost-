var storedScore = localStorage.getItem('storedScore');
if(storedScore === null){
    storedScore = [];
}
else{
    storedScore = JSON.parse(storedScore);
}


function storeScore(){
    let nickname = document.getElementById('nickname');
    if(nickname.value.length <= 0){
        nickname = 'undefined';
    }
    else{
        nickname = nickname.value;
    }
    
    let player = {name: nickname, score: scoreNumber};

    storedScore.push(player);

    storedScore.sort(function(a, b){
        return a.score - b.score;
    }).reverse();


    let jsonStoredScore = JSON.stringify(storedScore);

    localStorage.setItem('storedScore', jsonStoredScore);
}


//displays the correct storedScore
function updateScoreboard(){
    let scoreboardOL = scoreboard.children[1];
    let i = 0;
    for(let c of scoreboardOL.children){
        if(storedScore.length >= i){
            c.innerHTML = storedScore[i].name + ': ' + storedScore[i].score;
        }
        i++;
    }
}






