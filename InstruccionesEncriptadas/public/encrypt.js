function readCharactersQty(input){
    let charactersFounded = input.trim().split(/\s+/);
    return charactersFounded.length > 0 
        ? [charactersFounded[0], charactersFounded[1], charactersFounded[2]] 
        : null;    
}


function a(){
    showErrorCard("hello")
}

function decryptMsg(firstUnstructionLength, secodInstructionLength, messageLength, firstInstruction, secondInstruction, message){
    let firstInstructionResult = findMessage(message, firstInstruction) ? "SI" : "NO";
    let secondInstructionResult = findMessage(message, secondInstruction) ? "SI" : "NO";
    let resultsToPrint = `${firstInstructionResult}\n${secondInstructionResult}`;
    return resultsToPrint;
}

function validateLength(text, length){
    return text.length == length;
}

function validateMessage(message){
    let regex = /^[a-zA-Z0-9]+$/;
    return regex.test(message);
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
