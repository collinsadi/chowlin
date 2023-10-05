const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmpassword")
const resetButton = document.getElementById("reset_password")

const validationCode = location.href.split("/").pop()
//console.log(validationCode)


resetButton.addEventListener("click", async () => {

   
    
    if (password.value.length < 6) {
        showErrorToss("Password Must Be 6 Characters") 
        return
    }
    
    if (password.value !== confirmPassword.value) {
        showErrorToss("Password Do Not Match") 
        return
    }

    resetButton.disabled = true
    resetButton.innerHTML = "Hold on.."

    const response = await fetch(url + "/vendor/password/reset", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            validationToken: validationCode,
            newPassword:password.value
        })
    })

    const data = await response.json()

    if (data.message === "Invalid Token") {
        location.href = "/store"
        return
    }

    if (!data.status) {
        showErrorToss(data.message) 
        resetButton.disabled = false
        resetButton.innerHTML = "Try Again"
        return
    } else {
        showSuccessToss(data.message)
        location.href="/vendor/login"
    }
})