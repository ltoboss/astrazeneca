const {validateMessage, readCharactersQty, findMessage, validateLength,decryptMsg} = require('./encrypt')
const fs = require('fs');

const errorMessages = {
    invalidContent : 'The content of the file is incorrect, please verify',
    dataFormatInvalid : (data, length) => `The data ${data} it's incorrect, lenght (${length}) doesn't match or it's size is not allowed`,
    invalidMessage : 'The message format is not valid'
}

let allErrors = null;

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
        let [firstUnstructionLength, secodInstructionLength, messageLength] = readCharactersQty(value[0]);    
        let [,firstInstruction, secondInstruction, message] = value.map(item => item.trim());

        let validContent = validateFileContent({
            firstUnstructionLength,
            secodInstructionLength,
            messageLength,
            firstInstruction,
            secondInstruction,
            message,
        })

        if(validContent)
            return decryptMsg(firstUnstructionLength, secodInstructionLength, messageLength,firstInstruction, secondInstruction, message);
    }

}

function setError(error){
    this.allErrors = error;
    throw new Error(error);
}

function validateCharactersQty(value){
    if(readCharactersQty(value)==null){
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
    firstUnstructionLength,
    secodInstructionLength,
    messageLength,
    firstInstruction,
    secondInstruction,
    message,
}){

    if(!validateLength(firstInstruction, firstUnstructionLength) || firstInstruction.length<2 || firstInstruction.length > 50){
        setError(errorMessages.dataFormatInvalid(firstInstruction, firstUnstructionLength));
        return false
    }
    

    if(!validateLength(secondInstruction, secodInstructionLength) || secondInstruction.length<2 || secondInstruction.length > 50){
        setError(errorMessages.dataFormatInvalid(secondInstruction, secodInstructionLength));
        return false;
    }
    
    
    if(!validateLength(message, messageLength) || message.length < 3 || message.length > 5000){
        setError(errorMessages.dataFormatInvalid(message, messageLength));
        return false;
    }
    
    
    if(!validateMessage(message)){
        setError(errorMessages.invalidMessage);
        return false;
    }

    return true;
}

module.exports = {readFileContent, loadFile}