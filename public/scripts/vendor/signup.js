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

    alert(message)
    
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

if (finalStep) {
    
    finalStep.addEventListener("click", () => {
        
        if (phoneNumber.value === "") {
            
            alertError("Phone Number is Required")
            return
        }
        
        if(phoneNumber.value.length < 11){

            alert("Enter a Valid Phone Number")
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


        alertError("KUDOS: You Passed All The Test")

    })
}