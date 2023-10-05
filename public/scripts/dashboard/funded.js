const urlparams = new URLSearchParams(location.search)
const refrence = urlparams.get("reference")
const checkingPaymentModal = document.getElementById("checking-payment")
const successfulPaymentModal = document.getElementById("successful-payment")
const failedPayment = document.getElementById("failed-payment")
const errorText = document.getElementById("paymentError")






if (refrence) {
    
    checkingPaymentModal.style.display = "flex"


    const checkStatus = async ()=>{

const response = await fetch(url + "/users/account/fund/verify?refrence="+refrence, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${cookie}`
        }
    })

 
    const data = await response.json()


    if (data.status) {
        
        checkingPaymentModal.style.display = "none"
        successfulPaymentModal.style.display = "flex"

        setTimeout(() => {
            location.href = "/user/dashboard/wallet"
        }, 1000);
    }

    if (!data.status) {
        
        checkingPaymentModal.style.display = "none"
        failedPayment.style.display = "flex"
        errorText.innerHTML = data.message

        setTimeout(() => {
            location.href = "/user/dashboard/wallet"
        }, 1000);

    }

    }


    checkStatus()



}
