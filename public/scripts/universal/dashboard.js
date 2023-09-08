// alert(url)

const mobileButtons = document.querySelectorAll(".mobile-side-bar-button")

mobileButtons.forEach(button => {
    
    if (button.classList.contains("active-mobile")) {
        
        const span = button.querySelector("span")

        // if(span.innerHTML !== "Home"){

            
       
        // } 
        
        span.style.display = "inline-block"

    }
})

const userName = document.getElementById("user-name")
const walletHolder = document.getElementById("wallet-holder")

const getUser = async ()=>{
    
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


    console.log(data)

}




getUser()