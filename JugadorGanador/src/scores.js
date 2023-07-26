function getScores(information) {

    let games = information[0];
    let diffRounds = []

    for(let i = 1; i <= games; i++){
        let playersScore = information[i].split(/\s+/).map(Number);
        let [winner, diff] = 0;
        diff = Math.abs(playersScore[0] - playersScore[1]);
        winner = playersScore[0] > playersScore[1] ? 1 : 2;
        
        diffRounds.push({
            diff,
            winner
        })
    }
    return diffRounds.find((i => i.diff == Math.max(...diffRounds.map(item => item.diff))));
}


