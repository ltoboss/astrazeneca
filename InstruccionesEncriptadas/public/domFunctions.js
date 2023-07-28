let errorMsg = [];
window.onload = function(){


    hideErrorCard();
    hideSuccessCard();

    const inputElement = document.getElementById("file");
    inputElement.addEventListener("change", handleFile, false);

    function handleFile() {
        hideErrorCard();
        hideSuccessCard();
        if(this.files.length > 0){
            const formData = new FormData();
            formData.append('file', this.files[0]);
            fetch('/loadFile', {
                method: 'POST',
                body: formData
            })
            .then(async response => {
                if(response.ok){
                    let content = await response.text();
                    downloadFile(content);
                }else{
                    showErrorCard(await response.text());
                }
            })
            .catch(async error => {
                showErrorCard(await error);
            });
        }
        
    }
}

function showErrorCard(message) {
    removeErrorsMsg();
    errorMsg.push(message);
    const errorCard = document.querySelector('.error-handler');
    const errorDetails = document.getElementById('error-details');
    errorMsg.forEach(error=> {
        let errorItem = document.createElement("li");
        errorItem.textContent = error;
        errorDetails.appendChild(errorItem);
    })

    errorCard.style.display = 'block';
    cleanInput();
}

function removeErrorsMsg(){
    const errorDetails = document.getElementById('error-details');
    errorDetails.innerHTML = "";
}

function hideErrorCard() {
    const errorCard = document.querySelector('.error-handler');
    errorCard.style.display = 'none';
    removeErrorsMsg();
    errorMsg = [];
}


function showSuccessCard(){
    const successCard = document.querySelector('.success-handler');
    successCard.style.display = 'block';
}

function hideSuccessCard(){
    const successCard = document.querySelector('.success-handler');
    successCard.style.display = 'none';
}

function downloadFile(message){
    let blob = new Blob([message], {type: "text/plain;charset=utf-8"});
    let toDownload = document.createElement("a");
    toDownload.href = URL.createObjectURL(blob);
    showSuccessCard();
    toDownload.download = "results";
    toDownload.click();
    URL.revokeObjectURL(toDownload.href);
    cleanInput();
}

function cleanInput(){
    const inputElement = document.getElementById("file");
    inputElement.value = "";
}