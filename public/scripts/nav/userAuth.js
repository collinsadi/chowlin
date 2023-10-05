// alert("connected")

const signUpSection = document.getElementById("signup-section")
const logInSection = document.getElementById("login-section")
const emailVerificationSection = document.getElementById("email-section")
const newHere = document.getElementById("newhere")
const wasHere = document.getElementById("washere")
const signupButton = document.getElementById("signup_btn")
const loginButton = document.getElementById("login_btn")
const verifyButton = document.getElementById("verify_btn")


// Input Fields

const firstName = document.getElementById("first_name")
const lastName = document.getElementById("last_name")
const signUpEmail = document.getElementById("signup_email")
const signUpPassword = document.getElementById("signup_password")
const mobileNumber = document.getElementById("mobile_number")
const signUpError = document.getElementById("signuperror")

// set cookie function





if(newHere){

    newHere.addEventListener("click", () => {
        
        logInSection.style.display = "none"
        signUpSection.style.display = "block"
    })
}


if (wasHere) {
    wasHere.addEventListener("click", () => {
        
        signUpSection.style.display = "none"
        logInSection.style.display = "block"
    })
}







const signUpUser = async () => {

    signupButton.disabled = true

    const response = await fetch(url + "/users/signup", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            email: signUpEmail.value,
            password:signUpPassword.value
        })
    })

    const data = await response.json()

    if (!data.status) {
        signUpError.innerHTML = data.message
        signUpError.style.color = "red"

    signupButton.disabled = false


        return false
    }

    if (data.status) {
        
        signUpError.innerHTML = data.message
        signUpError.style.color = "green"
        localStorage.setItem("email",data.email)

        signupButton.disabled = false
       
        return true
    }

    //console.log(data)
    
}

if (signupButton) {
    
    signupButton.addEventListener("click",async (e) => {
        
        e.preventDefault();

        e.target.innerHTML = "please wait.."
      

        const sign = await signUpUser()

        //console.log(sign)
       
        if (!sign) {
            e.target.innerHTML = "Sign Up"
            return
        }

        if (sign) {

            setTimeout(() => {
            e.target.innerHTML = "verifying credential..."
        }, 1000);
            setTimeout(() => {
            e.target.innerHTML = "Almost Done..."
            
            }, 1000);
            
            setTimeout(() => {
            signUpSection.style.display = "none"
            emailVerificationSection.style.display = "block"
        }, 1000);


        }

    })
}

// email Verification

const firstBox = document.getElementById("first_box")
const secondBox = document.getElementById("second_box")
const thirdBox = document.getElementById("third_box")
const fourthBox = document.getElementById("fourth_box")
const verificationError = document.getElementById("verificationerror")
const boxes = document.querySelectorAll("boxes")

const verifyEmail = async () => {
    
    const code = firstBox.value+secondBox.value+thirdBox.value+fourthBox.value

    //console.log(code)

    verifyButton.innerHTML = "verifying.."

    verifyButton.disabled = true

    const response = await fetch(url + "/users/signup/verify", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email: localStorage.getItem("email"),
            code
        })
    })

    const data = await response.json()

    //console.log(data)

    verifyButton.innerHTML = "Verify"
    
    if (!data.status) {
        verificationError.style.color = "red"
        verificationError.innerHTML = data.message

        boxes.forEach(box => {
            box.style.border = "2px solid red"
        })
    }

    if(data.status){

        verificationError.style.color = "green"
        verificationError.innerHTML = data.message

        setCookie("jwt", data.user.token, 30)
        localStorage.clear()
        
        setTimeout(() => {
            // location.href = "/user/dashboard"
            location.reload()
        }, 1000);

    }

    verifyButton.disabled = false
    

}



