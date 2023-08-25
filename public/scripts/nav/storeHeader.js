// alert("connected")

const userIcon = document.getElementById("user-icon")
const modal = document.getElementById("signin-modal")
const closeButtons = document.querySelectorAll(".close-button h3")

const showModal = () => {
    
    modal.style.display = "flex"
}

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        
        modal.style.display = "none"
    })
})

window.addEventListener("click", (e) => {
    
    if(e.target === modal){

        modal.style.display = "none"
    }
})

userIcon.addEventListener("click", () => {
    
    if (!cookie) {
        
       showModal()
    }else{

        window.location.href="/user/dashboard"
    }

})