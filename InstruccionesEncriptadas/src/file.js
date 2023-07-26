window.onload = function(){

    const inputElement = document.getElementById("file");
    inputElement.addEventListener("change", handleFile, false);

    function handleFile() {
        if(this.files.length > 0){
            let fileFounded = this.files[0];
            loadFile(fileFounded);
        }
        
    }
}

function loadFile(file){
    let reader = new FileReader();
    reader.onload = e => readFileContent(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsText(file);
}

function readFileContent(file){
    let value = file.split(/\r\n|\n/);
    let [firstUnstructionLength, secodInstructionLength, messageLength] = readCharactersQty(value[0]);
    let [,firstInstruction, secondInstruction, message] = value.map(item => item.trim());
    decryptMsg(firstUnstructionLength, secodInstructionLength, messageLength,firstInstruction, secondInstruction, message);
}

function downloadFile(message){
    let blob = new Blob([message], {type: "text/plain;charset=utf-8"});
    let toDownload = document.createElement("a");
    toDownload.href = URL.createObjectURL(blob);
    toDownload.download = "results";
    toDownload.click();
    URL.revokeObjectURL(toDownload.href);
}