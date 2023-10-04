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


const menuItemsContainer = document.getElementById("menu_items")



const vendorMenu = async () => {
     const response = await fetch(url + "/food/get/vendor/logged", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization":`Bearer ${vendorCookie}`
        }
    })


    const data = await response.json()

        if(data.status){

            if(data.menu.length > 0){

        menuItemsContainer.innerHTML = data.menu.map(food => {

            return `
            
            <div class="single-food">


                        <div class="food-image">

                            <img src="${food.foodImage}" alt="">

                        </div>
                        <div class="food-bottom">

                            <h3>${food.foodName}</h3>
                            <p>${food.foodDescription}</p>
                            <span>${food.foodPrice}</span>

                            <div class="edit-button">

                                <button onclick="showFoodEditModal(this)" data-foodid="${food._id}"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button  onclick="showDeleteFoodModal(this)" data-foodid="${food._id}" ><i class="fa-solid fa-trash"></i></button>

                            </div>

                        </div>



                    </div>
            
            
            
            `
        
        }).join("")


            }

        


        }

    

    console.log(data)
}


vendorMenu();

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
        newFoodModal.style.display = "none"
        vendorMenu();


        return
    }



})


const editFoodModal = document.getElementById("edit_food_modal")

const foodToEditImage = document.getElementById("food_toedit_image")
const foodToEditName = document.getElementById("food_toedit_name")
const foodToEditDesc = document.getElementById("food_toedit_image_desc")
const foodToEditPrice = document.getElementById("food_toedit_price")
let newFoodImage = ""
const uploadNewFoodImage = document.getElementById("food_toedit_image_upload")
const closeEditFoodModal = document.getElementById("cancel_food_edit")
const editFoodError = document.getElementById("food_toedit_error")


const editFoodButton = document.getElementById("continue_toedit_food")

closeEditFoodModal.addEventListener("click", () => {
    
    editFoodModal.style.display = "none"

})

window.addEventListener("click", (e) => {
    if (e.target === editFoodModal) {
        
        editFoodModal.style.display = "none"
    }
})

const showFoodEditModal = (button) => {

    const firstParent = button.parentElement;
    const parent = firstParent.parentElement;
    const mainParent = parent.parentElement;

    const foodImage = mainParent.querySelector("img").src;
    const foodName = parent.querySelector("h3").innerHTML;
    const foodDescription = parent.querySelector("p").innerHTML;
    const foodPrice = parent.querySelector("span").innerHTML;
    newFoodImage = foodImage
    editFoodModal.style.display = "flex";
    editFoodError.innerHTML = ""
    foodToEditName.value = foodName;
    foodToEditDesc.value = foodDescription;
    foodToEditImage.src = newFoodImage;
    foodToEditPrice.value = foodPrice;

    editFoodButton.setAttribute("data-foodid", button.dataset.foodid)
    editFoodButton.setAttribute("onclick","editFoodFunction(this)")
    


}

uploadNewFoodImage.addEventListener("change", () => {
    
    const fr = new FileReader()

    fr.readAsDataURL(uploadNewFoodImage.files[0])
    fr.addEventListener("load", () => {
        newFoodImage = fr.result;
        foodToEditImage.src = newFoodImage
    })

})


const editFoodFunction = async (button) => {

    const id = button.dataset.foodid
    button.disabled = true
    button.innerHTML = "Hold on.."

    const response = await fetch(url + "/food/edit?food=" + id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${vendorCookie}`
        },
        body: JSON.stringify({
            foodName: foodToEditName.value,
            foodDescription: foodToEditDesc.value,
            foodPrice: foodToEditPrice.value,
            foodImage: newFoodImage
            
        })
    })

    const data = await response.json()

    if (!data.status) {

        button.disabled = false
        button.innerHTML = "Edit Food"
        
        editFoodError.innerHTML = data.message
        editFoodError.style.color = "red"

    }
    
    
    if(data.status){
   
        editFoodError.innerHTML = data.message
        editFoodError.style.color = "green"
        button.disabled = false
        button.innerHTML = "Edit Food"
        editFoodModal.style.display = "none"

        vendorMenu()

    }
    
   
}

const deleteFoodModal = document.getElementById("delete_food")
const deleteFoodButton = document.getElementById("continue_todelete_food")
const cancelFoodDelete = document.getElementById("cancel_delete")

const showDeleteFoodModal = async (button) => {
    const id = button.dataset.foodid

    deleteFoodModal.style.display = "flex"
    deleteFoodButton.setAttribute("data-foodid", id)
    deleteFoodButton.setAttribute("onclick","deleteFood(this)")
    
}

if (cancelFoodDelete) {
    
    cancelFoodDelete.addEventListener("click", () => {
        deleteFoodModal.style.display = "none"
    })
}

window.addEventListener("click", (e) => {
    if (e.target === deleteFoodModal) {
        
        deleteFoodModal.style.display = "none"
    }
})


const deleteFood = async (button)=>{

    const id = button.dataset.foodid

    button.disabled = true;
    button.innerHTML = "Hold On.."

    const response = await fetch(url+"/food/delete?food="+id,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${vendorCookie}`
        }
    })

    const data = await response.json()

    if (!data.status) {
        button.disabled = false;
        button.innerHTML = "Try Again"
    } else {
        
        button.disabled = false
        button.innerHTML = "Delete Food"
        deleteFoodModal.style.display = "none"
        vendorMenu()
    }

}