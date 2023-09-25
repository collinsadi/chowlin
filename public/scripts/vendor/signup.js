// alert("Connected")
const firstSection = document.getElementById("first_step")
const seconSection = document.getElementById("second_step")


const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const studentStatus = document.getElementById("studentStatus")
const nextStep = document.getElementById("next-step")


const alertError = (message) => {

    // alert(message)

    showErrorToss(message)
    
}



nextStep.addEventListener("click", () => {

    if (firstName.value === "") {
        
        alertError("First Name is Required")
        return
    }

    if(lastName.value === ""){


        alertError("Last Name is Required")
        return
    }

    if (email.value === "") {
        
        alertError("Email is Required")
        return
    }

    if (email.value.indexOf("@") === -1) {
        
        alertError("Enter a Valid Email")
        return
    }

    if (password.value === "") {
        
        alertError("Password is Required")
        return
    }

    if (password.value.length < 6) {
        
        alertError("Passwords Must be 6 Characters or More")
        return
    }

    if (password.value !== confirmPassword.value) {
        
        alertError("Passwords Do not Match")
        return
    }

    firstSection.style.display = "none"
    seconSection.style.display = "block"


})


// second Section
const backButton = document.getElementById("go-back")
if (backButton) {
    backButton.addEventListener("click", () => {
        seconSection.style.display = "none"
        firstSection.style.display = "block"
    })
}

const finalStep = document.getElementById("final-step")
const emailStep = document.getElementById("finalStep")

const phoneNumber = document.getElementById("phone_number")
const businessName = document.getElementById("businessName")
const businessImage = document.getElementById("businessImage")
let imageUrl = ""
const terms =  document.getElementById("terms")
const fr = new FileReader()

if (businessImage) {
    
    businessImage.addEventListener("change", () => {
        
        fr.readAsDataURL(businessImage.files[0])

        fr.addEventListener("load", () => {
            
            imageUrl = fr.result
            document.getElementById("imageLabel").innerText = "Image Selected"

            console.log(imageUrl)
        })


    })
}


const signUser = async () => {
    
    finalStep.innerHTML = "Hold on.."
    finalStep.disabled = true

    const response = await fetch(url + "/vendor/signup", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            student: true,
            mobileNumber: phoneNumber.value,
            businessName: businessName.value,
            businessImage:imageUrl
        })
    })
    
    const data = await response.json()

    if (!data.status) {
        
        showErrorToss(data.message)
        finalStep.innerHTML = "Try Again"
        finalStep.disabled = false
    } else {
        showSuccessToss(data.message)
        localStorage.setItem("email",data.email)
    

        setTimeout(() => {
            seconSection.style.display = "none"
            emailStep.style.display  = "block"
            
        }, 1000);
    }

}


if (finalStep) {
    
    finalStep.addEventListener("click", async () => {
        
        if (phoneNumber.value === "") {
            
            alertError("Phone Number is Required")
            return
        }
        
        if(phoneNumber.value.length < 11){

            alertError("Enter a Valid Phone Number")
            return
        }

        if (businessName.value === "") {
            
            alertError("Business Name is Required")
            return
        }

        if (imageUrl === "") {
            
            alertError("Please Select Business Image")
            return
        }

        if (!terms.checked) {
            
            alertError("To Continue You Must Agree to Terms")
            return
        }


       await signUser()

    })
}


// Email Verification Section

const verifyEmail = document.getElementById("verify-step")
const verificationCode = document.getElementById("email_code")
const rememberLogin = document.getElementById("keeplogged")

const verifyUserEmail = async () => {

    const days = rememberLogin.checked ? 30 : 1

    console.log(days)
    // setCookie("vend", "data.vendor.token", days)

    // const data = {
    //     status: true,
    //     message: "Sucess",
    //     vendor:{
    //         token:"Demo Token"
    //     }
    // }

    // return

    const email = localStorage.getItem("email")

    // console.log(email)

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
                
            }, 3000);

            
            
        

    }

}



verifyEmail.addEventListener("click", async () => {
    
 await verifyUserEmail()

})