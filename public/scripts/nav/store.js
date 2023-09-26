const restaurantContainer = document.getElementById("restaurants")



const getRestaurants = async () => {
    
    const response = await fetch(url + "/vendors/get/all", {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()



    if(data.status){


        restaurantContainer.innerHTML = data.vendors.map(vendor => {
            
            return `
            
            <div class="single-restaurant">

                <div class="restaurant-top">

                   <!-- <div class="closed-banner">

                        <p>Vendor Closed</p>

                    </div> -->
                    <div class="restaurant-image">
                        <img src="${vendor.businessImage.url}" alt="">
                    </div>

                </div>
                <div class="restaurant-bottom">
                    <div class="restaurant-name">
                    <h3> ${vendor.businessName}</h3>
                    </div>
                    

                    <div class="timing">

                        <i class="fa-regular fa-clock"></i>
                        <p>10-15 Mins</p>

                    </div>

                    <div class="buy-button">
                        <a href="/store/vendors/${vendor.uniqueUrl ? vendor.uniqueUrl : ""}"><button>Buy From ${vendor.businessName}</button></a>
                    </div>

                </div>

            </div>
            
            
            
            `

        }).join("")


        return
    }

    console.log(data)

}

getRestaurants()
