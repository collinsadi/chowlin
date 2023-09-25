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


    if (!cookie) {
        
       showModal()
    } else {
        
    showCart()

    }

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



const getUserCart = async () => {


    const cartCounter = document.getElementById("cart_counter")
    const cartContainer = document.getElementById("cart-container")
    const cartSummary = document.getElementById("cart_summary")

    if(!cookie){

        console.log("Not Logged In")

        return
    }
    
    const response = await fetch(url + "/cart/get/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookie}`
        }
    })

    const data = await response.json()

    if (data.status) {
        
        cartCounter.style.display = "block"
        cartCounter.innerHTML = data.cartItems.length


        if (cartContainer) {
            
            cartContainer.innerHTML = data.cartItems.map(item => {
                
                return `
                

                    <div class="cart-item">

                <div class="cart-item-inner">

                    <div class="cart-item-left">

                        <div class="item-image">
                            <img src="${item.foodid.foodImage}" alt="">
                        </div>

                        <div class="item-description">

                            <h3>${item.foodid.foodName}</h3>
                            <p>₦ ${item.foodid.foodPrice}</p>

                        </div>


                    </div>


                    <div class="cart-item-right">

                        <button data-foodid="${item._id}" i class="fa-solid fa-plus"></i></button>
                        <button>${item.foodQuantity}</button>
                        <button data-foodid="${item._id}" onclick="reduceCart(this)"><i class="fa-solid fa-minus"></i></button>

                    </div>

                    <div class="remove-button">
                        <button>Remove</button>
                    </div>

                </div>

            </div> 
                
                
                `

            }).join("")


            cartSummary.innerHTML = `
            
            <div class="cart-summary-inner">


                <div class="sub-total">

                    <p>Total(NGN)</p>
                    <h3>₦ ${data.bill}</h3>

                </div>
                <div class="confirm-button">
                    <button>Confirm Order</button>
                </div>

            </div>
            
            `
        }

    }

    console.log(data)

}

getUserCart()


const reduceCart = async (button) => {

    const id = button.dataset.foodid
    const counter = button.previousElementSibling
    const current = parseInt(counter.innerHTML)

    // console.log(id)

    // console.log()
    
    const response = await fetch(url + "/cart/update/quantity?food="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookie}`
        },
        body:JSON.stringify({action:"reduce"})
    })

    const data = await response.json()
    
    console.log(data)

    if (data.status) {
        
        counter.innerHTML = current - 1
    }

}