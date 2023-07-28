window.onload = function(){

    const inputElement = document.getElementById("file");
    inputElement.addEventListener("change", handleFiles, false);

    function handleFiles() {
        const formData = new FormData();
            formData.append('file', this.files[0]);
            
            fetch('/loadFile', {
                method: 'POST',
                body: formData
            })
            .then(async response => {

                let content = await response.text();
                if(response.ok){
                    generateFile(content);
                }else{
                    showErrorCard(content);
                }
            })
            .catch(async error => {
                showErrorCard(await error);
            });
    }
}


let errorMsg = [];
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
    hideSuccessCard();
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
    hideErrorCard();
    cleanInput();
}

function hideSuccessCard(){
    const successCard = document.querySelector('.success-handler');
    successCard.style.display = 'none';
}

function generateFile(message){
    let blob = new Blob([message], {type: "text/plain;charset=utf-8"});
    let toDownload = document.createElement("a");
    toDownload.href = URL.createObjectURL(blob);
    toDownload.download = "results";
    toDownload.click();
    URL.revokeObjectURL(toDownload.href);
    cleanInput();
    showSuccessCard();
}

function cleanInput(){
    const inputElement = document.getElementById("file");
    inputElement.value = "";
}