if (emailVerificationSection) {
    
    firstBox.addEventListener("keyup", (e) => {
        //console.log(firstBox.value)

        if (e.key === "Backspace" || e.code === "Backspace") {

            firstBox.value=""
            
            return
        }

        if (isNaN(firstBox.value)) {
            
            firstBox.value = ""
            verificationError.innerHTML = "Enter a Valid Number"
            verificationError.style.color = "red"
            return
        } else {
            verificationError.innerHTML=""
        }

        if (firstBox.value.length > 1) {
            
            const numbers = firstBox.value.split("")
            firstBox.value = numbers[0]
            secondBox.value = numbers[1]
            thirdBox.value = numbers[2]
            fourthBox.value = numbers[3]
        }
        
        secondBox.focus()
        
    })

    secondBox.addEventListener("keyup", (e) => {

        if (e.key === "Backspace" || e.code === "Backspace") {
            
            secondBox.value=""
            firstBox.focus()

            return
        }

         if (isNaN(secondBox.value)) {
            
            secondBox.value = ""
            verificationError.innerHTML = "Enter a Valid Number"
            verificationError.style.color = "red"
            return
        }else {
            verificationError.innerHTML=""
        }

        if (secondBox.value.length > 1) {
            
            const numbers = secondBox.value.split("")
            firstBox.value = numbers[0]
            secondBox.value = numbers[1]
            thirdBox.value = numbers[2]
            fourthBox.value = numbers[3]
        }
        
        thirdBox.focus()
    })

    thirdBox.addEventListener("keyup", (e) => {

        if (e.key === "Backspace" || e.code === "Backspace") {
            
            thirdBox.value=""
            secondBox.focus()

            return
        }

         if (isNaN(thirdBox.value)) {
            
            thirdBox.value = ""
            verificationError.innerHTML = "Enter a Valid Number"
            verificationError.style.color = "red"
            return
        }else {
            verificationError.innerHTML=""
        }

        if (thirdBox.value.length > 1) {
            
            const numbers = thirdBox.value.split("")
            firstBox.value = numbers[0]
            secondBox.value = numbers[1]
            thirdBox.value = numbers[2]
            fourthBox.value = numbers[3]
        }

        fourthBox.focus()
    })

    fourthBox.addEventListener("keyup", (e) => {

        if (e.key === "Backspace" || e.code === "Backspace") {
            
            fourthBox.value=""
            thirdBox.focus()

            return
        }

         if (isNaN(fourthBox.value)) {
            
            fourthBox.value = ""
            verificationError.innerHTML = "Enter a Valid Number"
            verificationError.style.color = "red"
            return
        }else {
            verificationError.innerHTML=""
        }

        if (fourthBox.value.length > 1) {
            
            const numbers = fourthBox.value.split("")
            firstBox.value = numbers[0]
            secondBox.value = numbers[1]
            thirdBox.value = numbers[2]
            fourthBox.value = numbers[3]
        }

        if (fourthBox.value !== "") {
            
            //console.log("Last Number")
            verifyEmail()
        }
    })

    // fourthBox.addEventListener("paste", (e) => {
    
    //     const pastedData = e.clipboardData.getData("text")

    //     //console.log(pastedData)

    //     if (isNaN(pastedData)) {
            
    //         // //console.log("NNobe ")
    //         fourthBox.value = ""
    //         verificationError.innerHTML = "Enter a Valid Number"
    //         verificationError.style.color = "red"
    //     }

    //     if (pastedData.length > 1) {
            
    //         const numbers = pastedData.split("")
    //         //console.log(numbers)
    //         firstBox.value = numbers[0]
    //         secondBox.value = numbers[1]
    //         thirdBox.value = numbers[2]
    //         e.target.value = numbers[3]
    //     }
    // })


    verifyButton.addEventListener("click", () => {
        verifyEmail()
    })
}



// login

const loginEmail = document.getElementById("login_email")
const loginPassword = document.getElementById("login_password")
const loginError = document.getElementById("loginerror")
const forgotPasswordButton = document.getElementById("resetpassword")
const twoFactorSection = document.getElementById("twoFactorSection")
const verifyTwoFactor = document.getElementById("verify_two_btn")



const loginUser = async () => {

    loginButton.disabled = true
    loginButton.innerHTML = "Signing in .."
    
    const response = await fetch(url + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email: loginEmail.value,
            password:loginPassword.value
        })
    })

    const data = await response.json()

    //console.log(data)

    if (data.message === "Please Verify Email") {
        localStorage.setItem("email", data.email)
        
        logInSection.style.display = "none"
        emailVerificationSection.style.display = "block"
    }

    if (data.message === "Two Factor Enabled") {
        localStorage.setItem("email", data.email)

        
        logInSection.style.display = "none"
        twoFactorSection.style.display = "block"
    }

    if (!data.status) {
        
        loginError.innerHTML = data.message
        loginError.style.color = "red"
    }

    if (data.status) {
        loginError.style.color = "green"
        loginError.innerHTML = data.message
        setCookie("jwt", data.user.token, 30)

        setTimeout(() => {
            location.reload()
        }, 1000);
    }
    loginButton.innerHTML = "Sign In"

    loginButton.disabled = false


}

if (loginButton) {
    
    loginButton.addEventListener("click", () => {
        loginUser()
    })
}

const sendPasswordResetToken = async () => {

    loginButton.disabled = true
    loginButton.innerHTML = "Signing in .."
    forgotPasswordButton.disabled = true
    
    const response = await fetch(url + "/users/password/forgotten", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email: loginEmail.value
        })
    })

    const data = await response.json()

    //console.log(data)

    if (!data.status) {
        
        loginError.innerHTML = data.message
        loginError.style.color = "red"
    }

    if (data.status) {
        loginError.style.color = "green"
        loginError.innerHTML = data.message
    }
    loginButton.innerHTML = "Sign In"

    loginButton.disabled = false
    forgotPasswordButton.disabled = false



}

