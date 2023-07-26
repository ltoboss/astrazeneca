window.onload = function(){

    const inputElement = document.getElementById("file");
    inputElement.addEventListener("change", handleFiles, false);

    function handleFiles() {
        let fileFounded = this.files[0];
        loadFile(fileFounded);
    }
}

function loadFile(file){
    let reader = new FileReader();
    reader.onload = e => readFileContent(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsText(file);
}

function readFileContent(file){
    let {winner, diff} = getScores(file.split(/\r\n|\n/));
    generateFile(`${winner} ${diff}`, "result.txt");
}

function generateFile(data, name){
    let blob = new Blob([message], {type: "text/plain;charset=utf-8"});
    let toDownload = document.createElement("a");
    toDownload.href = URL.createObjectURL(blob);
    toDownload.download = "results";
    toDownload.click();
    URL.revokeObjectURL(toDownload.href);
}