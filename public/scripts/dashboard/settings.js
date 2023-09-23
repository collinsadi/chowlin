const personalSettings = document.getElementById("personal-settings")
const securitySettings = document.getElementById("security-settings")
const walletSettings = document.getElementById("wallet-settings")
const notificationSettings = document.getElementById("notification-settings")

const activeSectionText = document.getElementById("active-settings")



const personalButton = document.getElementById("personal_btn")
const securityButton = document.getElementById("security_btn")
const walletButton = document.getElementById("wallet_btn")
const notificationButton = document.getElementById("noti_btn")


securityButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "block"
    walletSettings.style.display = "none"
    notificationSettings.style.display = "none"



    activeSectionText.innerHTML = "Security"


    securityButton.classList.add("active")
    personalButton.classList.remove("active")
    walletButton.classList.remove("active")
    notificationButton.classList.remove("active")

})



personalButton.addEventListener("click", () => {
    
    personalSettings.style.display = "block"
    securitySettings.style.display = "none"
    walletSettings.style.display = "none"
    notificationSettings.style.display = "none"



    activeSectionText.innerHTML = "Personal Information"


    securityButton.classList.remove("active")
    personalButton.classList.add("active")
    walletButton.classList.remove("active")
    notificationButton.classList.remove("active")

})


walletButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "none"
    walletSettings.style.display = "block"
    notificationSettings.style.display = "none"



    activeSectionText.innerHTML = "Wallet"


    securityButton.classList.remove("active")
    personalButton.classList.remove("active")
    walletButton.classList.add("active")
    notificationButton.classList.remove("active")

})

notificationButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "none"
    walletSettings.style.display = "none"
    notificationSettings.style.display = "block"



    activeSectionText.innerHTML = "Notification"


    securityButton.classList.remove("active")
    personalButton.classList.remove("active")
    walletButton.classList.remove("active")
    notificationButton.classList.add("active")

})





const editPersonalDetails = document.getElementById("edit_personal_btn")
const personalError = document.getElementById("personal_error")

if(editPersonalDetails){

    editPersonalDetails.addEventListener("click", async () => {
        // alert("Hello World!")

        editPersonalDetails.disabled = true
        editPersonalDetails.innerHTML = "Hold on .."

    const response = await fetch(url + "/user/settings/personal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${cookie}`
            },
            body: JSON.stringify({
                firstName:firstNameInput.value,
                lastName: lastName.value,
                phoneNumber:phoneNumber.value
            })
        })


        const data = await response.json()

        if (!data.status) {
            personalError.innerHTML = data.message
            personalError.style.color = "red"

        editPersonalDetails.disabled = false
        editPersonalDetails.innerHTML = "Save"
        }

        if (data.status) {
            
        personalError.innerHTML = data.message
        personalError.style.color = "green"

        editPersonalDetails.disabled = false
        editPersonalDetails.innerHTML = "Save"
        }

        console.log(data)

    })
}

const oldPassword = document.getElementById("old_password")
const newPassword = document.getElementById("new_password")
const confirmPassword = document.getElementById("c_password")
const editSecurity = document.getElementById("save_security")
const securityError = document.getElementById("security_error")