if (forgotPasswordButton) {
    
    forgotPasswordButton.addEventListener("click", () => {
        sendPasswordResetToken()
    })
}



// Two Factor Authentication


const firstBox2 = document.getElementById("first_box2")
const secondBox2 = document.getElementById("second_box2")
const thirdBox2 = document.getElementById("third_box2")
const fourthBox2 = document.getElementById("fourth_box2")
const verificationError2 = document.getElementById("verificationerror2")
const boxes2 = document.querySelectorAll("boxes")

const verifyTwoFactorAuth = async () => {
    
    const code = firstBox2.value+secondBox2.value+thirdBox2.value+fourthBox2.value

    //console.log(code)

    verifyTwoFactor.innerHTML = "verifying.."

    verifyTwoFactor.disabled = true

    const response = await fetch(url + "/users/login/twofactor", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email: localStorage.getItem("email"),
            code
        })
    })

    const data = await response.json()

    //console.log(data)

    verifyTwoFactor.innerHTML = "Verify"
    
    if (!data.status) {
        verificationError2.style.color = "red"
        verificationError2.innerHTML = data.message

        boxes.forEach(box => {
            box.style.border = "2px solid red"
        })
    }

    if(data.status){

        verificationError2.style.color = "green"
        verificationError2.innerHTML = data.message

        setCookie("jwt", data.user.token, 30)
        localStorage.clear()
        
        setTimeout(() => {
            // location.href = "/user/dashboard"
            location.reload()
        }, 1000);

    }

    verifyTwoFactor.disabled = false
    

}



if (verifyTwoFactor) {
    
    firstBox2.addEventListener("keyup", (e) => {
        //console.log(firstBox2.value)

        if (e.key === "Backspace" || e.code === "Backspace") {

            firstBox2.value=""
            
            return
        }

        if (isNaN(firstBox2.value)) {
            
            firstBox2.value = ""
            verificationError2.innerHTML = "Enter a Valid Number"
            verificationError2.style.color = "red"
            return
        } else {
            verificationError2.innerHTML=""
        }

        if (firstBox2.value.length > 1) {
            
            const numbers = firstBox2.value.split("")
            firstBox2.value = numbers[0]
            secondBox2.value = numbers[1]
            thirdBox2.value = numbers[2]
            fourthBox2.value = numbers[3]
        }
        
        secondBox2.focus()
        
    })

    secondBox2.addEventListener("keyup", (e) => {

        if (e.key === "Backspace" || e.code === "Backspace") {
            
            secondBox2.value=""
            firstBox2.focus()

            return
        }

         if (isNaN(secondBox2.value)) {
            
            secondBox2.value = ""
            verificationError2.innerHTML = "Enter a Valid Number"
            verificationError2.style.color = "red"
            return
        }else {
            verificationError2.innerHTML=""
        }

        if (secondBox2.value.length > 1) {
            
            const numbers = secondBox2.value.split("")
            firstBox2.value = numbers[0]
            secondBox2.value = numbers[1]
            thirdBox2.value = numbers[2]
            fourthBox2.value = numbers[3]
        }
        
        thirdBox2.focus()
    })

    thirdBox2.addEventListener("keyup", (e) => {

        if (e.key === "Backspace" || e.code === "Backspace") {
            
            thirdBox2.value=""
            secondBox2.focus()

            return
        }

         if (isNaN(thirdBox2.value)) {
            
            thirdBox2.value = ""
            verificationError2.innerHTML = "Enter a Valid Number"
            verificationError2.style.color = "red"
            return
        }else {
            verificationError2.innerHTML=""
        }

        if (thirdBox2.value.length > 1) {
            
            const numbers = thirdBox2.value.split("")
            firstBox2.value = numbers[0]
            secondBox2.value = numbers[1]
            thirdBox2.value = numbers[2]
            fourthBox2.value = numbers[3]
        }

        fourthBox2.focus()
    })

    fourthBox2.addEventListener("keyup", (e) => {

        if (e.key === "Backspace" || e.code === "Backspace") {
            
            fourthBox2.value=""
            thirdBox2.focus()

            return
        }

         if (isNaN(fourthBox2.value)) {
            
            fourthBox2.value = ""
            verificationError2.innerHTML = "Enter a Valid Number"
            verificationError2.style.color = "red"
            return
        }else {
            verificationError2.innerHTML=""
        }

        if (fourthBox2.value.length > 1) {
            
            const numbers = fourthBox2.value.split("")
            firstBox2.value = numbers[0]
            secondBox2.value = numbers[1]
            thirdBox2.value = numbers[2]
            fourthBox2.value = numbers[3]
        }

        if (fourthBox2.value !== "") {
            
            //console.log("Last Number")
            verifyTwoFactorAuth()
        }
    })

   


    verifyTwoFactor.addEventListener("click", () => {
        verifyTwoFactorAuth()
    })
}

