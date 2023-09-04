const eyeButton = document.getElementById("eye_btn")
const toggleEyeButton = document.getElementById("toggleBallance")
const ballance = document.getElementById("main_ballance")


toggleEyeButton.addEventListener("click", () => {
    // alert("Okay")

    if (ballance.type === "password") {
        ballance.type = "text"
        eyeButton.classList.remove("fa-eye-slash")
        eyeButton.classList.add("fa-eye")
    } else {
        
        ballance.type = "password"
        eyeButton.classList.add("fa-eye-slash")
        eyeButton.classList.remove("fa-eye")
    }

   
})