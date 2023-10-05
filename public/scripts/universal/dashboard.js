// alert(url)

const pageIn = location.href.split("/")[3]
//console.log(pageIn)


const mobileButtons = document.querySelectorAll(".mobile-side-bar-button")

mobileButtons.forEach(button => {
    
    if (button.classList.contains("active-mobile")) {
        
        const span = button.querySelector("span")

        // if(span.innerHTML !== "Home"){

            
       
        // } 

        if (span) {
            
            span.style.display = "inline-block"

        }
        

    }
})

const userName = document.getElementById("user-name")
const walletHolder = document.getElementById("wallet-holder")

// Settings

const firstNameInput = document.getElementById("first_name")
const lastName = document.getElementById("last_name")
const phoneNumber = document.getElementById("phone_number")
const twoFactorToggle = document.getElementById("two_factor")
const fundingEmails = document.getElementById("funding_emails")
const orderEmails = document.getElementById("order_emails")
const dealsEmails = document.getElementById("deals_emails")
const panicBallance = document.getElementById("p_ballance")
const panicStatus = document.getElementById("p_mode")


const getUser = async ()=>{

    if (pageIn !== "user") {
        
        return
    }
    
const response = await fetch(url + "/users/get/one", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${cookie}`
        }
})
    
    const data = await response.json()


    
    if(userName){

        userName.innerHTML = `${data.user.firstName} ${data.user.lastName},`
        
    }

    if (walletHolder) {
        
        walletHolder.innerHTML = `${data.user.firstName} ${data.user.lastName}`
    }

    if (firstNameInput) {
        
        firstNameInput.value = data.user.firstName
        lastName.value = data.user.lastName
        phoneNumber.value = data.user.phoneNumber
    }

    if (twoFactorToggle) {
        
        twoFactorToggle.checked = data.user.twoFactor
    }

    if (fundingEmails) {
        
        fundingEmails.checked = data.user.fundingMails
        orderEmails.checked = data.user.deliveryMails
        dealsEmails.checked = data.user.dealsMails

    }

    if (panicBallance) {
        
        panicBallance.value = data.user.panicBallance
        panicStatus.checked = data.user.panicStatus
    }



}




getUser()