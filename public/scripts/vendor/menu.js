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

addFoodButton.addEventListener("click",()=> alert("Hello World"))