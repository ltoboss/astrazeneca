

let resultInstruction = {
    pass: "SI",
    fail: "NO"
}

function readCharactersQty(input){
    return input.length > 0 
        ? [input[0], input[1], input[2]] 
        : null;    
}

function decryptMsg(firstInstruction, secondInstruction, message){

    const {errorMessages, setError} = require("./file")

    let firstInstructionResult = findMessage(message, firstInstruction) ? resultInstruction.pass : resultInstruction.fail;
    let secondInstructionResult = findMessage(message, secondInstruction) ? resultInstruction.pass : resultInstruction.fail;
    if(firstInstructionResult === resultInstruction.pass && secondInstructionResult === resultInstruction.pass){
        setError(errorMessages.multipleInstructions)
    }
    let resultsToPrint = `${firstInstructionResult}\n${secondInstructionResult}`;
    return resultsToPrint;
}



function findMessage(message, instruction){
    let counter = 0;
    for(let i = 0; i < message.length; i++){
        
        if(message.charAt(i) === instruction.charAt(counter))
            counter++;
        
        if(counter === instruction.length)
            return true;
    }

    return false;
}


module.exports = {readCharactersQty, findMessage,decryptMsg}