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

const cartCounter = document.getElementById("cart_counter")
const cartContainer = document.getElementById("cart-container")
const cartSummary = document.getElementById("cart_summary")


const getUserCart = async () => {


   
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
        
        

        if (data.cartItems.length > 0) {

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

                        <button data-foodid="${item._id}" onclick="increaseCart(this)"><i class="fa-solid fa-plus"></i></button>
                        <button>${item.foodQuantity}</button>
                        <button data-foodid="${item._id}" onclick="reduceCart(this)"><i class="fa-solid fa-minus"></i></button>

                    </div>

                    <div class="remove-button">
                        <button data-foodid="${item._id}" onclick="removeItem(this)">Remove</button>
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
                    
                    <button onclick="checkout()" id="confirmOrder">Confirm Order</button>
                </div>

            </div>
            
            `
        }
        } else {
            
            cartContainer.innerHTML = `
            
            
            <div class="empty-cart">


                <img src="/images/empty.png" alt="">

                <h3>Your Cart is Empty</h3>
                <h3>Add Items to Pack to get Started</h3>


            </div>
            
            
            `
            cartSummary.innerHTML = ""
           
        }


       

    }


}

 getUserCart()


const reduceCart = async (button) => {

    const id = button.dataset.foodid
    const counter = button.previousElementSibling
    const current = parseInt(counter.innerHTML)
    
    const response = await fetch(url + "/cart/update/quantity?food="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookie}`
        },
        body:JSON.stringify({action:"reduce"})
    })

    const data = await response.json()

    if (data.status) {
        showSuccessToss(data.message)
        counter.innerHTML = current - 1
    } else {
        showErrorToss(data.message)
    }

}


const increaseCart = async (button) => {

    const id = button.dataset.foodid
    const counter = button.nextElementSibling
    const current = parseInt(counter.innerHTML)

   
    
    const response = await fetch(url + "/cart/update/quantity?food="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookie}`
        },
        body:JSON.stringify({action:"increase"})
    })

    const data = await response.json()
    

    if (data.status) {
        showSuccessToss(data.message)
        counter.innerHTML = current + 1
    } else {
        showErrorToss(data.message)
    }

}

const removeItem = async (button)=>{

    const id = button.dataset.foodid
    const firstParent = button.parentElement
    const secondParent = firstParent.parentElement
    const thirdParent = secondParent.parentElement

     const response = await fetch(url + "/cart/delete?food="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookie}`
        },
        body:JSON.stringify({action:"increase"})
    })

    const data = await response.json()

    if(data.status){
        showSuccessToss(data.message)
        getUserCart()
        // thirdParent.style.display = "none"

    } else {
        showErrorToss(data.message)
    }
    

}


// Order Meals

const previousState = cartContainer.innerHTML


const checkout = () => {
    

        cartContainer.innerHTML = `
        
         <div class="cart-checkout">

                <div class="cart-checkout-inner">

                    <div class="location">

                        <p>Where Do You Want the Food to Be Delivered?</p>

                        <select name="" id="OrderLocation">
                            <option value="backgate">Backgate</option>
                            <option value="maingate">MainGate</option>
                            <option value="library">Library</option>
                        </select>

                    </div>

                    <div class="transaction-pin">

                        <p>Enter Your Transaction Pin</p>

                        <input type="number" name="" id="transactionPin" placeholder="4 Digit Transaction Pin">

                    </div>

                    <div class="check-description">

                        <p>By Continuing the Process You will be Charged <span>3000</span>, for your Meal</p>

                    </div>

                    <div class="confirm-button">
                        <button id="finallyCheck">Checkout</button>
                    </div>
                    <div class="confirm-button">
                        <button onclick="abort(this)" style="background-color: red;">Abort</button>
                    </div>


                </div>

            </div>
        
        
        
        `
        cartSummary.innerHTML = ""


        
    const transactionPin = document.getElementById("transactionPin")
    const location = document.getElementById("OrderLocation")

        const checkOutButton = document.getElementById("finallyCheck")

    checkOutButton.addEventListener("click", async (e) => {
            
        checkOutButton.innerHTML = "Hold on.."
        checkOutButton.disabled = true
            
        const response = await fetch(url + "/order/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookie}`
        },
            body: JSON.stringify({ location:location.value})
    })

    const data = await response.json()
        
            if (!data.status) {
                
                showErrorToss(data.message)
                checkOutButton.innerHTML = "Checkout"
                checkOutButton.disabled = false
            } else {
                
                showSuccessToss(data.message)
                cartContainer.innerHTML =  `
                
                <div class="empty-cart">


                <img src="/images/empty.png" alt="">

                <h3>Your Cart is Empty</h3>
                <h3>Add Items to Pack to get Started</h3>


            </div>
                
                `
            }


        })
      
    
}

const abort = (button) => {
    button.disabled = true
    button.innerHTML = "Aborting.."
    getUserCart()
}





