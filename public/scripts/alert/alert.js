const errorToss = document.getElementById("error-modal");
const errorClose = document.getElementById("error-close");
const errorTossMessage = document.getElementById("error-toss-message")

if (errorToss) {
    
    errorClose.addEventListener("click", () => {
        errorToss.style.display = "none"
    })
}


const showErrorToss = (message) => {
    
    errorToss.style.display = "flex"
    errorTossMessage.innerHTML = message

    setTimeout(() => {

        errorToss.style.display = "none"

     }, 5000)
    
    

}



// Sucess Alert Toss

const successToss = document.getElementById("successModal");
const sucessTossClose = document.getElementById("closeSucessToss");
const sucessTossMessage = document.getElementById("sucessTossMessage");

if (successToss) {
    sucessTossClose.addEventListener("click", () => {
        successToss.style.display = "none"
    })
}

const showSuccessToss = (message) => {
    successToss.style.display = "flex"
    sucessTossMessage.innerHTML = message

    setTimeout(() => {
        successToss.style.display = "none"
    }, 5000);
}