if (editSecurity) {


    
    editSecurity.addEventListener("click", async () => {

        editSecurity.disabled = true
        editSecurity.innerHTML = "Hold on .."

        if(newPassword.value !== confirmPassword.value){

        securityError.innerHTML = "Passwords Do not Match"
            
        editSecurity.disabled = false
        editSecurity.innerHTML = "Try Again"

            return 
        }
        
         const response = await fetch(url + "/user/settings/security", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${cookie}`
            },
            body: JSON.stringify({
                oldPassword:oldPassword.value,
                newPassword: newPassword.value
            })
        })


        const data = await response.json()

        if (!data.status) {
            securityError.innerHTML = data.message
            securityError.style.color = "red"

        editSecurity.disabled = false
        editSecurity.innerHTML = "Try Again"
        }

        if(data.status){

            securityError.innerHTML = data.message
            securityError.style.color = "green"

            oldPassword.value = ""
            newPassword.value = ""
            confirmPassword.value = ""

        editSecurity.disabled = false
        editSecurity.innerHTML = "Save"
        }

        console.log(data)

    })
}



if (twoFactorToggle) {
    let twofactorstatus = false

    twoFactorToggle.addEventListener("change", async () => {

        twoFactorToggle.disabled = true
        
        if (twoFactorToggle.checked) {
            
            twofactorstatus = true
            // alert("True")
        }

        if (!twoFactorToggle.checked) {
            
            twofactorstatus = false
            // alert("False")
        }

        const response = await fetch(url + "/user/settings/security/twofactor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${cookie}`
            },
            body: JSON.stringify({
                twoFactor:twofactorstatus
            })
        })

        const data = await response.json()
        
        if (data.status) {
            
            securityError.innerHTML = data.message
            securityError.style.color = "green"
            twoFactorToggle.disabled = false
        }


    })
}

const transactionPin = document.getElementById("t_pin")
const passwordForPin = document.getElementById("password_for_pin")
const editWallet = document.getElementById("save_wallet")
const walletError = document.getElementById("wallet-error")

if (editWallet) {
    
    editWallet.addEventListener("click", async () => {
        
        editWallet.disabled = true
        editWallet.innerHTML = "Hold on .."

        const response = await fetch(url + "/user/settings/security/paymentpin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${cookie}`
            },
            body: JSON.stringify({
                password: passwordForPin.value,
                newpin:transactionPin.value
            })
        })

        const data = await response.json()

        if(!data.status){

            walletError.innerHTML = data.message
            walletError.style.color = "red"

            passwordForPin.value = ""
            transactionPin.value = ""

        editWallet.disabled = false
        editWallet.innerHTML = "Try Again"
        }

        if(data.status){

            walletError.style.color = "green"
            walletError.innerHTML = data.message

        editWallet.disabled = false
        editWallet.innerHTML = "Save"

        }


    })
}



const editNotification = document.getElementById("save_notification")
const notificationError = document.getElementById("notification-error")

if (editNotification) {

    let dealsStatus = false;
    let ordersStatus = false;
    let fundingStatus = false;

    if (fundingEmails.checked) {
        
        fundingStatus = true
    }

    if (orderEmails.checked) {
        
        ordersStatus = true
    }

    if (dealsEmails.checked) {
        
        dealsStatus = true
    }


    
    editNotification.addEventListener("click", async () => {
      

        editNotification.disabled = true
        editNotification.innerHTML = "Hold on.."

        const response = await fetch(url + "/user/settings/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${cookie}`
            },
            body: JSON.stringify({
                fundingMails: fundingEmails.checked,
                deliveryMails: orderEmails.checked,
                dealsMails:dealsEmails.checked
            })
        })

        const data = await response.json()

        if (data.status) {
            
            notificationError.innerHTML = data.message
            notificationError.style.color = "green"

        editNotification.disabled = false
        editNotification.innerHTML = "Save"
        }


    })
}




const editPanicBalance = document.getElementById("save_panic_balance")




if (editPanicBalance) {
    
    editPanicBalance.addEventListener("click", async () => {

        editPanicBalance.disabled = true
        editPanicBalance.innerHTML = "Hold on.."

        const response = await fetch(url + "/user/settings/security/panic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${cookie}`
            },
            body: JSON.stringify({
                panicBallance: panicBallance.value,
                panicStatus: panicStatus.checked
            })
        })

        const data = await response.json()

        if (!data.status) {
            
            walletError.innerHTML = data.message
            walletError.style.color = "red"

            editPanicBalance.innerHTML = "Try Again"
            editPanicBalance.disabled = false

        }

        if (data.status) {
            
            walletError.innerHTML = data.message
            walletError.style.color = "green"

            editPanicBalance.innerHTML = "Save"
            editPanicBalance.disabled = false

        }
        
    })
}