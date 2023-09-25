const backArrow = document.getElementById("back_arrow")

const uniqueUrl = location.href.split("/").pop()

const vendorImage = document.getElementById("vendor_image")
const vendorName = document.getElementById("vendor_name")

const vendorMeals = document.getElementById("vendor_meals")


const goBack = () => {
    
    history.back()
}

const getVendor = async ()=>{

    const response = await fetch(url + "/vendor/get?vendor="+uniqueUrl, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()
    console.log(data)


    if(data.status){
        vendorImage.src = data.vendor.businessImage.url
        vendorName.innerHTML = data.vendor.businessName

        vendorMeals.innerHTML = data.foods.map(food => {
            return `
            
             <div class="single-meal">

                    <div class="single-meal-left">

                        <div class="meal-details">
                            <h3>${food.foodName}</h3>
                            <p>${food.foodDescription}</p>
                            
                        </div>

                        <div class="meal-price">
                            <h3>₦ ${food.foodPrice}</h3>
                        </div>

                        <button data-foodId="${food._id}" onclick="addToCart(this)" >Add to Pack</button>

                    </div>
                    <div class="single-meal-right">
                        
                        <img src="${food.foodImage}" alt="">

                    </div>

                </div>

            
            `
        }).join("")

        return
    }




}

getVendor()


const addToCart = async (button) => {

    if (!cookie) {
        showModal()
        return
    }



    const id = button.dataset.foodid

    console.log(id)
    
    const response = await fetch(url + "/cart/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${cookie}`
        },
        body:JSON.stringify({foodid:id})
    })

    const data = await response.json()

    if (data.status) {
        getUserCart()
    }


    console.log(data)

}


//? /vendor/get