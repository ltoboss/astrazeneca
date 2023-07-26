function readCharactersQty(input){
    let charactersFounded = input.trim().split(/\s+/);
    return charactersFounded.length > 0 
        ? [charactersFounded[0], charactersFounded[1], charactersFounded[2]] 
        : console.error("Nothing founded");    
}

function decryptMsg(firstUnstructionLength, secodInstructionLength, messageLength, firstInstruction, secondInstruction, message){

    let isMsg1Valid = validateLength(firstInstruction, firstUnstructionLength);
    let isMsg2Valid = validateLength(secondInstruction, secodInstructionLength);
    let isCodeValid = validateLength(message, messageLength);

    if(isMsg1Valid && isMsg2Valid && isCodeValid){

        let firstInstructionResult = findMessage(message, firstInstruction) ? "SI" : "NO";
        let secondInstructionResult = findMessage(message, secondInstruction) ? "SI" : "NO";
        let resultsToPrint = `${firstInstructionResult}\n${secondInstructionResult}`;
        downloadFile(resultsToPrint);
    }
}

function validateLength(text, length){
    if(text.length != length){
        console.error(`The data ${text} it's incorrect, please verify`)
        return false;
    }else
        return true;

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