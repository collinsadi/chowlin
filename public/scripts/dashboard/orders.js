// alert("Connected Bro")

const closedOrdersContainer = document.getElementById("closed-orders-container")
const openOrdersContainer = document.getElementById("open-orders-container")


const getUsersOrderHistory = async ()=>{

const response = await fetch(url + "/order/get/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${cookie}`
        }
    })


    const data = await response.json()

    if (data.openOrders.length > 0) {

        openOrdersContainer.innerHTML = data.openOrders.map(order => {
            
            return `
            
             <div class="single-order">


                <div class="order-id">

                    <h3>Order #67890</h3>

                </div>
                
                <p>${order.orderDetails}</p>

                <p>Date: August 27, 2023</p>
                <p>Total: ₦ ${order.amount}</p>
                <p>${order.vendor.businessName}</p>

                ${order.status === "confirmed" ? `<button data-orderid=${order._id} onclick="cancelOrder(this)" style="background-color: red;">Cancel</button>
                ` : ""}
                
                <button data-orderid="${order._id}" onclick="trackOrder(this)" >Track Status</button>

                


            </div>
            
            `

        }).join("")
        

    } else{

        openOrdersContainer.innerHTML = "<h3>You Dont Have any Open Order</h3>"
    }


    if (data.closedOrders.length > 0) {

        closedOrdersContainer.innerHTML = data.closedOrders.map(order => {
            
            return `
            
             <div class="single-order">


                <div class="order-id">

                    <h3>Order #67890</h3>

                </div>
                
                <p>${order.orderDetails}</p>

                <p>Date: August 27, 2023</p>
                <p>Total: ₦ ${order.amount}</p>
                <p>${order.vendor.businessName}</p>

                <button data-orderid='${order._id}' onclick='getInvoice(this)' >Get Invoice</button>

                


            </div>
            
            `

        }).join("")
        

    } else{

        closedOrdersContainer.innerHTML = "<h3>You Dont Have any Closed Order</h3>"
    }
        

   

    

    console.log(data)
}


getUsersOrderHistory()


const cancelOrder = async (button) => {

    const id = button.dataset.orderid

    // alert(id)

    button.innerHTML = "Hold on.."
    button.disabled = true

    const response = await fetch(url + "/order/cancel/user?order="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${cookie}`
        }
    })


    const data = await response.json()

    console.log(data)

    if(data.status){

        showSuccessToss(data.message)
        getUsersOrderHistory()
    }else{
        button.innerHTML = "Cancel"
        button.disabled = false
        showErrorToss(data.message)
    }
    

}

const trackStatus = document.getElementById("trackstatus") //?flex


const trackOrder = async (button) => {

    const firstStep = document.getElementById("firstStep")
    const firstLine = document.getElementById("firstLine")
    const secondStep = document.getElementById("secondStep")
    const secondLine = document.getElementById("secondLine")
    const thirdStep = document.getElementById("thirdStep")
    const thirdLine = document.getElementById("thirdLine")
    const lastStep = document.getElementById("lastSep")

       const id = button.dataset.orderid

    // alert(id)

    button.innerHTML = "Hold on.."
    button.disabled = true

    const response = await fetch(url + "/order/get/user/single?order="+id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${cookie}`
        }
    })


    const data = await response.json()

    if (data.status) {
        
        trackStatus.style.display = "flex"
        
        if (data.order.status === "confirmed") {
            
            firstStep.classList.add("passed")

            // second step

            firstLine.classList.remove("passed-line")
            secondStep.classList.remove("passed")

            // third

            secondLine.classList.remove("passed-line")
            thirdStep.classList.remove("passed")

            // fourth

            thirdLine.classList.remove("passed-line")
            lastStep.classList.remove("passed")
            
        }

        if (data.order.status === "packing") {
            
            firstStep.classList.add("passed")
            firstLine.classList.add("passed-line")
            secondStep.classList.add("passed")


              // third
            secondLine.classList.remove("passed-line")
            thirdStep.classList.remove("passed")

            // fourth

            thirdLine.classList.remove("passed-line")
            lastStep.classList.remove("passed")
            
            
        }

        if (data.order.status === "out") {
            
            firstStep.classList.add("passed")
            firstLine.classList.add("passed-line")
            secondStep.classList.add("passed")
            secondLine.classList.add("passed-line")
            thirdStep.classList.add("passed")


           

            // fourth

            thirdLine.classList.remove("passed-line")
            lastStep.classList.remove("passed")
        }

        if (data.order.status === "delivered") {
            
            firstStep.classList.add("passed")
            firstLine.classList.add("passed-line")
            secondStep.classList.add("passed")
            secondLine.classList.add("passed-line")
            thirdStep.classList.add("passed")
            thirdLine.classList.add("passed-line")
            lastStep.classList.add("passed")


        }






         button.innerHTML = "Track Status"
        button.disabled = false


    }

    console.log(data)
   

}


const getInvoice = (button) => {

    const id = button.dataset.orderid

    location.href = `/user/orders/invoice/${id}`
    
}
