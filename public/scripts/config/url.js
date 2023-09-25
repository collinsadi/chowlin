
const cookie = document.cookie.split("=")[1]
// const url = "https://chowlinapi.onrender.com"
const url = "http://localhost:5000"




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