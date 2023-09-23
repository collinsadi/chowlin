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

                ${order.status === "confirmed" ? `<button data-orderid=${order._id} style="background-color: red;">Cancel</button>
                ` : ""}
                
                <button data-orderid=${order._id} >Track Status</button>

                


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

                <button data-orderid=${order._id} >Get Invoice</button>

                


            </div>
            
            `

        }).join("")
        

    } else{

        closedOrdersContainer.innerHTML = "<h3>You Dont Have any Closed Order</h3>"
    }
        

   

    

    console.log(data)
}


getUsersOrderHistory()