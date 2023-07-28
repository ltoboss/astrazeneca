const errorMessages = {
    invalidContent : 'The content of the file is incorrect, please verify',
    dataFormatInvalid : (data, length) => `The data ${data} it's incorrect, lenght (${length}) doesn't match`,
    invalidMessage : 'The message format is not valid'
}


function loadFile(file){
    hideErrorCard();
    let reader = new FileReader();
    reader.onload = e => getResultAndDownload(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsText(file);
}

function getResultAndDownload(file){
    let results = readFileContent(file);
    if(results)
        downloadFile(results);
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

    return null;
    
}

function validateCharactersQty(value){
    if(readCharactersQty(value)==null){
        showErrorCard(`Nothing founded, please verify content`);
        return false;
    }
    return true;
}

function validateFileLength(content){
    if(content.length!=4){
        showErrorCard(errorMessages.invalidContent);
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

    if(!validateLength(firstInstruction, firstUnstructionLength)){
        showErrorCard(errorMessages.dataFormatInvalid(firstInstruction, firstUnstructionLength));
        return false;
    }

    if(!validateLength(secondInstruction, secodInstructionLength)){
        showErrorCard(errorMessages.dataFormatInvalid(secondInstruction, secodInstructionLength));
        return false;
    }
    
    if(!validateLength(message, messageLength)){
        showErrorCard(errorMessages.dataFormatInvalid(message, messageLength));
        return false;
    }
    
    if(!validateMessage(message)){
        showErrorCard(errorMessages.invalidMessage);
        return false;
    }

    return true;
}