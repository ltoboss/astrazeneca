const fs = require('fs');

let listErrors = {
    scorePlayerInvalid : `The score's data is not a number, please verify`,
    numberGamesInvalid : (games) => `The number of games (${games}) is not valid.`,
    numberGamesInvalidSize : `The number of games must be greater than 0 and lower or equal than 10000`,
    invalidFile:`The file has invalid format`,
    discrepancyBetweenGames : `The number of rounds given is different to the rounds in file`
}



function loadFile(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, "utf-8", (error, success) => {
            if(error){
                resolve({error});
            }else{
                try{
                    let res = readFileContent(success); 
                    resolve(res);
                }catch(error){
                    reject(allErrors);
                }
                
            }
        })
    })    
}


function readFileContent(file){
    try{
        
        if(file.length < 2)   
            setError(listErrors.invalidFile);

        let {winner, diff} = getScores(file.split(/\r\n|\n/));
        return {data:`${winner} ${diff}`};

    }catch(e){
        return {error:allErrors};
    }
    
}

function getScores(information) {
    let games = information[0];
    let diffRounds = []

    if(validGames(games)){
        games = parseInt(games);
        if(games != (information.length-1))
            setError(listErrors.discrepancyBetweenGames);

        for(let i = 1; i <= games; i++){
            let playersScore = information[i].split(/\s+/).map(Number);
            let winner, diff = 0;

            if(validScores(playersScore[0],playersScore[1])){
                diff = Math.abs(playersScore[0] - playersScore[1]);
                winner = playersScore[0] > playersScore[1] ? 1 : 2;
                
                diffRounds.push({
                    diff,
                    winner
                })
            }
        }
        let res = diffRounds.find((i => i.diff == Math.max(...diffRounds.map(item => item.diff))));
        return res;
    }

    
}

function validScores(score1, score2){

    if(score1==null || score2==null )
        setError(listErrors.scorePlayerInvalid);

    if(toNumber(score1)==null)
        setError(listErrors.scorePlayerInvalid);

    if(toNumber(score2)==null)
        setError(listErrors.scorePlayerInvalid);

    return true;
}

function toNumber(toConvert){
    let converted = toConvert.toString().replace(/[^\d.-]/g, '');
    if(converted=="")
        return null;
    
    if(converted.includes("."))
        return null;

    if(isNaN(converted))
        return null

    return parseInt(converted);
}

function validGames(games){
    let parsedGames = toNumber(games);
    if(parsedGames==null)
        setError(listErrors.numberGamesInvalid(games))
    return (parsedGames>0 && parsedGames<=10000) 
        ? true
        : setError(listErrors.numberGamesInvalidSize);
}


let allErrors = "";
function setError(error){
    allErrors = error;
    throw new Error(error);
}

module.exports = {loadFile, readFileContent}

