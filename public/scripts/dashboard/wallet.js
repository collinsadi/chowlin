const eyeButton = document.getElementById("eye_btn")
const toggleEyeButton = document.getElementById("toggleBallance")
const ballance = document.getElementById("main_ballance")
const ballancePopup = document.getElementById("balance-popup")
const abortBallanceCheck = document.getElementById("abort-balance")
const ballanceErrorTracker = document.getElementById("ballance-error-tracker")
const continueBallanceButton = document.getElementById("continue-balance")
const transactionPin = document.getElementById("transaction-pin")


toggleEyeButton.addEventListener("click",  () => {
    // alert("Okay")

    if (ballance.type === "password") {

        ballancePopup.style.display = "flex"
        

 

        // alert("Wahala")

        // ballance.type = "text"
        // eyeButton.classList.remove("fa-eye-slash")
        // eyeButton.classList.add("fa-eye")
    } else {
        
        ballance.type = "password"
        eyeButton.classList.add("fa-eye-slash")
        eyeButton.classList.remove("fa-eye")
    }

   
})


if (abortBallanceCheck) {
    
    abortBallanceCheck.addEventListener("click", () => {
        ballancePopup.style = "none"
    })
}

if (continueBallanceButton) {
    
    continueBallanceButton.addEventListener("click", async () => {

        continueBallanceButton.disabled = true
        continueBallanceButton.innerHTML = "Hold on .."
        
    const response = await fetch(url + "/wallet/balance/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${cookie}`
        },
        body: JSON.stringify({
            pin:transactionPin.value
        })
    }) 

        const data = await response.json()
        
        if (!data.status) {

            
            ballanceErrorTracker.innerHTML = data.message
            ballanceErrorTracker.style.color = "red"

            continueBallanceButton.disabled = false
            continueBallanceButton.innerHTML = "Try Again"

        }

        if (data.status) {

            
            continueBallanceButton.disabled = false
            continueBallanceButton.innerHTML = "Continue"
            
            ballancePopup.style.display = "none"
            ballance.value = data.ballance
            ballance.type = "text"


        }




    })

}



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
    
    continueButton.innerHTML = "Hold on .."
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



