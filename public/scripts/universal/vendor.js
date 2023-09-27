// alert(url)


const getVendor = async ()=>{

    if (pageIn !== "vendor") {
        
        return
    }
    
const response = await fetch(url + "/vendor/get/one", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${vendorCookie}`
        }
})
    
    const data = await response.json()

    console.log(data)
    

    if (walletHolder) {
        
        walletHolder.innerHTML = `${data.vendor.businessName}`
    }

    

}




getVendor()