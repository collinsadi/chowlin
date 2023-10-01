// alert(url)

const vendorFirstName =  document.getElementById("first_name")
const vendorLastName = document.getElementById("last_name")
const vendorPhoneNumber = document.getElementById("phone_number")
const vendorBusinessName = document.getElementById("business_name")
const vendorBusinessImage = document.getElementById("business_image")

let businessImageUrl = ""




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

    if (vendorFirstName) {
        
        vendorFirstName.value = data.vendor.firstName
    }

    if (vendorLastName) {
        
        vendorLastName.value = data.vendor.lastName
    }

    if (vendorPhoneNumber) {
        
        vendorPhoneNumber.value = data.vendor.mobileNumber
    }

    if (vendorBusinessName) {
        
        vendorBusinessName.value = data.vendor.businessName
    }

    businessImageUrl = data.vendor.businessImage.url

    if (vendorBusinessImage) {
        vendorBusinessImage.src = businessImageUrl
    }
    

    if (walletHolder) {
        
        walletHolder.innerHTML = `${data.vendor.businessName}`
    }

    if (panicStatus) {
        
        panicStatus.checked = data.vendor.panicMode
    }

    if (panicBallance) {
        
        panicBallance.value = data.vendor.panicballance
    }

    

}




getVendor()