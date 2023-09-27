
const personalSettings = document.getElementById("personal-settings")
const securitySettings = document.getElementById("security-settings")
const walletSettings = document.getElementById("wallet-settings")
const paymentSettings = document.getElementById("payment-settings")

const activeSectionText = document.getElementById("active-settings")



const personalButton = document.getElementById("personal_btn")
const securityButton = document.getElementById("security_btn")
const walletButton = document.getElementById("wallet_btn")
const paymentButton = document.getElementById("payment_btn")


securityButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "block"
    walletSettings.style.display = "none"
    paymentSettings.style.display = "none"



    activeSectionText.innerHTML = "Security"


    securityButton.classList.add("active")
    personalButton.classList.remove("active")
    walletButton.classList.remove("active")
    paymentButton.classList.remove("active")

})



personalButton.addEventListener("click", () => {
    
    personalSettings.style.display = "block"
    securitySettings.style.display = "none"
    walletSettings.style.display = "none"
    paymentSettings.style.display = "none"
    




    activeSectionText.innerHTML = "Personal Information"

    paymentButton.classList.remove("active")
    securityButton.classList.remove("active")
    personalButton.classList.add("active")
    walletButton.classList.remove("active")
   

})


walletButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "none"
    walletSettings.style.display = "block"
    paymentSettings.style.display = "none"
    




    activeSectionText.innerHTML = "Wallet"

    paymentButton.classList.remove("active")
    securityButton.classList.remove("active")
    personalButton.classList.remove("active")
    walletButton.classList.add("active")
 

})

paymentButton.addEventListener("click", () => {
    
    personalSettings.style.display = "none"
    securitySettings.style.display = "none"
    walletSettings.style.display = "none"
    paymentSettings.style.display = "block"
    




    activeSectionText.innerHTML = "Withdrawal Informations"

    paymentButton.classList.add("active")
    securityButton.classList.remove("active")
    personalButton.classList.remove("active")
    walletButton.classList.remove("active")
})

const banksArray = document.getElementById("banks")


const getBanks = async () => {
    
    const response = await fetch("https://api.paystack.co/bank?country=nigeria",{
        method:"GET",
        headers:{
            "Authorization":`Bearer pk_test_171582260bff2b67508b6f3cea3e5801a5575a68`
        }
    })

    const data = await response.json()

    if (data.status) {
        
        if (banksArray) {
            
            banksArray.innerHTML = data.data.map(bank => {
                
                return `
                
                 <option value="${bank.code}">${bank.name}</option>
                
                `

            }).join("")

        }

    }

    console.log(data)

}

getBanks()


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


const accountNumber = document.getElementById("account_number")
const verifyAccount = document.getElementById("verify_Account")
const accountName = document.getElementById("account_name")
const accountPassword = document.getElementById("account_password")
const paymentError = document.getElementById("payment_error")

if(verifyAccount){

    verifyAccount.addEventListener("click", async (e) => {

        // console.log(e.target)
        const button = e.target
        button.disabled = true
        button.innerHTML = "Hold on.."

         const response = await fetch(url+`/wallet/bank/resolve?account_number=${accountNumber.value}&bank_code=${banksArray.value}`,{
        method:"GET",
        headers:{
            "authorization":`Bearer ${vendorCookie}`,
            "Content-Type": "application/json"
        }
    })

    const data = await response.json()

        if (data.status) {
            
            accountName.style.display = "block"
            accountPassword.style.display = "block"
            accountName.value = data.data.account_name
            button.disabled = false
            button.innerHTML = "Continue"
            button.setAttribute("onclick", "addAccountDetails(this)")
            paymentError.innerHTML = ""

        }else{

            paymentError.style.color = "red"
            paymentError.innerHTML = data.message
            button.disabled = false
            button.innerHTML = "Verify Details"
        }

        
    })
}

let bank;

banksArray.addEventListener("change", (e) => {
    const target = e.target

    bank = target.options[target.selectedIndex].innerHTML

    verifyAccount.innerHTML = "Verify Details"
    verifyAccount.removeAttribute("onclick")

    console.log(bank)
})

accountNumber.addEventListener("keyup", () => {
    verifyAccount.innerHTML = "Verify Details"
    verifyAccount.removeAttribute("onclick")
})



const addAccountDetails = async (button) => {

    button.disabled = true
    button.innerHTML = "Hold on.."

      const response = await fetch(url+`/vendor/withdrawal/settings`,{
        method:"POST",
        headers:{
            "authorization":`Bearer ${vendorCookie}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              accountNo: accountNumber.value,
              accountProvider:bank,
              accountHolder: accountName.value,
              password:accountPassword.value
        })
    })

    const data = await response.json()

    if (!data.status) {
        
        paymentError.innerHTML = data.message
        paymentError.style.color = "red"
        button.disabled = false
        button.innerHTML = "Continue"
    } else {
        button.disabled = false
        button.innerHTML = "Try Again"
        paymentError.innerHTML = data.message
        paymentError.style.color = "green"
    }


    
 
}