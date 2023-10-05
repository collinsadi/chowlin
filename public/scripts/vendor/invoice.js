const orderid = location.href.split('/').pop()

const invoiceContainer = document.getElementById('invoice-container')
const invoiceDate = document.getElementById('invoiceDate')
const invoiceOwner = document.getElementById('invoiceOwner')
const vendor = document.getElementById('invoiceVendor')
const itemsArray = document.getElementById('items_array')
const subtotal = document.getElementById('subtotal')
const grandTotal = document.getElementById('grandotal')
const description = document.getElementById('description')

const getInvoice = async () => {
    
    const response = await fetch(url + '/order/get/invoice/vendor?order='+orderid, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${vendorCookie}`
        }
    })

    const data = await response.json()

    if (data.status) {
        
        const date = new Date(data.order.createdAt)

        invoiceContainer.style.display = 'block'
        invoiceDate.innerHTML = date.toLocaleString()
        invoiceOwner.innerHTML = `
        
            ${data.order.user.firstName} ${data.order.user.lastName}<br>
            
                ${data.order.user.email}
        
        `
        vendor.innerHTML = `
        
         ${data.order.vendor.businessName}<br>
                ${data.order.vendor.email}<br>
                ${data.order.vendor.mobileNumber}
        
        `

        itemsArray.innerHTML = data.order.foods.map((food,index) => {
            
            return `
            
            <tr>
                      <td class="tm_width_3">${index + 1}. ${food.foodName}</td>
                      <td class="tm_width_2">₦${food.foodPrice}</td>
                     
                    </tr>
            
            `

        }).join('')

        subtotal.innerHTML = '₦' + data.order.amount
        grandTotal.innerHTML = '₦' + data.order.amount


        description.innerHTML = data.order.orderDetails
    }

    //console.log(data)

}


getInvoice()