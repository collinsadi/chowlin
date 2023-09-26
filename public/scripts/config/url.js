
const getCookie = (cookieName) => {

    const cookies = document.cookie.split("; ");
    
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
            
            return decodeURIComponent(value);
        }
    }
    
    return null

}

// const getCookie = (cookieName) => {

//     const cookies = document.cookie.split(";");
    
//     cookies.forEach(cookie => {
//         const name = cookie.split("=")[0]
//         if (cookieName === name) {
            
//             return cookie.split("=")[1]
//         } else {
            
//             return null
//         }
//     })

// }



// const cookie = document.cookie.split("=")[1]
const cookie = getCookie("jwt")
const url = "https://chowlinapi.onrender.com"
// const url = "http://localhost:5000"

const vendorCookie = getCookie("vend")

const setCookie = (name,value,days) => {
    
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + days);

    const expires = `expires=${expirationDate.toUTCString()}`

    document.cookie=`${name}=${value};${expires}; path=/`

}




// const response = await fetch(url + "/users/account/fund", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "authorization":`Bearer ${cookie}`
//         },
//         body: JSON.stringify({
//             amount:amount.value
//         })
//     })