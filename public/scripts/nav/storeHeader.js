// alert("connected")

const userIcon = document.getElementById("user-icon")
const cartIcon = document.getElementById("cart-icon")
const modal = document.getElementById("signin-modal")
const cartModal = document.getElementById("cart-modal")
const closeButtons = document.querySelectorAll(".close-button h3")
const cartCloseButtons = document.querySelectorAll(".close-cart-modal p")


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

const showCart = () => {
    
cartModal.style.display = "flex"

}

cartIcon.addEventListener("click", () => {


    
    showCart()

})

cartCloseButtons.forEach(button => {
    button.addEventListener("click", () => {
        cartModal.style.display = "none"
    })
})

window.addEventListener("click", (e) => {
    if(e.target === cartModal){

        cartModal.style.display = "none"
    }
})