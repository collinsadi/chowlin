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