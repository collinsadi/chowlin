const eyeButton = document.getElementById("eye_btn")
const toggleEyeButton = document.getElementById("toggleBallance")
const ballance = document.getElementById("main_ballance")


toggleEyeButton.addEventListener("click", () => {
    // alert("Okay")

    if (ballance.type === "password") {
        ballance.type = "text"
        eyeButton.classList.remove("fa-eye-slash")
        eyeButton.classList.add("fa-eye")
    } else {
        
        ballance.type = "password"
        eyeButton.classList.add("fa-eye-slash")
        eyeButton.classList.remove("fa-eye")
    }

   
})


const fundWalletPopup = document.getElementById("fund-popup")
const addMoneyButton = document.getElementById("add-money")
const abortButton = document.getElementById("abort-funding")
const continueButton = document.getElementById("continue-funding")
const amount = document.getElementById("fund-amount")
const errorTracker = document.getElementById("error-tracker")


addMoneyButton.addEventListener("click", () => {
    
    fundWalletPopup.style.display = "flex"

})

if(abortButton){

abortButton.addEventListener("click", () => {
    
    fundWalletPopup.style.display = "none"

})

}


const fundWallet = async () => {
    
    continueButton.innerHTML = "Hold on ..."
    continueButton.disabled = true
    continueButton.style.opacity = 5

    const response = await fetch(url + "/users/account/fund", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${cookie}`
        },
        body: JSON.stringify({
            amount:amount.value
        })
    })
    console.log(cookie)

    const data = await response.json()

    if (!data.status) {
        
        errorTracker.innerHTML = data.message

    continueButton.innerHTML = "Try Again"
    continueButton.disabled = false

    }

    if (data.status) {
        
        
       location.href = data.paymentUrl
    }

}

if (continueButton) {
    
    continueButton.addEventListener("click", ()=>{

        fundWallet()
    })
    
}


// console.log(cookie)
