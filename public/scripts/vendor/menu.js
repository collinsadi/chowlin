// alert("Connected")


const addToMenu = document.getElementById("add_to_menu")
const cancelButton = document.getElementById("cancel_newfood")

const newFoodModal = document.getElementById("add-food-modal")


window.addEventListener("click", (e) => {
    if (e.target === newFoodModal) {
        
        newFoodModal.style.display = "none"
    }
})


addToMenu.addEventListener("click", () => {
    
    newFoodModal.style.display = "flex"

})

if (cancelButton) {
    
    cancelButton.addEventListener("click", () => {
        newFoodModal.style.display = "none"
    })
}


// Upload Button and functionalities

const selectedImage = document.getElementById("selected-image")
const uploadButton = document.getElementById("foodimage")
const fr = new FileReader()
let imageUrl = ""

uploadButton.addEventListener("change", () => {
    
    fr.readAsDataURL(uploadButton.files[0])
    fr.addEventListener("load", () => {
        
        imageUrl = fr.result
        console.log(imageUrl)
        selectedImage.src = imageUrl
    })


    // alert("Changed")
})


// Creating New Food
const foodName = document.getElementById("foodname")
const foodDesc = document.getElementById("foodDesc")
const foodPrice = document.getElementById("foodPrice")
const foodErrorTracker = document.getElementById("fooderrorTracker")
const addFoodButton = document.getElementById("continue_toadd_food")

addFoodButton.addEventListener("click", async () => {

    addFoodButton.innerHTML = "Hold on.."
    addFoodButton.disabled = true
    
    const response = await fetch(url + "/food/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${vendorCookie}`
        },
        body: JSON.stringify({
            foodName: foodName.value,
            foodDescription: foodDesc.value,
            foodPrice: foodPrice.value,
            foodImage:imageUrl
        })
    })

    const data = await response.json()

    if (!data.status) {
        
        foodErrorTracker.innerHTML = data.message
        foodErrorTracker.style.color = "red"

        addFoodButton.innerHTML = "Try Again"
        addFoodButton.disabled = false
        return
    }

    if (data.status) {
        
        foodErrorTracker.innerHTML = data.message
        foodErrorTracker.style.color = "green"

        return
    }

    console.log(data)

})