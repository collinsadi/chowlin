
const openOrdersContainer = document.getElementById("open-orders-container")
const closedOrdersContainer = document.getElementById("closed-orders-container")


const getVendorOrders = async () => {
    
    const response = await fetch(url + "/order/get/vendor", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${vendorCookie}`
        }
    })

    const data = await response.json()

    if(data.status){
    
        if (data.openOrders.length > 0) {
            
            openOrdersContainer.innerHTML = data.openOrders.map(order => {


                const date = new Date(order.createdAt)
                
                return `
                
                <div class="single-order">


                <div class="order-id">

                    <h3>Order #67890</h3>

                </div>
                
                <p>${order.orderDetails}</p>

                <p>Date:${date.toLocaleDateString(undefined,{month:"short", day:"2-digit",year:"numeric"})}</p>
                <p>Total: ${order.amount}</p>
                <!-- <p>PHOENIX RESTAURANT</p> -->

                ${order.status === "confirmed" ? `<button style="background-color: red;" data-orderid="${order._id}" onclick="vendorCancelOrder(this)">Cancel</button>` : ""}

                 ${order.status === "confirmed" ? `<button data-orderid="${order._id}" onclick="packingOrder(this)" >Packing</button>` : ""}

                 ${order.status === "packing" ? `<button data-orderid="${order._id}" onclick="orderOut(this)" >Order Out</button>` : ""}

                 ${order.status === "out" ? `<button data-orderid="${order._id}" onclick ="orderDelivered(this)">Delivered</button>` : ""}
                
                
                <button data-orderid="${order._id}" onclick="getInvoice(this)">Details</button>


            </div>
                
                
                `
            }).join("")

        } else {
            openOrdersContainer.innerHTML = "You are Online Waiting for Orders"
        }

        if (data.closedOrders.length > 0) {
            
            closedOrdersContainer.innerHTML = data.closedOrders.map(order => {
                
 const date = new Date(order.createdAt)
                
                return `
                
                <div class="single-order">


                <div class="order-id">

                    <h3>Order #67890</h3>

                </div>
                
                <p>${order.orderDetails}</p>

                <p>Date:${date.toLocaleDateString(undefined,{month:"short", day:"2-digit",year:"numeric"})}</p>
                <p>Total: ${order.amount}</p>
                <!-- <p>PHOENIX RESTAURANT</p> -->

                
                
                <button  data-orderid="${order._id}" onclick="getInvoice(this)">Get Invoice</button>


            </div>
                
                
                `

            })
        }



    }

  

}

getVendorOrders()



const vendorCancelOrder = async (button) => {

    button.disabled = true
    button.innerHTML = "Hold on.."

    const id = button.dataset.orderid
    
      const response = await fetch(url + "/order/cancel/vendor?order="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${vendorCookie}`
        }
    })

    const data = await response.json()

    if(data.status){

        showSuccessToss(data.message)
        getVendorOrders()
        
    } else {
        showErrorToss(data.message)
        button.disabled = false
        button.innerHTML = "Cancel"
    }


}

const packingOrder = async (button) => {

    const id = button.dataset.orderid
    button.disabled = true
    button.innerHTML = "Hold on.."
    
     const response = await fetch(url + "/order/status/packing?order="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${vendorCookie}`
        }
    })

    const data = await response.json()

    if (data.status) {
        showSuccessToss("Order Status Updated")
        button.setAttribute("onclick", "orderOut(this)")
        button.innerHTML = "Order Out"
        button.disabled = false

    }else{

        showErrorToss(data.message)
        button.disabled = false
        button.innerHTML = "Packing"

    }

}

const orderOut = async (button) => {
  
    const id = button.dataset.orderid
    button.disabled = true
    button.innerHTML = "Hold on.."
    
     const response = await fetch(url + "/order/status/out?order="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${vendorCookie}`
        }
    })

    const data = await response.json()

    if (data.status) {
        showSuccessToss("Order Status Updated")
        button.setAttribute("onclick", "orderDelivered(this)")
        button.innerHTML = "Delivered"
        button.disabled = false

    }else{

        showErrorToss(data.message)
        button.disabled = false
        button.innerHTML = "Out"

    }


}

const orderDelivered = async (button)=>{

    const id = button.dataset.orderid
    button.disabled = true
    button.innerHTML = "Hold on.."
    
     const response = await fetch(url + "/order/status/delivered?order="+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${vendorCookie}`
        }
    })

    const data = await response.json()

    if (data.status) {
        showSuccessToss("Order Status Updated")
        getVendorOrders()

    }else{

        showErrorToss(data.message)
        button.disabled = false
        button.innerHTML = "Delivered"

    }


}


const getInvoice = (button) => {

    const id = button.dataset.orderid

    location.href = `/vendor/orders/invoice/${id}`
    
}
