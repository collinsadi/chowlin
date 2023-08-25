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

        return false
    }

    if (data.status) {
        
        signUpError.innerHTML = data.message
        signUpError.style.color = "green"
        localStorage.setItem("email",data.email)

       
        return true
    }

    console.log(data)
    
}

if (signupButton) {
    
    signupButton.addEventListener("click",async (e) => {
        
        e.preventDefault();

        e.target.innerHTML = "please wait.."
      

        const sign = await signUpUser()

        console.log(sign)
       
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

    console.log(code)

    verifyButton.innerHTML = "verifying.."

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

    console.log(data)

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

    

}



if (emailVerificationSection) {
    
    firstBox.addEventListener("keyup", () => {
        console.log(firstBox.value)

        if (isNaN(firstBox.value)) {
            
            firstBox.value = ""
            verificationError.innerHTML = "Enter a Valid Number"
            verificationError.style.color = "red"
            return
        } else {
            verificationError.innerHTML=""
        }
        secondBox.focus()
        
    })

    secondBox.addEventListener("keyup", () => {

         if (isNaN(secondBox.value)) {
            
            secondBox.value = ""
            verificationError.innerHTML = "Enter a Valid Number"
            verificationError.style.color = "red"
            return
        }else {
            verificationError.innerHTML=""
        }
        
        thirdBox.focus()
    })

    thirdBox.addEventListener("keyup", () => {

         if (isNaN(thirdBox.value)) {
            
            thirdBox.value = ""
            verificationError.innerHTML = "Enter a Valid Number"
            verificationError.style.color = "red"
            return
        }else {
            verificationError.innerHTML=""
        }

        fourthBox.focus()
    })

    fourthBox.addEventListener("keyup", () => {

         if (isNaN(fourthBox.value)) {
            
            fourthBox.value = ""
            verificationError.innerHTML = "Enter a Valid Number"
            verificationError.style.color = "red"
            return
        }else {
            verificationError.innerHTML=""
        }
        if (fourthBox.value !== "") {
            
            console.log("Last Number")
            verifyEmail()
        }
    })


    verifyButton.addEventListener("click", () => {
        verifyEmail()
    })
}



// login

const loginEmail = document.getElementById("login_email")
const loginPassword = document.getElementById("login_password")

const loginUser = async (request, response) => {
    
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

}