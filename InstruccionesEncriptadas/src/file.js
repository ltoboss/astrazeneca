const {readCharactersQty, findMessage, decryptMsg} = require('./encrypt')
const fs = require('fs');

const errorMessages = {
    invalidContent : 'The content of the file is incorrect, please verify',
    dataFormatInvalid : (data, length) => `The data ${data} it's incorrect, lenght (${length}) doesn't match or it's size is not allowed`,
    invalidMessage : 'The message format is not valid',
    multipleInstructions : 'The message has both instructions, please verify',
    consecutiveLetters : 'One of the instructions has more than 2 consecutives letters',
}

const instructionSize = {
    min: 2,
    max: 50
}

const messageSize = {
    min: 5,
    max: 5000
}

function loadFile(file){

    return new Promise((resolve, reject) => {
        fs.readFile(file.path, "utf-8", (error, success) => {
            if(error){
                resolve({error});
            }else{
                try{
                    let res = readFileContent(success); 
                    resolve({data:res});
                }catch(error){
                    reject(this.allErrors);
                }
                
            }
        })
    })    
}

function readFileContent(content){
    let value = content.split(/\r\n|\n/);
    if(validateFileLength(value) && validateCharactersQty(value[0])){

        let lengths = value[0].trim().split(/\s+/);
        let [firstInstructionLength, secondInstructionLength, messageLength] = readCharactersQty(lengths);    
        let [,firstInstruction, secondInstruction, message] = value.map(item => item.trim());

        let validContent = validateFileContent({
            firstInstructionLength,
            secondInstructionLength,
            messageLength,
            firstInstruction,
            secondInstruction,
            message,
        })
        
        if(validContent)
            return decryptMsg(firstInstruction, secondInstruction, message);
    }

}

function setError(error){
    this.allErrors = error;
    throw new Error(error);
}

function validateCharactersQty(value){
    let input = value.trim().split(/\s+/);
    if(input.length != 3) 
        setError(errorMessages.invalidContent)

    if(readCharactersQty(input)==null){
        setError(errorMessages.invalidContent)
        return false;
    }

    return true;
}

function validateFileLength(content){
    if(content.length!=4){
        setError(errorMessages.invalidContent)
        return false;
    }
    return true;
}

function validateFileContent({
    firstInstructionLength,
    secondInstructionLength,
    messageLength,
    firstInstruction,
    secondInstruction,
    message,
}){

    let isValidFirstInstruction = validateInput(firstInstructionLength, firstInstruction, instructionSize.min, instructionSize.max);
    let isValidSecondInstruction = validateInput(secondInstructionLength, secondInstruction, instructionSize.min, instructionSize.max);
    let isValidMessage = validateInput(messageLength, message, messageSize.min, messageSize.max);

    if(!isValidFirstInstruction || !isValidSecondInstruction || !isValidMessage)
        return false;

    let areValidInstructions = validateInstructions(firstInstruction, secondInstruction);
    if(!areValidInstructions)
        setError(errorMessages.consecutiveLetters)

    validateMessage(message);


    return true;
}


function validateInput(expectedLength, input , minLenght  , maxLength){
    if(expectedLength != input.length || input.length < minLenght || input.length > maxLength){
        setError(errorMessages.dataFormatInvalid(input, expectedLength));
        return false;
    }
    return true;
}

function validateMessage(message){
    let regex = /([A-Za-z0-9])/;
    let isFormatValid = !regex.test(message);

    if(isFormatValid)
        setError(errorMessages.invalidMessage)

    
    return true;
}


function validateInstructions(firstInstruction, secondInstruction){
    let pattern = /(.)\1{2,}/;
    if(pattern.test(firstInstruction) || pattern.test(secondInstruction))
        setError(errorMessages.consecutiveLetters)
    
    return true;
}


module.exports = {readFileContent, loadFile, errorMessages, setError}