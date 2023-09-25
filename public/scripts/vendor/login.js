const email = document.getElementById("email")
const password = document.getElementById("password")
const rememberLogin = document.getElementById("keeplogged")
const days = rememberLogin.checked ? 30 : 1
const emailSection = document.getElementById("finalStep")
const loginSection = document.getElementById("loginsect")
const loginButton = document.getElementById("log_user_in")



const logUserIn = async () => {

    loginButton.disabled = true
    loginButton.innerHTML = "Hold on.."
    
    const response = await fetch(url + "/vendor/login", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password:password.value
        })
    })

    const data = await response.json()

    if (data.message === "Please Verify Email") {
        
        showErrorToss(data.message)
        localStorage.setItem("email",data.email)
        loginSection.style.display = "none"
        emailSection.style.display = "block"

        return
    }

    if (!data.status) {
        
        showErrorToss(data.message)
        loginButton.disabled = false
        loginButton.innerHTML = "Try Again"

        return
        
    } 

    if (data.status) {
        showSuccessToss(data.message)
        
        setCookie("vend", data.vendor.token, days)  

            setTimeout(() => {
            location.href = "/vendor/dashboard"
                
            }, 2000);

    }

}

loginButton.addEventListener("click", async () => {
    
    await logUserIn()

})


//  !email Verification


const verifyEmail = document.getElementById("verify-step")
const verificationCode = document.getElementById("email_code")

const verifyUserEmail = async () => {



    const email = localStorage.getItem("email")


    verifyEmail.innerHTML = "Hold on.."
    verifyEmail.disabled = true
    
    const response = await fetch(url + "/vendor/signup/verify", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            code:verificationCode.value
        })
    })

    const data = await response.json()



    if(!data.status){

        showErrorToss(data.message)
        verifyEmail.innerHTML = "Try Again"
        verifyEmail.disabled = false
        return
    } 
    
    
    if(data.status){
        showSuccessToss(data.message)
        localStorage.clear()
        setCookie("vend", data.vendor.token, days)  

            setTimeout(() => {
            location.href = "/vendor/dashboard"
                
            }, 2000);

            
            
        

    }

}



verifyEmail.addEventListener("click", async () => {
    
 await verifyUserEmail()

})